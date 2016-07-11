(function () {
  'use strict';

  angular
      .module('app')
      .directive('popupDirective', popupDirective);

  function popupDirective() {
    var directive = {
      link: link,
      restrict: 'EA',
      scope: true
    };
    return directive;

    function link(scope, element, attrs) {
      scope.name = "Vasya";
      scope.lists = [];

      element.on('click', function (event) {
        event.stopPropagation();
      });

      scope.sendPost = function () {
        if (scope.message) {
          scope.lists.push({
            name: scope.name,
            description: scope.message
          });
          scope.message = '';
        }
      }
    }
  }
})();