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
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
    
}

function handleMouseMoveonCanvas(event) {
    
    if (!mouseDown) {
        return;
    }
    
    touchesMoved(event);
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
    
}

function handleMouseUponCanvas(event) {
    
    mouseDown = false;
    touchesEnd();
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
}

function handleMouseDblClickonCanvas(event) {
    
    //alert("double Tap");
    mouseDown = false;
    doubleTap();
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
}



function handleMouseOutonCanvas(event){
    
    mouseDown = false;
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
}