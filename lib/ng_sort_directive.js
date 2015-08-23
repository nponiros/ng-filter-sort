(function(angular, moduleName) {
  'use strict';

  function ngSortDirective(ngFilterSortService) {
    return {
      restrict: 'E',
      templateUrl: '../lib/ng_sort_directive.html',
      scope: {filterSortID: '@filterSortId', sorterID: '@sorterId'},
      controller: function() {
        var instance = ngFilterSortService.getInstance(this.filterSortID);
        var self = this;

        this.sort = function(ascending) {
          instance.triggerSort(this.sorterID, ascending);
        };
      },
      controllerAs: 'vm',
      bindToController: true
    };
  }

  angular.module(moduleName).directive('ngSort', ngSortDirective);
})(angular, window.ngFilterSort);