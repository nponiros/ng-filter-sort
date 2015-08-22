(function(angular, moduleName) {
  'use strict';

  function ngFilterSortCheckboxDirective(ngFilterSortService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/ng_filter_sort_checkbox_directive.html',
      scope: {filterItems: '=filterItems', filterSortID: '@filterSortId', filterID: '@filterId'},
      controller: function() {
        var instance = ngFilterSortService.getInstance(this.filterSortID);
        instance.registerFilter(this.filterID, getData);
        var self = this;

        function getData() {
          return self.filterItems;
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

  angular.module(moduleName).directive('ngFilterSortCheckbox', ngFilterSortCheckboxDirective);
})(angular, window.ngFilterSort);