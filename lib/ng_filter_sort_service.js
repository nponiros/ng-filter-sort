(function(angular, moduleName) {
  'use strict';

  function ngFilterSortService() {
    var instances = {};

    function NgFilterSort(config) {
      this.filterFns = config.filterFns || [];
      this.sortFns = config.sortFns || [];
      this.doneCB = config.doneCB;

      // Filter directives
      this.filters = {};
      this.sorters = {};

      if (config.list) {
        this.originalList = config.list.slice(0);
      } else {
        throw new Error('List of data is needed for ngFilterSort to work');
      }
    }

    // TODO: custom needs a way to get data
    NgFilterSort.prototype.triggerFilterPipeline = function() {
      var self = this;
      function next(filterIndex, items) {
        if (filterIndex + 1 > self.filterFns.length) {
          self.doneCB(items);
        } else {
          var filterFn = self.filterFns[filterIndex];
          var filterItems = self.filters[filterFn.filterID]();
          var newItems = [];
          items.forEach(function(currentItem) {
            filterItems.forEach(function(filterItem) {
              if (filterFn.fn(currentItem, filterItem)) {
                newItems.push(currentItem);
              }
            });
          });
          next(filterIndex + 1, newItems);
        }
      }
      next(0, this.originalList);
    };

    NgFilterSort.prototype.triggerSortPipeline = function() {

    };

    // TODO: filters should unregister themselves
    NgFilterSort.prototype.registerFilter = function(id, getData) {
      this.filters[id] = getData;
    };

    function getNewInstance(id, config) {
      var instance = new NgFilterSort(config);
      instances[id] = instance;
      return instance;
    }

    function getInstance(id) {
      var instance = instances[id];
      if (instance) {
        return instance;
      } else {
        throw new Error('Instance not available');
      }
    }

    return {
      getNewInstance: getNewInstance,
      getInstance: getInstance
    }
  }

  angular.module(moduleName).factory('ngFilterSortService', ngFilterSortService);
})(angular, window.ngFilterSort);