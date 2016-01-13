
var player1Name = ""
var player2Name = ""
var currPlayer = ""
var hasWinner = 0
var strikeCount = 0
var answerCount = 0
var totalscore1=0;
var totalscore2 =0;
var roundScore = 0;
var currentQuestion;
var currQuestion;
var bouncePlayer1;
var bouncePlayer2;
var player1Image = "#player1-icon";
var player2Image = "#player2-icon";
var setInt;
var corrAnswer;
var intervalID;
var isStealRound;
var roundWinner;
var roundCount = 0;

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
			},
			{question: 'Name a bad sport for someone who is afraid of the water.',
			  answers: ['SWIMMING', 'WATER POLO', 'WATER SKIING', 'DIVING', 'SCUBA DIVING', 'SURFING'],
			  scores: [33,21,17,11,6,5]
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

function distributeRoundPoints(winner){
	//stop game timer
	clearInterval(intervalID)
	//stop animation
	clearInterval(setInt)

	//set game timer to empty
	$('#game-time').text('');
	//hide question and answer area
	$("#answerArea").hide()
	$("#question").hide()

	//determine who gets the score for that round, if winner === player 1, add totalscore to roundscore
	totalscore1 += winner === 1 ? roundScore : 0
	totalscore2 += winner === 2 ? roundScore : 0

	//put the scores in their appropriate score boxes
	$("#family1-score").text(totalscore1);
	$("#family2-score").text(totalscore2);

	//put the winning player in a variable and assign it to current player
	var winnerName = winner === 1 ? player1Name : player2Name
	currPlayer = winnerName	
	gameMsg(winnerName + " has won this round! " + winnerName + ", get ready to start the next round")
	//start the next round
	
	nextRound()
}

// --------------------MESSAGE AREA FOR PLAYERS-----------------------------------

//create a message area displaying who goes first
function gameMsg(x){
	hideQues()
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
		//show the game timer
		gameTimer(isStealRound ? 5 : 60)
}

// --------------------WHO GOES FIRST-----------------------------------

// randomize which player starts first
function setTurn(){
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	isStealRound = false;
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

//animation for the current player

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
  //set the answer input value to empty
  $(".answerInput").val('')
}

// --------------------END OF GAME FUNCTION-----------------------------------

function finishGame () {

	//stop game timer
	clearInterval(intervalID)
	//stop animation
	clearInterval(setInt)

	// var winningPlayer;
	if (totalscore1 > totalscore2) {
		// winningPlayer = player1Name
		gameMsg(player1Name + " has won!")
	}
	if (totalscore1 < totalscore2) {
		// winningPlayer = player2Name
		gameMsg(player2Name + " has won!")
	} 
	else	if (totalscore1 === totalscore2) {
		gameMsg("It's a tie!")
	}

	// var message = winningPlayer ? "It's a tie" : winningPlayer + " has won!"
	// gameMsg(message)
}

// --------------------NEXT ROUND---------------------------------------

//function for starting the next round
function nextRound(){
	roundCount ++;
	if (roundCount > 2) {
		finishGame()
		return;
	}

	isStealRound = false;
  hasWinner = 0;
  answerCount=0;
  strikeCount = 0;
  clearBoard();
	showQuestion();
  roundScore = 0;
  animatePlayer(currPlayer === player1Name ? player1Image : player2Image);
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
		//if (currPlayer === player1Name) {
			clearInterval(setInt)
			animatePlayer(currPlayer === player1Name ? player1Image : player2Image)

			//increase the correct answer count by 1
			answerCount++;
			//add the current answer score to the total score
			roundScore +=answerScore;
			//put the total score in the scorebox
			if (currPlayer === player1Name){
				$("#family1-score").text(totalscore1 + roundScore);
			}
			else{
				$("#family2-score").text(totalscore2 + roundScore);
			}
			console.log(currPlayer + ". You got " + answerCount + " answers right")
			
			if (answerCount === 6 || isStealRound) {
				distributeRoundPoints(currPlayer === player1Name ? 1 : 2)
				return;
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
					if (isStealRound) {
						//total points goes to player 2
						distributeRoundPoints(2)
						return;
					}
				} else if (strikeCount === 2) {
					$("#twostrike").show().delay(1000).fadeOut()
				} else if (strikeCount === 3) {
					$("#threestrike").show().delay(1000).fadeOut()

					isStealRound = true;

					clearInterval(setInt)
					clearInterval(intervalID)

					$('#game-time').text('');

					//switch turns after a player gets 3 strikes
					currPlayer = player2Name
					//reset strike count to 0 for player 2
					strikeCount = 0
					console.log(currPlayer + "'s turn now." + " Number of strikes: " + strikeCount)
					
					animatePlayer(player2Image)

					//show message to next player that they can steal points for guessing any answer correctly in 5 seconds
					gameMsg(currPlayer + ", you have 5 seconds to guess any remaining answer correctly and steal all the points. Get ready!")
					
				}
		}

		else {
			clearInterval(setInt)

			animatePlayer(player2Image)

			//clear the input field after submitting
			$(".answerInput").val('');
			//increase the strike count by 1 each time
			strikeCount ++
				//show the red X images based on number of strikes
				if (strikeCount === 1) {
					$("#onestrike").show().delay(1000).fadeOut()
						if (isStealRound) {
						//total points goes to player 2
						distributeRoundPoints(1)
						return;
						}
				} else if (strikeCount === 2) {
					$("#twostrike").show().delay(1000).fadeOut()
				} else if (strikeCount === 3) {
					$("#threestrike").show().delay(1000).fadeOut()

					isStealRound = true;

					clearInterval(setInt)
					clearInterval(intervalID)
					
					$('#game-time').text('');

					//switch turns after a player gets 3 strikes
					currPlayer = player1Name
					//reset strike count to 0 for player 2
					strikeCount = 0
					console.log(currPlayer + "'s turn now." + " Number of strikes: " + strikeCount)
					
					animatePlayer(player1Image)

					//show message to next player that they can steal points for guessing any answer correctly in 5 seconds
					gameMsg(currPlayer + ", you have 5 seconds to guess any remaining answer correctly and steal all the points. Get ready!")
					
				}
		}
		console.log("number of strikes is ", strikeCount)
	}
})

// -----------------------------------------------------------
	//Game Timer:

	function gameTimer(x) {
	var game = {score: 0, ellapsedTime: x, messages: ''};
	$('#game-time').text(' ' + game.ellapsedTime)

	//guard operator; same as if intervalID, clear interval; only run it if truthy
	intervalID && clearInterval(intervalID)
	intervalID = setInterval(function(){
		game.ellapsedTime--;
		$('#game-time').text(' ' + game.ellapsedTime)
		if (game.ellapsedTime<=0) {
	        clearInterval(intervalID);
					if (isStealRound) {
						distributeRoundPoints(currPlayer === player1Name ? 2 : 1)
						return;
					}
	    };
	},1000);
}

// -----------------------------------------------------------
// Next steps:

/* 	
	- reveal all answers at end of round
	- finish game functionality 
	- add the total points for that round to the winning player's total (not just the total of the score they got right)
*/

