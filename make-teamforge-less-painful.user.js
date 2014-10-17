// ==UserScript==
// @name        make-teamforge-less-painful
// @namespace   http://compufer.com/
// @version     0.2
// @include     https://www.dbcde.com/*
// @description Hide unused buttons, and resize + relocate important buttons
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       GM_addStyle
// @copyright   2014+, Will Sheppard
// ==/UserScript==

/*
TODOs:
	* Remove whole .Buttons, not just 'a's
	* Make 'Return' and 'Edit' .Buttons big too
	* Make border go around .Middle, not .Button so it looks better
	* Remove 'Users Monitoring' and 'Stop Monitoring' buttons
  * Refactor the logic so it's properly modular
*/

// Hide unwanted buttons
var button_texts = ["Update", "Cancel"];
button_texts.forEach(function(button_text) {
    $('#viewArtifactForm .Button a').filter(function() {
        return $(this).text() == button_text;
    }).hide();
    console.log("Hiding button with text '"+button_text+"'");
});

// Make the only important button really big and bold
$('#viewArtifactForm .AlignRight').filter(function() {
    var importantButton = $(this).find(".Button").find("a").filter(function() {
        return $(this).text() == "Update And View";
    }); //.text();
    importantButton.css({
        "line-height":"835%",
        "font-weight":"bold",
        "font-size":"150%",
        "border":"3px solid black"
    });
    return true;
}).css({"float":"left"}); // ...and move it to the left
