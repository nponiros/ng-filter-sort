(function(angular, moduleName) {
  'use strict';

  function ngFilterSortUtils() {
    this.prepareItemsForCheckboxFilter = function(items) {
      return items.map(function(item) {
        // default all items are checked
        if (typeof item === 'object') {
          item.checked = true;
        } else {
          item = {
            name: item,
            checked: true
          };
        }
        return item;
      });
    };
  }

  angular.module(moduleName).service('ngFilterSortUtils', ngFilterSortUtils);
})(angular, window.ngFilterSort);