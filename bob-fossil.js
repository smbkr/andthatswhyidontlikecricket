/**
 * Get window height and width. Returns object with h and w properties,
 * corresponding to the height and width of the window object.
 * 
 * @return object
 */
var hw = function hw() {
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	return {
		w: w,
		h: h
	}
}

var debounce = function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player('ytplayer', {
		height: hw().h,
		width: hw().w,
		videoId: 'cTiXtnlhZYU',
		events: {
			'onReady': onPlayerReady
		}
	});
}
function onPlayerReady(event) {
	event.target.playVideo();
}

var doTheResize = function doTheResize() {
	var ytIframe = player.getIframe();
	ytIframe.setAttribute('height', hw().h);
	ytIframe.setAttribute('width', hw().w);
}

/**
 * Window resize event handler - will call doTheResize after 250ms
 */
window.onresize = function resizeHandler() {
	debounce(doTheResize(), 250);
}