const http = require('http');
const port = 8080;

const app = http.createServer(function(req, res) {
    res.write('Hello');
    setTimeout(function() {
        res.write(' ');
        res.end('Success!');
    }, 10000)
});

app.listen(port, function() {
    console.log(`Server is listening on port ${port}`);
});