/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mouseDown = false;


function handleMouseDownonCanvas(event) {
    var browserWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var xCoord = event.clientX - (browserWidth - 640)/2;
    var yCoord = event.clientY - 96;
    
    mouseDown = true;
    
    $( "#dialog" ).dialog( "close" );
    $( "#dialogHints" ).dialog( "close" );
    $( "#dialogSettings" ).dialog( "close" );
    $( "#dialoggames" ).dialog( "close" );
    
    
    document.getElementById('menuAlign').innerHTML = "x:" + xCoord;
    document.getElementById('ycoord3').innerHTML = "y:" + yCoord;
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
    var browserWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var xCoord = event.clientX - (browserWidth - 640)/2;
    var yCoord = event.clientY - 96;
    
    document.getElementById('menuAlign').innerHTML = "x:" + xCoord;
    document.getElementById('ycoord3').innerHTML = "y:" + yCoord;
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
    
    mouseDown = false;
    
    document.getElementById('menuAlign').innerHTML = "DT";
    document.getElementById('ycoord3').innerHTML = "DT";
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