/*
	ENGINE FOR THE GAME
	0. Players enter their names
	1. Display question, display counter-down timer
	2. Hide answers in each answer slot
	3. Player1 can enter answer
	4. If answer is correct, flip the slot containing the answer, award points for that answer to player1
	6. If player1 get all answers, player1 get all points from this round, round ends, player1 starts next round
	7. If player1 makes a wrong guess, player1 get "strike" (X).
	8. Player1 is allowed 3 strikes, after 3rd strike, player2 starts, player 2 has 1 guess.
	   8.1 If player2 guesses any remaining answer,
	   		8.1.1 player2 wins round
	   		8.1.2 player2 get all points of player1 from that round,
	   8.2 If player doesn't guess any remaining answer
	   		8.2.1 Player1 wins round
	   		8.2.1 Player1 gets all the points from his correct guesses
	9. Winner of current round starts next round
	10. Each game has 3 rounds, after round 3, player with highest score wins
*/

var currentQuestion = null;

var qData = [{question: 'Name a word that most people yell at their dogs',
			  answers: ['no', 'sit', 'stop', 'down', 'fetch', 'jump'],
			  scores: [27,23,14,7,6,5]
			 },

			{question: 'Name a fruit you can eat with one bite.',
			  answers: ['strawberry', 'grape', 'blueberry', 'raspberry', 'plum', 'banana'],
			  scores: [56,17,9,3,2,1]
			},

			{question: 'Name a holiday when people have parties.',
			  answers: ['christmas', 'thanksgiving', 'halloween', '4th of july', 'labor day', 'new years eve'],
			  scores: [35,21,11,3,2,1]
			}
];

/*//Game Timer:
	var game = {score: 0, ellapsedTime: 3, messages: ''};
	intervalID = setInterval(function(){
		game.ellapsedTime--;
		$('#game-time').text(' ' + game.ellapsedTime);
		if (game.ellapsedTime<=0) {
	        clearInterval(intervalID);
	    };
	},1000);*/


//"start game" button events
$("#startgamebutton").click(function() {
	// randomize the question displayed in the array
	currentQuestion = Math.floor(Math.random()*qData.length);
	var question = qData[currentQuestion].question;
	$("#instruction1").hide();
	// $("#instruction2").show().delay(3000).fadeOut();
	$(".startGame").hide();
	$("#answerArea").show(0)
	$("#question").show(0).text(question);
});

//add enter key feature when submitting data in answer input field
	$("#answerInput").keyup(function(event){
    if(event.keyCode == 13){
        $(".answerInputButton").click();
    }
	});

// create an event listener for button-image (the answer input field) when it's clicked
$(".answerInputButton").click(function(){
	// console log the answer from the input field
	var answerData = $("#answerInput").val()
	//check if answer inputted is in the array of correct answers
	var isInArray = ($.inArray(answerData, qData[currentQuestion].answers) !== -1)
	//get the index of the correct answer from the array
	var indexOfAnswer = qData[currentQuestion].answers.indexOf(answerData)
	//get the score of the answer based on location of index of answer
	var answerScore = qData[currentQuestion].scores[indexOfAnswer]

	console.log(answerData)

	if(isInArray) {
		console.log("You got it right")
		//console.log the score that corresponds to the index of the answer
		console.log(answerScore)
		//flip corresponding answer tile with the answer and score
			if (indexOfAnswer === 0) {
				$("#frontAnswer1").html(answerData + answerScore);
			} else if (indexOfAnswer === 1) {
				$("#frontAnswer2").html(answerData + answerScore);
			} else if (indexOfAnswer === 2) {
				$("#frontAnswer3").html(answerData + answerScore);
			} else if (indexOfAnswer === 3) {
				$("#frontAnswer4").html(answerData + answerScore);
			} else if (indexOfAnswer === 4) {
				$("#frontAnswer5").html(answerData + answerScore);
			} else if (indexOfAnswer === 5)
				$("#frontAnswer6").html(answerData + answerScore);
	} else {
	console.log ('Try again')
	$(".redstrikes").show().delay(2000).fadeOut()
	}
})

/*	function checkAnswer(){
		if(!$('.input-buttons').is(':visible')) {
			$('#startGameButton').click(function(){
				$('messages').hide();
				$("#question1").show();
		})
		}
	};*/


/*//answer input values	
	function flipTile(){
		var $q1a1 = $('#frontAnswer1')
		var $q1a2 = $('#frontAnswer2')
		var $q1a3 = $('#frontAnswer3')
		var $q1a4 = $('#frontAnswer4')
		var $q1a5 = $('#frontAnswer5')
		var playerAnswer = $("#answerInput").val().toLowerCase();
	
		if ((playerAnswer === "no") || (playerAnswer === "no dog")) {
	    	$q1a1.html('<div class="answer-text">No</div>');
	    } else if
	    	((playerAnswer === "sit") || (playerAnswer === "sit down")) {
	    	$q1a2.html('<div class="answer-text">Sit</div>');
	    } else if
	    	(playerAnswer === "stop") {
	    	$q1a3.html('<div class="answer-text">Stop</div>');
	    } else if
	    	(playerAnswer === "down") {
	    	$q1a4.html('<div class="answer-text">Down</div>');
		} else if
	    	(playerAnswer === "fetch") {
	    	$q1a5.html('<div class="answer-text">Fetch</div>');
	    } else if
	    	(playerAnswer === "off") {
	    	$q1a6.html('<div class="answer-text">Off</div>');
	    } else if 
	    	$("#1strike").show().hide(3000);
	    };*/

// -----------------------------------------------------------
/*//Family 1 Last Name switch from input field to name
	$("#family1-button").click(function() {
	  var playerLastName = $("#family1-name").val();
	  $("#family1-name").hide();
	  $("#family1-button").hide();
	  $("#family1-name-output").show().text(playerLastName + " Family");
	});



//Family 2 Last Name switch from input field to name
	$("#family2-button").click(function() {
	  var playerLastName = $("#family2-name").val();
	  $("#family2-name").hide();
	  $("#family2-button").hide();

	  $("#family2-name-output").show().text(playerLastName + " Family");
	});
// -----------------------------------------------------------

*/
//Player 1 name switch from input field to name
	$("#player1-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#player1-button").click();
    }
	});


	$("#player1-button").click(function() {
	  var playerName = $("#player1-input").val();
	  $("#player1-input").hide();
	  $("#player1-button").hide();

	  $("#player1-name-output").show().text(playerName);
	});


//Player 2 name switch from input field to name
	$("#player2-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#player2-button").click();
    }
	});

	$("#player2-button").click(function() {
	  var playerName = $("#player2-input").val();
	  $("#player2-input").hide();
	  $("#player2-button").hide();

	  $("#player2-name-output").show().text(playerName);
	});


//Player 3 name switch from input field to name
	$("#player3-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#player3-button").click();
    }
	});

	$("#player3-button").click(function() {
	  var playerName = $("#player3-input").val();
	  $("#player3-input").hide();
	  $("#player3-button").hide();

	  $("#player3-name-output").show().text(playerName);
	});


//Player 4 name switch from input field to name
	$("#player4-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#player4-button").click();
    }
	});

	$("#player4-button").click(function() {
	  var playerName = $("#player4-input").val();
	  $("#player4-input").hide();
	  $("#player4-button").hide();
	  $("#player4-name-output").show().text(playerName);
	});

// Next steps:
/* 	
	- replace inner text? of answer tiles with the value of the correct answer
	- switch player turns and animate current player
	- check number of strikes and show appropriate red strikes
	- winner of round guesses all answers
	- timer on each turn

*/

