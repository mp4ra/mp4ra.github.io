var fs = require('fs');


module.exports = {
  props: {
    boxes: { type: Array },
    boxes_udta: { type: Array },
    boxes_qt: { type: Array },
  },
  template: fs.readFileSync(__dirname + '/atoms.vue', 'utf8')
};
