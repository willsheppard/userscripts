// ==UserScript==
// @name         Block google images
// @namespace    http://compufer.com/userscripts
// @version      0.1
// @description  Replaces all the images on Google Image search with a warning. Are you prone to procrastination? Do you struggle with impulse control? Do you avoid work by browsing Google Images? Stop wasting time! This script acts like a nanny to slap your wrist and remind you to focus on your work. Recommended to use on Firefox for Android (via GreaseMonkey addon), and via TamperMonkey in Chrome for desktop.
// @author       Will Sheppard
// @match        https://www.google.com/search*tbm=isch*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Replace images with a warning image
    $("img").attr("src","http://compufer.com/images/stop.jpeg");

    // Disable scrolling, otherwise more images get loaded
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
})();
