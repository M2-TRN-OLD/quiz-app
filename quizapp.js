var state = {
	qCounter: 0,
	cAns: 0,
	incorrectAns: 0,
	currentQ:""
	
}

function correctAnswer() {
    document.getElementById('answerdetail').innerHTML = 'Your answer is correct!  Yay';
    state.cAns +=1;
    document.getElementById('correct-answers').innerHTML = state.cAns + ' correct answers.  '; 
    document.getElementById('incorrect-answers').innerHTML = state.incorrectAns + ' incorrect answers'; 
}

function incorrectAnswer() {
	 document.getElementById('answerdetail').innerHTML = 'Your answer is incorrect!  The correct answer is ${qContent[state.qCounter].correctChoice};
    state.incorrectAns += 1;
    document.getElementById('correct-answers').innerHTML = state.cAns + ' correct answers.  '; 
    document.getElementById('incorrect-answers').innerHTML = state.incorrectAns + ' incorrect answers';  
}

function userAnswer(){
	$('#js-quiz-form').on("submit", function(event) {
		event.preventDefault();
		var selectedAnswer = $('input[name="answer"]:checked').parent().text();	
		if (selectedAnswer) {
			//check to see if the selectedAnswer matches qContent[for selected object in array].correctChoice
			if (selectedAnswer == (qContent[state.qCounter].correctChoice)) {
				correctAnswer();	
			} else {
				incorrectAnswer(); 
			};
			removePrevious();
			setQuestion();
			showQuestion();
		} else {
			$('#make-selection').show();
		}
    });
}

function removePrevious() {
	$('.answerdetail').remove();
	$('#whichq').remove();
	$('.quiz-question').remove();
    $('.quiz-answer-radiobuttons').remove();

}

function setQuestion() {
	state.qCounter +=1; 
	state.currentQ =  `<span class="quiz-question">${state.qCounter}    ${qContent[state.qCounter].q}</span><br><br>
        <div class="quiz-answer-radiobuttons">
          <label><input type="radio" name="answer" id="answer1" >${qContent[state.qCounter].choices[0]}</label><br>
          <label><input type="radio" name="answer" id="answer2" >${qContent[state.qCounter].choices[1]}</label><br>
          <label><input type="radio" name="answer" id="answer3" >${qContent[state.qCounter].choices[2]}</label><br>
          <label><input type="radio" name="answer" id="answer4" >${qContent[state.qCounter].choices[3]}</label><br>
        </div>` 

}

function showQuestion() {
	//removes start button and shows form with first question.
	var whichq = `<span id="whichq">You are on question ${state.qCounter} out of ${qContent.length}.</span>`
	$('#qnumber').append(whichq);
     $('.qAndAContent').append(state.currentQ);
}

function startQuiz() {
	//removes start button and shows form.
	$('.start-quiz').click(function() {
	  $('.start-quiz').remove();
	  $('.container').removeAttr("hidden");
	});
}


function quizApp() {
	startQuiz(); //removes start button and shows form.
	setQuestion(); //set var currentQ to proper information.
	showQuestion(); //shows the first question.
	userAnswer();
}

$( document ).ready(function() {
    //console.log( "ready!" );
    quizApp();

});

