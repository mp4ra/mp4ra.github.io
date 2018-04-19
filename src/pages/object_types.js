var fs = require('fs');

module.exports = {
  props: {
    mp4ra: { type: Object }
  },
  template: fs.readFileSync(__dirname + '/object_types.vue', 'utf8')
};
