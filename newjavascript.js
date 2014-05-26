/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.sudoku = {
    loadContentForDate: function(date) {
        pauseTimer();

        res = {
            loader: $('<div class="loader"/>', {}),
            container: $(".container")
        }
        res.container.append(res.loader);
        window.gameCommon.loadGameContentForDate(date, function(sudokuData) {
            res.container.find(res.loader).remove();
            $(".container").focus();
            if (sudokuData) {
                if (sudokuData.Difficulty == undefined) {
                    var now = getPacificTime();
                    now.setDate(now.getDate() - 1);
                    window.sudoku.loadContentForDate(now);
                } else {
                    runTimer = true;
                    gameFromServer = sudokuData;
                    showGame();
                    checkCompletedShading();
                    showHeader();
                    window.sudoku.loadGames();
                    $('#calendar').removeClass('iactive');
                    $('#calendar ul').hide();
                    if ($('#hints .toggle_button_off').length > 0)
                        $('#hints').trigger('tap');
                    if (conflictsOption == 1) {
                        $.each($('input:text:not([value=""]):not(".disabled")'), function (index, ele) {
                            check_validation($(ele).attr('value'), "r" + ele.id, false);
                        });
                    }

                    checkCompletedShading();
                }
            } else {
                // ????
                var now = getPacificTime();
                var tnow = new Date(now);
                tnow.setDate(now.getDate() - 2);
                window.sudoku.loadContentForDate(tnow);
            }
        }, function() {
            res.container.find(res.loader).remove();
            console.log("could not get for this date");
            console.log('loading game for one day back');

            //sometimes data is not available for current day, so retriving data for 2 days before
            var now = getPacificTime();
            var tnow = new Date(now);
            tnow.setDate(now.getDate() - 2);
            window.sudoku.loadContentForDate(tnow);
        });
    },

    loadGames: function(numDaysBack) {
        $("#popup_games").empty();
        if (!numDaysBack) 
            numDaysBack = 11;

        for (var idx = 0; idx < numDaysBack; idx++) {
            var date = getPacificTime();
            date.setDate(date.getDate() - idx);
            window.gameCommon.loadGameContentForDate(date, window.sudoku.renderGameInMenu, function() {});
        }
    },

    renderGameInMenu: function(sudokuData) {
        if (!sudokuData) 
            return;

        // Remove if it exists
        if ($('#popup_games #' + sudokuData.Date).length)
            $('#popup_games #' + sudokuData.Date).remove();

        var gameDiv = $('<div />').attr('id', sudokuData.Date);

        var savedGame = window.gameStorage.getLocal(window.gameCommon.gameCode + sudokuData.Date, true);
        completion = (savedGame && savedGame.completion) ? savedGame.completion : 0;

        if (gameFromServer.Date === sudokuData.Date) {
            gameDiv.addClass('cur_puz');
            $("#time").html(savedGame && tomin(savedGame.timestamp) || "00:00:00");
            runTimer = !(savedGame && savedGame.completion && savedGame.completion == 100);
            if (savedGame) 
                counter = savedGame.timestamp || 0;
            else 
                counter = 0;
        }

        gameDiv.on('click', function(event) {
            savePuzzle();
            pauseTimer();
            $("#calendar > ul").hide();
            var gameDate = window.gameCommon.splitDateString($(this).attr('id'), '-', 'yyyymmdd');
            window.sudoku.loadContentForDate(gameDate);
        });

        var nameSpan = $('<span class="name" />');
        var displayDate = window.gameCommon.splitDateString(sudokuData.Date, '-', 'mmddyy');
        var dateSpan = $('<span />').text(displayDate);
        var difficultySpan = $('<span class="desc" />');

        var difficulty = parseInt(sudokuData.Difficulty);
        for (var idx = 5; idx > 0; idx--) {
            var inverse = (6 - idx);
            var starStyle = difficulty >= inverse ? 'filled' : 'empty';
            var starSrc = '/game/sudoku/images/star_' + starStyle + '.png';
            var star = $('<img />').attr('id', 'star' + inverse).attr('src', starSrc);
            difficultySpan.append(star);
        }

        nameSpan.append(dateSpan).append(difficultySpan);
        var percText = savedGame && Math.floor(savedGame.completion) + "%" || "0%";
        var percSpan = $('<span class="perc" />').text(percText);
        var spentText = savedGame && tomin(savedGame.timestamp) || "00:00:00";
        var spentSpan = $('<span class="time_spent" />').text(spentText);
        gameDiv.append(nameSpan).append(percSpan).append(spentSpan);

        // This may be too expensive to do each game load; not sure.
        var elements = $("#popup_games").append(gameDiv);
        window.gameCommon.sortPopup("#popup_games");
    },
}
/**********************************
Date Updated: 2012/28/07
Created By: Pyntail

***********************************/
//put_number_in_cell('1');
//user_hint('1');
var completion = 0;
var col_clicked = 0;
var previous_col_tabled = "";
var conflictsOption = 1;
var line1 = new Array(9);
var hints = new Array(10);
var userHints = new Array(10);
var completed_3_3Row = new Array();
var completed_3_3Col = new Array();
var completed3_3Counter = 0;
var rowCompletedArray = new Array();
var rowCompletedCounter = 0;
var colCompletedArray = new Array();
var colCompletedCounter = 0;
var gameSaveMenu = " ";
var gameFromServer = {};
var allanswer = '';
var musicState = true;
var soundEffects = true;
var width = 500, height = 500;
var watch_flag = 0;
var hints_array = new Array();
var hint_on_off_flag = 0;
var load = 0;
var cell_clicked;
var now;
var conflictsused = false, hintsused = false;
var puzzle_music;
var compsolved = 0;
var beenCompleted = false;
var togger = true;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

var Soundfx = {}
if (typeof window.Audio != 'undefined') {
    clickit = new Audio('/game/sudoku/sudoku_sounds/select.mp3');
    endpuzzle = new Audio('/game/sudoku/sudoku_sounds/sudoku_puzzle_end.mp3');
    completeios = new Audio('/game/sudoku/sudoku_sounds/completerc.mp3');
} else {
    Soundfx.clickit = null;
    Soundfx.endpuzzle = null;
    Soundfx.completeios = null;
}

var Soundfx = {};

function playSound(name) {
    //Soundfx[name].currentTime = 0;
    if (!window.gameCommon.isiOS) {
        if (typeof window.Audio != 'undefined') {
            Soundfx[name].play();
        }
    }
};

$(window).load(function () {
    if ($('body').hasClass('width-620')) {
        $('body').css({
            '-moz-transform': 'scale(0.81)',
            '-webkit-transform': 'scale(0.81)',
            'transform': 'scale(0.81)',
            'transform-origin': '0% 0% 0' ,
            '-webkit-transform-origin': '0% 0% 0',
            '-ms-transform-origin': '0% 0% 0'
        });
    };
    if (window.gameCommon.isiOS) {
        //$("script[src='/js/jquery.mobile-1.3.2.min.js']").remove();
    }
    var now = getPacificTime();
    window.sudoku.loadContentForDate(now);
    configureEvents();

    // Looped Sudoku Music
    $('body').append('<audio id="puzzle_music" src="/game/sudoku/sudoku_sounds/start' + window.gameCommon.audioExt + '"loop="true" ></audio>');

    puzzle_music = document.getElementById('puzzle_music');

    if (musicState == false && puzzle_music && puzzle_music.pause)
        puzzle_music.pause();
    else if (musicState == true && puzzle_music && puzzle_music.pause) {
        if (window.gameCommon.isiOS) 
            $('#music_toggle').trigger('tap');
            puzzle_music.play();
    }

    if (!window.gameCommon.isiOS && !window.gameCommon.isAndroid) {
        gameFocusStates();
        window.gameCommon.toggleBlur(false, function() {});
    }
    if (window.gameCommon.isAndroid) {
        //$("head").append('<link rel="stylesheet" type="text/css" href="/game/sudoku/css/sudoku_android.css" />');
        //$("#sound1").append('<span class="musict" >MUSIC</span>');
        //$(".switch").append('<span class="thumb"></span><input type="checkbox"  />');
        //$('#music_toggle').hide();
        $('#music_toggle').trigger('tap');
    }
    if (window.gameCommon.isiOS) {
        //$("head").append('<link rel="stylesheet" type="text/css" href="/game/sudoku/css/sudoku_ios.css" />');
        //$("#sound1").append('<span class="musict" >MUSIC</span>');
        //$(".switch").append('<span class="thumb"></span><input type="checkbox"  />');
        //$('#music_toggle').hide();


    } else {
        $("#sound1").hide();
        $(".switch").hide();
    }

});
var switcher = function() {

    var $$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }
    if (navigator.appName == "Microsoft Internet Explorer") {} else {
        document.addEventListener("DOMContentLoaded", function() {
            $$(".switch").forEach(function(switchControl) {
                if (switchControl.classList.contains("on")) {
                    switchControl.lastElementChild.checked = true;
                }
                switchControl.addEventListener("click", function toggleSwitch() {
                    $('#music_toggle').trigger('tap');
                    checkbox = switchControl.lastElementChild;
                    checkbox.checked = !checkbox.checked;
                    switchControl.classList.toggle("on");
                }, false);
            });
        }, false);
    }
};

switcher();


var checkCompletedShading = function() {

    for (var row = 1; row < 10; row++) {
        var flag = true;
        for (var col = 1; col < 10; col++) {
            if ($('input.row' + row + '.col' + col).attr('value') != allanswer[(9 * (row - 1)) + (col - 1)]) {
                flag = false;
                break;
            }
        }
        if (flag)
            $('input.row' + row).addClass('shaded').attr('readonly', 'readonly');
    }
    for (var col = 1; col < 10; col++) {
        var flag = true;
        for (var row = 1; row < 10; row++) {
            if ($('input.row' + row + '.col' + col).attr('value') != allanswer[(9 * (row - 1)) + (col - 1)]) {
                flag = false;
                break;
            }
        }
        if (flag)
            $('input.col' + col).addClass('shaded').attr('readonly', 'readonly');
    }
    for (var rowgrid = 0; rowgrid < 3; rowgrid++) {
        for (var colgrid = 0; colgrid < 3; colgrid++) {
            var flag = true;
            for (var row = 1 + rowgrid * 3; row < 4 + rowgrid * 3; row++) {
                for (var col = 1 + colgrid * 3; col < 4 + colgrid * 3; col++) {
                    //console.log('(' + row + ',' + col + ')');
                    if ($('input.row' + row + '.col' + col).attr('value') != allanswer[(9 * (row - 1)) + (col - 1)]) {
                        flag = false;
                        break;
                    }
                }
                if (!flag)
                    break;
            }
            //console.log('---');
            if (flag) {
                for (var row = 1 + rowgrid * 3; row < 4 + rowgrid * 3; row++) {
                    for (var col = 1 + colgrid * 3; col < 4 + colgrid * 3; col++) {
                        $('input.row' + row + '.col' + col).addClass('shaded').attr('readonly', 'readonly');
                    }
                }
            }
        }
    }
}
/************************************ function called to change game array values on new game load ********************/

var changeGameValues = function() {
    var result = gameFromServer;
    var difficulty = result.Difficulty;
    var solution = result.Solution;
    console.log(result);


    //change difficulty satrs according to difficulty in json

    if (difficulty == 2) {
        $("#star2").attr("src", "/game/sudoku/images/star_filled.png");
    } else if (difficulty == "3") {
        $("#star2").attr("src", "/game/sudoku/images/star_filled.png");
        $("#star3").attr("src", "/game/sudoku/images/star_filled.png");
    } else if (difficulty == "4") {
        $("#star2").attr("src", "/game/sudoku/images/star_filled.png");
        $("#star3").attr("src", "/game/sudoku/images/star_filled.png");
        $("#star4").attr("src", "/game/sudoku/images/star_filled.png");
    } else if (difficulty == "5") {
        $("#star2").attr("src", "/game/sudoku/images/star_filled.png");
        $("#star3").attr("src", "/game/sudoku/images/star_filled.png");
        $("#star4").attr("src", "/game/sudoku/images/star_filled.png");
        $("#star5").attr("src", "/game/sudoku/images/star_filled.png");
    }

    for (var i = 1; i < 10; i++) {
        line1[i - 1] = new Array(9);
        solutionLineSplitted = solution['line' + i].split("");
        for (var j = 1; j < 10; j++ ) {
            //putting solution in array from ajax result
            if (/^\d+$/.test(solutionLineSplitted[j - 1])) {
                line1[i -1][j - 1] = solutionLineSplitted[j - 1];
            }
        }
    }

}

/************************************ function called to save game ********************/

var updateCompletion = function() {
    //completion = Math.ceil($('input:text:not([value=""]):not(".disabled")').length * 100 / $('input:text:not(".disabled")').length);
    var index = 0, correct = 0, total = $('input:text:not(".disabled")').length;
    $.each($('#canvas>tbody>tr>td>input'), function (index, inputia) {
        if (!$(inputia).hasClass('disabled') && allanswer[index] == $(inputia).attr('value')) {
            correct++;

        }
        index++;
    });
    completion = Math.ceil(correct * 100 / total);

    var currentDiv = $("#calendar #" + gameFromServer.Date + ' .perc');
    if (currentDiv.length) 
        currentDiv.text(completion + "%")
    if (completion == 100) {
        if (beenCompleted == false) {
            //console.log('completed ' + beenCompleted);
            pauseTimer();
            runTimer = false;
            $('#letters_total').html(total);
            $('#letters_solved_you').html(total - compsolved);
            $('#letters_solved_computer').html(compsolved);
            $('#conflicts_used').html(conflictsused ? "Yes" : "No");
            $('#possibilities_used').html(hintsused ? "Yes" : "No");
            $('#completion_time').html($('#time').html());
            $('.overlay, #congrats').show(0, function () {
                $('#black_overlay').animate({
                    opacity: 0.6 
                }, 0, function () {
                    $('#congrats').animate({
                        opacity: 1.0 
                    }, 0);
                });
            });
            if (window.gameCommon.isiOS) {
                if (soundEffects == true) {
                    playSound('endpuzzle');
                }
            } else {
                playInitialSound("sudoku_puzzle_end");
            }
            beenCompleted = true;

        }
        if (beenCompleted == true) {
            //console.log('completed ' + beenCompleted);
            pauseTimer();
            runTimer = false;
            $('#letters_total').html(total);
            $('#letters_solved_you').html(total - compsolved);
            $('#letters_solved_computer').html(compsolved);
            $('#conflicts_used').html(conflictsused ? "Yes" : "No");
            $('#possibilities_used').html(hintsused ? "Yes" : "No");
            $('#completion_time').html($('#time').html());
            //playInitialSound("sudoku_puzzle_end");
        }
    }
}

var savePuzzle = function() {
    var answered = "", valueCounter = 0;

    //for (var i = 1; i < 10; i++) {
    //    for (var j = 1; j < 10; j++) {
    //        if ($("#" + i + "c" + j).attr('value') != undefined && $("#" + i + "c" + j).attr('value') != "") {
    //            if ($("#" + i + "c" + j).hasClass('disabled')) {
    //                answered = answered + ($("#" + i + "c" + j).attr('value') + "s");
    //            }
    //            else {
    //                answered = answered + $("#" + i + "c" + j).attr('value');
    //            }
    //            valueCounter = valueCounter + 1;
    //        }
    //        else {
    //            answered = answered + "?";
    //        }

    //    }
    //}
    $.each($('#canvas>tbody>tr>td>input'), function (index, inputia) {
        answered += $(inputia).attr('value').trim() || '-';
    });
    var jsonObj = {
        "answered": answered,
        "timestamp": counter,
        "completion": completion,
        "notes": userHints 
    };
    window.gameStorage.saveLocal(window.gameCommon.gameCode + gameFromServer.Date, jsonObj, true);
    //$('#calendar ul').hide();
    //$('#popup_games').hide();
}

/************************************ function called to check value entered donot effect already completed row, cloumn or 3*3 matrix ********************/

var check_row_col = function(colId) {
    var colSplitted = colId.split("");
    var row = colSplitted[1];
    var rowIdMain = colSplitted[1];
    var colIdMain = colSplitted[3];
    var col = colSplitted[3];
    var c = colSplitted[2];
    var flag = 0;
    var index;
    var rowflag = 0;
    var rowindex;
    var colflag = 0;
    var colindex;

    for (var i = 0; i < completed_3_3Row.length; i++) {
        if ((row%3) == 0) {
            if ((row-1) == completed_3_3Row[i]) {
                if ((col%3) == 0) {
                    if ((col - 1) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                } else if ((col%3) == 2) {
                    if ((col) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                } else if ((col%3) == 1) {
                    if ((col++) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                }
            }
        } else if ((row%3) == 2) {
            if ((row) == completed_3_3Row[i]) {
                if ((col%3) == 0) {
                    if ((col - 1) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                } else if ((col%3) == 2) {
                    if ((col) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                } else if ((col%3) == 1) {
                    if ((col++) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                }
            }
        } else if ((row%3) == 1) {
            if ((row++) == completed_3_3Row[i]) {
                if ((col%3) == 0) {
                    if ((col - 1) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                } else if ((col%3) == 2) {
                    if ((col) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                } else if ((col%3) == 1) {
                    if ((col++) == completed_3_3Col[i]) {
                        flag = 1;
                        index = i;
                    }
                }
            }
        }
    }

    for (var i = 0; i < colCompletedArray.length; i++)
    {
        if (colCompletedArray[i] == colIdMain) {
            for (var j = 1; j < 10; j++) {
                if ($("#r" + j + c + colIdMain).css("background-color") == "#9CF") {
                    $("#r" + j + c + colIdMain).css("background-color", "transparent");
                }
            }
            colflag = 1;
            colindex = colCompletedArray[i];
            colCompletedArray.splice(i, 1);
            colCompletedCounter--;

        }
    }

    for (var i = 0; i < rowCompletedArray.length; i++)
    {
        if (rowCompletedArray[i] == rowIdMain) {
            for (var j = 1; j < 10; j++) {

                $("#r" + rowIdMain + c + j).css("background-color", "transparent");

            }
            rowflag = 1;
            rowindex = rowCompletedArray[i];
            rowCompletedArray.splice(i, 1);
            rowCompletedCounter--;
        }
    }

    if (flag == 1) {
        check3_3(colId, "transparent");

        var comRow2 = completed_3_3Row[index] - 1;
        var comRow1 = comRow2 + 1;
        comRow1 = comRow1 + 1;
        for (var i = 0; i < rowCompletedArray.length; i++) {
            if (comRow1 == rowCompletedArray[i]) {
                changeColor("row", rowCompletedArray[i], "transparent");
            }
            if (comRow2 == rowCompletedArray[i]) {
                changeColor("row", rowCompletedArray[i], "transparent");
            }
        }

        for (var i = 0; i < colCompletedArray.length; i++) {
            var comCol2 = completed_3_3Col[i] - 1;
            var comCol1 = comCol2 + 1;
            comCol1 = comCol1 + 1;
            if (comCol1 == colCompletedArray[i]) {
                changeColor("col", colCompletedArray[i], "transparent");
            }
            if (comCol2 == colCompletedArray[i]) {
                changeColor("col", colCompletedArray[i], "transparent");
            }
        }
        //}
        completed_3_3Row.splice(index, 1);
        completed_3_3Col.splice(index, 1);
        completed3_3Counter--;
    } else {

        previousClickedColumnColor = 0;
        for (var j = 0; j < completed_3_3Row.length; j++) {
            var comRowmain = completed_3_3Row[j];
            var comRow2 = completed_3_3Row[j] - 1;
            var comRow1 = comRow2 + 1;
            comRow1 = comRow1 + 1;

            var comColmain = completed_3_3Col[j];
            var comCol2 = completed_3_3Col[j] - 1;
            var comCol1 = comCol2 + 1;
            comCol1 = comCol1 + 1;

            if (comRow1 == rowindex) {
                check3_3("r" + comRowmain + "c" + comColmain , "transparent");
            }
            if (comRow2 == rowindex) {
                check3_3("r" + comRowmain + "c" + comColmain, "transparent");
            }
            if (comRowmain == rowindex) {
                check3_3("r" + comRowmain + "c" + comColmain, "transparent");
            }

            if (comCol1 == colindex) {
                check3_3("r" + comRowmain + "c" + comColmain, "transparent");
            }
            if (comCol2 == colindex) {
                check3_3("r" + comRowmain + "c" + comColmain, "transparent");
            }
            if (comColmain == colindex) {
                check3_3("r" + comRowmain + "c" + comColmain, "transparent");
            }
        }
        //alert(rowCompletedArray);
        for (var i = 0; i < rowCompletedArray.length; i++) {
            changeColor("row", rowCompletedArray[i], "transparent");
        }
        for (var i = 0; i < colCompletedArray.length; i++) {
            changeColor("col", colCompletedArray[i], "transparent");
        }
    }
}

/************************************ function called to change background colour of a row or column ********************/

var changeColor = function(type, id, color) {
    if (type == "row") {
        for (var i = 1; i < 10; i++) {
            $("#r" + id + "c" + i).css("background-color", color);
        }
    }

    if (type == "col") {
        for (var i = 1; i < 10; i++) {
            $("#r" + i + "c" + id).css("background-color", color);
        }
    }
}

/************************************ function called to CHANGE background colour of 3*3 cell ********************/

var check3_3 = function(colId, color) {
    //alert(colId);
    var colSplitted = colId.split("");
    var row = colSplitted[1];
    var col = colSplitted[3];
    var c = colSplitted[2];
    var k = col;
    k++;
    var l = k;
    l++;
    var m = row;
    m++
    var n = m;
    n++;
    var check_3_3 = new Array(4);
    var flag_3_3 = 0;
    if ((row%3) == 0) {
        if ((col%3) == 0) {
            $('#r' + (row-1) + c + (col-1)).css("background-color", color);
            $('#r' + (row-1) + c + (col-2)).css("background-color", color);
            $('#r' + (row-2) + c + (col-1)).css("background-color", color);
            $('#r' + (row-2) + c + (col-2)).css("background-color", color);
            $('#r' + (row) + c + (col-1)).css("background-color", color);
            $('#r' + (row) + c + (col-2)).css("background-color", color);
            $('#r' + (row-1) + c + (col)).css("background-color", color);
            $('#r' + (row-2) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        } else if ((col%3) == 2) {
            $('#r' + (row-1) + c + (col-1)).css("background-color", color);
            $('#r' + (row-1) + c + (k)).css("background-color", color);
            $('#r' + (row-2) + c + (col-1)).css("background-color", color);
            $('#r' + (row-2) + c + (k)).css("background-color", color);
            $('#r' + (row-2) + c + (col)).css("background-color", color);
            $('#r' + (row-1) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col-1)).css("background-color", color);
            $('#r' + (row) + c + (k)).css("background-color", color);
            flag_3_3 = 0;
        } else if ((col%3) == 1) {
            $('#r' + (row-1) + c + (l)).css("background-color", color);
            $('#r' + (row-1) + c + (k)).css("background-color", color);
            $('#r' + (row-2) + c + (k)).css("background-color", color);
            $('#r' + (row-2) + c + (l)).css("background-color", color);
            $('#r' + (row-1) + c + (col)).css("background-color", color);
            $('#r' + (row-2) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (k)).css("background-color", color);
            $('#r' + (row) + c + (l)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        }
    } else if ((row%3) == 2) {
        if ((col%3) == 0) {
            $('#r' + (row-1) + c + (col-1)).css("background-color", color);
            $('#r' + (row-1) + c + (col-2)).css("background-color", color);
            $('#r' + (m) + c + (col-1)).css("background-color", color);
            $('#r' + (m) + c + (col-2)).css("background-color", color);
            $('#r' + (row-1) + c + (col)).css("background-color", color);
            $('#r' + (m) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col-1)).css("background-color", color);
            $('#r' + (row) + c + (col-2)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        } else if ((col%3) == 2) {
            $('#r' + (row-1) + c + (col-1)).css("background-color", color);
            $('#r' + (row-1) + c + (k)).css("background-color", color);
            $('#r' + (m) + c + (col-1)).css("background-color", color);
            $('#r' + (m) + c + (k)).css("background-color", color);
            $('#r' + (row-1) + c + (col)).css("background-color", color);
            $('#r' + (m) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col-1)).css("background-color", color);
            $('#r' + (row) + c + (k)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        } else if ((col%3) == 1) {
            $('#r' + (row-1) + c + (k)).css("background-color", color);
            $('#r' + (row-1) + c + (l)).css("background-color", color);
            $('#r' + (m) + c + (k)).css("background-color", color);
            $('#r' + (m) + c + (l)).css("background-color", color);
            $('#r' + (row-1) + c + (col)).css("background-color", color);
            $('#r' + (m) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (k)).css("background-color", color);
            $('#r' + (row) + c + (l)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        }
    } else if ((row%3) == 1) {
        if ((col%3) == 0) {
            $('#r' + (m) + c + (col-1)).css("background-color", color);
            $('#r' + (m) + c + (col-2)).css("background-color", color);
            $('#r' + (n) + c + (col-1)).css("background-color", color);
            $('#r' + (n) + c + (col-2)).css("background-color", color);
            $('#r' + (m) + c + (col)).css("background-color", color);
            $('#r' + (n) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col-1)).css("background-color", color);
            $('#r' + (row) + c + (col-2)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        } else if ((col%3) == 2) {
            $('#r' + (m) + c + (col-1)).css("background-color", color);
            $('#r' + (m) + c + (k)).css("background-color", color);
            $('#r' + (n) + c + (col-1)).css("background-color", color);
            $('#r' + (n) + c + (k)).css("background-color", color);
            $('#r' + (row) + c + (col-1)).css("background-color", color);
            $('#r' + (row) + c + (k)).css("background-color", color);
            $('#r' + (m) + c + (col)).css("background-color", color);
            $('#r' + (n) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        } else if ((col%3) == 1) {
            $('#r' + (m) + c + (k)).css("background-color", color);
            $('#r' + (m) + c + (l)).css("background-color", color);
            $('#r' + (n) + c + (k)).css("background-color", color);
            $('#r' + (n) + c + (l)).css("background-color", color);
            $('#r' + (row) + c + (k)).css("background-color", color);
            $('#r' + (row) + c + (l)).css("background-color", color);
            $('#r' + (m) + c + (col)).css("background-color", color);
            $('#r' + (n) + c + (col)).css("background-color", color);
            $('#r' + (row) + c + (col)).css("background-color", color);
            flag_3_3 = 0;
        }
    }
}

/****** function to update system generated hints on cell click   ******/

var update_hints = function() {
    if (hint_on_off_flag == 1) {
        for (var i = 1; i < 10; i++) {
            //loop to update hints
            for (var j = 1; j < 10; j++) {
                if (hints[i][j][0] != "no" && ($("#r" + i + "c" + j + " input").length == 0 || $("#r" + i + "c" + j + " input").attr('value') == "")) {
                    calculate_hints("r" + i + "c" + j);
                    generate_hints_table(i, j); //generate hints in the cell who donot contain system genarated value nor contain any user added value
                }
            }
        }
    }

}


/****** function to generate user hints in the selected cell   ******/

var show_user_hint = function(row, col) {
    //var toAppend = '<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id=' + row + 'c' + col + ' onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />';
    $('#' + row + 'c' + col).attr('value', '');
    var toAppend = '<table style="font-size: 10px !important; " class="hinttable"><tbody>';
    var counter = 1;
    var number_already_present_flag = 0;

    for (var i = 1; i < 4; i++)
    {
        toAppend += '<tr>';
        for (var j = 1; j < 4; j++)
        {
            for (var g = 0; g < userHints[row][col].length; g++) {
                // loop through all the hints for specific cell and check user entered hint presence
                if (userHints[row][col][g] == counter) {
                    number_already_present_flag = 1;
                    break;
                }
            }
            if (number_already_present_flag == 1) {
                // if counter is present in array, then show its value
                toAppend += '<td style="border: none;"><p style="color: #1EAFFF; font-size: 10px;" >' + counter + '</a></td>';
                number_already_present_flag = 0;
            } else {
                // if counter is not present in array, then donot show its value
                toAppend += '<td style="border: none;"><span style="color: #1EAFFF; text-decoration: none;"></span></td>';
                number_already_present_flag = 0;
            }
            counter++;
        }
        toAppend += '</tr>';
    }
    toAppend += '</tbody></table>';
    var existingTable = $("#r" + row + "c" + col + '>table');
    if (existingTable.length != 0)
        existingTable.replaceWith(toAppend);
    else
        $("#r" + row + "c" + col).append(toAppend);
}

/****** function called when user wants to enter his own hints in the selected cell   ******/
var user_hint = function(number) {
    $('#' + cell_clicked.substring(1)).attr('value', number);
    var isConflict = check_validation(number, cell_clicked, false);
    if (!isConflict) {
        var id_str = cell_clicked.split("");
        var row = id_str[1];
        var col = id_str[3];
        var hint_already_present_flag = 0;
        //check_row_col(cell_clicked);
        for (var i = 0; i < userHints[row][col].length; i++) {
            if (userHints[row][col][i] == number) {
                //check presence of user entered hint in the array
                hint_already_present_flag = 1;
                //alert(number);
                break;
            }
        }
        if (hint_already_present_flag == 0) {
            // if hint not present in array, put it in the array
            userHints[row][col][userHints[row][col].length] = number;
            show_user_hint(row, col);
        } else {
            for (var i = 0; i < userHints[row][col].length; i++)
                if (userHints[row][col][i] == number)
                    userHints[row][col][i] = 0;
            show_user_hint(row, col);
        }
    } else {
        var id_str = cell_clicked.split("");
        var row = id_str[1];
        var col = id_str[3];
        var hint_already_present_flag = 0;
        for (var i = 0; i < userHints[row][col].length; i++)
            if (userHints[row][col][i] == number)
                userHints[row][col][i] = 0;
        show_user_hint(row, col);
    }
}
/****** function called when user wants to turn on off system hints   ******/

var show_hints = function() {
    if (hint_on_off_flag == 0) {
        hint_on_off_flag = 1;
        hintsused = true;
        if ($('#tabnotes').hasClass('tabactive'))
            $('#tabentries').click();
        if ($('#conflicts .toggle_button_on').length != 0)
        //$('#conflicts').hide();
        $('#tabnotes')
            .attr('disabled', 'true');
        $('#conflicts').attr('disabled', 'true');
        //$('#space').addClass('regular');
        for (var i = 1; i < 10; i++) {
            //$("#hint_" + i).attr('onclick', '');      //disable user hints keyboard
            for (var j = 1; j < 10; j++) {
                calculate_hints("r" + i + "c" + j);
                if (hints[i][j][0] != "no" && ($("#r" + i + "c" + j + " input").length == 0 || $("#r" + i + "c" + j + " input").attr('value') == "")) {
                    generate_hints_table(i, j); //generate hints in the cell who donot contain system genarated value nor contain any user added value
                }
            }
        }
    } else if (hint_on_off_flag == 1) {
        hint_on_off_flag = 0;
        //$('#space').removeClass('regular');
        $('#tabnotes').removeAttr('disabled');
        //$('#conflicts').show();
        for (var i = 1; i < 10; i++) {
            //$("#hint_" + i).attr('onclick', '');      //disable user hints keyboard
            for (var j = 1; j < 10; j++) {
                //calculate_hints("r" + i + "c" + j);
                if ($("#r" + i + "c" + j + " input").attr('value').trim().length == 0) {
                    show_user_hint(i, j); //generate hints in the cell who donot contain system genarated value nor contain any user added value
                }
            }
        }
        //for(var i = 1; i < 10; i++){
        //	$("#hint_" + i).attr('onclick', 'user_hint('+ i +');');     //enable user hints keyboard
        //	for(var j = 1; j < 10; j++){
        //		if($("#r"+i+"c"+j+" table").length == 1){
        //		    $("#r" + i + "c" + j).html('<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id=' + i + 'c' + j + ' onkeydown=keyPressed("' + i + 'c' + j + '",event) onkeyup=checkValidation("' + i + 'c' + j + '",event) />');  //remove hints from the cells
        //		}
        //	}
        //}
    }
}

/************************************ function called to check input entered by user through original keyboard ********************/

var checkinputvalidation = function(Id) {
    check_validation($("#" + Id).attr('value'), colId);
}

/****** function to show system hints in each cell   ******/

var generate_hints_table = function(row, col) {
    var toAppend = '<table font-size: 10px !important; class="hinttable"><tbody>';
    var counter = 1;
    var number_already_present_flag = 0;

    for (var i = 1; i < 4; i++)
    {
        toAppend += '<tr>';
        for (var j = 1; j < 4; j++)
        {
            for (var g = 0; g < hints[row][col].length; g++) {

                if (hints[row][col][g] == counter) {
                    //if counter equals to the number in array, it means the value in counter is not a hint
                    number_already_present_flag = 1; // because hints array contain the values which are in the cells.
                    break;
                }
            }
            if (number_already_present_flag == 0) {
                toAppend += '<td style="border: none;"><p style="color: #666; font-size: 10px;" >' + counter + '</a></td>';
            } else {
                toAppend += '<td style="border: none;"><span style="color: #666; text-decoration: none;"></span></td>';
                number_already_present_flag = 0;
            }
            counter++;
        }
        toAppend += '</tr>';
    }
    toAppend += '</tbody></table>';
    var existingTable = $("#r" + row + "c" + col + '>table');
    if (existingTable.length != 0)
        existingTable.replaceWith(toAppend);
    else
        $("#r" + row + "c" + col).append(toAppend);
}

/************************************ function called for movement between cells through arrow keys ********************/

var keyPressed = function(TB, e)
{
    //alert(e.keyCode);
    var colId;
    if (e.keyCode == 46 || e.keyCode == 8) {
        $('#' + cell_clicked.substring(1)).attr('value', '');
        update_hints();
        e.preventDefault();
        return false;
        // let it happen, don't do anything
    }
    if (e.keyCode == 40 || e.keyCode == 13) {
        // arrow down
        if (TB.split("c")[0] < 9) {
            do {
                colId = eval(TB.split("c")[0] + '+1') + 'c' + TB.split("c")[1];
                TB = colId;
            }
            while ($('#' + colId).hasClass('disabled') && colId.split("c")[0] <= 9)
            }
        e.preventDefault();
        //show_numbers("r" + colId);
    } else if (e.keyCode == 38) {
        // arrow up
        if (TB.split("c")[0] > 1) {
            do {
                colId = eval(TB.split("c")[0] + '-1') + 'c' + TB.split("c")[1];
                TB = colId;
            }
            while ($('#' + colId).hasClass('disabled') && colId.split("c")[0] >= 1)
            }
            e.preventDefault();
    } else if (e.keyCode == 37) {
        // arrow left
        if (TB.split("c")[1] > 1) {
            do {
                colId = TB.split("c")[0] + 'c' + eval(TB.split("c")[1] + '-1');
                TB = colId;
            }
            while ($('#' + colId).hasClass('disabled') && colId.split("c")[1] >= 1)
            }
            e.preventDefault();
    } else if (e.keyCode == 39) {
        // arrow right
        if (TB.split("c")[1] < 9) {
            do
            {
                colId = TB.split("c")[0] + 'c' + eval(TB.split("c")[1] + '+1');
                TB = colId;
            }
            while ($('#' + colId).hasClass('disabled') && colId.split("c")[1] <= 9)
            }
            e.preventDefault();
    } else
        $('#' + TB).select();
        if (colId && !$('#' + colId).hasClass('disabled')) {
            document.getElementById(colId).focus();
            //show_numbers("r" + colId);
        }
}

/****** function to get value from the specific cell for hints   ******/

var check_hints_array = function(row, row_check , c, i, col) {
    var hintAlreadyFlag = 0;

    for (var j = 0; j < hints[row][col].length; j++) {
        if (hints[row][col][j] == $("#" + row_check + c + i).attr('value')) {
            hintAlreadyFlag = 1;
            break;
        }
    }
    if (hintAlreadyFlag == 0 && ($("#" + row_check + c + i).attr('value') != "")) {
        hints[row][col][hints[row][col].length] = $("#" + row_check + c + i).attr('value');
    }
}

/****** function to get values of the specific cell row, column, and its 3*3 cell   ******/

var calculate_hints = function(colId) {

    var id_str = colId.split("");
    var col = id_str[3];
    var row = id_str[1];
    hints[row][col] = new Array();
    var c = id_str[2];
    var k = col;
    k++;
    var l = k;
    l++;
    var m = row;
    m++
    var n = m;
    n++;
    hints_array = [];
    hintAlreadyFlag = 0;

    if ($('#r' + row + 'c' + col).html().indexOf("disabled") >= 0) {
        hints[row][col][0] = "no"
        return;
    }

    for (var i = 1; i < 10; i++) {
        //get complete row values
        if (i == 1) {
            hints[row][col][0] = $("#" + row + c + i).attr('value');
        } else {
            if ($("#" + row + c + i).attr('value') != "") {
                check_hints_array( row, row , c, i, col);
            }
        }
    }

    for (var i = 1; i < 10; i++) {
        //get complete column values
        if ($("#" + i + c + col).attr('value') != "") {
            check_hints_array(row, i , c, col, col);
        }
    }
    // get 3*3 cell values
    if ((row%3) == 0) {
        if ((col%3) == 0) {
            if ($("#" + (row-1) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, row - 1 , c, col - 1, col);
            }
            if ($("#" + (row-1) + c + (col-2)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (col-2), col);
            }
            if ($("#" + (row-2) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (row-2) , c , (col-1), col);
            }
            if ($("#" + (row-2) + c + (col-2)).attr('value') != "") {
                check_hints_array(row, (row-2) , c , (col-2), col);
            }
        } else if ((col%3) == 2) {
            if ($("#" + (row-1) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, row-1 , c , col-1, col);
            }
            if ($("#" + (row-1) + c + (k)).attr('value') != "") {
                check_hints_array(row, row-1 , c , k, col);
            }
            if ($("#" + (row-2) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, row-2 , c , col-1, col);
            }
            if ($("#" + (row-2) + c + (k)).attr('value') != "") {
                check_hints_array(row, row-2 , c , k, col);
            }
        } else if ((col%3) == 1) {
            if ($("#" + (row-1) + c + (l)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (l), col);
            }
            if ($("#" + (row-1) + c + (k)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (k), col);
            }
            if ($("#" + (row-2) + c + (k)).attr('value') != "") {
                check_hints_array(row, (row-2) , c , (k), col);
            }
            if ($("#" + (row-2) + c + (l)).attr('value') != "") {
                check_hints_array(row, (row-2) , c , (l), col);
            }
        }
    } else if ((row%3) == 2) {
        if ((col%3) == 0) {
            if ($("#" + (row-1) + c + (col-2)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (col-2), col);
            }
            if ($("#" + (row-1) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (col-1), col);
            }
            if ($("#" + (m) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (m) , c , (col-1), col);
            }
            if ($("#" + (m) + c + (col-2)).attr('value') != "") {
                check_hints_array(row, (m) , c , (col-2), col);
            }
        } else if ((col%3) == 2) {
            if ($("#" + (row-1) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (col-1), col);
            }
            if ($("#" + (row-1) + c + (k)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (k), col);
            }
            if ($("#" + (m) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (m) , c , (col-1), col);
            }
            if ($("#" + (m) + c + (k)).attr('value') != "") {
                check_hints_array(row, (m) , c , (k), col);
            }
        } else if ((col%3) == 1) {
            if ($("#" + (row-1) + c + (k)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (k), col);
            }
            if ($("#" + (row-1) + c + (l)).attr('value') != "") {
                check_hints_array(row, (row-1) , c , (l), col);
            }
            if ($("#" + (m) + c + (k)).attr('value') != "") {
                check_hints_array(row, (m) , c , (k), col);
            }
            if ($("#" + (m) + c + (l)).attr('value') != "") {
                check_hints_array(row, (m) , c , (l), col);
            }
        }
    } else if ((row%3) == 1) {
        if ((col%3) == 0) {
            if ($("#" + (m) + c + (col-2)).attr('value') != "") {
                check_hints_array(row, (m) , c , (col-2), col);
            }
            if ($("#" + (m) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (m) , c , (col-1), col);
            }
            if ($("#" + (n) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (n) , c , (col-1), col);
            }
            if ($("#" + (n) + c + (col-2)).attr('value') != "") {
                check_hints_array(row, (n) , c , (col-2), col);
            }
        } else if ((col%3) == 2) {
            if ($("#" + (m) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (m) , c , (col-1), col);
            }
            if ($("#" + (m) + c + (k)).attr('value') != "") {
                check_hints_array(row, (m) , c , (k), col);
            }
            if ($("#" + (n) + c + (col-1)).attr('value') != "") {
                check_hints_array(row, (n) , c , (col-1), col);
            }
            if ($("#" + (n) + c + (k)).attr('value') != "") {
                check_hints_array(row, (n) , c , (k), col);
            }
        } else if ((col%3) == 1) {
            if ($("#" + (m) + c + (k)).attr('value') != "") {
                check_hints_array(row, m , c , (k), col);
            }
            if ($("#" + (m) + c + (l)).attr('value') != "") {
                check_hints_array(row, m , c , l, col);
            }
            if ($("#" + (n) + c + (k)).attr('value') != "") {
                check_hints_array(row, n , c , k, col);
            }
            if ($("#" + (n) + c + (l)).attr('value') != "") {
                check_hints_array(row, n , c , l, col);
            }
        }
    }
    /*********************************************************************/


}

var onlyNumbers = function(event)
{
    var charCode = event.which || event.keyCode || event.charCode;

    //if (charCode > 31 && (charCode < 49 || charCode > 57)) {
    //    e.preventDefault();
    //    return false;
    //}
    if (charCode == 46 || charCode == 8) {
        $('#' + cell_clicked.substring(1)).attr('value', '');
        update_hints();
        event.preventDefault();
        return false;
        // let it happen, don't do anything
    } else {
        // Ensure that it is a number and stop the keypress
        if (charCode <= 48 || charCode > 57) {
            // && charCode <= 96) || charCode > 105) {
            event.preventDefault();
            return false;
        }
    }
    return true;

}

/*********  function to validate whether the user entered value in the cell is correct or not    *************/

// I feel sorry for whoever has to refactor this.
var check_validation = function(val, colId, checkcompletion) {
    var isConflict = false;
    var id_str = colId.split("");
    var row_backward = id_str[1] - 1;
    var row_forward = id_str[1];
    row_forward++;
    var col_backward = id_str[3] - 1;
    var col_forward = id_str[3];
    col_forward++;
    var col = id_str[3];
    var row = id_str[1];
    var c = id_str[2];
    var input_value = $("#" + id_str[1] + c + col).attr('value');
    if (input_value.trim() != '') {
        var row_flag = 0;
        var col_flag = 0;
        var row_empty_field_flag = 0;
        var col_empty_field_flag = 0;

        if (conflictsOption == 1) {

            while (row_backward > 0) {
                if ($("#" + row_backward + c + col).attr('value') == val) {
                    $('#' + row_backward + c + col).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 3000);
                    $('#' + colId).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 2000);
                    $('#' + colId + '>input').attr('value', '');
                    //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                    conflictsused = true;
                    isConflict = true;
                    playInitialSound("conflict");
                    row_flag = 1;
                    break;
                } else if ($("#" + row_backward + c + col).attr('value') == "") {
                    row_empty_field_flag = 1;
                }
                row_backward--;
            }

            //if (row_flag == 0) {
            while (row_forward < 10) {
                if ($("#" + row_forward + c + col).attr('value') == val) {
                    $('#' + row_forward + c + col).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 3000);
                    $('#' + colId).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 2000);
                    $('#' + colId + '>input').attr('value', '');
                    //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + '  style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                    conflictsused = true;
                    isConflict = true;
                    playInitialSound("conflict");
                    row_flag = 1;
                    break;

                } else if ($("#" + row_forward + c + col).attr('value') == "") {
                    row_empty_field_flag = 1;
                }
                row_forward++;
            }
            //}

            //if (row_flag == 0) {
            while (col_forward < 10) {
                if ($("#" + row + c + col_forward).attr('value') == val) {
                    $('#' + row + c + col_forward).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 3000);
                    $('#' + colId).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 2000);
                    $('#' + colId + '>input').attr('value', '');
                    //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                    conflictsused = true;
                    isConflict = true;
                    playInitialSound("conflict");
                    col_flag = 1;
                    break;
                } else if ($("#" + row + c + col_forward).attr('value') == "") {
                    col_empty_field_flag = 1;
                }
                col_forward++;
            }
            //}

            //if (row_flag == 0 && col_flag == 0) {
            while (col_backward > 0) {
                if ($("#" + row + c + col_backward).attr('value') == val) {
                    $('#' + row + c + col_backward).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 3000);
                    $('#' + colId).stop(true, true).effect("highlight", {
                        color: '#009cff' 
                    }, 2000);
                    $('#' + colId + '>input').attr('value', '');
                    //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                    conflictsused = true;
                    isConflict = true;
                    playInitialSound("conflict");
                    col_flag = 1;
                    break;

                } else if ($("#" + row + c + col_backward).attr('value') == "") {
                    col_empty_field_flag = 1;
                }
                col_backward--;
            }
            //}
            var flag_3_3 = 0;
            //if (row_flag == 0 && col_flag == 0) {
            var k = col;
            k++;
            var l = k;
            l++;
            var m = row;
            m++
            var n = m;
            n++;


            if ((row % 3) == 0) {
                if ((col % 3) == 0) {
                    if ($("#" + (row - 1) + c + (col - 1)).attr('value') == val) {
                        $('#' + (row - 1) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 1) + c + (col - 2)).attr('value') == val) {
                        $('#' + (row - 1) + c + (col - 2)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 2) + c + (col - 1)).attr('value') == val) {
                        $('#' + (row - 2) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 2) + c + (col - 2)).attr('value') == val) {
                        $('#' + (row - 2) + c + (col - 2)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                } else if ((col % 3) == 2) {
                    if ($("#" + (row - 1) + c + (col - 1)).attr('value') == val) {
                        $('#' + (row - 1) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 1) + c + (k)).attr('value') == val) {
                        $('#' + (row - 1) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 2) + c + (col - 1)).attr('value') == val) {
                        $('#' + (row - 2) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 2) + c + (k)).attr('value') == val) {
                        $('#' + (row - 2) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                } else if ((col % 3) == 1) {
                    if ($("#" + (row - 1) + c + (l)).attr('value') == val) {
                        $('#' + (row - 1) + c + (l)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 1) + c + (k)).attr('value') == val) {
                        $('#' + (row - 1) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 2) + c + (k)).attr('value') == val) {
                        $('#' + (row - 2) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 2) + c + (l)).attr('value') == val) {
                        $('#' + (row - 2) + c + (l)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                }
            } else if ((row % 3) == 2) {
                if ((col % 3) == 0) {
                    if ($("#" + (row - 1) + c + (col - 2)).attr('value') == val) {
                        $('#' + (row - 1) + c + (col - 2)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 1) + c + (col - 1)).attr('value') == val) {
                        $('#' + (row - 1) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (col - 1)).attr('value') == val) {
                        $('#' + (m) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (col - 2)).attr('value') == val) {
                        $('#' + (m) + c + (col - 2)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                } else if ((col % 3) == 2) {
                    if ($("#" + (row - 1) + c + (col - 1)).attr('value') == val) {
                        $('#' + (row - 1) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 1) + c + (k)).attr('value') == val) {
                        $('#' + (row - 1) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (col - 1)).attr('value') == val) {
                        $('#' + (m) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (k)).attr('value') == val) {
                        $('#' + (m) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                } else if ((col % 3) == 1) {
                    if ($("#" + (row - 1) + c + (k)).attr('value') == val) {
                        $('#' + (row - 1) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (row - 1) + c + (l)).attr('value') == val) {
                        $('#' + (row - 1) + c + (l)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (k)).attr('value') == val) {
                        $('#' + (m) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (l)).attr('value') == val) {
                        $('#' + (m) + c + (l)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event)  />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                }
            } else if ((row % 3) == 1) {
                if ((col % 3) == 0) {
                    if ($("#" + (m) + c + (col - 2)).attr('value') == val) {
                        $('#' + (m) + c + (col - 2)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (col - 1)).attr('value') == val) {
                        $('#' + (m) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (n) + c + (col - 1)).attr('value') == val) {
                        $('#' + (n) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (n) + c + (col - 2)).attr('value') == val) {
                        $('#' + (n) + c + (col - 2)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + '  style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                } else if ((col % 3) == 2) {
                    if ($("#" + (m) + c + (col - 1)).attr('value') == val) {
                        $('#' + (m) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (k)).attr('value') == val) {
                        $('#' + (m) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (n) + c + (col - 1)).attr('value') == val) {
                        $('#' + (n) + c + (col - 1)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (n) + c + (k)).attr('value') == val) {
                        $('#' + (n) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                } else if ((col % 3) == 1) {
                    if ($("#" + (m) + c + (k)).attr('value') == val) {
                        $('#' + (m) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (m) + c + (l)).attr('value') == val) {
                        $('#' + (m) + c + (l)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (n) + c + (k)).attr('value') == val) {
                        $('#' + (n) + c + (k)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    } else if ($("#" + (n) + c + (l)).attr('value') == val) {
                        $('#' + (n) + c + (l)).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 3000);
                        flag_3_3 = 1;
                    }
                    if (flag_3_3 == 1) {
                        $('#' + colId).stop(true, true).effect("highlight", {
                            color: '#009cff' 
                        }, 2000);
                        $('#' + colId + '>input').attr('value', '');
                        //$('#' + colId).html('<input readonly="readonly" class="row' + row + ' col' + col + '" type="text" id=' + id_str[1] + 'c' + col + ' style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" onkeydown=keyPressed("' + row + 'c' + col + '",event) onkeyup=checkValidation("' + row + 'c' + col + '",event) />');
                        conflictsused = true;
                        isConflict = true;
                        playInitialSound("conflict");
                        flag_3_3 = 1;
                    }
                }
                // }
            }
        }

        if (checkcompletion) {
            var solution_flag = 0;

            var line1_row = 0;
            var line1_col = 0;
            if (row == 1) {

                line1_row = 0;
            } else {

                line1_row = row - 1;
            }
            for (var i = 1; i < 10; i++) {
                if ($('#' + row + c + i).attr('value') != line1[line1_row][i - 1]) {
                    solution_flag = 1;
                    break;
                }
            }
            if (solution_flag == 0) {
                for (var i = 1; i < 10; i++) {
                    if (window.gameCommon.isiOS) {
                        $('#' + row + 'c' + i).addClass('shaded');
                    } else {
                        //$('#r' + row + 'c' + i).css("background-color", "transparent");
                        $('#' + row + 'c' + i).attr("disabled", "disabled").addClass('shaded');
                    }
                }

                /*$('.currentfocus').removeClass('currentfocus');
                                $('.currentfocustd').removeClass('currentfocustd');
                                rowCompletedArray[rowCompletedCounter] = row;
                                //rowCompletedCounter++;*/
                if (window.gameCommon.isiOS) {
                    if (soundEffects == true) {
                        playSound('completeios');
                    }
                } else {
                    playInitialSound("completerc"); /*rows */
                }
            }


            /***************For checking column with the solution*****************/
            var solution_flag_col = 0;

            if (col == 1) {

                line1_col = 0;
            } else {

                line1_col = col - 1;
            }
            for (var i = 1; i < 10; i++) {
                if ($('#' + i + c + col).attr('value') != line1[i - 1][line1_col]) {
                    solution_flag_col = 1;
                    break;
                }
            }
            if (solution_flag_col == 0) {
                for (var i = 1; i < 10; i++) {
                    if (window.gameCommon.isiOS) {
                        $('#' + i + 'c' + col).addClass('shaded');
                    } else {
                        //$('#r' + i + 'c' + col).css("background-color", "transparent");
                        $('#' + i + 'c' + col).attr("disabled", "disabled").addClass('shaded');
                    }
                }

                //$('.currentfocus').removeClass('currentfocus');
                //$('.currentfocustd').removeClass('currentfocustd');
                //colCompletedArray[colCompletedCounter] = col;
                //colCompletedCounter++;
                if (window.gameCommon.isiOS) {
                    if (soundEffects == true) {
                        playSound('completeios');
                    }
                } else {
                    playInitialSound("completerc"); /*rows */
                }
                /* column */
            }
            /**************************************************/

            /*********************For checking 3 * 3 section of the selected index *****************/
            var k = col;
            k++;
            var l = k;
            l++;
            var m = row;
            m++
            var n = m;
            n++;
            var check_3_3 = new Array(4);
            flag_3_3 = 0;
            /* IOS start */

            if (window.gameCommon.isiOS) {
                if ((row % 3) == 0) {
                    if ((col % 3) == 0) {
                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col - 2)).attr('value') != line1[row - 2][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col - 1)).attr('value') != line1[row - 3][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col - 2)).attr('value') != line1[row - 3][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 2)).attr('value') != line1[row - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col)).attr('value') != line1[row - 3][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (row - 1) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (col - 2)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (col - 2)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col - 2)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (col - 1)).addClass('shaded')
                            $('#' + (row - 1) + c + (col - 2)).addClass('shaded')
                            $('#' + (row - 2) + c + (col - 1)).addClass('shaded')
                            $('#' + (row - 2) + c + (col - 2)).addClass('shaded')
                            $('#' + (row) + c + (col - 1)).addClass('shaded')
                            $('#' + (row) + c + (col - 2)).addClass('shaded')
                            $('#' + (row - 1) + c + (col)).addClass('shaded')
                            $('#' + (row - 2) + c + (col)).addClass('shaded')
                            $('#' + (row) + c + (col)).addClass('shaded')

                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row - 1;
                            completed_3_3Col[completed3_3Counter] = col - 1;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 2) {
                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col - 1)).attr('value') != line1[row - 3][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (k)).attr('value') != line1[row - 3][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col)).attr('value') != line1[row - 3][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (row - 1) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (k)).css("background-color", "transparent");


                            $('#' + (row - 1) + c + (col - 1)).addClass('shaded')
                            $('#' + (row - 1) + c + (k)).addClass('shaded')
                            $('#' + (row - 2) + c + (col - 1)).addClass('shaded')
                            $('#' + (row - 2) + c + (k)).addClass('shaded')
                            $('#' + (row - 2) + c + (col)).addClass('shaded')
                            $('#' + (row - 1) + c + (col)).addClass('shaded')
                            $('#' + (row) + c + (col)).addClass('shaded')
                            $('#' + (row) + c + (col - 1)).addClass('shaded')
                            $('#' + (row) + c + (k)).addClass('shaded')
                            $('#' + (row - 1) + c + (col - 1)).focus();

                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row - 1;
                            completed_3_3Col[completed3_3Counter] = col;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 1) {
                        if ($("#" + (row - 1) + c + (l)).attr('value') != line1[row - 2][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (k)).attr('value') != line1[row - 3][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (l)).attr('value') != line1[row - 3][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col)).attr('value') != line1[row - 3][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (l)).attr('value') != line1[row - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (row - 1) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row - 2) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (l)).addClass('shaded');
                            $('#' + (row - 1) + c + (k)).addClass('shaded');
                            $('#' + (row - 2) + c + (k)).addClass('shaded');
                            $('#' + (row - 2) + c + (l)).addClass('shaded');
                            $('#' + (row - 1) + c + (col)).addClass('shaded');
                            $('#' + (row - 2) + c + (col)).addClass('shaded');
                            $('#' + (row) + c + (k)).addClass('shaded');
                            $('#' + (row) + c + (l)).addClass('shaded');
                            $('#' + (row) + c + (col)).addClass('shaded');


                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row - 1;
                            completed_3_3Col[completed3_3Counter] = col++;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    }
                } else if ((row % 3) == 2) {
                    if ((col % 3) == 0) {
                        if ($("#" + (row - 1) + c + (col - 2)).attr('value') != line1[row - 2][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 2)).attr('value') != line1[m - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 2)).attr('value') != line1[row - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (row - 1) + c + (col - 1)).css("background-color", "transparent");
                            // $('#r' + (row - 1) + c + (col - 2)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (col - 2)).css("background-color", "transparent");
                            // $('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            // $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col - 2)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (col - 1)).addClass('shaded');
                            $('#' + (row - 1) + c + (col - 2)).addClass('shaded');
                            $('#' + (m) + c + (col - 1)).addClass('shaded');
                            $('#' + (m) + c + (col - 2)).addClass('shaded');
                            $('#' + (row - 1) + c + (col)).addClass('shaded');
                            $('#' + (m) + c + (col)).addClass('shaded');
                            $('#' + (row) + c + (col - 1)).addClass('shaded');
                            $('#' + (row) + c + (col - 2)).addClass('shaded');
                            $('#' + (row) + c + (col)).addClass('shaded');


                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row;
                            completed_3_3Col[completed3_3Counter] = col - 1;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 2) {

                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (row - 1) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (k)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (col - 1)).addClass('shaded');
                            $('#' + (row - 1) + c + (k)).addClass('shaded');
                            $('#' + (m) + c + (col - 1)).addClass('shaded');
                            $('#' + (m) + c + (k)).addClass('shaded');
                            $('#' + (row - 1) + c + (col)).addClass('shaded');
                            $('#' + (m) + c + (col)).addClass('shaded');
                            $('#' + (row) + c + (col - 1)).addClass('shaded');
                            $('#' + (row) + c + (k)).addClass('shaded');
                            $('#' + (row) + c + (col)).addClass('shaded');


                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row;
                            completed_3_3Col[completed3_3Counter] = col;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 1) {
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (l)).attr('value') != line1[row - 2][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (l)).attr('value') != line1[m - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (l)).attr('value') != line1[row - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (col)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (k)).addClass('shaded');
                            $('#' + (row - 1) + c + (l)).addClass('shaded');
                            $('#' + (m) + c + (k)).addClass('shaded');
                            $('#' + (m) + c + (l)).addClass('shaded');
                            $('#' + (row - 1) + c + (col)).addClass('shaded');
                            $('#' + (m) + c + (col)).addClass('shaded');
                            $('#' + (row) + c + (k)).addClass('shaded');
                            $('#' + (row) + c + (l)).addClass('shaded');
                            $('#' + (row) + c + (col)).addClass('shaded');


                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row;
                            completed_3_3Col[completed3_3Counter] = col++;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    }
                } else if ((row % 3) == 1) {
                    if ((col % 3) == 0) {
                        if ($("#" + (m) + c + (col - 2)).attr('value') != line1[m - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col - 1)).attr('value') != line1[n - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col - 2)).attr('value') != line1[n - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col)).attr('value') != line1[n - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 2)).attr('value') != line1[row - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            // $('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            // $('#r' + (m) + c + (col - 2)).css("background-color", "transparent");
                            // $('#r' + (n) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (n) + c + (col - 2)).css("background-color", "transparent");
                            // $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            // $('#r' + (n) + c + (col)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (col - 2)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (m) + c + (col - 1)).addClass('shaded');
                            $('#' + (m) + c + (col - 2)).addClass('shaded');
                            $('#' + (n) + c + (col - 1)).addClass('shaded');
                            $('#' + (n) + c + (col - 2)).addClass('shaded');
                            $('#' + (m) + c + (col)).addClass('shaded');
                            $('#' + (n) + c + (col)).addClass('shaded');
                            $('#' + (row) + c + (col - 1)).addClass('shaded');
                            $('#' + (row) + c + (col - 2)).addClass('shaded');
                            $('#' + (row) + c + (col)).addClass('shaded');


                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row++;
                            completed_3_3Col[completed3_3Counter] = col - 1;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 2) {
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col - 1)).attr('value') != line1[n - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (k)).attr('value') != line1[n - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col)).attr('value') != line1[n - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (k)).css("background-color", "transparent");
                            // $('#r' + (n) + c + (col - 1)).css("background-color", "transparent");
                            // $('#r' + (n) + c + (k)).css("background-color", "transparent");
                            // $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (n) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (m) + c + (col - 1)).addClass('shaded');
                            $('#' + (m) + c + (k)).addClass('shaded');
                            $('#' + (n) + c + (col - 1)).addClass('shaded');
                            $('#' + (n) + c + (k)).addClass('shaded');
                            $('#' + (row) + c + (col - 1)).addClass('shaded');
                            $('#' + (row) + c + (k)).addClass('shaded');
                            $('#' + (m) + c + (col)).addClass('shaded');
                            $('#' + (n) + c + (col)).addClass('shaded');
                            $('#' + (row) + c + (col)).addClass('shaded');


                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row++;
                            completed_3_3Col[completed3_3Counter] = col;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 1) {
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (l)).attr('value') != line1[m - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (k)).attr('value') != line1[n - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (l)).attr('value') != line1[n - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (l)).attr('value') != line1[row - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col)).attr('value') != line1[n - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            //$('#r' + (m) + c + (k)).css("background-color", "transparent");
                            // $('#r' + (m) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (n) + c + (k)).css("background-color", "transparent");
                            // $('#r' + (n) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (k)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (l)).css("background-color", "transparent");
                            //$('#r' + (m) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (n) + c + (col)).css("background-color", "transparent");
                            //$('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (m) + c + (k)).addClass('shaded');
                            $('#' + (m) + c + (l)).addClass('shaded');
                            $('#' + (n) + c + (k)).addClass('shaded');
                            $('#' + (n) + c + (l)).addClass('shaded');
                            $('#' + (row) + c + (k)).addClass('shaded');
                            $('#' + (row) + c + (l)).addClass('shaded');
                            $('#' + (m) + c + (col)).addClass('shaded');
                            $('#' + (n) + c + (col)).addClass('shaded');
                            $('#' + (row) + c + (col)).addClass('shaded');


                            //$('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            flag_3_3 = 1;
                            completed_3_3Row[completed3_3Counter] = row++;
                            completed_3_3Col[completed3_3Counter] = col++;
                            completed3_3Counter++;
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    }

                }
                updateCompletion(); /* end IOS */
            } else {
                if ((row % 3) == 0) {
                    if ((col % 3) == 0) {
                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col - 2)).attr('value') != line1[row - 2][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col - 1)).attr('value') != line1[row - 3][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col - 2)).attr('value') != line1[row - 3][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 2)).attr('value') != line1[row - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col)).attr('value') != line1[row - 3][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {


                            $('#' + (row - 1) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 1) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 2) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 2) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 1) + c + (col)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 2) + c + (col)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded')
                            // $('.currentfocus').removeClass('currentfocus');
                            //$('.currentfocustd').removeClass('currentfocustd');

                            //flag_3_3 = 1;
                            //completed_3_3Row[completed3_3Counter] = row - 1;
                            //completed_3_3Col[completed3_3Counter] = col;
                            //playInitialSound("completerc");
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }

                        }
                    } else if ((col % 3) == 2) {
                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col - 1)).attr('value') != line1[row - 3][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (k)).attr('value') != line1[row - 3][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col)).attr('value') != line1[row - 3][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (row - 1) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row - 2) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row - 2) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row - 2) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row) + c + (k)).css("background-color", "transparent");


                            $('#' + (row - 1) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 1) + c + (k)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 2) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 2) + c + (k)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 2) + c + (col)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 1) + c + (col)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row) + c + (k)).attr("disabled", "disabled").addClass('shaded')
                            $('#' + (row - 1) + c + (col - 1)).focus();
                            /*
                                                    $('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row - 1;
                                                    completed_3_3Col[completed3_3Counter] = col;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }

                        }
                    } else if ((col % 3) == 1) {
                        if ($("#" + (row - 1) + c + (l)).attr('value') != line1[row - 2][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (k)).attr('value') != line1[row - 3][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (l)).attr('value') != line1[row - 3][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 2) + c + (col)).attr('value') != line1[row - 3][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (l)).attr('value') != line1[row - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (row - 1) + c + (l)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row - 2) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row - 2) + c + (l)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row - 2) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row) + c + (l)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 2) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 2) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 2) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded');

                            //
                            /*$('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row - 1;
                                                    completed_3_3Col[completed3_3Counter] = col++;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    }
                } else if ((row % 3) == 2) {
                    if ((col % 3) == 0) {
                        if ($("#" + (row - 1) + c + (col - 2)).attr('value') != line1[row - 2][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 2)).attr('value') != line1[m - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 2)).attr('value') != line1[row - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (row - 1) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (col - 2)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col - 2)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col - 2)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded');

                            //
                            /*$('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row;
                                                    completed_3_3Col[completed3_3Counter] = col - 1;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 2) {

                        if ($("#" + (row - 1) + c + (col - 1)).attr('value') != line1[row - 2][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (row - 1) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (m) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded');

                            //
                            /*$('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row;
                                                    completed_3_3Col[completed3_3Counter] = col;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 1) {
                        if ($("#" + (row - 1) + c + (k)).attr('value') != line1[row - 2][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (l)).attr('value') != line1[row - 2][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (l)).attr('value') != line1[m - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row - 1) + c + (col)).attr('value') != line1[row - 2][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (l)).attr('value') != line1[row - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (row - 1) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (l)).css("background-color", "transparent");
                            $('#r' + (m) + c + (k)).css("background-color", "transparent");
                            $('#r' + (m) + c + (l)).css("background-color", "transparent");
                            $('#r' + (row - 1) + c + (col)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row) + c + (l)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (row - 1) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row - 1) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded');

                            //
                            /*$('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row;
                                                    completed_3_3Col[completed3_3Counter] = col++;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    }
                } else if ((row % 3) == 1) {
                    if ((col % 3) == 0) {
                        if ($("#" + (m) + c + (col - 2)).attr('value') != line1[m - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col - 1)).attr('value') != line1[n - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col - 2)).attr('value') != line1[n - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col)).attr('value') != line1[n - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 2)).attr('value') != line1[row - 1][col - 3]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col - 2)).css("background-color", "transparent");
                            $('#r' + (n) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (n) + c + (col - 2)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            $('#r' + (n) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col - 2)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (m) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col - 2)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded');

                            //
                            /*$('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row++;
                                                    completed_3_3Col[completed3_3Counter] = col - 1;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 2) {
                        if ($("#" + (m) + c + (col - 1)).attr('value') != line1[m - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col - 1)).attr('value') != line1[n - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (k)).attr('value') != line1[n - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col - 1)).attr('value') != line1[row - 1][col - 2]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col)).attr('value') != line1[n - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (m) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (m) + c + (k)).css("background-color", "transparent");
                            $('#r' + (n) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (n) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col - 1)).css("background-color", "transparent");
                            $('#r' + (row) + c + (k)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            $('#r' + (n) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (m) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col - 1)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded');

                            //
                            /*$('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row++;
                                                    completed_3_3Col[completed3_3Counter] = col;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    } else if ((col % 3) == 1) {
                        if ($("#" + (m) + c + (k)).attr('value') != line1[m - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (l)).attr('value') != line1[m - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (k)).attr('value') != line1[n - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (l)).attr('value') != line1[n - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (k)).attr('value') != line1[row - 1][k - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (l)).attr('value') != line1[row - 1][l - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (m) + c + (col)).attr('value') != line1[m - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (n) + c + (col)).attr('value') != line1[n - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if ($("#" + (row) + c + (col)).attr('value') != line1[row - 1][col - 1]) {
                            flag_3_3 = 1;
                        }
                        if (flag_3_3 == 0) {
                            $('#r' + (m) + c + (k)).css("background-color", "transparent");
                            $('#r' + (m) + c + (l)).css("background-color", "transparent");
                            $('#r' + (n) + c + (k)).css("background-color", "transparent");
                            $( '#r' + (n) + c + (l)).css("background-color", "transparent");
                            $('#r' + (row) + c + (k)).css("background-color", "transparent");
                            $('#r' + (row) + c + (l)).css("background-color", "transparent");
                            $('#r' + (m) + c + (col)).css("background-color", "transparent");
                            $('#r' + (n) + c + (col)).css("background-color", "transparent");
                            $('#r' + (row) + c + (col)).css("background-color", "transparent");

                            $('#' + (m) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (k)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (l)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (m) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (n) + c + (col)).attr("disabled", "disabled").addClass('shaded');
                            $('#' + (row) + c + (col)).attr("disabled", "disabled").addClass('shaded');

                            //
                            /*$('.currentfocus').removeClass('currentfocus');
                                                    $('.currentfocustd').removeClass('currentfocustd');

                                                    flag_3_3 = 1;
                                                    completed_3_3Row[completed3_3Counter] = row++;
                                                    completed_3_3Col[completed3_3Counter] = col++;
                                                    completed3_3Counter++;*/
                            if (window.gameCommon.isiOS) {
                                if (soundEffects == true) {
                                    playSound('completeios');
                                }
                            } else {
                                playInitialSound("completerc"); /*rows */
                            }
                        }
                    }
                }


            }
            //checkCompletedShading(colId);
            /***************************************************************************************/
            //}

            // check whether the game is completed or not

            //var complete_game_flag = 1, index = 0;
            //$.each($('#canvas>tbody>tr>td>input'), function (index, inputia) {
            //    if (allanswer[index] != $(inputia).attr('value')) {
            //        complete_game_flag = 0;
            //        return false;
            //    }
            //    index++;
            //});
            //if (complete_game_flag == 1) {
            //    pauseTimer();
            //    runTimer = false;
            //    var total = $('input:text:not(".disabled")').length;
            //    $('#letters_total').html(total);
            //    $('#letters_solved_you').html(total - compsolved);
            //    $('#letters_solved_computer').html(compsolved);
            //    $('#conflicts_used').html(conflictsused ? "Yes" : "No");
            //    $('#possibilities_used').html(hintsused ? "Yes" : "No");
            //    $('#completion_time').html($('#time').html());
            //    $('.overlay, #congrats').show(100, function () { $('#black_overlay').animate({ opacity: 0.6 }, 300, function () { $('#congrats').animate({ opacity: 1.0 }, 300); }); });
            //}

            //for (var i = 1; i < 10; i++) {
            //    for (var j = 1; j < 10; j++) {
            //        if ($('#r' + i + 'c' + j).css("background-color") == "rgba(0, 0, 0, 0)") {
            //            complete_game_flag = 1;
            //            break;
            //        }
            //    }
            //}

            //if (complete_game_flag == 0) {
            //    if (watch_flag == 1) {
            //        $('.start').eq(0).click();
            //        watch_flag = 0;
            //    }
            //    alert("congratulations you have completed the game successfully");
            //    $('#clock_toggle').trigger('tap');
            //}
        }
        //updateCompletion();
    }
    return isConflict;
}

/********** function to change the specific cell vvalue   ***********/

var change_value = function(val, colId) {
    check_row_col(cell_clicked);
    var id_splitted = colId.split("");
    var evalue = $("#" + colId.substring(1)).attr('value');
    $("#" + colId.substring(1)).attr('value', "" + (evalue == val ? '' : val) + ""); //.html('<input readonly="readonly"  class="row' + id_splitted[1] + ' col'  + id_splitted[3] + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" value=' + val + ' id=' + id_splitted[1] + id_splitted[2] + id_splitted[3] + '  maxlength="1" id=' + id_splitted[1] + id_splitted[2] + id_splitted[3] + ' onkeydown=keyPressed("' + id_splitted[1] + id_splitted[2] + id_splitted[3] + '",event) onkeyup=checkValidation("' + id_splitted[1] + id_splitted[2] + id_splitted[3] + '",event) />');
    check_validation(val, colId, true);
}

/********** function to get the selected cell id whose value is user gonna change   ***********/

var show_numbers = function(colId) {
    // return;
    if ($('#' + colId).html().indexOf("disabled") >= 0) {
        return;
    }

    if (previous_col_tabled == "") {
        previous_col_tabled = colId;
    }
 else if (previousClickedColumnColor == 1 ) {
        $('#' + previous_col_tabled).css("background-color", "#9CF");
        previous_col_tabled = colId;
    } else if (previous_col_tabled != colId && ($("#" + previous_col_tabled).css("background-color") != "#9CF")) {
        $('#' + previous_col_tabled).css("background-color", 'transparent');
        previous_col_tabled = colId;
    } else if (previous_col_tabled != colId && ($("#" + previous_col_tabled).css("background-color") == "#9CF")) {
        previous_col_tabled = colId;
    }


    if ($("#" + colId).css("background-color") == "#9CF") {
        previousClickedColumnColor = 1;
    } else {
        previousClickedColumnColor = 0;
    }

    cell_clicked = colId;
    $('#' + colId).css("background-color", "#fff");
    if (watch_flag == 0) {
        $('.start').eq(0).click();
        watch_flag = 1;
    }
    if (window.gameCommon.isiOS) {
        if (soundEffects == true)
            playSound('clickit');
    } else {
        playInitialSound("select");
    }
}

/********** function to change the specific cell value   ***********/

var put_number_in_cell = function(numb) {
    if (!timer.isActive) {
        $('#clock_toggle').trigger('tap');

    };

    if ($('#' + cell_clicked.substring(1)).hasClass('shaded') == false) {

        if (hint_on_off_flag == 1) {

            if (cell_clicked == "") {

                //alert("Please first click on any cell.");
                return;
            }

            change_value(numb, cell_clicked);
            update_hints();
            updateCompletion();
        }
 else {

            change_value(numb, cell_clicked);
            updateCompletion();
        }
        if ($('#' + cell_clicked.substring(1)).attr('value').trim() != "")
            $('table', $("#" + cell_clicked.substring(1)).parent()).remove();
            update_hints();
            //if (cell_clicked) {
            //    var ipt = $('#' + cell_clicked.substr(1, 3));
            //    if (ipt.length > 0)
            //        ipt[0].focus();
            //} //else {
            //change_value(numb, cell_clicked);
            //update_hints();
            //updateCompletion();
            //}
    }
    if (window.gameCommon.isiOS) {
        if (soundEffects == true) 
            playSound('clickit');
    } else {
        playInitialSound("select");
    }
}
/********** function called initially to create table + add system entries in the cells + calculte initial system level hints   ***********/
var fillHeader = function(json) {
    $('#puzzle_name').html(decodeURIComponent(gameFromServer.Title));
    $('#puzzle_detail').html('by ' + gameFromServer.Author + ', edited by ' + json.Editor);
    $('#puzzle_date').html(formatDate(gameFromServer.Date));
    //$('#desc').html(json.Author + " - " + formatDate(json.Date) + "  Edited By" + json.Editor);
}
var formatDate = function(date) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var dt = parseFloat(date.substring(6, 8));
    var mnth = month[parseFloat(date.substring(4, 6)) - 1];
    var year = date.substring(2, 4);
    return mnth + " " + dt + ", 20" + year;
}
/*function getPacificTime() {
    now = new Date();
    now = now.getTime() + (now.getTimezoneOffset() * 60000);
    now = new Date(now + (3600000 * (-7)));
}*/
var res;
var loader;

var showHeader = function() {
    var result = gameFromServer;
    var difficulty = result.Difficulty;
    //change difficulty satrs according to difficulty in json
    $('#star1').attr('src', difficulty >= 1 ? '/game/sudoku/images/star_filled.png' : '/game/sudoku/images/star_empty.png');
    $('#star2').attr('src', difficulty >= 2 ? '/game/sudoku/images/star_filled.png' : '/game/sudoku/images/star_empty.png');
    $('#star3').attr('src', difficulty >= 3 ? '/game/sudoku/images/star_filled.png' : '/game/sudoku/images/star_empty.png');
    $('#star4').attr('src', difficulty >= 4 ? '/game/sudoku/images/star_filled.png' : '/game/sudoku/images/star_empty.png');
    $('#star5').attr('src', difficulty >= 5 ? '/game/sudoku/images/star_filled.png' : '/game/sudoku/images/star_empty.png');
    //if (difficulty == "2") {
    //    $("#star2").attr("src", "./images/star_filled.png");
    //}
    //else if (difficulty == "3") {
    //    $("#star2").attr("src", "./images/star_filled.png");
    //    $("#star3").attr("src", "./images/star_filled.png");
    //}
    //else if (difficulty == "4") {
    //    $("#star2").attr("src", "./images/star_filled.png");
    //    $("#star3").attr("src", "./images/star_filled.png");
    //    $("#star4").attr("src", "./images/star_filled.png");
    //}
    //else if (difficulty == "5") {
    //    $("#star2").attr("src", "./images/star_filled.png");
    //    $("#star3").attr("src", "./images/star_filled.png");
    //    $("#star4").attr("src", "./images/star_filled.png");
    //    $("#star5").attr("src", "./images/star_filled.png");
    //}

    $('#puzzle_date').html(formatDate(gameFromServer.Date));
}

var showGame = function() {
    hintsused = false;
    conflictsused = false;
    compsolved = 0;

    var result = gameFromServer;
    var layout = result.Layout;
    var solution = result.Solution;
    for (var i = 1; i < 10; i++) {
        hints[i] = new Array(10);
        userHints[i] = new Array(10);
    }

    for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
            userHints[i][j] = new Array();
        }
    }
    var ajson = window.gameStorage.getLocal(window.gameCommon.gameCode + result.Date, true);
    if (ajson) {
        counter = ajson.timestamp - 1;
        countSecond();
        us = ajson.notes;
        completion = ajson.completion || 0;
        if (completion == 100) {
            beenCompleted = true;
        }
        if (completion != 100 || completion == null || completion == undefined) {
            beenCompleted = false;
        }
    } else {
        counter = -1;
        countSecond();
    }
    if (ajson == null) {
        beenCompleted = false;
    } else {
        counter = -1;
        countSecond();
    }
    //create initial table
    // removed read only from input to allow for iOS keyboard
    var toappend = '<table  id="canvas" cellspacing="0" style=" border-left: 2px solid #666666; border-top: 2px solid #666666; background-color: white; border-left-width: 2px; ">';
    for (var i = 1; i < 10; i++) {
        if ((i % 3) == 0) {
            toappend += '<tr style="border-bottom: 2px solid #666 !important">'
        } else {
            toappend += '<tr>'
        }
        for (var j = 1; j < 10; j++) {
            var iindex = 9 * (i - 1) + (j - 1);
            if ((j % 3) == 0 && (i % 3) == 0) {
                toappend += '<td id=r' + i + 'c' + j + ' style="border-right: 2px solid #666 !important; border-bottom: 2px solid #666 !important">' +
                '<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id="' + i + 'c' + j + '" onkeydown=keyPressed(\'' + i + 'c' + j + '\',event) onkeyup=checkValidation(\'' + i + 'c' + j + '\',event) ' + (ajson && ajson.answered[iindex] != '-' ? 'value="' + ajson.answered[iindex] + '"' : '') + '/>' +
                '</td>'
            } else if ((i % 3) == 0) {
                toappend += '<td id=r' + i + 'c' + j + ' style="border-bottom: 2px solid #666 !important;">' +
                '<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id="' + i + 'c' + j + '" onkeydown=keyPressed(\'' + i + 'c' + j + '\',event) onkeyup=checkValidation(\'' + i + 'c' + j + '\',event) ' + (ajson && ajson.answered[iindex] != '-' ? 'value="' + ajson.answered[iindex] + '"' : '') + '/>' +
                '</td>'
            } else if ((j % 3) == 0) {
                toappend += '<td id=r' + i + 'c' + j + ' style="border-right: 2px solid #666 !important;">' +
                '<input readonly="readonly"  class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id="' + i + 'c' + j + '" onkeydown=keyPressed(\'' + i + 'c' + j + '\',event) onkeyup=checkValidation(\'' + i + 'c' + j + '\',event) ' + (ajson && ajson.answered[iindex] != '-' ? 'value="' + ajson.answered[iindex] + '"' : '') + '/>' +
                '</td>'
            } else {
                toappend += '<td id=r' + i + 'c' + j + ' >' +
                '<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id="' + i + 'c' + j + '" onkeydown=keyPressed(\'' + i + 'c' + j + '\',event) onkeyup=checkValidation(\'' + i + 'c' + j + '\',event) ' + (ajson && ajson.answered[iindex] != '-' ? 'value="' + ajson.answered[iindex] + '"' : '') + '/>' +
                '</td>'
            }
        }
        toappend += '</tr>';
    }
    toappend += '</table>'
    //console.log(toappend);
    $('#space').html(toappend);

    //put system level initial values in the table from the json

    var lineSplitted;
    var pre_flag = 0;
    for (var i = 1; i < 10; i++) {
        lineSplitted = layout['line' + i].split("");
        line1[i - 1] = new Array(9);
        solutionLineSplitted = solution['line' + i].split("");
        for (var j = 1; j < 10; j++) {
            if (/^\d+$/.test(lineSplitted[j - 1])) {
                $('#r' + i + 'c' + j).html('<input class="disabled row' + i + ' col' + j + '" type="text" style="color: #666; font-size: 40px; font-family: arial; font-weight: bold;" " tabindex="-1" value="' + lineSplitted[j - 1] + '" maxlength="1" id="' + i + 'c' + j + '" />');
            }
            //putting solution in array from ajax result
            if (/^\d+$/.test(solutionLineSplitted[j - 1])) {
                line1[i - 1][j - 1] = solutionLineSplitted[j - 1];
            }
        }
    }
    //console.log(toappend);
    $('#keypad').css('display', 'inline-block');

    //saving the answer in a variable for future
    allanswer = '';
    $.each(gameFromServer.Solution, function (key, value) {
        allanswer += value;
    });
    if (ajson && ajson.notes) {
        userHints = ajson.notes;
        for (var i = 1; i < 10; i++) {
            //$("#hint_" + i).attr('onclick', '');      //disable user hints keyboard
            for (var j = 1; j < 10; j++) {
                //calculate_hints("r" + i + "c" + j);
                if ($("#r" + i + "c" + j + " input").attr('value').trim().length == 0) {
                    show_user_hint(i, j); //generate hints in the cell who donot contain system genarated value nor contain any user added value
                }
            }
        }
        //console.log(toappend);
    }
}

/************************************ function called to play sound on error or correct entry ********************/

var playInitialSound = function(soundtype) {
    if (soundEffects == true) {
        //if(!window.gameCommon.isiOS){
        if (window.HTMLAudioElement) {
            var snd = new Audio('');
            snd = new Audio('/game/sudoku/sudoku_sounds/' + soundtype + window.gameCommon.audioExt);
            snd.play();
        }
        // } else {
        //   Soundfx[name].play();
        //doing nothing now
        //alert('HTML5 Audio is not supported by your browser!');
        //}
    }
}
var stopSound = function(soundtype) {
    if (soundEffects == true) {
        // if(!window.gameCommon.isiOS){
        if (window.HTMLAudioElement) {
            var snd = new Audio('');
            snd = new Audio('/game/sudoku/sudoku_sounds/' + soundtype + window.gameCommon.audioExt);
            snd.stop();

        }
        // } else {
        //  Soundfx[name].stop();
        //doing nothing now
        //alert('HTML5 Audio is not supported by your browser!');
        // }
    }
}

var toggleMusic = function(ison) {
    if (ison) {
        musicState = false;
        puzzle_music.pause();
    } else {
        musicState = true;
        puzzle_music.play();
    }
}

var checkValidation = function(Id, event) {

    var charCode = event.which || event.keyCode || event.charCode;
    if (charCode == 8 || charCode == 46) {
        $('#' + cell_clicked.substring(1)).attr('value', '');
        update_hints();
        return;
    }
    if (charCode <= 48 || (charCode > 57 && charCode <= 96) || charCode > 105)
    {
        return;
    }
    var number = charCode <= 57 ? charCode - 48 : charCode - 96;
    if ($('#keypad .tabactive').attr('id') == 'tabnotes') {
        user_hint(number);
    } else {

        put_number_in_cell(number);
        //check_row_col(cell_clicked);
        //check_validation($("#" + Id).attr('value'), "r" + Id);
        //update_hints();
    }
    //$('#' + cell_clicked.substring(1)).trigger('focus');

}

/************************************ function called to show on off choice for show hints menu etc ********************/

var showOnOffChoice = function(type) {

    if (type == "conflicts") {
        $("#catchCon1").css("display", "block");
        $("#catchCon2").css("display", "block");
    } else if (type == "possibilities") {
        $("#possibility1").css("display", "block");
        $("#possibility0").css("display", "block");
    }
}

/************************************ function called to solve the entire puzzle ********************/

var solvePuzzle = function() {
    //$("#bulb").eq(0).click();
    //for(var i = 1; i < 10; i++){
    //  for(var j = 1; j < 10; j++){
    //      if($('#r' + i + "c" + j ).html().indexOf("disabled") < 0){
    //          $('#r' + i + "c" + j).html('<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" value="' + line1[i - 1][j - 1] + '" readonly="readonly" />');
    //      }
    //  }
    //}
    comsolved = 0;
    $('.hinttable').remove();
    $.each($('#canvas>tbody>tr>td>input'), function (index, inputia) {
        var evalue = $(inputia).addClass('shaded').attr('value');
        if (evalue != allanswer[index]) {
            $(inputia).attr('value', allanswer[index]);
            compsolved++;
        }
        index++;
    });
    updateCompletion();
}
$(document).delegate("#play_again", "tap", function () {
    //jQuery.each($('#canvas tr td div'), function (i) { $(this).html(' '); });
    //$('#canvas').animate({
    //    opacity: 1.0
    //}, 1000, function () { $('#canvas tr td div').removeClass('solved, cmp', 1000); });

    $('.overlay, #congrats').hide(0);
    //for (var i = 1; i < 10; i++) {
    //    for (var j = 1; j < 10; j++) {
    //        if ($('#r' + i + "c" + j).html().indexOf("disabled") < 0) {
    //            $('#r' + i + "c" + j).html('<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id=' + i + 'c' + j + ' onkeydown=keyPressed("' + i + 'c' + j + '",event)  onkeyup=checkValidation("' + i + 'c' + j + '",event) />');
    //        }
    //    }
    //}
    //counter = -1;
    //countSecond();
});
/************************************ function called to clear puzzle ********************/
var confirmClearing = function()
{
    pauseTimer();
    $('.shaded').removeAttr('disabled');
    runTimer = true;
    counter = -1;
    compsolved = 0;
    countSecond();
    for (var i = 1; i < 10; i++) {
        for (var j = 1; j < 10; j++) {
            if ($('#r' + i + "c" + j).html().indexOf("disabled") < 0) {
                $('#r' + i + "c" + j).html('<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id="' + i + 'c' + j + '" onkeydown=keyPressed(\'' + i + 'c' + j + '\',event)  onkeyup=checkValidation(\'' + i + 'c' + j + '\',event) />');
            }
        }
    }
    $('.highlighted').removeClass('highlighted');
    $('.shaded').removeClass('shaded');

    hint_on_off_flag = (hint_on_off_flag == 0 ? 1 : 0);
    show_hints();
    beenCompleted = false;
    updateCompletion();
    ////pauseTimer();
}
var clearPuzzle = function () {
    if (navigator.appName == "Microsoft Internet Explorer") {
        confirmClearing();
    } else {
        showAlert('Are you sure you want to reset the board?', 'Yes', 'No', 'confirmClearing');
    }
}
//if (confirm("Are you sure you want to reset the board?")) {
//    counter = -1;
//    countSecond();
//    for (var i = 1; i < 10; i++) {
//        for (var j = 1; j < 10; j++) {
//            if ($('#r' + i + "c" + j).html().indexOf("disabled") < 0) {
//                $('#r' + i + "c" + j).html('<input readonly="readonly" class="row' + i + ' col' + j + '" type="text" style="color: #1EAFFF; font-size: 40px; font-family: arial; font-weight: bold;" maxlength="1" id=' + i + 'c' + j + ' onkeydown=keyPressed("' + i + 'c' + j + '",event)  onkeyup=checkValidation("' + i + 'c' + j + '",event) />');
//            }
//        }
//    }
//    $('.highlighted').removeClass('highlighted');
//    $('.shaded').removeClass('shaded');
//    ////pauseTimer();
//}

var conflictOption = function() {

    if (conflictsOption == 0) {
        conflictsOption = 1;
        $.each($('input:text:not([value=""]):not(".disabled")'), function (index, ele) {
            check_validation($(ele).attr('value'), "r" + ele.id, false);
        });
        checkCompletedShading();
        updateCompletion();
    } else if (conflictsOption == 1) {
        conflictsOption = 0;
    }
}


$(function() {
    //$('#main_clock').stopwatch();
});


$(document).delegate('input:not(".disabled"):not(".shaded")', 'focus', cellOnFocus);
$(document).delegate('td input:not(".disabled"):not(".shaded")', 'keypress', onlyNumbers);
//$(document).delegate('#canvas td>input', 'keydown', function (evt) {
//    $(this).select();
//});
var toggleKeypad = function() {
    if (this.id == 'tabnotes')
    {
        $('#entries table, #tabentries').removeClass('tabactive');
        $('#notes table, #tabnotes').addClass('tabactive');
    } else
    {
        $('#notes table, #tabnotes').removeClass('tabactive');
        $('#entries table, #tabentries').addClass('tabactive');
    }

}
var configureEvents = function() {
    $(document).delegate('input', 'focus', function (event) {
        if (!timer.isActive)
            $('#clock_toggle').trigger('tap');
    });
    $('#keypad .tabbed').click(toggleKeypad);

    $(window).unload(savePuzzle);
}

var performSubMenuAction = function (obj, ison) {
    switch (obj.id) {
    case 'music_toggle':
        toggleMusic(ison);
        break;
    case 'sound_toggle':
        if (!ison) 
            soundEffects = true;
        else 
            soundEffects = false;
            break;
        case 'clock_toggle':
            togglePly(ison);
            break;
        case 'clock_view':
            $('#play,.time').toggle();
            break;
        case 'conflicts':
            conflictOption();
            break; //if (ison) conflictsOption = 1; else conflictsOption = 0; break;
        case 'hints':
            show_hints(ison ? "on" : "off");
            break; //if (ison) hint_on_off_flag = 1; else hint_on_off_flag = 0; break;
        case 'popup_instructions':
            $('.pactive').removeClass('pactive');
            $('#popup_instructions_text').addClass('pactive');
            break;
        case 'popup_credits':
            $('.pactive').removeClass('pactive');
            $('#popup_credits_text').addClass('pactive');
            break;
        case 'popup_completed':
            $('.pactive').removeClass('pactive');
            $('#popup_completed_text').addClass('pactive');
            break;
        case 'games_all':
            $('.other_games>div').show();
            break;
        case 'games_in_progress':
            $('.other_games>div').show();
            $('.other_games>div').filter(function () {
                return (($('span.time_spent', this).text().trim() == '00:00:00') || ($('span.perc', this).text().trim() == '100%'));
            }).hide();
            break;
        case 'games_completed':
            $('.other_games>div').show();
            $('.other_games>div').filter(function () {
                return $('span.perc', this).text().trim() != '100%';
            }).hide();
            break;
        case 'blank_puzzle':
            var w = window.open();
            w.document.write('<div id="kuchbhi"></div>');
            $(w.document.head).append('<link href="/game/sudoku/css/print_sudoku.css" rel="stylesheet" />');
            $(w.document.body).addClass('loading');
            $(w.document.body).append(
            '<div class="hdr"><div id="dte" class="lft">Puzzle Date: ' + $('#puzzle_date').html() + '</div></div>' +
            '<div class="hdr"><div id="pname" class="ryt">Sudoku</div></div>' +
            '<div class="hdr">' + $('#puzzle_name').html() + '</div>'
            );
            var toprint = $('#space').clone();
            //reset inputs
            $('input:not(.disabled)', toprint).attr('value', '');
            $('.hinttable', toprint).remove();

            $(w.document.body).append('<div id="space">' + $(toprint).html() + '</div>');
            //$(w.document.body).append(toprint);
            //instructions
            $(w.document.body).append('<div>Complete the grid so that every row,column and 3x3 box contains every digit from 1 to 9 inclusive.</div>');
            if (!window.gameCommon.isIE) {
                //copyright info
                $(w.document.body).append('<footer>' +
                //'<span style="float:left">Puzzle created by Universal Uclick, L.L.C.</span>' +
                //'<span style="float:right">Copyright &copy; 2013 Universal Uclick, L.L.C.</span>' +
                '<span style="float:left">Copyright &#169; 2013 Universal Uclick, L.L.C.</span>'
                + '<span style="float:right">All rights reserved. Universal Uclick, the Universal Uclick logo and Universal Sudoku are trademarks of Universal Uclick L.L.C.</span><br/>'
                + '<div id="piracy">'
                + 'In United States and other countries, Other marks are the properties of their respective owners. '
                + 'The sudoku puzzle displayed within the game is the copyright intellectual property of the providers of the '
                + 'content and should not be produced or distributed without the express permission of the content provider(s).'
                + 'The computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution '
                + 'of this program may result in severe civil and criminal penalties, and will be prosecuted to the maximum extend possible under the law'
                + '</div></footer>');
            }
            $(w.document.body).removeClass('loading');
            //close document
            w.document.close();
            w.focus();
            w.setTimeout("print()", 500);
            w.setTimeout("close()", 1000);
            break;
        case 'puzzle_entries':
            var w = window.open();
            w.document.write('<div id="kuchbhi"></div>');
            $(w.document.head).append('<link href="/game/sudoku/css/print_sudoku.css" rel="stylesheet" />');
            $(w.document.body).addClass('loading');
            $(w.document.body).append(
            '<div class="hdr"><div id="dte" class="lft">Puzzle Date: ' + $('#puzzle_date').html() + '</div></div>' +
            '<div class="hdr"><div id="pname" class="ryt">Sudoku</div></div>' +
            '<div class="hdr">' + $('#puzzle_name').html() + '</div>'
            );

            //duplicate borad
            var toprint = $('#space').clone();
            $(w.document.body).append('<div id="space">' + $(toprint).html() + '</div>');
            //$(w.document.body).append(toprint);

            //instructions
            $(w.document.body).append('<div>Complete the grid so that every row,column and 3x3 box contains every digit from 1 to 9 inclusive.</div>');
            if (!window.gameCommon.isIE) {
                //copyright info
                $(w.document.body).append('<footer>' +
                //'<span style="float:left">Puzzle created by uclick, L.L.C.</span>' +
                //'<span style="float:right">Copyright &copy; 2013 Universal Uclick, L.L.C.</span>' +
                '<span style="float:left">Copyright &#169; 2013 Universal Uclick, L.L.C.</span>'
                + '<span style="float:right">All rights reserved. Universal Uclick, the Universal Uclick logo and Universal Sudoku are trademarks of Universal Uclick L.L.C.</span><br/>'
                + '<div id="piracy">'
                + 'In United States and other countries, Other marks are the properties of their respective owners. '
                + 'The sudoku puzzle displayed within the game is the copyright intellectual property of the providers of the '
                + 'content and should not be produced or distributed without the express permission of the content provider(s).'
                + 'The computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution '
                + 'of this program may result in severe civil and criminal penalties, and will be prosecuted to the maximum extend possible under the law'
                + '</div></footer>');
            }
            $(w.document.body).removeClass('loading');
            //close document
            w.document.close();
            w.focus();
            w.setTimeout("print()", 500);
            w.setTimeout("close()", 1000);
            break;
        case 'puzzle_solution':
            var w = window.open();
            w.document.write('<div id="kuchbhi"></div>');
            $(w.document.head).append('<link href="/game/sudoku/css/print_sudoku.css" rel="stylesheet" />');
            $(w.document.body).addClass('loading');
            $(w.document.body).append(
            '<div class="hdr"><div id="dte" class="lft">Puzzle Date: ' + $('#puzzle_date').html() + '</div></div>' +
            '<div class="hdr"><div id="pname" class="ryt">Sudoku</div></div>' +
            '<div class="hdr">' + $('#puzzle_name').html() + '</div>'
            );
            var toprint = $('#space').clone();
            //reset inputs
            $('.hinttable', toprint).remove();
            $.each($('#canvas>tbody>tr>td>input', $(toprint)), function (index, inputia) {
                $(inputia, $(toprint)).attr('value', allanswer[index]);
                index++;
            });
            $(w.document.body).append('<div id="space">' + $(toprint).html() + '</div>');
            //$(w.document.body).append($(toprint));

            //instructions
            $(w.document.body).append('<div>Complete the grid so that every row,column and 3x3 box contains every digit from 1 to 9 inclusive.</div>');
            if (!window.gameCommon.isIE) {
                //copyright info
                $(w.document.body).append('<footer>' +
                //'<span style="float:left">Puzzle created by Universal Uclick, L.L.C.</span>' +
                //'<span style="float:right">Copyright &copy; 2013 Universal Uclick, L.L.C.</span>' +
                '<span style="float:left">Copyright &#169; 2013 Universal Uclick, L.L.C.</span>'
                + '<span style="float:right">All rights reserved. Universal Uclick, the Universal Uclick logo and Universal Sudoku are trademarks of Universal Uclick L.L.C.</span><br/>'
                + '<div id="piracy">'
                + 'In United States and other countries, Other marks are the properties of their respective owners. '
                + 'The sudoku puzzle displayed within the game is the copyright intellectual property of the providers of the '
                + 'content and should not be produced or distributed without the express permission of the content provider(s).'
                + 'The computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution '
                + 'of this program may result in severe civil and criminal penalties, and will be prosecuted to the maximum extend possible under the law'
                + '</div></footer>');
            }
            $(w.document.body).removeClass('loading');
            //close document
            w.document.close();
            w.focus();
            w.setTimeout("print()", 500);
            w.setTimeout("close()", 1000);
            break;
    }
}
var performMenuAction = function (id) {
    //console.log(id);
    var ele = $('#' + id);
    ele.parent().find('.active').removeClass('active').addClass('inactive');
    ele.removeClass('inactive').addClass('active');
    switch (id) {
    case 'mode_regular':
        $('#popup_hint').find('.content').show();
        regular = true;
        break;
    case 'mode_expert':
        $('#popup_hint').find('.content').hide();
        regular = false;
        break;
    case 'sound_on':
        soundEffects = true;
        break;
    case 'sound_off':
        soundEffects = false;
        break;
    case 'print_button':

        var print_ele = $('#acr');
        w = window.open();
        w.document.write('<div class="clue_header">Puzzle Date: ' + $('#puzzle_date').html() + '</div>');
        w.document.write('<div id="acr">' + print_ele.html());
        w.document.write('<div id="board">' + $('#board').html() + '</div></div>');
        $(w.document.head).html('<link href="/game/sudoku/css/sudoku.css" rel="Stylesheet" />');
        var cnt = '<div id="details"><h3>' + $('#puzzle_name').html() + '</h3><br/><span>';
        cnt += $('#puzzle_detail').html().replace(',', '<br/>') + '</span></div>';
        cnt += '<div id="dwn">' + $('#dwn').html() + '</div>';

        if ($('#blank_puzzle').hasClass('print_check_selected')) 
            $(w.document.body).find('td div').css('opacity', '0');

            if ($('#entered_puzzle').hasClass('print_check_selected')) {
                $(w.document.body).find('td div').css('opacity', '1');
            }

            if ($('#sol_puzzle').hasClass('print_check_selected')) {
                $(w.document.body).find('#acr').append('<div id="board1">' + $('#board').html() + '</div>');
                var ans = json.AllAnswer.replace(/-/g, '');
                jQuery.each($(w.document.body).find('#board1 td div'), function (i) {
                    $(this).html(ans[i]);
                });
            }
            $(w.document.body).append(cnt);
            w.print();
            break;
        case 'conflicts':
            break;
        case 'hints':
            break;
    }
}

var playerstarted = false;
function cellOnFocus() {
    //$('table', $(this).parent()).remove();

    /*if (!playerstarted && window.gameCommon.isiOS){
            //$('#board').height() + 160;
            $('body').append('<audio id="player" src="/game/sudoku/sudoku_sounds/start' + audioext + '" loop="true" autoplay></audio>');
            player = document.getElementById('player');
            if (music == 0 && player && player.pause)
                player.pause();
            else if (player && player.pause)
                player.play();
            playerstarted = true;
             var ele = this;
        /*$('#board').animate({
            scrollTop: ($('#board').offset().top - $(ele).offset().top)
        }, {
            queue: false,
            duration: 500
        });*/
    //    }
    $('input,td').stop(true, true);
    $('.highlighted').removeClass('highlighted');
    $('.currentfocus').removeClass('currentfocus');
    $('.currentfocustd').removeClass('currentfocustd');
    if ($(this).attr('class')) {
        var classes = $(this).attr('class').split(' ');
        //console.log(classes[0], classes[1]);
        //$('.' + classes[0]).addClass('highlighted');
        //$('.' + classes[1]).addClass('highlighted');
        $(this).addClass('currentfocus'); //css('backgroundColor', '#FFF');
        $(this).parent().addClass('currentfocustd');
        cell_clicked = "r" + this.id;
    }
    if (window.gameCommon.isiOS) {
        if (soundEffects == true) 
            playSound('clickit');
    } else {
        playInitialSound("select");
    }

}

var gameBlur = function () {
    window.gameCommon.toggleBlur(true, function() {
        if (musicState) {
            puzzle_music.pause();
        }
    });
};

var gameFocus = function () {
    window.gameCommon.toggleBlur(false, function() {
        if (musicState) {
            puzzle_music.play();
        }
    });
};

// Setting Game Focus States
var gameFocusStates = function() {
    if (window.gameCommon.isIE) {
        // check for Internet Explorer
        $(document).parent().onfocusin = gameFocus;
        $(document).parent().onfocusout = gameBlur;
    } else if (window.gameCommon.isFirefox) {
        document.onfocus = gameFocus;
        document.onblur = gameBlur;
    } else {
        window.onfocus = gameFocus;
        window.onblur = gameBlur;
    }
}

// JavaScript Document
