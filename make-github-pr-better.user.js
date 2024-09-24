
// ==UserScript==
// @name         Make Github PRs better
// @namespace    http://tampermonkey.net/
// @version      0.06
// @description  Replace Usernames with custom names and colors. Maybe your company uses ID numbers instead of names, or the names are last name first. Make status more visible. Add borders.
// @author       Will Sheppard
// @match        https://github.com/woodmac/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

let lookupNames = {
    'i60421_woodmac': {
        'textContent': 'Will',
    },
    'i41999_woodmac' : {
        'textContent': 'Brett',
        'backgroundColor': '#f2e7a0', // yellow
        'color': 'black',
    },
    'i41695_woodmac' : {
        'textContent': 'Marina',
        'backgroundColor': '#d1ebd3', // green
        'color': 'black',
    },
    'i40464_woodmac' : {
        'textContent': 'Artur',
        'backgroundColor': '#ffd1d1', // pink
        'color': 'black',
    },
    'i60322_woodmac' : {
        'textContent': 'Andrew',
    },
    'i28104_woodmac': {
        'textContent': 'Bart',
    },
};
let noNames = {};

var runCount = 0;
var runMax   = 5;
var waitTime = 500;

console.debug("Loaded userscript 'Make Github PRs better'");

(function() {
    'use strict';

    let fixName = function(el) {
        let oldName = el.textContent.trim().toLowerCase().replace(/^@/,'');
        let change = lookupNames[ oldName ];
        if (change) {
            let newName = change.textContent;
            console.debug("Replacing '"+oldName+"' with '"+newName+"'");
            el.textContent = newName;
            return change;
        }
        else {
            if (!noNames[ oldName ]) {
                console.debug("Could not find new name for '"+oldName+"'");
                noNames[ oldName ] = 1;
            }
            return null;
        }
    }

    var customiseEverything = function() {
        // LIST OF PULL REQUESTS: https://github.com/${org}/${repo}/pulls

        // Customize row borders
        document.querySelectorAll(".Box-row").forEach(el => {
            el.style.borderBottom = '1px darkgrey solid';
        });

        // Customise names
        document.querySelectorAll("span.opened-by > a").forEach(el => {
            let change = fixName(el);
            if (change) {
                el.style.fontSize = '1.5em';
                el.style.paddingLeft = '1em';
                if (change.backgroundColor) { el.style.backgroundColor = change.backgroundColor; }
                //if (change.color) { el.style.color = change.color + ' !important'; } // doesn't work
            }
        });

        // Customise status
        document.querySelectorAll('a.Link--muted').forEach(el => {
            if (el.textContent.trim() === 'Draft') {
                el.style.fontSize = '2em';
                el.style.paddingLeft = '20em';
            }
            else if (el.textContent.trim() === 'Approved') {
                el.style.fontSize = '2em';
                el.style.paddingLeft = '20em';
            }
            else if (el.textContent.trim() === 'Review required') {
                el.style.fontSize = '1.5em';
                el.style.paddingLeft = '25em';
            }
        });

        // SINGLE PULL REQUEST: https://github.com/${org}/${repo}/pull/${id}

        document.querySelectorAll("a.author").forEach(el => { fixName(el); });
        document.querySelectorAll("a.assignee").forEach(el => {
            fixName(el);
        });

        document.querySelectorAll("a.commit-author").forEach(el => {
            fixName(el);
        });

        document.querySelectorAll("a.user-mention").forEach(el => {
            fixName(el);
        });

        document.querySelectorAll(".js-toggle-outdated-comments").forEach(el => {
            fixName(el);
        });

        document.querySelectorAll("a[data-hovercard-type='user']").forEach(el => {
            fixName(el);
        });

        // SINGLE FILE VIEW: https://github.com/${org}/${repo}/blob/${sha1}/{$path}/${file}

        document.querySelectorAll("div[data-testid='author-link']").forEach(el => {
            fixName(el);
        });

        if (runCount++ < runMax) { setTimeout(customiseEverything, waitTime); }
    };

    customiseEverything();
    setTimeout(customiseEverything, waitTime);
Show quoted text
