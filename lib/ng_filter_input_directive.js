(function(angular, moduleName) {
  'use strict';

  function ngFilterInputDirective(ngFilterSortService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/ng_filter_input_directive.html',
      scope: {filterSortID: '@filterSortId', filterID: '@filterId'},
      controller: function() {
        var filterType = 'input';
        var instance = ngFilterSortService.getInstance(this.filterSortID);
        instance.registerFilter(this.filterID, filterType, getData, isActive);
        var self = this;
        this.searchTerm = '';

        function getData() {
          return self.searchTerm;
        }

        function isActive() {
          return self.searchTerm !== '';
        }

        this.search = function() {
          instance.triggerFilterPipeline();
        };
      },
      controllerAs: 'vm',
      bindToController: true
    };
  }

  angular.module(moduleName).directive('ngFilterInput', ngFilterInputDirective);
})(angular, window.ngFilterSort);