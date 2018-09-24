global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
var Vue = require('vue');
var VueRouter = require('vue-router');
window.Vue = Vue;
var und = require('underscore');
var Papa = require('papaparse');
require('bootstrap');
require('popper.js');

// Load component
Vue.component('mp4ra-table', require('./components/table.js'));

// Load pages
var Home = require('./pages/home.js');
var Atoms = require('./pages/atoms.js');
var Brands = require('./pages/brands.js');
var Codecs = require('./pages/codecs.js');
var TrackReferences = require('./pages/track_references.js');
var References = require('./pages/references.js');
var Search = require('./pages/search.js');
var Misc = require('./pages/misc.js');
var ObjectTypes = require('./pages/object_types.js');
var Request = require('./pages/request.js');

Vue.use(VueRouter);

var router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    { path: '/atoms', component: Atoms },
    { path: '/brands', component: Brands },
    { path: '/codecs', component: Codecs },
    { path: '/track_references', component: TrackReferences },
    { path: '/references', component: References },
    { path: '/search', component: Search },
    { path: '/misc', component: Misc },
    { path: '/object_types', component: ObjectTypes },
    { path: '/request', component: Request }
  ]
});

// Filters
Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

var app = new Vue({
  el: '#app',
  data: {
    mp4ra: {
      boxes: {
        db: null,
        url: 'CSV/boxes.csv',
        category: 'atoms',
        name: 'ISO family codes'
      },
      boxes_udta: {
        db: null,
        url: 'CSV/boxes-udta.csv',
        category: 'atoms',
        name: 'User-data codes'
      },
      boxes_qt: {
        db: null,
        url: 'CSV/boxes-qt.csv',
        category: 'atoms',
        name: 'QuickTime codes'
      },
      brands: {
        db: null,
        url: 'CSV/brands.csv',
        category: 'brands' ,
        name: 'Brands'
      },
      color_types: {
        db: null,
        url: 'CSV/color-types.csv',
        category: 'color types',
        name: 'Color types'
      },
      data_references: {
        db: null,
        url: 'CSV/data-references.csv',
        category: 'data references',
        name: 'Data references'
      },
      handlers: {
        db: null,
        url: 'CSV/handlers.csv',
        category: 'handlers',
        name: 'Handlers'
      },
      item_references: {
        db: null,
        url: 'CSV/item-references.csv',
        category: 'item references',
        name: 'Item references'
      },
      item_types: {
        db: null,
        url: 'CSV/item-types.csv',
        category: 'item types',
        name: 'Item types'
      },
      item_properties: {
        db: null,
        url: 'CSV/item-properties.csv',
        category: 'item properties',
        name: 'Item properties'
      },
      multiview_attributes: {
        db: null,
        url: 'CSV/multiview-attributes.csv',
        category: 'multiview attributes',
        name: 'Multiview attributes'
      },
      oti: {
        db: null,
        url: 'CSV/oti.csv',
        category: 'oti',
        name: 'Oti'
      },
      sample_entries: {
        db: null,
        url: 'CSV/sample-entries.csv',
        category: 'codecs',
        name: 'Sample entries'
      },
      sample_entries_boxes: {
        db: null,
        url: 'CSV/sample-entries-boxes.csv',
        category: 'codecs',
        name: 'Sample entries boxes'
      },
      sample_entries_qt: {
        db: null,
        url: 'CSV/sample-entries-qt.csv',
        category: 'codecs',
        name: 'Sample entries QuickTime'
      },
      sample_groups: {
        db: null,
        url: 'CSV/sample-groups.csv',
        category: 'sample groups',
        name: 'Sample groups'
      },
      schemes: {
        db: null,
        url: 'CSV/schemes.csv',
        category: 'schemes',
        name: 'Protected and restricted schemes'
      },
      specifications: {
        db: null,
        url: 'CSV/specifications.csv',
        category: 'references',
        name: 'Specifications'
      },
      stream_types: {
        db: null,
        url: 'CSV/stream-types.csv',
        category: 'object type',
        name: 'Stream types'
      },
      track_groups: {
        db: null,
        url: 'CSV/track-groups.csv',
        category: 'track groups',
        name: 'Track groups'
      },
      entity_groups: {
        db: null,
        url: 'CSV/entity-groups.csv',
        category: 'entity groups',
        name: 'Entity groups'
      },
      track_references: {
        db: null,
        url: 'CSV/track-references.csv',
        category: 'track_references',
        name: 'Track references'
      },
      track_references_qt: {
        db: null,
        url: 'CSV/track-references-qt.csv',
        category: 'track_references',
        name: 'Track references QuickTime'
      },
      track_selection: {
        db: null,
        url: 'CSV/track-selection.csv',
        category: 'track selection',
        name: 'Track selection'
      }
    }
  },
  created: function () {
    var self = this;
    self.loadMP4RAData();
  },
  methods: {
    addAnchor: function(item) {
      var self = this;
      if ('specification' in item) {
        var spec = und.find(
          self.mp4ra.specifications.db, function (e) {
            return e.specification == item.specification;
          }
        );
        if(spec !== undefined) item.specificationAnchor = spec.linkname;
      }
      if ('handler' in item) {
        var handler = und.find(
          self.mp4ra.handlers.db, function (e) {
            return e.description == item.handler;
          }
        );
        if(handler !== undefined) item.handlerAnchor = handler.code;
      }
    },
    addCategory: function (item, category) {
      item.category = category;
    },
    loadData: function(table) {
      var self = this;
      $.get(self.mp4ra[table].url, function(response) {
        self.mp4ra[table].db = Papa.parse(response, { header: true }).data;
        self.mp4ra[table].db.forEach( function(item) {
            self.addAnchor(item);
            self.addCategory(item, self.mp4ra[table].category);
        });
      });
    },
    loadMP4RAData: function() {
      var self = this;
      $.get(self.mp4ra.specifications.url, function(response) {
        self.mp4ra.specifications.db = Papa.parse(response, { header: true }).data;
        self.loadData('boxes');
        self.loadData('boxes_udta');
        self.loadData('boxes_qt');
        self.loadData('brands');
        self.loadData('color_types');
        self.loadData('data_references');
        self.loadData('item_references');
        self.loadData('multiview_attributes');
        self.loadData('oti');
        self.loadData('sample_groups');
        self.loadData('schemes');
        self.loadData('stream_types');
        self.loadData('track_groups');
        self.loadData('entity_groups');
        self.loadData('track_references');
        self.loadData('track_references_qt');
        self.loadData('track_selection');
        $.get(self.mp4ra.handlers.url, function(response) {
          self.mp4ra.handlers.db = Papa.parse(response, { header: true }).data;
          self.mp4ra.handlers.db.forEach( function(item) { self.addAnchor(item); });
          self.loadData('sample_entries');
          self.loadData('item_types');
          self.loadData('item_properties');
          self.loadData('sample_entries_boxes');
          self.loadData('sample_entries_qt');
        });
      });
    }
  },
  router: router
});

window.app = app;
