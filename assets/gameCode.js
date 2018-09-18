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


// add new player when "login" button is clicked
playersRef.on("value", function (snapshot) {
    // update the names
    $("#playerOne").text(playerOneObject.name = "Awaiting first Player");
    $("#playerTwo").text(playerTwoObject.name = "Awaiting second player");

    // reveal HTML elements as they are chosen
    updatePlayers("1", snapshot.child("1").exists(), snapshot.child("1").exists() && snapshot.child("1").val().choice);
    updatePlayers("2", snapshot.child("2").exists(), snapshot.child("2").exists() && snapshot.child("playerTwo").val().choice);

    // un-hide/hide "screens" depending on player login
    if (player1LoggedIn && player2LoggedIn && !playerNumber) {
        playersLogginPending();
    } else if (playerNumber) {
        playersAreLoggedIn();
    } else {
        playersNeedToLogIn ()();
    }

    // if both players have selected their choice, perform the comparison
    if (player1Object.choice && player2Object.choice) {
        rps(player1Object.choice, player2Object.choice);
    }

});

$("#login").click(function (loginEvent) {
    loginEvent.preventDefault();

    // check for availability on load
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

// toggle between hidden and shown displays
function playersLogginPending()
function playersAreLoggedIn ()
function playersNeedToLogIn ()


