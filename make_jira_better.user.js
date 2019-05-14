// ==UserScript==
// @name        make-jira-better
// @namespace   http://example.com/jira
// @version     0.2
// @include     https://*.atlassian.net/browse/*
// @description Hide unused functionality, etc.
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @require     http://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @grant       GM_addStyle
// @copyright   2016+, Will Sheppard
// ==/UserScript==

// Now that the issue view layout has been cleaned up (April 2019)
//     https://confluence.atlassian.com/jiracorecloud/the-new-jira-issue-view-938040503.html
// * Make column on the right hide-able, similar to how the column on the left is
// TODO: Place button on the right
(function() {
    'use strict';

    var aWhile = 1 * 1000;

    // Wait some time after the page loads, to give the relevant elements time to be rendered.
    // A better way to do this would be to test for the existence of the element we're looking for
    // The best way to do it would be get triggered by an appropriate hook that may already be built into the page by Bitbucket.
    var doSomethingAfterAWhile = function() {
        // define button
        var r = $('<input type="button" value="hide/show details"/>');
        //r.css({'position': 'fixed', 'top': '120px', 'left': '20px', 'z-index': '99999'});

        // define element to hide
        var detailsColumn = $('h2').filter(function(index) { return $(this).text() === 'Assignee'; }).parent().parent().parent().parent().parent().parent();
        detailsColumn.css({ 'border': '2px solid blue' });

        // define button behaviour
        r.on('click',function(){
            detailsColumn.hide();
        });

        // add button to page
        r.css({'position': 'absolute', 'top': '-30', 'left': '0', 'z-index': '99999'});
//        detailsColumn.append(r);
//        r.appendTo(detailsColumn);
        r.insertAfter(detailsColumn);
    }
    setTimeout( doSomethingAfterAWhile, aWhile );
})();

// OLD
// Issue view
// Hide unwanted features
/*
var modules = [ "tempo-worklogs-module", "structuremodule", "collaboratorsmodule"]; // , "viewissue-devstatus-panel" ];
modules.forEach(function(id) {
    // Note: viewissue-devstatus-panel adds itself back after being removed
    $('#'+id).hide();
    console.log("Hiding "+id+" module");
});
*/

/* TODO: Make 'create issue' modal popup wider. It's far too narrow to use comfortably, even on really wide monitors! */
