const fs = require('fs');
const crypto = require('crypto');
const stream = require('stream');

//
// first part
//

const md5 = crypto.createHash('md5');
md5.on('readable', () => {
  var data = md5.read();
  if (data)
    console.log(data);
});

const input = fs.createReadStream(__dirname + '/data/input.txt');
let output = fs.createWriteStream(__dirname + '/data/output1.txt');

input
  .pipe(md5)
  .pipe(output);

//
// second part
//

const md5Hex = crypto.createHash('md5');

class Tr extends stream.Transform {
  constructor(options){
    super(options);
  }

  _transform(chunk, encoding, callback){
    md5Hex.update(chunk.toString());

    this.push(md5Hex.digest('hex'));

    callback();
  }
}

const tr = new Tr();
output = fs.createWriteStream(__dirname + '/data/output2.txt');

input
  .pipe(tr)
  .pipe(output);

//
// three part
//

class Generator extends stream.Readable {
  constructor(options){
    super(options);
  }

  _read(){
    const digit = Math.floor(Math.random() * 99 + 1);

    this.push(digit.toString());
  }
}

class Transform extends stream.Transform {
  constructor(options){
    super(options);
  }

  _transform(chunk, encoding, callback){
    this.push((Number(chunk.toString()) / 10).toString());

    callback();
  }
}

class Write extends stream.Writable {
  constructor(options){
    super(options);
  }

  _write(chunk, encoding, callback){
    console.log(chunk.toString())

    callback();
  }
}

const transform = new Transform()
transform.on('data', function(chunk){

  this.pause();

  setTimeout(() => {
    this.resume();
  }, 1000);
});

(new Generator())
  .pipe(transform)
  .pipe(new Write());