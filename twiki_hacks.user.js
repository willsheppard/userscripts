// ==UserScript==
// @name         Twiki hacks
// @namespace    http://example.com/twiki
// @version      0.1
// @description  Usability hacks
// @author       Will Sheppard
// @match        http://wiki.dweb.intranet.db.com/twiki/*
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
 
// Move save-with-notify "Save" button out of the way to the right-hand side
// I don't want to notify people by default when I edit the wiki
$("input#save").css({ "float": "right" });
 
// Make the quiet-save button more visible
//$("input#quietsave").css({ "border": "red 2px solid" });
// And make it look like the default save button
$("input#quietsave").val("Save");
// Swap positions of save buttons
//$("input#quietsave").css({ "float": "left" });
//$("input#quietsave").css({ "margin-right": "10px" });
 
// Improve description of save-and-notify button
$("input#save").val("Save and notify");
