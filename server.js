const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer((req, res) => {
    const url = req.url;
    const urlArray = url.split('/');
    console.log(url);
    if (url === '/html') {
        fs.readFile('./index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (url === '/json') {
        fs.readFile('./input.json', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.write(data);
            res.end();
        });
    } else if (url === '/uuid') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.write(JSON.stringify({ uuid: uuidv4() }));
        res.end();
    } else if (url === '/status/' + urlArray[2]) {
        res.writeHead(urlArray[2], { 'Content-Type': 'text/html' });
        res.write(`<h2>${urlArray[2]}</h2>`);
        res.end();
    } else if (url === '/delay/' + urlArray[2]) {
        setTimeout(() => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h2>Delayed by ${urlArray[2]} seconds</h2>`);
            res.end();
        }, urlArray[2] * 1000);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`<h2>404 Page Not Found</h2>`);
        res.end();
    }
});

server.listen(3000, () => console.log('Listening on port 3000'));
