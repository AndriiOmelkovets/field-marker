(function () {
  'use strict';

  angular.module('app', [
      'ngAnimate',
      'ngMaterial'
  ]);

  angular.module('app')
     .run(['$templateCache', function ($templateCache) {
       $templateCache.put("popup.html", '<div class="marker md-whiteframe-4dp">' +
         '<div class="popup" layout="column" ng-Show="visiblePopup">' +
         '<md-list>' +
         '<md-list-item class="md-2-line" layout="column" ng-repeat="list in lists track by $index" edit-post-directive>' +
         '<div class="wrap-button">' +
         '<md-button class="md-raised" ng-click="deletePost($index)"> Del </md-button>' +
         '<md-button class="md-raised" ng-click="editPost($index)" ng-if="!edit"> Edit </md-button>' +
         '</div>' +
         '<div class="md-list-item-text comment-list">' +
         '<div ng-if="!edit">' +
         '<h3>{{list.name}}{{vm.text}}</h3>' +
         '<p class="description">{{list.description}}</p>' +
         '</div>' +
         '<div ng-if="edit">' +
         '<form ng-submit="updatePost($index, newPost)">' +
         '<md-input-container class="input-container">' +
         '<label>Edit comment</label>' +
         '<input ng-model="newPost" type="text">' +
         '</md-input-container>' +
         '</form>' +
         '</div>' +
         '</div>' +
         '</md-list-item>' +
         '</md-list>' +
         '<form ng-submit="sendPost()">' +
         '<md-input-container class="input-container">' +
         '<label>Write comment</label>' +
         '<input ng-model="message" type="text" id="message" ng-focus="visibleButton=true">' +
         '</md-input-container>' +
         '<md-button class="md-raised submit-form" type="submit" ng-Show="visibleButton" ng-click="visibleButton=false"> Send Post </md-button>' +
         '</form>' +
         '</div>' +
         '</div>');
     }]);
})();

/*
 * Third party
 */
//= ../../node_modules/angular/angular.js
//= ../../node_modules/angular-aria/angular-aria.js
//= ../../node_modules/angular-animate/angular-animate.js
//= ../../node_modules/angular-material/angular-material.js

(function () {
  'use strict';

  angular
      .module('app')
      .directive('clickDirective', clickDirective);

  clickDirective.$inject = ['$compile', '$templateCache'];

  function clickDirective($compile, $templateCache) {

    var directive = {
      link: link,
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {

      var result = { x: 0, y: 0 };
      var delta = 10;
      var blockImg = document.getElementById('wrap-img');

      blockImg.onmousemove = function (e) {
        result.x = e.offsetX == undefined ? e.layerX : e.offsetX;
        result.y = e.offsetY == undefined ? e.layerY : e.offsetY;
      }

      element.bind('click', function (e) {
        var newMarker = document.createElement('popup-directive');
        newMarker.className = "my-marker";
        newMarker.setAttribute("ng-mouseenter", "visiblePopup=true");
        newMarker.setAttribute("ng-mouseleave", "visiblePopup=false");
        newMarker.setAttribute("ng-Show", "visibleMarker");
        newMarker.style.top = (result.y - delta) + "px";
        newMarker.style.left = (result.x - delta) + "px";
        newMarker.innerHTML = $templateCache.get('popup.html');

        angular.element(document.getElementById('wrap-img')).append($compile(newMarker)(scope));
      });
    }
  }

})();
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