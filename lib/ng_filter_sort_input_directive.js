(function(angular, moduleName) {
  'use strict';

  function ngFilterSortInputDirective(ngFilterSortService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/ng_filter_sort_input_directive.html',
      scope: {filterSortID: '@filterSortId', filterID: '@filterId'},
      controller: function() {
        var instance = ngFilterSortService.getInstance(this.filterSortID);
        instance.registerFilter(this.filterID, getData);
        var self = this;
        this.searchTerm = '';

        function getData() {
          return [self.searchTerm];
        }

        this.search = function() {
          instance.triggerFilterPipeline();
        };
      },
      controllerAs: 'vm',
      bindToController: true
    };
  }

  angular.module(moduleName).directive('ngFilterSortInput', ngFilterSortInputDirective);
})(angular, window.ngFilterSort);