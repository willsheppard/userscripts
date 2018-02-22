// ==UserScript==
// @name         Tweak Atlassian Stash
// @namespace    http://compufer.com/stash
// @version      0.1
// @description  Stash UI tweaks
// @author       Will Sheppard, 2017
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @match        http://stash.vm.wtf.nap/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Move buttons that I don't want to press by accident well away from buttons I press regularly
    $(".aui-header-logo-device").filter(function(index) { return $(this).text() === "Stash"; }).append('<span style="color:red;"> +</span>');

    $("button .merge-pull-request").css({
        'left': '500px',
        'position': 'relative'
    });
    $("button .decline-pull-request").css({
        'left': '500px',
        'position': 'relative'
    });

})();