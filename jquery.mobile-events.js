/*!
 * jQuery Mobile Events
 * by Ben Major (www.ben-major.co.uk)
 *
 * Copyright 2011, Ben Major
 * Licensed under the MIT License:
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
(function ($) {
    $.attrFn = $.attrFn || {};

    // navigator.userAgent.toLowerCase() isn't reliable for Chrome installs
    // on mobile devices. As such, we will create a boolean isChromeDesktop
    // The reason that we need to do this is because Chrome annoyingly
    // purports support for touch events even if the underlying hardware
    // does not!
    var //agent = navigator.userAgent.toLowerCase(),
        //isChromeDesktop = (agent.indexOf('chrome') > -1 && ((agent.indexOf('windows') > -1) || (agent.indexOf('macintosh') > -1) || (agent.indexOf('linux') > -1)) && agent.indexOf('mobile') < 0),
        isChromeDesktop = false,
        
        
        settings = {
            tap_pixel_range: 5,
            swipe_h_threshold: 50,
            swipe_v_threshold: 50,
            taphold_threshold: 750,
            doubletap_int: 400,

            touch_capable: ('ontouchstart' in document.documentElement && !isChromeDesktop),
            //orientation_support: ('orientation' in window && 'onorientationchange' in window),

            startevent: ('ontouchstart' in document.documentElement && !isChromeDesktop) ? 'touchstart' : 'mousedown',
            endevent: ('ontouchstart' in document.documentElement && !isChromeDesktop) ? 'touchend' : 'mouseup',
            moveevent: ('ontouchstart' in document.documentElement && !isChromeDesktop) ? 'touchmove' : 'mousemove',
            //tapevent: ('ontouchstart' in document.documentElement && !isChromeDesktop) ? 'tap' : 'click',
            //scrollevent: ('ontouchstart' in document.documentElement && !isChromeDesktop) ? 'touchmove' : 'scroll',

            hold_timer: null,
            tap_timer: null
        };
        
    
    // Convenience functions:
    $.isTouchCapable = function() { return settings.touch_capable; };
    $.getStartEvent = function() { return settings.startevent; };
    $.getEndEvent = function() { return settings.endevent; };
    $.getMoveEvent = function() { return settings.moveevent; };
    //$.getTapEvent = function() { return settings.tapevent; };
    //$.getScrollEvent = function() { return settings.scrollevent; };
    
    // Add Event shortcuts:
    //$.each(['tapstart', 'tapend', 'tap', 'singletap', 'doubletap', 'taphold', 'swipe', 'swipeup', 'swiperight', 'swipedown', 'swipeleft', 'swipeend', 'scrollstart', 'scrollend', 'orientationchange'], function (i, name) {
    $.each(['doubletap'], function (i, name) {
        $.fn[name] = function (fn) {
            return fn ? this.on(name, fn) : this.trigger(name);
        };

        $.attrFn[name] = true;
    });

    

    // doubletap Event:
    $.event.special.doubletap = {
        setup: function () {
            var thisObject = this,
                $this = $(thisObject),
                origTarget,
                action,
                firstTap,
                origEvent;

            $this.on(settings.startevent, function (e) {
                var firsttime = $this.data('firsttime') || false;
                if (firsttime) {
                    return false;
                } else {
                    $this.data('firsttime', true);
                    $this.data('doubletapped', false);
                    
                    origTarget = e.target;
                    $this.data('callee1', arguments.callee);

                    origEvent = e.originalEvent;
                    firstTap = {
                        'position': {
                            'x': (settings.touch_capable) ? origEvent.touches[0].screenX : e.screenX,
                            'y': (settings.touch_capable) ? origEvent.touches[0].screenY : e.screenY
                        },
                        'offset': {
                            'x': (settings.touch_capable) ? origEvent.touches[0].pageX - origEvent.touches[0].target.offsetLeft : e.offsetX,
                            'y': (settings.touch_capable) ? origEvent.touches[0].pageY - origEvent.touches[0].target.offsetTop : e.offsetY
                        },
                        'time': new Date().getTime(),
                        'target': e.target
                    };

                    return true;
                }
            }).on(settings.endevent, function (e) {
                var now = new Date().getTime();
                var doubletappcancelled = $this.data('doubletappcancelled');
                var lastTouch = $this.data('lastTouch') || now + 1;
                if(doubletappcancelled){
                    lastTouch = now + 1;
                    $this.data('doubletappcancelled', false);
                }
                var delta = now - lastTouch;
                var lastTap;
                
                window.clearTimeout(action);
                $this.data('callee2', arguments.callee);

                if (delta < settings.doubletap_int && delta > 0 && (e.target === origTarget) && delta > 100) {
                    $this.data('firsttime', false);
                    $this.data('doubletapped', true);
                    window.clearTimeout(action);
                    //window.clearTimeout(settings.tap_timer);

                    // Now get the current event:
                    lastTap = {
                        'position': {
                            'x': (settings.touch_capable) ? origEvent.touches[0].screenX : e.screenX,
                            'y': (settings.touch_capable) ? origEvent.touches[0].screenY : e.screenY
                        },
                        'offset': {
                            'x': (settings.touch_capable) ? origEvent.touches[0].pageX - origEvent.touches[0].target.offsetLeft : e.offsetX,
                            'y': (settings.touch_capable) ? origEvent.touches[0].pageY - origEvent.touches[0].target.offsetTop : e.offsetY
                        },
                        'time': new Date().getTime(),
                        'target': e.target
                    };

                    var touchData = {
                        'firstTap': firstTap,
                        'secondTap': lastTap,
                        'interval': lastTap.time - firstTap.time
                    };

                    triggerCustomEvent(thisObject, 'doubletap', e, touchData);
                } else {
                    //$this.data('lastTouch', now);
                    
                    lastTap = {
                        'position': {
                            'x': (settings.touch_capable) ? origEvent.touches[0].screenX : e.screenX,
                            'y': (settings.touch_capable) ? origEvent.touches[0].screenY : e.screenY
                        },
                        'offset': {
                            'x': (settings.touch_capable) ? origEvent.touches[0].pageX - origEvent.touches[0].target.offsetLeft : e.offsetX,
                            'y': (settings.touch_capable) ? origEvent.touches[0].pageY - origEvent.touches[0].target.offsetTop : e.offsetY
                        },
                        'time': new Date().getTime(),
                        'target': e.target
                    };
                    
                    var deltaX = Math.abs(lastTap.offset.x * 1.0 - firstTap.offset.x * 1.0);
                    var deltaY = Math.abs(lastTap.offset.y * 1.0 - firstTap.offset.y * 1.0);
                    if( deltaX <= 10 && deltaY <= 10 ){
                        
                        action = window.setTimeout(function (e) {
                            window.clearTimeout(action);
                            //window.clearTimeout(settings.tap_timer);
                            $this.data('firsttime', false);
                        }, settings.doubletap_int, [e]);
                    }
                    else
                    {
                        window.clearTimeout(action);
                        //window.clearTimeout(settings.tap_timer);
                        $this.data('firsttime', false);
                        $this.data('doubletappcancelled', true);
                        return;
                    }
                    
                }
                $this.data('lastTouch', now);
                
            });
        },
        
        remove: function () {
            $(this).off(settings.startevent, $(this).data.callee1).off(settings.endevent, $(this).data.callee2);
        }
    };

    

    // Trigger a custom event:

    function triggerCustomEvent(obj, eventType, event, touchData) {
        var originalType = event.type;
        event.type = eventType;

        $.event.dispatch.call(obj, event, touchData);
        event.type = originalType;
    }

    

})(jQuery);
