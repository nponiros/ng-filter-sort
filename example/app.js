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
        if (filterItem.checked) {
          return currentItem.type === filterItem.name;
        } else {
          return false;
        }
      }}, {
        filterID: 'search', fn: function(currentItem, filterItem) {
          if (filterItem === '') {
            return true;
          }
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
      sortFns: [],
      doneCB: filteringDoneCB,
      list: this.items
    };
    this.filterSortID = 'example';
    var filterSortInstance = ngFilterSortService.getNewInstance(this.filterSortID, filterSortConfig);

    function filteringDoneCB(filteredItems) {
      self.items = filteredItems;
    }
  }

  mod.controller('mainCtrl', ctrl);
})(angular);