// ==UserScript==
// @name         example-floating-button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  TODO
// @author       Anon
// @match        *://*/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var r = $('<input type="button" value="example button"/>');
    r.css({'position': 'fixed', 'top': '65px', 'left': '20px', 'z-index': '99999'});
    r.on('click',function(){
        alert('click registered');
    });
    $("body").append(r);

})();
