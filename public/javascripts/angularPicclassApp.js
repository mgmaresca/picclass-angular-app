

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

picclassApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

 
 picclassApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
   $locationProvider.html5Mode({enabled: true,requireBase: false });
   $routeProvider
     .when('/user/:user_id/album/:album_id', {
      templateUrl: '/html/all.html',
      controller: "albumController"
     })
     .when('/user/:user_id/home', {
      templateUrl: '/html/all.html',
       controller: 'homeController'
    })
  	.when('/user/:user_id/upload', {
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
    console.log("We got the user! " + $scope.user);
    $scope.albums = [];
    Album.find({filter:{where:{userId: "8864827ae78469ae3498a96a16402d2f"}}}, function(data){
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


 picclassApp.controller('uploadController', ['$scope', 'Upload', 'Album', 'Photo', '$timeout', function uploadController($scope, Upload, Album, Photo, $timeout) {
    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;

        angular.forEach(files, function(file) {
            console.log("File: " + JSON.stringify(file));

            file.upload = Upload.upload({
                url: 'http://localhost:4001/pictures/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {

              console.log("This is the response: " + response.data.message +
                            " " +
                            response.data.photo_name + 
                            " " + 
                            response.data.photo_url + 
                            " " + 
                            response.data.photo_tag);

              var new_photo = response.data;

              //When we have success we are going to popuate Cloudant
              //First we check if the user already has the album with the tag
              Album.find({filter:{where:{category: new_photo.photo_tag}}}, function(album_array){

                var photo = {
                  "name": new_photo.photo_name,
                  "created": Date.now(),
                  "tag": new_photo.photo_tag,
                  "url": new_photo.photo_url,
                  "albumId": ""
                }

                if(album_array.length > 0){
                  // The album already exists. We upload the new picture to it
                  photo.albumId = album_array[0].id;

                  Photo.create(photo,function(data){
                    console.log("New photo uploaded, to existing album " + JSON.stringify(data));
                  });

                }else{
                  // The album doesn't exist yet. We first create it and then upload the pictures to it.
                  var new_album = {
                    "category": new_photo.photo_tag,
                    "created": Date.now(),
                    "title": new_photo.photo_tag,
                    "userId": "8864827ae78469ae3498a96a16402d2f"
                  }

                  Album.create(new_album, function(data){
                    console.log("New album created " + JSON.stringify(data));

                    photo.albumId = data.id;

                    Photo.create(photo,function(data){
                      console.log("New photo uploaded, to existing album " + JSON.stringify(data));
                    });

                  });

                }

                

              }); 

                $timeout(function () {
                  console.log("Executing timeout function");
                    file.result = response.data;
                    
                });

            }, function (response) {
             console.log("Executing second function");

                if (response.status > 0){

                  $scope.errorMsg = response.status + ': ' + response.data;
                  console.log("This id the data displayed " + response.data);

                }
                    
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


