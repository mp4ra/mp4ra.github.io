var fs = require('fs');

module.exports = {
  props: {
    mp4ra: { type: Object }
  },
  template: fs.readFileSync(__dirname + '/checksum_types.vue', 'utf8')
};
