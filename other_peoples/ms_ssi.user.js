// ==UserScript==
// @name         Stay signed in to MS
// @description  Automatically click "yes" on the Microsoft "stay signed in" page that keeps appearing.
// @downloadURL  https://github.com/willsheppard/userscripts/raw/master/other_peoples/ms_ssi.user.js
// @updateURL    https://github.com/willsheppard/userscripts/raw/master/other_peoples/ms_ssi.user.js
// @namespace    https://github.com/willsheppard
// @version      0.21
// @author       Emlyn Corrin, Will Sheppard
// @match        https://login.microsoftonline.com/login.srf*
// @icon         https://c.s-microsoft.com/favicon.ico?v2
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    var find_form = function() {
        var sub = document.querySelector('input[type="submit"]');
        if (sub) {
            var cb = document.querySelector('input[type="checkbox"]');
            if (cb) {
                // If there is a checkbox ("don't show this again"), enable it
                console.log("SSI: Enabling checkbox");
                cb.click();
            }
            // Then submit the form
            console.log("SSI: Submitting form");
            sub.click();
        } else {
            console.log("SSI: Can't see submit button, waiting");
            setTimeout(find_form, 500);
        }
    }

    var find_text = function() {
        // Not sure if we really need this part - it might break for non-English users?
        if (document.evaluate('//div[text()="Stay signed in?"]', document).iterateNext()) {
            // Appears to be a "stay signed in" page, look for form.
            setTimeout(find_form, 500);
        } else {
            console.log("SSI: Can't see 'Stay signed in' text, waiting");
            setTimeout(find_text, 500);
        }
    }

    setTimeout(find_text, 500);
})();
