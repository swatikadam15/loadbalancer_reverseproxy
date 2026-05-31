const http = require('http');
const os = require('os');

// Get pod hostname and IP
const hostname = os.hostname();
const podIP = process.env.POD_IP || 'Unknown IP'; // We'll pass this via Kubernetes downward API

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`Hello from Node.js!\nHostname: ${hostname}\nPod IP: ${podIP}\n`);
});

server.listen(PORT, () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Hostname: ${hostname}, Pod IP: ${podIP}`);
});