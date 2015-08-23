(function(angular) {
  'use strict';

  var mod = angular.module('ngFilterSortExample', ['ngFilterSort']);

  function ctrl(ngFilterSortUtils, ngFilterSortService) {
    this.items = [{id: 1, title: 'black 20 port ethernet switch', type: 'SWITCH', date: '10.09.2015'}, {id: 2, title: 'red ethernet cable', type: 'CABLE', date: '10.08.2015'}, {id: 3, title: 'black flatscreen monitor', type: 'MONITOR', date: '11.09.2015'}];
    var types = ['MONITOR', 'CABLE', 'SWITCH'];
    this.types = ngFilterSortUtils.prepareItemsForCheckboxFilter(types);

    var self = this;

    var filterSortConfig = {
      filterFns: [{filterID: 'type', fn: function(currentItem, filterItem) {
        return currentItem.type === filterItem.name;
      }}, {
        filterID: 'search', fn: function(currentItem, filterItem) {
          var filterItems = filterItem.split(' ');
          return filterItems.some(function(item) {
            return currentItem.title.toLowerCase().indexOf(item.toLowerCase()) !== -1;
          });
        }
      }/*, {
        filterID: 'date', fn: function(currentItem, filterItem) {
          if (filterItem === '') {
          console.log('blaga')
            return true;
          }
          return true;
          //return currentItem.date === filterItem;
        }
      }*/],
      sortFns: [{
        sorterId: 'title',
        fn: function(a, b) {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          } else {
            return 0;
          }
        }
      }],
      doneCB: doneCB,
      list: this.items
    };
    this.filterSortID = 'example';
    var filterSortInstance = ngFilterSortService.getNewInstance(this.filterSortID, filterSortConfig);

    function doneCB(list) {
      self.items = list;
    }
  }

  mod.controller('mainCtrl', ctrl);
})(angular);