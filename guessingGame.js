/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
(function(){
	var prevGuesses;
	var winningNum;
	var playersGuess;
	var numGuesses;
	var hintUsed;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

	function generateWinningNumber(){
		return Math.floor(Math.random() * 100) + 1;
	}
// Fetch the Players Guess

	function playersGuessSubmission(){
		playersGuess = $("#guessfield").val();
		if((playersGuess < 0)||(playersGuess > 100)){
			$("#response").text("Please enter a valid number");
		}
	}

	function playAgain(){
		winningNum = generateWinningNumber();
		playerGuess = null;
		hintUsed = false;
		$("#hinttext").text("New Game");
		numGuesses = 5;
		prevGuesses = "Previous Guesses: ";
		$("#remainGuess").text(numGuesses + " guesses remaining");
		$("#response").text("");
		$("#1").text("");
	}

	$(document).ready(function(){
		playAgain();
		var guess = function(){
			playersGuessSubmission();
			checkGuess();
			prevGuesses += " " + playersGuess;
		}
		$("#guess").on("click", guess);
		$("#guessfield").keypress(function (e) {
			if(e.which == 13){
				guess(); 
			}
		});
		$("#hint").on("click", provideHint);
		$("#restart").on("click", playAgain);
	});

// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		if(playersGuess < winningNum){
			$("#1").text("Guess higher,");
		}
		else if(playerGuess === winningNum){
			$("#1").text("");
		}
		else{
			$("#1").text("Guess lower,");
		}

	}

	// Check if the Player's Guess is the winning number 

	function checkGuess(){
		if (winningNum == playersGuess){
			$("#response").text("Congrats! You Win! \n Press 'restart' to play again.");
		}else if(0 < Math.abs(winningNum - playersGuess) < 5){
			$("#response").text("You're supa hot");
			lowerOrHigher();
		}
		else if(4 < Math.abs(winningNum - playersGuess) < 10){
			$("#response").text("You're Hot");
			lowerOrHigher();
		}
		else if( 9 < Math.abs(winningNum - playersGuess) < 20){
			$("#response").text("You're Warm");
			lowerOrHigher();
		}
		else if(19 < Math.abs(winningNum - playersGuess) < 35){
			$("#response").text("You're cold");
			lowerOrHigher();
		}
		else if(34 < Math.abs(winningNum - playersGuess) < 100){
			$("#response").text("You're freezing");
			lowerOrHigher();
		}
		numGuesses--;
		$("#remainGuess").text(numGuesses + " guesses remaining");
		$("#prevGuess").text(prevGuesses);
		if(numGuesses < 1){
			$("#response").text("Game Over\nPress 'restart' to play again");
			playAgain();
		}
	}

	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(){
		if(hintUsed != true){
			var ranNum1 = Math.floor((Math.random() * 100) + 1);
			var ranNum2 = Math.floor((Math.random() * 100) + 1);
			var ranNum3 = Math.floor((Math.random() * 100) + 1);
			$("#hinttext").text( "Possible numbers: " + ranNum1 + ", " + winningNum + ", " + ranNum2 + ", and " + ranNum3);
			numGuesses--;
			hintUsed = true;
			$("#remainGuess").text(numGuesses + " guesses remaining");
				if(numGuesses < 1){
				$("#response").text("Game Over\nPress 'restart' to play again");
				playAgain();
			}
		}
	}

}());
