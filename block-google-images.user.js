// ==UserScript==
// @name         Block google images
// @namespace    http://compufer.com/userscripts
// @version      0.2
// @description  Redirects browser away from Google Image search, and displays a warning. Are you prone to procrastination? Do you struggle with impulse control? Do you avoid work by browsing Google Images? Stop wasting time! This script acts like a nanny to slap your wrist and remind you to focus on your work.
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

    // Known bug: Clicking on the image still loads the original.
    // All other links also work, which is undesirable.

    // Workaround: Redirect the browser completely away from the page
    window.location.href = "http://compufer.com/images/stop.jpeg";
})();
