var state = {
	qCounter: 1,
	cAns: 0,
	incorrectAns: 0
}

function nextQuestion() {
	console.log('made it to next question');
	$('.qAndAContent').css('visibility','hidden');
    //$('#js-quiz-form').hide();                
	$("#submit-answer").hide();
	$("#next-question").show();
}

function correctAnswer() {
	var cAnsContent = `<span id="correct answer">  Your answer is correct!  Yay!</span><br><br>`
    $('.feedback').append(cAnsContent);
    state.cAns +=1;
    document.getElementById('correct-answers').innerHTML = state.cAns + ' correct answers.  '; 
    document.getElementById('incorrect-answers').innerHTML = state.incorrectAns + ' incorrect answers'; 
    nextQuestion();
}

function incorrectAnswer() {
	console.log('made it to incorrectAnswer');
	var iAnsContent = `<span id="incorrect answer">  Your answer is incorrect.  The correct answer is ${qContent[2].correctChoice}</span><br><br>`
    $('.feedback').append(iAnsContent);
    state.incorrectAns += 1;
    document.getElementById('correct-answers').innerHTML = state.cAns + ' correct answers.  '; 
    document.getElementById('incorrect-answers').innerHTML = state.incorrectAns + ' incorrect answers'; 
    nextQuestion();
}

function userAnswer(){
	$('#js-quiz-form').on("submit", function(event) {
		event.preventDefault();
		var selectedAnswer = $('input[name="answer"]:checked').parent().text();	
		if (selectedAnswer) {
			//check to see if the selectedAnswer matches qContent[for selected object in array].correctChoice
			if (selectedAnswer == (qContent[2].correctChoice)) {
				correctAnswer();	
			} else {
				incorrectAnswer(); 
			};
		} else {
			$('#make-selection').show();
		}
        
    });
}

function showQuestion() {
	//removes start button and shows form with first question.
	var qAndAContent = `<span class="quiz-question">${qContent[2].q}</span><br><br>
        <div class="quiz-answer-radiobuttons">
          <label><input type="radio" name="answer" id="answer1" >${qContent[2].choices[0]}</label><br>
          <label><input type="radio" name="answer" id="answer2" >${qContent[2].choices[1]}</label><br>
          <label><input type="radio" name="answer" id="answer3" >${qContent[2].choices[2]}</label><br>
          <label><input type="radio" name="answer" id="answer4" >${qContent[2].choices[3]}</label><br>
        </div>`;
     $('.qAndAContent').append(qAndAContent);
}

function startQuiz() {
	//removes start button and shows form.
	$(".start-quiz").click(function() {
	  $('.start-quiz').remove();
	  $(".container").removeAttr("hidden");
	});
}


function quizApp() {
	//console.log('made it to quizApp');
	startQuiz(); //removes start button and shows form.
	showQuestion(); //shows the first question.
	userAnswer();
}

$( document ).ready(function() {
    //console.log( "ready!" );
    quizApp();

});

