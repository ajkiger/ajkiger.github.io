/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

WebGLUtils=function(){var g=function(a){return''+'<table style="background-color: #8CE; width: 100%; height: 100%; font-size: '+initialFontSize+';"><tr>'+'<td align="center" style="vertical-align: top;">'+'<div style="display: table-cell; vertical-align: middle;">'+'<div style="">'+a+'</div>'+'</div>'+'</td></tr></table>'};var h=''+"Word Cubed Weekly requires WebGL to function.<br/>"+'Visit http://get.webgl.org to upgrade your browser.';var i=''+"Word Cubed Weekly requires WebGL to function.<br/>"+"It doesn't appear your device can support WebGL.<br/>"+'Visit http://get.webgl.org for more information.';var j=function(c,d){function showLink(a){var b=c.parentNode;if(b){b.innerHTML=g(a)}};if(!window.WebGLRenderingContext){showLink(h);return null}var e=k(c,d);if(!e){showLink(i)}return e};var k=function(a,b){var c=["webgl","experimental-webgl","webkit-3d","moz-webgl"];var d=null;for(var f=0;f<c.length;++f){try{d=a.getContext(c[f],b)}catch(e){}if(d){break}}return d};return{create3DContext:k,setupWebGL:j}}();window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a,b){return window.setTimeout(a,(1000/60))}})();window.cancelAnimFrame=(function(){return window.cancelAnimationFrame||window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||window.clearTimeout})();