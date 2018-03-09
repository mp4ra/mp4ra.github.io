var fs = require('fs');

module.exports = {
  props: {
    mp4ra: { type: Object }
  },
  data: function () {
    return { query: null, searchedFields: ['code', 'description'] };
  },
  methods: {
    isAMatch: function (item) {
      var self = this;
      var match = false;
      self.searchedFields.forEach( function (field) {
        match = match || ((field in item) && (item[field].toLowerCase().indexOf(self.lowerQuery) !== -1));
      });
      return match;
    },
    addCategory: function (entries, category) {
      entries.forEach( function (item) { item.category = category; });
    }
  },
  computed: {
    searchResult: function () {
      var self = this;
      var results = [];
      for (var table in self.mp4ra) {
        newResults = self.mp4ra[table].db.filter(self.isAMatch);
        self.addCategory(newResults, self.mp4ra[table].category);
        results = results.concat(newResults);
      }
      return results;
    },
    lowerQuery: function () {
      var self = this;
      return self.query.toLowerCase();
    }
  },
  template: fs.readFileSync(__dirname + '/search.vue', 'utf8')
};
