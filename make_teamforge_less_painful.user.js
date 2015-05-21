// ==UserScript==
// @name        make-teamforge-less-painful
// @namespace   http://siteaboutnothing.com/javascript
// @version     0.7
// @include     https://www.dbcde.com/*
// @description Hide unused buttons, and resize + relocate important buttons
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       GM_addStyle
// @copyright   2014,2015+, Will Sheppard
// ==/UserScript==

// Ensure errors are always noticed. Without this, all the error messages
// are below the fold and can be missed, meaning you think you've updated
// the artefact but really you haven't!
// Bug: This error can match on other pages unexpectedly
// Bug: It doesn't catch page-timeouts
if ($('.errorText').length) {
    // Add a warning message where it should be
    var warningDiv = jQuery('<div/>', {
        id: 'Sf_MessageId_fake',
        class: 'redText',
        title: 'Warning: There were errors',
        text: 'Warning: Artefact not saved due to errors, see below.',
        display: 'block'
    });
    warningDiv.css({
        'color': '#B94A48', // dark red
        'background-color': '#FFEFE7', // light red
        padding: '15px',
        border: '3px solid #B94A48',
        'margin-top': '10px'
    });
    warningDiv.appendTo('.breadcrumb');

    // Make absolutely sure the user takes notice
    //alert("Warning: Form not submitted - see errors below")

    console.log("Ensuring errors are noticed");
}

// Hide unwanted buttons
var button_texts = [ "Update", "Cancel" ]; // View/edit page
button_texts.forEach(function(button_text) {
    $('#viewArtifactForm .Button a').filter(function() {
        return $(this).text() == button_text;
    }).closest('.Button').hide();
    console.log("Hiding button with text '"+button_text+"'");
});

var button_texts = [ "Cancel", "Save" ]; // New/create page
button_texts.forEach(function(button_text) {
    $('#createArtifactForm .Button a').filter(function() {
        return $(this).text() == button_text;
    }).closest('.Button').hide();
    console.log("Hiding button with text '"+button_text+"'");
});

console.log("Embiggening buttons");

// "View Artefact" page
// Make the update button really big and bold (View/edit page)
$('#viewArtifactForm_SaveAndView').closest('.AlignRight').css({
    "float": "left"
});
$('#viewArtifactForm_SaveAndView').css({
    "line-height":	"835%",
    "font-weight":	"bold",
    "font-size":	"150%"
});
$('#viewArtifactForm_SaveAndView').closest('.Middle').css({
    "border":		"3px solid black"
});


// "Submit Artefact" page
$('#createArtifactForm_SaveAndView').closest('.AlignRight').css({
    "float": "left"
});
$('#createArtifactForm_SaveAndView').css({
    "line-height":	"835%",
    "font-weight":	"bold",
    "font-size":	"150%"
});
$('#createArtifactForm_SaveAndView').closest('.Middle').css({
    "border":		"3px solid black"
});

console.log("Copying buttons");

// Copy the save button next to the comment area
var save_button = $('#viewArtifactForm_SaveAndView')
	.closest('.Middle')
	.clone()
	.attr('id','#viewArtifactForm_SaveAndView2') // <-- not working?
    ; // .css({ "float": "right"});

save_button.insertAfter("textarea#comment");

$("textarea#comment").css({ "float": "left" });

// TODO:
// Make the cloned button look the same as the old one
// And actually submit the original button
// Bug: Button doesn't work exactly right
/*
save_button.css({
    "float": 	  "right",
    "font-color": "black",
    "font-decoration": "none"
});
*/

// Move the 'Comment Text' to the left
console.log("Moving comments box left");
$('#artifactSummarySection > tbody > tr > td:nth-child(1)').css({ "width": "5%" });
//$('#artifactSummarySection > tbody > tr > td:nth-child(2)').css({ "width": "5%" });

/*
TODOs:
	 * Hide "Users Monitoring", "Stop Monitoring"
       difficult as they have no named container

DEBUG:
//$('textarea#comment').css({"border":"3px solid red"});
//$('#viewArtifactForm_SaveAndView').closest('.Middle').css({"border":"3px solid green"});
*/
