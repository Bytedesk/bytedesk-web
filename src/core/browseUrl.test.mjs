import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const helperPath = path.resolve(process.cwd(), 'src/core/browseUrl.ts');

const loadTsModule = async (filePath) => {
  const source = await fs.readFile(filePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filePath,
  });

  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    require: () => ({}) ,
    console,
  };

  vm.runInNewContext(transpiled.outputText, context, { filename: filePath });
  return module.exports;
};

test('serializeBrowseConfig emits a single browse payload and normalizes referrer alias', async () => {
  const mod = await loadTsModule(helperPath);

  assert.equal(
    mod.serializeBrowseConfig({
      referrer: 'https://docs.example.com',
      title: 'Docs title',
      url: 'https://docs.example.com/article',
    }),
    JSON.stringify({
      referer: 'https://docs.example.com',
      title: 'Docs title',
      url: 'https://docs.example.com/article',
    }),
  );
});