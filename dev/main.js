var names = require('./js/names.js'),
  findSuperman = require('./js/findSuperman.js'),
  findBatman = require('./js/findBatman.js');

// invoke
if (findSuperman(names())) {
  console.log('We found Superman');
  document.write('We found Superman');
} else if (findBatman(names())) {
  console.log('We found Batman!');
  document.write('We found Batman');
} else {
  //console.log('no')
  document.write('Nope...!!!');
}
