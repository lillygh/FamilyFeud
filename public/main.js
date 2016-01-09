
var player1Name = "", player2Name = ""
var hasWinner = 0
var strikeCount = 0

// -----------------PLAYER NAMES------------------------------------------

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

// --------------------SET WHO GOES FIRST-----------------------------------
// set the turn of the player

function gameMsg(x){
	return $("#instruction3").show().text(x).fadeOut(8000)
}

function setTurn(){
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(r==1){
		player1Name = $("#player1-input").val().toUpperCase()
		turn = player1Name;
		gameMsg(player1Name + " goes first. You have 1 minute and 3 chances to answer the following question. Get ready!");
		$("#answer1Input").fadeIn(8000)
		$("#button-image1").fadeIn(8000)
	}
	else{
		player2Name = $("#player2-input").val().toUpperCase();
		turn = player2Name;
		gameMsg(player2Name + " goes first. You have 1 minute and 3 chances to answer the following question. Get ready!");
		$("#answer2Input").fadeIn(8000)
		$("#button-image2").fadeIn(8000)
	}
}

// --------------------QUESTION/ANSWERS---------------------------------------
//question and answer data

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

	// randomize the question displayed in the array
	currentQuestion = Math.floor(Math.random()*qData.length);
	var question = qData[currentQuestion].question;
	$("#instruction1").hide();
	$(".startGame").hide();
	$("#answerArea").show(8000)
	$("#question").show(8000).text(question);
	
	gameTimer()
	
	//alert the user if they refresh the page during the game
	window.onbeforeunload = function(e) {
  	return 'The game is currently in play.';
	}

});

// ----------------------ANSWER INPUT-------------------------------------
//add enter key feature when submitting data in answer input field

	$("#answer1Input").keyup(function(event){
    if(event.keyCode == 13){
        $(".answerInputButton").click();
    }
	});

	$("#answer2Input").keyup(function(event){
    if(event.keyCode == 13){
        $(".answerInputButton").click();
    }
	});

// create an event listener for the answer input field when it's clicked
$(".answerInputButton").click(function(){
	var answerData = $("#answerInput").val()
	//check if answer inputted is in the array of correct answers
	var isInArray = ($.inArray(answerData, qData[currentQuestion].answers) !== -1)
	//get the index of the correct answer from the array
	var indexOfAnswer = qData[currentQuestion].answers.indexOf(answerData)
	//get the score of the answer based on location of index of answer
	var answerScore = qData[currentQuestion].scores[indexOfAnswer]
	//the text of the answer tile when the answer is right
	var corrAnswer = answerData + " " + answerScore
	
	// console log the answer from the input field
	console.log("your answer is ", answerData)

	if(isInArray) {
		console.log("You got it right")
		//console.log the score that corresponds to the index of the answer
		console.log("you received ", answerScore," points")
		// show green checkmark
		$("#greencheckmark").show().delay(2000).fadeOut()
		//flip corresponding answer tile with the answer and score
			if (indexOfAnswer === 0) {
				$("#frontAnswer1").removeClass("answerTile").addClass("rightAnswer").html(corrAnswer);
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
		console.log ('Try again')
		$("#onestrike").show().delay(2000).fadeOut()
		strikeCount ++
		console.log("number of strikes is ", strikeCount)
	}
	// if strikeCount === 3, run switch players function
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
	- switch player turns and animate current player
	- check number of strikes and show appropriate red strikes
	- keep score in scorebox
	- winner of round guesses all answers
	- timer on each turn
	- add 2 and 3 strikes
	- add an error message if entry is clicked without a value in the input field
	- fix bug where values in the name fields count as inputted values (doesn't require submit)
	- design flipped answer tiles
*/

