const express = require('express');
const path = require('path');
const app = express();
const port = 9024;

// 静态文件服务
app.use(express.static('public'));
// 添加对库文件的静态服务
app.use('/lib', express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`JavaScript demo running at http://localhost:${port}`);
}); 