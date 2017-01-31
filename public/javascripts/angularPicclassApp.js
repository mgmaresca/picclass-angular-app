

// Define the `picclassApp` module
var picclassApp = angular.module('picclassApp', ['ngRoute', 'ngResource', 'ngFileUpload', 'picclassClient']);


picclassApp.config(function(LoopBackResourceProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');


    // Now is just working locally
     var urlBase = 'https://localhost:4002/api';

    // URL where to access the LoopBack REST API server
    //	var urlBase = 'https://api.eu.apiconnect.ibmcloud.com/dsftc-dev/sb/api';
    LoopBackResourceProvider.setUrlBase(urlBase);
  });

 
 picclassApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
   $locationProvider.html5Mode({enabled: true,requireBase: false });
   $routeProvider
     .when('/user/album/:album_id', {
      templateUrl: '/html/all.html',
      controller: "albumController"
     })
     .when('/user/home', {
      templateUrl: '/html/all.html',
       controller: 'homeController'
    })
  	.when('/user/upload', {
       templateUrl: '/html/upload.html',
       controller: 'uploadController'
     })
     //.otherwise({
     //  redirectTo: '/html/index.html'
     //});
 }]);

 //Still needs to filter empty albums and only user's albums
 picclassApp.controller('MainCtrl', ['$scope', 'Album',
  function MainCtrl($scope, Album) {
    $scope.albums = [];
    Album.find(function(data){
      $scope.albums = data;   
    });
    
}]);

  //Still needs to filter empty albums and only user's albums
 picclassApp.controller('albumController', ['$scope', 'Photo', '$routeParams',
  function albumController($scope, Photo, $routeParams) {
    $scope.photos = [];
    console.log("routerParam: " + $routeParams.album_id)
    Photo.find({filter:{where:{albumId: $routeParams.album_id}}},
      function(data){
      $scope.photos = data;
    });
    
}]);

  //Still needs to filter empty albums and only user's albums
 picclassApp.controller('homeController', ['$scope', 'Photo',
  function homeController($scope, Photo) {
    $scope.photos = [];
    Photo.find(function(data){
      $scope.photos = data;
    });
    
}]);




// // Define the `homeController` controller on the `picclassApp` module
// picclassApp.controller('homeController', ['$scope','Photo', function angularNotesClientViewController($scope, Photo) {
//   $scope.albums = [];
//   Album.find(function(data){

 // $scope.photos = data;});
 
// }]);


// // Define the `uploadController` controller on the `picclassApp` module
// picclassApp.controller('angularNotesClientViewController', ['$scope','Note', function angularNotesClientViewController($scope, Note) {
//   $scope.notes = [];
//   Note.find(function(data){$scope.notes = data;});
 
// }]);

 // Define the `updateController` controller on the `picclassApp` module


 picclassApp.controller('uploadController', ['$scope', 'Upload', '$timeout', function uploadController($scope, Upload, $timeout) {
    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/pictures/upload',
                method: "POST",
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
    }
}]);


 // picclassApp.controller('uploadController', ['$scope','Photo','$location', '$routeParams', function uploadController($scope, Photo, $location, $routeParams) {
 //   $scope.photo={ };
 //   $scope.submitPhoto=function(data){
 // 	$scope.photo.name=data.name;
 //  $scope.photo.tag=data.tag;
 //  $scope.photo.url=data.url;
 //  $scope.photo.created = Date.now(); 
 //  $scope.photo._attachments={
 //    "picture": {
 //      "content_type":"image/jpeg",
 //      "data": data.encoded
 //    }
 //  };
 // 	Photo.create($scope.photo,function(){
 // 	  $location.path('/user/home');
 //   });
 //   };
 // }]);

// // Define the `angularNotesClientDeleteController` controller on the `picclassApp` module
// picclassApp.controller('angularNotesClientDeleteController', ['$scope','Note','$routeParams','$location', function angularNotesClientDeleteController($scope, Note,$routeParams,$location) {

//   Note.deleteById({
//     id: $routeParams.id
//   },function(){
// 	  $location.path('/html/view');
//   });
 
// }]);

// // Define the `angularNotesClientUpdateController` controller on the `picclassApp` module
// picclassApp.controller('angularNotesClientUpdateController', ['$scope','Note','$routeParams','$location', function angularNotesClientUpdateController($scope, Note,$routeParams,$location) {
//   $scope.note=Note.findById({"id":$routeParams.id});
//   $scope.submitNote=function(){
// 	Note.replaceById($scope.note,function(){
// 	  $location.path('/html/view');
// 	  });
//   }
// }]);


