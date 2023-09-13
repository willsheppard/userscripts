// ==UserScript==
// @name        AtlassianRedirect
// @namespace   atlassian.com
// @version     0.08
// @grant       none
// @run-at      document-end
// @match       *://*.atlassian.com/*
// @match       *://*.atlassian.net/*
// @author      Ludo Tolhurst-Cleaver, Will Sheppard, Dan Banks
// ==/UserScript==

/*
 * 1. Confluence
 *     - Redirect from a Broadbean wiki page:    https://broadbean.atlassian.net/wiki/spaces/ATS/pages/2975662172/iCIMS+integration#Job-Model
 *     - To a Veritone wiki search results page: https://veritone.atlassian.net/wiki/search?text=%22iCIMS%20integration%22&title=true&spaces=ATS
 *     Not perfect, but it gets you most of the way there.
 *
 * 2. Jira
 *     - Redirect from a Broadbean jira ticket: https://broadbean.atlassian.net/browse/INTDIS-500
 *     - To a Veritone jira ticket:             https://veritone.atlassian.net/browse/INTDIS-500
 *     Perfect.
 */

var debug = 1;

var sourceUrlCheck = 'broadbean.atlassian.net';
var targetUrlBase  =  'veritone.atlassian.net';

(function() {
    'use strict';

    debug && console.log("Running redirect script");

    const currentUrl = document.location;
    // Save anchor for later
    const sourceUrlAnchor = currentUrl.hash;

    // Extract source URL
    const sourceUrl = extractSourcePath(currentUrl); // URL
    // If the currentUrl shows an error like "You don't have access to broadbean.atlassian.net"
    // then we can extract the sourceUrl, otherwise abort.
    if (sourceUrl == null) {
        debug && console.log("Didn't find source URL, stopping.");
        return;
    }

    // Only run for domain specified in sourceUrlCheck
    // Can test this with a page on "atlas.atlassian.net"
    if (sourceUrl.host.indexOf(sourceUrlCheck) == -1) {
        debug && console.log("Can only redirect "+sourceUrlCheck+" but found "+sourceUrl.host+" instead, stopping");
        return;
    }

    // Extract source URL path
    const sourcePath = sourceUrl.pathname; // string
    // Example: /wiki/spaces/ATS/pages/2975662172/iCIMS+integration
    debug && console.log("sourcePath", sourcePath);

    // Extract search terms
    const oldParts = sourcePath.split('/');
    // Confluence example: ['', 'wiki', 'spaces', 'ATS', 'pages', '2975662172', 'iCIMS+integration']
    debug && console.log("oldParts", oldParts);
    const searchTerm = oldParts[6];
    const spaceName = oldParts[3];

    // Jira example: ['', 'browse', 'INTDIS-500']
    const siteType = oldParts[1];
    const issueId = oldParts[2];
    if (siteType == 'browse') {
        const jiraUrl = new URL('https://' + targetUrlBase + '/' + siteType + '/' + issueId);
        debug && console.log("jiraUrl", jiraUrl);

        // Redirect to JIRA page
        document.location = jiraUrl;
        return;
    }

    // Compose a search URL
    const searchUrl = new URL('https://' + targetUrlBase);
    searchUrl.pathname = '/wiki/search';
    const params = new URLSearchParams({
        text: '"' + searchTerm.replaceAll('+', ' ') + '"',
        title: 'true',
        spaces: spaceName,
    });
    searchUrl.search = params;
    // Example: https://veritone.atlassian.net/wiki/search?text=%22iCIMS+integration%22&title=true&spaces=ATS
    debug && console.log("searchUrl", searchUrl);

    // Redirect to search results page
    document.location = searchUrl;

    // Currently, script execution ends here, because the page changes.

    // TODO: Implement a way to continue executing the code below

    // Idea 1: Load search results page via ajax and parse it for results
    //   - If results found, redirect to first one
    //   - Else display empty search results page, for user to refine their query

    // Idea 2: Allow the search results page to load normally, then trigger this script again,
    // and automatically click on the first result *if we've reached there via this script*.

    // Note: The search results page makes an ajax request to:
    // https://veritone.atlassian.net/gateway/api/graphql which returns the actual results.

    // Assuming we're on the search results page now...
    // Get first search result
    const firstResult = $('.searchResultLink')[0];
    debug && console.log("firstResult", firstResult);

    // If there are no search results, stop and let the user choose
    if (firstResult == null) {
        debug && console.log("No search results, stopping");
        return;
    }

    // There was a search result
    const targetUrl = new URL(firstResult.href);
    // Add back fragment, e.g. #Job-Model
    targetUrl.hash = sourceUrlAnchor;
    debug && console.log("targetUrl", targetUrl);

    // Redirect to target page
    document.location = targetUrl;
})();


// Functions
function extractSourcePath(sourceUrl) {

    // Example: https://id.atlassian.com/login/authorize?application=confluence
    // &continue=https%3A%2F%2Fid.atlassian.com%2Fjoin%2Fuser-access%3Fresource%3Dari%253Acloud%253Aconfluence%253A%253Asite
    // %252Fd3088519-e30c-48cd-8c50-f338aaf52699%26continue%3Dhttps%253A%252F%252Fbroadbean.atlassian.net%252Fwiki%252Fspaces
    // %252FATS%252Fpages%252F2975662172%252FiCIMS%252Bintegration&token=eyJraWQiOi.......snip........no_7EYec_aoA#Job-Model
    debug && console.log("sourceUrl", sourceUrl.toString());

    const params1 = new URL(sourceUrl).searchParams;
    const continueParam1 = params1.get("continue");
    // Abort if it's a normal confluence URL and we don't need to redirect (or can't)
    if (continueParam1 == null) {
        debug && console.log("Could not match URL, stopping.");
        return;
    }

    const joinUrl = decodeURI(continueParam1);
    // Example: https://id.atlassian.com/join/user-access?resource=ari%3Acloud%3Aconfluence%3A%3Asite%2Fd3088519-e30c-48cd-8c50-f338aaf52699
    // &continue=https%3A%2F%2Fbroadbean.atlassian.net%2Fwiki%2Fspaces%2FATS%2Fpages%2F2975662172%2FiCIMS%2Bintegration
    debug && console.log("joinUrl", joinUrl.toString());

    const params2 = new URL(joinUrl).searchParams;
    const continueParam2 = params2.get("continue");
    let originalUrl;
    if (continueParam2) {
        originalUrl = new URL( decodeURI(continueParam2) );
    } else {
        originalUrl = new URL( decodeURI(continueParam1) );
    }
    // Example: https://broadbean.atlassian.net/wiki/spaces/ATS/pages/2975662172/iCIMS+integration
    debug && console.log("originalUrl", originalUrl.toString());

    return originalUrl; // URL
}
