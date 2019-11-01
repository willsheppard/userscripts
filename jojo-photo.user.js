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

var debug = 1;

(function() {
    'use strict';

    /*** ATTEMPT 1, March 2019 ***/
    // TODO: Add floating button, when you click it, a new control is added to select album with auto-completion.
    // The reason for the button: The album list may not exist when the page is loaded.

    /*** ATTEMPT 2, October 2019 ***/
    // TODO: Start to hack the page to allow moving albums around a hierarchy
    // TODO: Systematically identify each component

    // Identify "Add to" text
    // DOESNT WORK
    // <div jsname="YASyvd" class="PNenzf" role="heading" aria-level="1" id="KPdYAe8">Add to</div>
//    var add_to = $('div[role="heading"][text()="Add to"]');
//    var add_to = $('div:contains("Add to")');
//    add_to.css({ 'border': '1px dashed red' });


    // Add "start" button
    var r = $('<input type="button" value="start Jojo-Photo user script"/>');
    r.css({'position': 'fixed', 'top': '65px', 'left': '20px', 'z-index': '99999'});
    r.on('click',function(){

        // Identify "Album list" attribute
        var album_list = $('ul[aria-label="Album list"]');
        var album_list_div  = album_list.parent(); //.css( 'border', '1px dashed red' );
        var album_list_span = album_list.parent().parent(); //.css( 'border', '1px dashed red' );
        var top_div         = album_list.parent().parent().parent(); //.css( 'border', '1px dashed red' );

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

        /*
        [album_list, album_list_div, album_list_span, top_div].each(function( index ) {
            console.log( index + ": " + $( this ).text() );
            index.css({'width':'100vw','max-width':'100vw'});
        });
        */

        // identify album list
//        var container = $('div[jscontroller][jsaction][jsshadow][ve-stop-target-search][jsowner]');
        var container = top_div;
        debug && $(container).css({ 'border': '1px dashed red' }); // debug

        // set up album list as a Nestable list
        $(container).wrap( "<div class='dd'></div>" );
        container.addClass("jojoContainer");
        $(container).find('ul').addClass("dd-list");

        // Make wider so entire name can be read
        $(container).find('li').find('div').css({'width':'85vw','max-width':'85vw'});

        // set up list items as Nestable items
        debug && $(container).find('li').find('div').css({ 'border': '1px dashed blue' }); // debug
        $(container).find('li').addClass("dd-item");
        $(container).find('li').prepend( "<div class='dd-handle'>Drag</div>" ); // Click and drag the 'X' to change order of the items

        // Activate the Nestable list
        $('.dd').nestable({ /* config options */ }); // TODO: Prevent dd-item turning white when dragging
        $('.dd').nestable({ scroll: 'true' }); // not working?

/*
        // identify all the components, to make them wider
        var content = $(container).find('div').filter( function() {
            return $(this).find('ul[aria-label="Album list"]')
        });
        debug && $(content).css({ 'border': '5px solid green' }); // debug
*/

        /*
        // TODO: Make albums selector dialog larger
        $('.jojoContainer').css({
            'width': '100vw', // 100vw = 100% of viewport width
            'max-width': '100vw',
        });
        */

        // <div class="Rj0aoe eejsDc" tabindex="-1" autofocus="" jscontroller="jj7Q3d" jsmodel="XbSnZe" jsaction="rcuQ6b:npT2md;JIbuQc:Bu1dJd">
        // span > div > ul
        //         |
        //         \__ width: '90vw', 'max-width': '90vw'

        // Title div "Magazines, 2019"
        // 'max-width': '90vw'

        /* HTML structure:
             // header
             $(container).find('[aria-label="Close"]')
             // content
             $(container).find('div').filter( function() {
                 return $(this).find('ul[aria-label="Album list"]')
             });
        */

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
