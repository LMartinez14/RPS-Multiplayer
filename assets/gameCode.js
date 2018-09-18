//initialize firebase/ hide API key
var config = {
    apiKey: "AIzaSyCXJ6259qG8CJXHldibJSwcuR59TqiBKyg",
    authDomain: "laurence-ut-coding-ttr.firebaseapp.com",
    databaseURL: "https://laurence-ut-coding-ttr.firebaseio.com",
    projectId: "laurence-ut-coding-ttr",
    storageBucket: "laurence-ut-coding-ttr.appspot.com",
    messagingSenderId: "375533271494"
};
firebase.initializeApp(config);

let database = firebase.database();
let loggedInRef = db.ref("/loggedIn");
let playersRef = db.ref("/player");
let chatBoxRef = db.ref("/chatBox");


// set global variables
let playerName;
let playerNumber;
let playerObject;
let playerOneObject = {
    name: " ",
    choice: " ",
    winCount: 0,
    losseCount: 0
};
let playerTwoObject = {
    name: " ",
    choice: " ",
    winCount: 0,
    losseCount: 0
};
let playerOneEntered = false;
let playerTwoEntered = false;
let resetId;


// append name to new player when "login" button is clicked
playersRef.on("value", function (snapshot) {
    // update the names
    $("#playerOne").text(playerOneObject.name = "Awaiting first Player");
    $("#playerTwo").text(playerTwoObject.name = "Awaiting second player");

    // reveal HTML elements as they are chosen
    updatePlayers("1", snapshot.child("1").exists(), snapshot.child("1").exists() && snapshot.child("1").val().choice);
    updatePlayers("2", snapshot.child("2").exists(), snapshot.child("2").exists() && snapshot.child("playerTwo").val().choice);

    // un-hide/hide "screens" depending on player login
    if (player1LoggedIn && player2LoggedIn && !playerNumber) {
        playersLoginPending();
    } else if (playerNumber) {
        playersAreLoggedIn();
    } else {
        playersNeedToLogIn()();
    }

    // when both player choose selections, compare, and display
    if (player1Object.choice && player2Object.choice) {
        rpsGame(player1Object.choice, player2Object.choice);
    }

});

$("#login").click(function (loginEvent) {
    loginEvent.preventDefault();

    // check for space on loading screen
    if (!player1LoggedIn) {
        playerNumber = "1";
        playerObject = playerOneObject;
    }
    else if (!player2LoggedIn) {
        playerNumber = "2";
        playerObject = playerTwoObject;
    }
    else {
        playerNumber = null;
        playerObject = null;
    }

    // link name to the player number, 1 or 2
    if (playerNumber) {
        playerName = $("#playerName").val().trim();
        playerObject.name = playerName;
        $("#playerName").val("");

        $("#showPlayerName").text(playerName);
        $("#playerNumber").text(playerNumber);

        db.ref("/player/" + playerNumber).set(playerObject);
        db.ref("/player/" + playerNumber).onDisconnect().remove();
    }
});

// game function
function rpsGame(marioChoice, luigiChoice) {
    $(".playerOneShowChoice").text(marioChoice);
    $(".playerTwoShowChoice").text(luigiChoice);

    showSelections();

    // tie
    if (marioChoice === luigiChoice) {
        $("#gameResult").text("Play again.");
    }
    //compare the selections
    else if (((marioChoice === "paper" && luigiChoice === "rock") || (marioChoice === "scissors" && luigiChoice === "paper") || marioChoice === "rock" && luigiChoice === "scissors")) {
        // player 1, mario, wins
        $("#gameResult").html("<small>" + marioChoice + " beats " + luigiChoice + "</small><br/><br/>" + player1Object.name + " wins!");
        if (playerNumber === "1") {
            playerObject.wins++;
        } else {
            playerObject.losses++;
        }
    } else {
        // player 2, luigi, wins
        $("#gameResult").html("<small>" + luigiChoice + " beats " + marioChoice + "</small><br/><br/>" + player2Object.name + " wins!");
        if (playerNumber === "2") {
            playerObject.wins++;
        } else {
            playerObject.losses++;
        }
    }
    // reset the game
    resetId = setTimeout(reset, 2000);
};

// toggle between what is hidden and shown on display
function playersLoginPending()
$(".waitingRoom", ".credentials", ".choices").hide();
$(".roomFull").show();
function playersNeedToLogIn()
$(".waitingRoom", ".roomFull", ".credentials", ".choices").hide();
$(".").show();
function playersAreLoggedIn()
$(".waitingRoom", ".roomFull", ).hide();
$(".credentials").show();
if (playerNumber === "1") {
    $(".playerOneChoices").show();
} else {
    $(".playerOneChoices").hide();
}
if (playerNumber === "2") {
    $(".playerTwoStats").show();
} else {
    $(".playerTwoStats").hide();
};



