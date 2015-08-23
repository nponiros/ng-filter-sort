(function(angular, moduleName) {
  'use strict';

  function ngFilterSortService() {
    var instances = {};

    function NgFilterSort(config) {
      this.filterFns = config.filterFns || [];
      this.sortFns = config.sortFns || [];
      this.doneCB = config.doneCB;

      // Filter directives
      this.filterDirectives = {};
      this.sorterDirectives = {};

      if (config.list) {
        this.originalList = config.list.slice(0);
        this.filteredList = this.originalList;
      } else {
        throw new Error('List of data is needed for ngFilterSort to work');
      }
    }

    // filterItems is an array of checked checkboxes
    function filteringCheckboxType(filterFn, filterItems, currentItem) {
      var items = [];
      filterItems.forEach(function(filterItem) {
        if (filterFn.fn(currentItem, filterItem)) {
          items.push(currentItem);
        }
      });
      return items;
    }

    // filterItem is a string
    function filteringInputType(filterFn, filterItem, currentItem) {
      var items = [];
      if (filterFn.fn(currentItem, filterItem)) {
        items.push(currentItem);
      }
      return items;
    }

    var filteringFunctions = {
      checkbox: filteringCheckboxType,
      input: filteringInputType
    };

    // TODO: custom needs a way to get data
    NgFilterSort.prototype.triggerFilterPipeline = function() {
      var self = this;

      function next(filterIndex, items) {
        if (filterIndex + 1 > self.filterFns.length) {
          self.filteredList = items;
          self.doneCB(items);
        } else {
          var filterFn = self.filterFns[filterIndex];
          var filterDirective = self.filterDirectives[filterFn.filterID];
          if (filterDirective.isActive()) {
            var filterItems = filterDirective.getData();
            var filterType = filterDirective.type;
            var newItems = [];
            items.forEach(function(currentItem) {
              newItems = newItems.concat(filteringFunctions[filterType](filterFn, filterItems, currentItem));
            });
            next(filterIndex + 1, newItems);
          } else {
            next(filterIndex + 1, items);
          }
        }
      }

      next(0, this.originalList);
    };

    NgFilterSort.prototype.triggerSort = function(sorterID, isAscending) {
      var sorter = this.sortFns.filter(function(sortFn) {
        return sortFn.sorterId === sorterID;
      })[0];
      this.filteredList = this.filteredList.sort(sorter.fn);
      if (!isAscending) {
        this.filteredList.reverse();
      }
      this.doneCB(this.filteredList);
    };

    // TODO: filters should unregister themselves
    NgFilterSort.prototype.registerFilter = function(id, type, getData, isActive) {
      this.filterDirectives[id] = {
        getData: getData,
        isActive: isActive,
        type: type
      };
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