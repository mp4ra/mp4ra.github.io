var fs = require('fs');

module.exports = {
  template: fs.readFileSync(__dirname + '/home.vue', 'utf8'),
};
