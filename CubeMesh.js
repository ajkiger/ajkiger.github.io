/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var indexBuffer;
var tempBuffer = new Array();
var tempBufferIndex = 0;
//var cubeVertexIndices = new Array();

var vertex1;
var vertex2;
var vertex3;
var vertex4;


function cubeMeshRender(){
   
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tileTexture);
    // Squares
    for (var i = 0; i < tileTextureObjects.length; i++) {
        var temp = tileTextureObjects[i];
        if (visibleSides[0])
        {
            if (temp >= 0 && temp < sceneController.cubeSize*1/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[1])
        {
            if (temp >= sceneController.cubeSize*1/6 && temp < sceneController.cubeSize*2/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[2])
        {
            if (temp >= sceneController.cubeSize*2/6 && temp < sceneController.cubeSize*3/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[3])
        {
            if (temp >= sceneController.cubeSize*3/6 && temp < sceneController.cubeSize*4/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[4])
        {
            if (temp >= sceneController.cubeSize*4/6 && temp < sceneController.cubeSize*5/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[5])
        {
            if (temp >= sceneController.cubeSize*5/6 && temp < sceneController.cubeSize) {
                setUpSquares(temp);
            }
        }
    } // End for 
    
    drawSquares(0);
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    
    gl.bindTexture(gl.TEXTURE_2D, reverseTileGrid);
    // Squares Reverse
    for (var i = 0; i < reverseTileGridObjects.length; i++) {
        var temp = reverseTileGridObjects[i];
        if (visibleSides[0])
        {
            if (temp >= 0 && temp < sceneController.cubeSize*1/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[1])
        {
            if (temp >= sceneController.cubeSize*1/6 && temp < sceneController.cubeSize*2/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[2])
        {
            if (temp >= sceneController.cubeSize*2/6 && temp < sceneController.cubeSize*3/6) {
                setUpSquares(temp);

            }
        }
        if (visibleSides[3])
        {
            if (temp >= sceneController.cubeSize*3/6 && temp < sceneController.cubeSize*4/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[4])
        {
            if (temp >= sceneController.cubeSize*4/6 && temp < sceneController.cubeSize*5/6) {
                setUpSquares(temp);
            }
        }
        if (visibleSides[5])
        {
            if (temp >= sceneController.cubeSize*5/6 && temp < sceneController.cubeSize) {
                setUpSquares(temp);
            }
        }
    } // End for
    drawSquares(0);
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    
    
    
    
    //Letters
    gl.bindTexture(gl.TEXTURE_2D, textureAtlasLetters);
    // Rotate Letters
    gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    
    if (visibleSides[0])
    {
        for (var i = 0; i < sceneController.cubeSize*1/6; i++) {
            if (textureFlipped0 === false)
            {
                setUpLetters(i);
            }
            else
            {
                setUpLettersFlipped(i);
            }
        }
    }
    if (visibleSides[1])
    {
        for (var i = sceneController.cubeSize*1/6; i < sceneController.cubeSize*2/6; i++) {
            if (textureFlipped0 === false)
            {
                setUpLetters(i);
            }
            else
            {
                setUpLettersFlipped(i);
            }
        }
    }
    if (visibleSides[2])
    {
        for (var i = sceneController.cubeSize*2/6; i < sceneController.cubeSize*3/6; i++) {
            if (textureFlipped0 === false)
            {
                setUpLetters(i);
            }
            else
            {
                setUpLettersFlipped(i);
            }
        }
    }
    if (visibleSides[3])
    {
        for (var i = sceneController.cubeSize*3/6; i < sceneController.cubeSize*4/6; i++) {
            if (textureFlipped0 === false)
            {
                setUpLetters(i);
            }
            else
            {
                setUpLettersFlipped(i);
            }
        }
    }
    
    drawLetters(0);
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    // Rotate Letters
    gl.uniform1f(shaderProgram.rAngleUniform, letterAngleY);
    
    if (visibleSides[4])
    {
        for (var i = sceneController.cubeSize*4/6; i < sceneController.cubeSize*5/6; i++) {
            if (textureFlipped1 === false)
            {
                setUpLetters(i);
            }
            else
            {
                setUpLettersFlipped(i);
            }
        }
    }
    if (visibleSides[5])
    {
        for (var i = sceneController.cubeSize*5/6; i < sceneController.cubeSize; i++) {
            if (textureFlipped1 === false)
            {
                setUpLetters(i);
            }
            else
            {
                setUpLettersFlipped(i);
            }
        }
    }
    
    drawLetters(0);
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    
    
    
    //gl.bindTexture(gl.TEXTURE_2D, vertexBufferTextures[sceneController.cubeSize]); // Blue Markers
    // Blue Markers
    for (var i = 0; i < sceneController.cubeSize; i++) {
        if (visibleSides[0])
        {
            if(i >= 0 && i < sceneController.cubeSize*1/6){
                if (wordSelectMarkers[i] === 1 || wordSelectMarkers[i] === 2)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[1])
        {
            if(i >= sceneController.cubeSize*1/6 && i < sceneController.cubeSize*2/6){
                if (wordSelectMarkers[i] === 1 || wordSelectMarkers[i] === 2)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[2])
        {
            if(i >= sceneController.cubeSize*2/6 && i < sceneController.cubeSize*3/6){
                if (wordSelectMarkers[i] === 1 || wordSelectMarkers[i] === 2)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[3])
        {
            if(i >= sceneController.cubeSize*3/6 && i < sceneController.cubeSize*4/6){
                if (wordSelectMarkers[i] === 1 || wordSelectMarkers[i] === 2)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[4])
        {
            if(i >= sceneController.cubeSize*4/6 && i < sceneController.cubeSize*5/6){
                if (wordSelectMarkers[i] === 1 || wordSelectMarkers[i] === 2)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[5])
        {
            if(i >= sceneController.cubeSize*5/6 && i < sceneController.cubeSize){
                if (wordSelectMarkers[i] === 1 || wordSelectMarkers[i] === 2)
                {
                    setUpWordSelect(i);
                }
            }
        }
    } // End for 

    //gl.bindTexture(gl.TEXTURE_2D, vertexBufferTextures[sceneController.cubeSize + 1]); // Red Markers
    // Red Markers
    for (var i = 0; i < sceneController.cubeSize; i++) {
        if (visibleSides[0])
        {
            if(i >= 0 && i < sceneController.cubeSize*1/6){
                if (wordSelectMarkers[i] === 3)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[1])
        {
            if(i >= sceneController.cubeSize*1/6 && i < sceneController.cubeSize*2/6){
                if (wordSelectMarkers[i] === 3)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[2])
        {
            if(i >= sceneController.cubeSize*2/6 && i < sceneController.cubeSize*3/6){
                if (wordSelectMarkers[i] === 3)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[3])
        {
            if(i >= sceneController.cubeSize*3/6 && i < sceneController.cubeSize*4/6){
                if (wordSelectMarkers[i] === 3)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[4])
        {
            if(i >= sceneController.cubeSize*4/6 && i < sceneController.cubeSize*5/6){
                if (wordSelectMarkers[i] === 3)
                {
                    setUpWordSelect(i);
                }
            }
        }
        if (visibleSides[5])
        {
            if(i >= sceneController.cubeSize*5/6 && i < sceneController.cubeSize){
                if (wordSelectMarkers[i] === 3)
                {
                    setUpWordSelect(i);
                }
            }
        }
    } // End for 
    drawMarkers(0);
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    
   
}



function setUpSquares(index){
    
    // Squares on Cube
    var test0; // = get4x4Vertex(j);
        
    if (sceneController.cubeSize === 96) // 4x4
    {
        test0 = get4x4Vertex(index);
    }
    else if (sceneController.cubeSize === 150) // 5x5
    {
        test0 = get5x5Vertex(index);
    }
    else if (sceneController.cubeSize === 216) // 6x6
    {
        test0 = get6x6Vertex(index);
    }


    if (index >= 0 && index < sceneController.cubeSize*1/6) // front
    {
        for (var k = 0; k < 4; k++) // Pink
        {
            test0[3 + k*12] = 1.0;
            test0[4 + k*12] = 0.7529;
            test0[5 + k*12] = 0.7961;
            test0[6 + k*12] = 1.0;
        }
    }
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
    {
        for (var k = 0; k < 4; k++) // Purple
        {
            test0[3 + k*12] = 0.9333;
            test0[4 + k*12] = 0.5098;
            test0[5 + k*12] = 0.9333;
            test0[6 + k*12] = 1.0;
        }
    }
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
    {
        for (var k = 0; k < 4; k++) // Blue
        {
            test0[3 + k*12] = 0.3922;
            test0[4 + k*12] = 0.5843;
            test0[5 + k*12] = 0.9294;
            test0[6 + k*12] = 1.0;
        }
    }
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
    {
        for (var k = 0; k < 4; k++) // Green
        {
            test0[3 + k*12] = 0.5608;
            test0[4 + k*12] = 0.7373;
            test0[5 + k*12] = 0.5608;
            test0[6 + k*12] = 1.0;
        }
    }
    else if (index >= sceneController.cubeSize*4/6 && index < sceneController.cubeSize*5/6) // top
    {
        for (var k = 0; k < 4; k++) // Yellow
        {
            test0[3 + k*12] = 0.9412;
            test0[4 + k*12] = 0.9020;
            test0[5 + k*12] = 0.5490;
            test0[6 + k*12] = 1.0;
        }
    }
    else if (index >= sceneController.cubeSize*5/6 && index < sceneController.cubeSize) // bottom
    {
        for (var k = 0; k < 4; k++) // Peach
        {
            test0[3 + k*12] = 1.0;
            test0[4 + k*12] = 0.8549;
            test0[5 + k*12] = 0.7255;
            test0[6 + k*12] = 1.0;
        }
    }
   
    //tempBuffer.length = 0;
    //tempBufferIndex = 0;
    /*
    for(var i = 0; i < 48; i++){
        
        tempBuffer.push(test0[i]);
    }
    
    tempBufferIndex = tempBufferIndex + 4;
    */
   
   vertex1 = test0.splice(0,12);
   vertex2 = test0.splice(0,12);
   vertex3 = test0.splice(0,12);
   vertex4 = test0;
   
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex3[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    tempBufferIndex = tempBufferIndex + 6;
    
    
    //document.getElementById('ycoord').innerHTML = "Made it here: " + tempBuffer;
    /*
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex3[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    
    tempBufferIndex = tempBufferIndex + 6;
    */ 
}
    
    
    
 function setUpLetters(index){
    
     // Letters
    var test;

    if (sceneController.cubeSize === 96) // 4x4
    {
        test = get4x4Vertex(index);
    }
    else if (sceneController.cubeSize === 150) // 5x5
    {
        test = get5x5Vertex(index);
    }
    else if (sceneController.cubeSize === 216) // 6x6
    {
        test = get6x6Vertex(index);
    }

    if (index >= 0 && index < sceneController.cubeSize*1/6) // front
    {
        test[2] = test[2] + 0.01;
        test[2 + 12] = test[2 + 12] + 0.01;
        test[2 + 2*12] = test[2 + 2*12] + 0.01;
        test[2 + 3*12] = test[2 + 3*12] + 0.01;
        
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        
        
    }
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
    {
        test[2] = test[2] - 0.01;
        test[2 + 12] = test[2 + 12] - 0.01;
        test[2 + 2*12] = test[2 + 2*12] - 0.01;
        test[2 + 3*12] = test[2 + 3*12] - 0.01;
        
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        
        
    }
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
    {
        test[0] = test[0] - 0.01;
        test[0 + 12] = test[0 + 12] - 0.01;
        test[0 + 2*12] = test[0 + 2*12] - 0.01;
        test[0 + 3*12] = test[0 + 3*12] - 0.01;
        
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        
        
    }
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
    {
        test[0] = test[0] + 0.01;
        test[0 + 12] = test[0 + 12] + 0.01;
        test[0 + 2*12] = test[0 + 2*12] + 0.01;
        test[0 + 3*12] = test[0 + 3*12] + 0.01;
        
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        
        
    }
    else if (index >= sceneController.cubeSize*4/6 && index < sceneController.cubeSize*5/6) // top
    {
        test[1] = test[1] + 0.01;
        test[1 + 12] = test[1 + 12] + 0.01;
        test[1 + 2*12] = test[1 + 2*12] + 0.01;
        test[1 + 3*12] = test[1 + 3*12] + 0.01;

        // Adjust Text
        
        test[7] = 0;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 1;
        test[7 + 2*12] = 1;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 0;
        
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        
        
        
    }
    else if (index >= sceneController.cubeSize*5/6 && index < sceneController.cubeSize) // bottom
    {
        test[1] = test[1] - 0.01;
        test[1 + 12] = test[1 + 12] - 0.01;
        test[1 + 2*12] = test[1 + 2*12] - 0.01;
        test[1 + 3*12] = test[1 + 3*12] - 0.01;

        // Adjust Text
        
        test[7] = 0;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 1;
        test[7 + 2*12] = 1;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 0;
        
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        
        
    }

    //gl.uniform1f(shaderProgram.xUminUniform, vertexBufferTextures[index].minU);
    //gl.uniform1f(shaderProgram.xVminUniform, vertexBufferTextures[index].minV);

    //tempBuffer.length = 0;
    //tempBufferIndex = 0;
    /*
    for(var i = 0; i < 48; i++){
        
        tempBuffer.push(test[i]);
    }
    
    tempBufferIndex = tempBufferIndex + 4;
    */
   
    vertex1 = test.splice(0,12);
    vertex2 = test.splice(0,12);
    vertex3 = test.splice(0,12);
    vertex4 = test;

    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex3[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    tempBufferIndex = tempBufferIndex + 6;
    
    /*
    // Rotate Letters
    if (index >= 0 && index < sceneController.cubeSize*1/6) // front
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*4/6 && index < sceneController.cubeSize*5/6) // top
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleY);
    else if (index >= sceneController.cubeSize*5/6 && index < sceneController.cubeSize) // bottom
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleY);
    */
    
    /*
    vertexBufferLetters[index] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferLetters[index]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(test), gl.STATIC_DRAW);
    
    
    vertexBufferLetters[index].stride = 12*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].positionElementCount = 3;
    vertexBufferLetters[index].positionOffset = 0;
    vertexBufferLetters[index].colorElementCount = 4;
    vertexBufferLetters[index].colorOffset = 3*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].uvElementCount = 2;
    vertexBufferLetters[index].uvOffset = 7*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].normalElementCount = 3;
    vertexBufferLetters[index].normalOffset = 9*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].numItems = 4;
    */
 }
 
 
 function setUpLettersFlipped(index){
    
     // Letters Flipped
    var test;

    if (sceneController.cubeSize === 96) // 4x4
    {
        test = get4x4Vertex(index);
    }
    else if (sceneController.cubeSize === 150) // 5x5
    {
        test = get5x5Vertex(index);
    }
    else if (sceneController.cubeSize === 216) // 6x6
    {
        test = get6x6Vertex(index);
    }

    if (index >= 0 && index < sceneController.cubeSize*1/6) // front
    {
        test[2] = test[2] + 0.01;
        test[2 + 12] = test[2 + 12] + 0.01;
        test[2 + 2*12] = test[2 + 2*12] + 0.01;
        test[2 + 3*12] = test[2 + 3*12] + 0.01;
    }
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
    {
        test[2] = test[2] - 0.01;
        test[2 + 12] = test[2 + 12] - 0.01;
        test[2 + 2*12] = test[2 + 2*12] - 0.01;
        test[2 + 3*12] = test[2 + 3*12] - 0.01;
    }
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
    {
        test[0] = test[0] - 0.01;
        test[0 + 12] = test[0 + 12] - 0.01;
        test[0 + 2*12] = test[0 + 2*12] - 0.01;
        test[0 + 3*12] = test[0 + 3*12] - 0.01;
    }
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
    {
        test[0] = test[0] + 0.01;
        test[0 + 12] = test[0 + 12] + 0.01;
        test[0 + 2*12] = test[0 + 2*12] + 0.01;
        test[0 + 3*12] = test[0 + 3*12] + 0.01;
    }
    else if (index >= sceneController.cubeSize*4/6 && index < sceneController.cubeSize*5/6) // top
    {
        test[1] = test[1] + 0.01;
        test[1 + 12] = test[1 + 12] + 0.01;
        test[1 + 2*12] = test[1 + 2*12] + 0.01;
        test[1 + 3*12] = test[1 + 3*12] + 0.01;

        // Adjust Text
        
        test[7] = 0;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 1;
        test[7 + 2*12] = 1;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 0;
        
        
    }
    else if (index >= sceneController.cubeSize*5/6 && index < sceneController.cubeSize) // bottom
    {
        test[1] = test[1] - 0.01;
        test[1 + 12] = test[1 + 12] - 0.01;
        test[1 + 2*12] = test[1 + 2*12] - 0.01;
        test[1 + 3*12] = test[1 + 3*12] - 0.01;

        // Adjust Text
        
        test[7] = 0;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 1;
        test[7 + 2*12] = 1;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 0;
        
        
    }


    



    // Flipped Letters
    if (index >= 0 && index < sceneController.cubeSize*1/6) // front
    {
        
        test[7] = 1;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 0;
        test[7 + 2*12] = 0;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 1;
        
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        
    }
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
    {
        
        test[7] = 1;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 0;
        test[7 + 2*12] = 0;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 1;
        
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        
    }
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
    {
        
        test[7] = 1;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 0;
        test[7 + 2*12] = 0;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 1;
        
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        
    }
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
    {
        
        test[7] = 1;
        test[8] = 1;
        test[7 + 12] = 1;
        test[8 + 12] = 0;
        test[7 + 2*12] = 0;
        test[8 + 2*12] = 0;
        test[7 + 3*12] = 0;
        test[8 + 3*12] = 1;
        
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        
    }

    else if (index >= sceneController.cubeSize*4/6 && index < sceneController.cubeSize*5/6) // top
    {
        // Adjust Text
        
        test[7] = 1;
        test[8] = 0;
        test[7 + 12] = 0;
        test[8 + 12] = 0;
        test[7 + 2*12] = 0;
        test[8 + 2*12] = 1;
        test[7 + 3*12] = 1;
        test[8 + 3*12] = 1;
        
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        
    }
    else if (index >= sceneController.cubeSize*5/6 && index < sceneController.cubeSize) // bottom
    {
        // Adjust Text
        
        test[7] = 1;
        test[8] = 0;
        test[7 + 12] = 0;
        test[8 + 12] = 0;
        test[7 + 2*12] = 0;
        test[8 + 2*12] = 1;
        test[7 + 3*12] = 1;
        test[8 + 3*12] = 1;
        
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        
    }
    
    
    //gl.uniform1f(shaderProgram.xUminUniform, vertexBufferTextures[index].minU);
    //gl.uniform1f(shaderProgram.xVminUniform, vertexBufferTextures[index].minV);
    
    //tempBuffer.length = 0;
    //tempBufferIndex = 0;
    /*
    for(var i = 0; i < 48; i++){
        
        tempBuffer.push(test[i]);
    }
    
    tempBufferIndex = tempBufferIndex + 4;
     */
    
    vertex1 = test.splice(0,12);
    vertex2 = test.splice(0,12);
    vertex3 = test.splice(0,12);
    vertex4 = test;

    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex3[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    tempBufferIndex = tempBufferIndex + 6;
    
    /*
    // Rotate Letters
    if (index >= 0 && index < sceneController.cubeSize*1/6) // front
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
    else if (index >= sceneController.cubeSize*4/6 && index < sceneController.cubeSize*5/6) // top
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleY);
    else if (index >= sceneController.cubeSize*5/6 && index < sceneController.cubeSize) // bottom
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleY);
    */
    /*
    vertexBufferLettersFlipped[index] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferLettersFlipped[index]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(test), gl.STATIC_DRAW);
    */
    
    
 }
    
    
function setUpWordSelect(index){
    
    var test1;

    if (sceneController.cubeSize === 96) // 4x4
    {
        test1 = get4x4Vertex(index);
    }
    else if (sceneController.cubeSize === 150) // 5x5
    {
        test1 = get5x5Vertex(index);
    }
    else if (sceneController.cubeSize === 216) // 6x6
    {
        test1 = get6x6Vertex(index);
    }

    // set color - alpha for slection ring
    for (var k = 0; k < 4; k++)
    {
        test1[3 + k*12] = 1.0;
        test1[4 + k*12] = 0.7529;
        test1[5 + k*12] = 0.7961;
        test1[6 + k*12] = 0.75;
    }


    if (index >= 0 && index < sceneController.cubeSize*1/6) // front
    {
        test1[2] = test1[2] + 0.03;
        test1[2 + 12] = test1[2 + 12] + 0.03;
        test1[2 + 2*12] = test1[2 + 2*12] + 0.03;
        test1[2 + 3*12] = test1[2 + 3*12] + 0.03;
    }
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
    {
        test1[2] = test1[2] - 0.03;
        test1[2 + 12] = test1[2 + 12] - 0.03;
        test1[2 + 2*12] = test1[2 + 2*12] - 0.03;
        test1[2 + 3*12] = test1[2 + 3*12] - 0.03;
    }
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
    {
        test1[0] = test1[0] - 0.03;
        test1[0 + 12] = test1[0 + 12] - 0.03;
        test1[0 + 2*12] = test1[0 + 2*12] - 0.03;
        test1[0 + 3*12] = test1[0 + 3*12] - 0.03;
    }
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
    {
        test1[0] = test1[0] + 0.03;
        test1[0 + 12] = test1[0 + 12] + 0.03;
        test1[0 + 2*12] = test1[0 + 2*12] + 0.03;
        test1[0 + 3*12] = test1[0 + 3*12] + 0.03;
    }
    else if (index >= sceneController.cubeSize*4/6 && index < sceneController.cubeSize*5/6) // top
    {
        test1[1] = test1[1] + 0.03;
        test1[1 + 12] = test1[1 + 12] + 0.03;
        test1[1 + 2*12] = test1[1 + 2*12] + 0.03;
        test1[1 + 3*12] = test1[1 + 3*12] + 0.03;
    }
    else if (index >= sceneController.cubeSize*5/6 && index < sceneController.cubeSize) // bottom
    {
        test1[1] = test1[1] - 0.03;
        test1[1 + 12] = test1[1 + 12] - 0.03;
        test1[1 + 2*12] = test1[1 + 2*12] - 0.03;
        test1[1 + 3*12] = test1[1 + 3*12] - 0.03;
    }
   
    if (wordSelectMarkers[index] === 1 || wordSelectMarkers[index] === 2)
    {
        test1[7] = vertexBufferTextures[sceneController.cubeSize].minU;
        test1[8] = vertexBufferTextures[sceneController.cubeSize].minV;
        test1[7 + 12] = vertexBufferTextures[sceneController.cubeSize].minU;
        test1[8 + 12] = vertexBufferTextures[sceneController.cubeSize].maxV;
        test1[7 + 2*12] = vertexBufferTextures[sceneController.cubeSize].maxU;
        test1[8 + 2*12] = vertexBufferTextures[sceneController.cubeSize].maxV;
        test1[7 + 3*12] = vertexBufferTextures[sceneController.cubeSize].maxU;
        test1[8 + 3*12] = vertexBufferTextures[sceneController.cubeSize].minV;
    }
    else if (wordSelectMarkers[index] === 3)
    {
        test1[7] = vertexBufferTextures[sceneController.cubeSize + 1].minU;
        test1[8] = vertexBufferTextures[sceneController.cubeSize + 1].minV;
        test1[7 + 12] = vertexBufferTextures[sceneController.cubeSize + 1].minU;
        test1[8 + 12] = vertexBufferTextures[sceneController.cubeSize + 1].maxV;
        test1[7 + 2*12] = vertexBufferTextures[sceneController.cubeSize + 1].maxU;
        test1[8 + 2*12] = vertexBufferTextures[sceneController.cubeSize + 1].maxV;
        test1[7 + 3*12] = vertexBufferTextures[sceneController.cubeSize + 1].maxU;
        test1[8 + 3*12] = vertexBufferTextures[sceneController.cubeSize + 1].minV;
    }
    
   
    vertex1 = test1.splice(0,12);
    vertex2 = test1.splice(0,12);
    vertex3 = test1.splice(0,12);
    vertex4 = test1;

    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex3[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    tempBuffer.push(vertexBufferTextures[index].minU);
    tempBuffer.push(vertexBufferTextures[index].minV);
    
    tempBufferIndex = tempBufferIndex + 6;
   
   
}
    
    
    
    
function drawSquares(index){
    
    //document.getElementById('xcoord').innerHTML = "Vertexes: " + tempBuffer.length/12;
    //document.getElementById('ycoord').innerHTML = "Made it here: " + tempBufferIndex;
    //indexBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    
    squareVertexPositionBuffer[index] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer[index]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempBuffer), gl.STATIC_DRAW);

    squareVertexPositionBuffer[index].stride = 14*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].positionElementCount = 3;
    squareVertexPositionBuffer[index].positionOffset = 0;
    squareVertexPositionBuffer[index].colorElementCount = 4;
    squareVertexPositionBuffer[index].colorOffset = 3*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].uvElementCount = 2;
    squareVertexPositionBuffer[index].uvOffset = 7*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].normalElementCount = 3;
    squareVertexPositionBuffer[index].normalOffset = 9*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].uvElementCountuv = 2;
    squareVertexPositionBuffer[index].uvOffsetuv = 12*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].numItems = 4;
    

    //gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer[index]);

    gl.vertexAttribPointer(
                         shaderProgram.vertexPositionAttribute,
                         squareVertexPositionBuffer[index].positionElementCount, 
                         gl.FLOAT, 
                         false, 
                         squareVertexPositionBuffer[index].stride, 
                         squareVertexPositionBuffer[index].positionOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.vertexColorAttribute, 
                         squareVertexPositionBuffer[index].colorElementCount, 
                         gl.FLOAT, 
                         false, 
                         squareVertexPositionBuffer[index].stride, 
                         squareVertexPositionBuffer[index].colorOffset 
                         );

    gl.vertexAttribPointer(
                         shaderProgram.textureCoordAttribute,
                         squareVertexPositionBuffer[index].uvElementCount,
                         gl.FLOAT,
                         false,
                         squareVertexPositionBuffer[index].stride,
                         squareVertexPositionBuffer[index].uvOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.vertexNormalAttribute,
                         squareVertexPositionBuffer[index].normalElementCount,
                         gl.FLOAT,
                         false,
                         squareVertexPositionBuffer[index].stride,
                         squareVertexPositionBuffer[index].normalOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.textureCoordAttributeuv,
                         squareVertexPositionBuffer[index].uvElementCountuv,
                         gl.FLOAT,
                         false,
                         squareVertexPositionBuffer[index].stride,
                         squareVertexPositionBuffer[index].uvOffsetuv
                         );


    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.uniform1f(shaderProgram.rAngleUniform, 0);  // Do not rotate squares



    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    setMatrixUniforms();
    //gl.drawElements(gl.TRIANGLE_STRIP, tempBufferIndex, gl.UNSIGNED_SHORT, 0);
    //gl.drawElements(gl.TRIANGLES, tempBufferIndex, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, tempBufferIndex);

}


function drawLetters(index){
    
    vertexBufferLetters[index] = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferLetters[index]);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempBuffer), gl.STATIC_DRAW);
    
    
    vertexBufferLetters[index].stride = 14*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].positionElementCount = 3;
    vertexBufferLetters[index].positionOffset = 0;
    vertexBufferLetters[index].colorElementCount = 4;
    vertexBufferLetters[index].colorOffset = 3*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].uvElementCount = 2;
    vertexBufferLetters[index].uvOffset = 7*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].normalElementCount = 3;
    vertexBufferLetters[index].normalOffset = 9*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].uvElementCountuv = 2;
    vertexBufferLetters[index].uvOffsetuv = 12*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferLetters[index].numItems = 4;
    
    
    gl.uniform1i(shaderProgram.samplerUniform, 0);


    gl.vertexAttribPointer(
                         shaderProgram.vertexPositionAttribute,
                         vertexBufferLetters[index].positionElementCount, 
                         gl.FLOAT, 
                         false, 
                         vertexBufferLetters[index].stride, 
                         vertexBufferLetters[index].positionOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.vertexColorAttribute, 
                         vertexBufferLetters[index].colorElementCount, 
                         gl.FLOAT, 
                         false, 
                         vertexBufferLetters[index].stride, 
                         vertexBufferLetters[index].colorOffset 
                         );

    gl.vertexAttribPointer(
                         shaderProgram.textureCoordAttribute,
                         vertexBufferLetters[index].uvElementCount,
                         gl.FLOAT,
                         false,
                         vertexBufferLetters[index].stride,
                         vertexBufferLetters[index].uvOffset
                         );

    gl.vertexAttribPointer(
                        shaderProgram.vertexNormalAttribute,
                        vertexBufferLetters[index].normalElementCount,
                        gl.FLOAT,
                        false,
                        vertexBufferLetters[index].stride,
                        vertexBufferLetters[index].normalOffset
                        );
                
    gl.vertexAttribPointer(
                         shaderProgram.textureCoordAttributeuv,
                         vertexBufferLetters[index].uvElementCountuv,
                         gl.FLOAT,
                         false,
                         vertexBufferLetters[index].stride,
                         vertexBufferLetters[index].uvOffsetuv
                         );

    
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    //render
    setMatrixUniforms();
    //gl.drawElements(gl.TRIANGLE_STRIP, tempBufferIndex, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, tempBufferIndex);
    
}




function drawMarkers(index){
    
    
    
    vertexBufferWordSelect[index] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferWordSelect[index]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempBuffer), gl.STATIC_DRAW);
    
    vertexBufferWordSelect[index].stride = 14*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].positionElementCount = 3;
    vertexBufferWordSelect[index].positionOffset = 0;
    vertexBufferWordSelect[index].colorElementCount = 4;
    vertexBufferWordSelect[index].colorOffset = 3*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].uvElementCount = 2;
    vertexBufferWordSelect[index].uvOffset = 7*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].normalElementCount = 3;
    vertexBufferWordSelect[index].normalOffset = 9*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].uvElementCountuv = 2;
    vertexBufferWordSelect[index].uvOffsetuv = 12*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].numItems = 4;
    

    gl.vertexAttribPointer(
                         shaderProgram.vertexPositionAttribute,
                         vertexBufferWordSelect[index].positionElementCount, 
                         gl.FLOAT, 
                         false, 
                         vertexBufferWordSelect[index].stride, 
                         vertexBufferWordSelect[index].positionOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.vertexColorAttribute, 
                         vertexBufferWordSelect[index].colorElementCount, 
                         gl.FLOAT, 
                         false, 
                         vertexBufferWordSelect[index].stride, 
                         vertexBufferWordSelect[index].colorOffset 
                         );

    gl.vertexAttribPointer(
                         shaderProgram.textureCoordAttribute,
                         vertexBufferWordSelect[index].uvElementCount,
                         gl.FLOAT,
                         false,
                         vertexBufferWordSelect[index].stride,
                         vertexBufferWordSelect[index].uvOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.vertexNormalAttribute,
                         vertexBufferWordSelect[index].normalElementCount,
                         gl.FLOAT,
                         false,
                         vertexBufferWordSelect[index].stride,
                         vertexBufferWordSelect[index].normalOffset
                         );
                 
    gl.vertexAttribPointer(
                         shaderProgram.textureCoordAttributeuv,
                         vertexBufferWordSelect[index].uvElementCountuv,
                         gl.FLOAT,
                         false,
                         vertexBufferWordSelect[index].stride,
                         vertexBufferWordSelect[index].uvOffsetuv
                         );

    
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.uniform1f(shaderProgram.rAngleUniform, 0);  // Do not rotate squares
    gl.uniform1f(shaderProgram.alphaUniform, 0.85);

    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    setMatrixUniforms();
    //gl.drawElements(gl.TRIANGLE_STRIP, tempBufferIndex, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, tempBufferIndex);
    
}