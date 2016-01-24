module.exports = function (values) {
  var foundBatman = false,
    _ = require('underscore'),
    moment = require('moment');

  var now = moment().format();

  _.find(values, function (name) {
    if (name === 'Bruce Wayne') {
      foundBatman = true;
      console.log(now, 'I am Batman!');
    } else {
      console.log(now, '... No superman!');
    }
  });

  return foundBatman;
};
