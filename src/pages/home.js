var fs = require('fs');

module.exports = {
  template: fs.readFileSync(__dirname + '/home.vue', 'utf8'),
  data: function() {
    return {
      message: "allo"
    };
  }
};
