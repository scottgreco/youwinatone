/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/*
 SUPERSCROLLORAMA - The jQuery plugin for doing scroll animations
 by John Polacek (@johnpolacek)

 Powered by the Greensock Tweening Platform
 http://www.greensock.com
 Greensock License info at http://www.greensock.com/licensing/

 Dual licensed under MIT and GPL.

 Thanks to Jan Paepke (@janpaepke) for making some nice improvements
 */

(function($) {

    $.superscrollorama = function(options) {

        var superscrollorama = this;
        var defaults = {
            isVertical:true,		// are we scrolling vertically or horizontally?
            triggerAtCenter: true,	// the animation triggers when the respective Element's origin is in the center of the scrollarea. This can be changed here to be at the edge (-> false)
            playoutAnimations: true,	// when scrolling past the animation should they be played out (true) or just be jumped to the respective last frame (false)? Does not affect animations where duration = 0
            reverse: true			// make reverse configurable so you don't have to pass it in for every tween to reverse globally
        };
        superscrollorama.settings = $.extend({}, defaults, options);
        var $window = $(window);

        // PRIVATE VARS

        var animObjects = [],
            pinnedObjects = [],
            scrollContainerOffset = {x: 0, y: 0},
            doUpdateOnNextTick = false,
            targetOffset,
            i;

        // PRIVATE FUNCTIONS

        function init() {
            // set event handlers
            $window.scroll(function() {
                doUpdateOnNextTick = true;
            });
            TweenLite.ticker.addEventListener("tick", tickHandler);
        }

        function cssNumericPosition ($elem) { // return 0 when value is auto
            var obj = {
                top: parseFloat($elem.css("top")),
                left: parseFloat($elem.css("left"))
            };
            if (isNaN(obj.top)) {
                obj.top = 0;
            }
            if (isNaN(obj.left)) {
                obj.left = 0;
            }
            return obj;
        }

        function tickHandler() {
            if (doUpdateOnNextTick) {
                checkScrollAnim();
                doUpdateOnNextTick = false;
            }
        }

        // reset a pin Object
        function resetPinObj (pinObj) {
            pinObj.el.css('position', pinObj.origPositioning.pos);
            pinObj.el.css('top', pinObj.origPositioning.top);
            pinObj.el.css('left', pinObj.origPositioning.left);
        }
        // set a Tween Progress (use totalProgress for TweenMax and TimelineMax to include repeats)
        function setTweenProgress(tween, progress) {
            if (tween) {
                if (tween.totalProgress) {
                    tween.totalProgress(progress).pause();
                } else {
                    tween.progress(progress).pause();
                }
            }
        }

        function checkScrollAnim() {
            var currScrollPoint = superscrollorama.settings.isVertical ? $window.scrollTop() + scrollContainerOffset.y :  $window.scrollLeft() + scrollContainerOffset.x;
            var offsetAdjust = superscrollorama.settings.triggerAtCenter ? (superscrollorama.settings.isVertical ? -$window.height()/2 : -$window.width()/2) : 0;
            var i, startPoint, endPoint;

            // check all animObjects
            var numAnim = animObjects.length;
            for (i=0; i<numAnim; i++) {
                var animObj = animObjects[i],
                    target = animObj.target,
                    offset = animObj.offset;

                if (typeof(target) === 'string') {
                    targetOffset = $(target).offset();
                    startPoint = superscrollorama.settings.isVertical ? targetOffset.top + scrollContainerOffset.y : targetOffset.left + scrollContainerOffset.x;
                    offset += offsetAdjust;
                } else if (typeof(target) === 'number')	{
                    startPoint = target;
                } else if ($.isFunction(target)) {
                    startPoint = target.call(this);
                } else {
                    targetOffset = target.offset();
                    startPoint = superscrollorama.settings.isVertical ? targetOffset.top + scrollContainerOffset.y : targetOffset.left + scrollContainerOffset.x;
                    offset += offsetAdjust;
                }

                startPoint += offset;
                endPoint = startPoint + animObj.dur; // if the duration is 0 the animation should autoplay (forward going from BEFORE to AFTER and reverse going from AFTER to BEFORE)

                if ((currScrollPoint > startPoint && currScrollPoint < endPoint) && animObj.state !== 'TWEENING') {
                    // if it should be TWEENING and isn't..
                    animObj.state = 'TWEENING';
                    animObj.start = startPoint;
                    animObj.end = endPoint;
                }
                if (currScrollPoint < startPoint && animObj.state !== 'BEFORE' && animObj.reverse) {
                    // if it should be at the BEFORE tween state and isn't..
                    if (superscrollorama.settings.playoutAnimations || animObj.dur === 0) {
                        animObj.tween.reverse();
                    } else {
                        setTweenProgress(animObj.tween, 0);
                    }
                    animObj.state = 'BEFORE';
                } else if (currScrollPoint > endPoint && animObj.state !== 'AFTER') {
                    // if it should be at the AFTER tween state and isn't..
                    if (superscrollorama.settings.playoutAnimations || animObj.dur === 0) {
                        animObj.tween.play();
                    } else {
                        setTweenProgress(animObj.tween, 1);
                    }
                    animObj.state = 'AFTER';
                } else if (animObj.state === 'TWEENING') {
                    // if it is TWEENING..
                    var repeatIndefinitely = false;
                    if (animObj.tween.repeat) {
                        // does the tween even have the repeat option (TweenMax / TimelineMax)
                        repeatIndefinitely = (animObj.tween.repeat() === -1);
                    }

                    if (repeatIndefinitely) { // if the animation loops indefinitely it will just play for the time of the duration
                        var playheadPosition = animObj.tween.totalProgress(); // there is no "isPlaying" value so we need to save the playhead to determin wether the animation is running
                        if (animObj.playeadLastPosition === null || playheadPosition === animObj.playeadLastPosition) {
                            if (playheadPosition === 1) {
                                if (animObj.tween.yoyo()) {
                                    // reverse Playback with infinitely looped tweens only works with yoyo true
                                    animObj.tween.reverse();
                                } else {
                                    animObj.tween.totalProgress(0).play();
                                }
                            } else {
                                animObj.tween.play();
                            }
                        }
                        animObj.playeadLastPosition = playheadPosition;
                    } else {
                        setTweenProgress(animObj.tween, (currScrollPoint - animObj.start)/(animObj.end - animObj.start));
                    }
                }
            }

            // check all pinned elements
            var numPinned = pinnedObjects.length;
            for (i=0; i<numPinned; i++) {
                var pinObj = pinnedObjects[i];
                var el = pinObj.el;

                // should object be pinned (or updated)?
                if (pinObj.state !== 'PINNED') {

                    if (pinObj.state === 'UPDATE') {
                        resetPinObj(pinObj); // revert to original Position so startPoint and endPoint will be calculated to the correct values
                    }

                    startPoint = superscrollorama.settings.isVertical ? pinObj.spacer.offset().top + scrollContainerOffset.y : pinObj.spacer.offset().left + scrollContainerOffset.x;
                    startPoint += pinObj.offset;

                    endPoint = startPoint + pinObj.dur;

                    var jumpedPast = ((currScrollPoint > endPoint && pinObj.state === 'BEFORE') || (currScrollPoint < startPoint && pinObj.state === 'AFTER')); // if we jumped past a pinarea (i.e. when refreshing or using a function) we need to temporarily pin the element so it gets positioned to start or end respectively
                    var inPinAra = (currScrollPoint > startPoint && currScrollPoint < endPoint);
                    if (inPinAra || jumpedPast) {
                        // set original position values for unpinning
                        if (pinObj.pushFollowers && el.css('position') === "static") { // this can't be. If we want to pass following elements we need to at least allow relative positioning
                            el.css('position', "relative");
                        }
                        // save original positioning
                        pinObj.origPositioning = {
                            pos: el.css('position'),
                            top: pinObj.spacer.css('top'),
                            left: pinObj.spacer.css('left')
                        };
                        // change to fixed position
                        pinObj.fixedPositioning = {
                            top: superscrollorama.settings.isVertical ? -pinObj.offset : pinObj.spacer.offset().top,
                            left: superscrollorama.settings.isVertical ? pinObj.spacer.offset().left : -pinObj.offset
                        };
                        el.css('position','fixed');
                        el.css('top', pinObj.fixedPositioning.top);
                        el.css('left', pinObj.fixedPositioning.left);

                        // save values
                        pinObj.pinStart = startPoint;
                        pinObj.pinEnd = endPoint;

                        // If we want to push down following Items we need a spacer to do it, while and after our element is fixed.
                        if (pinObj.pushFollowers) {
                            if (superscrollorama.settings.isVertical) {
                                pinObj.spacer.height(pinObj.dur + el.outerHeight());
                            } else {
                                pinObj.spacer.width(pinObj.dur + el.outerWidth());
                            }
                        } else {
                            if (pinObj.origPositioning.pos === "absolute") { // no spacer
                                pinObj.spacer.width(0);
                                pinObj.spacer.height(0);
                            } else { // spacer needs to reserve the elements space, while pinned
                                if (superscrollorama.settings.isVertical) {
                                    pinObj.spacer.height(el.outerHeight());
                                } else {
                                    pinObj.spacer.width(el.outerWidth());
                                }
                            }
                        }


                        if (pinObj.state === "UPDATE") {
                            if (pinObj.anim) {
                                setTweenProgress(pinObj.anim, 0); // reset the progress, otherwise the animation won't be updated to the new position
                            }
                        } else if (pinObj.onPin) {
                            pinObj.onPin(pinObj.state === "AFTER");
                        }

                        // pin it!
                        pinObj.state = 'PINNED';
                    }
                }
                // If state changed to pinned (or already was) we need to position the element
                if (pinObj.state === 'PINNED') {
                    // Check to see if object should be unpinned
                    if (currScrollPoint < pinObj.pinStart || currScrollPoint > pinObj.pinEnd) {
                        // unpin it
                        var before = currScrollPoint < pinObj.pinStart;
                        pinObj.state = before ? 'BEFORE' : 'AFTER';
                        // set Animation to end or beginning
                        setTweenProgress(pinObj.anim, before ? 0 : 1);

                        var spacerSize = before ? 0 : pinObj.dur;

                        if (superscrollorama.settings.isVertical) {
                            pinObj.spacer.height(pinObj.pushFollowers ? spacerSize : 0);
                        } else {
                            pinObj.spacer.width(pinObj.pushFollowers ? spacerSize : 0);
                        }

                        // correct values if pin Object was moved (animated) during PIN (pinObj.el.css values will never be auto as they are set by the class)
                        var deltay = pinObj.fixedPositioning.top - cssNumericPosition(pinObj.el).top;
                        var deltax = pinObj.fixedPositioning.left - cssNumericPosition(pinObj.el).left;

                        // first revert to start values
                        resetPinObj(pinObj);

                        // position element correctly
                        if (!pinObj.pushFollowers || pinObj.origPositioning.pos === "absolute") {
                            var pinOffset;

                            if (pinObj.origPositioning.pos === "relative") { // position relative and pushFollowers = false
                                pinOffset = superscrollorama.settings.isVertical ?
                                    parseFloat(pinObj.origPositioning.top) :
                                    parseFloat(pinObj.origPositioning.left);
                                if (isNaN(pinOffset)) { // if Position was "auto" parseFloat will result in NaN
                                    pinOffset = 0;
                                }
                            } else {
                                pinOffset = superscrollorama.settings.isVertical ?
                                    pinObj.spacer.position().top :
                                    pinObj.spacer.position().left;
                            }

                            var direction = superscrollorama.settings.isVertical ?
                                "top" :
                                "left";

                            pinObj.el.css(direction, pinOffset + spacerSize);
                        } // if position relative and pushFollowers is true the element remains untouched.

                        // now correct values if they have been changed during pin
                        if (deltay !== 0) {
                            pinObj.el.css("top", cssNumericPosition(pinObj.el).top - deltay);
                        }
                        if (deltax !== 0) {
                            pinObj.el.css("left", cssNumericPosition(pinObj.el).left - deltax);
                        }
                        if (pinObj.onUnpin) {
                            pinObj.onUnpin(!before);
                        }
                    } else if (pinObj.anim) {
                        // do animation
                        setTweenProgress(pinObj.anim, (currScrollPoint - pinObj.pinStart)/(pinObj.pinEnd - pinObj.pinStart));
                    }
                }
            }
        }

        // PUBLIC FUNCTIONS
        superscrollorama.addTween = function(target, tween, dur, offset, reverse) {

            tween.pause();

            animObjects.push({
                target:target,
                tween: tween,
                offset: offset || 0,
                dur: dur || 0,
                reverse: (typeof reverse !== "undefined") ? reverse : superscrollorama.settings.reverse, // determine if reverse animation has been disabled
                state:'BEFORE'
            });

            return superscrollorama;
        };

        superscrollorama.pin = function(el, dur, vars) {
            if (typeof(el) === 'string') {
                el = $(el);
            }
            var defaults = {
                offset: 0,
                pushFollowers: true		// if true following elements will be "pushed" down, if false the pinned element will just scroll past them
            };
            vars = $.extend({}, defaults, vars);
            if (vars.anim) {
                vars.anim.pause();
            }

            var spacer = $('<div class="superscrollorama-pin-spacer"></div>');
            spacer.css("position", "relative");
            spacer.css("top", el.css("top"));
            spacer.css("left", el.css("left"));
            el.before(spacer);

            pinnedObjects.push({
                el:el,
                state:'BEFORE',
                dur:dur,
                offset: vars.offset,
                anim:vars.anim,
                pushFollowers:vars.pushFollowers,
                spacer:spacer,
                onPin:vars.onPin,
                onUnpin:vars.onUnpin
            });
            return superscrollorama;
        };

        superscrollorama.updatePin = function (el, dur, vars) { // Update a Pinned object. dur and vars are optional to only change vars and keep dur just pass NULL for dur
            if (typeof(el) === 'string') {
                el = $(el);
            }
            if (vars.anim) {
                vars.anim.pause();
            }

            var numPinned = pinnedObjects.length;

            for (i=0; i<numPinned; i++) {
                var pinObj = pinnedObjects[i];
                if (el.get(0) === pinObj.el.get(0)) {

                    if (dur) {
                        pinObj.dur = dur;
                    }
                    if (vars.anim) {
                        pinObj.anim = vars.anim;
                    }
                    if (vars.offset) {
                        pinObj.offset = vars.offset;
                    }
                    if (typeof vars.pushFollowers !== "undefined") {
                        pinObj.pushFollowers = vars.pushFollowers;
                    }
                    if (vars.onPin) {
                        pinObj.onPin = vars.onPin;
                    }
                    if (vars.onUnpin) {
                        pinObj.onUnpin = vars.onUnpin;
                    }
                    if ((dur || vars.anim || vars.offset) && pinObj.state === 'PINNED') { // this calls for an immediate update!
                        pinObj.state = 'UPDATE';
                        checkScrollAnim();
                    }
                }
            }
            return superscrollorama;
        };

        superscrollorama.removeTween = function (target, tween, reset) {
            var count = animObjects.length;
            if (typeof reset === "undefined") {
                reset = true;
            }
            for (var index = 0; index < count; index++) {
                var value = animObjects[index];
                if (value.target === target &&
                    (!tween || value.tween === tween)) { // tween is optional. if not set just remove element
                    animObjects.splice(index,1);
                    if (reset) {
                        setTweenProgress(value.tween, 0);
                    }
                    count--;
                    index--;
                }
            }
            return superscrollorama;
        };

        superscrollorama.removePin = function (el, reset) {
            if (typeof(el) === 'string') {
                el = $(el);
            }
            if (typeof reset === "undefined") {
                reset = true;
            }
            var count = pinnedObjects.length;
            for (var index = 0; index < count; index++) {
                var value = pinnedObjects[index];
                if (value.el.is(el)) {
                    pinnedObjects.splice(index,1);
                    if (reset) {
                        value.spacer.remove();
                        resetPinObj(value);
                        if (value.anim) {
                            setTweenProgress(value.anim, 0);
                        }
                    }
                    count--;
                    index--;
                }
            }
            return superscrollorama;
        };

        superscrollorama.setScrollContainerOffset = function (x, y) {
            scrollContainerOffset.x = x;
            scrollContainerOffset.y = y;
            return superscrollorama;
        };

        superscrollorama.triggerCheckAnim = function (immediately) { // if immedeately is true it will be updated right now, if false it will wait until next tweenmax tick. default is false
            if (immediately) {
                checkScrollAnim();
            } else {
                doUpdateOnNextTick = true;
            }
            return superscrollorama;
        };


        // INIT
        init();

        return superscrollorama;
    };

})(jQuery);

/*! skrollr 0.6.6 (2013-06-05) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e,t,r){"use strict";
    function n(r)
    {
        if(o=t.documentElement,a=t.body,M(),ot=this,r=r||{},ct=r.constants||{},r.easing)
            for(var n in r.easing)
                U[n]=r.easing[n];
        mt=r.edgeStrategy||"ease",lt={beforerender:r.beforerender,render:r.render},st=r.forceHeight!==!1,st&&(Et=r.scale||1),ut=r.smoothScrolling!==!1,pt={targetTop:ot.getScrollTop()},Vt=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),Vt?(it=t.getElementById("skrollr-body"),it&&nt(),j(),bt(o,[y,S],[T])):bt(o,[y,b],[T]),ot.refresh(),vt(e,"resize orientationchange",ht);var i=R();return function l(){X(),i(l)}(),ot}var o,a,i=e.skrollr={get:function(){return ot},init:function(e){return ot||new n(e)},VERSION:"0.6.6"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",p="touchcancel",g="touchend",m="skrollable",d=m+"-before",v=m+"-between",h=m+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",k="linear",w=1e3,x=6e-4,A=200,E="start",F="end",C="center",D="bottom",H="___skrollable_id",V=/^\s+|\s+$/g,z=/^data(?:-(_\w+))?(?:-?(-?\d+))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,O=/\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,P=/^([a-z\-]+)\[(\w+)\]$/,q=/-([a-z])/g,I=function(e,t){return t.toUpperCase()},B=/[\-+]?[\d]*\.?[\d]+/g,_=/\{\?\}/g,G=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,L=/[a-z\-]+-gradient/g,N="",$="",M=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(N=n.match(e)||+n==n&&t[n].match(e))break;if(!N)return N=$="",r;N=N[0],"-"===N.slice(0,1)?($=N,N={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[N]):$="-"+N.toLowerCase()+"-"}},R=function(){var t=e.requestAnimationFrame||e[N.toLowerCase()+"RequestAnimationFrame"],r=wt();return(Vt||!t)&&(t=function(t){var n=wt()-r,o=s.max(0,33-n);e.setTimeout(function(){r=wt(),t()},o)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,at=[],Ht=0,e=t.getElementsByTagName("*")):e=[].concat(e),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=ut,f=mt;if(i.attributes){for(var u=0,p=i.attributes.length;p>u;u++){var g=i.attributes[u];if("data-anchor-target"!==g.name)if("data-smooth-scrolling"!==g.name)if("data-edge-strategy"!==g.name){var d=g.name.match(z);if(null!==d){var v=d[1];v=v&&ct[v.substr(1)]||0;var h=(0|d[2])+v,y=d[3],T=d[4]||y,b={offset:h,props:g.value,element:i};s.push(b),y&&y!==E&&y!==F?(b.mode="relative",b.anchors=[y,T]):(b.mode="absolute",y===F?b.isEnd=!0:(b.frame=h*Et,delete b.offset))}}else f=g.value;else c="off"!==g.value;else if(l=t.querySelector(g.value),null===l)throw'Unable to find anchor target "'+g.value+'"'}if(s.length){var S,k,w;!a&&H in i?(w=i[H],S=at[w].styleAttr,k=at[w].classAttr):(w=i[H]=Ht++,S=i.style.cssText,k=Tt(i)),at[w]={element:i,styleAttr:S,classAttr:k,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f},bt(i,[m],[])}}}for(ht(),n=0,o=e.length;o>n;n++){var x=at[e[n][H]];x!==r&&(Z(x),K(x))}return ot},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=ot.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=wt(),o=ot.getScrollTop();return ft={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||w,startTime:n,endTime:n+(t.duration||w),easing:U[t.easing||k],done:t.done},ft.topDiff||(ft.done&&ft.done.call(ot,!1),ft=r),ot},n.prototype.stopAnimateTo=function(){ft&&ft.done&&ft.done.call(ot,!0),ft=r},n.prototype.isAnimatingTo=function(){return!!ft},n.prototype.setScrollTop=function(t,r){return r===!0&&(Ct=t,gt=!0),Vt?(zt=s.min(s.max(t,0),At),it&&i.setStyle(it,"transform","translate(0, "+-zt+"px) "+dt)):e.scrollTo(0,t),ot},n.prototype.getScrollTop=function(){return Vt?zt:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.on=function(e,t){return lt[e]=t,ot},n.prototype.off=function(e){return delete lt[e],ot};var j=function(){var t,n,i,l,c,m,d,v,h,y,T;vt(o,[f,u,p,g].join(" "),function(e){e.preventDefault();var o=e.changedTouches[0];switch(l=o.clientY,c=o.clientX,h=e.timeStamp,e.type){case f:t&&t.blur(),t=e.target,n=m=l,i=c,v=h;break;case u:d=l-m,T=h-y,ot.setScrollTop(zt-d),m=l,y=h;break;default:case p:case g:var a=n-l,b=i-c,S=b*b+a*a;if(49>S)return t.focus(),t.click(),r;t=r;var k=d/T;k=s.max(s.min(k,3),-3);var w=s.abs(k/x),A=k*w+.5*x*w*w,E=ot.getScrollTop()-A,F=0;E>At?(F=(At-E)/A,E=At):0>E&&(F=-E/A,E=0),w*=1-F,ot.animateTo(E,{easing:"outCubic",duration:w})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},Y=function(){var e,t,r,n,o,a,i,l,c;for(l=0,c=at.length;c>l;l++)for(e=at[l],t=e.element,r=e.anchorTarget,n=e.keyFrames,o=0,a=n.length;a>o;o++)i=n[o],"relative"===i.mode&&(rt(t),i.frame=ot.relativeToAbsolute(r,i.anchors[0],i.anchors[1])-i.offset,rt(t,!0)),st&&!i.isEnd&&i.frame>At&&(At=i.frame);for(At=s.max(At,yt()),l=0,c=at.length;c>l;l++){for(e=at[l],n=e.keyFrames,o=0,a=n.length;a>o;o++)i=n[o],i.isEnd&&(i.frame=At-i.offset);e.keyFrames.sort(xt)}},W=function(e,t){for(var r=0,n=at.length;n>r;r++){var o,a,s=at[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,p=u[0].frame,g=u[u.length-1].frame,y=p>f,T=f>g,b=u[y?0:u.length-1];if(y||T){if(y&&-1===s.edge||T&&1===s.edge)continue;switch(bt(c,[y?d:h],[d,v,h]),s.edge=y?-1:1,s.edgeStrategy){case"reset":rt(c);continue;case"set":var S=b.props;for(o in S)l.call(S,o)&&(a=tt(S[o].value),i.setStyle(c,o,a));continue;default:case"ease":f=b.frame}}else 0!==s.edge&&(bt(c,[m,v],[d,h]),s.edge=0);for(var k=0,w=u.length-1;w>k;k++)if(f>=u[k].frame&&u[k+1].frame>=f){var x=u[k],A=u[k+1];for(o in x.props)if(l.call(x.props,o)){var E=(f-x.frame)/(A.frame-x.frame);E=x.props[o].easing(E),a=et(x.props[o].value,A.props[o].value,E),a=tt(a),i.setStyle(c,o,a)}break}}},X=function(){var e,t,n=ot.getScrollTop(),o=wt();if(ft)o>=ft.endTime?(n=ft.targetTop,e=ft.done,ft=r):(t=ft.easing((o-ft.startTime)/ft.duration),n=0|ft.startTop+t*ft.topDiff),ot.setScrollTop(n);else if(!Vt){var a=pt.targetTop-n;a&&(pt={startTop:Ct,topDiff:n-Ct,targetTop:n,startTime:Dt,endTime:Dt+A}),pt.endTime>=o&&(t=U.sqrt((o-pt.startTime)/A),n=0|pt.startTop+t*pt.topDiff)}if(gt||Ct!==n){Ft=n>=Ct?"down":"up",gt=!1;var i={curTop:n,lastTop:Ct,maxTop:At,direction:Ft},l=lt.beforerender&&lt.beforerender.call(ot,i);l!==!1&&(W(n,ot.getScrollTop()),Ct=n,lt.render&&lt.render.call(ot,i)),e&&e.call(ot,!1)}Dt=o},Z=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=O.exec(l.props));)a=i[1],o=i[2],n=a.match(P),null!==n?(a=n[1],n=n[2]):n=k,o=o.indexOf("!")?J(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},J=function(e){var t=[];return G.lastIndex=0,e=e.replace(G,function(e){return e.replace(B,function(e){return 100*(e/255)+"%"})}),$&&(L.lastIndex=0,e=e.replace(L,function(e){return $+e})),e=e.replace(B,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},K=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)Q(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)Q(e.keyFrames[t],n)},Q=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},et=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},tt=function(e){var t=1;return _.lastIndex=0,e[0].replace(_,function(){return e[t++]})},rt=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=at[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,bt(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=Tt(n),n.style.cssText=r.styleAttr,bt(n,r.classAttr)))},nt=function(){dt="translateZ(0)",i.setStyle(it,"transform",dt);var e=c(it),t=e.getPropertyValue("transform"),r=e.getPropertyValue($+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(dt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(q,I).replace("-",""),"zIndex"===t)n[t]=""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{N&&(n[N+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var ot,at,it,lt,st,ct,ft,ut,pt,gt,mt,dt,vt=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1}),n.call(this,t)};r=r.split(" ");for(var a=0,i=r.length;i>a;a++)t.addEventListener?t.addEventListener(r[a],n,!1):t.attachEvent("on"+r[a],o)},ht=function(){var e=ot.getScrollTop();At=0,st&&!Vt&&(a.style.height="auto"),Y(),st&&!Vt&&(a.style.height=At+o.clientHeight+"px"),Vt?ot.setScrollTop(s.min(ot.getScrollTop(),At)):ot.setScrollTop(e,!0),gt=!0},yt=function(){var e=it&&it.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},Tt=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},bt=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=kt(i).replace(kt(o[l])," ");i=St(i);for(var c=0,f=n.length;f>c;c++)-1===kt(i).indexOf(kt(n[c]))&&(i+=" "+n[c]);t[a]=St(i)},St=function(e){return e.replace(V,"")},kt=function(e){return" "+e+" "},wt=Date.now||function(){return+new Date},xt=function(e,t){return e.frame-t.frame},At=0,Et=1,Ft="down",Ct=-1,Dt=wt(),Ht=0,Vt=!1,zt=0})(window,document);
