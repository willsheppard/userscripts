// ==UserScript==
// @name        make-stash-better
// @namespace   http://example.com/stash
// @version     0.2
// @include     https://stash.gto.intranet.db.com:8081/*
// @description UI tweaks and improvements
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @require     http://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @grant       GM_addStyle
// @copyright   2016+, Will Sheppard
// ==/UserScript==
 
/*** Stash, old version ***/
 
// Create new branch
// Don't unnecessarily truncate repo name
$(".base-repository-selector .name, .base-repository-selector-trigger .name, .base-repository-selector .project-name, .base-repository-selector-trigger .project-name").css({ "max-width": "300px" });
$("#repository-selector").css({ "max-width": "300px" });
 
// Don't unnecessarily truncate branch name
$("#branch-name").css({ "max-width": "1500px" });
$(".source-branch").css({ "max-width": "1500px" });
$("#repository-layout-revision-selector").css({ "max-width": "1500px" });
$("#repository-layout-revision-selector > span.name").css({ "max-width": "1500px" });
 
/*** Bitbucket, new version ***/

// Create pull request
// Don't unnecessarily truncate repo name
$("#branch-compare > .repository").css({ "max-width": "1500px" }); // Doesn't work
