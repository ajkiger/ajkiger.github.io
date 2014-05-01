/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mouseDown = false;


function handleMouseDownonCanvas(event) {
    
    mouseDown = true;
    
    $( "#dialog" ).dialog( "close" );
    $( "#dialogHints" ).dialog( "close" );
    $( "#dialogSettings" ).dialog( "close" );
    $( "#dialoggames" ).dialog( "close" );
    
    touchesBegan(event);
}

function handleMouseMoveonCanvas(event) {
    
    if (!mouseDown) {
        return;
    }
    
    
    touchesMoved(event);
    
    
}

function handleMouseUponCanvas(event) {
    
    mouseDown = false;
    
    
    touchesEnd();
}

function handleMouseDblClickonCanvas(event) {
    
    
    doubleTap();
    
}

function handleMouseOutonCanvas(event){
    
    mouseDown = false;
    
}