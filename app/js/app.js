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
