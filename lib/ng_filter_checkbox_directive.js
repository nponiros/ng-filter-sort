(function(angular, moduleName) {
  'use strict';

  function ngFilterCheckboxDirective(ngFilterSortService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/ng_filter_checkbox_directive.html',
      scope: {filterItems: '=filterItems', filterSortID: '@filterSortId', filterID: '@filterId'},
      controller: function() {
        var filterType = 'checkbox';
        var instance = ngFilterSortService.getInstance(this.filterSortID);
        instance.registerFilter(this.filterID, filterType, getData, isActive);
        var self = this;

        function getData() {
          return self.filterItems.filter(function(item) {
            return item.checked;
          });
        }

        function isActive() {
          // If no item is checked the filter is inactive
          return self.filterItems.some(function(item) {
            return item.checked;
          });
        }

        this.isOpen = false;

        this.openFilter = function() {
          this.isOpen = true;
        };

        this.closeFilter = function() {
          this.isOpen = false;
          instance.triggerFilterPipeline();
        };

        this.selectAll = function() {
          this.filterItems.forEach(function(item) {
            item.checked = true;
          });
        };

        this.removeAll = function() {
          this.filterItems.forEach(function(item) {
            item.checked = false;
          });
        };
      },
      controllerAs: 'vm',
      bindToController: true
    };
  }

  angular.module(moduleName).directive('ngFilterCheckbox', ngFilterCheckboxDirective);
})(angular, window.ngFilterSort);