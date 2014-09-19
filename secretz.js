var tar = require('tar')
var crypto = require('crypto')
var zlib = require('zlib')
var through = require('through')

var gunzip = zlib.createGunzip()
var decipher = crypto.createDecipher(process.argv[2], process.argv[3])
var parser = tar.Parse()

parser.on('entry', function(entry){
    if (entry.type !== 'File') return
    var hasher = crypto.createHash('md5', { encoding: 'hex' })
    entry.pipe(hasher).pipe(through(function write(md5){
        console.log(md5 + ' ' + entry.path)
    }))
})

process.stdin.pipe(decipher).pipe(gunzip).pipe(parser)
