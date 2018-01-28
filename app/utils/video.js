/**
 * Created by gaurav.m on 1/25/18.
 */

    //Replace with your video's ID
var video = "#lp-pom-video-13";
//Replace with your 'close' button ID
var button = "#lp-pom-button-16";
//Optional: adjust in pixels when the video transitions
var showHeight = 800;

var targetClass = "smallVid";
var adjustClass = "vidAdjust";
var classSelect = ".smallVid";
var noClose = true;
var initWidth = $(video).width();
var initHeight = $(video).height();
$(window).scroll(function () {
    if ($(this).scrollTop() > showHeight && noClose) {
        $(video).addClass(targetClass + " " + adjustClass);
        $(button).addClass(targetClass);
    } else {
        $(video).removeClass(targetClass, adjustClass);
        $(button).removeClass(targetClass);
    }
});
$(button).click(function () {
    $(video).removeClass("smallVid vidAdjust");
    $(button).removeClass("smallVid");
    targetClass - null;
    adjustClass - null;
    noClose = false;
});
