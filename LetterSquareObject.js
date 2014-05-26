/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function LetterSquareObject(){
    
    this.squareLetter = "!!!!";

    this.currentPosition = null;
    this.topPosition = null;
    this.topRightPosition = null;
    this.rightPosition = null;
    this.bottomRightPosition = null;
    this.bottomPosition = null;
    this.bottomLeftPosition = null;
    this.leftPosition = null;
    this.topLeftPosition = null;

    this.lengthTopPosition = null;
    this.lengthTopRightPosition = null;
    this.lengthRightPosition;
    this.lengthBottomRightPosition = null;
    this.lengthBottomPosition = null;
    this.lengthBottomLeftPosition = null;
    this.lengthLeftPosition = null;
    this.lengthTopLeftPosition = null;

    this.positionOccupied = false;
    this.squareFlipped = false;
};
LetterSquareObject.prototype.squareLetter = "!!!!";
LetterSquareObject.prototype.currentPosition = null;
LetterSquareObject.prototype.topPosition = null;
LetterSquareObject.prototype.topRightPosition = null;
LetterSquareObject.prototype.rightPosition = null;
LetterSquareObject.prototype.bottomRightPosition = null;
LetterSquareObject.prototype.bottomPosition = null;
LetterSquareObject.prototype.bottomLeftPosition = null;
LetterSquareObject.prototype.leftPosition = null;
LetterSquareObject.prototype.topLeftPosition = null;

LetterSquareObject.prototype.lengthTopPosition = null;
LetterSquareObject.prototype.lengthTopRightPosition = null;
LetterSquareObject.prototype.lengthRightPosition = null;
LetterSquareObject.prototype.lengthBottomRightPosition = null;
LetterSquareObject.prototype.lengthBottomPosition = null;
LetterSquareObject.prototype.lengthBottomLeftPosition = null;
LetterSquareObject.prototype.lengthLeftPosition = null;
LetterSquareObject.prototype.lengthTopLeftPosition = null;

LetterSquareObject.prototype.positionOccupied = false;
LetterSquareObject.prototype.squareFlipped = false;

LetterSquareObject.prototype.toString = function(){
    return "squareLetter: " + this.squareLetter + "  this.currentPosition: " + this.currentPosition;
};

LetterSquareObject.prototype.setUp4x4 = function(index){
        
    switch (index){
        case 0:

            this.currentPosition = 0;
            this.topPosition = 5;
            this.topRightPosition = 6;
            this.rightPosition = 7;
            this.bottomRightPosition = 8;
            this.bottomPosition = 1;
            this.bottomLeftPosition = 2;
            this.leftPosition = 3;
            this.topLeftPosition = 4;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;

            break;
        case 1:

            this.currentPosition = 1;
            this.topPosition = 0;
            this.topRightPosition = 7;
            this.rightPosition = 8;
            this.bottomRightPosition = 9;
            this.bottomPosition = 10;
            this.bottomLeftPosition = 11;
            this.leftPosition = 2;
            this.topLeftPosition = 3;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 3;

            break;
        case 2:

            this.currentPosition = 2;
            this.topPosition = 3;
            this.topRightPosition = 0;
            this.rightPosition = 1;
            this.bottomRightPosition = 10;
            this.bottomPosition = 11;
            this.bottomLeftPosition = 12;
            this.leftPosition = 13;
            this.topLeftPosition = 14;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 3:

            this.currentPosition = 3;
            this.topPosition = 4;
            this.topRightPosition = 5;
            this.rightPosition = 0;
            this.bottomRightPosition = 1;
            this.bottomPosition = 2;
            this.bottomLeftPosition = 13;
            this.leftPosition = 14;
            this.topLeftPosition = 15;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 2;

            break;
        case 4:

            this.currentPosition = 4;
            this.topPosition = 75;
            this.topRightPosition = 74;
            this.rightPosition = 5;
            this.bottomRightPosition = 0;
            this.bottomPosition = 3;
            this.bottomLeftPosition = 14;
            this.leftPosition = 15;
            this.topLeftPosition = 76;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 5;

            break;
        case 5:

            this.currentPosition = 5;
            this.topPosition = 74;
            this.topRightPosition = 73;
            this.rightPosition = 6;
            this.bottomRightPosition = 7;
            this.bottomPosition = 0;
            this.bottomLeftPosition = 3;
            this.leftPosition = 4;
            this.topLeftPosition = 75;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 5;

            break;
        case 6:

            this.currentPosition = 6;
            this.topPosition = 73;
            this.topRightPosition = -1;
            this.rightPosition = 63;
            this.bottomRightPosition = 62;
            this.bottomPosition = 7;
            this.bottomLeftPosition = 0;
            this.leftPosition = 5;
            this.topLeftPosition = 74;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 5;

            break;
        case 7:

            this.currentPosition = 7;
            this.topPosition = 6;
            this.topRightPosition = 63;
            this.rightPosition = 62;
            this.bottomRightPosition = 61;
            this.bottomPosition = 8;
            this.bottomLeftPosition = 1;
            this.leftPosition = 0;
            this.topLeftPosition = 5;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 8:

            this.currentPosition = 8;
            this.topPosition = 7;
            this.topRightPosition = 62;
            this.rightPosition = 61;
            this.bottomRightPosition = 60;
            this.bottomPosition = 9;
            this.bottomLeftPosition = 10;
            this.leftPosition = 1;
            this.topLeftPosition = 0;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 9:

            this.currentPosition = 9;
            this.topPosition = 8;
            this.topRightPosition = 61;
            this.rightPosition = 60;
            this.bottomRightPosition = -1;
            this.bottomPosition = 86;
            this.bottomLeftPosition = 85;
            this.leftPosition = 10;
            this.topLeftPosition = 1;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 4;

            break;
        case 10:

            this.currentPosition = 10;
            this.topPosition = 1;
            this.topRightPosition = 8;
            this.rightPosition = 9;
            this.bottomRightPosition = 86;
            this.bottomPosition = 85;
            this.bottomLeftPosition = 84;
            this.leftPosition = 11;
            this.topLeftPosition = 2;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 11:

            this.currentPosition = 11;
            this.topPosition = 2;
            this.topRightPosition = 1;
            this.rightPosition = 10;
            this.bottomRightPosition = 85;
            this.bottomPosition = 84;
            this.bottomLeftPosition = 95;
            this.leftPosition = 12;
            this.topLeftPosition = 13;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 12:

            this.currentPosition = 12;
            this.topPosition = 13;
            this.topRightPosition = 2;
            this.rightPosition = 11;
            this.bottomRightPosition = 84;
            this.bottomPosition = 95;
            this.bottomLeftPosition = -1;
            this.leftPosition = 41;
            this.topLeftPosition = 40;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 13:

            this.currentPosition = 13;
            this.topPosition = 14;
            this.topRightPosition = 3;
            this.rightPosition = 2;
            this.bottomRightPosition = 11;
            this.bottomPosition = 12;
            this.bottomLeftPosition = 41;
            this.leftPosition = 40;
            this.topLeftPosition = 39;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 14:

            this.currentPosition = 14;
            this.topPosition = 15;
            this.topRightPosition = 4;
            this.rightPosition = 3;
            this.bottomRightPosition = 2;
            this.bottomPosition = 13;
            this.bottomLeftPosition = 40;
            this.leftPosition = 39;
            this.topLeftPosition = 38;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 15:

            this.currentPosition = 15;
            this.topPosition = 76;
            this.topRightPosition = 75;
            this.rightPosition = 4;
            this.bottomRightPosition = 3;
            this.bottomPosition = 14;
            this.bottomLeftPosition = 39;
            this.leftPosition = 38;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 1;

            break;
        case 16:

            this.currentPosition = 16;
            this.topPosition = 21;
            this.topRightPosition = 22;
            this.rightPosition = 23;
            this.bottomRightPosition = 24;
            this.bottomPosition = 17;
            this.bottomLeftPosition = 18;
            this.leftPosition = 19;
            this.topLeftPosition = 20;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;

            break;
        case 17:

            this.currentPosition = 17;
            this.topPosition = 16;
            this.topRightPosition = 23;
            this.rightPosition = 24;
            this.bottomRightPosition = 25;
            this.bottomPosition = 26;
            this.bottomLeftPosition = 27;
            this.leftPosition = 18;
            this.topLeftPosition = 19;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 3;

            break;
        case 18:

            this.currentPosition = 18;
            this.topPosition = 19;
            this.topRightPosition = 16;
            this.rightPosition = 17;
            this.bottomRightPosition = 26;
            this.bottomPosition = 27;
            this.bottomLeftPosition = 28;
            this.leftPosition = 29;
            this.topLeftPosition = 30;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 19:

            this.currentPosition = 19;
            this.topPosition = 20;
            this.topRightPosition = 21;
            this.rightPosition = 16;
            this.bottomRightPosition = 17;
            this.bottomPosition = 18;
            this.bottomLeftPosition = 29;
            this.leftPosition = 30;
            this.topLeftPosition = 31;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 2;

            break;
        case 20:

            this.currentPosition = 20;
            this.topPosition = 69;
            this.topRightPosition = 68;
            this.rightPosition = 21;
            this.bottomRightPosition = 16;
            this.bottomPosition = 19;
            this.bottomLeftPosition = 30;
            this.leftPosition = 31;
            this.topLeftPosition = 70;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 5;

            break;
        case 21:

            this.currentPosition = 21;
            this.topPosition = 68;
            this.topRightPosition = 79;
            this.rightPosition = 22;
            this.bottomRightPosition = 23;
            this.bottomPosition = 16;
            this.bottomLeftPosition = 19;
            this.leftPosition = 20;
            this.topLeftPosition = 69;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 5;

            break;
        case 22:

            this.currentPosition = 22;
            this.topPosition = 79;
            this.topRightPosition = -1;
            this.rightPosition = 47;
            this.bottomRightPosition = 46;
            this.bottomPosition = 23;
            this.bottomLeftPosition = 16;
            this.leftPosition = 21;
            this.topLeftPosition = 68;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 5;

            break;
        case 23:

            this.currentPosition = 23;
            this.topPosition = 22;
            this.topRightPosition = 47;
            this.rightPosition = 46;
            this.bottomRightPosition = 45;
            this.bottomPosition = 24;
            this.bottomLeftPosition = 17;
            this.leftPosition = 16;
            this.topLeftPosition = 21;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 24:

            this.currentPosition = 24;
            this.topPosition = 23;
            this.topRightPosition = 46;
            this.rightPosition = 45;
            this.bottomRightPosition = 44;
            this.bottomPosition = 25;
            this.bottomLeftPosition = 26;
            this.leftPosition = 17;
            this.topLeftPosition = 16;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 25:

            this.currentPosition = 25;
            this.topPosition = 24;
            this.topRightPosition = 45;
            this.rightPosition = 44;
            this.bottomRightPosition = -1;
            this.bottomPosition = 92;
            this.bottomLeftPosition = 91;
            this.leftPosition = 26;
            this.topLeftPosition = 17;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 4;

            break;
        case 26:

            this.currentPosition = 26;
            this.topPosition = 17;
            this.topRightPosition = 24;
            this.rightPosition = 25;
            this.bottomRightPosition = 92;
            this.bottomPosition = 91;
            this.bottomLeftPosition = 90;
            this.leftPosition = 27;
            this.topLeftPosition = 18;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 27:

            this.currentPosition = 27;
            this.topPosition = 18;
            this.topRightPosition = 17;
            this.rightPosition = 26;
            this.bottomRightPosition = 91;
            this.bottomPosition = 90;
            this.bottomLeftPosition = 89;
            this.leftPosition = 28;
            this.topLeftPosition = 29;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 28:

            this.currentPosition = 28;
            this.topPosition = 29;
            this.topRightPosition = 18;
            this.rightPosition = 27;
            this.bottomRightPosition = 90;
            this.bottomPosition = 89;
            this.bottomLeftPosition = -1;
            this.leftPosition = 57;
            this.topLeftPosition = 56;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 29:

            this.currentPosition = 29;
            this.topPosition = 30;
            this.topRightPosition = 19;
            this.rightPosition = 18;
            this.bottomRightPosition = 27;
            this.bottomPosition = 28;
            this.bottomLeftPosition = 57;
            this.leftPosition = 56;
            this.topLeftPosition = 55;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 30:

            this.currentPosition = 30;
            this.topPosition = 31;
            this.topRightPosition = 20;
            this.rightPosition = 19;
            this.bottomRightPosition = 18;
            this.bottomPosition = 29;
            this.bottomLeftPosition = 56;
            this.leftPosition = 55;
            this.topLeftPosition = 54;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 31:

            this.currentPosition = 31;
            this.topPosition = 70;
            this.topRightPosition = 69;
            this.rightPosition = 20;
            this.bottomRightPosition = 19;
            this.bottomPosition = 30;
            this.bottomLeftPosition = 55;
            this.leftPosition = 54;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 1;

            break;
        case 32:

            this.currentPosition = 32;
            this.topPosition = 37;
            this.topRightPosition = 38;
            this.rightPosition = 39;
            this.bottomRightPosition = 40;
            this.bottomPosition = 33;
            this.bottomLeftPosition = 34;
            this.leftPosition = 35;
            this.topLeftPosition = 36;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;

            break;
        case 33:

            this.currentPosition = 33;
            this.topPosition = 32;
            this.topRightPosition = 39;
            this.rightPosition = 40;
            this.bottomRightPosition = 41;
            this.bottomPosition = 42;
            this.bottomLeftPosition = 43;
            this.leftPosition = 34;
            this.topLeftPosition = 35;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 3;

            break;
        case 34:

            this.currentPosition = 34;
            this.topPosition = 35;
            this.topRightPosition = 32;
            this.rightPosition = 33;
            this.bottomRightPosition = 42;
            this.bottomPosition = 43;
            this.bottomLeftPosition = 44;
            this.leftPosition = 45;
            this.topLeftPosition = 46;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 35:

            this.currentPosition = 35;
            this.topPosition = 36;
            this.topRightPosition = 37;
            this.rightPosition = 32;
            this.bottomRightPosition = 33;
            this.bottomPosition = 34;
            this.bottomLeftPosition = 45;
            this.leftPosition = 46;
            this.topLeftPosition = 47;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 2;

            break;
        case 36:

            this.currentPosition = 36;
            this.topPosition = 78;
            this.topRightPosition = 77;
            this.rightPosition = 37;
            this.bottomRightPosition = 32;
            this.bottomPosition = 35;
            this.bottomLeftPosition = 46;
            this.leftPosition = 47;
            this.topLeftPosition = 79;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 5;

            break;
        case 37:

            this.currentPosition = 37;
            this.topPosition = 77;
            this.topRightPosition = 76;
            this.rightPosition = 38;
            this.bottomRightPosition = 39;
            this.bottomPosition = 32;
            this.bottomLeftPosition = 35;
            this.leftPosition = 36;
            this.topLeftPosition = 78;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 5;

            break;
        case 38:

            this.currentPosition = 38;
            this.topPosition = 76;
            this.topRightPosition = -1;
            this.rightPosition = 15;
            this.bottomRightPosition = 14;
            this.bottomPosition = 39;
            this.bottomLeftPosition = 32;
            this.leftPosition = 37;
            this.topLeftPosition = 77;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 5;

            break;
        case 39:

            this.currentPosition = 39;
            this.topPosition = 38;
            this.topRightPosition = 15;
            this.rightPosition = 14;
            this.bottomRightPosition = 13;
            this.bottomPosition = 40;
            this.bottomLeftPosition = 33;
            this.leftPosition = 32;
            this.topLeftPosition = 37;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 40:

            this.currentPosition = 40;
            this.topPosition = 39;
            this.topRightPosition = 14;
            this.rightPosition = 13;
            this.bottomRightPosition = 12;
            this.bottomPosition = 41;
            this.bottomLeftPosition = 42;
            this.leftPosition = 33;
            this.topLeftPosition = 32;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 41:

            this.currentPosition = 41;
            this.topPosition = 40;
            this.topRightPosition = 13;
            this.rightPosition = 12;
            this.bottomRightPosition = -1;
            this.bottomPosition = 95;
            this.bottomLeftPosition = 94;
            this.leftPosition = 42;
            this.topLeftPosition = 33;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 4;

            break;
        case 42:

            this.currentPosition = 42;
            this.topPosition = 33;
            this.topRightPosition = 40;
            this.rightPosition = 41;
            this.bottomRightPosition = 95;
            this.bottomPosition = 94;
            this.bottomLeftPosition = 93;
            this.leftPosition = 43;
            this.topLeftPosition = 34;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 43:

            this.currentPosition = 43;
            this.topPosition = 34;
            this.topRightPosition = 33;
            this.rightPosition = 42;
            this.bottomRightPosition = 94;
            this.bottomPosition = 93;
            this.bottomLeftPosition = 92;
            this.leftPosition = 44;
            this.topLeftPosition = 45;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 44:

            this.currentPosition = 44;
            this.topPosition = 45;
            this.topRightPosition = 34;
            this.rightPosition = 43;
            this.bottomRightPosition = 93;
            this.bottomPosition = 92;
            this.bottomLeftPosition = -1;
            this.leftPosition = 25;
            this.topLeftPosition = 24;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 45:

            this.currentPosition = 45;
            this.topPosition = 46;
            this.topRightPosition = 35;
            this.rightPosition = 34;
            this.bottomRightPosition = 43;
            this.bottomPosition = 44;
            this.bottomLeftPosition = 25;
            this.leftPosition = 24;
            this.topLeftPosition = 23;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 46:

            this.currentPosition = 46;
            this.topPosition = 47;
            this.topRightPosition = 36;
            this.rightPosition = 35;
            this.bottomRightPosition = 34;
            this.bottomPosition = 45;
            this.bottomLeftPosition = 24;
            this.leftPosition = 23;
            this.topLeftPosition = 22;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 47:

            this.currentPosition = 47;
            this.topPosition = 79;
            this.topRightPosition = 78;
            this.rightPosition = 36;
            this.bottomRightPosition = 35;
            this.bottomPosition = 46;
            this.bottomLeftPosition = 23;
            this.leftPosition = 22;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 1;

            break;
        case 48:

            this.currentPosition = 48;
            this.topPosition = 53;
            this.topRightPosition = 54;
            this.rightPosition = 55;
            this.bottomRightPosition = 56;
            this.bottomPosition = 49;
            this.bottomLeftPosition = 50;
            this.leftPosition = 51;
            this.topLeftPosition = 52;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;

            break;
        case 49:

            this.currentPosition = 49;
            this.topPosition = 48;
            this.topRightPosition = 55;
            this.rightPosition = 56;
            this.bottomRightPosition = 57;
            this.bottomPosition = 58;
            this.bottomLeftPosition = 59;
            this.leftPosition = 50;
            this.topLeftPosition = 51;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 3;

            break;
        case 50:

            this.currentPosition = 50;
            this.topPosition = 51;
            this.topRightPosition = 48;
            this.rightPosition = 49;
            this.bottomRightPosition = 58;
            this.bottomPosition = 59;
            this.bottomLeftPosition = 60;
            this.leftPosition = 61;
            this.topLeftPosition = 62;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 51:

            this.currentPosition = 51;
            this.topPosition = 52;
            this.topRightPosition = 53;
            this.rightPosition = 48;
            this.bottomRightPosition = 49;
            this.bottomPosition = 50;
            this.bottomLeftPosition = 61;
            this.leftPosition = 62;
            this.topLeftPosition = 63;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 2;

            break;
        case 52:

            this.currentPosition = 52;
            this.topPosition = 72;
            this.topRightPosition = 71;
            this.rightPosition = 53;
            this.bottomRightPosition = 48;
            this.bottomPosition = 51;
            this.bottomLeftPosition = 62;
            this.leftPosition = 63;
            this.topLeftPosition = 73;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 5;

            break;
        case 53:

            this.currentPosition = 53;
            this.topPosition = 71;
            this.topRightPosition = 70;
            this.rightPosition = 54;
            this.bottomRightPosition = 55;
            this.bottomPosition = 48;
            this.bottomLeftPosition = 51;
            this.leftPosition = 52;
            this.topLeftPosition = 72;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 5;

            break;
        case 54:

            this.currentPosition = 54;
            this.topPosition = 70;
            this.topRightPosition = -1;
            this.rightPosition = 31;
            this.bottomRightPosition = 30;
            this.bottomPosition = 55;
            this.bottomLeftPosition = 48;
            this.leftPosition = 53;
            this.topLeftPosition = 71;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 5;

            break;
        case 55:

            this.currentPosition = 55;
            this.topPosition = 54;
            this.topRightPosition = 31;
            this.rightPosition = 30;
            this.bottomRightPosition = 29;
            this.bottomPosition = 56;
            this.bottomLeftPosition = 49;
            this.leftPosition = 48;
            this.topLeftPosition = 53;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 56:

            this.currentPosition = 56;
            this.topPosition = 55;
            this.topRightPosition = 30;
            this.rightPosition = 29;
            this.bottomRightPosition = 28;
            this.bottomPosition = 57;
            this.bottomLeftPosition = 58;
            this.leftPosition = 49;
            this.topLeftPosition = 48;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 57:

            this.currentPosition = 57;
            this.topPosition = 56;
            this.topRightPosition = 29;
            this.rightPosition = 28;
            this.bottomRightPosition = -1;
            this.bottomPosition = 89;
            this.bottomLeftPosition = 88;
            this.leftPosition = 58;
            this.topLeftPosition = 49;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 4;

            break;
        case 58:

            this.currentPosition = 58;
            this.topPosition = 49;
            this.topRightPosition = 56;
            this.rightPosition = 57;
            this.bottomRightPosition = 89;
            this.bottomPosition = 88;
            this.bottomLeftPosition = 87;
            this.leftPosition = 59;
            this.topLeftPosition = 50;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 59:

            this.currentPosition = 59;
            this.topPosition = 50;
            this.topRightPosition = 49;
            this.rightPosition = 58;
            this.bottomRightPosition = 88;
            this.bottomPosition = 87;
            this.bottomLeftPosition = 86;
            this.leftPosition = 60;
            this.topLeftPosition = 61;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 60:

            this.currentPosition = 60;
            this.topPosition = 61;
            this.topRightPosition = 50;
            this.rightPosition = 59;
            this.bottomRightPosition = 87;
            this.bottomPosition = 86;
            this.bottomLeftPosition = -1;
            this.leftPosition = 9;
            this.topLeftPosition = 8;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 61:

            this.currentPosition = 61;
            this.topPosition = 62;
            this.topRightPosition = 51;
            this.rightPosition = 50;
            this.bottomRightPosition = 59;
            this.bottomPosition = 60;
            this.bottomLeftPosition = 9;
            this.leftPosition = 8;
            this.topLeftPosition = 7;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 62:

            this.currentPosition = 62;
            this.topPosition = 63;
            this.topRightPosition = 52;
            this.rightPosition = 51;
            this.bottomRightPosition = 50;
            this.bottomPosition = 61;
            this.bottomLeftPosition = 8;
            this.leftPosition = 7;
            this.topLeftPosition = 6;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 63:

            this.currentPosition = 63;
            this.topPosition = 73;
            this.topRightPosition = 72;
            this.rightPosition = 52;
            this.bottomRightPosition = 51;
            this.bottomPosition = 62;
            this.bottomLeftPosition = 7;
            this.leftPosition = 6;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 1;

            break;
        case 64:

            this.currentPosition = 64;
            this.topPosition = 69;
            this.topRightPosition = 70;
            this.rightPosition = 71;
            this.bottomRightPosition = 72;
            this.bottomPosition = 65;
            this.bottomLeftPosition = 66;
            this.leftPosition = 67;
            this.topLeftPosition = 68;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;

            break;
        case 65:

            this.currentPosition = 65;
            this.topPosition = 64;
            this.topRightPosition = 71;
            this.rightPosition = 72;
            this.bottomRightPosition = 73;
            this.bottomPosition = 74;
            this.bottomLeftPosition = 75;
            this.leftPosition = 66;
            this.topLeftPosition = 67;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 3;

            break;
        case 66:

            this.currentPosition = 66;
            this.topPosition = 67;
            this.topRightPosition = 64;
            this.rightPosition = 65;
            this.bottomRightPosition = 74;
            this.bottomPosition = 75;
            this.bottomLeftPosition = 76;
            this.leftPosition = 77;
            this.topLeftPosition = 78;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 67:

            this.currentPosition = 67;
            this.topPosition = 68;
            this.topRightPosition = 69;
            this.rightPosition = 64;
            this.bottomRightPosition = 65;
            this.bottomPosition = 66;
            this.bottomLeftPosition = 77;
            this.leftPosition = 78;
            this.topLeftPosition = 79;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 2;

            break;
        case 68:

            this.currentPosition = 68;
            this.topPosition = 21;
            this.topRightPosition = 20;
            this.rightPosition = 69;
            this.bottomRightPosition = 64;
            this.bottomPosition = 67;
            this.bottomLeftPosition = 78;
            this.leftPosition = 79;
            this.topLeftPosition = 22;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 5;

            break;
        case 69:

            this.currentPosition = 69;
            this.topPosition = 20;
            this.topRightPosition = 31;
            this.rightPosition = 70;
            this.bottomRightPosition = 71;
            this.bottomPosition = 64;
            this.bottomLeftPosition = 67;
            this.leftPosition = 68;
            this.topLeftPosition = 21;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 5;

            break;
        case 70:

            this.currentPosition = 70;
            this.topPosition = 31;
            this.topRightPosition = -1;
            this.rightPosition = 54;
            this.bottomRightPosition = 53;
            this.bottomPosition = 71;
            this.bottomLeftPosition = 64;
            this.leftPosition = 69;
            this.topLeftPosition = 20;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 5;

            break;
        case 71:

            this.currentPosition = 71;
            this.topPosition = 70;
            this.topRightPosition = 54;
            this.rightPosition = 53;
            this.bottomRightPosition = 52;
            this.bottomPosition = 72;
            this.bottomLeftPosition = 65;
            this.leftPosition = 64;
            this.topLeftPosition = 69;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 72:

            this.currentPosition = 72;
            this.topPosition = 71;
            this.topRightPosition = 53;
            this.rightPosition = 52;
            this.bottomRightPosition = 63;
            this.bottomPosition = 73;
            this.bottomLeftPosition = 74;
            this.leftPosition = 65;
            this.topLeftPosition = 64;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 73:

            this.currentPosition = 73;
            this.topPosition = 72;
            this.topRightPosition = 52;
            this.rightPosition = 63;
            this.bottomRightPosition = -1;
            this.bottomPosition = 6;
            this.bottomLeftPosition = 5;
            this.leftPosition = 74;
            this.topLeftPosition = 65;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 4;

            break;
        case 74:

            this.currentPosition = 74;
            this.topPosition = 65;
            this.topRightPosition = 72;
            this.rightPosition = 73;
            this.bottomRightPosition = 6;
            this.bottomPosition = 5;
            this.bottomLeftPosition = 4;
            this.leftPosition = 75;
            this.topLeftPosition = 66;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 75:

            this.currentPosition = 75;
            this.topPosition = 66;
            this.topRightPosition = 65;
            this.rightPosition = 74;
            this.bottomRightPosition = 5;
            this.bottomPosition = 4;
            this.bottomLeftPosition = 15;
            this.leftPosition = 76;
            this.topLeftPosition = 77;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 76:

            this.currentPosition = 76;
            this.topPosition = 77;
            this.topRightPosition = 66;
            this.rightPosition = 75;
            this.bottomRightPosition = 4;
            this.bottomPosition = 15;
            this.bottomLeftPosition = -1;
            this.leftPosition = 38;
            this.topLeftPosition = 37;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 77:

            this.currentPosition = 77;
            this.topPosition = 78;
            this.topRightPosition = 67;
            this.rightPosition = 66;
            this.bottomRightPosition = 75;
            this.bottomPosition = 76;
            this.bottomLeftPosition = 38;
            this.leftPosition = 37;
            this.topLeftPosition = 36;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 78:

            this.currentPosition = 78;
            this.topPosition = 79;
            this.topRightPosition = 68;
            this.rightPosition = 67;
            this.bottomRightPosition = 66;
            this.bottomPosition = 77;
            this.bottomLeftPosition = 37;
            this.leftPosition = 36;
            this.topLeftPosition = 47;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 79:

            this.currentPosition = 79;
            this.topPosition = 22;
            this.topRightPosition = 21;
            this.rightPosition = 68;
            this.bottomRightPosition = 67;
            this.bottomPosition = 78;
            this.bottomLeftPosition = 36;
            this.leftPosition = 47;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 1;

            break;
        case 80:

            this.currentPosition = 80;
            this.topPosition = 85;
            this.topRightPosition = 86;
            this.rightPosition = 87;
            this.bottomRightPosition = 88;
            this.bottomPosition = 81;
            this.bottomLeftPosition = 82;
            this.leftPosition = 83;
            this.topLeftPosition = 84;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;

            break;
        case 81:

            this.currentPosition = 81;
            this.topPosition = 80;
            this.topRightPosition = 87;
            this.rightPosition = 88;
            this.bottomRightPosition = 89;
            this.bottomPosition = 90;
            this.bottomLeftPosition = 91;
            this.leftPosition = 82;
            this.topLeftPosition = 83;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 3;

            break;
        case 82:

            this.currentPosition = 82;
            this.topPosition = 83;
            this.topRightPosition = 80;
            this.rightPosition = 81;
            this.bottomRightPosition = 90;
            this.bottomPosition = 91;
            this.bottomLeftPosition = 92;
            this.leftPosition = 93;
            this.topLeftPosition = 94;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 83:

            this.currentPosition = 83;
            this.topPosition = 84;
            this.topRightPosition = 85;
            this.rightPosition = 80;
            this.bottomRightPosition = 81;
            this.bottomPosition = 82;
            this.bottomLeftPosition = 93;
            this.leftPosition = 94;
            this.topLeftPosition = 95;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 2;

            break;
        case 84:

            this.currentPosition = 84;
            this.topPosition = 11;
            this.topRightPosition = 10;
            this.rightPosition = 85;
            this.bottomRightPosition = 80;
            this.bottomPosition = 83;
            this.bottomLeftPosition = 94;
            this.leftPosition = 95;
            this.topLeftPosition = 12;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 5;

            break;
        case 85:

            this.currentPosition = 85;
            this.topPosition = 10;
            this.topRightPosition = 9;
            this.rightPosition = 86;
            this.bottomRightPosition = 87;
            this.bottomPosition = 80;
            this.bottomLeftPosition = 83;
            this.leftPosition = 84;
            this.topLeftPosition = 11;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 5;

            break;
        case 86:

            this.currentPosition = 86;
            this.topPosition = 9;
            this.topRightPosition = -1;
            this.rightPosition = 60;
            this.bottomRightPosition = 59;
            this.bottomPosition = 87;
            this.bottomLeftPosition = 80;
            this.leftPosition = 85;
            this.topLeftPosition = 10;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 5;

            break;
        case 87:

            this.currentPosition = 87;
            this.topPosition = 86;
            this.topRightPosition = 60;
            this.rightPosition = 59;
            this.bottomRightPosition = 58;
            this.bottomPosition = 88;
            this.bottomLeftPosition = 81;
            this.leftPosition = 80;
            this.topLeftPosition = 85;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 88:

            this.currentPosition = 88;
            this.topPosition = 87;
            this.topRightPosition = 59;
            this.rightPosition = 58;
            this.bottomRightPosition = 57;
            this.bottomPosition = 89;
            this.bottomLeftPosition = 90;
            this.leftPosition = 81;
            this.topLeftPosition = 80;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 89:

            this.currentPosition = 89;
            this.topPosition = 88;
            this.topRightPosition = 58;
            this.rightPosition = 57;
            this.bottomRightPosition = -1;
            this.bottomPosition = 28;
            this.bottomLeftPosition = 27;
            this.leftPosition = 90;
            this.topLeftPosition = 81;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 5;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 4;

            break;
        case 90:

            this.currentPosition = 90;
            this.topPosition = 81;
            this.topRightPosition = 88;
            this.rightPosition = 89;
            this.bottomRightPosition = 28;
            this.bottomPosition = 27;
            this.bottomLeftPosition = 26;
            this.leftPosition = 91;
            this.topLeftPosition = 82;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 91:

            this.currentPosition = 91;
            this.topPosition = 82;
            this.topRightPosition = 81;
            this.rightPosition = 90;
            this.bottomRightPosition = 27;
            this.bottomPosition = 26;
            this.bottomLeftPosition = 25;
            this.leftPosition = 92;
            this.topLeftPosition = 93;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;

            break;
        case 92:

            this.currentPosition = 92;
            this.topPosition = 93;
            this.topRightPosition = 82;
            this.rightPosition = 91;
            this.bottomRightPosition = 26;
            this.bottomPosition = 25;
            this.bottomLeftPosition = -1;
            this.leftPosition = 44;
            this.topLeftPosition = 43;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 5;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 93:

            this.currentPosition = 93;
            this.topPosition = 94;
            this.topRightPosition = 83;
            this.rightPosition = 82;
            this.bottomRightPosition = 91;
            this.bottomPosition = 92;
            this.bottomLeftPosition = 44;
            this.leftPosition = 43;
            this.topLeftPosition = 42;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 94:

            this.currentPosition = 94;
            this.topPosition = 95;
            this.topRightPosition = 84;
            this.rightPosition = 83;
            this.bottomRightPosition = 82;
            this.bottomPosition = 93;
            this.bottomLeftPosition = 43;
            this.leftPosition = 42;
            this.topLeftPosition = 41;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 5;

            break;
        case 95:

            this.currentPosition = 95;
            this.topPosition = 12;
            this.topRightPosition = 11;
            this.rightPosition = 84;
            this.bottomRightPosition = 83;
            this.bottomPosition = 94;
            this.bottomLeftPosition = 42;
            this.leftPosition = 41;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 5;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 5;
            this.lengthTopLeftPosition = 1;

            break;
        default:
            break;

    }
        

};



LetterSquareObject.prototype.setUp5x5 = function(index){
        
    switch (index)
    {
        case 0:

            this.currentPosition = 0;
            this.topPosition = 1;
            this.topRightPosition = 2;
            this.rightPosition = 3;
            this.bottomRightPosition = 4;
            this.bottomPosition = 5;
            this.bottomLeftPosition = 6;
            this.leftPosition = 7;
            this.topLeftPosition = 8;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 3;

            break;
        case 1:

            this.currentPosition = 1;
            this.topPosition = 9;
            this.topRightPosition = 10;
            this.rightPosition = 2;
            this.bottomRightPosition = 3;
            this.bottomPosition = 0;
            this.bottomLeftPosition = 7;
            this.leftPosition = 8;
            this.topLeftPosition = 24;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 2:

            this.currentPosition = 2;
            this.topPosition = 10;
            this.topRightPosition = 11;
            this.rightPosition = 12;
            this.bottomRightPosition = 13;
            this.bottomPosition = 3;
            this.bottomLeftPosition = 0;
            this.leftPosition = 1;
            this.topLeftPosition = 9;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 3:

            this.currentPosition = 3;
            this.topPosition = 2;
            this.topRightPosition = 12;
            this.rightPosition = 13;
            this.bottomRightPosition = 14;
            this.bottomPosition = 4;
            this.bottomLeftPosition = 5;
            this.leftPosition = 0;
            this.topLeftPosition = 1;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 4:

            this.currentPosition = 4;
            this.topPosition = 3;
            this.topRightPosition = 13;
            this.rightPosition = 14;
            this.bottomRightPosition = 15;
            this.bottomPosition = 16;
            this.bottomLeftPosition = 17;
            this.leftPosition = 5;
            this.topLeftPosition = 0;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 4;

            break;
        case 5:

            this.currentPosition = 5;
            this.topPosition = 0;
            this.topRightPosition = 3;
            this.rightPosition = 4;
            this.bottomRightPosition = 16;
            this.bottomPosition = 17;
            this.bottomLeftPosition = 18;
            this.leftPosition = 6;
            this.topLeftPosition = 7;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 6:

            this.currentPosition = 6;
            this.topPosition = 7;
            this.topRightPosition = 0;
            this.rightPosition = 5;
            this.bottomRightPosition = 17;
            this.bottomPosition = 18;
            this.bottomLeftPosition = 19;
            this.leftPosition = 20;
            this.topLeftPosition = 21;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 7:

            this.currentPosition = 7;
            this.topPosition = 8;
            this.topRightPosition = 1;
            this.rightPosition = 0;
            this.bottomRightPosition = 5;
            this.bottomPosition = 6;
            this.bottomLeftPosition = 20;
            this.leftPosition = 21;
            this.topLeftPosition = 22;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 8:

            this.currentPosition = 8;
            this.topPosition = 24;
            this.topRightPosition = 9;
            this.rightPosition = 1;
            this.bottomRightPosition = 0;
            this.bottomPosition = 7;
            this.bottomLeftPosition = 21;
            this.leftPosition = 22;
            this.topLeftPosition = 23;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 2;

            break;
        case 9:

            this.currentPosition = 9;
            this.topPosition = 117;
            this.topRightPosition = 116;
            this.rightPosition = 10;
            this.bottomRightPosition = 2;
            this.bottomPosition = 1;
            this.bottomLeftPosition = 8;
            this.leftPosition = 24;
            this.topLeftPosition = 118;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 10:

            this.currentPosition = 10;
            this.topPosition = 116;
            this.topRightPosition = 115;
            this.rightPosition = 11;
            this.bottomRightPosition = 12;
            this.bottomPosition = 2;
            this.bottomLeftPosition = 1;
            this.leftPosition = 9;
            this.topLeftPosition = 117;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 6;

            break;
        case 11:

            this.currentPosition = 11;
            this.topPosition = 115;
            this.topRightPosition = -1;
            this.rightPosition = 98;
            this.bottomRightPosition = 97;
            this.bottomPosition = 12;
            this.bottomLeftPosition = 2;
            this.leftPosition = 10;
            this.topLeftPosition = 116;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 6;



            break;
        case 12:

            this.currentPosition = 12;
            this.topPosition = 11;
            this.topRightPosition = 98;
            this.rightPosition = 97;
            this.bottomRightPosition = 96;
            this.bottomPosition = 13;
            this.bottomLeftPosition = 3;
            this.leftPosition = 2;
            this.topLeftPosition = 10;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;



            break;
        case 13:

            this.currentPosition = 13;
            this.topPosition = 12;
            this.topRightPosition = 97;
            this.rightPosition = 96;
            this.bottomRightPosition = 95;
            this.bottomPosition = 14;
            this.bottomLeftPosition = 4;
            this.leftPosition = 3;
            this.topLeftPosition = 2;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;



            break;
        case 14:

            this.currentPosition = 14;
            this.topPosition = 13;
            this.topRightPosition = 96;
            this.rightPosition = 95;
            this.bottomRightPosition = 94;
            this.bottomPosition = 15;
            this.bottomLeftPosition = 16;
            this.leftPosition = 4;
            this.topLeftPosition = 3;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;



            break;
        case 15:

            this.currentPosition = 15;
            this.topPosition = 14;
            this.topRightPosition = 95;
            this.rightPosition = 94;
            this.bottomRightPosition = -1;
            this.bottomPosition = 136;
            this.bottomLeftPosition = 135;
            this.leftPosition = 16;
            this.topLeftPosition = 4;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 5;



            break;
        case 16:

            this.currentPosition = 16;
            this.topPosition = 4;
            this.topRightPosition = 14;
            this.rightPosition = 15;
            this.bottomRightPosition = 136;
            this.bottomPosition = 135;
            this.bottomLeftPosition = 134;
            this.leftPosition = 17;
            this.topLeftPosition = 5;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;



            break;
        case 17:

            this.currentPosition = 17;
            this.topPosition = 5;
            this.topRightPosition = 4;
            this.rightPosition = 16;
            this.bottomRightPosition = 135;
            this.bottomPosition = 134;
            this.bottomLeftPosition = 149;
            this.leftPosition = 18;
            this.topLeftPosition = 6;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;



            break;
        case 18:

            this.currentPosition = 18;
            this.topPosition = 6;
            this.topRightPosition = 5;
            this.rightPosition = 17;
            this.bottomRightPosition = 134;
            this.bottomPosition = 149;
            this.bottomLeftPosition = 148;
            this.leftPosition = 19;
            this.topLeftPosition = 20;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;



            break;
        case 19:

            this.currentPosition = 19;
            this.topPosition = 20;
            this.topRightPosition = 6;
            this.rightPosition = 18;
            this.bottomRightPosition = 149;
            this.bottomPosition = 148;
            this.bottomLeftPosition = -1;
            this.leftPosition = 65;
            this.topLeftPosition = 64;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 20:

            this.currentPosition = 20;
            this.topPosition = 21;
            this.topRightPosition = 7;
            this.rightPosition = 6;
            this.bottomRightPosition = 18;
            this.bottomPosition = 19;
            this.bottomLeftPosition = 65;
            this.leftPosition = 64;
            this.topLeftPosition = 63;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 21:

            this.currentPosition = 21;
            this.topPosition = 22;
            this.topRightPosition = 8;
            this.rightPosition = 7;
            this.bottomRightPosition = 6;
            this.bottomPosition = 20;
            this.bottomLeftPosition = 64;
            this.leftPosition = 63;
            this.topLeftPosition = 62;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 22:

            this.currentPosition = 22;
            this.topPosition = 23;
            this.topRightPosition = 24;
            this.rightPosition = 8;
            this.bottomRightPosition = 7;
            this.bottomPosition = 21;
            this.bottomLeftPosition = 63;
            this.leftPosition = 62;
            this.topLeftPosition = 61;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 23:

            this.currentPosition = 23;
            this.topPosition = 119;
            this.topRightPosition = 118;
            this.rightPosition = 24;
            this.bottomRightPosition = 8;
            this.bottomPosition = 22;
            this.bottomLeftPosition = 62;
            this.leftPosition = 61;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 1;



            break;
        case 24:

            this.currentPosition = 24;
            this.topPosition = 118;
            this.topRightPosition = 117;
            this.rightPosition = 9;
            this.bottomRightPosition = 1;
            this.bottomPosition = 8;
            this.bottomLeftPosition = 22;
            this.leftPosition = 23;
            this.topLeftPosition = 119;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;



            break;
        case 25:

            this.currentPosition = 25;
            this.topPosition = 26;
            this.topRightPosition = 27;
            this.rightPosition = 28;
            this.bottomRightPosition = 29;
            this.bottomPosition = 30;
            this.bottomLeftPosition = 31;
            this.leftPosition = 32;
            this.topLeftPosition = 33;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 3;

            break;
        case 26:

            this.currentPosition = 26;
            this.topPosition = 34;
            this.topRightPosition = 35;
            this.rightPosition = 27;
            this.bottomRightPosition = 28;
            this.bottomPosition = 25;
            this.bottomLeftPosition = 32;
            this.leftPosition = 33;
            this.topLeftPosition = 49;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 27:

            this.currentPosition = 27;
            this.topPosition = 35;
            this.topRightPosition = 36;
            this.rightPosition = 37;
            this.bottomRightPosition = 38;
            this.bottomPosition = 28;
            this.bottomLeftPosition = 25;
            this.leftPosition = 26;
            this.topLeftPosition = 34;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 28:

            this.currentPosition = 28;
            this.topPosition = 27;
            this.topRightPosition = 37;
            this.rightPosition = 38;
            this.bottomRightPosition = 39;
            this.bottomPosition = 29;
            this.bottomLeftPosition = 30;
            this.leftPosition = 25;
            this.topLeftPosition = 26;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 29:

            this.currentPosition = 29;
            this.topPosition = 28;
            this.topRightPosition = 38;
            this.rightPosition = 39;
            this.bottomRightPosition = 40;
            this.bottomPosition = 41;
            this.bottomLeftPosition = 42;
            this.leftPosition = 30;
            this.topLeftPosition = 25;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 4;

            break;
        case 30:

            this.currentPosition = 30;
            this.topPosition = 25;
            this.topRightPosition = 28;
            this.rightPosition = 29;
            this.bottomRightPosition = 41;
            this.bottomPosition = 42;
            this.bottomLeftPosition = 43;
            this.leftPosition = 31;
            this.topLeftPosition = 32;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 31:

            this.currentPosition = 31;
            this.topPosition = 32;
            this.topRightPosition = 25;
            this.rightPosition = 30;
            this.bottomRightPosition = 42;
            this.bottomPosition = 43;
            this.bottomLeftPosition = 44;
            this.leftPosition = 45;
            this.topLeftPosition = 46;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 32:

            this.currentPosition = 32;
            this.topPosition = 33;
            this.topRightPosition = 26;
            this.rightPosition = 25;
            this.bottomRightPosition = 30;
            this.bottomPosition = 31;
            this.bottomLeftPosition = 45;
            this.leftPosition = 46;
            this.topLeftPosition = 47;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 33:

            this.currentPosition = 33;
            this.topPosition = 49;
            this.topRightPosition = 34;
            this.rightPosition = 26;
            this.bottomRightPosition = 25;
            this.bottomPosition = 32;
            this.bottomLeftPosition = 46;
            this.leftPosition = 47;
            this.topLeftPosition = 48;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 2;

            break;
        case 34:

            this.currentPosition = 34;
            this.topPosition = 109;
            this.topRightPosition = 124;
            this.rightPosition = 35;
            this.bottomRightPosition = 27;
            this.bottomPosition = 26;
            this.bottomLeftPosition = 33;
            this.leftPosition = 49;
            this.topLeftPosition = 110;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 35:

            this.currentPosition = 35;
            this.topPosition = 124;
            this.topRightPosition = 123;
            this.rightPosition = 36;
            this.bottomRightPosition = 37;
            this.bottomPosition = 27;
            this.bottomLeftPosition = 26;
            this.leftPosition = 34;
            this.topLeftPosition = 109;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 6;

            break;
        case 36:

            this.currentPosition = 36;
            this.topPosition = 123;
            this.topRightPosition = -1;
            this.rightPosition = 73;
            this.bottomRightPosition = 72;
            this.bottomPosition = 37;
            this.bottomLeftPosition = 27;
            this.leftPosition = 35;
            this.topLeftPosition = 124;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 6;



            break;
        case 37:

            this.currentPosition = 37;
            this.topPosition = 36;
            this.topRightPosition = 73;
            this.rightPosition = 72;
            this.bottomRightPosition = 71;
            this.bottomPosition = 38;
            this.bottomLeftPosition = 28;
            this.leftPosition = 27;
            this.topLeftPosition = 35;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;



            break;
        case 38:

            this.currentPosition = 38;
            this.topPosition = 37;
            this.topRightPosition = 72;
            this.rightPosition = 71;
            this.bottomRightPosition = 70;
            this.bottomPosition = 39;
            this.bottomLeftPosition = 29;
            this.leftPosition = 28;
            this.topLeftPosition = 27;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;



            break;
        case 39:

            this.currentPosition = 39;
            this.topPosition = 38;
            this.topRightPosition = 71;
            this.rightPosition = 70;
            this.bottomRightPosition = 69;
            this.bottomPosition = 40;
            this.bottomLeftPosition = 41;
            this.leftPosition = 29;
            this.topLeftPosition = 28;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;



            break;
        case 40:

            this.currentPosition = 40;
            this.topPosition = 39;
            this.topRightPosition = 70;
            this.rightPosition = 69;
            this.bottomRightPosition = -1;
            this.bottomPosition = 144;
            this.bottomLeftPosition = 143;
            this.leftPosition = 41;
            this.topLeftPosition = 29;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 5;



            break;
        case 41:

            this.currentPosition = 41;
            this.topPosition = 29;
            this.topRightPosition = 39;
            this.rightPosition = 40;
            this.bottomRightPosition = 144;
            this.bottomPosition = 143;
            this.bottomLeftPosition = 142;
            this.leftPosition = 42;
            this.topLeftPosition = 30;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;



            break;
        case 42:

            this.currentPosition = 42;
            this.topPosition = 30;
            this.topRightPosition = 29;
            this.rightPosition = 41;
            this.bottomRightPosition = 143;
            this.bottomPosition = 142;
            this.bottomLeftPosition = 141;
            this.leftPosition = 43;
            this.topLeftPosition = 31;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;



            break;
        case 43:

            this.currentPosition = 43;
            this.topPosition = 31;
            this.topRightPosition = 30;
            this.rightPosition = 42;
            this.bottomRightPosition = 142;
            this.bottomPosition = 141;
            this.bottomLeftPosition = 140;
            this.leftPosition = 44;
            this.topLeftPosition = 45;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;



            break;
        case 44:

            this.currentPosition = 44;
            this.topPosition = 45;
            this.topRightPosition = 31;
            this.rightPosition = 43;
            this.bottomRightPosition = 141;
            this.bottomPosition = 140;
            this.bottomLeftPosition = -1;
            this.leftPosition = 90;
            this.topLeftPosition = 89;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 45:

            this.currentPosition = 45;
            this.topPosition = 46;
            this.topRightPosition = 32;
            this.rightPosition = 31;
            this.bottomRightPosition = 43;
            this.bottomPosition = 44;
            this.bottomLeftPosition = 90;
            this.leftPosition = 89;
            this.topLeftPosition = 88;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 46:

            this.currentPosition = 46;
            this.topPosition = 47;
            this.topRightPosition = 33;
            this.rightPosition = 32;
            this.bottomRightPosition = 31;
            this.bottomPosition = 45;
            this.bottomLeftPosition = 89;
            this.leftPosition = 88;
            this.topLeftPosition = 87;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 47:

            this.currentPosition = 47;
            this.topPosition = 48;
            this.topRightPosition = 49;
            this.rightPosition = 33;
            this.bottomRightPosition = 32;
            this.bottomPosition = 46;
            this.bottomLeftPosition = 88;
            this.leftPosition = 87;
            this.topLeftPosition = 86;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 48:

            this.currentPosition = 48;
            this.topPosition = 111;
            this.topRightPosition = 110;
            this.rightPosition = 49;
            this.bottomRightPosition = 33;
            this.bottomPosition = 47;
            this.bottomLeftPosition = 87;
            this.leftPosition = 86;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 1;



            break;
        case 49:

            this.currentPosition = 49;
            this.topPosition = 110;
            this.topRightPosition = 109;
            this.rightPosition = 34;
            this.bottomRightPosition = 26;
            this.bottomPosition = 33;
            this.bottomLeftPosition = 47;
            this.leftPosition = 48;
            this.topLeftPosition = 111;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;



            break;
        case 50:

            this.currentPosition = 50;
            this.topPosition = 51;
            this.topRightPosition = 52;
            this.rightPosition = 53;
            this.bottomRightPosition = 54;
            this.bottomPosition = 55;
            this.bottomLeftPosition = 56;
            this.leftPosition = 57;
            this.topLeftPosition = 58;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 3;

            break;
        case 51:

            this.currentPosition = 51;
            this.topPosition = 59;
            this.topRightPosition = 60;
            this.rightPosition = 52;
            this.bottomRightPosition = 53;
            this.bottomPosition = 50;
            this.bottomLeftPosition = 57;
            this.leftPosition = 58;
            this.topLeftPosition = 74;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 52:

            this.currentPosition = 52;
            this.topPosition = 60;
            this.topRightPosition = 61;
            this.rightPosition = 62;
            this.bottomRightPosition = 63;
            this.bottomPosition = 53;
            this.bottomLeftPosition = 50;
            this.leftPosition = 51;
            this.topLeftPosition = 59;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 53:

            this.currentPosition = 53;
            this.topPosition = 52;
            this.topRightPosition = 62;
            this.rightPosition = 63;
            this.bottomRightPosition = 64;
            this.bottomPosition = 54;
            this.bottomLeftPosition = 55;
            this.leftPosition = 50;
            this.topLeftPosition = 51;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 54:

            this.currentPosition = 54;
            this.topPosition = 53;
            this.topRightPosition = 63;
            this.rightPosition = 64;
            this.bottomRightPosition = 65;
            this.bottomPosition = 66;
            this.bottomLeftPosition = 67;
            this.leftPosition = 55;
            this.topLeftPosition = 50;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 4;

            break;
        case 55:

            this.currentPosition = 55;
            this.topPosition = 50;
            this.topRightPosition = 53;
            this.rightPosition = 54;
            this.bottomRightPosition = 66;
            this.bottomPosition = 67;
            this.bottomLeftPosition = 68;
            this.leftPosition = 56;
            this.topLeftPosition = 57;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 56:

            this.currentPosition = 56;
            this.topPosition = 57;
            this.topRightPosition = 50;
            this.rightPosition = 55;
            this.bottomRightPosition = 67;
            this.bottomPosition = 68;
            this.bottomLeftPosition = 69;
            this.leftPosition = 70;
            this.topLeftPosition = 71;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 57:

            this.currentPosition = 57;
            this.topPosition = 58;
            this.topRightPosition = 51;
            this.rightPosition = 50;
            this.bottomRightPosition = 55;
            this.bottomPosition = 56;
            this.bottomLeftPosition = 70;
            this.leftPosition = 71;
            this.topLeftPosition = 72;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 58:

            this.currentPosition = 58;
            this.topPosition = 74;
            this.topRightPosition = 59;
            this.rightPosition = 51;
            this.bottomRightPosition = 50;
            this.bottomPosition = 57;
            this.bottomLeftPosition = 71;
            this.leftPosition = 72;
            this.topLeftPosition = 73;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 2;

            break;
        case 59:

            this.currentPosition = 59;
            this.topPosition = 121;
            this.topRightPosition = 120;
            this.rightPosition = 60;
            this.bottomRightPosition = 52;
            this.bottomPosition = 51;
            this.bottomLeftPosition = 58;
            this.leftPosition = 74;
            this.topLeftPosition = 122;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 60:

            this.currentPosition = 60;
            this.topPosition = 120;
            this.topRightPosition = 119;
            this.rightPosition = 61;
            this.bottomRightPosition = 62;
            this.bottomPosition = 52;
            this.bottomLeftPosition = 51;
            this.leftPosition = 59;
            this.topLeftPosition = 121;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 6;

            break;
        case 61:

            this.currentPosition = 61;
            this.topPosition = 119;
            this.topRightPosition = -1;
            this.rightPosition = 23;
            this.bottomRightPosition = 22;
            this.bottomPosition = 62;
            this.bottomLeftPosition = 52;
            this.leftPosition = 60;
            this.topLeftPosition = 120;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 6;



            break;
        case 62:

            this.currentPosition = 62;
            this.topPosition = 61;
            this.topRightPosition = 23;
            this.rightPosition = 22;
            this.bottomRightPosition = 21;
            this.bottomPosition = 63;
            this.bottomLeftPosition = 53;
            this.leftPosition = 52;
            this.topLeftPosition = 60;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;



            break;
        case 63:

            this.currentPosition = 63;
            this.topPosition = 62;
            this.topRightPosition = 22;
            this.rightPosition = 21;
            this.bottomRightPosition = 20;
            this.bottomPosition = 64;
            this.bottomLeftPosition = 54;
            this.leftPosition = 53;
            this.topLeftPosition = 52;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;



            break;
        case 64:

            this.currentPosition = 64;
            this.topPosition = 63;
            this.topRightPosition = 21;
            this.rightPosition = 20;
            this.bottomRightPosition = 19;
            this.bottomPosition = 65;
            this.bottomLeftPosition = 66;
            this.leftPosition = 54;
            this.topLeftPosition = 53;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;



            break;
        case 65:

            this.currentPosition = 65;
            this.topPosition = 64;
            this.topRightPosition = 20;
            this.rightPosition = 19;
            this.bottomRightPosition = -1;
            this.bottomPosition = 148;
            this.bottomLeftPosition = 147;
            this.leftPosition = 66;
            this.topLeftPosition = 54;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 5;



            break;
        case 66:

            this.currentPosition = 66;
            this.topPosition = 54;
            this.topRightPosition = 64;
            this.rightPosition = 65;
            this.bottomRightPosition = 148;
            this.bottomPosition = 147;
            this.bottomLeftPosition = 146;
            this.leftPosition = 67;
            this.topLeftPosition = 55;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;



            break;
        case 67:

            this.currentPosition = 67;
            this.topPosition = 55;
            this.topRightPosition = 54;
            this.rightPosition = 66;
            this.bottomRightPosition = 147;
            this.bottomPosition = 146;
            this.bottomLeftPosition = 145;
            this.leftPosition = 68;
            this.topLeftPosition = 56;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;



            break;
        case 68:

            this.currentPosition = 68;
            this.topPosition = 56;
            this.topRightPosition = 55;
            this.rightPosition = 67;
            this.bottomRightPosition = 146;
            this.bottomPosition = 145;
            this.bottomLeftPosition = 144;
            this.leftPosition = 69;
            this.topLeftPosition = 70;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;



            break;
        case 69:

            this.currentPosition = 69;
            this.topPosition = 70;
            this.topRightPosition = 56;
            this.rightPosition = 68;
            this.bottomRightPosition = 145;
            this.bottomPosition = 144;
            this.bottomLeftPosition = -1;
            this.leftPosition = 40;
            this.topLeftPosition = 39;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 70:

            this.currentPosition = 70;
            this.topPosition = 71;
            this.topRightPosition = 57;
            this.rightPosition = 56;
            this.bottomRightPosition = 68;
            this.bottomPosition = 69;
            this.bottomLeftPosition = 40;
            this.leftPosition = 39;
            this.topLeftPosition = 38;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 71:

            this.currentPosition = 71;
            this.topPosition = 72;
            this.topRightPosition = 58;
            this.rightPosition = 57;
            this.bottomRightPosition = 56;
            this.bottomPosition = 70;
            this.bottomLeftPosition = 39;
            this.leftPosition = 38;
            this.topLeftPosition = 37;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 72:

            this.currentPosition = 72;
            this.topPosition = 73;
            this.topRightPosition = 74;
            this.rightPosition = 58;
            this.bottomRightPosition = 57;
            this.bottomPosition = 71;
            this.bottomLeftPosition = 38;
            this.leftPosition = 37;
            this.topLeftPosition = 36;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 73:

            this.currentPosition = 73;
            this.topPosition = 123;
            this.topRightPosition = 122;
            this.rightPosition = 74;
            this.bottomRightPosition = 58;
            this.bottomPosition = 72;
            this.bottomLeftPosition = 37;
            this.leftPosition = 36;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 1;



            break;
        case 74:

            this.currentPosition = 74;
            this.topPosition = 122;
            this.topRightPosition = 121;
            this.rightPosition = 59;
            this.bottomRightPosition = 51;
            this.bottomPosition = 58;
            this.bottomLeftPosition = 72;
            this.leftPosition = 73;
            this.topLeftPosition = 123;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;



            break;
        case 75:

            this.currentPosition = 75;
            this.topPosition = 76;
            this.topRightPosition = 77;
            this.rightPosition = 78;
            this.bottomRightPosition = 79;
            this.bottomPosition = 80;
            this.bottomLeftPosition = 81;
            this.leftPosition = 82;
            this.topLeftPosition = 83;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 3;

            break;
        case 76:

            this.currentPosition = 76;
            this.topPosition = 84;
            this.topRightPosition = 85;
            this.rightPosition = 77;
            this.bottomRightPosition = 78;
            this.bottomPosition = 75;
            this.bottomLeftPosition = 82;
            this.leftPosition = 83;
            this.topLeftPosition = 99;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 77:

            this.currentPosition = 77;
            this.topPosition = 85;
            this.topRightPosition = 86;
            this.rightPosition = 87;
            this.bottomRightPosition = 88;
            this.bottomPosition = 78;
            this.bottomLeftPosition = 75;
            this.leftPosition = 76;
            this.topLeftPosition = 84;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 78:

            this.currentPosition = 78;
            this.topPosition = 77;
            this.topRightPosition = 87;
            this.rightPosition = 88;
            this.bottomRightPosition = 89;
            this.bottomPosition = 79;
            this.bottomLeftPosition = 80;
            this.leftPosition = 75;
            this.topLeftPosition = 76;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 79:

            this.currentPosition = 79;
            this.topPosition = 78;
            this.topRightPosition = 88;
            this.rightPosition = 89;
            this.bottomRightPosition = 90;
            this.bottomPosition = 91;
            this.bottomLeftPosition = 92;
            this.leftPosition = 80;
            this.topLeftPosition = 75;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 4;

            break;
        case 80:

            this.currentPosition = 80;
            this.topPosition = 75;
            this.topRightPosition = 78;
            this.rightPosition = 79;
            this.bottomRightPosition = 91;
            this.bottomPosition = 92;
            this.bottomLeftPosition = 93;
            this.leftPosition = 81;
            this.topLeftPosition = 82;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 81:

            this.currentPosition = 81;
            this.topPosition = 82;
            this.topRightPosition = 75;
            this.rightPosition = 80;
            this.bottomRightPosition = 92;
            this.bottomPosition = 93;
            this.bottomLeftPosition = 94;
            this.leftPosition = 95;
            this.topLeftPosition = 96;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 82:

            this.currentPosition = 82;
            this.topPosition = 83;
            this.topRightPosition = 76;
            this.rightPosition = 75;
            this.bottomRightPosition = 80;
            this.bottomPosition = 81;
            this.bottomLeftPosition = 95;
            this.leftPosition = 96;
            this.topLeftPosition = 97;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 83:

            this.currentPosition = 83;
            this.topPosition = 99;
            this.topRightPosition = 84;
            this.rightPosition = 76;
            this.bottomRightPosition = 75;
            this.bottomPosition = 82;
            this.bottomLeftPosition = 96;
            this.leftPosition = 97;
            this.topLeftPosition = 98;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 2;

            break;
        case 84:

            this.currentPosition = 84;
            this.topPosition = 113;
            this.topRightPosition = 112;
            this.rightPosition = 85;
            this.bottomRightPosition = 77;
            this.bottomPosition = 76;
            this.bottomLeftPosition = 83;
            this.leftPosition = 99;
            this.topLeftPosition = 114;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 85:

            this.currentPosition = 85;
            this.topPosition = 112;
            this.topRightPosition = 111;
            this.rightPosition = 86;
            this.bottomRightPosition = 87;
            this.bottomPosition = 77;
            this.bottomLeftPosition = 76;
            this.leftPosition = 84;
            this.topLeftPosition = 113;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 6;

            break;
        case 86:

            this.currentPosition = 86;
            this.topPosition = 111;
            this.topRightPosition = -1;
            this.rightPosition = 48;
            this.bottomRightPosition = 47;
            this.bottomPosition = 87;
            this.bottomLeftPosition = 77;
            this.leftPosition = 85;
            this.topLeftPosition = 112;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 6;



            break;
        case 87:

            this.currentPosition = 87;
            this.topPosition = 86;
            this.topRightPosition = 48;
            this.rightPosition = 47;
            this.bottomRightPosition = 46;
            this.bottomPosition = 88;
            this.bottomLeftPosition = 78;
            this.leftPosition = 77;
            this.topLeftPosition = 85;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;



            break;
        case 88:

            this.currentPosition = 88;
            this.topPosition = 87;
            this.topRightPosition = 47;
            this.rightPosition = 46;
            this.bottomRightPosition = 45;
            this.bottomPosition = 89;
            this.bottomLeftPosition = 79;
            this.leftPosition = 78;
            this.topLeftPosition = 77;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;



            break;
        case 89:

            this.currentPosition = 89;
            this.topPosition = 88;
            this.topRightPosition = 46;
            this.rightPosition = 45;
            this.bottomRightPosition = 44;
            this.bottomPosition = 90;
            this.bottomLeftPosition = 91;
            this.leftPosition = 79;
            this.topLeftPosition = 78;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;



            break;
        case 90:

            this.currentPosition = 90;
            this.topPosition = 89;
            this.topRightPosition = 45;
            this.rightPosition = 44;
            this.bottomRightPosition = -1;
            this.bottomPosition = 140;
            this.bottomLeftPosition = 139;
            this.leftPosition = 91;
            this.topLeftPosition = 79;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 5;



            break;
        case 91:

            this.currentPosition = 91;
            this.topPosition = 79;
            this.topRightPosition = 89;
            this.rightPosition = 90;
            this.bottomRightPosition = 140;
            this.bottomPosition = 139;
            this.bottomLeftPosition = 138;
            this.leftPosition = 92;
            this.topLeftPosition = 80;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;



            break;
        case 92:

            this.currentPosition = 92;
            this.topPosition = 80;
            this.topRightPosition = 79;
            this.rightPosition = 91;
            this.bottomRightPosition = 139;
            this.bottomPosition = 138;
            this.bottomLeftPosition = 137;
            this.leftPosition = 93;
            this.topLeftPosition = 81;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;



            break;
        case 93:

            this.currentPosition = 93;
            this.topPosition = 81;
            this.topRightPosition = 80;
            this.rightPosition = 92;
            this.bottomRightPosition = 138;
            this.bottomPosition = 137;
            this.bottomLeftPosition = 136;
            this.leftPosition = 94;
            this.topLeftPosition = 95;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;



            break;
        case 94:

            this.currentPosition = 94;
            this.topPosition = 95;
            this.topRightPosition = 81;
            this.rightPosition = 93;
            this.bottomRightPosition = 137;
            this.bottomPosition = 136;
            this.bottomLeftPosition = -1;
            this.leftPosition = 15;
            this.topLeftPosition = 14;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 95:

            this.currentPosition = 95;
            this.topPosition = 96;
            this.topRightPosition = 82;
            this.rightPosition = 81;
            this.bottomRightPosition = 93;
            this.bottomPosition = 94;
            this.bottomLeftPosition = 15;
            this.leftPosition = 14;
            this.topLeftPosition = 13;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 96:

            this.currentPosition = 96;
            this.topPosition = 97;
            this.topRightPosition = 83;
            this.rightPosition = 82;
            this.bottomRightPosition = 81;
            this.bottomPosition = 95;
            this.bottomLeftPosition = 14;
            this.leftPosition = 13;
            this.topLeftPosition = 12;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 97:

            this.currentPosition = 97;
            this.topPosition = 98;
            this.topRightPosition = 99;
            this.rightPosition = 83;
            this.bottomRightPosition = 82;
            this.bottomPosition = 96;
            this.bottomLeftPosition = 13;
            this.leftPosition = 12;
            this.topLeftPosition = 11;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 98:

            this.currentPosition = 98;
            this.topPosition = 115;
            this.topRightPosition = 114;
            this.rightPosition = 99;
            this.bottomRightPosition = 83;
            this.bottomPosition = 97;
            this.bottomLeftPosition = 12;
            this.leftPosition = 11;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 1;



            break;
        case 99:

            this.currentPosition = 99;
            this.topPosition = 114;
            this.topRightPosition = 113;
            this.rightPosition = 84;
            this.bottomRightPosition = 76;
            this.bottomPosition = 83;
            this.bottomLeftPosition = 97;
            this.leftPosition = 98;
            this.topLeftPosition = 115;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;



            break;
        case 100:

            this.currentPosition = 100;
            this.topPosition = 101;
            this.topRightPosition = 102;
            this.rightPosition = 103;
            this.bottomRightPosition = 104;
            this.bottomPosition = 105;
            this.bottomLeftPosition = 106;
            this.leftPosition = 107;
            this.topLeftPosition = 108;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 3;

            break;
        case 101:

            this.currentPosition = 101;
            this.topPosition = 109;
            this.topRightPosition = 110;
            this.rightPosition = 102;
            this.bottomRightPosition = 103;
            this.bottomPosition = 100;
            this.bottomLeftPosition = 107;
            this.leftPosition = 108;
            this.topLeftPosition = 124;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 102:

            this.currentPosition = 102;
            this.topPosition = 110;
            this.topRightPosition = 111;
            this.rightPosition = 112;
            this.bottomRightPosition = 113;
            this.bottomPosition = 103;
            this.bottomLeftPosition = 100;
            this.leftPosition = 101;
            this.topLeftPosition = 109;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 103:

            this.currentPosition = 103;
            this.topPosition = 102;
            this.topRightPosition = 112;
            this.rightPosition = 113;
            this.bottomRightPosition = 114;
            this.bottomPosition = 104;
            this.bottomLeftPosition = 105;
            this.leftPosition = 100;
            this.topLeftPosition = 101;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 104:

            this.currentPosition = 104;
            this.topPosition = 103;
            this.topRightPosition = 113;
            this.rightPosition = 114;
            this.bottomRightPosition = 115;
            this.bottomPosition = 116;
            this.bottomLeftPosition = 117;
            this.leftPosition = 105;
            this.topLeftPosition = 100;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 4;

            break;
        case 105:

            this.currentPosition = 105;
            this.topPosition = 100;
            this.topRightPosition = 103;
            this.rightPosition = 104;
            this.bottomRightPosition = 116;
            this.bottomPosition = 117;
            this.bottomLeftPosition = 118;
            this.leftPosition = 106;
            this.topLeftPosition = 107;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 106:

            this.currentPosition = 106;
            this.topPosition = 107;
            this.topRightPosition = 100;
            this.rightPosition = 105;
            this.bottomRightPosition = 117;
            this.bottomPosition = 118;
            this.bottomLeftPosition = 119;
            this.leftPosition = 120;
            this.topLeftPosition = 121;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 107:

            this.currentPosition = 107;
            this.topPosition = 108;
            this.topRightPosition = 101;
            this.rightPosition = 100;
            this.bottomRightPosition = 105;
            this.bottomPosition = 106;
            this.bottomLeftPosition = 120;
            this.leftPosition = 121;
            this.topLeftPosition = 122;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 108:

            this.currentPosition = 108;
            this.topPosition = 124;
            this.topRightPosition = 109;
            this.rightPosition = 101;
            this.bottomRightPosition = 100;
            this.bottomPosition = 107;
            this.bottomLeftPosition = 121;
            this.leftPosition = 122;
            this.topLeftPosition = 123;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 2;

            break;
        case 109:

            this.currentPosition = 109;
            this.topPosition = 34;
            this.topRightPosition = 49;
            this.rightPosition = 110;
            this.bottomRightPosition = 102;
            this.bottomPosition = 101;
            this.bottomLeftPosition = 108;
            this.leftPosition = 124;
            this.topLeftPosition = 35;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 110:

            this.currentPosition = 110;
            this.topPosition = 49;
            this.topRightPosition = 48;
            this.rightPosition = 111;
            this.bottomRightPosition = 112;
            this.bottomPosition = 102;
            this.bottomLeftPosition = 101;
            this.leftPosition = 109;
            this.topLeftPosition = 34;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 6;

            break;
        case 111:

            this.currentPosition = 111;
            this.topPosition = 48;
            this.topRightPosition = -1;
            this.rightPosition = 86;
            this.bottomRightPosition = 85;
            this.bottomPosition = 112;
            this.bottomLeftPosition = 102;
            this.leftPosition = 110;
            this.topLeftPosition = 49;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 6;



            break;
        case 112:

            this.currentPosition = 112;
            this.topPosition = 111;
            this.topRightPosition = 86;
            this.rightPosition = 85;
            this.bottomRightPosition = 84;
            this.bottomPosition = 113;
            this.bottomLeftPosition = 103;
            this.leftPosition = 102;
            this.topLeftPosition = 110;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;



            break;
        case 113:

            this.currentPosition = 113;
            this.topPosition = 112;
            this.topRightPosition = 85;
            this.rightPosition = 84;
            this.bottomRightPosition = 99;
            this.bottomPosition = 114;
            this.bottomLeftPosition = 104;
            this.leftPosition = 103;
            this.topLeftPosition = 102;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;



            break;
        case 114:

            this.currentPosition = 114;
            this.topPosition = 113;
            this.topRightPosition = 84;
            this.rightPosition = 99;
            this.bottomRightPosition = 98;
            this.bottomPosition = 115;
            this.bottomLeftPosition = 116;
            this.leftPosition = 104;
            this.topLeftPosition = 103;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;



            break;
        case 115:

            this.currentPosition = 115;
            this.topPosition = 114;
            this.topRightPosition = 99;
            this.rightPosition = 98;
            this.bottomRightPosition = -1;
            this.bottomPosition = 11;
            this.bottomLeftPosition = 10;
            this.leftPosition = 116;
            this.topLeftPosition = 104;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 5;



            break;
        case 116:

            this.currentPosition = 116;
            this.topPosition = 104;
            this.topRightPosition = 114;
            this.rightPosition = 115;
            this.bottomRightPosition = 11;
            this.bottomPosition = 10;
            this.bottomLeftPosition = 9;
            this.leftPosition = 117;
            this.topLeftPosition = 105;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;



            break;
        case 117:

            this.currentPosition = 117;
            this.topPosition = 105;
            this.topRightPosition = 104;
            this.rightPosition = 116;
            this.bottomRightPosition = 10;
            this.bottomPosition = 9;
            this.bottomLeftPosition = 24;
            this.leftPosition = 118;
            this.topLeftPosition = 106;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;



            break;
        case 118:

            this.currentPosition = 118;
            this.topPosition = 106;
            this.topRightPosition = 105;
            this.rightPosition = 117;
            this.bottomRightPosition = 9;
            this.bottomPosition = 24;
            this.bottomLeftPosition = 23;
            this.leftPosition = 119;
            this.topLeftPosition = 120;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;



            break;
        case 119:

            this.currentPosition = 119;
            this.topPosition = 120;
            this.topRightPosition = 106;
            this.rightPosition = 118;
            this.bottomRightPosition = 24;
            this.bottomPosition = 23;
            this.bottomLeftPosition = -1;
            this.leftPosition = 61;
            this.topLeftPosition = 60;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 120:

            this.currentPosition = 120;
            this.topPosition = 121;
            this.topRightPosition = 107;
            this.rightPosition = 106;
            this.bottomRightPosition = 118;
            this.bottomPosition = 119;
            this.bottomLeftPosition = 61;
            this.leftPosition = 60;
            this.topLeftPosition = 59;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 121:

            this.currentPosition = 121;
            this.topPosition = 122;
            this.topRightPosition = 108;
            this.rightPosition = 107;
            this.bottomRightPosition = 106;
            this.bottomPosition = 120;
            this.bottomLeftPosition = 60;
            this.leftPosition = 59;
            this.topLeftPosition = 74;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 122:

            this.currentPosition = 122;
            this.topPosition = 123;
            this.topRightPosition = 124;
            this.rightPosition = 108;
            this.bottomRightPosition = 107;
            this.bottomPosition = 121;
            this.bottomLeftPosition = 59;
            this.leftPosition = 74;
            this.topLeftPosition = 73;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 123:

            this.currentPosition = 123;
            this.topPosition = 36;
            this.topRightPosition = 35;
            this.rightPosition = 124;
            this.bottomRightPosition = 108;
            this.bottomPosition = 122;
            this.bottomLeftPosition = 74;
            this.leftPosition = 73;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 1;



            break;
        case 124:

            this.currentPosition = 124;
            this.topPosition = 35;
            this.topRightPosition = 34;
            this.rightPosition = 109;
            this.bottomRightPosition = 101;
            this.bottomPosition = 108;
            this.bottomLeftPosition = 122;
            this.leftPosition = 123;
            this.topLeftPosition = 36;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;



            break;
        case 125:

            this.currentPosition = 125;
            this.topPosition = 126;
            this.topRightPosition = 127;
            this.rightPosition = 128;
            this.bottomRightPosition = 129;
            this.bottomPosition = 130;
            this.bottomLeftPosition = 131;
            this.leftPosition = 132;
            this.topLeftPosition = 133;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 3;

            break;
        case 126:

            this.currentPosition = 126;
            this.topPosition = 134;
            this.topRightPosition = 135;
            this.rightPosition = 127;
            this.bottomRightPosition = 128;
            this.bottomPosition = 125;
            this.bottomLeftPosition = 132;
            this.leftPosition = 133;
            this.topLeftPosition = 149;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 127:

            this.currentPosition = 127;
            this.topPosition = 135;
            this.topRightPosition = 136;
            this.rightPosition = 137;
            this.bottomRightPosition = 138;
            this.bottomPosition = 128;
            this.bottomLeftPosition = 125;
            this.leftPosition = 126;
            this.topLeftPosition = 134;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 128:

            this.currentPosition = 128;
            this.topPosition = 127;
            this.topRightPosition = 137;
            this.rightPosition = 138;
            this.bottomRightPosition = 139;
            this.bottomPosition = 129;
            this.bottomLeftPosition = 130;
            this.leftPosition = 125;
            this.topLeftPosition = 126;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 129:

            this.currentPosition = 129;
            this.topPosition = 128;
            this.topRightPosition = 138;
            this.rightPosition = 139;
            this.bottomRightPosition = 140;
            this.bottomPosition = 141;
            this.bottomLeftPosition = 142;
            this.leftPosition = 130;
            this.topLeftPosition = 125;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 4;

            break;
        case 130:

            this.currentPosition = 130;
            this.topPosition = 125;
            this.topRightPosition = 128;
            this.rightPosition = 129;
            this.bottomRightPosition = 141;
            this.bottomPosition = 142;
            this.bottomLeftPosition = 143;
            this.leftPosition = 131;
            this.topLeftPosition = 132;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 131:

            this.currentPosition = 131;
            this.topPosition = 132;
            this.topRightPosition = 125;
            this.rightPosition = 130;
            this.bottomRightPosition = 142;
            this.bottomPosition = 143;
            this.bottomLeftPosition = 144;
            this.leftPosition = 145;
            this.topLeftPosition = 146;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 132:

            this.currentPosition = 132;
            this.topPosition = 133;
            this.topRightPosition = 126;
            this.rightPosition = 125;
            this.bottomRightPosition = 130;
            this.bottomPosition = 131;
            this.bottomLeftPosition = 145;
            this.leftPosition = 146;
            this.topLeftPosition = 147;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 133:

            this.currentPosition = 133;
            this.topPosition = 149;
            this.topRightPosition = 134;
            this.rightPosition = 126;
            this.bottomRightPosition = 125;
            this.bottomPosition = 132;
            this.bottomLeftPosition = 146;
            this.leftPosition = 147;
            this.topLeftPosition = 148;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 2;

            break;
        case 134:

            this.currentPosition = 134;
            this.topPosition = 17;
            this.topRightPosition = 16;
            this.rightPosition = 135;
            this.bottomRightPosition = 127;
            this.bottomPosition = 126;
            this.bottomLeftPosition = 133;
            this.leftPosition = 149;
            this.topLeftPosition = 18;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 6;

            break;
        case 135:

            this.currentPosition = 135;
            this.topPosition = 16;
            this.topRightPosition = 15;
            this.rightPosition = 136;
            this.bottomRightPosition = 137;
            this.bottomPosition = 127;
            this.bottomLeftPosition = 126;
            this.leftPosition = 134;
            this.topLeftPosition = 17;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 6;

            break;
        case 136:

            this.currentPosition = 136;
            this.topPosition = 15;
            this.topRightPosition = -1;
            this.rightPosition = 94;
            this.bottomRightPosition = 93;
            this.bottomPosition = 137;
            this.bottomLeftPosition = 127;
            this.leftPosition = 135;
            this.topLeftPosition = 16;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 6;



            break;
        case 137:

            this.currentPosition = 137;
            this.topPosition = 136;
            this.topRightPosition = 94;
            this.rightPosition = 93;
            this.bottomRightPosition = 92;
            this.bottomPosition = 138;
            this.bottomLeftPosition = 128;
            this.leftPosition = 127;
            this.topLeftPosition = 135;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;



            break;
        case 138:

            this.currentPosition = 138;
            this.topPosition = 137;
            this.topRightPosition = 93;
            this.rightPosition = 92;
            this.bottomRightPosition = 91;
            this.bottomPosition = 139;
            this.bottomLeftPosition = 129;
            this.leftPosition = 128;
            this.topLeftPosition = 127;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;



            break;
        case 139:

            this.currentPosition = 139;
            this.topPosition = 138;
            this.topRightPosition = 92;
            this.rightPosition = 91;
            this.bottomRightPosition = 90;
            this.bottomPosition = 140;
            this.bottomLeftPosition = 141;
            this.leftPosition = 129;
            this.topLeftPosition = 128;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;



            break;
        case 140:

            this.currentPosition = 140;
            this.topPosition = 139;
            this.topRightPosition = 91;
            this.rightPosition = 90;
            this.bottomRightPosition = -1;
            this.bottomPosition = 44;
            this.bottomLeftPosition = 43;
            this.leftPosition = 141;
            this.topLeftPosition = 129;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 6;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 5;



            break;
        case 141:

            this.currentPosition = 141;
            this.topPosition = 129;
            this.topRightPosition = 139;
            this.rightPosition = 140;
            this.bottomRightPosition = 44;
            this.bottomPosition = 43;
            this.bottomLeftPosition = 42;
            this.leftPosition = 142;
            this.topLeftPosition = 130;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;



            break;
        case 142:

            this.currentPosition = 142;
            this.topPosition = 130;
            this.topRightPosition = 129;
            this.rightPosition = 141;
            this.bottomRightPosition = 43;
            this.bottomPosition = 42;
            this.bottomLeftPosition = 41;
            this.leftPosition = 143;
            this.topLeftPosition = 131;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;



            break;
        case 143:

            this.currentPosition = 143;
            this.topPosition = 131;
            this.topRightPosition = 130;
            this.rightPosition = 142;
            this.bottomRightPosition = 42;
            this.bottomPosition = 41;
            this.bottomLeftPosition = 40;
            this.leftPosition = 144;
            this.topLeftPosition = 145;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;



            break;
        case 144:

            this.currentPosition = 144;
            this.topPosition = 145;
            this.topRightPosition = 131;
            this.rightPosition = 143;
            this.bottomRightPosition = 41;
            this.bottomPosition = 40;
            this.bottomLeftPosition = -1;
            this.leftPosition = 69;
            this.topLeftPosition = 68;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 6;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 145:

            this.currentPosition = 145;
            this.topPosition = 146;
            this.topRightPosition = 132;
            this.rightPosition = 131;
            this.bottomRightPosition = 143;
            this.bottomPosition = 144;
            this.bottomLeftPosition = 69;
            this.leftPosition = 68;
            this.topLeftPosition = 67;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 146:

            this.currentPosition = 146;
            this.topPosition = 147;
            this.topRightPosition = 133;
            this.rightPosition = 132;
            this.bottomRightPosition = 131;
            this.bottomPosition = 145;
            this.bottomLeftPosition = 68;
            this.leftPosition = 67;
            this.topLeftPosition = 66;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 147:

            this.currentPosition = 147;
            this.topPosition = 148;
            this.topRightPosition = 149;
            this.rightPosition = 133;
            this.bottomRightPosition = 132;
            this.bottomPosition = 146;
            this.bottomLeftPosition = 67;
            this.leftPosition = 66;
            this.topLeftPosition = 65;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 6;



            break;
        case 148:

            this.currentPosition = 148;
            this.topPosition = 19;
            this.topRightPosition = 18;
            this.rightPosition = 149;
            this.bottomRightPosition = 133;
            this.bottomPosition = 147;
            this.bottomLeftPosition = 66;
            this.leftPosition = 65;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 6;
            this.lengthTopLeftPosition = 1;



            break;
        case 149:

            this.currentPosition = 149;
            this.topPosition = 18;
            this.topRightPosition = 17;
            this.rightPosition = 134;
            this.bottomRightPosition = 126;
            this.bottomPosition = 133;
            this.bottomLeftPosition = 147;
            this.leftPosition = 148;
            this.topLeftPosition = 19;

            this.lengthTopPosition = 6;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 6;



            break;

        default:
            break;

    }

}; // 5x5




LetterSquareObject.prototype.setUp6x6 = function(index){

    switch (index)
    {
        case 0:

            this.currentPosition = 0;
            this.topPosition = 5;
            this.topRightPosition = 6;
            this.rightPosition = 7;
            this.bottomRightPosition = 8;
            this.bottomPosition = 1;
            this.bottomLeftPosition = 2;
            this.leftPosition = 3;
            this.topLeftPosition = 4;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;

            break;
        case 1:

            this.currentPosition = 1;
            this.topPosition = 0;
            this.topRightPosition = 7;
            this.rightPosition = 8;
            this.bottomRightPosition = 9;
            this.bottomPosition = 10;
            this.bottomLeftPosition = 11;
            this.leftPosition = 2;
            this.topLeftPosition = 3;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 4;

            break;
        case 2:

            this.currentPosition = 2;
            this.topPosition = 3;
            this.topRightPosition = 0;
            this.rightPosition = 1;
            this.bottomRightPosition = 10;
            this.bottomPosition = 11;
            this.bottomLeftPosition = 12;
            this.leftPosition = 13;
            this.topLeftPosition = 14;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 3:

            this.currentPosition = 3;
            this.topPosition = 4;
            this.topRightPosition = 5;
            this.rightPosition = 0;
            this.bottomRightPosition = 1;
            this.bottomPosition = 2;
            this.bottomLeftPosition = 13;
            this.leftPosition = 14;
            this.topLeftPosition = 15;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 3;

            break;
        case 4:

            this.currentPosition = 4;
            this.topPosition = 17;
            this.topRightPosition = 18;
            this.rightPosition = 5;
            this.bottomRightPosition = 0;
            this.bottomPosition = 3;
            this.bottomLeftPosition = 14;
            this.leftPosition = 15;
            this.topLeftPosition = 16;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 5:

            this.currentPosition = 5;
            this.topPosition = 18;
            this.topRightPosition = 19;
            this.rightPosition = 6;
            this.bottomRightPosition = 7;
            this.bottomPosition = 0;
            this.bottomLeftPosition = 3;
            this.leftPosition = 4;
            this.topLeftPosition = 17;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;

            break;
        case 6:

            this.currentPosition = 6;
            this.topPosition = 19;
            this.topRightPosition = 20;
            this.rightPosition = 21;
            this.bottomRightPosition = 22;
            this.bottomPosition = 7;
            this.bottomLeftPosition = 0;
            this.leftPosition = 5;
            this.topLeftPosition = 18;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 8;

            break;
        case 7:

            this.currentPosition = 7;
            this.topPosition = 6;
            this.topRightPosition = 21;
            this.rightPosition = 22;
            this.bottomRightPosition = 23;
            this.bottomPosition = 8;
            this.bottomLeftPosition = 1;
            this.leftPosition = 0;
            this.topLeftPosition = 5;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 9;

            break;
        case 8:

            this.currentPosition = 8;
            this.topPosition = 7;
            this.topRightPosition = 22;
            this.rightPosition = 23;
            this.bottomRightPosition = 24;
            this.bottomPosition = 9;
            this.bottomLeftPosition = 10;
            this.leftPosition = 1;
            this.topLeftPosition = 0;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 10;

            break;
        case 9:

            this.currentPosition = 9;
            this.topPosition = 8;
            this.topRightPosition = 23;
            this.rightPosition = 24;
            this.bottomRightPosition = 25;
            this.bottomPosition = 26;
            this.bottomLeftPosition = 27;
            this.leftPosition = 10;
            this.topLeftPosition = 1;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 5;

            break;
        case 10:

            this.currentPosition = 10;
            this.topPosition = 1;
            this.topRightPosition = 8;
            this.rightPosition = 9;
            this.bottomRightPosition = 26;
            this.bottomPosition = 27;
            this.bottomLeftPosition = 28;
            this.leftPosition = 11;
            this.topLeftPosition = 2;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 11:

            this.currentPosition = 11;
            this.topPosition = 2;
            this.topRightPosition = 1;
            this.rightPosition = 10;
            this.bottomRightPosition = 27;
            this.bottomPosition = 28;
            this.bottomLeftPosition = 29;
            this.leftPosition = 12;
            this.topLeftPosition = 13;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 12:

            this.currentPosition = 12;
            this.topPosition = 13;
            this.topRightPosition = 2;
            this.rightPosition = 11;
            this.bottomRightPosition = 28;
            this.bottomPosition = 29;
            this.bottomLeftPosition = 30;
            this.leftPosition = 31;
            this.topLeftPosition = 32;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 13:

            this.currentPosition = 13;
            this.topPosition = 14;
            this.topRightPosition = 3;
            this.rightPosition = 2;
            this.bottomRightPosition = 11;
            this.bottomPosition = 12;
            this.bottomLeftPosition = 31;
            this.leftPosition = 32;
            this.topLeftPosition = 33;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 14:

            this.currentPosition = 14;
            this.topPosition = 15;
            this.topRightPosition = 4;
            this.rightPosition = 3;
            this.bottomRightPosition = 2;
            this.bottomPosition = 13;
            this.bottomLeftPosition = 32;
            this.leftPosition = 33;
            this.topLeftPosition = 34;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 15:

            this.currentPosition = 15;
            this.topPosition = 16;
            this.topRightPosition = 17;
            this.rightPosition = 4;
            this.bottomRightPosition = 3;
            this.bottomPosition = 14;
            this.bottomLeftPosition = 33;
            this.leftPosition = 34;
            this.topLeftPosition = 35;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 2;

            break;
        case 16:

            this.currentPosition = 16;
            this.topPosition = 173;
            this.topRightPosition = 172;
            this.rightPosition = 17;
            this.bottomRightPosition = 4;
            this.bottomPosition = 15;
            this.bottomLeftPosition = 34;
            this.leftPosition = 35;
            this.topLeftPosition = 174;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 17:

            this.currentPosition = 17;
            this.topPosition = 172;
            this.topRightPosition = 171;
            this.rightPosition = 18;
            this.bottomRightPosition = 5;
            this.bottomPosition = 4;
            this.bottomLeftPosition = 15;
            this.leftPosition = 16;
            this.topLeftPosition = 173;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 18:

            this.currentPosition = 18;
            this.topPosition = 171;
            this.topRightPosition = 170;
            this.rightPosition = 19;
            this.bottomRightPosition = 6;
            this.bottomPosition = 5;
            this.bottomLeftPosition = 4;
            this.leftPosition = 17;
            this.topLeftPosition = 172;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;

            break;
        case 19:

            this.currentPosition = 19;
            this.topPosition = 170;
            this.topRightPosition = 169;
            this.rightPosition = 20;
            this.bottomRightPosition = 21;
            this.bottomPosition = 6;
            this.bottomLeftPosition = 5;
            this.leftPosition = 18;
            this.topLeftPosition = 171;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 7;

            break;
        case 20:

            this.currentPosition = 20;
            this.topPosition = 169;
            this.topRightPosition = -1;
            this.rightPosition = 143;
            this.bottomRightPosition = 142;
            this.bottomPosition = 21;
            this.bottomLeftPosition = 6;
            this.leftPosition = 19;
            this.topLeftPosition = 170;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 7;

            break;
        case 21:

            this.currentPosition = 21;
            this.topPosition = 20;
            this.topRightPosition = 143;
            this.rightPosition = 142;
            this.bottomRightPosition = 141;
            this.bottomPosition = 22;
            this.bottomLeftPosition = 7;
            this.leftPosition = 6;
            this.topLeftPosition = 19;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 8;

            break;
        case 22:

            this.currentPosition = 22;
            this.topPosition = 21;
            this.topRightPosition = 142;
            this.rightPosition = 141;
            this.bottomRightPosition = 140;
            this.bottomPosition = 23;
            this.bottomLeftPosition = 8;
            this.leftPosition = 7;
            this.topLeftPosition = 6;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 9;

            break;
        case 23:

            this.currentPosition = 23;
            this.topPosition = 22;
            this.topRightPosition = 141;
            this.rightPosition = 140;
            this.bottomRightPosition = 139;
            this.bottomPosition = 24;
            this.bottomLeftPosition = 9;
            this.leftPosition = 8;
            this.topLeftPosition = 7;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 10;

            break;
        case 24:

            this.currentPosition = 24;
            this.topPosition = 23;
            this.topRightPosition = 140;
            this.rightPosition = 139;
            this.bottomRightPosition = 138;
            this.bottomPosition = 25;
            this.bottomLeftPosition = 26;
            this.leftPosition = 9;
            this.topLeftPosition = 8;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 11;

            break;
        case 25:

            this.currentPosition = 25;
            this.topPosition = 24;
            this.topRightPosition = 139;
            this.rightPosition = 138;
            this.bottomRightPosition = -1;
            this.bottomPosition = 200;
            this.bottomLeftPosition = 199;
            this.leftPosition = 26;
            this.topLeftPosition = 9;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 6;

            break;
        case 26:

            this.currentPosition = 26;
            this.topPosition = 9;
            this.topRightPosition = 24;
            this.rightPosition = 25;
            this.bottomRightPosition = 200;
            this.bottomPosition = 199;
            this.bottomLeftPosition = 198;
            this.leftPosition = 27;
            this.topLeftPosition = 10;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 11;

            break;
        case 27:

            this.currentPosition = 27;
            this.topPosition = 10;
            this.topRightPosition = 9;
            this.rightPosition = 26;
            this.bottomRightPosition = 199;
            this.bottomPosition = 198;
            this.bottomLeftPosition = 197;
            this.leftPosition = 28;
            this.topLeftPosition = 11;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 28:

            this.currentPosition = 28;
            this.topPosition = 11;
            this.topRightPosition = 10;
            this.rightPosition = 27;
            this.bottomRightPosition = 198;
            this.bottomPosition = 197;
            this.bottomLeftPosition = 196;
            this.leftPosition = 29;
            this.topLeftPosition = 12;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 29:

            this.currentPosition = 29;
            this.topPosition = 12;
            this.topRightPosition = 11;
            this.rightPosition = 28;
            this.bottomRightPosition = 197;
            this.bottomPosition = 196;
            this.bottomLeftPosition = 215;
            this.leftPosition = 30;
            this.topLeftPosition = 31;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 30:

            this.currentPosition = 30;
            this.topPosition = 31;
            this.topRightPosition = 12;
            this.rightPosition = 29;
            this.bottomRightPosition = 196;
            this.bottomPosition = 215;
            this.bottomLeftPosition = -1;
            this.leftPosition = 97;
            this.topLeftPosition = 96;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 31:

            this.currentPosition = 31;
            this.topPosition = 32;
            this.topRightPosition = 13;
            this.rightPosition = 12;
            this.bottomRightPosition = 29;
            this.bottomPosition = 30;
            this.bottomLeftPosition = 97;
            this.leftPosition = 96;
            this.topLeftPosition = 95;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 32:

            this.currentPosition = 32;
            this.topPosition = 33;
            this.topRightPosition = 14;
            this.rightPosition = 13;
            this.bottomRightPosition = 12;
            this.bottomPosition = 31;
            this.bottomLeftPosition = 96;
            this.leftPosition = 95;
            this.topLeftPosition = 94;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 33:

            this.currentPosition = 33;
            this.topPosition = 34;
            this.topRightPosition = 15;
            this.rightPosition = 14;
            this.bottomRightPosition = 13;
            this.bottomPosition = 32;
            this.bottomLeftPosition = 95;
            this.leftPosition = 94;
            this.topLeftPosition = 93;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 34:

            this.currentPosition = 34;
            this.topPosition = 35;
            this.topRightPosition = 16;
            this.rightPosition = 15;
            this.bottomRightPosition = 14;
            this.bottomPosition = 33;
            this.bottomLeftPosition = 94;
            this.leftPosition = 93;
            this.topLeftPosition = 92;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 35:

            this.currentPosition = 35;
            this.topPosition = 174;
            this.topRightPosition = 173;
            this.rightPosition = 16;
            this.bottomRightPosition = 15;
            this.bottomPosition = 34;
            this.bottomLeftPosition = 93;
            this.leftPosition = 92;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 1;

            break;



        case 36:

            this.currentPosition = 36;
            this.topPosition = 41;
            this.topRightPosition = 42;
            this.rightPosition = 43;
            this.bottomRightPosition = 44;
            this.bottomPosition = 37;
            this.bottomLeftPosition = 38;
            this.leftPosition = 39;
            this.topLeftPosition = 40;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;

            break;
        case 37:

            this.currentPosition = 37;
            this.topPosition = 36;
            this.topRightPosition = 43;
            this.rightPosition = 44;
            this.bottomRightPosition = 45;
            this.bottomPosition = 46;
            this.bottomLeftPosition = 47;
            this.leftPosition = 38;
            this.topLeftPosition = 39;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 4;

            break;
        case 38:

            this.currentPosition = 38;
            this.topPosition = 39;
            this.topRightPosition = 36;
            this.rightPosition = 37;
            this.bottomRightPosition = 46;
            this.bottomPosition = 47;
            this.bottomLeftPosition = 48;
            this.leftPosition = 49;
            this.topLeftPosition = 50;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 39:

            this.currentPosition = 39;
            this.topPosition = 40;
            this.topRightPosition = 41;
            this.rightPosition = 36;
            this.bottomRightPosition = 37;
            this.bottomPosition = 38;
            this.bottomLeftPosition = 49;
            this.leftPosition = 50;
            this.topLeftPosition = 51;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 3;

            break;
        case 40:

            this.currentPosition = 40;
            this.topPosition = 53;
            this.topRightPosition = 54;
            this.rightPosition = 41;
            this.bottomRightPosition = 36;
            this.bottomPosition = 39;
            this.bottomLeftPosition = 50;
            this.leftPosition = 51;
            this.topLeftPosition = 52;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 41:

            this.currentPosition = 41;
            this.topPosition = 54;
            this.topRightPosition = 55;
            this.rightPosition = 42;
            this.bottomRightPosition = 43;
            this.bottomPosition = 36;
            this.bottomLeftPosition = 39;
            this.leftPosition = 40;
            this.topLeftPosition = 53;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;

            break;
        case 42:

            this.currentPosition = 42;
            this.topPosition = 55;
            this.topRightPosition = 56;
            this.rightPosition = 57;
            this.bottomRightPosition = 58;
            this.bottomPosition = 43;
            this.bottomLeftPosition = 36;
            this.leftPosition = 41;
            this.topLeftPosition = 54;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 8;

            break;
        case 43:

            this.currentPosition = 43;
            this.topPosition = 42;
            this.topRightPosition = 57;
            this.rightPosition = 58;
            this.bottomRightPosition = 59;
            this.bottomPosition = 44;
            this.bottomLeftPosition = 37;
            this.leftPosition = 36;
            this.topLeftPosition = 41;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 9;

            break;
        case 44:

            this.currentPosition = 44;
            this.topPosition = 43;
            this.topRightPosition = 58;
            this.rightPosition = 59;
            this.bottomRightPosition = 60;
            this.bottomPosition = 45;
            this.bottomLeftPosition = 46;
            this.leftPosition = 37;
            this.topLeftPosition = 36;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 10;

            break;
        case 45:

            this.currentPosition = 45;
            this.topPosition = 44;
            this.topRightPosition = 59;
            this.rightPosition = 60;
            this.bottomRightPosition = 61;
            this.bottomPosition = 62;
            this.bottomLeftPosition = 63;
            this.leftPosition = 46;
            this.topLeftPosition = 37;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 5;

            break;
        case 46:

            this.currentPosition = 46;
            this.topPosition = 37;
            this.topRightPosition = 44;
            this.rightPosition = 45;
            this.bottomRightPosition = 62;
            this.bottomPosition = 63;
            this.bottomLeftPosition = 64;
            this.leftPosition = 47;
            this.topLeftPosition = 38;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 47:

            this.currentPosition = 47;
            this.topPosition = 38;
            this.topRightPosition = 37;
            this.rightPosition = 46;
            this.bottomRightPosition = 63;
            this.bottomPosition = 64;
            this.bottomLeftPosition = 65;
            this.leftPosition = 48;
            this.topLeftPosition = 49;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 48:

            this.currentPosition = 48;
            this.topPosition = 49;
            this.topRightPosition = 38;
            this.rightPosition = 47;
            this.bottomRightPosition = 64;
            this.bottomPosition = 65;
            this.bottomLeftPosition = 66;
            this.leftPosition = 67;
            this.topLeftPosition = 68;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 49:

            this.currentPosition = 49;
            this.topPosition = 50;
            this.topRightPosition = 39;
            this.rightPosition = 38;
            this.bottomRightPosition = 47;
            this.bottomPosition = 48;
            this.bottomLeftPosition = 67;
            this.leftPosition = 68;
            this.topLeftPosition = 69;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 50:

            this.currentPosition = 50;
            this.topPosition = 51;
            this.topRightPosition = 40;
            this.rightPosition = 39;
            this.bottomRightPosition = 38;
            this.bottomPosition = 49;
            this.bottomLeftPosition = 68;
            this.leftPosition = 69;
            this.topLeftPosition = 70;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 51:

            this.currentPosition = 51;
            this.topPosition = 52;
            this.topRightPosition = 53;
            this.rightPosition = 40;
            this.bottomRightPosition = 39;
            this.bottomPosition = 50;
            this.bottomLeftPosition = 69;
            this.leftPosition = 70;
            this.topLeftPosition = 71;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 2;

            break;
        case 52:

            this.currentPosition = 52;
            this.topPosition = 163;
            this.topRightPosition = 162;
            this.rightPosition = 53;
            this.bottomRightPosition = 40;
            this.bottomPosition = 51;
            this.bottomLeftPosition = 70;
            this.leftPosition = 71;
            this.topLeftPosition = 164;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 53:

            this.currentPosition = 53;
            this.topPosition = 162;
            this.topRightPosition = 161;
            this.rightPosition = 54;
            this.bottomRightPosition = 41;
            this.bottomPosition = 40;
            this.bottomLeftPosition = 51;
            this.leftPosition = 52;
            this.topLeftPosition = 163;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 54:

            this.currentPosition = 54;
            this.topPosition = 161;
            this.topRightPosition = 160;
            this.rightPosition = 55;
            this.bottomRightPosition = 42;
            this.bottomPosition = 41;
            this.bottomLeftPosition = 40;
            this.leftPosition = 53;
            this.topLeftPosition = 162;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;

            break;
        case 55:

            this.currentPosition = 55;
            this.topPosition = 160;
            this.topRightPosition = 179;
            this.rightPosition = 56;
            this.bottomRightPosition = 57;
            this.bottomPosition = 42;
            this.bottomLeftPosition = 41;
            this.leftPosition = 54;
            this.topLeftPosition = 161;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 7;

            break;
        case 56:

            this.currentPosition = 56;
            this.topPosition = 179;
            this.topRightPosition = -1;
            this.rightPosition = 107;
            this.bottomRightPosition = 106;
            this.bottomPosition = 57;
            this.bottomLeftPosition = 42;
            this.leftPosition = 55;
            this.topLeftPosition = 160;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 7;

            break;
        case 57:

            this.currentPosition = 57;
            this.topPosition = 56;
            this.topRightPosition = 107;
            this.rightPosition = 106;
            this.bottomRightPosition = 105;
            this.bottomPosition = 58;
            this.bottomLeftPosition = 43;
            this.leftPosition = 42;
            this.topLeftPosition = 55;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 8;

            break;
        case 58:

            this.currentPosition = 58;
            this.topPosition = 57;
            this.topRightPosition = 106;
            this.rightPosition = 105;
            this.bottomRightPosition = 104;
            this.bottomPosition = 59;
            this.bottomLeftPosition = 44;
            this.leftPosition = 43;
            this.topLeftPosition = 42;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 9;

            break;
        case 59:

            this.currentPosition = 59;
            this.topPosition = 58;
            this.topRightPosition = 105;
            this.rightPosition = 104;
            this.bottomRightPosition = 103;
            this.bottomPosition = 60;
            this.bottomLeftPosition = 45;
            this.leftPosition = 44;
            this.topLeftPosition = 43;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 10;

            break;
        case 60:

            this.currentPosition = 60;
            this.topPosition = 59;
            this.topRightPosition = 104;
            this.rightPosition = 103;
            this.bottomRightPosition = 102;
            this.bottomPosition = 61;
            this.bottomLeftPosition = 62;
            this.leftPosition = 45;
            this.topLeftPosition = 44;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 11;

            break;
        case 61:

            this.currentPosition = 61;
            this.topPosition = 60;
            this.topRightPosition = 103;
            this.rightPosition = 102;
            this.bottomRightPosition = -1;
            this.bottomPosition = 210;
            this.bottomLeftPosition = 209;
            this.leftPosition = 62;
            this.topLeftPosition = 45;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 6;

            break;
        case 62:

            this.currentPosition = 62;
            this.topPosition = 45;
            this.topRightPosition = 60;
            this.rightPosition = 61;
            this.bottomRightPosition = 210;
            this.bottomPosition = 209;
            this.bottomLeftPosition = 208;
            this.leftPosition = 63;
            this.topLeftPosition = 46;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 11;

            break;
        case 63:

            this.currentPosition = 63;
            this.topPosition = 46;
            this.topRightPosition = 45;
            this.rightPosition = 62;
            this.bottomRightPosition = 209;
            this.bottomPosition = 208;
            this.bottomLeftPosition = 207;
            this.leftPosition = 64;
            this.topLeftPosition = 47;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 64:

            this.currentPosition = 64;
            this.topPosition = 47;
            this.topRightPosition = 46;
            this.rightPosition = 63;
            this.bottomRightPosition = 208;
            this.bottomPosition = 207;
            this.bottomLeftPosition = 206;
            this.leftPosition = 65;
            this.topLeftPosition = 48;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 65:

            this.currentPosition = 65;
            this.topPosition = 48;
            this.topRightPosition = 47;
            this.rightPosition = 64;
            this.bottomRightPosition = 207;
            this.bottomPosition = 206;
            this.bottomLeftPosition = 205;
            this.leftPosition = 66;
            this.topLeftPosition = 67;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 66:

            this.currentPosition = 66;
            this.topPosition = 67;
            this.topRightPosition = 48;
            this.rightPosition = 65;
            this.bottomRightPosition = 206;
            this.bottomPosition = 205;
            this.bottomLeftPosition = -1;
            this.leftPosition = 133;
            this.topLeftPosition = 132;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 67:

            this.currentPosition = 67;
            this.topPosition = 68;
            this.topRightPosition = 49;
            this.rightPosition = 48;
            this.bottomRightPosition = 65;
            this.bottomPosition = 66;
            this.bottomLeftPosition = 133;
            this.leftPosition = 132;
            this.topLeftPosition = 131;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 68:

            this.currentPosition = 68;
            this.topPosition = 69;
            this.topRightPosition = 50;
            this.rightPosition = 49;
            this.bottomRightPosition = 48;
            this.bottomPosition = 67;
            this.bottomLeftPosition = 132;
            this.leftPosition = 131;
            this.topLeftPosition = 130;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 69:

            this.currentPosition = 69;
            this.topPosition = 70;
            this.topRightPosition = 51;
            this.rightPosition = 50;
            this.bottomRightPosition = 49;
            this.bottomPosition = 68;
            this.bottomLeftPosition = 131;
            this.leftPosition = 130;
            this.topLeftPosition = 129;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 70:

            this.currentPosition = 70;
            this.topPosition = 71;
            this.topRightPosition = 52;
            this.rightPosition = 51;
            this.bottomRightPosition = 50;
            this.bottomPosition = 69;
            this.bottomLeftPosition = 130;
            this.leftPosition = 129;
            this.topLeftPosition = 128;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 71:

            this.currentPosition = 71;
            this.topPosition = 164;
            this.topRightPosition = 163;
            this.rightPosition = 52;
            this.bottomRightPosition = 51;
            this.bottomPosition = 70;
            this.bottomLeftPosition = 129;
            this.leftPosition = 128;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 1;

            break;
        case 72:

            this.currentPosition = 72;
            this.topPosition = 77;
            this.topRightPosition = 78;
            this.rightPosition = 79;
            this.bottomRightPosition = 80;
            this.bottomPosition = 73;
            this.bottomLeftPosition = 74;
            this.leftPosition = 75;
            this.topLeftPosition = 76;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;

            break;
        case 73:

            this.currentPosition = 73;
            this.topPosition = 72;
            this.topRightPosition = 79;
            this.rightPosition = 80;
            this.bottomRightPosition = 81;
            this.bottomPosition = 82;
            this.bottomLeftPosition = 83;
            this.leftPosition = 74;
            this.topLeftPosition = 75;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 4;

            break;
        case 74:

            this.currentPosition = 74;
            this.topPosition = 75;
            this.topRightPosition = 72;
            this.rightPosition = 73;
            this.bottomRightPosition = 82;
            this.bottomPosition = 83;
            this.bottomLeftPosition = 84;
            this.leftPosition = 85;
            this.topLeftPosition = 86;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 75:

            this.currentPosition = 75;
            this.topPosition = 76;
            this.topRightPosition = 77;
            this.rightPosition = 72;
            this.bottomRightPosition = 73;
            this.bottomPosition = 74;
            this.bottomLeftPosition = 85;
            this.leftPosition = 86;
            this.topLeftPosition = 87;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 3;

            break;
        case 76:

            this.currentPosition = 76;
            this.topPosition = 89;
            this.topRightPosition = 90;
            this.rightPosition = 77;
            this.bottomRightPosition = 72;
            this.bottomPosition = 75;
            this.bottomLeftPosition = 86;
            this.leftPosition = 87;
            this.topLeftPosition = 88;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 77:

            this.currentPosition = 77;
            this.topPosition = 90;
            this.topRightPosition = 91;
            this.rightPosition = 78;
            this.bottomRightPosition = 79;
            this.bottomPosition = 72;
            this.bottomLeftPosition = 75;
            this.leftPosition = 76;
            this.topLeftPosition = 89;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;

            break;
        case 78:

            this.currentPosition = 78;
            this.topPosition = 91;
            this.topRightPosition = 92;
            this.rightPosition = 93;
            this.bottomRightPosition = 94;
            this.bottomPosition = 79;
            this.bottomLeftPosition = 72;
            this.leftPosition = 77;
            this.topLeftPosition = 90;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 8;

            break;
        case 79:

            this.currentPosition = 79;
            this.topPosition = 78;
            this.topRightPosition = 93;
            this.rightPosition = 94;
            this.bottomRightPosition = 95;
            this.bottomPosition = 80;
            this.bottomLeftPosition = 73;
            this.leftPosition = 72;
            this.topLeftPosition = 77;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 9;

            break;
        case 80:

            this.currentPosition = 80;
            this.topPosition = 79;
            this.topRightPosition = 94;
            this.rightPosition = 95;
            this.bottomRightPosition = 96;
            this.bottomPosition = 81;
            this.bottomLeftPosition = 82;
            this.leftPosition = 73;
            this.topLeftPosition = 72;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 10;

            break;
        case 81:

            this.currentPosition = 81;
            this.topPosition = 80;
            this.topRightPosition = 95;
            this.rightPosition = 96;
            this.bottomRightPosition = 97;
            this.bottomPosition = 98;
            this.bottomLeftPosition = 99;
            this.leftPosition = 82;
            this.topLeftPosition = 73;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 5;

            break;
        case 82:

            this.currentPosition = 82;
            this.topPosition = 73;
            this.topRightPosition = 80;
            this.rightPosition = 81;
            this.bottomRightPosition = 98;
            this.bottomPosition = 99;
            this.bottomLeftPosition = 100;
            this.leftPosition = 83;
            this.topLeftPosition = 74;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 83:

            this.currentPosition = 83;
            this.topPosition = 74;
            this.topRightPosition = 73;
            this.rightPosition = 82;
            this.bottomRightPosition = 99;
            this.bottomPosition = 100;
            this.bottomLeftPosition = 101;
            this.leftPosition = 84;
            this.topLeftPosition = 85;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 84:

            this.currentPosition = 84;
            this.topPosition = 85;
            this.topRightPosition = 74;
            this.rightPosition = 83;
            this.bottomRightPosition = 100;
            this.bottomPosition = 101;
            this.bottomLeftPosition = 102;
            this.leftPosition = 103;
            this.topLeftPosition = 104;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 85:

            this.currentPosition = 85;
            this.topPosition = 86;
            this.topRightPosition = 75;
            this.rightPosition = 74;
            this.bottomRightPosition = 83;
            this.bottomPosition = 84;
            this.bottomLeftPosition = 103;
            this.leftPosition = 104;
            this.topLeftPosition = 105;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 86:

            this.currentPosition = 86;
            this.topPosition = 87;
            this.topRightPosition = 76;
            this.rightPosition = 75;
            this.bottomRightPosition = 74;
            this.bottomPosition = 85;
            this.bottomLeftPosition = 104;
            this.leftPosition = 105;
            this.topLeftPosition = 106;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 87:

            this.currentPosition = 87;
            this.topPosition = 88;
            this.topRightPosition = 89;
            this.rightPosition = 76;
            this.bottomRightPosition = 75;
            this.bottomPosition = 86;
            this.bottomLeftPosition = 105;
            this.leftPosition = 106;
            this.topLeftPosition = 107;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 2;

            break;
        case 88:

            this.currentPosition = 88;
            this.topPosition = 178;
            this.topRightPosition = 177;
            this.rightPosition = 89;
            this.bottomRightPosition = 76;
            this.bottomPosition = 87;
            this.bottomLeftPosition = 106;
            this.leftPosition = 107;
            this.topLeftPosition = 179;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 89:

            this.currentPosition = 89;
            this.topPosition = 177;
            this.topRightPosition = 176;
            this.rightPosition = 90;
            this.bottomRightPosition = 77;
            this.bottomPosition = 76;
            this.bottomLeftPosition = 87;
            this.leftPosition = 88;
            this.topLeftPosition = 178;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 90:

            this.currentPosition = 90;
            this.topPosition = 176;
            this.topRightPosition = 175;
            this.rightPosition = 91;
            this.bottomRightPosition = 78;
            this.bottomPosition = 77;
            this.bottomLeftPosition = 76;
            this.leftPosition = 89;
            this.topLeftPosition = 177;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;

            break;
        case 91:

            this.currentPosition = 91;
            this.topPosition = 175;
            this.topRightPosition = 174;
            this.rightPosition = 92;
            this.bottomRightPosition = 93;
            this.bottomPosition = 78;
            this.bottomLeftPosition = 77;
            this.leftPosition = 90;
            this.topLeftPosition = 176;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 7;

            break;
        case 92:

            this.currentPosition = 92;
            this.topPosition = 174;
            this.topRightPosition = -1;
            this.rightPosition = 35;
            this.bottomRightPosition = 34;
            this.bottomPosition = 93;
            this.bottomLeftPosition = 78;
            this.leftPosition = 91;
            this.topLeftPosition = 175;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 7;

            break;
        case 93:

            this.currentPosition = 93;
            this.topPosition = 92;
            this.topRightPosition = 35;
            this.rightPosition = 34;
            this.bottomRightPosition = 33;
            this.bottomPosition = 94;
            this.bottomLeftPosition = 79;
            this.leftPosition = 78;
            this.topLeftPosition = 91;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 8;

            break;
        case 94:

            this.currentPosition = 94;
            this.topPosition = 93;
            this.topRightPosition = 34;
            this.rightPosition = 33;
            this.bottomRightPosition = 32;
            this.bottomPosition = 95;
            this.bottomLeftPosition = 80;
            this.leftPosition = 79;
            this.topLeftPosition = 78;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 9;

            break;
        case 95:

            this.currentPosition = 95;
            this.topPosition = 94;
            this.topRightPosition = 33;
            this.rightPosition = 32;
            this.bottomRightPosition = 31;
            this.bottomPosition = 96;
            this.bottomLeftPosition = 81;
            this.leftPosition = 80;
            this.topLeftPosition = 79;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 10;

            break;
        case 96:

            this.currentPosition = 96;
            this.topPosition = 95;
            this.topRightPosition = 32;
            this.rightPosition = 31;
            this.bottomRightPosition = 30;
            this.bottomPosition = 97;
            this.bottomLeftPosition = 98;
            this.leftPosition = 81;
            this.topLeftPosition = 80;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 11;

            break;
        case 97:

            this.currentPosition = 97;
            this.topPosition = 96;
            this.topRightPosition = 31;
            this.rightPosition = 30;
            this.bottomRightPosition = -1;
            this.bottomPosition = 215;
            this.bottomLeftPosition = 214;
            this.leftPosition = 98;
            this.topLeftPosition = 81;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 6;

            break;
        case 98:

            this.currentPosition = 98;
            this.topPosition = 81;
            this.topRightPosition = 96;
            this.rightPosition = 97;
            this.bottomRightPosition = 215;
            this.bottomPosition = 214;
            this.bottomLeftPosition = 213;
            this.leftPosition = 99;
            this.topLeftPosition = 82;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 11;

            break;
        case 99:

            this.currentPosition = 99;
            this.topPosition = 82;
            this.topRightPosition = 81;
            this.rightPosition = 98;
            this.bottomRightPosition = 214;
            this.bottomPosition = 213;
            this.bottomLeftPosition = 212;
            this.leftPosition = 100;
            this.topLeftPosition = 83;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 100:

            this.currentPosition = 100;
            this.topPosition = 83;
            this.topRightPosition = 82;
            this.rightPosition = 99;
            this.bottomRightPosition = 213;
            this.bottomPosition = 212;
            this.bottomLeftPosition = 211;
            this.leftPosition = 101;
            this.topLeftPosition = 84;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 101:

            this.currentPosition = 101;
            this.topPosition = 84;
            this.topRightPosition = 83;
            this.rightPosition = 100;
            this.bottomRightPosition = 212;
            this.bottomPosition = 211;
            this.bottomLeftPosition = 210;
            this.leftPosition = 102;
            this.topLeftPosition = 103;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 102:

            this.currentPosition = 102;
            this.topPosition = 103;
            this.topRightPosition = 84;
            this.rightPosition = 101;
            this.bottomRightPosition = 211;
            this.bottomPosition = 210;
            this.bottomLeftPosition = -1;
            this.leftPosition = 61;
            this.topLeftPosition = 60;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 103:

            this.currentPosition = 103;
            this.topPosition = 104;
            this.topRightPosition = 85;
            this.rightPosition = 84;
            this.bottomRightPosition = 101;
            this.bottomPosition = 102;
            this.bottomLeftPosition = 61;
            this.leftPosition = 60;
            this.topLeftPosition = 59;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 104:

            this.currentPosition = 104;
            this.topPosition = 105;
            this.topRightPosition = 86;
            this.rightPosition = 85;
            this.bottomRightPosition = 84;
            this.bottomPosition = 103;
            this.bottomLeftPosition = 60;
            this.leftPosition = 59;
            this.topLeftPosition = 58;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 105:

            this.currentPosition = 105;
            this.topPosition = 106;
            this.topRightPosition = 87;
            this.rightPosition = 86;
            this.bottomRightPosition = 85;
            this.bottomPosition = 104;
            this.bottomLeftPosition = 59;
            this.leftPosition = 58;
            this.topLeftPosition = 57;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 106:

            this.currentPosition = 106;
            this.topPosition = 107;
            this.topRightPosition = 88;
            this.rightPosition = 87;
            this.bottomRightPosition = 86;
            this.bottomPosition = 105;
            this.bottomLeftPosition = 58;
            this.leftPosition = 57;
            this.topLeftPosition = 56;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 107:

            this.currentPosition = 107;
            this.topPosition = 179;
            this.topRightPosition = 178;
            this.rightPosition = 88;
            this.bottomRightPosition = 87;
            this.bottomPosition = 106;
            this.bottomLeftPosition = 57;
            this.leftPosition = 56;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 1;

            break;
        case 108:

            this.currentPosition = 108;
            this.topPosition = 113;
            this.topRightPosition = 114;
            this.rightPosition = 115;
            this.bottomRightPosition = 116;
            this.bottomPosition = 109;
            this.bottomLeftPosition = 110;
            this.leftPosition = 111;
            this.topLeftPosition = 112;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;

            break;
        case 109:

            this.currentPosition = 109;
            this.topPosition = 108;
            this.topRightPosition = 115;
            this.rightPosition = 116;
            this.bottomRightPosition = 117;
            this.bottomPosition = 118;
            this.bottomLeftPosition = 119;
            this.leftPosition = 110;
            this.topLeftPosition = 111;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 4;

            break;
        case 110:

            this.currentPosition = 110;
            this.topPosition = 111;
            this.topRightPosition = 108;
            this.rightPosition = 109;
            this.bottomRightPosition = 118;
            this.bottomPosition = 119;
            this.bottomLeftPosition = 120;
            this.leftPosition = 121;
            this.topLeftPosition = 122;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 111:

            this.currentPosition = 111;
            this.topPosition = 112;
            this.topRightPosition = 113;
            this.rightPosition = 108;
            this.bottomRightPosition = 109;
            this.bottomPosition = 110;
            this.bottomLeftPosition = 121;
            this.leftPosition = 122;
            this.topLeftPosition = 123;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 3;

            break;
        case 112:

            this.currentPosition = 112;
            this.topPosition = 125;
            this.topRightPosition = 126;
            this.rightPosition = 113;
            this.bottomRightPosition = 108;
            this.bottomPosition = 111;
            this.bottomLeftPosition = 122;
            this.leftPosition = 123;
            this.topLeftPosition = 124;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 113:

            this.currentPosition = 113;
            this.topPosition = 126;
            this.topRightPosition = 127;
            this.rightPosition = 114;
            this.bottomRightPosition = 115;
            this.bottomPosition = 108;
            this.bottomLeftPosition = 111;
            this.leftPosition = 112;
            this.topLeftPosition = 125;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;

            break;
        case 114:

            this.currentPosition = 114;
            this.topPosition = 127;
            this.topRightPosition = 128;
            this.rightPosition = 129;
            this.bottomRightPosition = 130;
            this.bottomPosition = 115;
            this.bottomLeftPosition = 108;
            this.leftPosition = 113;
            this.topLeftPosition = 126;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 8;

            break;
        case 115:

            this.currentPosition = 115;
            this.topPosition = 114;
            this.topRightPosition = 129;
            this.rightPosition = 130;
            this.bottomRightPosition = 131;
            this.bottomPosition = 116;
            this.bottomLeftPosition = 109;
            this.leftPosition = 108;
            this.topLeftPosition = 113;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 9;

            break;
        case 116:

            this.currentPosition = 116;
            this.topPosition = 115;
            this.topRightPosition = 130;
            this.rightPosition = 131;
            this.bottomRightPosition = 132;
            this.bottomPosition = 117;
            this.bottomLeftPosition = 118;
            this.leftPosition = 109;
            this.topLeftPosition = 108;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 10;

            break;
        case 117:

            this.currentPosition = 117;
            this.topPosition = 116;
            this.topRightPosition = 131;
            this.rightPosition = 132;
            this.bottomRightPosition = 133;
            this.bottomPosition = 134;
            this.bottomLeftPosition = 135;
            this.leftPosition = 118;
            this.topLeftPosition = 109;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 5;

            break;
        case 118:

            this.currentPosition = 118;
            this.topPosition = 109;
            this.topRightPosition = 116;
            this.rightPosition = 117;
            this.bottomRightPosition = 134;
            this.bottomPosition = 135;
            this.bottomLeftPosition = 136;
            this.leftPosition = 119;
            this.topLeftPosition = 110;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 119:

            this.currentPosition = 119;
            this.topPosition = 110;
            this.topRightPosition = 109;
            this.rightPosition = 118;
            this.bottomRightPosition = 135;
            this.bottomPosition = 136;
            this.bottomLeftPosition = 137;
            this.leftPosition = 120;
            this.topLeftPosition = 121;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 120:

            this.currentPosition = 120;
            this.topPosition = 121;
            this.topRightPosition = 110;
            this.rightPosition = 119;
            this.bottomRightPosition = 136;
            this.bottomPosition = 137;
            this.bottomLeftPosition = 138;
            this.leftPosition = 139;
            this.topLeftPosition = 140;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 121:

            this.currentPosition = 121;
            this.topPosition = 122;
            this.topRightPosition = 111;
            this.rightPosition = 110;
            this.bottomRightPosition = 119;
            this.bottomPosition = 120;
            this.bottomLeftPosition = 139;
            this.leftPosition = 140;
            this.topLeftPosition = 141;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 122:

            this.currentPosition = 122;
            this.topPosition = 123;
            this.topRightPosition = 112;
            this.rightPosition = 111;
            this.bottomRightPosition = 110;
            this.bottomPosition = 121;
            this.bottomLeftPosition = 140;
            this.leftPosition = 141;
            this.topLeftPosition = 142;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 123:

            this.currentPosition = 123;
            this.topPosition = 124;
            this.topRightPosition = 125;
            this.rightPosition = 112;
            this.bottomRightPosition = 111;
            this.bottomPosition = 122;
            this.bottomLeftPosition = 141;
            this.leftPosition = 142;
            this.topLeftPosition = 143;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 2;

            break;
        case 124:

            this.currentPosition = 124;
            this.topPosition = 168;
            this.topRightPosition = 167;
            this.rightPosition = 125;
            this.bottomRightPosition = 112;
            this.bottomPosition = 123;
            this.bottomLeftPosition = 142;
            this.leftPosition = 143;
            this.topLeftPosition = 169;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 125:

            this.currentPosition = 125;
            this.topPosition = 167;
            this.topRightPosition = 166;
            this.rightPosition = 126;
            this.bottomRightPosition = 113;
            this.bottomPosition = 112;
            this.bottomLeftPosition = 123;
            this.leftPosition = 124;
            this.topLeftPosition = 168;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 126:

            this.currentPosition = 126;
            this.topPosition = 166;
            this.topRightPosition = 165;
            this.rightPosition = 127;
            this.bottomRightPosition = 114;
            this.bottomPosition = 113;
            this.bottomLeftPosition = 112;
            this.leftPosition = 125;
            this.topLeftPosition = 167;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;

            break;
        case 127:

            this.currentPosition = 127;
            this.topPosition = 165;
            this.topRightPosition = 164;
            this.rightPosition = 128;
            this.bottomRightPosition = 129;
            this.bottomPosition = 114;
            this.bottomLeftPosition = 113;
            this.leftPosition = 126;
            this.topLeftPosition = 166;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 7;

            break;
        case 128:

            this.currentPosition = 128;
            this.topPosition = 164;
            this.topRightPosition = -1;
            this.rightPosition = 71;
            this.bottomRightPosition = 70;
            this.bottomPosition = 129;
            this.bottomLeftPosition = 114;
            this.leftPosition = 127;
            this.topLeftPosition = 165;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 7;

            break;
        case 129:

            this.currentPosition = 129;
            this.topPosition = 128;
            this.topRightPosition = 71;
            this.rightPosition = 70;
            this.bottomRightPosition = 69;
            this.bottomPosition = 130;
            this.bottomLeftPosition = 115;
            this.leftPosition = 114;
            this.topLeftPosition = 127;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 8;

            break;
        case 130:

            this.currentPosition = 130;
            this.topPosition = 129;
            this.topRightPosition = 70;
            this.rightPosition = 69;
            this.bottomRightPosition = 68;
            this.bottomPosition = 131;
            this.bottomLeftPosition = 116;
            this.leftPosition = 115;
            this.topLeftPosition = 114;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 9;

            break;
        case 131:

            this.currentPosition = 131;
            this.topPosition = 130;
            this.topRightPosition = 69;
            this.rightPosition = 68;
            this.bottomRightPosition = 67;
            this.bottomPosition = 132;
            this.bottomLeftPosition = 117;
            this.leftPosition = 116;
            this.topLeftPosition = 115;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 10;

            break;
        case 132:

            this.currentPosition = 132;
            this.topPosition = 131;
            this.topRightPosition = 68;
            this.rightPosition = 67;
            this.bottomRightPosition = 66;
            this.bottomPosition = 133;
            this.bottomLeftPosition = 134;
            this.leftPosition = 117;
            this.topLeftPosition = 116;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 11;

            break;
        case 133:

            this.currentPosition = 133;
            this.topPosition = 132;
            this.topRightPosition = 67;
            this.rightPosition = 66;
            this.bottomRightPosition = -1;
            this.bottomPosition = 205;
            this.bottomLeftPosition = 204;
            this.leftPosition = 134;
            this.topLeftPosition = 117;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 6;

            break;
        case 134:

            this.currentPosition = 134;
            this.topPosition = 117;
            this.topRightPosition = 132;
            this.rightPosition = 133;
            this.bottomRightPosition = 205;
            this.bottomPosition = 204;
            this.bottomLeftPosition = 203;
            this.leftPosition = 135;
            this.topLeftPosition = 118;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 11;

            break;
        case 135:

            this.currentPosition = 135;
            this.topPosition = 118;
            this.topRightPosition = 117;
            this.rightPosition = 134;
            this.bottomRightPosition = 204;
            this.bottomPosition = 203;
            this.bottomLeftPosition = 202;
            this.leftPosition = 136;
            this.topLeftPosition = 119;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 136:

            this.currentPosition = 136;
            this.topPosition = 119;
            this.topRightPosition = 118;
            this.rightPosition = 135;
            this.bottomRightPosition = 203;
            this.bottomPosition = 202;
            this.bottomLeftPosition = 201;
            this.leftPosition = 137;
            this.topLeftPosition = 120;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 137:

            this.currentPosition = 137;
            this.topPosition = 120;
            this.topRightPosition = 119;
            this.rightPosition = 136;
            this.bottomRightPosition = 202;
            this.bottomPosition = 201;
            this.bottomLeftPosition = 200;
            this.leftPosition = 138;
            this.topLeftPosition = 139;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 138:

            this.currentPosition = 138;
            this.topPosition = 139;
            this.topRightPosition = 120;
            this.rightPosition = 137;
            this.bottomRightPosition = 201;
            this.bottomPosition = 200;
            this.bottomLeftPosition = -1;
            this.leftPosition = 25;
            this.topLeftPosition = 24;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 139:

            this.currentPosition = 139;
            this.topPosition = 140;
            this.topRightPosition = 121;
            this.rightPosition = 120;
            this.bottomRightPosition = 137;
            this.bottomPosition = 138;
            this.bottomLeftPosition = 25;
            this.leftPosition = 24;
            this.topLeftPosition = 23;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 140:

            this.currentPosition = 140;
            this.topPosition = 141;
            this.topRightPosition = 122;
            this.rightPosition = 121;
            this.bottomRightPosition = 120;
            this.bottomPosition = 139;
            this.bottomLeftPosition = 24;
            this.leftPosition = 23;
            this.topLeftPosition = 22;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 141:

            this.currentPosition = 141;
            this.topPosition = 142;
            this.topRightPosition = 123;
            this.rightPosition = 122;
            this.bottomRightPosition = 121;
            this.bottomPosition = 140;
            this.bottomLeftPosition = 23;
            this.leftPosition = 22;
            this.topLeftPosition = 21;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 142:

            this.currentPosition = 142;
            this.topPosition = 143;
            this.topRightPosition = 124;
            this.rightPosition = 123;
            this.bottomRightPosition = 122;
            this.bottomPosition = 141;
            this.bottomLeftPosition = 22;
            this.leftPosition = 21;
            this.topLeftPosition = 20;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 143:

            this.currentPosition = 143;
            this.topPosition = 169;
            this.topRightPosition = 168;
            this.rightPosition = 124;
            this.bottomRightPosition = 123;
            this.bottomPosition = 142;
            this.bottomLeftPosition = 21;
            this.leftPosition = 20;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 1;

            break;
        case 144:

            this.currentPosition = 144;
            this.topPosition = 149;
            this.topRightPosition = 150;
            this.rightPosition = 151;
            this.bottomRightPosition = 152;
            this.bottomPosition = 145;
            this.bottomLeftPosition = 146;
            this.leftPosition = 147;
            this.topLeftPosition = 148;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;

            break;
        case 145:

            this.currentPosition = 145;
            this.topPosition = 144;
            this.topRightPosition = 151;
            this.rightPosition = 152;
            this.bottomRightPosition = 153;
            this.bottomPosition = 154;
            this.bottomLeftPosition = 155;
            this.leftPosition = 146;
            this.topLeftPosition = 147;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 4;

            break;
        case 146:

            this.currentPosition = 146;
            this.topPosition = 147;
            this.topRightPosition = 144;
            this.rightPosition = 145;
            this.bottomRightPosition = 154;
            this.bottomPosition = 155;
            this.bottomLeftPosition = 156;
            this.leftPosition = 157;
            this.topLeftPosition = 158;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 147:

            this.currentPosition = 147;
            this.topPosition = 148;
            this.topRightPosition = 149;
            this.rightPosition = 144;
            this.bottomRightPosition = 145;
            this.bottomPosition = 146;
            this.bottomLeftPosition = 157;
            this.leftPosition = 158;
            this.topLeftPosition = 159;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 3;

            break;
        case 148:

            this.currentPosition = 148;
            this.topPosition = 161;
            this.topRightPosition = 162;
            this.rightPosition = 149;
            this.bottomRightPosition = 144;
            this.bottomPosition = 147;
            this.bottomLeftPosition = 158;
            this.leftPosition = 159;
            this.topLeftPosition = 160;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 149:

            this.currentPosition = 149;
            this.topPosition = 162;
            this.topRightPosition = 163;
            this.rightPosition = 150;
            this.bottomRightPosition = 151;
            this.bottomPosition = 144;
            this.bottomLeftPosition = 147;
            this.leftPosition = 148;
            this.topLeftPosition = 161;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;

            break;
        case 150:

            this.currentPosition = 150;
            this.topPosition = 163;
            this.topRightPosition = 164;
            this.rightPosition = 165;
            this.bottomRightPosition = 166;
            this.bottomPosition = 151;
            this.bottomLeftPosition = 144;
            this.leftPosition = 149;
            this.topLeftPosition = 162;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 8;

            break;
        case 151:

            this.currentPosition = 151;
            this.topPosition = 150;
            this.topRightPosition = 165;
            this.rightPosition = 166;
            this.bottomRightPosition = 167;
            this.bottomPosition = 152;
            this.bottomLeftPosition = 145;
            this.leftPosition = 144;
            this.topLeftPosition = 149;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 9;

            break;
        case 152:

            this.currentPosition = 152;
            this.topPosition = 151;
            this.topRightPosition = 166;
            this.rightPosition = 167;
            this.bottomRightPosition = 168;
            this.bottomPosition = 153;
            this.bottomLeftPosition = 154;
            this.leftPosition = 145;
            this.topLeftPosition = 144;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 10;

            break;
        case 153:

            this.currentPosition = 153;
            this.topPosition = 152;
            this.topRightPosition = 167;
            this.rightPosition = 168;
            this.bottomRightPosition = 169;
            this.bottomPosition = 170;
            this.bottomLeftPosition = 171;
            this.leftPosition = 154;
            this.topLeftPosition = 145;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 5;

            break;
        case 154:

            this.currentPosition = 154;
            this.topPosition = 145;
            this.topRightPosition = 152;
            this.rightPosition = 153;
            this.bottomRightPosition = 170;
            this.bottomPosition = 171;
            this.bottomLeftPosition = 172;
            this.leftPosition = 155;
            this.topLeftPosition = 146;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 155:

            this.currentPosition = 155;
            this.topPosition = 146;
            this.topRightPosition = 145;
            this.rightPosition = 154;
            this.bottomRightPosition = 171;
            this.bottomPosition = 172;
            this.bottomLeftPosition = 173;
            this.leftPosition = 156;
            this.topLeftPosition = 157;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 156:

            this.currentPosition = 156;
            this.topPosition = 157;
            this.topRightPosition = 146;
            this.rightPosition = 155;
            this.bottomRightPosition = 172;
            this.bottomPosition = 173;
            this.bottomLeftPosition = 174;
            this.leftPosition = 175;
            this.topLeftPosition = 176;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 157:

            this.currentPosition = 157;
            this.topPosition = 158;
            this.topRightPosition = 147;
            this.rightPosition = 146;
            this.bottomRightPosition = 155;
            this.bottomPosition = 156;
            this.bottomLeftPosition = 175;
            this.leftPosition = 176;
            this.topLeftPosition = 177;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 158:

            this.currentPosition = 158;
            this.topPosition = 159;
            this.topRightPosition = 148;
            this.rightPosition = 147;
            this.bottomRightPosition = 146;
            this.bottomPosition = 157;
            this.bottomLeftPosition = 176;
            this.leftPosition = 177;
            this.topLeftPosition = 178;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 159:

            this.currentPosition = 159;
            this.topPosition = 160;
            this.topRightPosition = 161;
            this.rightPosition = 148;
            this.bottomRightPosition = 147;
            this.bottomPosition = 158;
            this.bottomLeftPosition = 177;
            this.leftPosition = 178;
            this.topLeftPosition = 179;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 2;

            break;
        case 160:

            this.currentPosition = 160;
            this.topPosition = 55;
            this.topRightPosition = 54;
            this.rightPosition = 161;
            this.bottomRightPosition = 148;
            this.bottomPosition = 159;
            this.bottomLeftPosition = 178;
            this.leftPosition = 179;
            this.topLeftPosition = 56;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 161:

            this.currentPosition = 161;
            this.topPosition = 54;
            this.topRightPosition = 53;
            this.rightPosition = 162;
            this.bottomRightPosition = 149;
            this.bottomPosition = 148;
            this.bottomLeftPosition = 159;
            this.leftPosition = 160;
            this.topLeftPosition = 55;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 162:

            this.currentPosition = 162;
            this.topPosition = 53;
            this.topRightPosition = 52;
            this.rightPosition = 163;
            this.bottomRightPosition = 150;
            this.bottomPosition = 149;
            this.bottomLeftPosition = 148;
            this.leftPosition = 161;
            this.topLeftPosition = 54;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;

            break;
        case 163:

            this.currentPosition = 163;
            this.topPosition = 52;
            this.topRightPosition = 71;
            this.rightPosition = 164;
            this.bottomRightPosition = 165;
            this.bottomPosition = 150;
            this.bottomLeftPosition = 149;
            this.leftPosition = 162;
            this.topLeftPosition = 53;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 7;

            break;
        case 164:

            this.currentPosition = 164;
            this.topPosition = 71;
            this.topRightPosition = -1;
            this.rightPosition = 128;
            this.bottomRightPosition = 127;
            this.bottomPosition = 165;
            this.bottomLeftPosition = 150;
            this.leftPosition = 163;
            this.topLeftPosition = 52;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 7;

            break;
        case 165:

            this.currentPosition = 165;
            this.topPosition = 164;
            this.topRightPosition = 128;
            this.rightPosition = 127;
            this.bottomRightPosition = 126;
            this.bottomPosition = 166;
            this.bottomLeftPosition = 151;
            this.leftPosition = 150;
            this.topLeftPosition = 163;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 8;

            break;
        case 166:

            this.currentPosition = 166;
            this.topPosition = 165;
            this.topRightPosition = 127;
            this.rightPosition = 126;
            this.bottomRightPosition = 125;
            this.bottomPosition = 167;
            this.bottomLeftPosition = 152;
            this.leftPosition = 151;
            this.topLeftPosition = 150;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 9;

            break;
        case 167:

            this.currentPosition = 167;
            this.topPosition = 166;
            this.topRightPosition = 126;
            this.rightPosition = 125;
            this.bottomRightPosition = 124;
            this.bottomPosition = 168;
            this.bottomLeftPosition = 153;
            this.leftPosition = 152;
            this.topLeftPosition = 151;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 10;

            break;
        case 168:

            this.currentPosition = 168;
            this.topPosition = 167;
            this.topRightPosition = 125;
            this.rightPosition = 124;
            this.bottomRightPosition = 143;
            this.bottomPosition = 169;
            this.bottomLeftPosition = 170;
            this.leftPosition = 153;
            this.topLeftPosition = 152;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 11;

            break;
        case 169:

            this.currentPosition = 169;
            this.topPosition = 168;
            this.topRightPosition = 124;
            this.rightPosition = 143;
            this.bottomRightPosition = -1;
            this.bottomPosition = 20;
            this.bottomLeftPosition = 19;
            this.leftPosition = 170;
            this.topLeftPosition = 153;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 6;

            break;
        case 170:

            this.currentPosition = 170;
            this.topPosition = 153;
            this.topRightPosition = 168;
            this.rightPosition = 169;
            this.bottomRightPosition = 20;
            this.bottomPosition = 19;
            this.bottomLeftPosition = 18;
            this.leftPosition = 171;
            this.topLeftPosition = 154;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 11;

            break;
        case 171:

            this.currentPosition = 171;
            this.topPosition = 154;
            this.topRightPosition = 153;
            this.rightPosition = 170;
            this.bottomRightPosition = 19;
            this.bottomPosition = 18;
            this.bottomLeftPosition = 17;
            this.leftPosition = 172;
            this.topLeftPosition = 155;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 172:

            this.currentPosition = 172;
            this.topPosition = 155;
            this.topRightPosition = 154;
            this.rightPosition = 171;
            this.bottomRightPosition = 18;
            this.bottomPosition = 17;
            this.bottomLeftPosition = 16;
            this.leftPosition = 173;
            this.topLeftPosition = 156;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 173:

            this.currentPosition = 173;
            this.topPosition = 156;
            this.topRightPosition = 155;
            this.rightPosition = 172;
            this.bottomRightPosition = 17;
            this.bottomPosition = 16;
            this.bottomLeftPosition = 35;
            this.leftPosition = 174;
            this.topLeftPosition = 175;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 174:

            this.currentPosition = 174;
            this.topPosition = 175;
            this.topRightPosition = 156;
            this.rightPosition = 173;
            this.bottomRightPosition = 16;
            this.bottomPosition = 35;
            this.bottomLeftPosition = -1;
            this.leftPosition = 92;
            this.topLeftPosition = 91;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 175:

            this.currentPosition = 175;
            this.topPosition = 176;
            this.topRightPosition = 157;
            this.rightPosition = 156;
            this.bottomRightPosition = 173;
            this.bottomPosition = 174;
            this.bottomLeftPosition = 92;
            this.leftPosition = 91;
            this.topLeftPosition = 90;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 176:

            this.currentPosition = 176;
            this.topPosition = 177;
            this.topRightPosition = 158;
            this.rightPosition = 157;
            this.bottomRightPosition = 156;
            this.bottomPosition = 175;
            this.bottomLeftPosition = 91;
            this.leftPosition = 90;
            this.topLeftPosition = 89;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 177:

            this.currentPosition = 177;
            this.topPosition = 178;
            this.topRightPosition = 159;
            this.rightPosition = 158;
            this.bottomRightPosition = 157;
            this.bottomPosition = 176;
            this.bottomLeftPosition = 90;
            this.leftPosition = 89;
            this.topLeftPosition = 88;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 178:

            this.currentPosition = 178;
            this.topPosition = 179;
            this.topRightPosition = 160;
            this.rightPosition = 159;
            this.bottomRightPosition = 158;
            this.bottomPosition = 177;
            this.bottomLeftPosition = 89;
            this.leftPosition = 88;
            this.topLeftPosition = 107;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 179:

            this.currentPosition = 179;
            this.topPosition = 56;
            this.topRightPosition = 55;
            this.rightPosition = 160;
            this.bottomRightPosition = 159;
            this.bottomPosition = 178;
            this.bottomLeftPosition = 88;
            this.leftPosition = 107;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 1;

            break;
        case 180:

            this.currentPosition = 180;
            this.topPosition = 185;
            this.topRightPosition = 186;
            this.rightPosition = 187;
            this.bottomRightPosition = 188;
            this.bottomPosition = 181;
            this.bottomLeftPosition = 182;
            this.leftPosition = 183;
            this.topLeftPosition = 184;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 3;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 4;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 9;

            break;
        case 181:

            this.currentPosition = 181;
            this.topPosition = 180;
            this.topRightPosition = 187;
            this.rightPosition = 188;
            this.bottomRightPosition = 189;
            this.bottomPosition = 190;
            this.bottomLeftPosition = 191;
            this.leftPosition = 182;
            this.topLeftPosition = 183;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 3;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 4;

            break;
        case 182:

            this.currentPosition = 182;
            this.topPosition = 183;
            this.topRightPosition = 180;
            this.rightPosition = 181;
            this.bottomRightPosition = 190;
            this.bottomPosition = 191;
            this.bottomLeftPosition = 192;
            this.leftPosition = 193;
            this.topLeftPosition = 194;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 4;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 3;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 183:

            this.currentPosition = 183;
            this.topPosition = 184;
            this.topRightPosition = 185;
            this.rightPosition = 180;
            this.bottomRightPosition = 181;
            this.bottomPosition = 182;
            this.bottomLeftPosition = 193;
            this.leftPosition = 194;
            this.topLeftPosition = 195;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 4;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 3;

            break;
        case 184:

            this.currentPosition = 184;
            this.topPosition = 197;
            this.topRightPosition = 198;
            this.rightPosition = 185;
            this.bottomRightPosition = 180;
            this.bottomPosition = 183;
            this.bottomLeftPosition = 194;
            this.leftPosition = 195;
            this.topLeftPosition = 196;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 8;

            break;
        case 185:

            this.currentPosition = 185;
            this.topPosition = 198;
            this.topRightPosition = 199;
            this.rightPosition = 186;
            this.bottomRightPosition = 187;
            this.bottomPosition = 180;
            this.bottomLeftPosition = 183;
            this.leftPosition = 184;
            this.topLeftPosition = 197;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 8;

            break;
        case 186:

            this.currentPosition = 186;
            this.topPosition = 199;
            this.topRightPosition = 200;
            this.rightPosition = 201;
            this.bottomRightPosition = 202;
            this.bottomPosition = 187;
            this.bottomLeftPosition = 180;
            this.leftPosition = 185;
            this.topLeftPosition = 198;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 2;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 5;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 8;

            break;
        case 187:

            this.currentPosition = 187;
            this.topPosition = 186;
            this.topRightPosition = 201;
            this.rightPosition = 202;
            this.bottomRightPosition = 203;
            this.bottomPosition = 188;
            this.bottomLeftPosition = 181;
            this.leftPosition = 180;
            this.topLeftPosition = 185;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 9;

            break;
        case 188:

            this.currentPosition = 188;
            this.topPosition = 187;
            this.topRightPosition = 202;
            this.rightPosition = 203;
            this.bottomRightPosition = 204;
            this.bottomPosition = 189;
            this.bottomLeftPosition = 190;
            this.leftPosition = 181;
            this.topLeftPosition = 180;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 10;

            break;
        case 189:

            this.currentPosition = 189;
            this.topPosition = 188;
            this.topRightPosition = 203;
            this.rightPosition = 204;
            this.bottomRightPosition = 205;
            this.bottomPosition = 206;
            this.bottomLeftPosition = 207;
            this.leftPosition = 190;
            this.topLeftPosition = 181;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 2;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 5;

            break;
        case 190:

            this.currentPosition = 190;
            this.topPosition = 181;
            this.topRightPosition = 188;
            this.rightPosition = 189;
            this.bottomRightPosition = 206;
            this.bottomPosition = 207;
            this.bottomLeftPosition = 208;
            this.leftPosition = 191;
            this.topLeftPosition = 182;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 191:

            this.currentPosition = 191;
            this.topPosition = 182;
            this.topRightPosition = 181;
            this.rightPosition = 190;
            this.bottomRightPosition = 207;
            this.bottomPosition = 208;
            this.bottomLeftPosition = 209;
            this.leftPosition = 192;
            this.topLeftPosition = 193;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 192:

            this.currentPosition = 192;
            this.topPosition = 193;
            this.topRightPosition = 182;
            this.rightPosition = 191;
            this.bottomRightPosition = 208;
            this.bottomPosition = 209;
            this.bottomLeftPosition = 210;
            this.leftPosition = 211;
            this.topLeftPosition = 212;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 5;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 2;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 193:

            this.currentPosition = 193;
            this.topPosition = 194;
            this.topRightPosition = 183;
            this.rightPosition = 182;
            this.bottomRightPosition = 191;
            this.bottomPosition = 192;
            this.bottomLeftPosition = 211;
            this.leftPosition = 212;
            this.topLeftPosition = 213;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 194:

            this.currentPosition = 194;
            this.topPosition = 195;
            this.topRightPosition = 184;
            this.rightPosition = 183;
            this.bottomRightPosition = 182;
            this.bottomPosition = 193;
            this.bottomLeftPosition = 212;
            this.leftPosition = 213;
            this.topLeftPosition = 214;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 195:

            this.currentPosition = 195;
            this.topPosition = 196;
            this.topRightPosition = 197;
            this.rightPosition = 184;
            this.bottomRightPosition = 183;
            this.bottomPosition = 194;
            this.bottomLeftPosition = 213;
            this.leftPosition = 214;
            this.topLeftPosition = 215;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 5;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 2;

            break;
        case 196:

            this.currentPosition = 196;
            this.topPosition = 29;
            this.topRightPosition = 28;
            this.rightPosition = 197;
            this.bottomRightPosition = 184;
            this.bottomPosition = 195;
            this.bottomLeftPosition = 214;
            this.leftPosition = 215;
            this.topLeftPosition = 30;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 7;

            break;
        case 197:

            this.currentPosition = 197;
            this.topPosition = 28;
            this.topRightPosition = 27;
            this.rightPosition = 198;
            this.bottomRightPosition = 185;
            this.bottomPosition = 184;
            this.bottomLeftPosition = 195;
            this.leftPosition = 196;
            this.topLeftPosition = 29;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 7;

            break;
        case 198:

            this.currentPosition = 198;
            this.topPosition = 27;
            this.topRightPosition = 26;
            this.rightPosition = 199;
            this.bottomRightPosition = 186;
            this.bottomPosition = 185;
            this.bottomLeftPosition = 184;
            this.leftPosition = 197;
            this.topLeftPosition = 28;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 7;

            break;
        case 199:

            this.currentPosition = 199;
            this.topPosition = 26;
            this.topRightPosition = 25;
            this.rightPosition = 200;
            this.bottomRightPosition = 201;
            this.bottomPosition = 186;
            this.bottomLeftPosition = 185;
            this.leftPosition = 198;
            this.topLeftPosition = 27;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 7;

            break;
        case 200:

            this.currentPosition = 200;
            this.topPosition = 25;
            this.topRightPosition = -1;
            this.rightPosition = 138;
            this.bottomRightPosition = 137;
            this.bottomPosition = 201;
            this.bottomLeftPosition = 186;
            this.leftPosition = 199;
            this.topLeftPosition = 26;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 1;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 6;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 7;

            break;
        case 201:

            this.currentPosition = 201;
            this.topPosition = 200;
            this.topRightPosition = 138;
            this.rightPosition = 137;
            this.bottomRightPosition = 136;
            this.bottomPosition = 202;
            this.bottomLeftPosition = 187;
            this.leftPosition = 186;
            this.topLeftPosition = 199;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 11;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 8;

            break;
        case 202:

            this.currentPosition = 202;
            this.topPosition = 201;
            this.topRightPosition = 137;
            this.rightPosition = 136;
            this.bottomRightPosition = 135;
            this.bottomPosition = 203;
            this.bottomLeftPosition = 188;
            this.leftPosition = 187;
            this.topLeftPosition = 186;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 10;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 9;

            break;
        case 203:

            this.currentPosition = 203;
            this.topPosition = 202;
            this.topRightPosition = 136;
            this.rightPosition = 135;
            this.bottomRightPosition = 134;
            this.bottomPosition = 204;
            this.bottomLeftPosition = 189;
            this.leftPosition = 188;
            this.topLeftPosition = 187;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 9;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 10;

            break;
        case 204:

            this.currentPosition = 204;
            this.topPosition = 203;
            this.topRightPosition = 135;
            this.rightPosition = 134;
            this.bottomRightPosition = 133;
            this.bottomPosition = 205;
            this.bottomLeftPosition = 206;
            this.leftPosition = 189;
            this.topLeftPosition = 188;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 8;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 11;

            break;
        case 205:

            this.currentPosition = 205;
            this.topPosition = 204;
            this.topRightPosition = 134;
            this.rightPosition = 133;
            this.bottomRightPosition = -1;
            this.bottomPosition = 66;
            this.bottomLeftPosition = 65;
            this.leftPosition = 206;
            this.topLeftPosition = 189;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 7;
            this.lengthBottomRightPosition = 1;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 12;
            this.lengthTopLeftPosition = 6;

            break;
        case 206:

            this.currentPosition = 206;
            this.topPosition = 189;
            this.topRightPosition = 204;
            this.rightPosition = 205;
            this.bottomRightPosition = 66;
            this.bottomPosition = 65;
            this.bottomLeftPosition = 64;
            this.leftPosition = 207;
            this.topLeftPosition = 190;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 8;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 11;
            this.lengthTopLeftPosition = 11;

            break;
        case 207:

            this.currentPosition = 207;
            this.topPosition = 190;
            this.topRightPosition = 189;
            this.rightPosition = 206;
            this.bottomRightPosition = 65;
            this.bottomPosition = 64;
            this.bottomLeftPosition = 63;
            this.leftPosition = 208;
            this.topLeftPosition = 191;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 9;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 10;
            this.lengthTopLeftPosition = 10;

            break;
        case 208:

            this.currentPosition = 208;
            this.topPosition = 191;
            this.topRightPosition = 190;
            this.rightPosition = 207;
            this.bottomRightPosition = 64;
            this.bottomPosition = 63;
            this.bottomLeftPosition = 62;
            this.leftPosition = 209;
            this.topLeftPosition = 192;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 10;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 9;
            this.lengthTopLeftPosition = 9;

            break;
        case 209:

            this.currentPosition = 209;
            this.topPosition = 192;
            this.topRightPosition = 191;
            this.rightPosition = 208;
            this.bottomRightPosition = 63;
            this.bottomPosition = 62;
            this.bottomLeftPosition = 61;
            this.leftPosition = 210;
            this.topLeftPosition = 211;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 11;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 8;
            this.lengthTopLeftPosition = 8;

            break;
        case 210:

            this.currentPosition = 210;
            this.topPosition = 211;
            this.topRightPosition = 192;
            this.rightPosition = 209;
            this.bottomRightPosition = 62;
            this.bottomPosition = 61;
            this.bottomLeftPosition = -1;
            this.leftPosition = 102;
            this.topLeftPosition = 101;

            this.lengthTopPosition = 12;
            this.lengthTopRightPosition = 6;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 7;
            this.lengthBottomPosition = 7;
            this.lengthBottomLeftPosition = 1;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 211:

            this.currentPosition = 211;
            this.topPosition = 212;
            this.topRightPosition = 193;
            this.rightPosition = 192;
            this.bottomRightPosition = 209;
            this.bottomPosition = 210;
            this.bottomLeftPosition = 102;
            this.leftPosition = 101;
            this.topLeftPosition = 100;

            this.lengthTopPosition = 11;
            this.lengthTopRightPosition = 11;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 8;
            this.lengthBottomPosition = 8;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 212:

            this.currentPosition = 212;
            this.topPosition = 213;
            this.topRightPosition = 194;
            this.rightPosition = 193;
            this.bottomRightPosition = 192;
            this.bottomPosition = 211;
            this.bottomLeftPosition = 101;
            this.leftPosition = 100;
            this.topLeftPosition = 99;

            this.lengthTopPosition = 10;
            this.lengthTopRightPosition = 10;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 9;
            this.lengthBottomPosition = 9;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 213:

            this.currentPosition = 213;
            this.topPosition = 214;
            this.topRightPosition = 195;
            this.rightPosition = 194;
            this.bottomRightPosition = 193;
            this.bottomPosition = 212;
            this.bottomLeftPosition = 100;
            this.leftPosition = 99;
            this.topLeftPosition = 98;

            this.lengthTopPosition = 9;
            this.lengthTopRightPosition = 9;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 10;
            this.lengthBottomPosition = 10;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 214:

            this.currentPosition = 214;
            this.topPosition = 215;
            this.topRightPosition = 196;
            this.rightPosition = 195;
            this.bottomRightPosition = 194;
            this.bottomPosition = 213;
            this.bottomLeftPosition = 99;
            this.leftPosition = 98;
            this.topLeftPosition = 97;

            this.lengthTopPosition = 8;
            this.lengthTopRightPosition = 8;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 11;
            this.lengthBottomPosition = 11;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 7;

            break;
        case 215:

            this.currentPosition = 215;
            this.topPosition = 30;
            this.topRightPosition = 29;
            this.rightPosition = 196;
            this.bottomRightPosition = 195;
            this.bottomPosition = 214;
            this.bottomLeftPosition = 98;
            this.leftPosition = 97;
            this.topLeftPosition = -1;

            this.lengthTopPosition = 7;
            this.lengthTopRightPosition = 7;
            this.lengthRightPosition = 12;
            this.lengthBottomRightPosition = 6;
            this.lengthBottomPosition = 12;
            this.lengthBottomLeftPosition = 7;
            this.lengthLeftPosition = 7;
            this.lengthTopLeftPosition = 1;

            break;

        default:
            break;

    }

}; // 6x6