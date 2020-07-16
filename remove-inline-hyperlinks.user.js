// ==UserScript==
// @name         Remove inline hyperlinks
// @namespace    http://compufer.com/remove-inline-hyperlinks
// @version      0.1
// @description  Remove inline hyperlinks, for ease of reading. Studies have shown that the more inline hyperlinks in a piece of text, the lower the comprehension by the reader.
// @author       Will Sheppard
// @match        *://*/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

/*
 TODO:
 * move links to the bottom of the document in a "footnote" style with reference numbers in the text, like wikipedia
 * make all the configuration exposed to the user
*/

(function() {
    'use strict';

    $("a").removeClass().css({
        "color":"inherit",
        "text-decoration":"none",
    });

    console.log("Removed links");

})();
