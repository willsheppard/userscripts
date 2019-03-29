// ==UserScript==
// @name         Make bitbucket better
// @namespace    http://compufer.com/
// @version      0.1
// @description  Misc improvements
// @author       Will Sheppard (c) 2019
// @match        https://bitbucket.org/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var aWhile = 1 * 1000;

    // Wait some time after the page loads, to give the relevant elements time to be rendered.
    // A better way to do this would be to test for the existence of the element we're looking for
    // The best way to do it would be get triggered by an appropriate hook that may already be built into the page by Bitbucket.
    var doSomethingAfterAWhile = function() {
        // Click the "Show \d+ more..." link
        var show_re = new RegExp('^Show');
        $("button").filter(function(index) { return show_re.test( $(this).text() ); }).click();

        // Highlight repos we are interested in
        $("a").filter(function(index) { return $(this).text() === "ats-broadcast-hub"; }).css({
            'border': '3px solid red',
            'padding': '5px',
        });
        $("a").filter(function(index) { return $(this).text() === "p5-bean-ats"; }).css({
            'border': '2px solid blue',
            'padding': '5px',
        });
        var auditor_re = new RegExp('auditor');
        $("a").filter(function(index) { return auditor_re.test( $(this).text() ); }).css({
            'border': '3px solid green',
            'padding': '5px',
        });
    }
    setTimeout( doSomethingAfterAWhile, aWhile );

})();
