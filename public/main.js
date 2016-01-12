
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

// -----------------PLAYERS------------------------------------------

$("#startgamebutton").click(function (){

	player1Name = $("#player1-input").val().toUpperCase();
	player2Name = $("#player2-input").val().toUpperCase();

	if (player1Name=="" || player2Name=="") {
		$("#instruction2").show().text("Please enter all player names.");
	}
	else if (player1Name!="" || player2Name!="") {
		  $("#player1-input").hide();
		  $("#player1-name-output").show().text(player1Name);

		  $("#player2-input").hide();
		  $("#player2-name-output").show().text(player2Name);
	} 
});

// --------------------WHO GOES FIRST-----------------------------------
// set the turn of the player

function gameMsg(x){
	 	$("#instruction3").show().text(x);

	 setTimeout(function(){ 
	 	$("#instruction3").hide();
	 		$("#question").show();
	 		$("#answerArea").show();
	 		$(".answerInput").show();
		$("#button-image").show();
	 }, 5000);
}

function setTurn(){
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(r==1){
		player1Name = $("#player1-input").val().toUpperCase()
		currPlayer = player1Name
		gameMsg(player1Name + " goes first. You have 1 minute and 3 chances to answer the following question. Get ready!");
	 setInterval(function() 
	    {
			$("#player1-icon").effect( "bounce", { times: 1 }, "slow" );
	     },500);
	}
	else{
		player2Name = $("#player2-input").val().toUpperCase();
		currPlayer = player2Name
		gameMsg(player2Name + " goes first. You have 1 minute and 3 chances to answer the following question. Get ready!");
	 setInterval(function() 
	    {
			$("#player2-icon").effect( "bounce", { times: 1 }, "slow" );
	     },500);
	}
}

// --------------------SWITCH PLAYER TURN---------------------------------------


// --------------------SUM OF SCORES---------------------------------------




// --------------------NEXT ROUND---------------------------------------

function nextRound(){
        hasWinner = 0;
        answerCount=0;
        strikeCount = 0;
        $("#frontAnswer1").removeClass("rightAnswer").addClass("answerTile")
        $("#frontAnswer2").removeClass("rightAnswer").addClass("answerTile")
        $("#frontAnswer3").removeClass("rightAnswer").addClass("answerTile")
        $("#frontAnswer4").removeClass("rightAnswer").addClass("answerTile")
        $("#frontAnswer5").removeClass("rightAnswer").addClass("answerTile")
        $("#frontAnswer6").removeClass("rightAnswer").addClass("answerTile")
        showQuestion()
}

// --------------------QUESTION/ANSWERS---------------------------------------
//question and answer data

var qData = [{question: 'Name a word that most people yell at their dogs',
			  answers: ['no', 'sit', 'stay', 'down', 'fetch', 'jump'],
			  scores: [27,23,14,7,6,5]
			 },

			{question: 'Name a fruit you can eat with one bite.',
			  answers: ['strawberry', 'grape', 'blueberry', 'raspberry', 'cherry', 'blackberry'],
			  scores: [56,17,9,3,2,1]
			},

			{question: 'Name a holiday when people have parties.',
			  answers: ['christmas', 'thanksgiving', 'halloween', '4th of july', 'labor day', 'new years eve'],
			  scores: [35,21,11,3,2,1]
			}
];

// ----------------------RANDOMIZE QUESTIONS-------------------------------------

	// randomize the question displayed in the array
	function showQuestion() {
	  currentQuestion = Math.floor(Math.random()*qData.length);
		currQuestion = qData[currentQuestion];
		qData.splice(currentQuestion, 1)
		$("#instruction1").hide();
		$(".startGame").hide();
		$("#question").text(currQuestion.question);
	}

// ----------------------START GAME BUTTOM and QUESTION DISPLAY-------------------------------------

//"start game" button events
$("#startgamebutton").click(function() {

	//check if users have entered their names before starting the game
	player1Name = $("#player1-input").val().toUpperCase();
	player2Name = $("#player2-input").val().toUpperCase();
	
	if(player1Name=="" || player2Name==""){
		$("#instruction2").show().text("Please enter all player names.");
		return;
	} else if (player1Name!="" || player2Name!=""){
		$("#instruction2").hide()
	setTurn();
}	
	showQuestion()

	//alert the user if they refresh the page during the game
	window.onbeforeunload = function(e) {
  	return 'The game is currently in play.';
	}

});


// -----------------------------------------------------------
//add enter key feature when submitting data in answer input field

	$(".answerInput").keyup(function(event){
    if(event.keyCode == 13){
        $(".answerInputButton").click();
    }
	});


// create an event listener for button-image (the answer input field) when it's clicked

$(".answerInputButton").click(function(){

	var answerData = $(".answerInput").val()
	//check if answer inputted is in the array of correct answers
	var isInArray = ($.inArray(answerData, currQuestion.answers) !== -1)
	//get the index of the correct answer from the array
	var indexOfAnswer = currQuestion.answers.indexOf(answerData)
	//get the score of the answer based on location of index of answer
	var answerScore = currQuestion.scores[indexOfAnswer]
	//the text of the answer tile when the answer is right
	var corrAnswer = answerData + " " + answerScore

	// console log the answer from the input field
	console.log(currPlayer + " your answer is ", answerData)

	if(isInArray) {
		if (currPlayer === player1Name) {
			answerCount++;
			totalscore1 +=answerScore;
			$("#family1-score").text(totalscore1);
			console.log(currPlayer + ". You got " + answerCount + " answers right")
			//check if winner
			if (answerCount === 6) {
				gameMsg(currPlayer + " has won this round! " + currPlayer + ", get ready to start the next round")
				//reset board to next question
				//tally points in scorebox
				$("#answerArea").hide()
				$("#question").hide()
				nextRound()
			}
		} 
		else if (currPlayer === player2Name) {
			answerCount++
			totalscore2 +=answerScore;
			$("#family2-score").text(totalscore2);
			console.log(currPlayer + ". You got " + answerCount + " answers right")
			//check if winner
			if (answerCount === 6) {
				gameMsg(currPlayer + " has won this round! " + currPlayer + ", get ready to start the next round")
				//reset board to next question

				//tally points in scorebox
				$("#answerArea").hide()
				$("#question").hide()
				nextRound()
			}
		}
		//console.log the score that corresponds to the index of the answer
		console.log("you received ", answerScore," points")
		// show green checkmark
		$("#greencheckmark").show().delay(2000).fadeOut()
		//flip corresponding answer tile with the answer and score
			if (indexOfAnswer === 0) {
				$("#frontAnswer1").removeClass("answerTile").addClass("rightAnswer").html(corrAnswer);
				answerScore++
			} else if (indexOfAnswer === 1) {
				$("#frontAnswer2").removeClass("answerTile").addClass("rightAnswer").html(corrAnswer);
			} else if (indexOfAnswer === 2) {
				$("#frontAnswer3").removeClass("answerTile").addClass("rightAnswer").html(corrAnswer);
			} else if (indexOfAnswer === 3) {
				$("#frontAnswer4").removeClass("answerTile").addClass("rightAnswer").html(corrAnswer);
			} else if (indexOfAnswer === 4) {
				$("#frontAnswer5").removeClass("answerTile").addClass("rightAnswer").html(corrAnswer);
			} else if (indexOfAnswer === 5) 
				$("#frontAnswer6").removeClass("answerTile").addClass("rightAnswer").html(corrAnswer);
	} else {
		if (currPlayer === player1Name) {
			strikeCount ++
			console.log ('Try again')
				if (strikeCount === 1) {
					$("#onestrike").show().delay(2000).fadeOut()
				} else if (strikeCount === 2) {
					$("#twostrike").show().delay(2000).fadeOut()
				} else if (strikeCount === 3) {
					$("#threestrike").show().delay(2000).fadeOut()
					//switch turns after a player gets 3 strikes
					currPlayer = player2Name
					//reset strike count to 0 for player 2
					console.log(currPlayer + "'s turn now.")
					//show message to next player that they can steal points for guessing any answer correctly in 5 seconds
					gameMsg(currPlayer + ", you have 5 seconds to guess any remaining answer correctly and steal all the points. Get ready!")
				}
		}
		else if (currPlayer === player2Name) {
			strikeCount ++
			console.log ('Try again')
				if (strikeCount === 1) {
					$("#onestrike").show().delay(2000).fadeOut()
				} else if (strikeCount === 2) {
					$("#twostrike").show().delay(2000).fadeOut()
				} else if (strikeCount === 3) {
					$("#threestrike").show().delay(2000).fadeOut()
					//switch turns after a player gets 3 strikes
					currPlayer = player1Name
					//reset strike count to 0 for player 1
					console.log(currPlayer + "'s turn now.")
					//show message to next player that they can steal points for guessing any answer correctly in 5 seconds
					gameMsg(currPlayer + ", you have 5 seconds to guess any remaining answer correctly and steal all the points. Get ready!")
				}
		}
		console.log("number of strikes is ", strikeCount)
	}
})

// -----------------------------------------------------------
	//Game Timer:

	function gameTimer() {
	var game = {score: 0, ellapsedTime: 60, messages: ''};
	intervalID = setInterval(function(){
		game.ellapsedTime--;
		$('#game-time').text(' ' + game.ellapsedTime);
		if (game.ellapsedTime<=0) {
	        clearInterval(intervalID);
	    };
	},1000);
}

// -----------------------------------------------------------
// Next steps:

/* 	
	- switch player turns
	- limit steal points round to just 1 chance
	- add reset board function
	- omit a previous used question from the array
	- keep score in scorebox
	- winner of round must guess all answers
	- timer on each turn
	- design flipped answer tiles
	- animate current player
*/

