// ==UserScript==
// @name         Make bitbucket better
// @namespace    http://compufer.com/scripts/bitbucket
// @version      0.3
// @description  Misc improvements
// @author       Will Sheppard
// @match        https://bitbucket.org/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Making BitBucket better...");

/*
    var waitForPRs = 1 * 1000;

    // For https://bitbucket.org/dashboard/overview
    // Wait some time after the page loads, to give the relevant elements time to be rendered.
    // A better way to do this would be to test for the existence of the element we're looking for
    // The best way to do it would be get triggered by an appropriate hook that may already be built into the page by Bitbucket.
    // Known bug: If there are no /visible/ PRs, this will accidentally click the link to show them (i.e. remove filters)
    var revealAllPRs = function() {

        console.log("Delayed function started...");

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
        // Highlight any PR authored by my teammate
        $("a").filter(function(index) { return $(this).text() === "Michael Jemmeson"; }).css({
            'text-decoration-line': 'underline',
            'text-decoration-style': 'double',
            'text-decoration-color': 'green'
        });

        // Highlight any repo containing the word "auditor"
        var auditor_re = new RegExp('auditor');
        $("a").filter(function(index) { return auditor_re.test( $(this).text() ); }).css({
            'border': '3px solid green',
            'padding': '5px',
        });

        console.log("Delayed function completed...");
    }
    if(window.location.href.indexOf("/dashboard/overview") > -1) {
        // This has stopped working :'-(
        setTimeout( revealAllPRs, waitForPRs );
    }
*/

    // For https://bitbucket.org/*/*/pull-requests/*/*/diff
    // Problem: Some PRs have diffs with a lot of lines that were added and deleted, all interleaved
    // making it very difficult to focus on what was added.
    // Display a button that removes the "deleted" lines, leaving visible only the code you care about.
    var r = $('<input type="button" value="hide deleted lines"/>');
    r.css({'position': 'fixed', 'top': '65px', 'left': '20px', 'z-index': '99999'});
    r.on('click',function(){
        $('.deletion').hide(); // old UI
        $('.type-del').hide(); // new UI (June 2020)
    });


    var waitForPRs2 = 2 * 1000;
    var moveButtons = function() {
        console.log("Delayed 'move buttons' function started...");
        //////////////////////////////////////////////////////////////////////////////////////////
        // Move the dangerous PR buttons well away from the commonly used 'Approve' button
        //////////////////////////////////////////////////////////////////////////////////////////
        var buttons = ['#fulfill-pullrequest', '#edit-pullrequest', '#reject-pullrequest'];
        var i;
        for (i = 0; i < buttons.length; ++i) {
            // Why doesn't this work?!
            $(buttons[i]).parent().attr({ 'position': 'absolute' });
            $(buttons[i]).parent().parent().attr({ 'position': 'absolute' });
            $(buttons[i]).attr({ 'position': 'relative' });
            $(buttons[i]).attr({ 'left': '-300px' });
            // This works okay
            $(buttons[i]).fadeTo( "slow", 0.1 );
        }
        console.log("Delayed 'move buttons' function completed...");
    }
    if(window.location.href.indexOf("/pull-requests/") > -1) {
        $("body").append(r);
        setTimeout( moveButtons, waitForPRs2 );
    }

    console.log("Finished making BitBucket better.");
})();
