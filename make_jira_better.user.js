// ==UserScript==
// @name        make-jira-better
// @namespace   http://example.com/jira
// @version     0.1
// @include     https://dbatlas.db.com/jira02/*
// @description Hide unused functionality, etc.
// @require     http://code.jquery.com/jquery-2.1.4.min.js
// @require     http://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @grant       GM_addStyle
// @copyright   2016+, Will Sheppard
// ==/UserScript==
 
// Issue view
// Hide unwanted features
var modules = [ "tempo-worklogs-module", "structuremodule", "collaboratorsmodule"]; // , "viewissue-devstatus-panel" ];
modules.forEach(function(id) {
    // Note: viewissue-devstatus-panel adds itself back after being removed
    $('#'+id).hide();
    console.log("Hiding "+id+" module");
});
 
/* Make 'create issue' modal popup wider. It's far too narrow to use comfortably, even on really wide monitors! */
 
 
// Doesn't work
//$('#create-subtask-dialog').css({ width: '95%' });
 
// Also doesn't work
/*
.aui-page-panel {
    width: 100%;
}
 
form.aui .long-field {
    max-width: 1000px;
}
*/
