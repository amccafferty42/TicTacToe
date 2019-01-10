var gameboard = document.getElementById("gameboard");
var p1 = document.getElementById("onePlayer");
var p2 = document.getElementById("twoPlayer");
gameboard.style.visibility = "hidden";
document.getElementById("turn").style.visibility = "hidden";
var version;
var valid = true;
var playerTurn = "X";
var numTurns = 0;
createBoard();
gameboard.addEventListener("click", placeMarker);
p1.addEventListener("click", setupOnePlayer);
p2.addEventListener("click", setupTwoPlayer);
var placements = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
 
function setupOnePlayer() {
    version = 1;
    p1.outerHTML = "";
    p2.outerHTML = "";
    gameboard.style.visibility = "visible";
    document.getElementById("turn").style.visibility = "visible";
}

function setupTwoPlayer() {
    version = 2;
    p1.outerHTML = "";
    p2.outerHTML = "";
    gameboard.style.visibility = "visible";
    document.getElementById("turn").style.visibility = "visible";
}

function createBoard() {
    for (var i = 1; i <= 9; i++) {
        //create board and set id and class names
        var square = document.createElement("div");
        square.innerHTML = "<h1 id='"+i+"' class='squares'></h1>";
        gameboard.appendChild(square);
    }
}

function resetBoard() {
    // set all squares blank
    for (var i = 1; i <= 9; i++) {
        document.getElementById(i).innerHTML = "";
        placements[i] = "";
        numTurns = 0;
    }
}

function placeMarker(e) {
    if (e.target !== e.currentTarget && e.target.innerHTML == "" && valid) {
        e.target.innerHTML = playerTurn;
        placements[e.target.id] = playerTurn;
        numTurns++;
        winCheck(playerTurn);
        // change turns
        if (version == 1) {
            valid = false;
            computerPlaceMarker();
        }
        else {
            if (playerTurn == "X") {
                document.getElementById("turn").innerHTML = "O's turn";
                playerTurn = "O";
            }
            else {
                document.getElementById("turn").innerHTML = "X's turn";
                playerTurn = "X";
            }
        }
    }
}

function winCheck(p) {
    // Check all possible winning combinations
    if ((placements["1"] == p && placements["2"] == p && placements["3"] == p) ||
        (placements["4"] == p && placements["5"] == p && placements["6"] == p) ||
        (placements["7"] == p && placements["8"] == p && placements["9"] == p) ||
        (placements["1"] == p && placements["4"] == p && placements["7"] == p) ||
        (placements["2"] == p && placements["5"] == p && placements["8"] == p) ||
        (placements["3"] == p && placements["6"] == p && placements["9"] == p) ||
        (placements["1"] == p && placements["5"] == p && placements["9"] == p) ||
        (placements["3"] == p && placements["5"] == p && placements["7"] == p)) {
            alert(p + " wins!");
            resetBoard();
    }
    else if (numTurns >= 9) {
        alert("It's a tie!");
        resetBoard();
    }
}

//simple computer function to allow for one player gameplay. Prioritizes winning, preventing the player from winning, 
//setting up win for next turn, then simply placing it anywhere on the board. Will always place in the middle if it is still open
async function computerPlaceMarker() {
    document.getElementById("turn").innerHTML = "O's turn";
    var placed = false;
    await sleep(2000);
        //check if computer can win
        if (((placements["1"] == "O" && placements["2"] == "O") || (placements["2"] == "O" && placements["3"] == "O") || (placements["1"] == "O" && placements["3"] == "O")) && !placed) {
            for (var i = 1; i <= 3; i++) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["4"] == "O" && placements["5"] == "O") || (placements["5"] == "O" && placements["6"] == "O") || (placements["4"] == "O" && placements["6"] == "O")) && !placed) {
            for (var i = 4; i <= 6; i++) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["7"] == "O" && placements["8"] == "O") || (placements["8"] == "O" && placements["9"] == "O") || (placements["7"] == "O" && placements["9"] == "O")) && !placed) {
            for (var i = 7; i <= 9; i++) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["1"] == "O" && placements["4"] == "O") || (placements["4"] == "O" && placements["7"] == "O") || (placements["1"] == "O" && placements["7"] == "O")) && !placed) {
            for (var i = 1; i <= 7; i = i + 3) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["2"] == "O" && placements["5"] == "O") || (placements["5"] == "O" && placements["8"] == "O") || (placements["2"] == "O" && placements["8"] == "O")) && !placed) {
            for (var i = 2; i <= 8; i = i + 3) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["3"] == "O" && placements["6"] == "O") || (placements["6"] == "O" && placements["9"] == "O") || (placements["3"] == "O" && placements["9"] == "O")) && !placed) {
            for (var i = 3; i <= 9; i = i + 3) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["1"] == "O" && placements["5"] == "O") || (placements["5"] == "O" && placements["9"] == "O") || (placements["1"] == "O" && placements["9"] == "O")) && !placed) {
            for (var i = 1; i <= 9; i = i + 4) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["3"] == "O" && placements["5"] == "O") || (placements["5"] == "O" && placements["7"] == "O") || (placements["3"] == "O" && placements["7"] == "O")) && !placed) {
            for (var i = 3; i <= 7; i = i + 2) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        //otherwise, check if opponent has two in a row and block the win
        if (((placements["1"] == "X" && placements["2"] == "X") || (placements["2"] == "X" && placements["3"] == "X") || (placements["1"] == "X" && placements["3"] == "X")) && !placed) {
            for (var i = 1; i <= 3; i++) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["4"] == "X" && placements["5"] == "X") || (placements["5"] == "X" && placements["6"] == "X") || (placements["4"] == "X" && placements["6"] == "X")) && !placed) {
            for (var i = 4; i <= 6; i++) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["7"] == "X" && placements["8"] == "X") || (placements["8"] == "X" && placements["9"] == "X") || (placements["7"] == "X" && placements["9"] == "X")) && !placed) {
            for (var i = 7; i <= 9; i++) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["1"] == "X" && placements["4"] == "X") || (placements["4"] == "X" && placements["7"] == "X") || (placements["1"] == "X" && placements["7"] == "X")) && !placed) {
            for (var i = 1; i <= 7; i = i + 3) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["2"] == "X" && placements["5"] == "X") || (placements["5"] == "X" && placements["8"] == "X") || (placements["2"] == "X" && placements["8"] == "X")) && !placed) {
            for (var i = 2; i <= 8; i = i + 3) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["3"] == "X" && placements["6"] == "X") || (placements["6"] == "X" && placements["9"] == "X") || (placements["3"] == "X" && placements["9"] == "X")) && !placed) {
            for (var i = 3; i <= 9; i = i + 3) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["1"] == "X" && placements["5"] == "X") || (placements["5"] == "X" && placements["9"] == "X") || (placements["1"] == "X" && placements["9"] == "X")) && !placed) {
            for (var i = 1; i <= 9; i = i + 4) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        if (((placements["3"] == "X" && placements["5"] == "X") || (placements["5"] == "X" && placements["7"] == "X") || (placements["3"] == "X" && placements["7"] == "X")) && !placed) {
            for (var i = 3; i <= 7; i = i + 2) {
                if (placements[i] == "") {
                    placements[i] = "O";
                    document.getElementById(i).innerHTML = "O";
                    placed = true;
                }
            }
        }
        //check for corner placement to win the following turn
        if (placements["5"] == "O" && placements["1"] == "O" && !placed) {
            if (placements["2"] == "") {
                placements["2"] == "O";
                document.getElementById("2").innerHTML = "O";
                placed = true;
            }
            else if (placements["4"] == "") {
                placements["4"] == "O";
                document.getElementById("4").innerHTML = "O";
                placed = true;
            }
        }
        if (placements["5"] == "O" && placements["3"] == "O" && !placed) {
            if (placements["2"] == "") {
                placements["2"] == "O";
                document.getElementById("2").innerHTML = "O";
                placed = true;
            }
            else if (placements["6"] == "") {
                placements["6"] == "O";
                document.getElementById("6").innerHTML = "O";
                placed = true;
            }
        }
        if (placements["5"] == "O" && placements["7"] == "O" && !placed) {
            if (placements["4"] == "") {
                placements["4"] == "O";
                document.getElementById("4").innerHTML = "O";
                placed = true;
            }
            else if (placements["8"] == "") {
                placements["8"] == "O";
                document.getElementById("8").innerHTML = "O";
                placed = true;
            }            
        }
        if (placements["5"] == "O" && placements["9"] == "O" && !placed) {
            if (placements["6"] == "") {
                placements["6"] == "O";
                document.getElementById("6").innerHTML = "O";
                placed = true;
            }
            else if (placements["8"] == "") {
                placements["8"] == "O";
                document.getElementById("8").innerHTML = "O";
                placed = true;
            }              
        }
        //otherwise, place it randomly
        if (!placed) {
            var random = 5;
            while (placements[random] != "") {
                var min=1; 
                var max=9;  
                var random = Math.floor(Math.random() * 9) + 1;
            }
            placements[random] = "O";
            document.getElementById(random).innerHTML = "O";
        }
    document.getElementById("turn").innerHTML = "X's turn";
    valid = true;
    numTurns++;
    winCheck("O");
}