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

(function($){$.attrFn=$.attrFn||{};var k=false,settings={tap_pixel_range:5,swipe_h_threshold:50,swipe_v_threshold:50,taphold_threshold:750,doubletap_int:300,touch_capable:('ontouchstart'in document.documentElement&&!k),startevent:('ontouchstart'in document.documentElement&&!k)?'touchstart':'mousedown',endevent:('ontouchstart'in document.documentElement&&!k)?'touchend':'mouseup',moveevent:('ontouchstart'in document.documentElement&&!k)?'touchmove':'mousemove',hold_timer:null,tap_timer:null};$.isTouchCapable=function(){return settings.touch_capable};$.getStartEvent=function(){return settings.startevent};$.getEndEvent=function(){return settings.endevent};$.getMoveEvent=function(){return settings.moveevent};$.each(['doubletap'],function(i,b){$.fn[b]=function(a){return a?this.on(b,a):this.trigger(b)};$.attrFn[b]=true});$.event.special.doubletap={setup:function(){var j=this,$this=$(j),origTarget,action,firstTap,origEvent;$this.on(settings.startevent,function(e){var a=$this.data('firsttime')||false;if(a){return false}else{$this.data('firsttime',true);$this.data('doubletapped',false);origTarget=e.target;$this.data('callee1',arguments.callee);origEvent=e.originalEvent;firstTap={'position':{'x':(settings.touch_capable)?origEvent.touches[0].screenX:e.screenX,'y':(settings.touch_capable)?origEvent.touches[0].screenY:e.screenY},'offset':{'x':(settings.touch_capable)?origEvent.touches[0].pageX-origEvent.touches[0].target.offsetLeft:e.offsetX,'y':(settings.touch_capable)?origEvent.touches[0].pageY-origEvent.touches[0].target.offsetTop:e.offsetY},'time':new Date().getTime(),'target':e.target};return true}}).on(settings.endevent,function(e){var a=new Date().getTime();var b=$this.data('doubletappcancelled');var c=$this.data('lastTouch')||a+1;if(b){c=a+1;$this.data('doubletappcancelled',false)}var d=a-c;var f;window.clearTimeout(action);$this.data('callee2',arguments.callee);if(d<settings.doubletap_int&&d>0&&(e.target===origTarget)&&d>100){$this.data('firsttime',false);$this.data('doubletapped',true);window.clearTimeout(action);f={'position':{'x':(settings.touch_capable)?origEvent.touches[0].screenX:e.screenX,'y':(settings.touch_capable)?origEvent.touches[0].screenY:e.screenY},'offset':{'x':(settings.touch_capable)?origEvent.touches[0].pageX-origEvent.touches[0].target.offsetLeft:e.offsetX,'y':(settings.touch_capable)?origEvent.touches[0].pageY-origEvent.touches[0].target.offsetTop:e.offsetY},'time':new Date().getTime(),'target':e.target};var g={'firstTap':firstTap,'secondTap':f,'interval':f.time-firstTap.time};triggerCustomEvent(j,'doubletap',e,g)}else{f={'position':{'x':(settings.touch_capable)?origEvent.touches[0].screenX:e.screenX,'y':(settings.touch_capable)?origEvent.touches[0].screenY:e.screenY},'offset':{'x':(settings.touch_capable)?origEvent.touches[0].pageX-origEvent.touches[0].target.offsetLeft:e.offsetX,'y':(settings.touch_capable)?origEvent.touches[0].pageY-origEvent.touches[0].target.offsetTop:e.offsetY},'time':new Date().getTime(),'target':e.target};var h=Math.abs(f.offset.x*1.0-firstTap.offset.x*1.0);var i=Math.abs(f.offset.y*1.0-firstTap.offset.y*1.0);if(h<=10&&i<=10){action=window.setTimeout(function(e){window.clearTimeout(action);$this.data('firsttime',false)},settings.doubletap_int,[e])}else{window.clearTimeout(action);$this.data('firsttime',false);$this.data('doubletappcancelled',true);return}}$this.data('lastTouch',a)})},remove:function(){$(this).off(settings.startevent,$(this).data.callee1).off(settings.endevent,$(this).data.callee2)}};function triggerCustomEvent(a,b,c,d){var e=c.type;c.type=b;$.event.dispatch.call(a,c,d);c.type=e}})(jQuery);