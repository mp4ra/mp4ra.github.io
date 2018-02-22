var fs = require('fs');

module.exports = { 
  props: ['data', 'columns'],
  methods: {
    hasHTMLLink: function(string) {
      if(string !== undefined) {
        return string.includes("href");
      } else {
        return false;
      }
    }
  },
  directives: {
   rawhtml: {
     inserted: function(el) {
       el.innerHTML = el.getAttribute('data');
     }
   }
  },
  template: fs.readFileSync(__dirname + '/table.vue', 'utf8')
};
