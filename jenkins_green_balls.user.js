// ==UserScript==
// @name           JenkinsGreenBalls
// @namespace      http://compufer.com/jenkins/balls
// @description    Green is the only true colour for Jenkins balls!
// @include        *insert-your-jenkins-uri-here*

// ==/UserScript==

/*

CHANGELOG:

- 2014-10-17: Create script in response to green balls turning blue (yuk)
- 2019-10-28: Point to where the images are hosted, so it works out-of-the-box
- 2022-05-23: Update docs, realise it doesn't work on the latest Jenkins
              because the balls are now implemented in a totally different way

DESCRIPTION:

It's 2014. Blue balls are just wrong. Blue doesn't mean "okay" (see link below),
only green means that. If your Jenkins administrator can't or won't
change the blue balls back to green using the published plugin (see link below)
then you can use this script

It's now 2022 and the latest Jenkins balls are even worse than the blue ones.
They're now harder to see because they're more spindly. We like our balls to be
a bold and solid colour around here.

This is a toy project I used to have fun and learn JQuery.

BUGS:

I couldn't figure out how to load the images from the local computer,
so this uses a remote image. You will need to get some green balls images
upload them to your own server, and change the URLs to point there.

TODO:

* Make it work with the latest svg-sprite-action-symbol.svg system
* Include the images in a Chrome extension, and load from the local machine
* Make the big if/else statement a bit cleverer

SEE ALSO:

http://jenkins-ci.org/content/why-does-jenkins-have-blue-balls
https://wiki.jenkins-ci.org/display/JENKINS/Green+Balls

*/

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

// get local chrome extension directory
// local URLs don't work :(
//var imgURL = chrome.extension.getURL("images/jenkins_even_greener_ball.gif");

for (var i=0;i<allImgs.snapshotLength;i++) {
    var thisImg = allImgs.snapshotItem(i);
    var src = thisImg.src;

    // 32x32 blue -> green
    if (src.match('32x32/blue.png') != null) {
        //thisImg.src = imgURL; // why doesn't this work??
        //thisImg.src = 'https://issues.jenkins-ci.org/secure/attachmentzip/unzip/137947/19891%5B19%5D/48x48/green.gif';

        // This green ball is even greener than the standard one, which wasn't green enough for me:
        thisImg.src = 'http://www.compufer.com/images/jenkins/32x32/greener.gif';
    }
    else if (src.match('32x32/blue_anime.gif') != null) {
        thisImg.src = 'http://www.compufer.com/images/jenkins/32x32/green_anime.gif';
    }

    // 32x32 red - improve the sprite
    else if (src.match('32x32/red.png') != null) {
        thisImg.src = 'http://www.compufer.com/images/jenkins/32x32/redder.png';
    }

    // 48x48 blue -> green
    else if (src.match('48x48/blue_anime.gif') != null) {
        thisImg.src = 'http://www.compufer.com/images/jenkins/48x48/green_anime.gif';
    }
    else if (src.match('48x48/blue.gif') != null) {
        thisImg.src = 'http://www.compufer.com/images/jenkins/48x48/green.gif';
    }

    // 24x24 blue -> green
    else if (src.match('24x24/blue_anime.gif') != null) {
        thisImg.src = 'http://www.compufer.com/images/jenkins/24x24/green_anime.gif';
    }
    else if (src.match('24x24/blue.gif') != null) {
        thisImg.src = 'http://www.compufer.com/images/jenkins/24x24/green.gif';
    }

    // 16x16 blue -> green
    else if (src.match('16x16/blue_anime.gif') != null) {
        thisImg.src = 'http://www.compufer.com/images/jenkins/16x16/green_anime.gif';
    }
    else if (src.match('16x16/blue.png') != null) {
        // for some reason this was a .png
        thisImg.src = 'http://www.compufer.com/images/jenkins/16x16/green.gif';
    }
}
