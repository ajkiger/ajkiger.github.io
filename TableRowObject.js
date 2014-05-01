/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function TableRowObject(){
    
    this.date = null;
    this.cubeSize = null;
    this.wordList = null;
    this.highScore = null;
    this.scoreRate = null;
    
};

TableRowObject.prototype.date = null;
TableRowObject.prototype.cubeSize = null;
TableRowObject.prototype.wordList = null;
TableRowObject.prototype.highScore = null;
TableRowObject.prototype.scoreRate = null;

TableRowObject.prototype.init = function(){
    
    this.date = null;
    this.cubeSize = null;
    this.wordList = null;
    this.highScore = " ";
    this.scoreRate = " ";
    
    
};

function PrintTableElements(aList){
    
    var returnString = " - ";
    
    for (var i = 0; i < aList.length; i++)
    {
        var tempWW = aList[i];
        returnString = returnString + tempWW.date + " - ";
        
    }
    
    document.getElementById('xcoord').innerHTML = "Table Element: " + returnString;
}