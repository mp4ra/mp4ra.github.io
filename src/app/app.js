global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
var Vue = require('vue');
window.Vue = Vue;
var und = require('underscore');
var Papa = require('papaparse');

Vue.component('mp4ra-table', {
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
  template: '<table class="codes" border=4 cellpadding=0 cellspacing=2>' +
       '<thead>' +
         '<tr >' +
           '<th v-for="col in columns">{{ col }}</th>' +
         '</tr>' +
       '</thead>' +
       '<tbody>' +
         '<tr v-for="item in data">' +
           '<td v-if="columns.indexOf(\'name\') !== -1">' +
             '<a v-bind:id="item.linkname" v-bind:name="item.linkname"></a>' +
             '{{ item.specification }}' +
           '</td>' +
           '<td v-if="columns.indexOf(\'code\') !== -1" class="code">' +
             '{{ item.code }}' +
           '</td>' +
           '<td v-if="columns.indexOf(\'description\') !== -1">' +
             '<template v-if="hasHTMLLink(item.description)">' +
               '<div v-rawhtml v-bind:data="item.description"/>' +
             '</template>' +
             '<template v-else>' +
               '{{ item.description }}' +
             '</template>' +
           '</td>' +
           '<td v-if="columns.indexOf(\'type\') !== -1">' +
             '{{ item.type }}' +
           '</td>' +
           '<td v-if="columns.indexOf(\'handler\') !== -1">' +
             '<div v-if="item.handlerAnchor">' +
               '<a v-bind:href="\'handler.html#\' + item.handlerAnchor">' +
                 '{{ item.handler }}' +
               '</a>' +
             '</div>' +
             '<div v-else>' +
               '{{ item.handler }}' +
             '</div>' +
           '</td>' +
           '<td v-if="columns.indexOf(\'specification\') !== -1">' +
             '<div v-if="item.specificationAnchor">' +
               '<a v-bind:href="\'specs.html#\' + item.specificationAnchor">' +
                 '{{ item.specification }}' +
               '</a>' +
             '</div>' +
             '<div v-else>' +
               '{{ item.specification }}' +
             '</div>' +
           '</td>' +
           '<td v-if="columns.indexOf(\'ObjectType\') !== -1">' +
             '{{ item.ObjectType }}' +
           '</td>' +
         '</tr>' +
        '</tbody>' +
     '</table>'
});

var app = new Vue({
  el: '#app',
  data: {
    boxes: null,
    boxes_udta: null,
    boxes_qt: null,
    brands: null,
    color_types: null,
    data_references: null,
    handlers: null,
    item_references: null,
    item_types: null,
    multiview_attributes: null,
    oti: null,
    sample_entries: null,
    sample_entries_boxes: null,
    sample_entries_qt: null,
    sample_groups: null,
    schemes: null,
    specifications: null,
    stream_types: null,
    track_selection: null,
    track_references: null,
    track_references_qt: null,
    urls: {
      boxes: 'CSV/boxes.csv',
      boxes_udta: 'CSV/boxes-udta.csv',
      boxes_qt: 'CSV/boxes-qt.csv',
      brands: 'CSV/brands.csv',
      color_types: 'CSV/color-types.csv',
      data_references: 'CSV/data-references.csv',
      handlers: 'CSV/handlers.csv',
      item_references: 'CSV/item-references.csv',
      item_types: 'CSV/item-types.csv',
      multiview_attributes: 'CSV/multiview-attributes.csv',
      oti: 'CSV/oti.csv',
      sample_entries: 'CSV/sample-entries.csv',
      sample_entries_boxes: 'CSV/sample-entries-boxes.csv',
      sample_entries_qt: 'CSV/sample-entries-qt.csv',
      sample_groups: 'CSV/sample-groups.csv',
      schemes: 'CSV/schemes.csv',
      specifications: 'CSV/specifications.csv',
      stream_types: 'CSV/stream-types.csv',
      track_selection: 'CSV/track-selection.csv',
      track_references: 'CSV/track-references.csv',
      track_references_qt: 'CSV/track-references-qt.csv'
    }
  },
  created: function() {
    var self = this;
    self.loadMP4RAData();
  },
  methods: {
    addAnchor: function(item) {
      var self = this;
      if ('specification' in item) {
        var spec = und.find(
          self.specifications, function (e) {
            return e.specification == item.specification;
          }
        );
        if(spec !== undefined) item.specificationAnchor = spec.linkname;
      }
      if ('handler' in item) {
        var handler = und.find(
          self.handlers, function (e) {
            return e.description == item.handler;
          }
        );
        if(handler !== undefined) item.handlerAnchor = handler.code;
      }
    },
    loadData: function(data) {
      var self = this;
      $.get(self.urls[data], function(response) {
        self[data] = Papa.parse(response, { header: true }).data;
        self[data].forEach( function(item) { self.addAnchor(item); });
      });
    },
    loadMP4RAData: function() {
      var self = this;
      $.get(self.urls.specifications, function(response) {
        self.specifications = Papa.parse(response, { header: true }).data;
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
        self.loadData('track_selection');
        self.loadData('track_references');
        self.loadData('track_references_qt');
        $.get(self.urls.handlers, function(response) {
          self.handlers = Papa.parse(response, { header: true }).data;
          self.handlers.forEach( function(item) { self.addAnchor(item); });
          self.loadData('sample_entries');
          self.loadData('item_types');
          self.loadData('sample_entries_boxes');
          self.loadData('sample_entries_qt');
        });
      });
    }
  }
});

window.app = app;
