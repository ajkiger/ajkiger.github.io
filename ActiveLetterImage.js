/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function ActiveLetterImage(){
    
    this.x = null;
    this.y = null;
    this.z = null;
    this.xScale = null;
    this.yScale = null;
    this.zScale = null;
    this.alMatrix = null;
    //this.active = null;
    this.vertexBufferBS = null;
    this.indexBufferBS = null;
    //this.BSTexture = null;
    //this.BSTexture2 = null;
    this.alphabetLetters = null;
    this.selectLetter = null;
    this.makeVisible = null;
};
ActiveLetterImage.prototype.x = null;
ActiveLetterImage.prototype.y = null;
ActiveLetterImage.prototype.z = null;
ActiveLetterImage.prototype.xScale = null;
ActiveLetterImage.prototype.yScale = null;
ActiveLetterImage.prototype.zScale = null;
ActiveLetterImage.prototype.alMatrix = null;
//ActiveLetterImage.prototype.active = null;
ActiveLetterImage.prototype.vertexBufferBS = null;
ActiveLetterImage.prototype.indexBufferBS = null;
//ActiveLetterImage.prototype.BSTexture = null;
//ActiveLetterImage.prototype.BSTexture2 = null;
ActiveLetterImage.prototype.alphabetLetters = null;
ActiveLetterImage.prototype.selectLetter = null;
ActiveLetterImage.prototype.makeVisible = null;



ActiveLetterImage.prototype.awakeNow = function(){

    
    if (containerScale){
        this.x = 0.0;
        this.y = gl.viewportHeight/2 - 75;
        this.z = 499.0;
        this.xScale = 100.0;
        this.yScale = 100.0;
        this.zScale = 100.0;
    }
    else{
        this.x = 0.0;
        this.y = gl.viewportHeight/2 - 37;
        this.z = 499.0;
        this.xScale = 50.0;
        this.yScale = 50.0;
        this.zScale = 50.0;
    }
    
    this.alMatrix = mat4.create();
    //this.active = true;
    this.vertexBufferBS = null;
    this.indexBufferBS = null;
    //this.BSTexture = null;
    //this.BSTexture2 = null;
    this.alphabetLetters = new Array();
    this.selectLetter = 26;
    this.makeVisible = false;

    this.alphabetLetters[0] = alphabetLettersWhite[0];
    this.alphabetLetters[1] = alphabetLettersWhite[1];
    this.alphabetLetters[2] = alphabetLettersWhite[2];
    this.alphabetLetters[3] = alphabetLettersWhite[3];
    this.alphabetLetters[4] = alphabetLettersWhite[4];
    this.alphabetLetters[5] = alphabetLettersWhite[5];
    this.alphabetLetters[6] = alphabetLettersWhite[6];
    this.alphabetLetters[7] = alphabetLettersWhite[7];
    this.alphabetLetters[8] = alphabetLettersWhite[8];
    this.alphabetLetters[9] = alphabetLettersWhite[9];
    this.alphabetLetters[10] = alphabetLettersWhite[10];
    this.alphabetLetters[11] = alphabetLettersWhite[11];
    this.alphabetLetters[12] = alphabetLettersWhite[12];
    this.alphabetLetters[13] = alphabetLettersWhite[13];
    this.alphabetLetters[14] = alphabetLettersWhite[14];
    this.alphabetLetters[15] = alphabetLettersWhite[15];
    this.alphabetLetters[16] = alphabetLettersWhite[16];
    this.alphabetLetters[17] = alphabetLettersWhite[17];
    this.alphabetLetters[18] = alphabetLettersWhite[18];
    this.alphabetLetters[19] = alphabetLettersWhite[19];
    this.alphabetLetters[20] = alphabetLettersWhite[20];
    this.alphabetLetters[21] = alphabetLettersWhite[21];
    this.alphabetLetters[22] = alphabetLettersWhite[22];
    this.alphabetLetters[23] = alphabetLettersWhite[23];
    this.alphabetLetters[24] = alphabetLettersWhite[24];
    this.alphabetLetters[25] = alphabetLettersWhite[25];
    this.alphabetLetters[26] = loadTexture("images/Blank.png");

    
    mat4.identity(this.alMatrix);
    mat4.translate(this.alMatrix, this.alMatrix, [this.x, this.y, this.z]);
    mat4.scale(this.alMatrix, this.alMatrix, [this.xScale, this.yScale, this.zScale]);
 
};


ActiveLetterImage.prototype.setupVertex = function(){
       
        var vertex0 = [1.2, -1.2, 0.0, 0.6, 0.6, 0.6, 0.6, 0, 0, 0, 0, 1,
                          1.2, 1.2, 0.0, 0.6, 0.6, 0.6, 0.6, 0, 1, 0, 0, 1,
                          -1.2, 1.2, 0.0, 0.6, 0.6, 0.6, 0.6, 1, 1, 0, 0, 1,
                          -1.2, -1.2, 0.0, 0.6, 0.6, 0.6, 0.6, 1, 0, 0, 0, 1];
      
        
        this.vertexBufferBS = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferBS);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex0), gl.STATIC_DRAW);
        
        this.vertexBufferBS.stride = 12*Float32Array.BYTES_PER_ELEMENT;
        this.vertexBufferBS.positionElementCount = 3;
        this.vertexBufferBS.positionOffset = 0;
        this.vertexBufferBS.colorElementCount = 4;
        this.vertexBufferBS.colorOffset = 3*Float32Array.BYTES_PER_ELEMENT;
        this.vertexBufferBS.uvElementCount = 2;
        this.vertexBufferBS.uvOffset = 7*Float32Array.BYTES_PER_ELEMENT;
        this.vertexBufferBS.normalElementCount = 3;
        this.vertexBufferBS.normalOffset = 9*Float32Array.BYTES_PER_ELEMENT;
        this.vertexBufferBS.numItems = 4;


        this.indexBufferBS = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferBS);
        var cubeVertexIndices = [1, 0, 2, 3];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        this.indexBufferBS.itemSize = 1;
        this.indexBufferBS.numItems = 4;
        
   };
   
   
   ActiveLetterImage.prototype.update = function(){
       
   };
   
   
  ActiveLetterImage.prototype.render = function(){
      
    
    mvPushMatrix();
    
    mat4.identity(mvMatrix);
    mat4.multiply(mvMatrix, mvMatrix, this.alMatrix);
    
    if (this.makeVisible)
    {
        this.mesh();
    }
    
    mvPopMatrix();
        
};


ActiveLetterImage.prototype.mesh = function(){
    
    this.setupVertex();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferBS);

    gl.vertexAttribPointer(
                         shaderProgram.vertexPositionAttribute,
                         this.vertexBufferBS.positionElementCount, 
                         gl.FLOAT, 
                         false, 
                         this.vertexBufferBS.stride, 
                         this.vertexBufferBS.positionOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.vertexColorAttribute, 
                         this.vertexBufferBS.colorElementCount, 
                         gl.FLOAT, 
                         false, 
                         this.vertexBufferBS.stride, 
                         this.vertexBufferBS.colorOffset 
                         );

    gl.vertexAttribPointer(
                         shaderProgram.textureCoordAttribute,
                         this.vertexBufferBS.uvElementCount,
                         gl.FLOAT,
                         false,
                         this.vertexBufferBS.stride,
                         this.vertexBufferBS.uvOffset
                         );

    gl.vertexAttribPointer(
                         shaderProgram.vertexNormalAttribute,
                         this.vertexBufferBS.normalElementCount,
                         gl.FLOAT,
                         false,
                         this.vertexBufferBS.stride,
                         this.vertexBufferBS.normalOffset
                         );


    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.alphabetLetters[this.selectLetter]);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.uniform1f(shaderProgram.rAngleUniform, 0);  // Do not rotate letter
    gl.uniform1f(shaderProgram.alphaUniform, 0.6);


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferBS);

    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLE_STRIP, this.indexBufferBS.numItems, gl.UNSIGNED_SHORT, 0);


    gl.bindTexture(gl.TEXTURE_2D, null);
        
};



ActiveLetterImage.prototype.updateLetter = function(letter){
       
      switch (letter) {
        case "A":
            this.selectLetter = 0;
            break;
        case "B":
            this.selectLetter = 1;
            break;
        case "C":
            this.selectLetter = 2;
            break;
        case "D":
            this.selectLetter = 3;
            break;
        case "E":
            this.selectLetter = 4;
            break;
        case "F":
            this.selectLetter = 5;
            break;
        case "G":
            this.selectLetter = 6;
            break;
        case "H":
            this.selectLetter = 7;
            break;
        case "I":
            this.selectLetter = 8;
            break;
        case "J":
            this.selectLetter = 9;
            break;
        case "K":
            this.selectLetter = 10;
            break;
        case "L":
            this.selectLetter = 11;
            break;
        case "M":
            this.selectLetter = 12;
            break;
        case "N":
            this.selectLetter = 13;
            break;
        case "O":
            this.selectLetter = 14;
            break;
        case "P":
            this.selectLetter = 15;
            break;
        case "Q":
            this.selectLetter = 16;
            break;
        case "R":
            this.selectLetter = 17;
            break;
        case "S":
            this.selectLetter = 18;
            break;
        case "T":
            this.selectLetter = 19;
            break;
        case "U":
            this.selectLetter = 20;
            break;
        case "V":
            this.selectLetter = 21;
            break;
        case "W":
            this.selectLetter = 22;
            break;
        case "X":
            this.selectLetter = 23;
            break;
        case "Y":
            this.selectLetter = 24;
            break;
        case "Z":
            this.selectLetter = 25;
            break;
        case "blank":
            this.selectLetter = 26;
            break;
    } 
      
       
};
   
   
  