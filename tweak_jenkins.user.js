// ==UserScript==
// @name        tweak-jenkins
// @namespace   http://compufer.com/jenkins
// @version     0.1
// @include     https://jenkins16.wtf.nap/*
// @description Tweaks
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @require     http://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @grant       GM_addStyle
// @copyright   2017+, Will Sheppard
// ==/UserScript==

// Indicate this script is active by placing a red sign next to the word "Jenkins" in the menu
$("li a").filter(function(index) { return $(this).text() === "Jenkins"; }).append('<span style="color:red;"> ^_^</span>');

// Hide "delete job" button so I don't accidentally click it
// (It's right next to the frequently used "build" button)
$('a').filter(function(index) { return $(this).text() === "Delete Project"; }).parent('.task').hide();

// Make "build" link bigger because I click it all the time
/*
$('a').filter(function(index) { return $(this).text() === "Build Now"; }).css({
    'font-weight': 'bold',
    'font-size':   '300%',
    'border':      '8px solid #204A87',
    'padding':     '6px',
    'margin':      '40px'
});
*/

// Promotions: Make a clearer separation between jobs
//    if page URL has /promotion in it
$('h2').filter(function(index) {
    var regex = new RegExp('/promotion');
    return regex.test(window.location.href);
}).css({
    'border-top': '2px solid black',
    'padding-top': '10px',
    'border-left': '2px solid black',
    'border-right': '2px solid black',
    'padding-left': '10px'
});

// Current builds: Divide the rows more clearly
$('.build-row').filter(function(index) {
    var regex = new RegExp('/view');
    return regex.test(window.location.href);
}).css({
    'border-top': '1px solid grey',
});

// Current builds: Get rid of the grey lozenge
$('.build-row.multi-line .build-row-cell .block').css({ 'overflow': 'visible' });

// Promotions: Disable the "Force promotion" button
// Warning: Although this greys them out, they may not actually be disabled
$('button').filter(function(index) {
    return $(this).text() === "Force promotion";
}).attr('disabled', 'disabled');
