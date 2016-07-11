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