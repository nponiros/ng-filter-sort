(function(angular, moduleName) {
  'use strict';

  function ngFilterSortCustomDirective(ngFilterSortService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/ng_filter_sort_custom_directive.html',
      scope: {filterSortID: '@filterSortId', filterID: '@filterId'},
      controller: function() {
        var instance = ngFilterSortService.getInstance(this.filterSortID);
        instance.registerFilter(this.filterID, getData);
        var self = this;

        function getData() {
          //return [self.searchTerm];
          return [];
        }

        this.isOpen = false;
        this.openFilter = function() {
          this.isOpen = true;
        };

        this.closeFilter = function() {
          this.isOpen = false;
          instance.triggerFilterPipeline();
        };
      },
      controllerAs: 'vm',
      bindToController: true,
      transclude: true
    };
  }

  angular.module(moduleName).directive('ngFilterSortCustom', ngFilterSortCustomDirective);
})(angular, window.ngFilterSort);