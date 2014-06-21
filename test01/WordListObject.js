/*
Copyright 2014 JWACK APPS
All rights reserved
jwackapps.com
Created by Andrew B. Kiger
ajkiger@gmail.com
*/



function WordListObject(){
    
    this.wordName = null;
    this.wordDisplayName = null;
    this.wordLength = null;
    this.firstLetterSquare = null;
    this.lastLetterSquare = null;
    this.allLetters = null; // Strings
    this.allSquares = null; // LetterSquareObjects
    this.wordFound = null;
    this.wordPlacedScrollView = null;
    this.wordStrikedScrollView = null;
    this.wordHint = null;
    this.messageDisplayed = null;
    this.alphabetQuestHiddenWord = null;
    this.hideHiddenWord = null;
    
};

WordListObject.prototype.wordName = null;
WordListObject.prototype.wordDisplayName = null;
WordListObject.prototype.wordLength = null;
WordListObject.prototype.firstLetterSquare = null;
WordListObject.prototype.lastLetterSquare = null;
WordListObject.prototype.allLetters = null; // Strings
WordListObject.prototype.allSquares = null; // LetterSquareObjects
WordListObject.prototype.wordFound = null;
WordListObject.prototype.wordPlacedScrollView = null;
WordListObject.prototype.wordStrikedScrollView = null;
WordListObject.prototype.wordHint = null;
WordListObject.prototype.messageDisplayed = null;
WordListObject.prototype.alphabetQuestHiddenWord = null;
WordListObject.prototype.hideHiddenWord = null;

WordListObject.prototype.init = function(){
    
    this.allLetters = new Array(); // Strings
    this.allSquares = new Array(); // LetterSquareObjects
    this.wordFound = false;
    this.wordPlacedScrollView = false;
    this.wordStrikedScrollView = false;
    this.wordHint = false;
    this.messageDisplayed = false;
    this.alphabetQuestHiddenWord = false;
    this.hideHiddenWord = false;
    
};

/*
function UpdateTextAreaViewX(aList){
    
    var returnString = " - ";
    
    for (var i = 0; i < aList.length; i++)
    {
        var tempWW = aList[i];
        if(!tempWW.alphabetQuestHiddenWord){
            
            returnString = returnString + tempWW.wordName + " - ";
        }
        
    }
    
    document.getElementById('xcoord').innerHTML = "Post: " + returnString;
}

function UpdateTextAreaViewY(aList){
    
    var returnString = " - ";
    
    for (var i = 0; i < aList.length; i++)
    {
        var tempWW = aList[i];
        if(!tempWW.alphabetQuestHiddenWord){
            
            returnString = returnString + tempWW.wordName + " - ";
        }
        
    }
    
    document.getElementById('ycoord').innerHTML = "Pre: " + returnString;
}
*/

function UpdateTextAreaView(wordList){
        
    var displayText = " ";
    var tempWord;
    //var tempWd = $("#wordbox");
    
    tempWd.effect("fade", "swing", "300", function() {
 
        if (!sceneController.solveCube) {

        for (var i = 0; i < wordList.length; i++)
        {
            tempWord = wordList[i];

            if (!tempWord.wordPlacedScrollView && !tempWord.alphabetQuestHiddenWord) // First time placed on list
            {
                // Place on text view first time (All Non Hidden Words)
                tempWord.wordPlacedScrollView = true;
                displayText = displayText + tempWord.wordDisplayName + " &nbsp&nbsp&nbsp&nbsp&nbsp "; //" &nbsp&nbsp&nbsp&nbsp&nbsp "
            }
            else if (tempWord.wordFound && !tempWord.wordStrikedScrollView  && !tempWord.alphabetQuestHiddenWord)  // Word Just Found (Not Hidden Word)
            {
                // Don't place on text view
                tempWord.wordStrikedScrollView = true;
            }
            else if (!tempWord.wordFound && !tempWord.alphabetQuestHiddenWord) // Not hidden word
            {
                // Replace Words not found and not Hidden Word
                displayText = displayText + tempWord.wordDisplayName + " &nbsp&nbsp&nbsp&nbsp&nbsp ";
            }

        }
        
        
        if (displayText === " ") // All Words found - need to look for hidden word
        {
            var displayText2 = " &nbsp&nbsp ";
            for (var i = 0; i < wordList.length; i++)
            {
                tempWord = wordList[i];
                if (!tempWord.alphabetQuestHiddenWord) // Not hidden word
                {
                    displayText2 = displayText2 + tempWord.wordDisplayName + " &nbsp&nbsp&nbsp&nbsp&nbsp ";
                }
            }
            
            
            var hiddenWordFound = false;
            for (var i = 0; i < wordList.length; i++)
            {
                tempWord = wordList[i];
                if (tempWord.alphabetQuestHiddenWord)
                {
                    tempWord.alphabetQuestHiddenWord = false;
                    hiddenWordFound = true;
                    var FirstLetterHW = tempWord.wordName.substring(0, 1);
                    var LengthHW = tempWord.wordLength;

                    displayText = "Hidden word begins with the letter" + "<br>" + " \"" + FirstLetterHW + "\"" + " and is " +
                            LengthHW + " letters long." + "<br>" + "It will match the theme of the following words:" + "<br>" + displayText2;
                    
                    //displayText = "HIDDEN WORD BEGINS WITH THE LETTER " + " \"" + FirstLetterHW + "\"" + "<br>" + "AND IS " +
                            //LengthHW + " LETTERS LONG." + "<br>" + "IT WILL MATCH THEME OF FOLLOWING WORDS:" + "<br>" + displayText2;
                    
                    break;
                }

            }

            if (!hiddenWordFound)  // Won Game
            {
                sceneController.gameOver = true;
                clearTimeout(starTimer1);
                clearTimeout(starTimer2);
                
                
                
                
            }

        }

        }

        if (sceneController.gameOver || sceneController.giveUpOnHiddenWord || sceneController.solveCube)
        {
            // Add all Words back to text view
            displayText = displayText = " ";
            for (var i = 0; i < wordList.length; i++) 
            {
                var tempWord2 = wordList[i];
                displayText = displayText + tempWord2.wordDisplayName + " &nbsp&nbsp&nbsp&nbsp&nbsp ";
            }

        }

        tempWdX.innerHTML = displayText;



        tempWd.show({
            effect: "fade",
            duration: 300
        });
    
    
    }); 
    
    
}