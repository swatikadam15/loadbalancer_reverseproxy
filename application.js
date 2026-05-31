const http = require('http');
const os = require('os');

// Get pod info from environment variables or default
const hostname = os.hostname();
const podIP = process.env.POD_IP || 'Unknown IP';
const podName = process.env.POD_NAME || 'Unknown Pod';
const podNamespace = process.env.POD_NAMESPACE || 'Unknown Namespace';

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/info') {
        // Return pod info in JSON
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            hostname,
            podIP,
            podName,
            podNamespace,
            message: "Pod status info"
        }, null, 2));
    } else {
        // Default route
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Hello from Node.js!\nVisit /info for pod status.\n`);
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
    console.log(`Hostname: ${hostname}, Pod IP: ${podIP}`);
});