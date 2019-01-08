var gameboard = document.getElementById("gameboard");
var playerTurn = "X";
var numTurns = 0;
createBoard();
gameboard.addEventListener("click", placeMarker);
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
    if (e.target !== e.currentTarget && e.target.innerHTML == "") {
        e.target.innerHTML = playerTurn;
        placements[e.target.id] = playerTurn;
        numTurns++;
        // check for a win
        winCheck(playerTurn);
        // check for a tie
        if (numTurns >= 9) {
            alert("It's a tie!");
            resetBoard();
        }
        // change turns
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
}