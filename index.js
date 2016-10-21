var fs = require('fs');

// check if file exists
fs.stat('dict.txt', (err, stat)=>{
  if (err == null) {
    randomWord('dict.txt');
  } else if(err.code == 'ENOENT') {
    writeFile('cmudict.dict');
  }
});

function writeFile(filename) {
  var dictFile = __dirname + '/' + filename;

  var Transform = require('stream').Transform;
  var inherits = require('util').inherits;

  function WordsDict() {
    Transform.call(this);
  }

  inherits(WordsDict, Transform);

  WordsDict.prototype._transform = function(chunk, enc, done) {
    chunk = chunk.toString().split('\n').map((newline)=>{
      return newline.split(/\s+/)[0];
    }).join('\n');
    this.push(chunk);
    done();
  }

  var read = fs.createReadStream('./cmudict.dict');
  var write = fs.createWriteStream('dict.txt');

  read.pipe(new WordsDict()).pipe(write);
}

function randomWord(filename) {
  fs.readFile(filename, (e, d)=>{
    var array = d.toString().split('\n');
    var i = Math.floor(Math.random() * array.length);
    process.stdout.write(array[i] + '\n');
    return array[i];
  });
}