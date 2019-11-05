// ==UserScript==
// @name         Jojo-Photo
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Allow manipulation of the albums list in Google Photos.
// @author       Will Sheppard, 2019
// @match        https://photos.google.com/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      https://dbushell.com/Nestable/jquery.nestable.js
// @grant        none
// ==/UserScript==

/*
   NOTES:

 * The list of albums is not visible when the page loads, so the modifications cannot be triggered by the page onLoad event.
   That is why there is a button to trigger the modifications. Suggestions welcome for firing this automatically when the album list appears.

 * Furthermore, not all the albums are displayed in the list by default. The user must scroll to the bottom for more to be loaded. To do.

 */

var debug = 0;

(function() {
    'use strict';

    // Add "start" button
    var r = $('<input type="button" value="start Jojo-Photo user script"/>');
    r.css({'position': 'fixed', 'top': '65px', 'left': '20px', 'z-index': '99999'});
    r.on('click',function(){

        // Identify "Album list" attribute
        var album_list = $('ul[aria-label="Album list"]');
        var album_list_div  = album_list.parent();
        var album_list_span = album_list.parent().parent();
        var top_div         = album_list.parent().parent().parent(); //.css( 'border', '1px dashed red' );

        // Scroll to the bottom so that all the albums are loaded
        // DOESNT WORK
//        var high = $(document).height();
        var high = 50000;
        album_list.scrollTop(high);
        album_list_div.scrollTop(high);
        album_list_span.scrollTop(high);
        top_div.scrollTop(high);

        // Make all the wrappers wider. Perhaps we don't need to change all of them, but this does the job.
        var wrappers = [album_list, album_list_div, album_list_span, top_div];
        var i;
        for (i = 0; i < wrappers.length; ++i) {
            //console.log(wrappers[i]);
            wrappers[i].css({'width':'85vw','max-width':'85vw'});
        }

        // Move the whole container left a bit, as it's much wider now
        // TODO: Make this relative to the screen/container/whatever
        top_div.css({ 'left': '-300px'});

        // identify album list
        var container = top_div;
        debug && container.css({ 'border': '1px dashed red' }); // debug

        // set up album list as a Nestable list
        container.wrap( "<div class='dd'></div>" );
        container.addClass("jojoContainer");
        container.find('ul').addClass("dd-list");

        // Make wider so entire name can be read
        container.find('li').find('div').css({'width':'85vw','max-width':'85vw'});

        // set up list items as Nestable items
        debug && container.find('li').find('div').css({ 'border': '1px dashed blue' }); // debug
        container.find('li').addClass("dd-item");
        container.find('li').prepend( "<div class='dd-handle'>Drag</div>" ); // Click and drag the 'X' to change order of the items

        // Activate the Nestable list
        $('.dd').nestable({ /* config options */ });
        $('.dd').nestable({ scroll: 'true' });

/*
<div class="jojoContainer" jscontroller jsaction keydown clickonly mousedown touchstart focus blur touchmove jsshadow ve-stop-target-search jslog
    data-position data-cancelids jsowner aria-labelledby>
        <div tabindex="0" aria-hidden="true" class="" jsaction="focus:.CLIENT"></div>

        <div jsname="" class="jojoContainerHeader">
            <div class="" jsaction="">
                <div role="button" class="" jscontroller="" jsaction=""
                    jsshadow="" jsname="" aria-label="Close" aria-disabled="false" tabindex="0" data-id="">
                    <div class="" jsname=""></div>
                </div>
            </div>

            <div jsname="" class="" role="heading" aria-level="1" id="">
                Add to
            </div>

            <div class="" jsaction="">
                <div role="button" class="U26fgb mUbCce fKz7Od Wtw8H kHssdc pPQgvf M9Bg4d" jscontroller="VXdfxd"
                jsaction=
                "click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;"
                jsshadow="" jsname="LgbsSe" aria-label="Close" aria-disabled="false" tabindex="0" data-id="TvD9Pc">
                    <div class="VTBa7b MbhUzd" jsname="ksKsZd"></div>
                </div>
            </div>
        </div>

        <div class="Rj0aoe eejsDc" tabindex="-1" autofocus="" jscontroller="jj7Q3d" jsmodel="XbSnZe" jsaction=
        "rcuQ6b:npT2md;JIbuQc:Bu1dJd" class="jojoContainerContent">
            <ul class="wd4Cmd-VfPpkd-rymPhb cXxRhc uTnhIf dd-list" jsname="GKNjh" jscontroller="ONTsG" jsaction=
            "mouseup:npT2md; mouseleave:JywGue; keydown:I481le; focus:AHmuwe; blur:O22p3e;rcuQ6b:rcuQ6b;" role=
            "listbox" tabindex="0" aria-label="Album list">

                <li class="wd4Cmd-VfPpkd-rymPhb-ibnC6b HZ60i dd-item" jsaction=
                "click:o6ZaF; mousedown:teoBgf; mouseup:NZPHBc; mouseleave:xq3APb; touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8(preventMouseEvents=true)"
                jsname="CmABtb" role="option" tabindex="-1" jslog="10049; track:click" style=
                "border: 1px dashed blue;">
                    <div class="dd-handle">
                        <span jsslot="" jsname="bN97Pc" class="PbnGhe oJeWuf fb0g6">Drag</span>
                    </div>

                    <div class="coE9Nd MqJgdb" aria-hidden="true"></div>

                    <div class="ps3upb">
                        <div class="Yzdhqd">
                            <span jsslot="" jsname="bN97Pc" class="PbnGhe oJeWuf fb0g6">New album</span>
                        </div>
                    </div>
                </li>
*/

        /* <li> items:
        <li class="dd-item" style="border: 1px dashed blue;">
            <div class="dd-handle">X</div>
            <div class="MqJgdb" style="background-image: url('https://.....')"></div>
            <div class="ps3upb">
                <div class="Yzdhqd">Magazines, 2019</div>
                <div class="vVyGvc">6–30 Aug 2039 &nbsp;·&nbsp; 36 items</div>
            </div>
        </li>
        */

        !debug && $(this).attr("disabled", true); // TODO: Only disable if nestable has been applied once.
        // TODO: Programatically scroll to the bottom of the auto-loading album list, then run nestable.
    });
    $("body").append(r);

    // Import Nestable2 style sheets (JS is imported via the @require in header above)
    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/nestable2/1.6.0/jquery.nestable.min.css';
    document.getElementsByTagName("HEAD")[0].appendChild(link);

    // TODO: Add a select2 input control
    // https://select2.org/

    // Idea: When you click on an album in the new display, it relays the click to the real album link
})();

/*** CRAZY IDEAS

* Use an automated testing service that checks the result of CSS design is pixel perfect on all browsers.
  If it fails, that means Google Photos has modified their page, and we need to tweak our code to match.

* ...

***/
