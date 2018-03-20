// ==UserScript==
// @name        tweak-reviewboard
// @namespace   http://compufer.com/reviewboard
// @version     0.1
// @include     http://reviewboard.nap/*
// @description Tweaks
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @require     http://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @grant       GM_addStyle
// @copyright   2017+, Will Sheppard
// ==/UserScript==

// Indicate this script is active by placing a red sign next to the app name
// Run this last so we know the rest of the functions have loaded.
$("#title").append('<span style="color:red;">+</span>');
console.log( "Reviewboard tweaks are active" );

// Remove the red 'error' box around all of template toolkit (perl) files
// This doesn't work because when it runs, the template code isn't displayed yet.
// But it does work if this is added to a chrome/userContent.css for Firefox (not Chrome):
//     @-moz-document domain(reviewboard.nap) {
//         .err { border: none !important; }
//     }
// TODO:
// 1. Add a button next to each "filename-row" that contains a filename ending in '.tt'
//    Clicking the button runs the below CSS changes to remove the red boxes.
// 2. Alternatively check for promises or callbacks from ReviewBoard code.
// 3. If not then try overriding a ReviewBoard function as mentioned here:
//    https://stackoverflow.com/questions/27197588/jquery-execute-function-after-third-party-function-ends
$(window).bind("load", function() {

   // code here
    $('.err').each(function(index) {
        console.log( index + ": " + $( this ).text() );
        $( this ).css({
            'border': 'none !important', // doesn't work
        });
    });

});

//    var regex = new RegExp('/diff');
//    return regex.test(window.location.href);
//}).css({
//    'border': 'none !important',
//});

/*
        body {
            font-family:'Comic Sans MS', cursive !important;
        }
        .err {
            border: none !important;
        }
        pre {
            font-family: monaco !important;
        }
*/

// Add a button to hide the Description, Testing Done, Information, Reviewers, etc.
// ...so that the list of files is above the fold when you scroll to the top of the page.
var $boilerplate_button = $('<input type="button" value="hide boilerplate" />');
$boilerplate_button.css({
    clear: 'both',
    float: 'right',
});
$boilerplate_button.appendTo($("#summary_wrapper"));
//var desc_visible = true; // toggle
$boilerplate_button.click(function() {
    [
        '#headerbar',
        '#navbar-container',
        '#review_request_banners',
        '#review_request_details',
        '#review_request_main',
        '#review_request_extra',
        '#diff_revision_label',
        '#diff_revision_selector',
        '.actions-container'
    ].forEach(function(el) {
//        var foo = desc_visible ? $(el).hide() : $(el).show();
//        desc_visible = desc_visible ? false : true;
        $(el).hide();
        $boilerplate_button.prop('value', 'restore boilerplate');
        $boilerplate_button.click(function() {
            location.reload();
        });
    });
});
