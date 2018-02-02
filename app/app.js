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
        controller: 'StoriesController'
    });
    $routeProvider.when('/list', {
        templateUrl: 'components/list.html'
    });
    $routeProvider.when('/category/:category', {
        templateUrl: 'components/list.html',
        controller: 'ListController'
    });
    $routeProvider.when('/article/:id/:header', {
        templateUrl: 'components/detail.html',
        controller: 'DetailsController'
    });
}]).controller("StoriesController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.fetchStories = function () {
        $http.get('https://astrohealthmanager.herokuapp.com/api/accounts/videos').then(function (results) {
            $scope.videos = results.data
        })
    }

    $scope.enableVideo = function (video) {
        plyr.setup(document.querySelector('.video_' + video._id))
    }

    $scope.enableYoutubePlayList=function(){
        plyr.setup('.youtube-playlist',{autoplay:true})[0].source({
            type:       'video',
            title:      'Example title',
            sources:$scope.videos.map(function(video){return {src:video.link,type:(video.source.toLowerCase()==='youtube'?'youtube':'video')}})
        });
        $(window).scrollTop($('.breaking-ribbon').offset().top - 50, 0)
    }

    $scope.redirectToDetails = function (video) {
        $location.path("/article/" + [video._id,video.header].join("/"));
    }


}]).controller('AppController',['$scope','Page','$interval',function($scope,Page,$interval){
    $scope.Page=Page

    $scope.getDate=function(){
        $scope.date=moment(new Date()).format("DD MMM YYYY")
        $scope.time=moment(new Date()).format("hh:mm A")

    }
    setInterval($scope.getDate, 1000*60);

}]).controller("DetailsController", ['$scope', '$http', '$location', '$routeParams',"Page", function ($scope, $http, $location, $routeParams,Page) {

    $scope.fetchStory = function () {
        $http.get('https://astrohealthmanager.herokuapp.com/api/accounts/video/' + $routeParams.id).then(function (results) {
            Page.setTitle(results.data.title)
            $scope.story = results.data
        })
    }

    $scope.enableYoutube = function (story) {
        setTimeout(function () {
            plyr.setup(document.querySelector('.youtube-video-'+story._id), {autoplay: true});
        }, 100)

    }

    $scope.enableUploadVideo = function (story) {
        setTimeout(function () {
            plyr.setup(document.querySelector('.js-player-'+story._id), {autoplay: true});
        }, 100)

    }

    $scope.fetchVideos = function () {
        $http.get('https://astrohealthmanager.herokuapp.com/api/accounts/videos').then(function (results) {
            $scope.videos = results.data
        })
    }

    $scope.redirectToDetails = function (video) {
        $location.path("/article/" + [video._id,video.header].join("/"));
    }


}]).controller("ListController", ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {

    $scope.fetchStories = function () {
        let params = {}
        if ($routeParams.category) {
            params.category = $routeParams.category
            $scope.category = $routeParams.category
        }
        var req = {
            method: 'GET',
            url: 'https://astrohealthmanager.herokuapp.com/api/accounts/videos?category=' + $routeParams.category,
            data: params
        }
        $http(req).then(function (results) {
            $scope.stories = results.data
        })
    }


    $scope.fetchVideos = function () {
        $http.get('https://astrohealthmanager.herokuapp.com/api/accounts/videos').then(function (results) {
            $scope.videos = results.data
        })
    }


    $scope.enableVideo = function (video) {
        plyr.setup(document.querySelector('.video_' + video._id))
    }

    $scope.redirectToDetails = function (video) {
        $location.path("/article/" + [video._id,video.header].join("/"));
    }

    $scope.enableYoutube = function (story) {
        setTimeout(function () {
            plyr.setup(document.querySelector('.youtube-video-'+story._id), {autoplay: false});
        }, 100)

    }

    $scope.enableUploadVideo = function (story) {
        setTimeout(function () {
            plyr.setup(document.querySelector('.js-player-'+story._id), {autoplay: false});
        }, 100)

    }


}]).filter('viewDate', function () {
    return function (dateString) {
        return moment(dateString).format("DD MMM YYYY hh:mm A")
    }
}).filter('youtubeLink', function () {
    return function (story_link) {
        return story_link.split("=")[1]
    }
}).factory('Page', function() {
    var title = (document.title||'Astro Health TV');
    return {
        title: function() { return title; },
        setTitle: function(newTitle) {
            title = newTitle }
    };
});
