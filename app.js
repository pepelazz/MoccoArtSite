(function() {
  var module;

  module = angular.module('app', []);

  module.controller('main', ['$rootScope', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $scope, $http, $location, $timeout, $log) {})]);

  module.controller('picturesGallery', [
    '$rootScope', '$document', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $document, $scope, $http, $location, $timeout, $log) {
      var arrangePictures, imgLoad, mainAreaWidth, pictureFullSize;
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
      imgLoad = imagesLoaded($('.gallery-grid'));
      imgLoad.on('always', function() {
        return arrangePictures();
      });
      $(window).resize(function() {
        return arrangePictures();
      });
      pictureFullSize = (function() {
        var windowHeight, windowWidth;
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        $('.picture-wrapper').css('width', windowWidth).css("height", windowHeight);
        $('.picture').css('max-width', windowWidth * 0.9).css('max-height', windowHeight * 0.9).css('width', 'auto').css("height", "auto");
      });
      $scope.galleryImg = {
        currentImgFileName: null,
        currentImgIndex: null,
        show: (function(index) {
          this.isBackdropShow = true;
          this.currentImgFileName = picturesArray[index].fileName;
          this.currentImgIndex = +index;
          if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply();
          }
          pictureFullSize();
        }),
        close: (function() {
          this.isBackdropShow = false;
          this.currentImgFileName = null;
          this.currentImgIndex = null;
          if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply();
          }
        }),
        isNextLeft: (function() {
          return this.currentImgIndex !== 0;
        }),
        isNextRight: (function() {
          return this.currentImgIndex !== picturesArray.length - 1;
        }),
        nextLeft: (function() {
          this.currentImgIndex--;
          this.currentImgFileName = picturesArray[this.currentImgIndex].fileName;
          pictureFullSize();
          if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply();
          }
        }),
        nextRight: (function() {
          this.currentImgIndex++;
          this.currentImgFileName = picturesArray[this.currentImgIndex].fileName;
          pictureFullSize();
          if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply();
          }
        }),
        isBackdropShow: false
      };
      $document.keydown(function(e) {
        if ($scope.galleryImg.currentImgIndex !== null) {
          if (e.keyCode === 37 && $scope.galleryImg.isNextLeft()) {
            $scope.galleryImg.nextLeft();
          }
          if (e.keyCode === 39 && $scope.galleryImg.isNextRight()) {
            $scope.galleryImg.nextRight();
          }
          if (e.keyCode === 27) {
            $scope.galleryImg.close();
          }
        }
        console.log(e.keyCode);
      });
    })
  ]);

  module.directive('fixWidth', [
    (function() {
      return {
        restrict: 'A',
        link: function($scope, element, attrs) {
          var arrangeHeight;
          console.log('here');
          arrangeHeight = (function() {
            $(element).css('height', $(window).height() * 0.85);
          });
          arrangeHeight();
          $(window).resize(function() {
            return arrangeHeight();
          });
        }
      };
    })
  ]);

}).call(this);
