/* eslint-disable @typescript-eslint/no-var-requires */
const { createServer } = require('https');
const { parse } = require('url');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./cert/localhost+2-key.pem'),
  cert: fs.readFileSync('./cert/localhost+2.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Server running on https://localhost:3000');
  });
});
