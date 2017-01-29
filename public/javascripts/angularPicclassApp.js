

// Define the `picclassApp` module
var picclassApp = angular.module('picclassApp', ['ngRoute', 'ngResource','picclassClient']);


picclassApp.config(function(LoopBackResourceProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');


    // Now is just working locally
    // URL where to access the LoopBack REST API server
    	var urlBase = 'https://localhost:4002/api';
    LoopBackResourceProvider.setUrlBase(urlBase);
  });


 picclassApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
   $locationProvider.html5Mode({enabled: true,requireBase: false });
   $routeProvider
     .when('/', {
      redirectTo: '/html/login.html'
     })
     .when('/html/home', {
      templateUrl: '/html/home.html',
       controller: 'homeController'
     })
// 	.when('/html/album/:id', {
//       templateUrl: '/html/album.html',
//       controller: 'albumController'
//     })
// 	.when('/html/album/:id/photo/:id', {
//       templateUrl: '/html/photo.html',
//       controller: 'photoController'
//     })
     .otherwise({
       redirectTo: '/html/index.html'
     });
 }]);

// // Define the `homeController` controller on the `picclassApp` module
// picclassApp.controller('homeController', ['$scope','Photo', function angularNotesClientViewController($scope, Photo) {
//   $scope.photos = [];
//   Photo.find(function(data){$scope.photos = data;});
 
// }]);


// // Define the `uploadController` controller on the `picclassApp` module
// picclassApp.controller('angularNotesClientViewController', ['$scope','Note', function angularNotesClientViewController($scope, Note) {
//   $scope.notes = [];
//   Note.find(function(data){$scope.notes = data;});
 
// }]);

// // Define the `angularNotesClientCreateController` controller on the `picclassApp` module
// picclassApp.controller('angularNotesClientCreateController', ['$scope','Note','$location',function angularNotesClientCreateController($scope, Note,$location) {
//   $scope.note={ };
//   $scope.submitNote=function(data){
// 	$scope.note=data;
// 	Note.create($scope.note,function(data){
// 	  $location.path('/html/view');
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
