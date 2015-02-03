// ==UserScript==
// @name        make-teamforge-less-painful
// @namespace   http://siteaboutnothing.com/javascript
// @version     0.5
// @include     https://www.dbcde.com/*
// @description Hide unused buttons, and resize + relocate important buttons
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       GM_addStyle
// @copyright   2014,2015+, Will Sheppard
// ==/UserScript==

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
	.insertAfter("textarea#comment");

/****************************************************************************/

/*
TODOs:
	 * Hide "Users Monitoring", "Stop Monitoring"
       difficult as they have no named container

DEBUG:
//$('textarea#comment').css({"border":"3px solid red"});
//$('#viewArtifactForm_SaveAndView').closest('.Middle').css({"border":"3px solid green"});
*/

