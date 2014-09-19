var trumpet = require('trumpet')
var through = require('through')
var fs = require('fs')

var tr = trumpet()
var stream = tr.select('.loud').createStream()

stream.pipe(through(function write(buf){
    this.queue(buf.toString().toUpperCase())
})).pipe(stream)

process.stdin.pipe(tr).pipe(process.stdout)
