/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var newTexture;

var xAdjustment;
var yAdjustment;

var startTime;
var UITouchPhaseEnded = null;
var currentPosition;// = new Point();
var lastPosition;// = new Point();
var wordSelect = false;
var active = true;
var didEnterForeground = true;
var firstTouch = true;
var firstTouch2 = true;

var letterIndex = 0;
var firstTouchMarker = 216;
var currentTouchMarker = 216;
var priorTouchMarker;
var beginWord = false;

var deltaX = 0;
var deltaY = 0;

var fingerSpeed = 0;
var xVector = 0;
var yVector = 0;

var zoomSizeMax;
var zoomSizeMin;

var xScaleOld;
var yScaleOld;
var zScaleOld;

var currentTransform = mat4.create();
var rotationalTransform = mat4.create();

var xRotationWiggle = 0;
var yRotationWiggle = 0;
var zRotationWiggle = 0;

var textureFlipped0 = false;
var textureFlipped1 = false;
var letterAngleZ = 0.0;
var letterAngleY = 0.0;;

var visibleSides = new Array();
var sideActive = new Array();

var cubeLetterBounds = new Array();

var squareVertexPositionBuffer = new Array(); //vertexBufferSquares
var vertexBufferTexturesTileGrid; // = new Array();

var vertexBufferLetters = new Array();
var vertexBufferLettersFlipped = new Array();
var vertexBufferTextures = new Array(); // Black Letters
var vertexBufferTexturesRed = new Array(); // White Letters

var alphabetLetters = new Array();
var alphabetLettersWhite = new Array();

var vertexBufferWordSelect = new Array();
var wordSelectMarkers = new Array();
var wordSelectMarkers2 = new Array();

var selectedCubeSquares = new Array();
var nonSelectedCubeSquares = new Array();

//var textureAtlasLetters;


var tileTexture; // = new Object();
var tileTextureObjects = new Array();
var reverseTileGrid; // = new Object();
var reverseTileGridObjects = new Array();

var letter_A_Objects = new Array();
var letter_B_Objects = new Array();
var letter_C_Objects = new Array();
var letter_D_Objects = new Array();
var letter_E_Objects = new Array();
var letter_F_Objects = new Array();
var letter_G_Objects = new Array();
var letter_H_Objects = new Array();
var letter_I_Objects = new Array();
var letter_J_Objects = new Array();
var letter_K_Objects = new Array();
var letter_L_Objects = new Array();
var letter_M_Objects = new Array();
var letter_N_Objects = new Array();
var letter_O_Objects = new Array();
var letter_P_Objects = new Array();
var letter_Q_Objects = new Array();
var letter_R_Objects = new Array();
var letter_S_Objects = new Array();
var letter_T_Objects = new Array();
var letter_U_Objects = new Array();
var letter_V_Objects = new Array();
var letter_W_Objects = new Array();
var letter_X_Objects = new Array();
var letter_Y_Objects = new Array();
var letter_Z_Objects = new Array();

var flippedLetter_A_Objects = new Array();
var flippedLetter_B_Objects = new Array();
var flippedLetter_C_Objects = new Array();
var flippedLetter_D_Objects = new Array();
var flippedLetter_E_Objects = new Array();
var flippedLetter_F_Objects = new Array();
var flippedLetter_G_Objects = new Array();
var flippedLetter_H_Objects = new Array();
var flippedLetter_I_Objects = new Array();
var flippedLetter_J_Objects = new Array();
var flippedLetter_K_Objects = new Array();
var flippedLetter_L_Objects = new Array();
var flippedLetter_M_Objects = new Array();
var flippedLetter_N_Objects = new Array();
var flippedLetter_O_Objects = new Array();
var flippedLetter_P_Objects = new Array();
var flippedLetter_Q_Objects = new Array();
var flippedLetter_R_Objects = new Array();
var flippedLetter_S_Objects = new Array();
var flippedLetter_T_Objects = new Array();
var flippedLetter_U_Objects = new Array();
var flippedLetter_V_Objects = new Array();
var flippedLetter_W_Objects = new Array();
var flippedLetter_X_Objects = new Array();
var flippedLetter_Y_Objects = new Array();
var flippedLetter_Z_Objects = new Array();

var currentSquareT;
var startSquareT;
var tranSquareT;

var rDirection;

var starTimer1;
var starTimer2;
var starString;
var numberStars = 3;


function CubeObjectInit() {

    cObject.x = 0.0;
    cObject.y = 0.0;
    cObject.z = 0.0;

    //cObject.xScale = 50;
    //cObject.yScale = 50;
    //cObject.zScale = 50;
    cObject.xScale = 0.0050;
    cObject.yScale = 0.0050;
    cObject.zScale = 0.0050;

    cObject.xRotation = 0;
    cObject.yRotation = 0;
    cObject.zRotation = 0;

    cObject.xWiggleSpeed = 0;
    cObject.yWiggleSpeed = 0;
    cObject.zWiggleSpeed = 0;

    currentPosition = new Point();
    lastPosition = new Point();
    
    for (var i = 0; i < 216; i++){
        wordSelectMarkers[i] = 0;
        wordSelectMarkers2[i] = 0;
    }
    
    tileTextureObjects.length = 0;
    reverseTileGridObjects.length = 0;
    letter_A_Objects.length = 0;
    letter_B_Objects.length = 0;
    letter_C_Objects.length = 0;
    letter_D_Objects.length = 0;
    letter_E_Objects.length = 0;
    letter_F_Objects.length = 0;
    letter_G_Objects.length = 0;
    letter_H_Objects.length = 0;
    letter_I_Objects.length = 0;
    letter_J_Objects.length = 0;
    letter_K_Objects.length = 0;
    letter_L_Objects.length = 0;
    letter_M_Objects.length = 0;
    letter_N_Objects.length = 0;
    letter_O_Objects.length = 0;
    letter_P_Objects.length = 0;
    letter_Q_Objects.length = 0;
    letter_R_Objects.length = 0;
    letter_S_Objects.length = 0;
    letter_T_Objects.length = 0;
    letter_U_Objects.length = 0;
    letter_V_Objects.length = 0;
    letter_W_Objects.length = 0;
    letter_X_Objects.length = 0;
    letter_Y_Objects.length = 0;
    letter_Z_Objects.length = 0;
    
    flippedLetter_A_Objects.length = 0;
    flippedLetter_B_Objects.length = 0;
    flippedLetter_C_Objects.length = 0;
    flippedLetter_D_Objects.length = 0;
    flippedLetter_E_Objects.length = 0;
    flippedLetter_F_Objects.length = 0;
    flippedLetter_G_Objects.length = 0;
    flippedLetter_H_Objects.length = 0;
    flippedLetter_I_Objects.length = 0;
    flippedLetter_J_Objects.length = 0;
    flippedLetter_K_Objects.length = 0;
    flippedLetter_L_Objects.length = 0;
    flippedLetter_M_Objects.length = 0;
    flippedLetter_N_Objects.length = 0;
    flippedLetter_O_Objects.length = 0;
    flippedLetter_P_Objects.length = 0;
    flippedLetter_Q_Objects.length = 0;
    flippedLetter_R_Objects.length = 0;
    flippedLetter_S_Objects.length = 0;
    flippedLetter_T_Objects.length = 0;
    flippedLetter_U_Objects.length = 0;
    flippedLetter_V_Objects.length = 0;
    flippedLetter_W_Objects.length = 0;
    flippedLetter_X_Objects.length = 0;
    flippedLetter_Y_Objects.length = 0;
    flippedLetter_Z_Objects.length = 0;
    
}



function CubeObjectAwake() {

    cMesh = new Object();

    
    
    //textureAtlasLetters = loadTexture("images/LettersTA1024x1024.png");
    
    if (sceneController.cubeColorKey === "Inverse")
    {
        tileTexture = loadTexture("images/blacksquareTR65128x128.png");
        reverseTileGrid = loadTexture("images/whitesquareTR65128x128.png");
        
    }
    else
    {
        
        tileTexture = loadTexture("images/whitesquareTR65128x128.png");
        reverseTileGrid = loadTexture("images/blacksquareTR65128x128.png");
        
    }
    
    vertexBufferTexturesTileGrid = tileTexture;
    for(var i = 0; i < sceneController.cubeSize; i++){
        
        tileTextureObjects.push(i);
    }
    
    
    
    alphabetLetters[0] = loadTexture("images/A_Letter_Black_128.png");
    alphabetLetters[1] = loadTexture("images/B_Letter_Black_128.png");
    alphabetLetters[2] = loadTexture("images/C_Letter_Black_128.png");
    alphabetLetters[3] = loadTexture("images/D_Letter_Black_128.png");
    alphabetLetters[4] = loadTexture("images/E_Letter_Black_128.png");
    alphabetLetters[5] = loadTexture("images/F_Letter_Black_128.png");
    alphabetLetters[6] = loadTexture("images/G_Letter_Black_128.png");
    alphabetLetters[7] = loadTexture("images/H_Letter_Black_128.png");
    alphabetLetters[8] = loadTexture("images/I_Letter_Black_128.png");
    alphabetLetters[9] = loadTexture("images/J_Letter_Black_128.png");
    alphabetLetters[10] = loadTexture("images/K_Letter_Black_128.png");
    alphabetLetters[11] = loadTexture("images/L_Letter_Black_128.png");
    alphabetLetters[12] = loadTexture("images/M_Letter_Black_128.png");
    alphabetLetters[13] = loadTexture("images/N_Letter_Black_128.png");
    alphabetLetters[14] = loadTexture("images/O_Letter_Black_128.png");
    alphabetLetters[15] = loadTexture("images/P_Letter_Black_128.png");
    alphabetLetters[16] = loadTexture("images/Q_Letter_Black_128.png");
    alphabetLetters[17] = loadTexture("images/R_Letter_Black_128.png");
    alphabetLetters[18] = loadTexture("images/S_Letter_Black_128.png");
    alphabetLetters[19] = loadTexture("images/T_Letter_Black_128.png");
    alphabetLetters[20] = loadTexture("images/U_Letter_Black_128.png");
    alphabetLetters[21] = loadTexture("images/V_Letter_Black_128.png");
    alphabetLetters[22] = loadTexture("images/W_Letter_Black_128.png");
    alphabetLetters[23] = loadTexture("images/X_Letter_Black_128.png");
    alphabetLetters[24] = loadTexture("images/Y_Letter_Black_128.png");
    alphabetLetters[25] = loadTexture("images/Z_Letter_Black_128.png");

    alphabetLettersWhite[0] = loadTexture("images/A_Letter_Gray_256.png");
    alphabetLettersWhite[1] = loadTexture("images/B_Letter_Gray_256.png");
    alphabetLettersWhite[2] = loadTexture("images/C_Letter_Gray_256.png");
    alphabetLettersWhite[3] = loadTexture("images/D_Letter_Gray_256.png");
    alphabetLettersWhite[4] = loadTexture("images/E_Letter_Gray_256.png");
    alphabetLettersWhite[5] = loadTexture("images/F_Letter_Gray_256.png");
    alphabetLettersWhite[6] = loadTexture("images/G_Letter_Gray_256.png");
    alphabetLettersWhite[7] = loadTexture("images/H_Letter_Gray_256.png");
    alphabetLettersWhite[8] = loadTexture("images/I_Letter_Gray_256.png");
    alphabetLettersWhite[9] = loadTexture("images/J_Letter_Gray_256.png");
    alphabetLettersWhite[10] = loadTexture("images/K_Letter_Gray_256.png");
    alphabetLettersWhite[11] = loadTexture("images/L_Letter_Gray_256.png");
    alphabetLettersWhite[12] = loadTexture("images/M_Letter_Gray_256.png");
    alphabetLettersWhite[13] = loadTexture("images/N_Letter_Gray_256.png");
    alphabetLettersWhite[14] = loadTexture("images/O_Letter_Gray_256.png");
    alphabetLettersWhite[15] = loadTexture("images/P_Letter_Gray_256.png");
    alphabetLettersWhite[16] = loadTexture("images/Q_Letter_Gray_256.png");
    alphabetLettersWhite[17] = loadTexture("images/R_Letter_Gray_256.png");
    alphabetLettersWhite[18] = loadTexture("images/S_Letter_Gray_256.png");
    alphabetLettersWhite[19] = loadTexture("images/T_Letter_Gray_256.png");
    alphabetLettersWhite[20] = loadTexture("images/U_Letter_Gray_256.png");
    alphabetLettersWhite[21] = loadTexture("images/V_Letter_Gray_256.png");
    alphabetLettersWhite[22] = loadTexture("images/W_Letter_Gray_256.png");
    alphabetLettersWhite[23] = loadTexture("images/X_Letter_Gray_256.png");
    alphabetLettersWhite[24] = loadTexture("images/Y_Letter_Gray_256.png");
    alphabetLettersWhite[25] = loadTexture("images/Z_Letter_Gray_256.png");
    

    for (var i = 0; i < sceneController.cubeSize; i++) 
    {
        var tempSquare = cubeBoard[i];

        if (tempSquare.squareLetter === "A" || tempSquare.squareLetter === "Â" || tempSquare.squareLetter === "À" || tempSquare.squareLetter === "Ä" || tempSquare.squareLetter === "Á")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[0];
                vertexBufferTexturesRed[i] = alphabetLetters[0];
                flippedLetter_A_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[0];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[0];
                letter_A_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "B")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[1];
                vertexBufferTexturesRed[i] = alphabetLetters[1];
                flippedLetter_B_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[1];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[1];
                letter_B_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "C" || tempSquare.squareLetter === "Ç")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[2];
                vertexBufferTexturesRed[i] = alphabetLetters[2];
                flippedLetter_C_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[2];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[2];
                letter_C_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "D")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[3];
                vertexBufferTexturesRed[i] = alphabetLetters[3];
                flippedLetter_D_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[3];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[3];
                letter_D_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "E" || tempSquare.squareLetter === "É" || tempSquare.squareLetter === "Ê" || tempSquare.squareLetter === "È" || tempSquare.squareLetter === "Ë")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[4];
                vertexBufferTexturesRed[i] = alphabetLetters[4];
                flippedLetter_E_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[4];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[4];
                letter_E_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "F")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[5];
                vertexBufferTexturesRed[i] = alphabetLetters[5];
                flippedLetter_F_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[5];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[5];
                letter_F_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "G")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[6];
                vertexBufferTexturesRed[i] = alphabetLetters[6];
                flippedLetter_G_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[6];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[6];
                letter_G_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "H")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[7];
                vertexBufferTexturesRed[i] = alphabetLetters[7];
                flippedLetter_H_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[7];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[7];
                letter_H_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "I" || tempSquare.squareLetter === "Ï" || tempSquare.squareLetter === "Î" || tempSquare.squareLetter === "Í" || tempSquare.squareLetter === "Ì")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[8];
                vertexBufferTexturesRed[i] = alphabetLetters[8];
                flippedLetter_I_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[8];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[8];
                letter_I_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "J")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[9];
                vertexBufferTexturesRed[i] = alphabetLetters[9];
                flippedLetter_J_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[9];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[9];
                letter_J_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "K")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[10];
                vertexBufferTexturesRed[i] = alphabetLetters[10];
                flippedLetter_K_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[10];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[10];
                letter_K_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "L")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[11];
                vertexBufferTexturesRed[i] = alphabetLetters[11];
                flippedLetter_L_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[11];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[11];
                letter_L_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "M")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[12];
                vertexBufferTexturesRed[i] = alphabetLetters[12];
                flippedLetter_M_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[12];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[12];
                letter_M_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "N" || tempSquare.squareLetter === "Ñ")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[13];
                vertexBufferTexturesRed[i] = alphabetLetters[13];
                flippedLetter_N_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[13];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[13];
                letter_N_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "O" || tempSquare.squareLetter === "Ô" || tempSquare.squareLetter === "Ö" || tempSquare.squareLetter === "Ò" || tempSquare.squareLetter === "Ó")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[14];
                vertexBufferTexturesRed[i] = alphabetLetters[14];
                flippedLetter_O_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[14];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[14];
                letter_O_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "P")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[15];
                vertexBufferTexturesRed[i] = alphabetLetters[15];
                flippedLetter_P_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[15];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[15];
                letter_P_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "Q")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[16];
                vertexBufferTexturesRed[i] = alphabetLetters[16];
                flippedLetter_Q_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[16];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[16];
                letter_Q_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "R")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[17];
                vertexBufferTexturesRed[i] = alphabetLetters[17];
                flippedLetter_R_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[17];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[17];
                letter_R_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "S")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[18];
                vertexBufferTexturesRed[i] = alphabetLetters[18];
                flippedLetter_S_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[18];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[18];
                letter_S_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "T")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[19];
                vertexBufferTexturesRed[i] = alphabetLetters[19];
                flippedLetter_T_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[19];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[19];
                letter_T_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "U" || tempSquare.squareLetter === "Ü" || tempSquare.squareLetter === "Û" || tempSquare.squareLetter === "Ù" || tempSquare.squareLetter === "Ú")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[20];
                vertexBufferTexturesRed[i] = alphabetLetters[20];
                flippedLetter_U_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[20];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[20];
                letter_U_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "V")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[21];
                vertexBufferTexturesRed[i] = alphabetLetters[21];
                flippedLetter_V_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[21];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[21];
                letter_V_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "W")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[22];
                vertexBufferTexturesRed[i] = alphabetLetters[22];
                flippedLetter_W_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[22];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[22];
                letter_W_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "X")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[23];
                vertexBufferTexturesRed[i] = alphabetLetters[23];
                flippedLetter_X_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[23];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[23];
                letter_X_Objects.push(i);
            }
        }
        else if (tempSquare.squareLetter === "Y" || tempSquare.squareLetter === "Ÿ")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[24];
                vertexBufferTexturesRed[i] = alphabetLetters[24];
                flippedLetter_Y_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[24];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[24];
                letter_Y_Objects.push(i);
            }

        }
        else if (tempSquare.squareLetter === "Z")
        {
            if (sceneController.cubeColorKey === "Inverse")
            {
                vertexBufferTextures[i] = alphabetLettersWhite[25];
                vertexBufferTexturesRed[i] = alphabetLetters[25];
                flippedLetter_Z_Objects.push(i);
            }
            else
            {
                vertexBufferTextures[i] = alphabetLetters[25];
                vertexBufferTexturesRed[i] = alphabetLettersWhite[25];
                letter_Z_Objects.push(i);
            }
        }

    }
        
    vertexBufferTextures[sceneController.cubeSize] = loadTexture("images/selectSquareBlue2.png");
    vertexBufferTextures[sceneController.cubeSize + 1] = loadTexture("images/selectSquareRed.png");
    //vertexBufferTextures[sceneController.cubeSize + 2] = loadTexture("images/Blank.png");
    //vertexBufferTextures[sceneController.cubeSize + 3] = loadTexture("images/selectSquareRed.png");
    //vertexBufferTextures[sceneController.cubeSize] = blueSquare;
    //vertexBufferTextures[sceneController.cubeSize + 1] = blueSquare;
    //vertexBufferTextures[sceneController.cubeSize + 2] = blankSquare;
    //vertexBufferTextures[sceneController.cubeSize + 3] = redSquare;
    



    //setUpVBOCube();


    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix, mvMatrix, [cObject.x, cObject.y, cObject.z]);

    mat4.scale(mvMatrix, mvMatrix, [cObject.xScale, cObject.yScale, cObject.zScale]);

    mat4.rotateX(mvMatrix, mvMatrix, degToRad(cObject.xRotation));
    mat4.rotateY(mvMatrix, mvMatrix, degToRad(cObject.yRotation));
    mat4.rotateZ(mvMatrix, mvMatrix, degToRad(cObject.zRotation));



    if (sceneController.cubeSize === 96)
    {
        deltaX = -2.9;
        var randomN = Math.floor(Math.random() * 10);
        if (randomN <= 4)
            deltaY = 2.9;
        else
            deltaY = -2.9;
    }
    else if (sceneController.cubeSize === 216)
    {
        deltaX = -2.9;
        var randomN = Math.floor(Math.random() * 10);
        if (randomN <= 4)
            deltaY = 2.9;
        else
            deltaY = -2.9;
    }
    else if (sceneController.cubeSize === 150)
    {
        deltaX = -2.9;
        var randomN = Math.floor(Math.random() * 10);
        if (randomN <= 4)
            deltaY = 2.9;
        else
            deltaY = -2.9;
    }




}









function cObjectUpdate() {

    if (UITouchPhaseEnded && !wordSelect)
    {
        active = true;
    }
    else
        active = didEnterForeground && !wordSelect;


    // if we are currently active, we will update our rotation
    if (active && !firstTouch)
    {

        if (xRotationWiggle <= -1.0)
        {
            xRotationWiggle = xRotationWiggle + 0.05;
            cObject.xWiggleSpeed = 0.07;
        }
        else if (xRotationWiggle >= 1.0)
        {
            xRotationWiggle = xRotationWiggle - 0.05;
            cObject.xWiggleSpeed = -0.07;
        }
        else if (xRotationWiggle > -1.0 && xRotationWiggle < 1.0)
        {
            if (cObject.xWiggleSpeed < 0)
                xRotationWiggle = xRotationWiggle - 0.05;
            else
                xRotationWiggle = xRotationWiggle + 0.05;
        }

        if (yRotationWiggle <= -1.0)
        {
            yRotationWiggle = yRotationWiggle + 0.05;
            cObject.yWiggleSpeed = 0.07;
        }
        else if (yRotationWiggle >= 1.0)
        {
            yRotationWiggle = yRotationWiggle - 0.05;
            cObject.yWiggleSpeed = -0.07;
        }
        else if (yRotationWiggle > -1.0 && yRotationWiggle < 1.0)
        {
            if (cObject.yWiggleSpeed < 0)
                yRotationWiggle = yRotationWiggle - 0.05;
            else
                yRotationWiggle = yRotationWiggle + 0.05;
        }

        if (zRotationWiggle <= -1.0)
        {
            zRotationWiggle = zRotationWiggle + 0.05;
            cObject.zWiggleSpeed = 0.07;
        }
        else if (zRotationWiggle >= 1.0)
        {
            zRotationWiggle = zRotationWiggle - 0.05;
            cObject.zWiggleSpeed = -0.07;
        }
        else if (zRotationWiggle > -1.0 && zRotationWiggle < 1.0)
        {
            if (cObject.zWiggleSpeed < 0)
                zRotationWiggle = zRotationWiggle - 0.05;
            else
                zRotationWiggle = zRotationWiggle + 0.05;
        }



        if (!(xVector === 0) && !(yVector === 0))
        {
            deltaX = xVector;
            deltaY = yVector;
            cubeOrientation();

            yVector = yVector * 0.8;
            if (yVector < 0.1 && yVector > -0.1)
                yVector = 0.0;

            xVector = xVector * 0.8;
            if (xVector < 0.1 && xVector > -0.1)
                xVector = 0.0;

        }



        mat4.rotateX(mvMatrix, mvMatrix, degToRad(cObject.xWiggleSpeed));
        mat4.rotateY(mvMatrix, mvMatrix, degToRad(cObject.yWiggleSpeed));
        mat4.rotateZ(mvMatrix, mvMatrix, degToRad(cObject.zWiggleSpeed));

    }


    if (firstTouch2)
    {
        var growSpeed = 1.25;
        if (sceneController.cubeSize === 96)
        {
            zoomSizeMin = 90.0;
            zoomSizeMax = 90.0;
            growSpeed = 1.25;
        }
        else if (sceneController.cubeSize === 216)
        {
            zoomSizeMin = 65.0;
            zoomSizeMax = 65.0;
            growSpeed = 0.90;
        }
        else if (sceneController.cubeSize === 150)
        {
            zoomSizeMin = 75.0;
            zoomSizeMax = 75.0;
            growSpeed = 1.0;
        }


        if (cObject.xScale < zoomSizeMax)
        {
            xScaleOld = cObject.xScale;
            yScaleOld = cObject.yScale;
            zScaleOld = cObject.zScale;

            cObject.xScale = cObject.xScale + growSpeed;
            cObject.yScale = cObject.yScale + growSpeed;
            cObject.zScale = cObject.zScale + growSpeed;

            mat4.scale(mvMatrix, mvMatrix, [cObject.xScale / xScaleOld, cObject.yScale / yScaleOld, cObject.zScale / zScaleOld]);

            firstTouch = true;

        }
        else
        {
            firstTouch2 = false;
            firstTouch = false;
            cLImage.makeVisible = true;
            
        }



        if (deltaX > 0)
        {
            deltaX = deltaX - 0.030;
            if (deltaX <= 0.0)
                deltaX = 0.0;
        }
        else
        {
            deltaX = deltaX + 0.030;
            if (deltaX >= 0.0)
                deltaX = 0.0;
        }

        if (deltaY > 0)
        {
            deltaY = deltaY - 0.030;
            if (deltaY <= 0.0)
            {
                deltaY = 0.0;
                firstTouch = false;
                deltaX = 0.0;
            }
        }
        else
        {
            deltaY = deltaY + 0.030;
            if (deltaY >= 0.0)
            {
                deltaY = 0.0;
                firstTouch = false;
                deltaX = 0.0;
            }
        }

        if (!(deltaX === 0) && !(deltaY === 0))
        {
            cubeOrientation();
        }

    }


    if (sceneController.endAnimationActive)
    {
        
        xScaleOld = cObject.xScale;
        yScaleOld = cObject.yScale;
        zScaleOld = cObject.zScale;

        cObject.xScale = cObject.xScale - 2.5;
        cObject.yScale = cObject.yScale - 2.5;
        cObject.zScale = cObject.zScale - 2.5;

        mat4.scale(mvMatrix, mvMatrix, [cObject.xScale / xScaleOld, cObject.yScale / yScaleOld, cObject.zScale / zScaleOld]);
        
        
        deltaX = deltaX - 0.5;

        if (deltaY < 0)
        {
            deltaY = deltaY - 0.5;
        }
        else
        {
            deltaY = deltaY + 0.5;
        }

        if (!(deltaX === 0) && !(deltaY === 0))
        {
            cubeOrientation();
        }

        if (cObject.xScale <= -2.50)
        {
            active = true;
            wordSelect = false;
            firstTouch2 = true;
            sceneController.endAnimationActive = false;
            sceneControllerUnloadScene();
        }

    }



}


function cObjectRender() {

    var currentSide;
    for (var i = 0; i < 6; i++)
    {
        currentSide = letterBounds(sceneController.cubeSize*i/6);
        visibleSides[i] = !currentSide.isEmpty();
    }
    
    mvPushMatrix();

    cubeMeshRender();

    mvPopMatrix();

}






function loadTexture(str) {

    var newTexture = gl.createTexture();
    newTexture.image = new Image();

    newTexture.image.onload = function() {
        handleLoadedTexture(newTexture);
    };

    newTexture.image.src = str;
    return newTexture;
}


function handleLoadedTexture(texture) {


    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

}



function emitStar(index, particleEmitter, oindex){
        
    // Turn on particleEmiter
    particleEmitter.emit = true;
    
    var tempBounds = new Rectangle(0, 0, 0, 0);
    if (index >= 0){
        tempBounds = cubeLetterBounds[index];
    }  
    
    var tempPoint;
    
    if (tempBounds.isEmpty())
    {
        var tempPoint2 = new EmitterPoint();
        if (!(particleEmitter.particleUpdate.length === 0)){
            tempPoint = particleEmitter.particleUpdate.pop();
            particleEmitter.particleUpdate.push(tempPoint);
        }
        if (!(particleEmitter.particleUpdate.length === 0) && index >= 0) // Normal color star only
        {
            tempPoint2.emitPoint = tempPoint.emitPoint;
            tempPoint2.index = index;
            tempPoint2.originalIndex = oindex;
            
            particleEmitter.particleUpdate.push(tempPoint2);
        }
        else  // black star only (minus index)
        {
            tempPoint2.index = -1;
            switch (index)
            {
                case -1:
                    tempPoint2.emitPoint = new BBPointMake(0.0, 0.0, 0.0);
                    break;
                case -2:
                    tempPoint2.emitPoint = new BBPointMake(-30.0, 45.0, 0.0);
                    break;
                case -3:
                    tempPoint2.emitPoint = new BBPointMake(30.0, -45.0, 0.0);
                    break;
                case -4:
                    tempPoint2.emitPoint = new BBPointMake(-60.0, 90.0, 0.0);
                    break;
                case -5:
                    tempPoint2.emitPoint = new BBPointMake(60.0, -90.0, 0.0);
                    break;
                case -6:
                    tempPoint2.emitPoint = new BBPointMake(-90.0, 135.0, 0.0);
                    break;
                case -7:
                    tempPoint2.emitPoint = new BBPointMake(90.0, -135.0, 0.0);
                    break;
                case -8:
                    tempPoint2.emitPoint = new BBPointMake(-120.0, 180.0, 0.0);
                    break;
                case -9:
                    tempPoint2.emitPoint = new BBPointMake(120.0, -180.0, 0.0);
                    break;
                case -10:
                    tempPoint2.emitPoint = new BBPointMake(-150.0, 225.0, 0.0);
                    break;
                case -11:
                    tempPoint2.emitPoint = new BBPointMake(150.0, -225.0, 0.0);
                    break;
                case -12:
                    tempPoint2.emitPoint = new BBPointMake(-180.0, 270.0, 0.0);
                    break;
                case -13:
                    tempPoint2.emitPoint = new BBPointMake(180.0, -270.0, 0.0);
                    break;
                case -14:
                    tempPoint2.emitPoint = new BBPointMake(-210.0, 315.0, 0.0);
                    break;
                case -15:
                    tempPoint2.emitPoint = new BBPointMake(210.0, -315.0, 0.0);
                    break;
                case -16:
                    tempPoint2.emitPoint = new BBPointMake(-240.0, 360.0, 0.0);
                    break;
                default:
                    tempPoint2.emitPoint = new BBPointMake(320.0, 480.0, 0.0);
                    tempPoint2.index = -2;
                    break;
            }

            tempPoint2.originalIndex = oindex;
            particleEmitter.particleUpdate.push(tempPoint2);
        }

    }
    else
    {
        
        var tempy;
        var tempx;
        var tempEmitPoint;

        tempy = -((tempBounds.y * 1.0 + tempBounds.height/2 * 1.0) - gl.viewportHeight/2);
        tempx = (tempBounds.x * 1.0 + tempBounds.width/2 * 1.0) - gl.viewportWidth/2;
        tempEmitPoint = new BBPointMake(tempx, tempy, 0.0);
        
        tempPoint = new EmitterPoint(tempEmitPoint, index, oindex);
        
        particleEmitter.particleUpdate.push(tempPoint);
    }
    
    particleEmitter.emitCounter = particleEmitter.emitCounter + 1;

}



function gameScore(index, sWord, oindex){
        
    if (numberStars === 3 && !sWord.wordHint && !sceneController.solveCube) // || self.openGLView.gameOver2 == YES
    {
        emitStar(index, particleEmitterBlue, oindex);
        emitStar(index, particleEmitterRed, oindex);
        emitStar(index, particleEmitterYellow, oindex);
    }
    else if (numberStars === 2 && !sWord.wordHint && !sceneController.solveCube)
    {
        emitStar(index, particleEmitterRed, oindex);
        emitStar(index, particleEmitterYellow, oindex);
    }
    else if(!sceneController.solveCube)
    {
        emitStar(index, particleEmitterYellow, oindex);
    }
    else //Solve Cube
    {
        emitStar(index, particleEmitterBlue, oindex);
        emitStar(index, particleEmitterRed, oindex);
        emitStar(index, particleEmitterYellow, oindex);
    }

}



function solveCubeNow(){

    if(active){
        wordSelect = true;
        active = false;
    }

    for (var i = 0; i < sceneController.cubeSize; i++) 
    {
        cubeLetterBounds[i] = letterBounds(i);
    }

    wordListNotFound = new Array();

    var tempSquare;
    for (var i = 0; i < wordListSortedByLength.length; i++)
    {
        var str = wordListSortedByLength[i];
        if (!str.wordFound)
        {
            wordListNotFound.push(str);
        }

    }

    if (!(wordListNotFound.length === 0))
    {

        for (var i = 0 ; i < wordListNotFound.length; i++)
        {
            var temppwe = wordListNotFound[i];
            for (var j = 0; j < wordListSortedByLength.length; j++)
            {
                var strX = wordListSortedByLength[j];
                if (strX.wordName === temppwe.wordName)
                {
                    strX.wordFound = true;
                    break;
                }
            }
        }

        for (var i = 0 ; i < wordListNotFound.length; i++)
        {
            var temppwe = wordListNotFound[i];
            for (var j = 0; j < wordList.length; j++)
            {
                var strA = wordList[j];
                if (strA.wordName === temppwe.wordName)
                {
                    strA.wordFound = true;
                    break;
                }
            }
        }

        sceneController.wordHintWords.push("x");


        for (var j = 0 ; j < wordListNotFound.length; j++)
        {
            var str = wordListNotFound[j];

            for (var i = str.wordLength; i > 0; i=i-1)
            {
                tempSquare = str.allSquares[i-1];
                if (cubeLetterBounds[tempSquare.currentPosition].isEmpty())
                {

                    gameScore(-i, str, tempSquare.currentPosition);
                }
                else
                {
                    gameScore(tempSquare.currentPosition, str, tempSquare.currentPosition);
                }

            }

        }

        for (var i = 0; i < wordList.length; i++)
        {
            var str = wordList[i];
            wordSelectMarkers[str.firstLetterSquare] = 3;
            wordSelectMarkers2[str.firstLetterSquare] = 3;
        }


    }

    
    UpdateTextAreaView(wordList);

    wordSelect = false;
    active = true;
}




function showHint(){
        
    for (var i = 0; i < sceneController.cubeSize; i++) 
    {
        cubeLetterBounds[i] = letterBounds(i);
    }

    var wordListNotFound = new Array();

    var tempSquare;
    for (var i = 0; i < wordListSortedByLength.length; i++)
    {
        var str = wordListSortedByLength[i];
        if (!str.wordFound && !str.alphabetQuestHiddenWord)
        {
            wordListNotFound.push(str);
        }

    }

    if (wordListNotFound.length === 0)  // get Hidden Word if all other words have been found
    {
        for (var i = 0; i < wordListSortedByLength.length; i++)
        {
            var str = wordListSortedByLength[i];
            if (!str.wordFound && str.alphabetQuestHiddenWord)
            {
                wordListNotFound.push(str);
            }

        }
    }


    if (!(wordListNotFound.length === 0))
    {
        //var rNumber = random(wordListNotFound.size());
        var rNumber = Math.floor(Math.random() * wordListNotFound.length);
        var tempWord = wordListNotFound[rNumber];


        //ArrayList wordHintWords = new ArrayList();

        for (var i = 0; i < wordListSortedByLength.length; i++)
        {
            var strX = wordListSortedByLength[i];
            if (tempWord.allLetters[0] === strX.allLetters[0] && tempWord.firstLetterSquare === strX.firstLetterSquare && !strX.wordFound)
            {
                sceneController.wordHintWords.push(strX.wordName);
            }

        }

        //[self setGameDataObject:wordHintWords forKey:@"wordHintWordsKey"];

        for (var i = 0; i < sceneController.wordHintWords.length; i++)
        {
            var temppwe = sceneController.wordHintWords[i];
            for (var j = 0; j < wordListSortedByLength.length; j++)
            {
                var strX = wordListSortedByLength[j];
                if (strX.wordName === temppwe)
                {
                    strX.wordHint = true;
                    break;
                }
            }
        }

        for (var i = 0; i < sceneController.wordHintWords.length; i++)
        {
            var temppwe = sceneController.wordHintWords[i];
            for (var j = 0; j < wordList.length; j++)
            {
                var strA = wordList[j];
                if (strA.wordName === temppwe)
                {
                    strA.wordHint = true;
                    break;
                }
            }
        }

        tempSquare = tempWord.allSquares[0];

        wordSelectMarkers[tempSquare.currentPosition] = 3;
        wordSelectMarkers2[tempSquare.currentPosition] = 3;

        /*
        if ([OpenALSoundController sharedSoundController].inInterruption == NO)
        {
            [self.soundSourceObject playSound:[[OpenALSoundController sharedSoundController] soundBufferDataFromFileBaseName:@"sound5"]];
        }
        */


        for (var i = 1; i <= tempWord.wordLength; i++)
        {
            emitStar(-i, particleEmitterBlack, -i);
        }
    }

}





function doubleTap() {

    xVector = 0;
    yVector = 0;
    deltaX = 0;
    deltaY = 0;

    if (wordSelect)
    {
        wordSelect = false;
        active = true;
        
        cLImage.updateLetter("blank");

        for (var i = 0; i < sceneController.cubeSize; i++)
        {
            if (!(wordSelectMarkers[i] === 3)) {
                wordSelectMarkers[i] = 0;
            }
        }

        selectedCubeSquares.length = 0;
        nonSelectedCubeSquares.length = 0;

        firstTouchMarker = 216;
        currentTouchMarker = 216;
        
    }
    else
    {
        wordSelect = true;
        active = false;

        
        for (var i = 0; i < sceneController.cubeSize; i++)
        {
            cubeLetterBounds[i] = letterBounds(i);
        }
        
    }

}





function touchesBegan(event) {
    var currentPoint = new Point(event.clientX, event.clientY);
    var browserWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //var browserHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //var netGain = event.pageY - event.clientY;
    //if(browserHeight > 828){
        //xAdjustment = (browserWidth - 640)/2;
    //}
    //else{
        //xAdjustment = (browserWidth - 640)/2 - 10;
    //}
    xAdjustment = (browserWidth - 640)/2;
    //xAdjustment = 16;
    //yAdjustment = 112 - netGain; //89
    yAdjustment = 96;
    currentPoint.x = currentPoint.x - xAdjustment;
    currentPoint.y = currentPoint.y - yAdjustment;
    
    //document.getElementById('xcoord').innerHTML = "browserWidth: " + browserWidth;
    //document.getElementById('xcoord2').innerHTML = "Mouse x:  " + currentPoint.x;
    //document.getElementById('ycoord2').innerHTML = "Mouse y:  " + currentPoint.y;
    
    startTime = new Date().getTime() / 1000;  // seconds

    UITouchPhaseEnded = false;

    lastPosition = currentPoint;
    
    
    if (wordSelect)
    {

        for (letterIndex = 0; letterIndex < sceneController.cubeSize; letterIndex++)
        {
            if (cubeLetterBounds[letterIndex].contains(lastPosition))
            {
                //document.getElementById('xcoord2').innerHTML = "Letter Index: " + letterIndex;
                currentTouchMarker = letterIndex;
                if (firstTouchMarker === 216)
                {
                    selectInitialSquare(letterIndex);
                    firstTouchMarker = currentTouchMarker;
                    beginWord = true;
                }

            }

        }
    }
    

}


function touchesMoved(event) {
    var currentPoint = new Point(event.clientX, event.clientY);
    var browserWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //var browserHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //var netGain = event.pageY - event.clientY;
    //if(browserHeight > 828){
        //xAdjustment = (browserWidth - 640)/2;
    //}
    //else{
        //xAdjustment = (browserWidth - 640)/2 - 10;
    //}
    xAdjustment = (browserWidth - 640)/2;
    //xAdjustment = 16;
    //yAdjustment = 112 - netGain; //89
    yAdjustment = 96;
    currentPoint.x = currentPoint.x - xAdjustment;
    currentPoint.y = currentPoint.y - yAdjustment;
    
    //document.getElementById('xcoord').innerHTML = "browserWidth: " + browserWidth;
    //document.getElementById('xcoord2').innerHTML = "Mouse x:  " + currentPoint.x;
    //document.getElementById('ycoord2').innerHTML = "Mouse y:  " + currentPoint.y;
    
    currentPosition = currentPoint;
    
    if (!wordSelect)
    {

        if (currentPosition.x === lastPosition.x) {
            deltaX = 0;
        }
        else {
            deltaX = (currentPosition.x - lastPosition.x) / 2;
        }
        if (currentPosition.y === lastPosition.y) {
            deltaY = 0;
        }
        else {
            deltaY = (currentPosition.y - lastPosition.y) / 2;
        }

        cubeOrientation();

        lastPosition = currentPosition;

    }
    else
    {
       for (letterIndex = 0; letterIndex < sceneController.cubeSize; letterIndex++)
       {
           if (cubeLetterBounds[letterIndex].contains(currentPosition))
           {
               //document.getElementById('xcoord2').innerHTML = "Letter Index: " + letterIndex;
               priorTouchMarker = currentTouchMarker;
               currentTouchMarker = letterIndex;


               if (!(currentTouchMarker === firstTouchMarker))
               {
                   var tempSquare = cubeBoard[letterIndex];
                   cLImage.updateLetter(tempSquare.squareLetter);

                   if (!(priorTouchMarker === currentTouchMarker))
                   {
                       selectTransientSquare(currentTouchMarker);
                   }

               }
               else
               {
                   if (selectedCubeSquares.length > 1)
                   {
                       var  tempSquare2 = selectedCubeSquares[1];
                       wordSelectMarkers[tempSquare2.currentPosition] = 0;
                       selectedCubeSquares.slice(1,1); // remove element 1

                   }
               }

           }
       }
    }
     

}


function touchesEnd() {
    
    endTime = new Date().getTime() / 1000;  // seconds

    UITouchPhaseEnded = true;


    var guestureTime = endTime - startTime;




    if (!wordSelect)
    {
        fingerSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / guestureTime;

        xVector = deltaX * fingerSpeed / 50;
        yVector = deltaY * fingerSpeed / 50;
        var driftSpeed = 30;

        if (Math.abs(xVector) >= Math.abs(yVector))
        {
            if (xVector > driftSpeed)
            {
                yVector = driftSpeed * yVector / xVector;
                xVector = driftSpeed;
            }
            else if (xVector < -driftSpeed)
            {
                yVector = -driftSpeed * yVector / xVector;
                xVector = -driftSpeed;
            }
        }
        else
        {
            if (yVector > driftSpeed)
            {
                xVector = driftSpeed * xVector / yVector;
                yVector = driftSpeed;
            }
            else if (yVector < -driftSpeed)
            {
                xVector = -driftSpeed * xVector / yVector;
                yVector = -driftSpeed;
            }
        }


    }
    else
    {
       
       cLImage.updateLetter("blank");

       if (!(currentTouchMarker === firstTouchMarker))
       {
           selectFinalSquare(currentTouchMarker);
           firstTouchMarker = 216;
           currentTouchMarker = 216;
           beginWord = false;
       }
       else
       {
           if (selectedCubeSquares.length > 1)
           {
               var tempSquare2 = selectedCubeSquares[1];
               wordSelectMarkers[tempSquare2.currentPosition] = 0;
               selectedCubeSquares.slice(1,1);
           }
       }
    }
     
}




function selectFinalSquare(index){
        
    //document.getElementById('ycoord2').innerHTML = "Array Length: " + selectedCubeSquares.length;
    if (!(selectedCubeSquares.length === 0))
    {
        for (var i = 0; i < selectedCubeSquares.length; i++)
        {
            var str = selectedCubeSquares[i];
            if (!(wordSelectMarkers2[str.currentPosition] === 3))
                wordSelectMarkers[str.currentPosition] = 0; // un-highlight squares
            else
                wordSelectMarkers[str.currentPosition] = 3;
        }


        var wordFound2ndTime = false;
        var firstSquare;
        var lastSquare;
        var tempSquare;

        
        var NumberWordFound = 0;
        for (var j = 0; j < wordListSortedByLength.length; j++)
        {
            var strA = wordListSortedByLength[j];
            if (strA.wordFound)
            {
                NumberWordFound++;
            }
        }
        if (wordListSortedByLength.length - NumberWordFound === 1)
        {
            for (var j = 0; j < wordListSortedByLength.length; j++)
            {
                var str = wordListSortedByLength[j];
                str.hideHiddenWord = false;

                for (var k = 0; k < wordList.length; k++)
                {
                    var strB = wordList[k];
                    if (strB.wordName === str.wordName)
                    {
                        strB.hideHiddenWord = false;
                        break;
                    }
                }
            }
        }
        

        firstSquare = selectedCubeSquares[0];

        lastSquare = selectedCubeSquares[0];
        selectedCubeSquares.length = 0;
        selectedCubeSquares.push(firstSquare);


        if (!(index === -1))  //Tap without dragging to last letter of word
        {
            //must find all squares between first and last
            var found;
            var currentSquare;
            var startSquare;
            var tranSquare;
            var tempRowArray = new Array();


            startSquare = firstSquare;
            currentSquare = cubeBoard[index];

            var directionCount;
            for (directionCount = 0; directionCount < 8; directionCount++)
            {
                found = false;
                rDirection = directionCount;

                tranSquare = startSquare;
                var directionLength;
                var maxDirLength2 = convertToLength(directionCount, startSquare);
                for (directionLength = 1; directionLength < maxDirLength2; directionLength++) // Select Final Square
                {
                    tranSquare = moveToNextSquare(rDirection, tranSquare);

                    if (found)
                        nonSelectedCubeSquares.push(tranSquare);
                    else
                        tempRowArray.push(tranSquare);

                    if (tranSquare.currentPosition === currentSquare.currentPosition && !(found))
                    {
                        found = true;
                    }
                } // for

                if (found)
                {
                    for (var i = 0; i < tempRowArray.length; i++)
                    {
                        var str = tempRowArray[i];
                        selectedCubeSquares.push(str);
                    }
                }
                else
                {
                    for (var i = 0; i < tempRowArray.length; i++)
                    {
                        var str = tempRowArray[i];
                        nonSelectedCubeSquares.push(str);
                    }
                }

                tempRowArray.length = 0;
                
                
                // if found is YES check against words
                if (found)
                {
                    wordFound2ndTime = secondCheck();
                }

                if (wordFound2ndTime)
                {
                    break;
                }
                else
                {
                    selectedCubeSquares.length = 0;
                    selectedCubeSquares.push(firstSquare);
                }
                
               
            } // for - Check next Direction

            if (!wordFound2ndTime)
            {
                lastSquare = cubeBoard[index];
            }
            else
            {
                lastSquare = selectedCubeSquares.pop();
            }

            //currentSquare = null;
            //startSquare = null;
            //tranSquare = null;

        } //if

        
        for (var ii = 0; ii < wordListSortedByLength.length; ii++)
        {
            var str = wordListSortedByLength[ii];
            var ResetTimer = false;
            if ((str.firstLetterSquare === firstSquare.currentPosition && str.lastLetterSquare === lastSquare.currentPosition) ||
                (str.firstLetterSquare === lastSquare.currentPosition && str.lastLetterSquare === firstSquare.currentPosition))
            {

                // Word Found 1st check
                // Put found word at end of list
                var tempWLO2 = str;
                wordListSortedByLength.splice(ii, 1);
                wordListSortedByLength.push(tempWLO2);

                if (!str.wordFound && !str.hideHiddenWord)
                {
                    // play sound file "sound5"

                }
                else if (!str.hideHiddenWord)
                {
                    // show word definition

                }

                var turnLetters = false;
                if (!str.wordFound && !str.hideHiddenWord)
                {
                    clearTimeout(starTimer1);
                    clearTimeout(starTimer2);
                    str.wordFound = true;
                    //[self saveGameAction];
                    turnLetters = true;
                }


                if (turnLetters)
                {
                    if (!str.alphabetQuestHiddenWord)
                    {
                        var NumberOfSquares = 0;
                        for (var i = str.wordLength -1; i >= 0; i=i-1)
                        {
                            tempSquare = str.allSquares[i];
                            
                            gameScore(tempSquare.currentPosition, str, tempSquare.currentPosition);
                            //highlightLetter(tempSquare.currentPosition, true);
                            

                            NumberOfSquares++;
                        }
                        //SceneController.get().setTotalLetteronCube(SceneController.get().getTotalLetteronCube() + NumberOfSquares);
                        sceneController.totalLetteronCube = sceneController.totalLetteronCube + NumberOfSquares;

                        ResetTimer = true;
                        
                    }
                    else
                    {
                        var NumberOfSquares2 = 0;
                        for (var i = str.wordLength -1; i >= 0; i=i-1)
                        {
                            tempSquare = str.allSquares[i];
                            
                            gameScore(tempSquare.currentPosition, str, tempSquare.currentPosition);
                            //highlightLetter(tempSquare.currentPosition, true);
                            

                            NumberOfSquares2++;
                        }
                        //SceneController.get().setTotalLetteronCube(SceneController.get().getTotalLetteronCube() + NumberOfSquares2);
                        sceneController.totalLetteronCube = sceneController.totalLetteronCube + NumberOfSquares2;

                        ResetTimer = true;
                        
                    }
                }


                var wordHintWordSelected = false;
                for (var j = 0; j < sceneController.wordHintWords.length; j++)
                {
                    var whtemp = sceneController.wordHintWords[j];
                    if (str.wordName === whtemp)
                    {
                        wordHintWordSelected = true;
                        break;
                    }
                }

                if (wordHintWordSelected)
                {
                    for (var j = 0; j < wordListSortedByLength.length; j++)
                    {
                        var strX = wordListSortedByLength[j];
                        strX.wordHint = false;
                    }


                    for (var j = 0; j < wordList.length; j++)
                    {
                        var strC = wordList[j];
                        if (strC.wordName === str.wordName && !str.hideHiddenWord)
                        {
                            strC.wordFound = true;
                            strC.wordHint = false;
                            
                            break;
                        }

                    }
                    for (var j = 0; j < wordList.length; j++)
                    {
                        var strD = wordList[j];
                        strD.wordHint = false;
                    }

                    sceneController.wordHintWords.length = 0;
                    //[self setGameDataObject:wordHintWords forKey:@"wordHintWordsKey"];
                    //NSLog(@"Remove Hint Words from Array");

                }
                else  // hint word not selected
                {
                    for (var j = 0; j < wordList.length; j++)
                    {
                        var strC = wordList[j];
                        if (strC.wordName === str.wordName && !str.hideHiddenWord)
                        {
                            strC.wordFound = true;
                            break;
                        }

                    }

                }

                //[self saveGameAction];
                
                if (ResetTimer)
                {
                    if(!(numberStars === 3)){
                        updateScoreStar("BlueStars");
                    }
                    
                    starTimer1 = setTimeout(function(){updateScoreStar("RedStars");}, 30000);
                    starTimer2 = setTimeout(function(){updateScoreStar("YellowStars");}, 60000);
                    
                }
                
                UpdateTextAreaView(wordList);
                
               
                break;
            } // End Word Found

        }
        

        //firstSquare = null;
        //lastSquare = null;
        //tempSquare = null;
    }



    if (!(firstTouchMarker === 216)) 
    {
        if (!(wordSelectMarkers2[firstTouchMarker] === 3))
            wordSelectMarkers[firstTouchMarker] = 0;
        else
            wordSelectMarkers[firstTouchMarker] = 3;

        firstTouchMarker = 216;
        currentTouchMarker = 216;
    }

    selectedCubeSquares.length = 0;
    nonSelectedCubeSquares.length = 0;

}





function selectTransientSquare (index){
        
    var found;
    var tempRowArray = new Array();


    currentSquareT = cubeBoard[index];


    if (selectedCubeSquares.length === 0)
    {
        selectInitialSquare(index);
    }

    startSquareT = selectedCubeSquares[0];

    selectedCubeSquares.length = 0;
    selectedCubeSquares.push(startSquareT);


    for (var directionCount = 0; directionCount < 8; directionCount++)
    {
        found = false;
        rDirection = directionCount;
        tranSquareT = startSquareT;
        var maxDirLength = convertToLength(directionCount, startSquareT);
        for (var directionLength = 1; directionLength < maxDirLength; directionLength++) // Select Transient Square
        {
            tranSquareT = moveToNextSquare(rDirection, tranSquareT);

            if (found)
                nonSelectedCubeSquares.push(tranSquareT);
            else
                tempRowArray.push(tranSquareT);

            if (tranSquareT.currentPosition === currentSquareT.currentPosition && !found)
            {
                found = true;
            }

        }

        if (found)
        {
            for (var i = 0; i <  tempRowArray.length; i++)
            {
                var lSquare = tempRowArray[i];
                selectedCubeSquares.push(lSquare);
            }
        }
        else
        {
            for (var i = 0; i <  tempRowArray.length; i++)
            {
                var lSquare = tempRowArray[i];
                nonSelectedCubeSquares.push(lSquare);
            }
        }
        tempRowArray.length = 0;

    } // Check next Direction


    for (var i = 0; i < nonSelectedCubeSquares.length; i++)
    {
        var lSquare = nonSelectedCubeSquares[i];
        if (!(wordSelectMarkers2[lSquare.currentPosition] === 3))
            wordSelectMarkers[lSquare.currentPosition] = 0;
        else
            wordSelectMarkers[lSquare.currentPosition] = 3;
    }

    nonSelectedCubeSquares.length = 0;

    for (var i = 0; i < selectedCubeSquares.length; i++)
    {
        var lSquare = selectedCubeSquares[i];
        wordSelectMarkers[lSquare.currentPosition] = 2;
    }

    wordSelectMarkers[startSquareT.currentPosition] = 1;

    //currentSquareT = null;
    //startSquareT = null;
    //tranSquareT = null;


}


function moveToNextSquare(direction, square){

    var NewSquare; //= cubeBoard.get(square.topPosition());
    var NewSquare2; //= cubeBoard.get(square.topPosition());

    switch (direction)
    {
        case 0:
            NewSquare = cubeBoard[square.topPosition];
            break;
        case 1:
            NewSquare = cubeBoard[square.topRightPosition];
            break;
        case 2:
            NewSquare = cubeBoard[square.rightPosition];
            break;
        case 3:
            NewSquare = cubeBoard[square.bottomRightPosition];
            break;
        case 4:
            NewSquare = cubeBoard[square.bottomPosition];
            break;
        case 5:
            NewSquare = cubeBoard[square.bottomLeftPosition];
            break;
        case 6:
            NewSquare = cubeBoard[square.leftPosition];
            break;
        case 7:
            NewSquare = cubeBoard[square.topLeftPosition];
            break;
        default:
            
            break;
    }

    var cubeSizeT = sceneController.cubeSize;

    // +/- 180
    if ((square.currentPosition >= cubeSizeT*1/6 && square.currentPosition < cubeSizeT*2/6 && NewSquare.currentPosition >= cubeSizeT*5/6 && NewSquare.currentPosition < cubeSizeT) || // back - bottom
        (square.currentPosition >= cubeSizeT*5/6 && square.currentPosition < cubeSizeT && NewSquare.currentPosition >= cubeSizeT*1/6 && NewSquare.currentPosition < cubeSizeT*2/6) || // bottom - back
        (square.currentPosition >= cubeSizeT*4/6 && square.currentPosition < cubeSizeT*5/6 && NewSquare.currentPosition >= cubeSizeT*1/6 && NewSquare.currentPosition < cubeSizeT*2/6) || // top - back
        (square.currentPosition >= cubeSizeT*1/6 && square.currentPosition < cubeSizeT*2/6 && NewSquare.currentPosition >= cubeSizeT*4/6 && NewSquare.currentPosition < cubeSizeT*5/6))   // back - top
    {
        for (var i = 0; i < 4; i++) 
        {
            rDirection++;
            if (rDirection === 8)
                rDirection = 0;
        }
    }
    // + 90
    else if ((square.currentPosition >= cubeSizeT*3/6 && square.currentPosition < cubeSizeT*4/6 && NewSquare.currentPosition >= cubeSizeT*5/6 && NewSquare.currentPosition < cubeSizeT) || // right - bottom
             (square.currentPosition >= cubeSizeT*2/6 && square.currentPosition < cubeSizeT*3/6 && NewSquare.currentPosition >= cubeSizeT*4/6 && NewSquare.currentPosition < cubeSizeT*5/6) || // left - top
             (square.currentPosition >= cubeSizeT*5/6 && square.currentPosition < cubeSizeT && NewSquare.currentPosition >= cubeSizeT*2/6 && NewSquare.currentPosition < cubeSizeT*3/6) || // bottom - left
             (square.currentPosition >= cubeSizeT*4/6 && square.currentPosition < cubeSizeT*5/6 && NewSquare.currentPosition >= cubeSizeT*3/6 && NewSquare.currentPosition < cubeSizeT*4/6))   // top - right
    {
        for (var i = 0; i < 2; i++) 
        {
            rDirection++;
            if (rDirection === 8)
                rDirection = 0;
        }
    }
    // - 90
    else if ((square.currentPosition >= cubeSizeT*5/6 && square.currentPosition < cubeSizeT && NewSquare.currentPosition >= cubeSizeT*3/6 && NewSquare.currentPosition < cubeSizeT*4/6) || // bottom - right
             (square.currentPosition >= cubeSizeT*4/6 && square.currentPosition < cubeSizeT*5/6 && NewSquare.currentPosition >= cubeSizeT*2/6 && NewSquare.currentPosition < cubeSizeT*3/6) || // top - left
             (square.currentPosition >= cubeSizeT*2/6 && square.currentPosition < cubeSizeT*3/6 && NewSquare.currentPosition >= cubeSizeT*5/6 && NewSquare.currentPosition < cubeSizeT) || // left - bottom
             (square.currentPosition >= cubeSizeT*3/6 && square.currentPosition < cubeSizeT*4/6 && NewSquare.currentPosition >= cubeSizeT*4/6 && NewSquare.currentPosition < cubeSizeT*5/6))   // right - top
    {
        for (var i = 0; i < 2; i++) 
        {
            rDirection = rDirection - 1;
            if (rDirection === -1)
                rDirection = 7;
        }
    }


    switch (direction)
    {
        case 0:

            NewSquare2 = cubeBoard[square.topPosition];

            break;
        case 1:

            NewSquare2 = cubeBoard[square.topRightPosition];

            break;
        case 2:

            NewSquare2 = cubeBoard[square.rightPosition];

            break;
        case 3:

            NewSquare2 = cubeBoard[square.bottomRightPosition];

            break;
        case 4:

            NewSquare2 = cubeBoard[square.bottomPosition];

            break;
        case 5:

            NewSquare2 = cubeBoard[square.bottomLeftPosition];

            break;
        case 6:

            NewSquare2 = cubeBoard[square.leftPosition];

            break;
        case 7:

            NewSquare2 = cubeBoard[square.topLeftPosition];

            break;
        default:
            break;
    }


    return NewSquare2;


}



function convertToLength(direction, square){
        
    var tempLengthReturn = 0;
    switch (direction)
    {
        case 0:
            tempLengthReturn = square.lengthTopPosition;
            break;
        case 1:
            tempLengthReturn = square.lengthTopRightPosition;
            break;
        case 2:
            tempLengthReturn = square.lengthRightPosition;
            break;
        case 3:
            tempLengthReturn = square.lengthBottomRightPosition;
            break;
        case 4:
            tempLengthReturn = square.lengthBottomPosition;
            break;
        case 5:
            tempLengthReturn = square.lengthBottomLeftPosition;
            break;
        case 6:
            tempLengthReturn = square.lengthLeftPosition;
            break;
        case 7:
            tempLengthReturn = square.lengthTopLeftPosition;
            break;
        default:
            break;
    }

    return tempLengthReturn;

}



function selectInitialSquare(index){
        
    wordSelectMarkers[index] = 1;

    selectedCubeSquares.length = 0;
    nonSelectedCubeSquares.length = 0;

    var initialSquare = cubeBoard[index];

    selectedCubeSquares.push(initialSquare);

    firstTouchMarker = index;
    currentTouchMarker = index;

}




function highlightLetter(index, hideSelectionMarker){
        
    vertexBufferTextures[index] = vertexBufferTexturesRed[index]; //switch Letter

    vertexBufferTexturesTileGrid[index] = reverseTileGrid;  //switch Tile Grid
    
    
    for(var i = 0; i < tileTextureObjects.length; i++){
        var temp = tileTextureObjects[i];
        if (temp === index) {
            tileTextureObjects.splice(i, 1);
            break;
        }
    }
    reverseTileGridObjects.push(index);

    
    var letterSquare = cubeBoard[index];
    var letter = letterSquare.squareLetter;
    if (letter === "A") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_A_Objects, letter_A_Objects, index);
        }
        else{
            switchLetters(letter_A_Objects, flippedLetter_A_Objects, index);
        }
    }
    else if (letter === "B") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_B_Objects, letter_B_Objects, index);
        }
        else{
            switchLetters(letter_B_Objects, flippedLetter_B_Objects, index);
        }
    }
    else if (letter === "C") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_C_Objects, letter_C_Objects, index);
        }
        else{
            switchLetters(letter_C_Objects, flippedLetter_C_Objects, index);
        }
    }
    else if (letter === "D") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_D_Objects, letter_D_Objects, index);
        }
        else{
            switchLetters(letter_D_Objects, flippedLetter_D_Objects, index);
        }
    }
    else if (letter === "E") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_E_Objects, letter_E_Objects, index);
        }
        else{
            switchLetters(letter_E_Objects, flippedLetter_E_Objects, index);
        }
    }
    else if (letter === "F") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_F_Objects, letter_F_Objects, index);
        }
        else{
            switchLetters(letter_F_Objects, flippedLetter_F_Objects, index);
        }
    }
    else if (letter === "G") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_G_Objects, letter_G_Objects, index);
        }
        else{
            switchLetters(letter_G_Objects, flippedLetter_G_Objects, index);
        }
    }
    else if (letter === "H") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_H_Objects, letter_H_Objects, index);
        }
        else{
            switchLetters(letter_H_Objects, flippedLetter_H_Objects, index);
        }
    }
    else if (letter === "I") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_I_Objects, letter_I_Objects, index);
        }
        else{
            switchLetters(letter_I_Objects, flippedLetter_I_Objects, index);
        }
    }
    else if (letter === "J") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_J_Objects, letter_J_Objects, index);
        }
        else{
            switchLetters(letter_J_Objects, flippedLetter_J_Objects, index);
        }
    }
    else if (letter === "K") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_K_Objects, letter_K_Objects, index);
        }
        else{
            switchLetters(letter_K_Objects, flippedLetter_K_Objects, index);
        }
    }
    else if (letter === "L") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_L_Objects, letter_L_Objects, index);
        }
        else{
            switchLetters(letter_L_Objects, flippedLetter_L_Objects, index);
        }
    }
    else if (letter === "M") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_M_Objects, letter_M_Objects, index);
        }
        else{
            switchLetters(letter_M_Objects, flippedLetter_M_Objects, index);
        }
    }
    else if (letter === "N") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_N_Objects, letter_N_Objects, index);
        }
        else{
            switchLetters(letter_N_Objects, flippedLetter_N_Objects, index);
        }
    }
    else if (letter === "O") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_O_Objects, letter_O_Objects, index);
        }
        else{
            switchLetters(letter_O_Objects, flippedLetter_O_Objects, index);
        }
    }
    else if (letter === "P") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_P_Objects, letter_P_Objects, index);
        }
        else{
            switchLetters(letter_P_Objects, flippedLetter_P_Objects, index);
        }
    }
    else if (letter === "Q") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_Q_Objects, letter_Q_Objects, index);
        }
        else{
            switchLetters(letter_Q_Objects, flippedLetter_Q_Objects, index);
        }
    }
    else if (letter === "R") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_R_Objects, letter_R_Objects, index);
        }
        else{
            switchLetters(letter_R_Objects, flippedLetter_R_Objects, index);
        }
    }
    else if (letter === "S") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_S_Objects, letter_S_Objects, index);
        }
        else{
            switchLetters(letter_S_Objects, flippedLetter_S_Objects, index);
        }
    }
    else if (letter === "T") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_T_Objects, letter_T_Objects, index);
        }
        else{
            switchLetters(letter_T_Objects, flippedLetter_T_Objects, index);
        }
    }
    else if (letter === "U") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_U_Objects, letter_U_Objects, index);
        }
        else{
            switchLetters(letter_U_Objects, flippedLetter_U_Objects, index);
        }
    }
    else if (letter === "V") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_V_Objects, letter_V_Objects, index);
        }
        else{
            switchLetters(letter_V_Objects, flippedLetter_V_Objects, index);
        }
    }
    else if (letter === "W") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_W_Objects, letter_W_Objects, index);
        }
        else{
            switchLetters(letter_W_Objects, flippedLetter_W_Objects, index);
        }
    }
    else if (letter === "X") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_X_Objects, letter_X_Objects, index);
        }
        else{
            switchLetters(letter_X_Objects, flippedLetter_X_Objects, index);
        }
    }
    else if (letter === "Y") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_Y_Objects, letter_Y_Objects, index);
        }
        else{
            switchLetters(letter_Y_Objects, flippedLetter_Y_Objects, index);
        }
    }
    else if (letter === "Z") {
        if(sceneController.cubeColorKey === "Inverse"){
            switchLetters(flippedLetter_Z_Objects, letter_Z_Objects, index);
        }
        else{
            switchLetters(letter_Z_Objects, flippedLetter_Z_Objects, index);
        }
    }



    if (sceneController.wordHintWords.length === 0)
    {
        if (hideSelectionMarker)
        {
            wordSelectMarkers[index] = 0;
            wordSelectMarkers2[index] = 0;
        }
    }

}



function switchLetters(first, second, index){
    
    for(var i = 0; i < first.length; i++){
        var temp1 = first[i];
        if (temp1 === index) {
            first.splice(i, 1);
            break;
        }
    }
    second.push(index);
    
}



function secondCheck(){

    var selectedCS = "";
    var selectedCSBackwards = "";

    for (var i = 0; i < selectedCubeSquares.length; i++)
    {
        var ltr = selectedCubeSquares[i];
        selectedCS = selectedCS + ltr.squareLetter;
        selectedCSBackwards = ltr.squareLetter + selectedCSBackwards;
    }
    

    var wordMatch = false;
    for (var i = 0; i < wordListSortedByLength.length; i++)
    {
        var str = wordListSortedByLength[i];

        if (selectedCS === str.wordName || selectedCSBackwards === str.wordName)
        {
            var iLetter;
            var eLetter;
            iLetter = selectedCubeSquares[0];
            eLetter = selectedCubeSquares[selectedCubeSquares.length - 1];

            if ((str.firstLetterSquare === iLetter.currentPosition && str.lastLetterSquare === eLetter.currentPosition) ||
                (str.firstLetterSquare === eLetter.currentPosition && str.lastLetterSquare === iLetter.currentPosition))
            {

                return wordMatch;
            }

        }
    }

    

    for (var j = 0; j < wordListSortedByLength.length; j++)
    {  
        var str = wordListSortedByLength[j];
        if (selectedCS === str.wordName || selectedCSBackwards === str.wordName)
        {

            var iLetter = selectedCubeSquares[0]; // never used
            var eLetter = selectedCubeSquares[0]; // never used
            if (str.wordLength === selectedCubeSquares.length)
            {
                for (var i = 0; i < str.wordLength; i++)
                {
                    iLetter = selectedCubeSquares[i];
                    eLetter = selectedCubeSquares[selectedCubeSquares.length - 1 - i];
                    if (checkEqualLetters(str.allLetters[i], iLetter.squareLetter) || checkEqualLetters(str.allLetters[i], eLetter.squareLetter))
                    {
                        wordMatch = true;

                    }
                    else
                    {
                        wordMatch = false;

                        break;
                    }
                }

            }
            else
            {
                wordMatch = false;

            }


            if (wordMatch)
            {
                if (!str.hideHiddenWord)
                {

                    if (str.wordFound)
                    {
                        iLetter = selectedCubeSquares[0];
                        eLetter = selectedCubeSquares[selectedCubeSquares.length - 1];

                        var tempWord = new WordListObject();

                        tempWord.wordName = str.wordName;
                        tempWord.wordDisplayName = str.wordDisplayName;
                        tempWord.wordLength = str.wordLength;
                        tempWord.firstLetterSquare = iLetter.currentPosition;
                        tempWord.lastLetterSquare = eLetter.currentPosition;

                        var tAllLetters = new Array();
                        var tAllSquares = new Array();
                        for (var i = 0; i < selectedCubeSquares.length; i++)
                        {
                            var tempL = selectedCubeSquares[i];
                            tAllLetters.push(tempL.squareLetter);
                            tAllSquares.push(tempL);
                        }
                        tempWord.allLetters = tAllLetters;
                        tempWord.allSquares = tAllSquares;

                        tempWord.wordFound = false;
                        tempWord.wordPlacedScrollView = str.wordPlacedScrollView;
                        tempWord.wordStrikedScrollView = str.wordStrikedScrollView;
                        tempWord.wordHint = str.wordHint;
                        tempWord.messageDisplayed = str.messageDisplayed;
                        tempWord.alphabetQuestHiddenWord = false;
                        tempWord.hideHiddenWord = false;

                        wordListSortedByLength.push(tempWord);

                    }
                    else
                    {

                        str.firstLetterSquare = iLetter.currentPosition;
                        str.lastLetterSquare = eLetter.currentPosition;

                        var tAllSquares = new Array();

                        for (var i = 0; i < selectedCubeSquares.length; i++)
                        {
                            tempL = selectedCubeSquares[i];
                            tAllSquares.push(tempL);
                        }
                        str.allSquares = tAllSquares;

                    }

                }

                break;
            }
        }

    } //for

    return wordMatch;
}




function checkEqualLetters( firstLetter, secondLetter){
        
    return (firstLetter === secondLetter);
    
}




function cubeOrientation() {

    mat4.copy(currentTransform, mvMatrix);

    var totalRotation = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (totalRotation === 0) {


    }
    else {

        xcoord = ((deltaX / totalRotation) * currentTransform[1] + (deltaY / totalRotation) * currentTransform[0]);
        ycoord = ((deltaX / totalRotation) * currentTransform[5] + (deltaY / totalRotation) * currentTransform[4]);
        zcoord = ((deltaX / totalRotation) * currentTransform[9] + (deltaY / totalRotation) * currentTransform[8]);

        var rVector = vec3.fromValues(xcoord, ycoord, zcoord);
        vec3.normalize(rVector, rVector);

        mat4.rotate(mvMatrix, currentTransform, totalRotation * Math.PI / 180, rVector);

    }

    AdjustLetterRotation();

}


function AdjustLetterRotation() {

    var temp = mat4.clone(currentTransform);

    var ct0 = 1.0 * temp[0];
    var ct1 = 1.0 * temp[1];
    var ct4 = 1.0 * temp[4];
    var ct5 = 1.0 * temp[5];

    //document.getElementById('xcoord').innerHTML = "CT0: " + ct0;
    //document.getElementById('ycoord').innerHTML = "CT1: " + ct1;
    //document.getElementById('xcoord2').innerHTML = "CT4: " + ct4;
    //document.getElementById('ycoord2').innerHTML = "CT5: " + ct5;

    letterAngleZ = (Math.atan(ct4 / ct5));
    if (ct4 < 0 && ct5 > 0)
    {
        textureFlipped0 = false;
    }
    else if (ct4 < 0 && ct5 < 0)
    {
        textureFlipped0 = true;
    }
    else if (ct4 > 0 && ct5 > 0)
    {
        textureFlipped0 = false;
    }
    else if (ct4 > 0 && ct5 < 0)
    {
        textureFlipped0 = true;
    }

    letterAngleY = (Math.atan(ct0 / ct1));
    
    if (ct0 < 0 && ct1 > 0)
    {
        textureFlipped1 = false;
    }
    else if (ct0 < 0 && ct1 < 0)
    {
        textureFlipped1 = true;
    }
    else if (ct0 > 0 && ct1 > 0)
    {
        textureFlipped1 = false;
    }
    else if (ct0 > 0 && ct1 < 0)
    {
        textureFlipped1 = true;
    }

}




function letterBounds(index)
{
    
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


    var temp0 = vec4.fromValues(test[0], test[1], test[2], test[3]);
    var temp1 = vec4.fromValues(test[0 + 12], test[1 + 12], test[2 + 12], test[3 + 12]);
    var temp2 = vec4.fromValues(test[0 + 24], test[1 + 24], test[2 + 24], test[3 + 24]);
    var temp3 = vec4.fromValues(test[0 + 36], test[1 + 36], test[2 + 36], test[3 + 36]);
    var trans0 = vec4.create();
    var trans1 = vec4.create();
    var trans2 = vec4.create();
    var trans3 = vec4.create();
    

    // Model-View Matrix
    vec4.transformMat4(trans0, temp0, mvMatrix);
    vec4.transformMat4(trans1, temp1, mvMatrix);
    vec4.transformMat4(trans2, temp2, mvMatrix);
    vec4.transformMat4(trans3, temp3, mvMatrix);

    // Projection Matrix
    vec4.transformMat4(temp0, trans0, pMatrix);
    vec4.transformMat4(temp1, trans1, pMatrix);
    vec4.transformMat4(temp2, trans2, pMatrix);
    vec4.transformMat4(temp3, trans3, pMatrix);

    // Perspective Transform x/w, y/w, z/w
    var persp0 = vec3.fromValues(temp0[0] / temp0[3], temp0[1] / temp0[3], temp0[2] / temp0[3]);
    var persp1 = vec3.fromValues(temp1[0] / temp1[3], temp1[1] / temp1[3], temp1[2] / temp1[3]);
    var persp2 = vec3.fromValues(temp2[0] / temp2[3], temp2[1] / temp2[3], temp2[2] / temp2[3]);
    var persp3 = vec3.fromValues(temp3[0] / temp3[3], temp3[1] / temp3[3], temp3[2] / temp3[3]);

    // Viewport Transform
    var widthT = gl.viewportWidth;
    var heightT = gl.viewportHeight;

    var viewpt0 = vec3.fromValues((widthT * (persp0[0] + 1)) / 2, heightT - (heightT * (persp0[1] + 1)) / 2, (persp0[2] + 1) / 2);
    var viewpt1 = vec3.fromValues((widthT * (persp1[0] + 1)) / 2, heightT - (heightT * (persp1[1] + 1)) / 2, (persp1[2] + 1) / 2);
    var viewpt2 = vec3.fromValues((widthT * (persp2[0] + 1)) / 2, heightT - (heightT * (persp2[1] + 1)) / 2, (persp2[2] + 1) / 2);
    var viewpt3 = vec3.fromValues((widthT * (persp3[0] + 1)) / 2, heightT - (heightT * (persp3[1] + 1)) / 2, (persp3[2] + 1) / 2);

    

    var xMin, yMin, xMax, yMax, zMin, zMax;
    xMin = viewpt0[0];
    yMin = viewpt0[1];
    zMin = viewpt0[2];
    xMax = viewpt0[0];
    yMax = viewpt0[1];
    zMax = viewpt0[2];

    if (xMin > viewpt1[0])
        xMin = viewpt1[0];
    if (xMin > viewpt2[0])
        xMin = viewpt2[0];
    if (xMin > viewpt3[0])
        xMin = viewpt3[0];
    if (xMax < viewpt1[0])
        xMax = viewpt1[0];
    if (xMax < viewpt2[0])
        xMax = viewpt2[0];
    if (xMax < viewpt3[0])
        xMax = viewpt3[0];

    if (yMin > viewpt1[1])
        yMin = viewpt1[1];
    if (yMin > viewpt2[1])
        yMin = viewpt2[1];
    if (yMin > viewpt3[1])
        yMin = viewpt3[1];
    if (yMax < viewpt1[1])
        yMax = viewpt1[1];
    if (yMax < viewpt2[1])
        yMax = viewpt2[1];
    if (yMax < viewpt3[1])
        yMax = viewpt3[1];

    if (zMin > viewpt1[2])
        zMin = viewpt1[2];
    if (zMin > viewpt2[2])
        zMin = viewpt2[2];
    if (zMin > viewpt3[2])
        zMin = viewpt3[2];
    if (zMax < viewpt1[2])
        zMax = viewpt1[2];
    if (zMax < viewpt2[2])
        zMax = viewpt2[2];
    if (zMax < viewpt3[2])
        zMax = viewpt3[2];

    if (sceneController.cubeSize === 150) // 5x5
    {
        zMax = (zMax + zMin) / 2;
    }
    else if (sceneController.cubeSize === 216 || sceneController.cubeSize === 96) // 6x6 4x4
    {
        zMax = viewpt3[2];
    }
    
    

    var lengthFactor;
    var angleFactor = 0.0;

    if (index > 0 && index < sceneController.cubeSize * 1 / 6)
    {
        angleFactor = letterAngleY;
        if (sideActive[0])
            zMax = 0.0;
        else
            zMax = 1.0;
    }
    else if (index > sceneController.cubeSize * 1 / 6 && index < sceneController.cubeSize * 2 / 6)
    {
        angleFactor = letterAngleY;
        if (sideActive[1])
            zMax = 0.0;
        else
            zMax = 1.0;
    }
    else if (index > sceneController.cubeSize * 2 / 6 && index < sceneController.cubeSize * 3 / 6)
    {
        angleFactor = letterAngleY;
        if (sideActive[2])
            zMax = 0.0;
        else
            zMax = 1.0;
    }
    else if (index > sceneController.cubeSize * 3 / 6 && index < sceneController.cubeSize * 4 / 6)
    {
        angleFactor = letterAngleY;
        if (sideActive[3])
            zMax = 0.0;
        else
            zMax = 1.0;
    }
    else if (index > sceneController.cubeSize * 4 / 6 && index < sceneController.cubeSize * 5 / 6)
    {
        angleFactor = letterAngleZ;
        if (sideActive[4])
            zMax = 0.0;
        else
            zMax = 1.0;
    }
    else if (index > sceneController.cubeSize * 5 / 6 && index < sceneController.cubeSize)
    {
        angleFactor = letterAngleZ;
        if (sideActive[5])
            zMax = 0.0;
        else
            zMax = 1.0;
    }

    var letterBoundBox;
    var xBox;
    var yBox;
    var wBox;
    var hBox;

    if (zMax < 0.5)
    {
        if (index === 0)
        {
            sideActive[0] = true;
            angleFactor = letterAngleY;
            
        }
        else if (index === sceneController.cubeSize * 1 / 6)
        {
            sideActive[1] = true;
            angleFactor = letterAngleY;
        }
        else if (index === sceneController.cubeSize * 2 / 6)
        {
            sideActive[2] = true;
            angleFactor = letterAngleY;
        }
        else if (index === sceneController.cubeSize * 3 / 6)
        {
            sideActive[3] = true;
            angleFactor = letterAngleY;
        }
        else if (index === sceneController.cubeSize * 4 / 6)
        {
            sideActive[4] = true;
            angleFactor = letterAngleZ;
        }
        else if (index === sceneController.cubeSize * 5 / 6)
        {
            sideActive[5] = true;
            angleFactor = letterAngleZ;
        }


        if (angleFactor * 180 / Math.PI >= -45.0 && angleFactor * 180 / Math.PI <= 45.0)
        {
            lengthFactor = (Math.cos(Math.abs(angleFactor)) / Math.sqrt(2.0));
        }
        else
        {
            lengthFactor = (Math.sin(Math.abs(angleFactor)) / Math.sqrt(2.0));
        }

        xBox = (xMin + (xMax - xMin) * (1.0 - lengthFactor) / 2);
        yBox = (yMin + (yMax - yMin) * (1.0 - lengthFactor) / 2);

        wBox = ((xMax - xMin) * lengthFactor);
        hBox = ((yMax - yMin) * lengthFactor);

        letterBoundBox = new Rectangle(xBox, yBox, wBox, hBox);
        
    }
    else
    {
        if (index === 0)
            sideActive[0] = false;
        else if (index === sceneController.cubeSize * 1 / 6)
            sideActive[1] = false;
        else if (index === sceneController.cubeSize * 2 / 6)
            sideActive[2] = false;
        else if (index === sceneController.cubeSize * 3 / 6)
            sideActive[3] = false;
        else if (index === sceneController.cubeSize * 4 / 6)
            sideActive[4] = false;
        else if (index === sceneController.cubeSize * 5 / 6)
            sideActive[5] = false;

        letterBoundBox = new Rectangle(0.0, 0.0, 0.0, 0.0);
        
    }


    return letterBoundBox;

}