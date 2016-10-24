var wd = require('word-definition');
var word = require('random-word');

wd.getDef(word(), "en", null, (definition)=>{ 
  if (definition.err) return true;
  console.log(definition);
});