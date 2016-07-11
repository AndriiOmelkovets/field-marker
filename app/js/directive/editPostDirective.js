(function () {
  'use strict';

  angular
      .module('app')
      .directive('editPostDirective', editPostDirective);

  function editPostDirective() {
    var directive = {
      link: link,
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
      scope.edit = false;
      scope.newPost = null;

      scope.editPost = function (index) {
        scope.edit = true;
        scope.newPost = angular.copy(scope.lists[index].description);
      }

      scope.updatePost = function (index, edit) {
        scope.lists[index].description = edit;
        scope.newPost = null;
        scope.edit = false;
      }

      scope.deletePost = function (index) {
        scope.lists.splice(index, 1);
      }
    }
  }

})();