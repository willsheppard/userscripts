// ==UserScript==
// @name        make-teamforge-less-painful
// @namespace   http://siteaboutnothing.com/javascript
// @version     0.4
// @include     https://www.dbcde.com/*
// @description Hide unused buttons, and resize + relocate important buttons
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       GM_addStyle
// @copyright   2014,2015+, Will Sheppard
// ==/UserScript==

/*
TODOs:
    * Hide "Users Monitoring", "Stop Monitoring"
       difficult as they have no named container
     
    * How the hell do I copy the button next to the comment area?
      None of these work...
    //$('textarea#comment').append('#viewArtifactForm_SaveAndView');
    //$('#viewArtifactForm_SaveAndView').appendTo( 'textarea#comment' );
    //$('#viewArtifactForm_SaveAndView').appendTo( $('textarea#comment') );
    //$('#viewArtifactForm_SaveAndView').clone().appendTo('textarea#comment');
    $('textarea#comment').css({"border":"3px solid red"}); // works

    * Refactor the logic so there's less duplication
*/

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
