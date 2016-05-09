Memory Expire
======================

# Purpose
    in memory key value storage with variable expire times

##Example Usage

```javascript
var ExpireMemory = require('expire-memory');

var expireMemory = new ExpireMemory();

expireMemory.put('key', 'some value', 1000);

console.log(expireMemory.get('key')); //some value

setTimeout(function (){
  console.log(expireMemory.get('key')); //null
},1001);



expireMemory.put('key2', 'some value', 1000);

console.log(expireMemory.expiry('key2')); // current time that key was set (epoc ms) + 1000

console.log(expireMemory.get('key2')); //some value
expireMemory.put('key2', 'new value', 1010); //previous timeout gets removed and new one is set

setTimeout(function (){
  console.log(expireMemory.get('key2')); //new value
},1001);

expireMemory.put('key1noexpire', 'some value');
expireMemory.put('key2noexpire', 'some value');
expireMemory.put('key3noexpire', 'some value');

console.log(expireMemory.keys()); //[ 'key', 'key2', 'key1noexpire', 'key2noexpire', 'key3noexpire' ]
console.log(expireMemory.hasTimeout('key2')); //true
console.log(expireMemory.hasTimeout('key1noexpire')); //false
console.log(expireMemory.timeouts()); //[ 'key', 'key2' ]
console.log(expireMemory.exists('key1noexpire')); //true
console.log(expireMemory.exists('newkey')); //false
```
