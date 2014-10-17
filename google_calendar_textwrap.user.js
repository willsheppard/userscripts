// ==UserScript==
// @name          Google Calendar Textwrap Events v1.4
// @description   Fix Google Calendar so that long event names will text wrap on the calendar.
// @include       http*://www.google.com/calendar/render*
// @include       http*://www.google.com/calendar/embed*
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////
//NOTES:
//
// This is a bug fix for http://userscripts-mirror.org/scripts/show/5850
// ...but has become out of date itself.
//
// For a better solution, see http://stackoverflow.com/questions/8225132/how-do-i-make-the-new-google-calendar-event-text-wrap-around-using-css
// 
// Known issues:
//
// -Does not work with new version of Google calendar (go back to 'classic view' to make it work)
//
//////////////////////////////////////////////////////////////////////////////
// Version 1.4
// -Updated for new version of Google Calendar (unfortunately now out-of date again)
// -Copied from http://userscripts-mirror.org/scripts/show/97755.html to github
//
// Version 1.3
// -Work for embedded calendars as well (thanks Micah Sittig http://userscripts.org/users/msittig )
// -Massively simplified by removing unnecessary parts (I hope they're really unnecessary!)
//
// Version 1.21
// -Made all day events wrap properly
//
// Version 1.2     
// -Enhanced funtionality between all day events and specific time events
//  to keep them from overlapping each other.
//
// Version 1.1
// -Enabled all day events to wrap text the same as specific time events.
//
// Version 1.0
// -Initial version - Allow specific time events to wrap if they are too long.
//////////////////////////////////////////////////////////////////////////////

function buildStyle()
{
	var st = "div.rb-n, span, nobr { white-space: normal; }";
	var dochead = document.getElementsByTagName("head")[0];
	var stEl = document.createElement("style");
	stEl.setAttribute("type", "text/css");
	stEl.innerHTML = st;
	dochead.appendChild(stEl);
}

window.addEventListener("load", function(e) {
	buildStyle();
}, false);
