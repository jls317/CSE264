//script.js
//Jeffrey Stewart
//jls317
//Minesweeper
function checkedEasy() {
    console.log("checkEasy");
    document.getElementById('customHeight').value = 10;
    document.getElementById('customWidth').value = 10;
    document.getElementById('customBombs').value = 10;
}
function checkedMedium() {
    console.log("checkMedium");
    document.getElementById('customHeight').value = 20;
    document.getElementById('customWidth').value = 20;
    document.getElementById('customBombs').value = 60;
}
function checkedHard() {
    console.log("checkHard");
    document.getElementById('customHeight').value = 30;
    document.getElementById('customWidth').value = 30;
    document.getElementById('customBombs').value = 180;
}


var gameHeight;
var gameWidth;
var numBombs;
var cellCount;
function startGame() {
    createBoard();
    plantBombs();
    calcInfo();
}

function createBoard() {
    gameHeight = document.getElementById("customHeight").value;
    gameWidth = document.getElementById("customWidth").value;
    numBombs = document.getElementById("customBombs").value;
    if (gameHeight > 30 || gameWidth > 30) {
        alert("height/width greater than 30 prohibited");
        return;
    }
    if (numBombs > gameHeight * gameWidth) {
        alert("too many bombs for grid");
        return;
    }
    console.log("...");
    console.log("creating game");
    console.log("rows: " + gameHeight);
    console.log("columns: " + gameWidth);
    console.log("bombs: " + numBombs);

    //check bombs < rows * cols
    cellCount = gameHeight * gameWidth;
    if (numBombs > cellCount) {
        alert("Number of bombs exceeds game size");
    }

    //remove form
    $('#controls').fadeOut('fast');
    $('#controls').css("visibility", "hidden");
    //create buttons for game
    $('#board').css("visibility", "visible")
    $('#board').fadeIn('fast');

    var count = 0;
    for (let i = 0; i < gameHeight; i++) {
        var newrow = $("<tr class='rows'></tr>");
        for (let j = 0; j < gameWidth; ++j) {
            var newcell = $("<td class='cell hid'></td>");
            $(newcell).attr("id", j + "_" + i);
            $(newcell).html('');
            $(newcell).append("0");
            $(newrow).append(newcell);
            count++;
        }
        $("#gameBoard tbody").append(newrow);
    }
}

function plantBombs() {
    var plantedBombs = 0;
    while (plantedBombs < numBombs) {
        //get location of new bomb
        var y = Math.floor(Math.random() * gameWidth);
        var x = Math.floor(Math.random() * gameHeight);
        if ($("#" + x + "_" + y).hasClass("bomb")) {
            continue;
        }
        plantedBombs++;
        $("#" + x + "_" + y).addClass("bomb");
        $("#" + x + "_" + y).html("*");
    }
}

function calcInfo() {
    var count;
    for (let i = 0; i < gameHeight; i++) {
        for (let j = 0; j < gameWidth; j++) {
            count = 0;
            if ($("#" + i + "_" + j).hasClass("bomb")) {
                continue;
            }
            if ($("#" + (i + 1) + "_" + j).hasClass("bomb")) {
                count++;
            }
            if ($("#" + (i + 1) + "_" + (j + 1)).hasClass("bomb")) {
                count++;
            }
            if ($("#" + (i + 1) + "_" + (j - 1)).hasClass("bomb")) {
                count++;
            }
            if ($("#" + (i) + "_" + (j - 1)).hasClass("bomb")) {
                count++;
            }
            if ($("#" + (i) + "_" + (j + 1)).hasClass("bomb")) {
                count++;
            }
            if ($("#" + (i - 1) + "_" + (j + 1)).hasClass("bomb")) {
                count++;
            }
            if ($("#" + (i - 1) + "_" + (j)).hasClass("bomb")) {
                count++;
            }
            if ($("#" + (i - 1) + "_" + (j - 1)).hasClass("bomb")) {
                count++;
            }
            $("#" + i + "_" + j).html(count);
        }
    }
}

$(document).click(function (e) {
        var obj = e.target;
        var OBJid, OBJid_coord;
        var x;
        var y;
        if($(obj).hasClass("selected")){
            return;
        }
        else{
        if ($(obj).hasClass("cell hid")) {
            $(obj).removeClass("hid");       
        }
        if ($(obj).text() == "0") {
            OBJid = $(obj).attr('id');
            OBJid_coord = OBJid.split("_");
            x = OBJid_coord[0];
            y = OBJid_coord[1];
            revealZero(x, y);
        }
        setTimeout(function(){
        if ($(obj).hasClass("bomb")) {
            alert("You Lost.");
            //show form
            $('#controls').fadeIn('fast');
            $('#controls').css("visibility", "visible");
            //remove game
            $('.rows').remove();

        }
        //check win condition (if all hid are bombs, done)
        var length = $('.hid').length;
        if (length == numBombs) {
            alert("You Win!");
            //show form
            $('#controls').fadeIn('fast');
            $('#controls').css("visibility", "visible");
            //remove game
            $('.rows').remove();
        }
    }, 10);
        }
});
$(document).mousedown(function (e) {
    
    if(e.which == 3){
        var obj = e.target;
        
    if(($(obj).hasClass("hid"))){
    $(obj).toggleClass("selected");
}
    }
});
    

function revealBoard() {
    $('.hid').removeClass("hid");
}

function revealZero(i, j) {
    i = parseInt(i);
    j = parseInt(j);

    //if zero, call revealZero
    if ($("#" + (i + 1) + "_" + j).hasClass("hid")) {
        $("#" + (i + 1) + "_" + j).removeClass("hid");
        if ($("#" + (i + 1) + "_" + j).text() == "0") {
            revealZero((i + 1), j);
        }
    }

    if ($("#" + (i + 1) + "_" + (j + 1)).hasClass("hid")) {
        $("#" + (i + 1) + "_" + (j + 1)).removeClass("hid");
        if ($("#" + (i + 1) + "_" + (j + 1)).text() == "0") {
            revealZero((i + 1), (j + 1));
        }
    }

    if ($("#" + (i + 1) + "_" + (j - 1)).hasClass("hid")) {
        $("#" + (i + 1) + "_" + (j - 1)).removeClass("hid");
        if ($("#" + (i + 1) + "_" + (j - 1)).text() == "0") {
            revealZero((i + 1), (j - 1));
        }
    }

    if ($("#" + (i) + "_" + (j - 1)).hasClass("hid")) {
        $("#" + i + "_" + (j - 1)).removeClass("hid");
        if ($("#" + (i) + "_" + (j - 1)).text() == "0") {
            revealZero(i, (j - 1));
        }
    }

    if ($("#" + (i) + "_" + (j + 1)).hasClass("hid")) {
        $("#" + i + "_" + (j + 1)).removeClass("hid");
        if ($("#" + (i) + "_" + (j + 1)).text() == "0") {
            revealZero(i, (j + 1));
        }
    }

    if ($("#" + (i - 1) + "_" + (j + 1)).hasClass("hid")) {
        $("#" + (i - 1) + "_" + (j + 1)).removeClass("hid");
        if ($("#" + (i - 1) + "_" + (j + 1)).text() == "0") {
            revealZero((i - 1), (j + 1));
        }
    }

    if ($("#" + (i - 1) + "_" + (j)).hasClass("hid")) {
        $("#" + (i - 1) + "_" + j).removeClass("hid");
        if ($("#" + (i - 1) + "_" + (j)).text() == "0") {
            revealZero((i - 1), j);
        }
    }

    if ($("#" + (i - 1) + "_" + (j - 1)).hasClass("hid")) {
        $("#" + (i - 1) + "_" + (j - 1)).removeClass("hid");
        if ($("#" + (i - 1) + "_" + (j - 1)).text() == "0") {
            revealZero((i - 1), (j - 1));
        }
    }
}



//double click auto clear
$(document).dblclick(function(e) {
    var obj = e.target;
    var val = $(obj).text();
    var OBJid = $(obj).attr('id');
    var OBJid_coord = OBJid.split("_");
    var i = OBJid_coord[0];
    var j = OBJid_coord[1];
    i = parseInt(i);
    j = parseInt(j);
    //check locks
    var numLocks = 0;
    if ($("#" + (i + 1) + "_" + j).hasClass("selected")) {
        numLocks++;
    }
    if ($("#" + (i + 1) + "_" + (j + 1)).hasClass("selected")) {
        numLocks++;
    }
    if ($("#" + (i + 1) + "_" + (j - 1)).hasClass("selected")) {
        numLocks++;
    }
    if ($("#" + (i) + "_" + (j - 1)).hasClass("selected")) {
        numLocks++;
    }
    if ($("#" + (i) + "_" + (j + 1)).hasClass("selected")) {
        numLocks++;
    }
    if ($("#" + (i - 1) + "_" + (j + 1)).hasClass("selected")) {
        numLocks++;
    }
    if ($("#" + (i - 1) + "_" + (j)).hasClass("selected")) {
        numLocks++;
    }
    if ($("#" + (i - 1) + "_" + (j - 1)).hasClass("selected")) {
        numLocks++;
    }
    if(numLocks == val){
        //reveal cells that are not locked
        revealBoard(i, j);
    }
});

function revealBoard(i, j) {
    if (!($("#" + (i + 1) + "_" + (j - 1)).hasClass("selected"))) {
        $("#" + (i + 1) + "_" + (j - 1)).removeClass("hid");
        checkCell(i+1, j-1);
    }
    if (!($("#" + (i + 1) + "_" + j).hasClass("selected"))) {
        $("#" + (i + 1) + "_" + j).removeClass("hid");
        checkCell(i+1, j);
    }
    if (!($("#" + (i + 1) + "_" + (j + 1)).hasClass("selected"))) {
        $("#" + (i + 1) + "_" + (j + 1)).removeClass("hid");
        checkCell(i+1, j+1);
    }
    if (!($("#" + i + "_" + (j + 1)).hasClass("selected"))) {
        $("#" + i + "_" + (j + 1)).removeClass("hid");
        checkCell(i, j+1);
    }
    if (!($("#" + i + "_" + (j - 1)).hasClass("selected"))) {
        $("#" + i + "_" + (j - 1)).removeClass("hid");
        checkCell(i, j-1);
    }
    if (!($("#" + (i - 1) + "_" + (j - 1)).hasClass("selected"))) {
        $("#" + (i - 1) + "_" + (j - 1)).removeClass("hid");
        checkCell(i-1, j-1);
    }
    if (!($("#" + (i - 1) + "_" + j).hasClass("selected"))) {
        $("#" + (i - 1) + "_" + j).removeClass("hid");
        checkCell(i-1, j);
    }
    if (!($("#" + (i - 1) + "_" + (j + 1)).hasClass("selected"))) {
        $("#" + (i - 1) + "_" + (j + 1)).removeClass("hid");
        checkCell(i-1, j+1);
    }
}

function checkCell(i, j){
    var obj = $("#"+i+"_"+j);
    if ($(obj).text() == "0") {
            OBJid = $(obj).attr('id');
            OBJid_coord = OBJid.split("_");
            x = OBJid_coord[0];
            y = OBJid_coord[1];
            revealZero(x, y);
        }
        setTimeout(function(){
        if ($(obj).hasClass("bomb")) {
            alert("You Lost.");
            //show form
            $('#controls').fadeIn('fast');
            $('#controls').css("visibility", "visible");
            //remove game
            $('.rows').remove();

        }
        //check win condition (if all hid are bombs, done)
        var length = $('.hid').length;
        if (length == numBombs) {
            alert("You Win!");
            //show form
            $('#controls').fadeIn('fast');
            $('#controls').css("visibility", "visible");
            //remove game
            $('.rows').remove();
        }
    }, 10);
}