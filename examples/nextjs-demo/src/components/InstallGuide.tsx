import React from 'react';

const InstallGuide = () => {
  return (
    <div className="mt-10 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Installation Steps</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">1. Install Dependencies</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`npm install bytedesk-web\n# or\nyarn add bytedesk-web`}
        </pre>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">2. Import Component</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`'use client';\n\nimport { BytedeskNextjs } from 'bytedesk-web/nextjs';\nimport type { BytedeskConfig } from 'bytedesk-web/nextjs';`}
        </pre>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">3. Configure Parameters</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`const config: BytedeskConfig = {
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  bubbleConfig: {
    show: true,
    icon: '👋',
    title: 'Need help?',
    subtitle: 'Click to chat'
  },
  chatParams: {
    org: 'df_org_uid',  // Replace with your organization ID
    t: "2",
    sid: 'df_rt_uid'    // Replace with your session ID
  }
};`}
        </pre>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">4. Use Component</h3>
        <pre className="bg-gray-100 p-4 rounded-md">
          {`export default function Page() {
  return (
    <div>
      <BytedeskNextjs config={config} />
      <button onClick={() => (window as any).bytedesk?.showChat()}>
        Open Chat
      </button>
    </div>
  );
}`}
        </pre>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">5. Available Methods</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><code className="bg-gray-100 px-2 py-1 rounded">(window as any).bytedesk?.showChat()</code> - Show chat window</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">(window as any).bytedesk?.hideChat()</code> - Hide chat window</li>
        </ul>
      </div>
    </div>
  );
};

export default InstallGuide; 