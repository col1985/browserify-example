var names = require('./lib/names.js'),
  findSuperman = require('./lib/findSuperman.js');

// invoke
if (findSuperman(names())) {
  document.write('We found Superman');
} else {
  document.write('No Superman...');
}
