var fs = require('fs');

module.exports = {
  props: {
    db: { type: Object }
  },
  data: function () {
    return { query: null, searchedFields: ['code', 'description'] };
  },
  methods: {
    isAMatch: function (item) {
      var self = this;
      var match = false;
      self.searchedFields.forEach( function(field) {
        match = match || ((field in item) && (item[field].indexOf(self.query) !== -1));
      });
      return match;
    }
  },
  computed: {
    searchResult: function () {
      var self = this;
      var results = [];
      for (var table in self.db) {
        results = results.concat(self.db[table].filter(self.isAMatch));
      }
      return results;
    }
  },
  template: fs.readFileSync(__dirname + '/search.vue', 'utf8')
};
