var fs = require('fs');

module.exports = {
  props: {
    db: { type: Object }
  },
  template: fs.readFileSync(__dirname + '/atoms.vue', 'utf8')
};
