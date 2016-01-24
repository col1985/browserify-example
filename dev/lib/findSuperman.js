module.exports = function (values) {
  var foundSuperman = false,
    _ = require('underscore'),
    moment = require('moment');

  var now = moment().format();

  _.find(values, function (name) {
    if (name === 'Clark Kent') {
      console.log(now, 'It\'s Superman!');
      foundSuperman = true;
    } else if (name === 'Bruce Wayne') {
      console.log(now, 'I am Batman!');
    } else {
      console.log(now, '... No superman!');
    }
  });

  return foundSuperman;
};
