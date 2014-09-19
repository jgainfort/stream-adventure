var through = require('through')
var split = require('split')
var count = 1
var tr = through(write, end)

function write(line){
    if ((count % 2) != 0){
       this.queue(line.toString().toLowerCase() + '\n')
    } else this.queue(line.toString().toUpperCase() + '\n')
    count++
}

function end(){
    this.queue(null)
}

process.stdin.pipe(split()).pipe(tr).pipe(process.stdout)
