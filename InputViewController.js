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
    xCoord = parseFloat(Math.round(xCoord * 100) / 100).toFixed(0);
    yCoord = parseFloat(Math.round(yCoord * 100) / 100).toFixed(0);
    
    mouseDown = true;
    
    $( "#dialog" ).dialog( "close" );
    $( "#dialogHints" ).dialog( "close" );
    $( "#dialogSettings" ).dialog( "close" );
    $( "#dialoggames" ).dialog( "close" );
    
    
    document.getElementById('menuAlign').innerHTML = "x:" + xCoord;
    document.getElementById('ycoord3').innerHTML = "y:" + yCoord;
    //document.getElementById('mouseCoord').innerHTML = mouseDown;
    touchesBegan(event);
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
    
    
}

function handleMouseMoveonCanvas(event) {
    
    //document.getElementById('mouseCoord').innerHTML = "Yes";
    if (!mouseDown) {
        return;
    }
    
    var browserWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var xCoord = event.clientX - (browserWidth - 640)/2;
    var yCoord = event.clientY - 96;
    xCoord = parseFloat(Math.round(xCoord * 100) / 100).toFixed(0);
    yCoord = parseFloat(Math.round(yCoord * 100) / 100).toFixed(0);
    
    document.getElementById('menuAlign').innerHTML = "x:" + xCoord;
    document.getElementById('ycoord3').innerHTML = "y:" + yCoord;
    document.getElementById('mouseCoord').innerHTML = mouseDown;
    //document.getElementById('vMoveEvent').innerHTML = "Yes";

    
    
    touchesMoved(event);
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
    
}

function handleMouseUponCanvas(event) {
    
    mouseDown = false;
    document.getElementById('mouseCoord').innerHTML = mouseDown;
    //document.getElementById('vMoveEvent').innerHTML = "No";
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
    document.getElementById('mouseCoord').innerHTML = mouseDown;
    
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue= false;
    return false;
}