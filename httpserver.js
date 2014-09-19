var through = require('through')
var http = require('http');
var fs = require('fs')

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'content-type': 'text/plain'})
    if (req.method === 'POST') {
        req.pipe(through(function write(buf){
            this.queue(buf.toString().toUpperCase())
        })).pipe(res)
    }
    else res.end('send me a POST\n')
});
server.listen(+process.argv[2]);
