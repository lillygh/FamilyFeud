
var player1Name = ""
var player2Name = ""
var currPlayer = ""
var hasWinner = 0
var strikeCount = 0
var answerCount = 0
var totalscore1=0;
var totalscore2 =0;
var currentQuestion;
var currQuestion;
var bouncePlayer1;
var bouncePlayer2;
var player1Image = "#player1-icon";
var player2Image = "#player2-icon";
var setInt;
var corrAnswer;

// --------------------QUESTION/ANSWERS---------------------------------------
//question and answer data

var qData = [{question: 'Name a word that most people yell at their dogs',
			  answers: ['NO', 'SIT', 'STAY', 'DOWN', 'FETCH', 'JUMP'],
			  scores: [27,23,14,7,6,5]
			 },

			{question: 'Name a fruit you can eat with one bite.',
			  answers: ['STRAWBERRY', 'GRAPE', 'BLUEBERRY', 'RASPBERRY', 'CHERRY', 'BLACKBERRY'],
			  scores: [56,17,9,3,2,1]
			},

			{question: 'Name a holiday when people have parties.',
			  answers: ['CHRISTMAS', 'THANKSGIVING', 'HALLOWEEN', '4TH OF JULY', 'LABOR DAY', 'NEW YEARS EVE'],
			  scores: [35,21,11,3,2,1]
			}
];

// -----------------PLAYER NAMES------------------------------------------


function playerNames(){

	//replace player input field with their name values
	player1Name = $("#player1-input").val().toUpperCase();
	player2Name = $("#player2-input").val().toUpperCase();
	//show message if input fields are empty
	if (player1Name=="" || player2Name=="") {
		$("#instruction2").show().text("Please enter all player names.");
	}
	else if (player1Name!="" || player2Name!="") {
		  $("#player1-input").hide();
		  $("#player1-name-output").show().text(player1Name);
		  $("#player2-input").hide();
		  $("#player2-name-output").show().text(player2Name);
	} 
};

// --------------------CHECK FOR WINNER-----------------------------------

function checkWinner(){
	//check if there's a winner
	if (answerCount === 6) {
		gameMsg(currPlayer + " has won this round! " + currPlayer + ", get ready to start the next round")
		//start the next round
		nextRound()
		$("#answerArea").hide()
		$("#question").hide()
	}
}

// --------------------MESSAGE AREA FOR PLAYERS-----------------------------------

//create a message area displaying who goes first
function gameMsg(x){
	$("#instruction3").show().text(x);
	setTimeout(delayQues, 5000);
}

// --------------------HIDE QUESTION FUNCTION-----------------------------------

// used when you want to display a message to the player, e.g. who's turn it is, but not show them the question yet
function hideQues() {
	$("#question").hide();
	$("#answerArea").hide();
	$(".answerInput").hide();
	$("#button-image").hide();
}

// --------------------SHOW QUESTION FUNCTION-----------------------------------

// used when you want to hide the gameMsg (message to the player) and show them the question yet (used with setTimeout)
var delayQues = function(){
	 	$("#instruction3").hide();
	 		$("#question").show();
	 		$("#answerArea").show();
	 		$(".answerInput").show();
		$("#button-image").show();
}

// --------------------WHO GOES FIRST-----------------------------------

// randomize which player starts first
function setTurn(){
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(r==1){
		player1Name = $("#player1-input").val().toUpperCase()
		currPlayer = player1Name
		gameMsg(player1Name + " goes first. You have 1 minute and 3 chances to answer the following question. Get ready!");
		clearInterval(setInt)
		animatePlayer(player1Image)
	}
	else{
		player2Name = $("#player2-input").val().toUpperCase();
		currPlayer = player2Name
		gameMsg(player2Name + " goes first. You have 1 minute and 3 chances to answer the following question. Get ready!");
		clearInterval(setInt)
	 	animatePlayer(player2Image)
	}
}

// --------------------ANIMATE CURRENT PLAYER---------------------------------------

//stop the animation when the player turn changes and start the opposite player's animation

function animatePlayer(player) {
	setInt = setInterval(function () {
		$(player).effect("bounce", { times: 1 }, "slow");
	}, 500);
}

// --------------------CLEAR ANSWER BOARD---------------------------------------

//clear the answer area for the next round
function clearBoard() {
	$("#frontAnswer1").text("1")
  $("#frontAnswer2").text("2")
  $("#frontAnswer3").text("3")
  $("#frontAnswer4").text("4")
  $("#frontAnswer5").text("5")
  $("#frontAnswer6").text("6")
}

// --------------------NEXT ROUND---------------------------------------

//function for starting the next round
function nextRound(){
  hasWinner = 0;
  answerCount=0;
  strikeCount = 0;
  clearBoard();
  showQuestion();
}

// ----------------------RANDOMIZE QUESTIONS-------------------------------------

	// randomize a question from the array
	function showQuestion() {
		//get a random number from within the qData array
	  currentQuestion = Math.floor(Math.random()*qData.length);
		//store it in currQuestion variable
		currQuestion = qData[currentQuestion];
		//remove the question from the array so it doesn't show up again
		qData.splice(currentQuestion, 1)
		//hide the messages and show the question 
		$("#instruction1").hide();
		$(".startGame").hide();
		$("#question").text(currQuestion.question);
	}

// ----------------------START GAME BUTTON EVENTS-------------------------------------

//run these events when the start game button is clicked
$("#startgamebutton").click(function() {

	//display player names
	playerNames();
	//set who goes first
	setTurn();
	//display the question
	showQuestion();
	//show the game timer
	gameTimer(60)


	//alert the user if they refresh the page during the game
	window.onbeforeunload = function(e) {
  	return 'The game is currently in play.';
	}
});


// --------------------ANSWER AREA---------------------------------------

//allow player to hit enter when they submit an answer in the input field
	$(".answerInput").keyup(function(event){
    if(event.keyCode == 13){
        $(".answerInputButton").click();
        $(".answerInput").val('');
    }
	});

// create an event listener for button-image (the answer input field) when it's clicked

$(".answerInputButton").click(function(){

	//store the player's answer in a variable
	var answerData = $(".answerInput").val().toUpperCase()
	//check if answer inputted is in the array of correct answers
	var isInArray = ($.inArray(answerData, currQuestion.answers) !== -1)
	//get the index of the correct answer from the array
	var indexOfAnswer = currQuestion.answers.indexOf(answerData)
	//get the score of the answer based on index of answer
	var answerScore = currQuestion.scores[indexOfAnswer]
	//display the text of the answer tile when the answer is right
	corrAnswer = answerData + " " + answerScore

	// console log the answer from the input field
	console.log(currPlayer + " your answer is ", answerData)

	// --------------------ANSWER IS IN THE ARRAY---------------------------------------

	//if the answer is in the array of correct answers
	if(isInArray) {
		//reset the input field to empty
    $(".answerInput").val('');

    //events to trigger if the current player is player 1
		if (currPlayer === player1Name) {
			clearInterval(setInt)
			animatePlayer(player1Image)

			//increase the correct answer count by 1
			answerCount++;
			//add the current answer score to the total score
			totalscore1 +=answerScore;
			//put the total score in the scorebox
			$("#family1-score").text(totalscore1);
			console.log(currPlayer + ". You got " + answerCount + " answers right")
			
			//check if there's a winner
			checkWinner()
		} 

    //events to trigger if the current player is player 1		
		else if (currPlayer === player2Name) {
			clearInterval(setInt)
			animatePlayer(player2Image)

			//increase the correct answer count by 1			
			answerCount++

			//add the current answer score to the total score
			totalscore2 +=answerScore;
			//put the total score in the scorebox
			$("#family2-score").text(totalscore2);
			console.log(currPlayer + ". You got " + answerCount + " answers right")
			
			//check if there's a winner
			checkWinner()
		}

		//console.log the score that corresponds to the index of the answer
		console.log("you received ", answerScore," points")

		// show green checkmark when the answer is correct
		$("#greencheckmark").show().delay(2000).fadeOut()
		//replace the corresponding answer tile with the answer and score
			if (indexOfAnswer === 0) {
				$("#frontAnswer1").text(corrAnswer);
			} else if (indexOfAnswer === 1) {
				$("#frontAnswer2").text(corrAnswer);
			} else if (indexOfAnswer === 2) {
				$("#frontAnswer3").text(corrAnswer);
			} else if (indexOfAnswer === 3) {
				$("#frontAnswer4").text(corrAnswer);
			} else if (indexOfAnswer === 4) {
				$("#frontAnswer5").text(corrAnswer);
			} else if (indexOfAnswer === 5) {
				$("#frontAnswer6").text(corrAnswer);
			}

	// --------------------ANSWER IS NOT IN THE ARRAY---------------------------------------
	//if the player's answer is not in the array
	} else {
		if (currPlayer === player1Name) {
			clearInterval(setInt)
			animatePlayer(player1Image)

			//clear the input field after submitting
			$(".answerInput").val('');
			//increase the strike count by 1 each time
			strikeCount ++
				//show the red X images based on number of strikes
				if (strikeCount === 1) {
					$("#onestrike").show().delay(1000).fadeOut()
				} else if (strikeCount === 2) {
					$("#twostrike").show().delay(1000).fadeOut()
				} else if (strikeCount === 3) {
					$("#threestrike").show().delay(1000).fadeOut()

					clearInterval(setInt)
					
					//switch turns after a player gets 3 strikes
					currPlayer = player2Name
					//reset strike count to 0 for player 2
					strikeCount = 0
					console.log(currPlayer + "'s turn now." + " Number of strikes: " + strikeCount)
					
					animatePlayer(player2Image)

					//show message to next player that they can steal points for guessing any answer correctly in 5 seconds
					gameMsg(currPlayer + ", you have 5 seconds to guess any remaining answer correctly and steal all the points. Get ready!")
					
					setTimeout(delayQues, 200);

					//reset the game timer to 5 seconds

					//start the next round
				}
		}

		if (currPlayer === player2Name) {
			clearInterval(setInt)

			animatePlayer(player2Image)

			//clear the input field after submitting
			$(".answerInput").val('');
			//increase the strike count by 1 each time
			strikeCount ++
				//show the red X images based on number of strikes
				if (strikeCount === 1) {
					$("#onestrike").show().delay(1000).fadeOut()
				} else if (strikeCount === 2) {
					$("#twostrike").show().delay(1000).fadeOut()
				} else if (strikeCount === 3) {
					$("#threestrike").show().delay(1000).fadeOut()

					clearInterval(setInt)
					
					//switch turns after a player gets 3 strikes
					currPlayer = player1Name
					//reset strike count to 0 for player 2
					strikeCount = 0
					console.log(currPlayer + "'s turn now." + " Number of strikes: " + strikeCount)
					
					animatePlayer(player1Image)

					//show message to next player that they can steal points for guessing any answer correctly in 5 seconds
					gameMsg(currPlayer + ", you have 5 seconds to guess any remaining answer correctly and steal all the points. Get ready!")
					
					setTimeout(delayQues, 200);

					//reset the game timer to 5 seconds

					//start the next round
				}
		}
		console.log("number of strikes is ", strikeCount)
	}
})

// -----------------------------------------------------------
	//Game Timer:

	function gameTimer(x) {
	var game = {score: 0, ellapsedTime: x, messages: ''};
	intervalID = setInterval(function(){
		game.ellapsedTime--;
		$('#game-time').text(' ' + game.ellapsedTime).delay(5000);
		if (game.ellapsedTime<=0) {
	        clearInterval(intervalID);
	    };
	},1000);
}

/*
function resetTimer() {
	var game = {score: 0, ellapsedTime: 0, messages: ''};
	intervalID = setInterval(function(){
		game.ellapsedTime--;
		$('#game-time').text(' ' + game.ellapsedTime);
		if (game.ellapsedTime<=0) {
	        clearInterval(intervalID);
	    };
	},1000);	
}
*/

// -----------------------------------------------------------
// Next steps:

/* 	
	- reset game timer
	- reveal all answers at end of round
	- limit steal points round to just 1 chance
	- add reset board function
	- timer on each turn
*/

