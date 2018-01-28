'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'components/home.html',
        controller:'StoriesController'
    });
    $routeProvider.when('/list', {
        templateUrl: 'components/list.html'
    });
    $routeProvider.when('/category/:category', {
        templateUrl: 'components/list.html',
        controller:'ListController'
    });
    $routeProvider.when('/detail/:id', {
        templateUrl: 'components/detail.html',
        controller:'DetailsController'
    });
}]).controller("StoriesController", ['$scope', '$http','$location', function ($scope, $http,$location) {
    $scope.fetchStories = function () {
        $http.get('http://localhost:8000/api/accounts/videos').then(function (results) {
            $scope.videos = results.data
        })
    }

    $scope.enableVideo=function(video){
        plyr.setup(document.querySelector('.video_'+video._id))
    }

    $scope.redirectToDetails=function(video){
        $location.path("/detail/"+video._id);
    }

    plyr.setup(document.querySelector('.js-player'),{autoplay:true});
    $(window).scrollTop($('.breaking-ribbon').offset().top-100,0)
}]).controller("DetailsController", ['$scope', '$http','$location','$routeParams', function ($scope, $http,$location,$routeParams) {

    $scope.fetchStory = function () {
        $http.get('http://localhost:8000/api/accounts/video/'+$routeParams.id).then(function (results) {
            $scope.story = results.data
            plyr.setup(document.querySelector('.js-player'),{autoplay:true});
        })
    }



}]).controller("ListController", ['$scope', '$http','$location','$routeParams', function ($scope, $http,$location,$routeParams) {

    $scope.fetchStories = function () {
        let params={}
        if($routeParams.category){
            params.category=$routeParams.category
            $scope.category=$routeParams.category
        }
        var req = {
            method: 'GET',
            url: 'http://localhost:8000/api/accounts/videos?category='+$routeParams.category,
            data: params
        }
        $http(req).then(function (results) {
            $scope.stories = results.data
        })
    }


    $scope.fetchVideos = function () {
        $http.get('http://localhost:8000/api/accounts/videos').then(function (results) {
            $scope.videos = results.data
        })
    }


    $scope.enableVideo=function(video){
        plyr.setup(document.querySelector('.video_'+video._id))
    }

    $scope.redirectToDetails=function(video){
        $location.path("/detail/"+video._id);
    }



}]).filter('viewDate',function(){
    return function(dateString){
        return moment(dateString).format("DD MMM YYYY hh:mm")
    }
})
