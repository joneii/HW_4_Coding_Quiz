//HTML element variables
var beginButton = document.getElementById("beginQuiz");
var instructionsHTML = document.getElementById("instructions");
var TimeOutHTML = document.getElementById("TimeOut");
var questionsHTML = document.getElementById("question");
var finishHTML = document.getElementById("finish");
var timer = document.getElementById("timer");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var answer = document.getElementById("checkAnswer");
var username1 = document.getElementById("exampleFormControlTextarea1");
var username2 = document.getElementById("exampleFormControlTextarea2");
var questionTitle = document.getElementById("question-title");
var yourScore = document.getElementById("yourScore");
var timeoutScore = document.getElementById("timeoutScore");
var finishsubmit = document.getElementById("userSubmit");
var timeoutsubmit = document.getElementById("timeoutSubmit");
var scoreList = document.getElementById("scoreList");

//Amount of seconds to do the quiz
var time = 90;

//Variable that will later be used for setIntercval
var interval;

//Variable to determine whether or not the quiz was finished by
//answering all questions or timeout
var quizFinish = false;

//States the current Question number
var currentQuestion = 0;

//Variable to store score
var score = 0;

//Array containing all values from the Local Storage
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

//Variable to store the JSON object used for the high scores
var totalScore = {
    name : "",
    highscore: ""
}

//Onload event listeners
window.addEventListener("load", showhighScores);
window.addEventListener("load", screenLoad);

//Onload hide sections
function screenLoad(){
    questionsHTML.style.display = "none";
    finishHTML.style.display = "none";
    TimeOutHTML.style.display = "none";
    choice1.style.display = "none";
    choice2.style.display = "none";
    choice3.style.display = "none";
    choice4.style.display = "none";
}

//onload the Highscores from the localStorage into the highscores list
function showhighScores(){
    //Sorts the Highscores
    highscores.sort((a,b) => (a.highscore > b.highscore ? -1 : 1));

    //Adds the elements to the ordered list element in the HTML
    for (var i = 0; i < highscores.length; i++) {
        var entry = document.createElement("li");  
        entry.className = "list-group-item";
        var values = document.createTextNode(highscores[i].name + ": " + highscores[i].highscore); 
        entry.appendChild(values);
        scoreList.appendChild(entry);
    }
}


//Function for starting the quiz
function startQuiz(){
    //Displays the timer
    displayTime();
    //Hides the Instructions HTML div
    hideInstructions();
    //unHides the Question HTML div
    showQuestions();

    //Creates the interval variable that runs countDown every second
    interval = setInterval(function(){
                countDown();
            }, 1000);

}

//Displays the current time
function displayTime(){
    timer.innerText ="Time Left: " + time;
}

//Clears the instructions from the screen and begins the quiz
function hideInstructions(){
    instructionsHTML.style.display = "none";
}

//Begins quiz by bringing in the questions
function showQuestions(){
    //Unhides the Questions HTML
    questionsHTML.style.display = "block";
    choice1.style.display = "block";
    choice2.style.display = "block";
    choice3.style.display = "block";
    choice4.style.display = "block";
    //Fills in the information to the HTML elements
    questionTitle.textContent = questions[currentQuestion].title;
    choice1.textContent = questions[currentQuestion].choices[0];
    choice2.textContent = questions[currentQuestion].choices[1];
    choice3.textContent = questions[currentQuestion].choices[2];
    choice4.textContent = questions[currentQuestion].choices[3];
}

//Function continues counting down the time until the quiz ends
function countDown(){
    //Ends the quiz when timer reaches 0 or all questions have
    //been answered
    time = time - 1;

    //If the timer is <= 0 
    if(time <= 0){
        time = 0;
        displayTime();
        endQuiz();
    }
    //else If last question answered
    else if(quizFinish){
        displayTime();
        endQuiz();
    }
    //Keep Going
    else{
        displayTime();
    }
}



//Checks to see if answer clicked is correct
function answerChecker(ansNum){
    
    //check to see if answer chosen is correct
    if(questions[currentQuestion].answer == questions[currentQuestion].choices[ansNum]){
        answer.textContent = "Correct!";
        score += 10;
    }
    else{
        answer.textContent = "Wrong!";
        time -= 15;
    }

    //Increments it to the next question
    currentQuestion++;
    //If reached the last question
    if(currentQuestion == 5){
        quizFinish = true;
        score += time;
        hideQuestions();
        endQuiz();
    }
    else{
        //Prints the new questions into the corresponding locations
        showQuestions();
    }
    
    
}


//Function that ends the quiz, ask user for initials and post
//to leader board.
function endQuiz(){
    //Ends the timer
    clearTimer();
    //Hides the Questions HTML elements
    hideQuestions();
    //Displays the current time
    displayTime();
    //Checks to see if all answers were answered or if the time ran out
    if(quizFinish){
        showresults();
    }
    else{
        showTimeOut();
    }
}

//Stops the timer
function clearTimer(){
    clearInterval(interval);
}

//Hides the Questions HTML elements
function hideQuestions(){
    questionsHTML.style.display = "none";
}

//When all the questions have been answered this HTML element shows up
function showresults(){
    finishHTML.style.display = "block";
    yourScore.textContent = score;
}

//When the timer has ran out this html element shows up
function showTimeOut(){
    TimeOutHTML.style.display = "block";
    timeoutScore.textContent = score;
}

//Makes sure a username is filled out before submiting the high score
function submitValidator(){
    
    //Checks to see which HTML element to reference
    if(quizFinish){
        if(username1.value == ""){
            alert("Please fill in the Username to associate with your score!");
        }
        else{
            submitScore(username1.value);
        }
    }
    else{
        if(username2.value == ""){
            alert("Please fill in the Username to associate with your score!");
        }
        else{
            submitScore(username2.value);
        }
    }
}



//Functions to submit the scores
function submitScore(name){
    totalScore.name = name;
    totalScore.highscore = score;
    highscores.push(totalScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    resetPage();
}

//Function used to reload the page
function resetPage(){
    location.reload();
}


//All event listeners for the page
beginButton.addEventListener("click", startQuiz);
choice1.addEventListener("click", function(){answerChecker(0)});
choice2.addEventListener("click", function(){answerChecker(1)});
choice3.addEventListener("click", function(){answerChecker(2)});
choice4.addEventListener("click", function(){answerChecker(3)});
finishsubmit.addEventListener("click", submitValidator);
timeoutsubmit.addEventListener("click", submitValidator);



