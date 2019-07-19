var fs = require('fs');

module.exports = { 
  props: ['data', 'columns'],
  methods: {
    scrollFix: function(anchor) {
      setTimeout(() => $('html, body').animate({
        scrollTop: document.querySelectorAll('[name="' + anchor + '"]')[0].getBoundingClientRect().top - 70 + window.pageYOffset || document.documentElement.scrollTop
      }, 1000), 1)
    },
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
