/* Mario Bros theme music */
$(document).ready(function() {

    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "Assests/Audio/Super Mario Brothers - 1989.mp3" );
    
    // Theme Button
    $(".theme-button").on("click", function() {
      audioElement.play();
    });
    $(".pause-button").on("click", function() {
      audioElement.pause();
    });
});


/* Global Variables */
// Cartoons within Word Bank
var wordBank = ["clifford", 
        "recess", 
        "batman", 
        "rugrats", 
        "animaniacs", 
        "flintstones", 
        "daria", 
        "ghostbusters", 
        "catdog", 
        "spongebob", 
        "superman", 
        "pokemon", 
        "transformers",
        "doug",
        "arthur",
        "beetlejuice",
        "ducktales",
        "thundercats",
        "gargoyles",
        "freakazoid"];


// # of attepts when guessing letter
const maxTries = 10;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];

// # of Lives
var remainingGuesses = 0; 


//Boolean
var hasFinished = false; 


// When game begins start at 0   
var wins = 0;                   
var losses = 0;                


/* Functions */
// This function is needed upon start of the game and upon either meeting a Game Win or Game Lose condition
function resetGame() {
remainingGuesses = maxTries;
document.getElementById("startMsg").innerText = "Press any letter to play!";
currentWordIndex = Math.floor(Math.random() * (wordBank.length));
guessedLetters = [];
guessingWord = [];

for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
guessingWord.push("_");

}
updateGameContent();
};

// Function that sends updates and status of where we are in the game instance.
function updateGameContent() {

// Function for score - keeping track of the letters being used and the amount of chances lefts
document.getElementById("winCount").innerText = wins;
document.getElementById("lossCount").innerText = losses;
let guessingWordText = "";
for (let i = 0; i < guessingWord.length; i++) {
guessingWordText += guessingWord[i];
}

console.log("CurrentWord:", guessingWordText);
console.log("GuessingWord:", guessingWord);
console.log("CurrentWordIndex:", currentWordIndex);
console.log("Cartoons: ", wordBank[currentWordIndex]);
document.getElementById("currentWord").innerText = guessingWordText;
document.getElementById("remainingChances").innerText = remainingGuesses;
document.getElementById("usedLetters").innerText = guessedLetters;
};

function evaluateGuess(letter) {

// Function that Array to store strArray of letters in string
var strArray = [];
console.log("Current Word Index :", currentWordIndex);


// Loop  to determine the letters for the word, stored in the array.
    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        if (wordBank[currentWordIndex][i] === letter) {
        strArray.push(i);
        }
    }

    if (strArray.length <= 0) {
        remainingGuesses--;
    } else {
    for (var i = 0; i < strArray.length; i++) {
        guessingWord[strArray[i]] = letter;
    }
}
};

/*Function for differentiaing your guesses that and upon the word being completed or the guesses running out a message will appear.
evaluation logic has completed*/

//Win Message
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
    wins++;
    hasFinished = true;
    document.getElementById("startMsg").innerText = "Congratulations! Keep it up!";
    }
}; 

//Lose Message
function checkLoss() {
    if (remainingGuesses <= 0) {
    hasFinished = true;
    losses++;
    document.getElementById("startMsg").innerText = "Sorry you lose! Try Again!";
    }
}



// Makes a guess
function letterPress(letter) {
if (remainingGuesses > 0) {
    // Make sure we didn't use this letter yet again
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        evaluateGuess(letter);
    }
}

};

// Event listener
document.onkeydown = function (event) {


// Function when game is complete, hit any letter on keyboard to restart next word
if (hasFinished) {
    resetGame();
    hasFinished = false;
} else {


// Function to check to make sure a-z was pressed.
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterPress(event.key.toLowerCase());
        updateGameContent();
        checkWin();
        checkLoss();
    }
}
};    