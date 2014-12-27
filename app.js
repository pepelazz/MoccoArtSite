(function() {
  var module;

  module = angular.module('app', []);

  module.controller('main', ['$rootScope', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $scope, $http, $location, $timeout, $log) {})]);

  module.controller('picturesGallery', [
    '$rootScope', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $scope, $http, $location, $timeout, $log) {
      var arrangePictures, mainAreaWidth;
      mainAreaWidth = function() {
        return $('.main-area').width();
      };
      arrangePictures = (function() {
        var columnNums, windowWidth;
        $('.gallery-grid').css('height', $(window).height() * 0.85);
        windowWidth = $(window).width();
        columnNums = (function() {
          switch (false) {
            case !(windowWidth >= 750 && windowWidth < 1000):
              return 3;
            case !(windowWidth >= 500 && windowWidth < 750):
              return 2;
            case !(windowWidth < 500):
              return 1;
            default:
              return 4;
          }
        })();
        console.log(windowWidth, columnNums);
        $('.gallery-grid > li').each(function(index, el) {
          var col, picWidth, row, upperEl, upperElBottom;
          picWidth = mainAreaWidth() / columnNums - columnNums * 10;
          row = Math.floor(index / columnNums);
          col = index - row * columnNums;
          if (index > columnNums - 1) {
            upperEl = $('.gallery-grid > li').eq(index - columnNums);
            upperElBottom = upperEl.position().top + upperEl.height();
          } else {
            upperElBottom = -20;
          }
          $(el).width(picWidth).css('left', (picWidth + 20) * col).css('top', upperElBottom + 20);
        });
      });
      arrangePictures();
      $(window).resize(function() {
        return arrangePictures();
      });
    })
  ]);

}).call(this);
