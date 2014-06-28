/*
Copyright 2014 JWACK APPS
All rights reserved
jwackapps.com
Created by Andrew B. Kiger
ajkiger@gmail.com
*/


var cObject;
var cubeBoard;
var cLImage;
var wordListString;
var wordListSortedByLength = new Array();
var wordList = new Array();

var badCube;
var wordFit;
var rDirection;
var wordFitSquare;
var wordFitDirection;

var particleEmitterYellow;
var particleEmitterRed;
var particleEmitterBlue;
var particleEmitterBlack;

var secondTime;

var lastParticle;

var starTimer1;
var starTimer2;
var starString;
var numberStars = 3;


var textureChangedX;

var postScoreNow;
var priorScore;

var totalPoints;
var levelHighScore;

var sceneController;


function sceneControllerInit(){
    sceneController = new Object();
    
    sceneController.totalLetteronCube = 0;
    sceneController.iGameScore = 0;
    sceneController.giveUpOnHiddenWord = false;
    sceneController.gameOver = false;
    sceneController.wordHintWords = new Array();
    sceneController.postGameWinMessage = false;

    sceneController.stopCubeSceneObject = false;
    sceneController.solveCube = false;
    sceneController.endAnimationActive = false;
    sceneController.stopCubeSceneObject = false;
    
    sceneController.cubeSize = null;
    sceneController.preCubeSize = null;
    sceneController.cubeSizeCount = 1;
    sceneController.cubeColorKey = "Normal";  // "Normal"  "Inverse"
    sceneController.maxWordKey = "Low Word Density";  // "Low Word Density"  "High Word Density"
    sceneController.wordListPlay = null;
    sceneController.currentGame = null;
    sceneController.todayDate = getTodaysDate();
    secondTime = " First";
    
    //yellowStarTexture = loadTexture("images/particle-yellow12-atlas.png");
    //redStarTexture = loadTexture("images/particle-red12-atlas.png");
    //blueStarTexture = loadTexture("images/particle-blue12-atlas.png");
    //blackStarTexture = loadTexture("images/particle-black12-atlas.png");
    //allLettersTexture = loadTexture("images/LettersTA1024x1024.png");
    
    
    textureChangedX = true;
    
    postScoreNow = false;
    
    // Load weekly lists
    //loadWordList("wordlists/MonthlyIput.txt");
    /*
    wordListString = preload2.getResult("list0");
    weeklyLists = wordListString.split("\n");
    
    for(var i = 0; i < weeklyLists.length; i=i+3){
        var tableElement = new TableRowObject();
        tableElement.init();
        tableElement.date = weeklyLists[i];
        tableElement.cubeSize = weeklyLists[i+1];
        tableElement.wordList = weeklyLists[i+2];
        weeklyWordLists.push(tableElement);
    }
    
    // get current date plus last 14 days of puzzles
    for(var i = weeklyWordLists.length - 1; i >= 0; i=i-1){
        var checkGame = weeklyWordLists[i];
        if(checkGame.date === sceneController.todayDate){
            
            break;
        }
        else
        {
            weeklyWordLists.pop();
        }
    }
    if(weeklyWordLists.length > 13){
        var rCount = weeklyWordLists.length - 13;
        for(var i = 0; i < rCount; i++){
            weeklyWordLists.splice(0,1);
        }
    }
    var tempRowArray = new Array();
    var tLength = weeklyWordLists.length;
    for(var i = 0; i < tLength; i++){
        var tempE = weeklyWordLists.pop();
        tempRowArray.push(tempE);
    }
    weeklyWordLists = tempRowArray;
    */
    var firstGame = null;
    if(!(weeklyWordLists.length === 0)){
        firstGame = weeklyWordLists[0];
    }
    
    if(firstGame !== null && firstGame.date === sceneController.todayDate){

        sceneController.currentGame = firstGame.date;
        sceneController.wordListPlay = "wordlists/" + firstGame.wordList;
        if (firstGame.cubeSize === "4x4"){
            sceneController.cubeSize = 96;
            sceneController.preCubeSize = 96;
        }
        else if (firstGame.cubeSize === "5x5"){
            sceneController.cubeSize = 150;
            sceneController.preCubeSize = 150;
        }
        else if (firstGame.cubeSize === "6x6"){
            sceneController.cubeSize = 216;
            sceneController.preCubeSize = 216;
        }

    }
    else // default game
    {
        sceneController.currentGame = null;
        sceneController.wordListPlay = "wordlists/Fruit.txt";
        sceneController.cubeSize = 96;
        sceneController.preCubeSize = 96;
    }
    
    
    // Retrieve local storage
    LoadScores();
    if(typeof(Storage)!=="undefined"){
        localStorage.clear();
    }
    SaveScores();
    
    //document.getElementById('agentdisplay').innerHTML = agent;
    
    
}

      

function updateGameScore(score){
    
    if (!sceneController.solveCube) {

        sceneController.iGameScore = sceneController.iGameScore + score;
        document.getElementById('scorebox').innerHTML = sceneController.iGameScore;

        
        var totalLetters = sceneController.totalLetteronCube;
        var gamePercentage = sceneController.iGameScore / (totalLetters * 30) * 100;

        gamePercentage = parseFloat(Math.round(gamePercentage * 100) / 100).toFixed(0);
        if (sceneController.iGameScore > 0) {
            document.getElementById('scoreratebox').innerHTML = gamePercentage + "%";
        }
        
    }
    else
    {
        sceneController.iGameScore = sceneController.iGameScore - score;

        var totalLetters = sceneController.totalLetteronCube;
        var gamePercentage = sceneController.iGameScore / (totalLetters * 30) * 100;

        gamePercentage = parseFloat(Math.round(gamePercentage * 100) / 100).toFixed(0);
        if (sceneController.iGameScore <= 0) {
            document.getElementById('scorebox').innerHTML = "&nbsp&nbsp";
            document.getElementById('scoreratebox').innerHTML = "&nbsp&nbsp";
        }
        else
        {
            document.getElementById('scorebox').innerHTML = sceneController.iGameScore;
            document.getElementById('scoreratebox').innerHTML = gamePercentage + "%";
        }

    }

}



function  resetGameScore(){
    
    clearTimeout(starTimer1);
    clearTimeout(starTimer2);
    
    if(isiOSMobile){
        
        if(!(numberStars === 3)){
            numberStars = 3;
            document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" alt=\"Blue\" title=\" 3 Stars/Letter \">";
            //document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" width=\"50\" height=\"50\" alt=\"Blue\" title=\" 3 Stars/Letter \"><label id=\"contextStatus\" >&nbsp;</label>";

            var gStar = document.getElementById('starimage');
            gStar.style.width = (50 * tempScale) + "px";
            gStar.style.height = (50 * tempScale) + "px";
        }

        document.getElementById('scorebox').innerHTML = "&nbsp&nbsp";
        document.getElementById('scoreratebox').innerHTML = "&nbsp&nbsp";
        
    }
    else{
        
        if(!(numberStars === 3)){
            $("#starbox").effect("fade", function() {
                numberStars = 3;
                document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" alt=\"Blue\" title=\" 3 Stars/Letter \">";
                //document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" width=\"50\" height=\"50\" alt=\"Blue\" title=\" 3 Stars/Letter \"><label id=\"contextStatus\" >&nbsp;</label>";

                var gStar = document.getElementById('starimage');
                gStar.style.width = (50 * tempScale) + "px";
                gStar.style.height = (50 * tempScale) + "px";

                //$("#starbox").show({effect: "fade", duration: 300});
                $("#starbox").show({effect: "fade"});
            }); 
        }

        $("#scorebox").effect("fade", function() {

            document.getElementById('scorebox').innerHTML = "&nbsp&nbsp";

            //$("#scorebox").show({effect: "fade", duration: 300});
            $("#scorebox").show({effect: "fade"});

        });

        $("#scoreratebox").effect("fade", function() {

            document.getElementById('scoreratebox').innerHTML = "&nbsp&nbsp";

            //$("#scoreratebox").show({effect: "fade", duration: 300});
            $("#scoreratebox").show({effect: "fade"});

        });
        
    }
    
}

 
   
function updateScoreStar(stars){
    
    var tempStar = $("#starbox");
    
    if(isiOSMobile){
        
        executeUpdateScoreStar(stars);
    }
    else{
        
        tempStar.effect("fade", function() {

            executeUpdateScoreStar(stars);

        }); 

        //tempStar.show({effect: "fade", duration: 300});
        tempStar.show({effect: "fade"});
        
    }
    
}

function executeUpdateScoreStar(stars){
    
    switch (stars) {
        case "BlueStars":
            numberStars = 3;
            document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" alt=\"Blue\" title=\" 3 Stars/Letter \">";
            //document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" width=\"50\" height=\"50\" alt=\"Blue\" title=\" 3 Stars/Letter \"><label id=\"contextStatus\" >&nbsp;</label>";
            break;
        case "RedStars":
            numberStars = 2;
            document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/redStar40x40.png\" alt=\"Red\" title=\" 2 Stars/Letter \">";
            //document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/redStar40x40.png\" width=\"50\" height=\"50\" alt=\"Red\" title=\" 2 Stars/Letter \"><label id=\"contextStatus\" >&nbsp;</label>";

            break;
        case "YellowStars":
            numberStars = 1;
            document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/yellowStar40x40.png\" alt=\"Yellow\" title=\" 1 Star/Letter \">";
            //document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/yellowStar40x40.png\" width=\"50\" height=\"50\" alt=\"Yellow\" title=\" 1 Star/Letter \"><label id=\"contextStatus\" >&nbsp;</label>";

            break;
    }

    var gStar = document.getElementById('starimage');
    gStar.style.width = (50 * tempScale) + "px";
    gStar.style.height = (50 * tempScale) + "px";
    
}




function endOldStartNewGame(){
     
    //cObject.tearDownCube();
    //cLImage.tearDownLetterImage();

    cObject = null;
    cLImage = null;
    particleEmitterYellow = null;
    particleEmitterRed = null;
    particleEmitterBlue = null;
    particleEmitterBlack = null;

    cubeBoard.length = 0;
    wordList.length = 0;
    wordListSortedByLength.length = 0;

    sceneController.totalLetteronCube = 0;
    sceneController.iGameScore = 0;
    sceneController.giveUpOnHiddenWord = false;
    sceneController.gameOver = false;

    resetGameScore();

    sceneController.wordHintWords.length = 0;
    sceneController.solveCube = false;
    
    secondTime = " Second";
    sceneControllerLoadScene();
    
    
    
    
}



function sceneControllerLoadScene(){
    
    lastParticle = false;
    priorScore = 0;
    sceneController.postGameWinMessage = false;
    sceneController.cubeSize = sceneController.preCubeSize;
    document.getElementById('scorebox').innerHTML = "&nbsp&nbsp";
    document.getElementById('scoreratebox').innerHTML = "&nbsp&nbsp";
    //document.getElementById('scorebox').innerHTML = "99999";
    //document.getElementById('scoreratebox').innerHTML = "100%";
    
    cubeBoard = new Array();
    setupCube();
    
    cObject = new Object();
    CubeObjectInit();
    CubeObjectAwake();
    
    cLImage = new ActiveLetterImage();
    cLImage.awakeNow();
    
    particleEmitterYellow = new ParticleSystem();
    particleEmitterYellow.init();
    particleEmitterYellow.emissionRangeN = new BBRangeMake(1.0, 0.0);
    containerScale = true;
    var starScale = 30.0;// * tempScale;
    particleEmitterYellow.sizeRangeN = new BBRangeMake(starScale, 0.0);
    particleEmitterYellow.xVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterYellow.yVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterYellow.zVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterYellow.growRangeN = new BBRangeMake(-0.8, 0.5);
    particleEmitterYellow.pType = 0;
    particleEmitterYellow.lifeRangeN = new BBRangeMake(2.0, 0.0);
    particleEmitterYellow.decayRangeN = new BBRangeMake(0.03, 0.05);
    particleEmitterYellow.emitPosition = new BBPointMake(0.0, 0.0, 0.0);
    particleEmitterYellow.setParticleX(yellowStarTexture);
    particleEmitterYellow.emitCounter = 0;
    particleEmitterYellow.emit = false;
    particleEmitterYellow.awake();
    
    particleEmitterRed = new ParticleSystem();
    particleEmitterRed.init();
    particleEmitterRed.emissionRangeN = new BBRangeMake(1.0, 0.0);
    particleEmitterRed.sizeRangeN = new BBRangeMake(starScale, 0.0);
    particleEmitterRed.xVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterRed.yVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterRed.zVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterRed.growRangeN = new BBRangeMake(-0.8, 0.5);
    particleEmitterRed.pType = 0;
    particleEmitterRed.lifeRangeN = new BBRangeMake(2.0, 0.0);
    particleEmitterRed.decayRangeN = new BBRangeMake(0.03, 0.05);
    particleEmitterRed.emitPosition = new BBPointMake(0.0, 0.0, 0.0);
    particleEmitterRed.setParticleX(redStarTexture);
    particleEmitterRed.emitCounter = 0;
    particleEmitterRed.emit = false;
    particleEmitterRed.awake();
    
    particleEmitterBlue = new ParticleSystem();
    particleEmitterBlue.init();
    particleEmitterBlue.emissionRangeN = new BBRangeMake(1.0, 0.0);
    particleEmitterBlue.sizeRangeN = new BBRangeMake(starScale, 0.0);
    particleEmitterBlue.xVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterBlue.yVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterBlue.zVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterBlue.growRangeN = new BBRangeMake(-0.8, 0.5);
    particleEmitterBlue.pType = 0;
    particleEmitterBlue.lifeRangeN = new BBRangeMake(2.0, 0.0);
    particleEmitterBlue.decayRangeN = new BBRangeMake(0.03, 0.05);
    particleEmitterBlue.emitPosition = new BBPointMake(0.0, 0.0, 0.0);
    particleEmitterBlue.setParticleX(blueStarTexture);
    particleEmitterBlue.emitCounter = 0;
    particleEmitterBlue.emit = false;
    particleEmitterBlue.awake();
    
    particleEmitterBlack = new ParticleSystem();
    particleEmitterBlack.init();
    particleEmitterBlack.emissionRangeN = new BBRangeMake(1.0, 0.0);
    particleEmitterBlack.sizeRangeN = new BBRangeMake(starScale, 0.0);
    particleEmitterBlack.xVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterBlack.yVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterBlack.zVelocityRangeN = new BBRangeMake(-1.0, 2.0);
    particleEmitterBlack.growRangeN = new BBRangeMake(-0.8, 0.5);
    particleEmitterBlack.pType = 4;
    particleEmitterBlack.lifeRangeN = new BBRangeMake(2.0, 0.0);
    particleEmitterBlack.decayRangeN = new BBRangeMake(0.03, 0.05);
    particleEmitterBlack.emitPosition = new BBPointMake(0.0, 0.0, 0.0);
    particleEmitterBlack.setParticleX(blackStarTexture);
    particleEmitterBlack.emitCounter = 0;
    particleEmitterBlack.emit = false;
    particleEmitterBlack.awake();
    
    sceneController.endAnimationActive = false;
    sceneController.stopCubeSceneObject = false;
    
    
    if(iWinConsole){
        
        
        var tempPoints;
        /*
        iConsole.game.getGameData(null).result( function ( resultData ) {
           tempPoints = resultData;
           var tttppp;
           if(tempPoints === null || tempPoints === undefined || tempPoints.length === 0 || isNaN(tempPoints)){
                tttppp = 0.0;
                document.getElementById('agentdisplay').innerHTML = "Score1: " + tttppp;
            }
            else{
                tttppp = parseInt(tempPoints);
                document.getElementById('agentdisplay').innerHTML = "Score2: " + tttppp;
            }
           
        } );
        */
       
        iConsole.game.getLevelData( { level: 4 } ).result( function ( resultData ) {
            tempPoints = resultData.data;
            tempPoints = tempPoints.replace(/"/g, ""); //remove all quotes
            
            //tempPoints = "06/05/14;2000;100%;06/04/14;1500;95%;06/03/14;180;55%;06/02/14; ; ;06/01/14; ; ;05/31/14;150;45%;05/30/14; ; ;05/29/14; ; ;05/28/14;240;62%;05/27/14; ; ;05/26/14; ; ;05/25/14; ; ;";
            //document.getElementById('agentdisplay2').innerHTML = "st: " + tempPoints;
            
            if(tempPoints === null || tempPoints === undefined || tempPoints.length === 0){
                
            }
            else{
                
                var tempPointsArray = tempPoints.split(";");
                
                var tempArray = new Array();
                for (var i = 0; i < tempPointsArray.length; i = i + 3){
                    var newElement = {
                        date: tempPointsArray[i],
                        highScore: tempPointsArray[i + 1],
                        scoreRate: tempPointsArray[i + 2]
                    };
                    tempArray.push(newElement);
                }
                
               
                for (var i = 0; i < weeklyWordLists.length; i++){
                    var tElement = weeklyWordLists[i];
                    
                    for (var j = 0; j < tempArray.length; j++){
                        var jElement = tempArray[j];
                        
                        if(tElement.date === jElement.date){
                            if(jElement.highScore !== null && tElement.highScore !== null){
                                if(jElement.highScore > tElement.highScore){
                                    tElement.highScore = jElement.highScore;
                                    tElement.scoreRate = jElement.scoreRate;
                                }
                            }
                            else if(jElement.highScore !== null && tElement.highScore === null){
                                tElement.highScore = jElement.highScore;
                                tElement.scoreRate = jElement.scoreRate;
                            }
                            break;
                        }
                        
                    }

                }

                
                
            }
        });
       
        iConsole.game.getLevelData( { level: 0 } ).result( function ( resultData ) {
            tempPoints = resultData.data;
            //document.getElementById('agentdisplay2').innerHTML = "st: " + tempPoints;
            if(tempPoints === null || tempPoints === undefined || tempPoints.length === 0 || isNaN(tempPoints)){
                totalPoints = 0.0;
                //document.getElementById('agentdisplay').innerHTML = "1: " + totalPoints;
            }
            else{
                totalPoints = parseInt(tempPoints);
                //document.getElementById('agentdisplay').innerHTML = "2: " + totalPoints;
            }
        });
        
        if (sceneController.cubeSize === 96)
        {
            iConsole.game.getLevelData( { level: 1 } ).result( function ( resultData ) {
                tempPoints = resultData.data;
                if(tempPoints === null || tempPoints === undefined || tempPoints.length === 0 || isNaN(tempPoints)){
                    levelHighScore = 0.0;
                    //document.getElementById('agentdisplay').innerHTML = "4x4 B: " + levelHighScore;
                }
                else{
                    levelHighScore = parseInt(tempPoints);
                    //document.getElementById('agentdisplay2').innerHTML = "4x4 L: " + levelHighScore;
                }
            } );
        }
        else if (sceneController.cubeSize === 150)
        {
            iConsole.game.getLevelData( { level: 2 } ).result( function ( resultData ) {
                tempPoints = resultData.data;
                if(tempPoints === null || tempPoints === undefined || tempPoints.length === 0 || isNaN(tempPoints)){
                
                    levelHighScore = 0.0;
                    //document.getElementById('agentdisplay').innerHTML = "5x5 B: " + levelHighScore;
                }
                else{
                    levelHighScore = parseInt(tempPoints);
                    //document.getElementById('agentdisplay2').innerHTML = "5x5 L: " + levelHighScore;
                }
            } );
        }
        else if (sceneController.cubeSize === 216)
        {
            iConsole.game.getLevelData( { level: 3 } ).result( function ( resultData ) {
                tempPoints = resultData.data;
                if(tempPoints === null || tempPoints === undefined || tempPoints.length === 0 || isNaN(tempPoints)){
                    levelHighScore = 0.0;
                    //document.getElementById('agentdisplay').innerHTML = "6x6 B: " + levelHighScore;
                }
                else{
                    levelHighScore = parseInt(tempPoints);
                    //document.getElementById('agentdisplay2').innerHTML = "6x6 L: " + levelHighScore;
                }
            } );
        }
        
    }
    
}



function sceneControllerUnloadScene(){
    
    sceneController.stopCubeSceneObject = true;
    
}

function SolveTheCube2(){
    alert("SolveTheCube");
}

function SolveTheCube(){
    $( "#popupHints" ).popup("close");
    sceneController.solveCube = true;
    //sceneController.gameOver = true;
    clearTimeout(starTimer1);
    clearTimeout(starTimer2);
    numberStars = 3;
    document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" alt=\"Blue\" title=\" 3 Stars/Letter \">";
    //document.getElementById('starbox').innerHTML = "<img id=\"starimage\" src=\"images/blueStar40x40.png\" width=\"50\" height=\"50\" alt=\"Blue\" title=\" 3 Stars/Letter \"><label id=\"contextStatus\" >&nbsp;</label>";
    
    var gStar = document.getElementById('starimage');
    gStar.style.width = (50 * tempScale) + "px";
    gStar.style.height = (50 * tempScale) + "px";
        
    solveCubeNow();
    
}



function ToggleInverse(){
    
    PlayBloop();
    
    var lStore;
    if($('#check2').prop('checked')){
        lStore = "Inverse";
    }
    else{
        lStore = "Normal";
    }
    
    if(typeof(Storage)!=="undefined")
    {    
        
        var lKey = "tInverse";
        localStorage.setItem(lKey, lStore);
    }
    
}



function ToggleDensity(){
    
    PlayBloop();
    
    var lStore;
    if($('#check1').prop('checked')){
        lStore = "High Word Density";
    }
    else{
        lStore = "Low Word Density";
    }
    
    if(typeof(Storage)!=="undefined")
    {    
        
        var lKey = "tDensity";
        localStorage.setItem(lKey, lStore);
    }
    
}



function ToggleMusic(){
    
    PlayBloop();
    var lStore;
    if(!soundTrack){
        //document.getElementById('agentdisplay').innerHTML = "Play Now";
        soundTrack = true;
        lStore = true;
        //soundTrack.play();
        SoundInstanceBM.resume();
    }
    else{
        //document.getElementById('agentdisplay').innerHTML = "Pause Now";
        soundTrack = false;
        lStore = false;
        //soundTrack.pause();
        SoundInstanceBM.pause();
        
    }
    
    if(typeof(Storage)!=="undefined")
    {    
        var lKey = "tMusic";
        localStorage.setItem(lKey, lStore);
    }
    
}


function ToggleSound(){
    
    PlayBloop();
    if(soundEffects){
        soundEffects = false;
    }
    else{
        soundEffects = true;
    }
    
    if(typeof(Storage)!=="undefined")
    {    
        var lStore = soundEffects;
        var lKey = "tSound";
        localStorage.setItem(lKey, lStore);
    }
    
}


function ButtonNewGameWin(){
    
    ClosePopupWin();
    
    if($('#check1').prop('checked')){
        sceneController.maxWordKey = "High Word Density";
    }
    else
    {
        sceneController.maxWordKey = "Low Word Density";
    }
    if($('#check2').prop('checked')){
        sceneController.cubeColorKey = "Inverse";
    }
    else
    {
        sceneController.cubeColorKey = "Normal";
    }
    
    if(iWinConsole){
        
        iConsole.ads.show( {
            type: 'interstitial'
        } ).result( function( resultData ) {
            sceneController.endAnimationActive = true;
        } );
        
    }
    else{
        sceneController.endAnimationActive = true;
    }
    
}



function ButtonNewGameSettings(){
    
    tappedHWDCheckBox = false;
    tappedICCheckBox = false;
    ClosePopupSettings();
    
    if($('#check1').prop('checked')){
        sceneController.maxWordKey = "High Word Density";
    }
    else
    {
        sceneController.maxWordKey = "Low Word Density";
    }
    if($('#check2').prop('checked')){
        sceneController.cubeColorKey = "Inverse";
    }
    else
    {
        sceneController.cubeColorKey = "Normal";
    }
    
    if(iWinConsole){
        
        iConsole.ads.show( {
            type: 'interstitial'
        } ).result( function( resultData ) {
            sceneController.endAnimationActive = true;
        } );
        
    }
    else{
        sceneController.endAnimationActive = true;
    }
    
}



function LoadScores(){
    
    if(typeof(Storage)!=="undefined")
    {
        
        for(var i = 0; i < weeklyWordLists.length; i++){
            var tElement = weeklyWordLists[i];
            
            var lKey = tElement.date;
            var lStore = localStorage.getItem(lKey);
            if(lStore !== null){
                
                var lStoreArray = lStore.split(";");
                tElement.highScore = lStoreArray[0];
                tElement.scoreRate = lStoreArray[1];
            }
            
        }
        
        
        //load Music Sound status
        
        soundTrack = localStorage.getItem("tMusic");
        if(soundTrack === "false"){
            soundTrack = false;
        }
        else{
            soundTrack = true;
        }
        
       
        soundEffects = localStorage.getItem("tSound");
        if(soundEffects === "false"){
            soundEffects = false;
        }
        else{
            soundEffects = true;
        }
        
        sceneController.maxWordKey = localStorage.getItem("tDensity");
        if(sceneController.maxWordKey === "High Word Density"){
            sceneController.maxWordKey = "High Word Density";
        }
        else{
            sceneController.maxWordKey = "Low Word Density";
        }
        
        sceneController.cubeColorKey = localStorage.getItem("tInverse");
        if(sceneController.cubeColorKey === "Inverse"){
            sceneController.cubeColorKey = "Inverse";
        }
        else{
            sceneController.cubeColorKey = "Normal";
        }
        
    }
}


function SaveScores(){
    
    if(typeof(Storage)!=="undefined")
    {
        
        for(var i = 0; i < weeklyWordLists.length; i++){
            var tElement = weeklyWordLists[i];
            
            var lKey = tElement.date;
            var lStore = tElement.highScore + ";" + tElement.scoreRate;
            localStorage.setItem(lKey, lStore);
        }
        
        var lStore2 = soundEffects;
        var lKey2 = "tSound";
        localStorage.setItem(lKey2, lStore2);
        
        var lStore3 = soundTrack;
        var lKey3 = "tMusic";
        localStorage.setItem(lKey3, lStore3);
        
        var lStore4 = sceneController.maxWordKey;
        var lKey4 = "tDensity";
        localStorage.setItem(lKey4, lStore4);
        
        var lStore5 = sceneController.cubeColorKey;
        var lKey5 = "tInverse";
        localStorage.setItem(lKey5, lStore5);
        
    }
    
}


function PostScore(){
    
    var cScore = document.getElementById('scorebox').innerHTML * 1.0;
    var cScoreRate = document.getElementById('scoreratebox').innerHTML;
    
    for(var i = 0; i < weeklyWordLists.length; i++){
        var tElement = weeklyWordLists[i];
        if(tElement.date === sceneController.currentGame){
            
            if(tElement.highScore < cScore){
                tElement.highScore = cScore;
                tElement.scoreRate = cScoreRate;
            }
            
            break;
        }
    }
    // Store local storage
    SaveScores();
    
    postTotalPointsiWin();
}


function postTotalPointsiWin(){
    
    if(iWinConsole){
        var cScore = parseInt(document.getElementById('scorebox').innerHTML);
        var aScore = cScore - priorScore;
        priorScore = cScore;
        
        totalPoints = totalPoints + aScore;
        
        //iConsole.game.setGameData( 
            //123456
         //);
        
        iConsole.game.postHighScore( {
            score: totalPoints
        } ).result( function () {
            //document.getElementById('agentdisplay').innerHTML = "Total Points: " + totalPoints;
        } );
        
        
        iConsole.game.setLevelData( {
            level: 0,
            data: totalPoints
        } );
        
        if(cScore > levelHighScore){
            levelHighScore = cScore;
        }
        
        if (sceneController.cubeSize === 96)
        {
            iConsole.game.setLevelData( {
                level: 1,
                data: levelHighScore
            } );
            //document.getElementById('agentdisplay').innerHTML = "4x4 S: " + levelHighScore;
        }
        else if (sceneController.cubeSize === 150)
        {
            iConsole.game.setLevelData( {
                level: 2,
                data: levelHighScore
            } );
            //document.getElementById('agentdisplay').innerHTML = "5x5 S: " + levelHighScore;
        }
        else if (sceneController.cubeSize === 216)
        {
            iConsole.game.setLevelData( {
                level: 3,
                data: levelHighScore
            } );
            //document.getElementById('agentdisplay').innerHTML = "6x6 S: " + levelHighScore;
        }
        
        
        var data0 = "";
        for(var i = 0; i < weeklyWordLists.length; i++){
            var tElement = weeklyWordLists[i];
            
            data0 = data0 + tElement.date + ";" + tElement.highScore + ";" + tElement.scoreRate + ";";
        }
        iConsole.game.setLevelData( {
            level: 4,
            data: data0
        } );
        
        
    }
    
}

        
function SceneControllerUpdateModel(){
    
    if(sceneController.stopCubeSceneObject)
    {
        endOldStartNewGame();
    }
    else
    {
        cObjectUpdate();
        cLImage.update();
        particleEmitterYellow.update();
        particleEmitterRed.update();
        particleEmitterBlue.update();
        particleEmitterBlack.update();
        
        
        
        if(!sceneController.postGameWinMessage && sceneController.gameOver && particleEmitterYellow.activeParticles.length === 0 && particleEmitterRed.activeParticles.length === 0 && particleEmitterBlue.activeParticles.length === 0 && particleEmitterBlack.activeParticles.length === 0){
            
            sceneController.postGameWinMessage = true;
            
            var cScore = document.getElementById('scorebox').innerHTML;
            var cScoreRate = document.getElementById('scoreratebox').innerHTML;
            
            var iWinMessage = readGameStrings.iWinmessage1 + cScore + readGameStrings.iWinmessage2 + cScoreRate + readGameStrings.iWinmessage3;


            document.getElementById('header3').innerHTML = readGameStrings.header3;
            document.getElementById('btnNewGame').innerHTML = readGameStrings.btnNewGame;
            document.getElementById('btnSwitchGame').innerHTML = readGameStrings.btnSwitchGame;
            document.getElementById('closepopup6').innerHTML = readGameStrings.closepopup6;
            
            //document.getElementById('Winmessage').innerHTML = "Cube Cleared!<br><br>Score: " + cScore + "<br>Score Rate: " + cScoreRate + "<br><br>Try to raise your score! &nbsp; Continue game to score possible duplicate words.";
            document.getElementById('Winmessage').innerHTML = iWinMessage;
            $( "#popupWin" ).popup("open", { positionTo: "#topHeader",
                                                transition: "pop" 
                                            
            });
            
        }
        
        if(postScoreNow && sceneController.postGameWinMessage && sceneController.gameOver && particleEmitterYellow.activeParticles.length === 0 && particleEmitterRed.activeParticles.length === 0 && particleEmitterBlue.activeParticles.length === 0 && particleEmitterBlack.activeParticles.length === 0){
            
            postScoreNow = false;
            PostScore();
        }
        
        if(particleEmitterYellow.activeParticles.length > 0 || particleEmitterRed.activeParticles.length > 0 || particleEmitterBlue.activeParticles.length > 0){
            lastParticle = true;
            //document.getElementById('mouseCoord').innerHTML = "Particles";
            //document.getElementById('vMoveEvent').innerHTML = "";
        }
        else if (lastParticle){
            lastParticle = false;
            //document.getElementById('mouseCoord').innerHTML = "";
            //document.getElementById('vMoveEvent').innerHTML = "No Particles";
            
            if(!(numberStars === 3)){
                updateScoreStar("BlueStars");
            }
            
            if(!sceneController.gameOver && !sceneController.solveCube){
                starTimer1 = setTimeout(function(){updateScoreStar("RedStars");}, 30000);
                starTimer2 = setTimeout(function(){updateScoreStar("YellowStars");}, 60000);
            }
            
        }
        
        
        
    }
    
}



function SceneControllerRenderScene(){
    
    
    
    EAGLViewBeginDraw();
       
    if(!sceneController.stopCubeSceneObject)
    {
        cObjectRender();
        cLImage.render();
        particleEmitterYellow.render();
        particleEmitterRed.render();
        particleEmitterBlue.render();
        particleEmitterBlack.render();
    }

    EAGLViewFinishDraw();
    
}


/*
function loadWordList(str) {
    
    var client = new XMLHttpRequest();
    client.onreadystatechange = function() {
      if (client.readyState === 4) {
          if ((client.status >= 200 && client.status < 300) || client.status === 304) {
              wordListString = client.responseText;
          }
          else {
              alert("Load word list was unsuccessful");
          }
      }
      
    };
    client.open("get", str, false);
    client.send(null);
    
}
*/

function sortByLength(v1, v2){
    if(v1.length > v2.length) {
        return -1;
    } else if (v1.length < v2.length){
        return 1;
    } else {
        return 0;
    }
}




function setupCube(){
        
    
    if (sceneController.cubeSize === 96)
    {
        for (var i = 0; i < 96; i++) 
        {
            var LSobject = new LetterSquareObject();
            LSobject.setUp4x4(i);
            cubeBoard[i] = LSobject;
        }
    }
    else if (sceneController.cubeSize === 150)
    {
        for (var i = 0; i < 150; i++) 
        {
            var LSobject = new LetterSquareObject();
            LSobject.setUp5x5(i);
            cubeBoard[i] = LSobject;
        }
    }
    else if (sceneController.cubeSize === 216)
    {
        for (var i = 0; i < 216; i++) 
        {
            var LSobject = new LetterSquareObject();
            LSobject.setUp6x6(i);
            cubeBoard[i] = LSobject;
        }
    }

    
    // Load Word List
    //loadWordList(sceneController.wordListPlay);
    wordListString = preload3.getResult(sceneController.wordListPlay);
    var WordArray = wordListString.split("\n");
    //WordArray.pop(); // remove last element because not a word.
    
    
    
    /*
    var tempWordString = " - ";
    for (var i = 0; i < WordArray.length; i++)
    {
        tempWordString = tempWordString + WordArray[i] + " - ";
    }
    document.getElementById('ycoord').innerHTML = "Pre: " + tempWordString;
    */
    
    
    // Select Words to use on cube
    var selectedWordArray = selectWords(WordArray);
    

    //badCube = selectedWordArray.isEmpty();

    var wordListSortedByLengthTemp = new Array();
    
    // Sort Word List by length
    selectedWordArray.sort(sortByLength);
    
    for (var i = 0; i < selectedWordArray.length; i++)
    {
        
        var currentWord = selectedWordArray[i];
        var currentWordS = currentWord.replace(/[^A-Za-z]/g, ""); //remove all spaces and punctuation
        
        var duplicateWord = false;
        if(wordListSortedByLengthTemp.indexOf(currentWordS) === -1){
            wordListSortedByLengthTemp.push(currentWordS);
        }
        else{
            duplicateWord = true;
        }

        if (!duplicateWord)
        {
            
            var tempWord = new WordListObject();
            tempWord.init();
            
            tempWord.wordName = currentWordS; // without Spaces
            tempWord.wordDisplayName = currentWord; // with Spaces
            tempWord.wordLength = currentWordS.length; // without Spaces

            var letterArray = new Array();
            for (var letterIndex = 0; letterIndex < currentWordS.length; letterIndex++)
            {
                var currentLetter = currentWordS.substring(letterIndex, letterIndex + 1);
                letterArray.push(currentLetter);

            }

            tempWord.allLetters = letterArray;
            
            wordListSortedByLength.push(tempWord);
        }
        
    }
    
    //UpdateTextAreaViewY(wordListSortedByLength);
    
    
    
    
    var wordListTemp = new Array();
    // Sort Word List by alphabet
    selectedWordArray.sort();
    
    for (var i = 0; i < selectedWordArray.length; i++)
    {
        var currentWord2 = selectedWordArray[i];
        var currentWordS2 = currentWord2.replace(/[^A-Za-z]/g, ""); //remove all spaces and punctuation
        
        var duplicateWord2 = false;
        if(wordListTemp.indexOf(currentWordS2) === -1){
            wordListTemp.push(currentWordS2);
        }
        else{
            duplicateWord2 = true;
        }

        if (!duplicateWord2)
        {
            var tempWord2 = new WordListObject();
            tempWord2.init();
            
            tempWord2.wordName = currentWordS2; // without Spaces
            tempWord2.wordDisplayName = currentWord2; // with Spaces
            tempWord2.wordLength = currentWordS2.length; // without Spaces

            var letterArray2 = new Array();
            for (var letterIndex2 = 0; letterIndex2 < currentWordS2.length; letterIndex2++)
            {
                var currentLetter2 = currentWordS2.substring(letterIndex2, letterIndex2 + 1);
                letterArray2.push(currentLetter2);

            }

            tempWord2.allLetters = letterArray2;
            
            wordList.push(tempWord2);

        }

    }
    
    //document.getElementById('ycoord').innerHTML = "Sort by Alphabet:  " + wordListTemp;
    

    //if (!badCube)
    //{
        placeWordsonCube();

    //}


}



function placeWordsonCube(){
    
    var filled;
    var startSquare;
    var currentSquare;
    var removeWordListObjects = new Array();
    var tempArrayFilled = false;

    var firstLetter;
    var nextLetter;

    var letterCount = 0;
    var rSquare = Math.floor(Math.random() * sceneController.cubeSize); //randum number from 0 to cubeSize - 1
    var rDirect = Math.floor(Math.random() * 8); //randum number from 0 to 7
    
    for (var i = 0; i < wordListSortedByLength.length; i++) 
    {
        var tempLetterArray = new Array();
        wordFit = false;
        var currentWord = wordListSortedByLength[i];
        filled = false;

        var incRandom = rSquare + (sceneController.cubeSize / 6) +1;
        for (var r = 0; r < incRandom; r++)
        {
            rSquare++;
            if (rSquare === sceneController.cubeSize)
                rSquare = 0;
        }


        var squareCount = -1;
        while (!filled && squareCount < sceneController.cubeSize)
        {
            squareCount++;

            //var incRandom2 = rSquare + (random(cubeSize/6) * 2); //((random() % (cubeSize/6)) * 2);
            var incRandom2 = rSquare + (Math.floor(Math.random() * sceneController.cubeSize/6) * 2);
            for (var r = 0; r < incRandom2; r++)
            {
                rSquare++;
                if (rSquare === sceneController.cubeSize)
                    rSquare = 0;
            }

            if (wordFit)
            {
                rSquare = wordFitSquare;
            }

            startSquare = cubeBoard[rSquare];

            firstLetter = currentWord.allLetters[0];

            if (!checkSquare(startSquare, firstLetter))
            {

                var directionCount = -1;
                while (!filled && directionCount < 0)
                {
                    directionCount++;

                    for (var r = 0; r < 1; r++)
                    {
                        rDirect++;
                        if (rDirect === 8)
                            rDirect = 0;
                        rDirection = rDirect;
                    }

                    if (wordFit)
                    {
                        rDirect = wordFitDirection;
                        rDirection = rDirect;

                    }


                    if (convertToLength(rDirection, startSquare) >= currentWord.wordLength) 
                    {
                        // check all letters
                        currentSquare = startSquare;
                        tempLetterArray.push(startSquare);

                        for (var j = 1; j < currentWord.wordLength; j++) 
                        {
                            nextLetter = currentWord.allLetters[j];
                            currentSquare = moveToNextSquare(rDirection, currentSquare);

                            if (checkSquare(currentSquare, nextLetter)) // Check to see if square is empty or has same letter
                            {
                                //filled = NO;
                                tempArrayFilled = false;
                                break;
                            }
                            else
                            {
                                tempLetterArray.push(currentSquare);
                                tempArrayFilled = true;
                            }
                        }

                        if (!tempArrayFilled)
                        {
                            tempLetterArray.length = 0;
                            filled = false;


                            // check for common letters
                            for (var k = 0; k < currentWord.wordLength; k++)
                            {
                                var temper = currentWord.allLetters[k];
                                if (checkCommonLetters(currentSquare, temper))
                                {
                                    if (checkWordFit2(currentSquare, currentWord.wordName, k, rDirect))
                                    {
                                        wordFit = true;
                                        startSquare = cubeBoard[wordFitSquare];

                                        break;
                                    }
                                }

                            }


                            // check cross word common letters
                            if (!wordFit)
                            {
                                //find cross word
                                //System.out.println("find cross word - Current Square");
                                var crossWord = findCrossWord(currentSquare);
                                var randomIndex = new Array();
                                for (var k = 0; k < crossWord.wordLength; k++)
                                    randomIndex.push(k);

                                var index;
                                for (var m = 0; m < crossWord.wordLength; m++)
                                {
                                    var tI = Math.floor(Math.random() * randomIndex.length);
                                    index = randomIndex[tI];
                                    randomIndex.splice(tI, 1);

                                    var currentSquare2 = crossWord.allSquares[index];
                                    if (!(currentSquare.currentPosition === currentSquare2.currentPosition))
                                    {

                                        for (var j = 0; j < currentWord.wordLength; j++)
                                        {
                                            temper = currentWord.allLetters[j];
                                            if (checkCommonLetters(currentSquare2, temper))
                                            {

                                                if (checkWordFit2(currentSquare2, currentWord.wordName, j, rDirect))
                                                {
                                                    wordFit = true;
                                                    startSquare = cubeBoard[wordFitSquare];

                                                    break;
                                                }

                                            }

                                        }

                                    }

                                    if (wordFit)
                                        break;

                                }

                            }


                            //continue; // Check next direction
                        }
                        else
                        {

                            // location good - place word
                            currentWord.firstLetterSquare = startSquare.currentPosition;
                            currentWord.lastLetterSquare = currentSquare.currentPosition;
                            currentWord.allSquares = tempLetterArray;

                            for (var j = 0; j < currentWord.wordLength; j++)
                            {
                                var tempSquare = currentWord.allSquares[j];

                                var temper = currentWord.allLetters[j];
                                tempSquare.squareLetter = temper;
                                if (tempSquare.positionOccupied)
                                {
                                    letterCount++;
                                }
                                tempSquare.positionOccupied = true;

                            }

                            //tempLetterArray.clear();
                            //System.out.println("Word Placed: " + currentWord.getWordDisplayName());
                            filled = true;
                            break;
                        } // if

                    } // if
                    else
                    {
                        filled = false;
                        //continue;
                    }
                } // while - Check next Direction
            } // if
            else
            {

                // check for common letters
                for (var j = 0; j < currentWord.wordLength; j++)
                {
                    var temper = currentWord.allLetters[j];
                    if (checkCommonLetters(startSquare, temper))
                    {
                        if (checkWordFit2(startSquare, currentWord.wordName, j, rDirect))
                        {
                            wordFit = true;
                            break;
                        }
                        else
                        {

                        }
                    }

                }


                // check cross word common letters
                if (!wordFit)
                {
                    //find cross word
                    
                    crossWord = findCrossWord(startSquare);
                    randomIndex = new Array();
                    for (var k = 0; k < crossWord.wordLength; k++)
                        randomIndex.push(k);

                    
                    for (var m = 0; m < crossWord.wordLength; m++)
                    {
                        tI = Math.floor(Math.random() * randomIndex.length);
                        index = randomIndex[tI];
                        randomIndex.splice(tI, 1);

                        currentSquare2 = crossWord.allSquares[index];
                        if (!(startSquare.currentPosition === currentSquare2.currentPosition))
                        {

                            for (var j = 0; j < currentWord.wordLength; j++)
                            {
                                temper = currentWord.allLetters[j];
                                if (checkCommonLetters(currentSquare2, temper))
                                {

                                    if (checkWordFit2(currentSquare2, currentWord.wordName, j, rDirect))
                                    {
                                        wordFit = true;
                                        startSquare = cubeBoard[wordFitSquare];

                                        break;
                                    }

                                }

                            }

                        }

                        if (wordFit)
                            break;

                    }

                }


                filled = false;
                //continue;
            } // if

        } // while - Check next Square


        if (!filled && squareCount >= sceneController.cubeSize)  // could not place word on cube
        {
            
            removeWordListObjects.push(currentWord);
        }

    } // for - go to Next Word

    

    for (var i = 0; i < removeWordListObjects.length; i++)
    {
        var tempWW = removeWordListObjects[i];
        for (var j = 0; j < wordListSortedByLength.length; j++)
        {
            var tempRM = wordListSortedByLength[j];
            if (tempWW.wordName === tempRM.wordName)
            {
                wordListSortedByLength.splice(j, 1);
                break;
            }
        }
    }

//UpdateTextAreaViewX(wordListSortedByLength);

    for (var i = 0; i < removeWordListObjects.length; i++)
    {
        var tempWW = removeWordListObjects[i];
        for (var j = 0; j < wordList.length; j++)
        {
            var tempRM = wordList[j];
            if (tempWW.wordName === tempRM.wordName)
            {
                wordList.splice(j, 1);
                break;
            }
        }
    }

    
    // Need to copy WordListObjects from wordListSortedByLength to wordList
    for (var i = 0; i < wordListSortedByLength.length; i++)
    {
        var tempWLO1 = wordListSortedByLength[i];
        for (var j = 0; j < wordList.length; j++)
        {
            var tempWLO2 = wordList[j];
            
            if(tempWLO1.wordName === tempWLO2.wordName){
                
                tempWLO2.firstLetterSquare = tempWLO1.firstLetterSquare;
                //tempWLO2.lastLetterSquare = tempWLO1.lastLetterSquare;
                //tempWLO2.allLetters = tempWLO1.allLetters;
                //tempWLO2.allSquares = tempWLO1.allSquares;
                
                break;
            }
            
        }
        
    }
    

    sceneController.totalLetteronCube = 0;
    
    removeWordListObjects.length = 0;

    //Determine Hidden Word for Alphabet Quest
    var rHiddenWord = Math.floor(Math.random() * wordListSortedByLength.length);
    var hiddenWord = wordListSortedByLength[rHiddenWord];
    hiddenWord.alphabetQuestHiddenWord = true;
    hiddenWord.hideHiddenWord = true;
    hiddenWord.wordPlacedScrollView = true;
    hiddenWord.wordStrikedScrollView = true;

    for (var i = 0; i < wordList.length; i++)
    {
        var hiddenWord2 = wordList[i];
        if (hiddenWord2.wordName === hiddenWord.wordName)
        {
            hiddenWord2.alphabetQuestHiddenWord = true;
            hiddenWord2.hideHiddenWord = true;
            hiddenWord2.wordPlacedScrollView = true;
            hiddenWord2.wordStrikedScrollView = true;
            break;
        }
    }

    UpdateTextAreaView(wordList);
    
    randomLettersEnglish();
    
}


function findCrossWord(square){
        
    var returnCrossWord = null;
    var crossWordFound = false;

    for (var i = 0; i < wordListSortedByLength.length; i++)
    {
        var cWord = wordListSortedByLength[i];
        if(cWord.allSquares === null)
        {
            
        }
        else
        {
            
            if (!(cWord.allSquares.length === 0))
            {
                for (var j = 0; j < cWord.allSquares.length; j++)
                {
                    var cLetter = cWord.allSquares[j];
                    if (cLetter.currentPosition === square.currentPosition)
                    {
                        returnCrossWord = cWord;
                        crossWordFound = true;
                        break;
                    }

                }
            }

            if (crossWordFound)
            {
                break;
            }
            
        }

    }

    return returnCrossWord;

}



function checkCommonLetters(square, letter){

    return (square.squareLetter === letter);

}



function checkWordFit2(square, word, index, wordFitDirForward){

    var workingSquare;
    var currentLetter;
    var sWordFit = false;
    var loopCount = 0;

    var wordFitDirReverse = wordFitDirForward;
    for (var i = 0; i < 4; i++)
    {
        wordFitDirReverse++;
        if (wordFitDirReverse === 8)
            wordFitDirReverse = 0;
    }

    while (!sWordFit && loopCount < 1)
    {
        workingSquare = square;
        rDirection = wordFitDirReverse;
        if (convertToLength(wordFitDirForward, square) >= (word.length - index) && convertToLength(wordFitDirReverse, square) >= (index +1)) 
        {
            for (var i = 0; i < index; i++)
            {
                workingSquare = moveToNextSquare(rDirection, workingSquare);
            }
            wordFitSquare = workingSquare.currentPosition;

            wordFitDirection = rDirection;
            for (var i = 0; i < 4; i++)
            {
                wordFitDirection++;
                if (wordFitDirection === 8)
                    wordFitDirection = 0;
            }
            rDirection = wordFitDirection;

            if (convertToLength(wordFitDirection, workingSquare) >= word.length)
            {

                for (var j = 0; j < word.length; j++) 
                {
                    //currentLetter = [word substringWithRange:NSMakeRange(j, 1)];
                    currentLetter = word.substring(j, j + 1);
                    
                    if (!checkSquare(workingSquare, currentLetter))
                    {
                        if (!(j === word.length - 1))
                        {
                            workingSquare = moveToNextSquare(rDirection, workingSquare);
                        }

                        sWordFit = true;
                    }
                    else
                    {
                        sWordFit = false;
                        break;
                    }
                }
            }
            else
            {
                sWordFit = false;

            }

            if (sWordFit)
            {
                return true;
            }


        } // if 

        loopCount++;


    }  // while - check next direction

    return false;

}


/*
function moveToNextSquare(direction, square){

    var NewSquare;

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


    // +/- 180
    if ((square.currentPosition() >= cubeSize*1/6 && square.currentPosition() < cubeSize*2/6 && NewSquare.currentPosition() >= cubeSize*5/6 && NewSquare.currentPosition() < cubeSize) || // back - bottom
        (square.currentPosition() >= cubeSize*5/6 && square.currentPosition() < cubeSize && NewSquare.currentPosition() >= cubeSize*1/6 && NewSquare.currentPosition() < cubeSize*2/6) || // bottom - back
        (square.currentPosition() >= cubeSize*4/6 && square.currentPosition() < cubeSize*5/6 && NewSquare.currentPosition() >= cubeSize*1/6 && NewSquare.currentPosition() < cubeSize*2/6) || // top - back
        (square.currentPosition() >= cubeSize*1/6 && square.currentPosition() < cubeSize*2/6 && NewSquare.currentPosition() >= cubeSize*4/6 && NewSquare.currentPosition() < cubeSize*5/6))   // back - top
    {
        for (int i = 0; i < 4; i++) 
        {
            rDirection++;
            if (rDirection == 8)
                rDirection = 0;
        }
    }
    // + 90
    else if ((square.currentPosition() >= cubeSize*3/6 && square.currentPosition() < cubeSize*4/6 && NewSquare.currentPosition() >= cubeSize*5/6 && NewSquare.currentPosition() < cubeSize) || // right - bottom
             (square.currentPosition() >= cubeSize*2/6 && square.currentPosition() < cubeSize*3/6 && NewSquare.currentPosition() >= cubeSize*4/6 && NewSquare.currentPosition() < cubeSize*5/6) || // left - top
             (square.currentPosition() >= cubeSize*5/6 && square.currentPosition() < cubeSize && NewSquare.currentPosition() >= cubeSize*2/6 && NewSquare.currentPosition() < cubeSize*3/6) || // bottom - left
             (square.currentPosition() >= cubeSize*4/6 && square.currentPosition() < cubeSize*5/6 && NewSquare.currentPosition() >= cubeSize*3/6 && NewSquare.currentPosition() < cubeSize*4/6))   // top - right
    {
        for (int i = 0; i < 2; i++) 
        {
            rDirection++;
            if (rDirection == 8)
                rDirection = 0;
        }
    }
    // - 90
    else if ((square.currentPosition() >= cubeSize*5/6 && square.currentPosition() < cubeSize && NewSquare.currentPosition() >= cubeSize*3/6 && NewSquare.currentPosition() < cubeSize*4/6) || // bottom - right
             (square.currentPosition() >= cubeSize*4/6 && square.currentPosition() < cubeSize*5/6 && NewSquare.currentPosition() >= cubeSize*2/6 && NewSquare.currentPosition() < cubeSize*3/6) || // top - left
             (square.currentPosition() >= cubeSize*2/6 && square.currentPosition() < cubeSize*3/6 && NewSquare.currentPosition() >= cubeSize*5/6 && NewSquare.currentPosition() < cubeSize) || // left - bottom
             (square.currentPosition() >= cubeSize*3/6 && square.currentPosition() < cubeSize*4/6 && NewSquare.currentPosition() >= cubeSize*4/6 && NewSquare.currentPosition() < cubeSize*5/6))   // right - top
    {
        for (int i = 0; i < 2; i++) 
        {
            rDirection = rDirection - 1;
            if (rDirection == -1)
                rDirection = 7;
        }
    }

    switch (direction)
    {
        case 0:
            return (LetterSquareObject) cubeBoard.get(square.topPosition());
        case 1:
            return (LetterSquareObject) cubeBoard.get(square.topRightPosition());
        case 2:
            return (LetterSquareObject) cubeBoard.get(square.rightPosition());
        case 3:
            return (LetterSquareObject) cubeBoard.get(square.bottomRightPosition());
        case 4:
            return (LetterSquareObject) cubeBoard.get(square.bottomPosition());
        case 5:
            return (LetterSquareObject) cubeBoard.get(square.bottomLeftPosition());
        case 6:
            return (LetterSquareObject) cubeBoard.get(square.leftPosition());                
        case 7:
            return (LetterSquareObject) cubeBoard.get(square.topLeftPosition());                
        default:
            return square;
    }

}
*/


function checkSquare(square, letter){

    if (!square.positionOccupied)
    {
        return false;
    }
    else 
    {
        return !(square.squareLetter === letter);
    }

}


/*
function convertToLength(direction, square){

    switch (direction)
    {
        case 0:
            return square.lengthTopPosition();

        case 1:
            return square.lengthTopRightPosition();

        case 2:
            return square.lengthRightPosition();

        case 3:
            return square.lengthBottomRightPosition();

        case 4:
            return square.lengthBottomPosition();

        case 5:
            return square.lengthBottomLeftPosition();

        case 6:
            return square.lengthLeftPosition();

        case 7:
            return square.lengthTopLeftPosition();

        default:
            return 0;

    }

}
*/


function randomLettersEnglish(){
        
    var randomSquare;

    for (var i = 0; i < sceneController.cubeSize; i++) 
    {
        randomSquare = cubeBoard[i];
        if (!randomSquare.positionOccupied)
        {

            randomSquare.positionOccupied = true;
            
            var rLetter = Math.floor(Math.random() * 10000);

            if (rLetter >= 0 && rLetter <= 850) 
                randomSquare.squareLetter = "A";
            else if (rLetter >= 851 && rLetter <= 1057)
                randomSquare.squareLetter = "B";
            else if (rLetter >= 1058 && rLetter <= 1511)
                randomSquare.squareLetter = "C";
            else if (rLetter >= 1512 && rLetter <= 1849)
                randomSquare.squareLetter = "D";
            else if (rLetter >= 1850 && rLetter <= 2965)
                randomSquare.squareLetter = "E";
            else if (rLetter >= 2966 && rLetter <= 3146)
                randomSquare.squareLetter = "F";
            else if (rLetter >= 3147 && rLetter <= 3393)
                randomSquare.squareLetter = "G";
            else if (rLetter >= 3394 && rLetter <= 3693)
                randomSquare.squareLetter = "H";
            else if (rLetter >= 3694 && rLetter <= 4448)
                randomSquare.squareLetter = "I";
            else if (rLetter >= 4449 && rLetter <= 4468)
                randomSquare.squareLetter = "J";
            else if (rLetter >= 4469 && rLetter <= 4578)
                randomSquare.squareLetter = "K";
            else if (rLetter >= 4579 && rLetter <= 5127)
                randomSquare.squareLetter = "L";
            else if (rLetter >= 5128 && rLetter <= 5428)
                randomSquare.squareLetter = "M";
            else if (rLetter >= 5429 && rLetter <= 6093)
                randomSquare.squareLetter = "N";
            else if (rLetter >= 6094 && rLetter <= 6809)
                randomSquare.squareLetter = "O";
            else if (rLetter >= 6810 && rLetter <= 7126)
                randomSquare.squareLetter = "P";
            else if (rLetter >= 7127 && rLetter <= 7146)
                randomSquare.squareLetter = "Q";
            else if (rLetter >= 7147 && rLetter <= 7904)
                randomSquare.squareLetter = "R";
            else if (rLetter >= 7905 && rLetter <= 8478)
                randomSquare.squareLetter = "S";
            else if (rLetter >= 8479 && rLetter <= 9173)
                randomSquare.squareLetter = "T";
            else if (rLetter >= 9174 && rLetter <= 9536)
                randomSquare.squareLetter = "U";
            else if (rLetter >= 9537 && rLetter <= 9637)
                randomSquare.squareLetter = "V";
            else if (rLetter >= 9638 && rLetter <= 9766)
                randomSquare.squareLetter = "W";
            else if (rLetter >= 9767 && rLetter <= 9795)
                randomSquare.squareLetter = "X";
            else if (rLetter >= 9796 && rLetter <= 9973)
                randomSquare.squareLetter = "Y";
            else if (rLetter >= 9974 && rLetter <= 9999)
                randomSquare.squareLetter = "Z";
            else
            {

            }
        }

    }
     
    //document.getElementById('xcoord2').innerHTML = cubeBoard[4].toString();
}


function selectWords(wordArrayBig){
        
    // Select Words from word list to put on cube
    var tempArray = new Array();
    var currentWord;
    var rWord;
    var rArray;
    var words100 = false;
    if (wordArrayBig.length > 58){
        words100 = true;
    }
    
    var numberWords;
    var maxWords = false;
    if (sceneController.maxWordKey === "High Word Density"){
        maxWords = true;
    }

    if (sceneController.cubeSize === 96)
    {

        var wordArray15 = new Array();
        var wordArray6 = new Array();
        var wordArray7 = new Array();
        var wordArray8 = new Array();
        var word8 = 0;
        var word7 = 0;
        var word6 = 0;
        var totalMinus = 0;

        for (var i = 0; i < wordArrayBig.length; i++){

            var currentWordx = wordArrayBig[i];
            var currentWordS = currentWordx.replace(/[^A-Za-z]/g, ""); //remove all spaces and punctuation

            if (currentWordS.length <= 5){
                wordArray15.push(currentWordx);
            }
            else if (currentWordS.length === 6){
                wordArray6.push(currentWordx);
            }
            else if (currentWordS.length === 7){
                wordArray7.push(currentWordx);
            }
            else if (currentWordS.length === 8){
                wordArray8.push(currentWordx);
            }

        }

        if (maxWords)
            numberWords = 50; // 50
        else
            numberWords = 8; // 8

        for (var i = 0; i < numberWords; i++){
            rArray = Math.floor(Math.random() * 4);

            if (word8 >= 1 || word7 >= 1)
                rArray = rArray - 1;
            if ((word8 + word7) >= 2)
                rArray = rArray - 1;
            if ((word8 + word7 + word6) >= 4)
                rArray = rArray - 1;
            if (rArray < 0)
                rArray = 0;

            switch (rArray){
                case 0:
                    if (!(wordArray15.length === 0)){
                        rWord = Math.floor(Math.random() * wordArray15.length);
                        currentWord = wordArray15[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray15.splice(rWord, 1);
                    }
                    else{
                        i = i - 1;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 1:
                    if ((!(wordArray6.length <= 10) && words100) || (!(wordArray6.length <= 0) && (!words100 || word6 === 0))){
                        rWord = Math.floor(Math.random() * wordArray6.length);
                        currentWord = wordArray6[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray6.splice(rWord, 1);
                        word6++;
                    }
                    else{
                        i = i - 1;
                        word6++;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 2:
                    if ((!(wordArray7.length <= 10) && words100) || (!(wordArray7.length <= 0) && (!words100 || word7 === 0))){
                        rWord = Math.floor(Math.random() * wordArray7.length);
                        currentWord = wordArray7[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray7.splice(rWord, 1);
                        word7++;
                    }
                    else{
                        i = i - 1;
                        word7++;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 3:
                    if ((!(wordArray8.length <= 10) && words100) || (!(wordArray8.length <= 0) && (!words100 || word8 === 0))){
                        rWord = Math.floor(Math.random() * wordArray8.length);
                        currentWord = wordArray8[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray8.splice(rWord, 1);
                        word8++;
                    }
                    else{
                        i = i - 1;
                        word8++;
                        totalMinus = totalMinus + 1;
                    }
                    break;

                default:
                    break;
            }

            if (wordArray15.length === 0 && wordArray6.length === 0 && wordArray7.length <= 0 && wordArray8.length <= 0)
                break;

            if (totalMinus >= 8 && (wordArray15.length === 0))
                break;

        }


    }
    
    else if (sceneController.cubeSize === 150){
        
        var wordArray17 = new Array();
        var wordArray8 = new Array();
        var wordArray9 = new Array();
        var wordArray10 = new Array();
        var word10 = 0;
        var word9 = 0;
        var word8 = 0;
        var totalMinus = 0;

        for (var i = 0; i < wordArrayBig.length; i++){
            
            var currentWordx = wordArrayBig[i];
            var currentWordS = currentWordx.replace(/[^A-Za-z]/g, ""); //remove all spaces and punctuation

            if (currentWordS.length <= 7){
                wordArray17.push(currentWordx);
            }
            else if (currentWordS.length === 8){
                wordArray8.push(currentWordx);
            }
            else if (currentWordS.length === 9){
                wordArray9.push(currentWordx);
            }
            else if (currentWordS.length === 10){
                wordArray10.push(currentWordx);
            }

        }

        if (maxWords)
            numberWords = 50; // 50
        else
            numberWords = 10; // 10

        for (var i = 0; i < numberWords; i++){
            
            rArray = Math.floor(Math.random() * 4);

            if (word10 >= 1 || word9 >= 1)
                rArray = rArray - 1;
            if ((word10 + word9) >= 2)
                rArray = rArray - 1;
            if ((word10 + word9 + word8) >= 4)
                rArray = rArray - 1;
            if (rArray < 0)
                rArray = 0;



            switch (rArray){
                case 0:
                    if (!(wordArray17.length === 0)){
                        rWord = Math.floor(Math.random() * wordArray17.length);
                        currentWord = wordArray17[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray17.splice(rWord, 1);
                    }
                    else{
                        i = i - 1;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 1:
                    if ((!(wordArray8.length <= 10) && words100) || (!(wordArray8.length <= 0) && (!words100 || word8 === 0))){
                        rWord = Math.floor(Math.random() * wordArray8.length);
                        currentWord = wordArray8[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray8.splice(rWord, 1);
                        word8++;
                    }
                    else{
                        i = i - 1;
                        word8++;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 2:
                    if ((!(wordArray9.length <= 10) && words100) || (!(wordArray9.length <= 0) && (!words100 || word9 === 0))){
                        rWord = Math.floor(Math.random() * wordArray9.length);
                        currentWord = wordArray9[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray9.splice(rWord, 1);
                        word9++;
                    }
                    else{
                        i = i - 1;
                        word9++;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 3:
                    if ((!(wordArray10.length <= 10) && words100) || (!(wordArray10.length <= 0) && (!words100 || word10 === 0))){
                        rWord = Math.floor(Math.random() * wordArray10.length);
                        currentWord = wordArray10[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray10.splice(rWord, 1);
                        word10++;
                    }
                    else{
                        i = i - 1;
                        word10++;
                        totalMinus = totalMinus + 1;
                    }
                    break;

                default:
                    break;
            }

            if (wordArray17.length === 0 && wordArray8.length === 0 && wordArray9.length <= 0 && wordArray10.length <= 0)
                break;

            if (totalMinus >= 10 && (wordArray17.length === 0))
                break; 

        }

    }
    else if (sceneController.cubeSize === 216)
    {

        // Test
        //currentWord = @"SWEETPOTATOS";
        //[tempArray addObject:currentWord];
        //currentWord = @"SLEIGHBELLS";
        //[tempArray addObject:currentWord];
        //currentWord = @"SCROOGES";
        //[tempArray addObject:currentWord];
        // Test

        var wordArray19 = new Array();
        var wordArray10 = new Array();
        var wordArray11 = new Array();
        var wordArray12 = new Array();
        var word12 = 0;
        var word11 = 0;
        var word10 = 0;
        var totalMinus = 0;

        for (var i = 0; i < wordArrayBig.length; i++){
            
            var currentWordx = wordArrayBig[i];
            var currentWordS = currentWordx.replace(/[^A-Za-z]/g, ""); //remove all spaces and punctuation

            if (currentWordS.length <= 9){
                wordArray19.push(currentWordx);
            }
            else if (currentWordS.length === 10){
                wordArray10.push(currentWordx);
            }
            else if (currentWordS.length === 11){
                wordArray11.push(currentWordx);
            }
            else if (currentWordS.length === 12){
                wordArray12.push(currentWordx);
            }

        }


        if (maxWords)
            numberWords = 50; // 50
        else
            numberWords = 12; // 12

        for (var i = 0; i < numberWords; i++){
            
            rArray = Math.floor(Math.random() * 4);

            if (word12 >= 1 || word11 >= 1)
                rArray = rArray - 1;
            if ((word12 + word11) >= 2)
                rArray = rArray - 1;
            if ((word12 + word11 + word10) >= 4)
                rArray = rArray - 1;
            if (rArray < 0)
                rArray = 0;



            switch (rArray){
                case 0:
                    if (!(wordArray19.length === 0)){
                        rWord = Math.floor(Math.random() * wordArray19.length);
                        currentWord = wordArray19[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray19.splice(rWord, 1);
                    }
                    else{
                        i = i - 1;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 1:
                    if ((!(wordArray10.length <= 10) && words100) || (!(wordArray10.length <= 0) && (!words100 || word10 === 0))){
                        rWord = Math.floor(Math.random() * wordArray10.length);
                        currentWord = wordArray10[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray10.splice(rWord, 1);
                        word10++;
                    }
                    else{
                        i = i - 1;
                        word10++;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 2:
                    if ((!(wordArray11.length <= 10) && words100) || (!(wordArray11.length <= 0) && (!words100 || word11 === 0))){
                        rWord = Math.floor(Math.random() * wordArray11.length);
                        currentWord = wordArray11[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray11.splice(rWord, 1);
                        word11++;
                    }
                    else{
                        i = i - 1;
                        word11++;
                        totalMinus = totalMinus + 1;
                    }
                    break;
                case 3:
                    if ((!(wordArray12.length <= 10) && words100) || (!(wordArray12.length <= 0) && (!words100 || word12 === 0))){
                        rWord = Math.floor(Math.random() * wordArray12.length);
                        currentWord = wordArray12[rWord];
                        var currentWordUC = currentWord.toUpperCase(); //uppercaseString
                        if(tempArray.indexOf(currentWordUC) === -1){
                            tempArray.push(currentWordUC);
                        }
                        wordArray12.splice(rWord, 1);
                        word12++;
                    }
                    else{
                        i = i - 1;
                        word12++;
                        totalMinus = totalMinus + 1;
                    }
                    break;

                default:
                    break;
            }

            if (wordArray19.length === 0 && wordArray10.length === 0 && wordArray11.length <= 0 && wordArray12.length <= 0)
                break;

            if (totalMinus >= 10 && (wordArray19.length === 0))
                break;

        }


    }
    
    return tempArray;

}