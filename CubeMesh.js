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
    /*
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    //var cubeVertexIndices = [1, 0, 2, 3];
    cubeVertexIndices = [3, 4, 2, 2, 4, 1];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    indexBuffer.itemSize = 1;
    //indexBuffer.numItems = 4;
    */
   
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    //cubeVertexIndices.length = 0;
    
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
    //document.getElementById('xcoord').innerHTML = "Vertexes: " + tempBuffer.length/12;
    //document.getElementById('ycoord').innerHTML = "Made it here: " + tempBufferIndex;
    drawSquares(0);
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    //cubeVertexIndices.length = 0;
    
    
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
    
    
    if (letter_A_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[0]); // A
        preSetLetters(letter_A_Objects);
    }
    if (letter_B_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[1]); // B
        preSetLetters(letter_B_Objects);
    }
    if (letter_C_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[2]); // C
        preSetLetters(letter_C_Objects);
    }
    if (letter_D_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[3]); // D
        preSetLetters(letter_D_Objects);
    }
    if (letter_E_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[4]); // E
        preSetLetters(letter_E_Objects);
    }
    if (letter_F_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[5]); // F
        preSetLetters(letter_F_Objects);
    }
    if (letter_G_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[6]); // G
        preSetLetters(letter_G_Objects);
    }
    if (letter_H_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[7]); // H
        preSetLetters(letter_H_Objects);
    }
    if (letter_I_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[8]); // I
        preSetLetters(letter_I_Objects);
    }
    if (letter_J_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[9]); // J
        preSetLetters(letter_J_Objects);
    }
    if (letter_K_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[10]); // K
        preSetLetters(letter_K_Objects);
    }
    if (letter_L_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[11]); // L
        preSetLetters(letter_L_Objects);
    }
    if (letter_M_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[12]); // M
        preSetLetters(letter_M_Objects);
    }
    if (letter_N_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[13]); // N
        preSetLetters(letter_N_Objects);
    }
    if (letter_O_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[14]); // O
        preSetLetters(letter_O_Objects);
    }
    if (letter_P_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[15]); // P
        preSetLetters(letter_P_Objects);
    }
    if (letter_Q_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[16]); // Q
        preSetLetters(letter_Q_Objects);
    }
    if (letter_R_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[17]); // R
        preSetLetters(letter_R_Objects);
    }
    if (letter_S_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[18]); // S
        preSetLetters(letter_S_Objects);
    }
    if (letter_T_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[19]); // T
        preSetLetters(letter_T_Objects);
    }
    if (letter_U_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[20]); // U
        preSetLetters(letter_U_Objects);
    }
    if (letter_V_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[21]); // V
        preSetLetters(letter_V_Objects);
    }
    if (letter_W_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[22]); // W
        preSetLetters(letter_W_Objects);
    }
    if (letter_X_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[23]); // X
        preSetLetters(letter_X_Objects);
    }
    if (letter_Y_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[24]); // Y
        preSetLetters(letter_Y_Objects);
    }
    if (letter_Z_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLetters[25]); // Z
        preSetLetters(letter_Z_Objects);
    }
    
    
    if (flippedLetter_A_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[0]); // A
        preSetLetters(flippedLetter_A_Objects);
    }
    if (flippedLetter_B_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[1]); // B
        preSetLetters(flippedLetter_B_Objects);
    }
    if (flippedLetter_C_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[2]); // C
        preSetLetters(flippedLetter_C_Objects);
    }
    if (flippedLetter_D_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[3]); // D
        preSetLetters(flippedLetter_D_Objects);
    }
    if (flippedLetter_E_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[4]); // E
        preSetLetters(flippedLetter_E_Objects);
    }
    if (flippedLetter_F_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[5]); // F
        preSetLetters(flippedLetter_F_Objects);
    }
    if (flippedLetter_G_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[6]); // G
        preSetLetters(flippedLetter_G_Objects);
    }
    if (flippedLetter_H_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[7]); // H
        preSetLetters(flippedLetter_H_Objects);
    }
    if (flippedLetter_I_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[8]); // I
        preSetLetters(flippedLetter_I_Objects);
    }
    if (flippedLetter_J_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[9]); // J
        preSetLetters(flippedLetter_J_Objects);
    }
    if (flippedLetter_K_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[10]); // K
        preSetLetters(flippedLetter_K_Objects);
    }
    if (flippedLetter_L_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[11]); // L
        preSetLetters(flippedLetter_L_Objects);
    }
    if (flippedLetter_M_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[12]); // M
        preSetLetters(flippedLetter_M_Objects);
    }
    if (flippedLetter_N_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[13]); // N
        preSetLetters(flippedLetter_N_Objects);
    }
    if (flippedLetter_O_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[14]); // O
        preSetLetters(flippedLetter_O_Objects);
    }
    if (flippedLetter_P_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[15]); // P
        preSetLetters(flippedLetter_P_Objects);
    }
    if (flippedLetter_Q_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[16]); // Q
        preSetLetters(flippedLetter_Q_Objects);
    }
    if (flippedLetter_R_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[17]); // R
        preSetLetters(flippedLetter_R_Objects);
    }
    if (flippedLetter_S_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[18]); // S
        preSetLetters(flippedLetter_S_Objects);
    }
    if (flippedLetter_T_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[19]); // T
        preSetLetters(flippedLetter_T_Objects);
    }
    if (flippedLetter_U_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[20]); // U
        preSetLetters(flippedLetter_U_Objects);
    }
    if (flippedLetter_V_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[21]); // V
        preSetLetters(flippedLetter_V_Objects);
    }
    if (flippedLetter_W_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[22]); // W
        preSetLetters(flippedLetter_W_Objects);
    }
    if (flippedLetter_X_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[23]); // X
        preSetLetters(flippedLetter_X_Objects);
    }
    if (flippedLetter_Y_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[24]); // Y
        preSetLetters(flippedLetter_Y_Objects);
    }
    if (flippedLetter_Z_Objects.length > 0){
        gl.bindTexture(gl.TEXTURE_2D, alphabetLettersWhite[25]); // Z
        preSetLetters(flippedLetter_Z_Objects);
    }
    
    tempBuffer.length = 0;
    tempBufferIndex = 0;
    
    gl.bindTexture(gl.TEXTURE_2D, vertexBufferTextures[sceneController.cubeSize]); // Blue Markers
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
    drawMarkers(0);
    tempBuffer.length = 0;
    tempBufferIndex = 0;


    gl.bindTexture(gl.TEXTURE_2D, vertexBufferTextures[sceneController.cubeSize + 1]); // Red Markers
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
        /*
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        */
        
    }
    else if (index >= sceneController.cubeSize*1/6 && index < sceneController.cubeSize*2/6) // back
    {
        test[2] = test[2] - 0.01;
        test[2 + 12] = test[2 + 12] - 0.01;
        test[2 + 2*12] = test[2 + 2*12] - 0.01;
        test[2 + 3*12] = test[2 + 3*12] - 0.01;
        /*
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        */
        
    }
    else if (index >= sceneController.cubeSize*2/6 && index < sceneController.cubeSize*3/6) // left
    {
        test[0] = test[0] - 0.01;
        test[0 + 12] = test[0 + 12] - 0.01;
        test[0 + 2*12] = test[0 + 2*12] - 0.01;
        test[0 + 3*12] = test[0 + 3*12] - 0.01;
        /*
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        */
        
    }
    else if (index >= sceneController.cubeSize*3/6 && index < sceneController.cubeSize*4/6) // right
    {
        test[0] = test[0] + 0.01;
        test[0 + 12] = test[0 + 12] + 0.01;
        test[0 + 2*12] = test[0 + 2*12] + 0.01;
        test[0 + 3*12] = test[0 + 3*12] + 0.01;
        /*
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        */
        
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
        /*
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        */
        
        
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
        /*
        test[7] = vertexBufferTextures[index].minU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].maxV;
        test[7 + 2*12] = vertexBufferTextures[index].maxU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].minV;
        */
        
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
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    
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
        /*
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        */
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
        /*
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        */
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
        /*
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        */
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
        /*
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].maxV;
        test[7 + 12] = vertexBufferTextures[index].maxU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].minV;
        test[7 + 3*12] = vertexBufferTextures[index].minU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        */
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
        /*
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        */
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
        /*
        test[7] = vertexBufferTextures[index].maxU;
        test[8] = vertexBufferTextures[index].minV;
        test[7 + 12] = vertexBufferTextures[index].minU;
        test[8 + 12] = vertexBufferTextures[index].minV;
        test[7 + 2*12] = vertexBufferTextures[index].minU;
        test[8 + 2*12] = vertexBufferTextures[index].maxV;
        test[7 + 3*12] = vertexBufferTextures[index].maxU;
        test[8 + 3*12] = vertexBufferTextures[index].maxV;
        */
    }


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
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    
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
   
    vertex1 = test1.splice(0,12);
    vertex2 = test1.splice(0,12);
    vertex3 = test1.splice(0,12);
    vertex4 = test1;

    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex3[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex2[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex4[i]);
    }
    for(var i = 0; i < 12; i++){
        tempBuffer.push(vertex1[i]);
    }
    
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

    squareVertexPositionBuffer[index].stride = 12*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].positionElementCount = 3;
    squareVertexPositionBuffer[index].positionOffset = 0;
    squareVertexPositionBuffer[index].colorElementCount = 4;
    squareVertexPositionBuffer[index].colorOffset = 3*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].uvElementCount = 2;
    squareVertexPositionBuffer[index].uvOffset = 7*Float32Array.BYTES_PER_ELEMENT;
    squareVertexPositionBuffer[index].normalElementCount = 3;
    squareVertexPositionBuffer[index].normalOffset = 9*Float32Array.BYTES_PER_ELEMENT;
    //squareVertexPositionBuffer[index].numItems = 4;
    

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

    
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    //render
    setMatrixUniforms();
    //gl.drawElements(gl.TRIANGLE_STRIP, tempBufferIndex, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, tempBufferIndex);
    
}

function preSetLetters(letter_Objects){
    
    if (visibleSides[0])
    {
        for (var i = 0; i < letter_Objects.length; i++) {
            var temp = letter_Objects[i];
            if (temp >= 0 && temp < sceneController.cubeSize*1/6) {
                if (textureFlipped0 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                
            }
        }
        // Rotate Letters
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
        drawLetters(0);
        tempBuffer.length = 0;
        tempBufferIndex = 0;
    }
    if (visibleSides[1])
    {
        for (var i = 0; i < letter_Objects.length; i++) {
            var temp = letter_Objects[i];
            if (temp >= sceneController.cubeSize*1/6 && temp < sceneController.cubeSize*2/6) {
                if (textureFlipped0 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                
            }
        }
        // Rotate Letters
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
        drawLetters(0);
        tempBuffer.length = 0;
        tempBufferIndex = 0;
    }
    if (visibleSides[2])
    {
        for (var i = 0; i < letter_Objects.length; i++) {
            var temp = letter_Objects[i];
            if (temp >= sceneController.cubeSize*2/6 && temp < sceneController.cubeSize*3/6) {
                if (textureFlipped0 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                
            }
        }
        // Rotate Letters
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
        drawLetters(0);
        tempBuffer.length = 0;
        tempBufferIndex = 0;
    }
    if (visibleSides[3])
    {
        for (var i = 0; i < letter_Objects.length; i++) {
            var temp = letter_Objects[i];
            if (temp >= sceneController.cubeSize*3/6 && temp < sceneController.cubeSize*4/6) {
                if (textureFlipped0 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                
            }
        }
        // Rotate Letters
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleZ);
        drawLetters(0);
        tempBuffer.length = 0;
        tempBufferIndex = 0;
    }
    if (visibleSides[4])
    {
        for (var i = 0; i < letter_Objects.length; i++) {
            var temp = letter_Objects[i];
            if (temp >= sceneController.cubeSize*4/6 && temp < sceneController.cubeSize*5/6) {
                
                /*
                if (textureFlipped0 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                */
                if (textureFlipped1 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                
            }
        }
        // Rotate Letters
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleY);
        drawLetters(0);
        tempBuffer.length = 0;
        tempBufferIndex = 0;
    }
    if (visibleSides[5])
    {
        for (var i = 0; i < letter_Objects.length; i++) {
            var temp = letter_Objects[i];
            if (temp >= sceneController.cubeSize*5/6 && temp < sceneController.cubeSize) {
                
                /*
                if (textureFlipped0 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                */
                if (textureFlipped1 === false)
                {
                    setUpLetters(temp);
                }
                else
                {
                    setUpLettersFlipped(temp);
                }
                
            }
        }
        // Rotate Letters
        gl.uniform1f(shaderProgram.rAngleUniform, letterAngleY);
        drawLetters(0);
        tempBuffer.length = 0;
        tempBufferIndex = 0;
    }
    
}


function drawMarkers(index){
    
    
    vertexBufferWordSelect[index] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferWordSelect[index]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempBuffer), gl.STATIC_DRAW);
    
    vertexBufferWordSelect[index].stride = 12*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].positionElementCount = 3;
    vertexBufferWordSelect[index].positionOffset = 0;
    vertexBufferWordSelect[index].colorElementCount = 4;
    vertexBufferWordSelect[index].colorOffset = 3*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].uvElementCount = 2;
    vertexBufferWordSelect[index].uvOffset = 7*Float32Array.BYTES_PER_ELEMENT;
    vertexBufferWordSelect[index].normalElementCount = 3;
    vertexBufferWordSelect[index].normalOffset = 9*Float32Array.BYTES_PER_ELEMENT;
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

    
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.uniform1f(shaderProgram.rAngleUniform, 0);  // Do not rotate squares
    gl.uniform1f(shaderProgram.alphaUniform, 0.85);

    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    setMatrixUniforms();
    //gl.drawElements(gl.TRIANGLE_STRIP, tempBufferIndex, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, tempBufferIndex);
    
}