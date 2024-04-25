// ==UserScript==
// @name        YoutubeParentalRedirect
// @description Redirect homepage and /shorts to user's subscriptions page
// @namespace   YoutubeParentalRedirect.youtube.com
// @version     0.02
// @grant       none
// @match       https://www.youtube.com/
// @match       *://*.youtube.com/*
// @match       *://www.youtube.com
// @match       *://youtube.com/
// @match       *://www.youtube.com/
// @match       *://youtube.com/shorts/*
// @match       *://www.youtube.com/shorts/*
// @author      Will Sheppard
// ==/UserScript==

/*
 * TODO: Copy @match to hash, check manually
 * TODO: Fix infinite loop bug
 * TODO: Make regex readable, without picket fences
 */

var debug = 1;

//var sourceUrlCheck = 'https?:\/\/youtube.com';
var redirectTargetUrl = 'https://www.youtube.com/feed/subscriptions';

var pagesToRedirectRegex = [
    '\/',
    '\/shorts',
    '\/shorts\/',
    '\/shorts\/*',
];

(function() {
    'use strict';

    debug && console.debug("Running YoutubeParentalRedirect userscript");

    const currentUrl = new URL(document.location);
    debug && console.debug("[YoutubeParentalRedirect] Checking current URL "+currentUrl);

    pagesToRedirectRegex.forEach(function(urlPattern) {
        const urlRegex = new RegExp(urlPattern);
        debug && console.debug("[YoutubeParentalRedirect] Checking current URL path '"+currentUrl.path+"' against regex '"+urlRegex+"'");
        if (urlRegex.test(currentUrl.path)) {
            // Redirect to target URL
            debug && console.debug("[YoutubeParentalRedirect] It  matches, redirecting away from page "+currentUrl);
            document.location = redirectTargetUrl;
            return;
        }
    })

})();
