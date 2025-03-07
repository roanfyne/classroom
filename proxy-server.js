const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create a web server that uses the proxy
const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;

  if (queryObject.url) {
    const targetUrl = queryObject.url;

    // Forward the request to the target URL
    proxy.web(req, res, { target: targetUrl }, (err) => {
      if (err) {
        console.error('Proxy error:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong.');
      }
    });
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing "url" query parameter.');
  }
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
