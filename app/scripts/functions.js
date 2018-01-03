// ========== TABLE OF CONTENTS =========== //
//
// 1. Page Loader 
// 2. Text fitting for headlines
// 3. Parallax
// 4. Calendar
// 5. Navbar
// 6. Sidenav
// 7. Sidebar Newsfeed-1
// 8. Sidebar Newsfeed-2
// 9. Sidebar Newsfeed-3
// 10. Sidebar Newsfeed-4
// 11. Sidebar Newsfeed-5
// 12. Sidebar Newsfeed-6
// 13. News Ticker
// 14. To Top Button
// 15. Owl Carousel - News Slider & Schedule Slider
// 16. Owl Carousel - Big Gallery Slider-1	
// 17. Owl Carousel - Big Gallery Slider-2
// 18. Owl Carousel - Big Gallery Slider-3
// 19. Owl Carousel - Small Gallery Slider
// 20. Clock
// 21. Subscribe Form
// 22. Exchange Rates
// 23. Currency Converter
// 24. Sidebar Weather
// 25. Fitvids
// 26. Sidebar Scroll
//
// ======================================= //

(function($) {
    "use strict";
	
	/* 1. Page Loader */	
	$(".loader-item").delay(700).fadeOut();
	$("#pageloader").delay(1200).fadeOut("slow");

	/* 5. Navbar */
	// headroom
	$("#fixed-navbar").headroom({
		tolerance : 5,
		offset: $('#main-section').offset().top,
		classes: {
			pinned: "headroom-pinned",
			unpinned: "headroom-unpinned"
		}
	});
	
	// affix
	$('#fixed-navbar').affix({
		offset: {
			top: $('#fixed-navbar').offset().top
		}
	});
	
	/* 6. Sidenav */
	$('[data-sidenav]').sidenav();
	$('.navbar-toggle').attr( 'id', $('#sidenav-toggle').attr('id') );
	
	// headroom
	$("#mobile-nav").headroom({
		offset: $('#main-section').offset().top,
		classes: {
			pinned: "headroom-pinned",
			unpinned: "headroom-unpinned"
		}
	});

	// Affix
	$('#mobile-nav').affix({
		offset: {
        top: $('.top-menu').height()
      }
	});

	$("#news-slider,#sidebar-schedule-slider").owlCarousel({
		autoPlay: 5000,
		stopOnHover: true,
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		paginationSpeed: 1000,
		goToFirstSpeed: 2000,
		singleItem: true,
		autoHeight: true,
		transitionStyle: "fade"
	});

	// $('.newsfeed-3').easyTicker({
	// 	direction: 'up',
	// 	easing: 'easeOutSine',
	// 	speed: 'slow',
	// 	interval: 5000,
	// 	height: 'auto',
	// 	visible: 5,
	// 	mousePause: 1
	// });


	/* 13. News Ticker */
	$('.newsticker').easyTicker({
		direction: 'up',
		easing: 'easeOutSine',
		speed: 'slow',
		interval: 4000,
		height: 'auto',
		visible: 1,
		mousePause: 1,
		controls: {
			up: '.up',
			down: '.down'
		}
	});

	/* 18. Owl Carousel - Big Gallery Slider-3 */
	$("#big-gallery-slider-3").owlCarousel({
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		items: 5, // 4 items above 1400px browser width
		itemsDesktop: [1400, 5], // 3 items between 1400px and 901px
		itemsDesktopSmall: [900, 3], // 2 items betweem 900px and 601px
		itemsTablet: [600, 2], // 1 items between 600 and 0
		itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	});

	/* 19. Owl Carousel - Small Gallery Slider */
	$("#small-gallery-slider").owlCarousel({
		navigation: true,
		navigationText: ["<i class='fa-angle-left'></i>", "<i class='fa-angle-right'></i>"],
		items: 5, // 4 items above 1400px browser width
		itemsDesktop: [1400, 5], // 3 items between 1400px and 901px
		itemsDesktopSmall: [900, 3], // 2 items betweem 900px and 601px
		itemsTablet: [600, 2], // 1 items between 600 and 0
		itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	});
	
	/* 20. Clock */
	function getDate() {
		var date = new Date();
		var weekday = date.getDay();
		var month = date.getMonth();
		var day = date.getDate();
		var year = date.getFullYear();
		var hour = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		if (hour < 10) hour = "0" + hour;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		var monthNames = ["January", "February", "Sep", "April", "May", "June", "July", "August",
			"September", "October", "December", "December"
		];
		var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
			"Saturday"
		];
		var ampm = " PM ";
		if (hour < 12) ampm = " AM ";
		if (hour > 12) hour -= 12;
		var showDate = weekdayNames[weekday] + ", " + monthNames[month] + " " + day + ", " + year;
		var showTime = hour + ":" + minutes + ":" + seconds + ampm;
		document.getElementById('date').innerHTML = showDate;
		document.getElementById('time').innerHTML = showTime;
		requestAnimationFrame(getDate);
	}
	getDate();


	/* 25. FitVids plugin for readjusting video sizes */
	    $(".video-container").fitVids();

	/* 26. Sidebar Scroll */
	$(".sidebar-scroll").mCustomScrollbar({
		setWidth: false,
		setHeight: 876,
		setTop: 0,
		setLeft: 0,
		axis: "y",
		scrollbarPosition: "outside",
		scrollInertia: 950,
		autoDraggerLength: true,
		autoHideScrollbar: false,
		autoExpandScrollbar: false,
		alwaysShowScrollbar: 0,
		snapAmount: null,
		snapOffset: 0,
		mouseWheel: {
			enable: true,
			scrollAmount: 200,
			axis: "y",
			preventDefault: false,
			deltaFactor: "auto",
			normalizeDelta: true,
			invert: false,
			disableOver: ["select", "option", "keygen", "datalist", "textarea"]
		},
		scrollButtons: {
			enable: false,
			scrollType: "stepless",
			scrollAmount: "auto"
		},
		keyboard: {
			enable: true,
			scrollType: "stepless",
			scrollAmount: "auto"
		},
		contentTouchScroll: 25,
		advanced: {
			autoExpandHorizontalScroll: false,
			autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
			updateOnContentResize: true,
			updateOnImageLoad: true,
			updateOnSelectorChange: false,
			releaseDraggableSelectors: false
		},
		theme: "light",
		callbacks: {
			onInit: false,
			onScrollStart: false,
			onScroll: false,
			onTotalScroll: false,
			onTotalScrollBack: false,
			whileScrolling: false,
			onTotalScrollOffset: 0,
			onTotalScrollBackOffset: 0,
			alwaysTriggerOffsets: true,
			onOverflowY: false,
			onOverflowX: false,
			onOverflowYNone: false,
			onOverflowXNone: false
		},
		live: false,
		liveSelector: null
	});

	$(window).scrollTop($('.breaking-ribbon').offset().top-100,0)

})(jQuery);

