// ==UserScript==
// @name            Redirect websites
// @namespace       http://compufer.com/redirect
// @version         0.0.1
// @description     Redirect any page to any other page
// @match           *
// @run-at          document-start
// @copyright       2020, Will Sheppard
// ==/UserScript==

(function() {
    var current_uri=window.location.href;
    console.log(current_uri);

    if (current_uri.match(/www.reddit.com\/$/)) {
        window.location.href = "https://www.reddit.com/message/inbox";
    }

    // TODO: Put the redirects in a list (loop over them), and log to console what happened
    // TODO: As well as logging to console, pop up a toast-styly notification
})();
