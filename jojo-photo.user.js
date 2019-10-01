// ==UserScript==
// @name         Jojo-Photo
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Allow manipulation of the albums list in Google Photos.
// @author       Will Sheppard, 2019
// @match        https://photos.google.com/*
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/nestable2/1.6.0/jquery.nestable.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*** ATTEMPT 1, March 2019 ***/
    // TODO: Add floating button, when you click it, a new control is added to select album with auto-completion.
    // The reason for the button: The album list may not exist when the page is loaded.

    /*** ATTEMPT 2, October 2019 ***/
    // TODO: Start to hack the page to allow moving albums around a hierarchy

    // Add "start" button
    var r = $('<input type="button" value="start Jojo-Photo user script"/>');
    r.css({'position': 'fixed', 'top': '65px', 'left': '20px', 'z-index': '99999'});
    r.on('click',function(){
        // identify album list
        var container = $('div[jscontroller][jsaction][jsshadow][ve-stop-target-search][jsowner]');
        $(container).css({ 'border': '2px solid red' }); // debug
        // set up album list as a Nestable list
        $(container).wrap( "<div class='dd'></div>" );
        container.addClass("jojoContainer");
        $('.jojoContainer ul').addClass("dd-list");

        // set up list items as Nestable items
        $('.jojoContainer li').css({ 'border': '1px dashed blue' }); // debug
        $('.jojoContainer li').addClass("dd-item");
        $('.jojoContainer li').append( "<div class='dd-handle'>X</div>" ); // Click and drag the 'X' to change order of the items

        // Activate the Nestable list
        $('.dd').nestable({ /* config options */ });

    });
    $("body").append(r);

    // Import Nestable2 style sheets (JS is imported via the @require in header above)
    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://cdnjs.cloudflare.com/ajax/libs/nestable2/1.6.0/jquery.nestable.min.css';
    document.getElementsByTagName("HEAD")[0].appendChild(link);

    // TODO: Add a select2 input control
    // https://select2.org/

    // Idea: When you click on an album in the new display, it relays the click to the real album link
})();
