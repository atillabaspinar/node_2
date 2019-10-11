const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"> <button type="submit">OK</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            fs.writeFile('message.txt', parsedBody, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });
    }
};


module.exports = requestHandler;