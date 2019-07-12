const express = require('express');

const server = express();

server.get('/teste', (req, res) => {
  return res.json({ messenger: 'Hello World' });
});

server.listen(3000);
