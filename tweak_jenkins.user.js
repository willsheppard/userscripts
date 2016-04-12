// ==UserScript==
// @name        tweak-jenkins
// @namespace   http://example.com/jenkins
// @version     0.1
// @include     http://example.com:8080/*
// @description Hide buttons I don't want to accidentally press, etc.
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @require     http://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @grant       GM_addStyle
// @copyright   2016+, Will Sheppard
// ==/UserScript==

// Indicate this script is active
$("li a").filter(function(index) { return $(this).text() === "Jenkins"; }).css( "background-color", "red" );

// Hide "delete job" button so I don't accidentally click it
// (It's right next to the frequently used "build" button)
$('a').filter(function(index) { return $(this).text() === "Delete Project"; }).parent('.task').hide();

// Make "build" link bigger because I click it all the time
$('a').filter(function(index) { return $(this).text() === "Build Now"; }).css({
    'font-weight': 'bold',
    'font-size':   '300%',
    'border':      '8px solid #204A87',
    'padding':     '6px',
    'margin':      '40px'
});