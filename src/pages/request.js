var fs = require('fs');

module.exports = {
  template: fs.readFileSync(__dirname + '/request.vue', 'utf8'),
};
