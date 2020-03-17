//Variables selecting the timer location and Begin Quiz button
var beginButton = document.getElementById("beginQuiz");
var instructionsHTML = document.getElementById("instructions");
var questionsHTML = document.getElementById("question");
var timer = document.getElementById("timer");
var time = 90;
var interval;
var quizFinish = false;



//Function for starting the quiz
function startQuiz(){
    
    displayTime();
    hideInstructions();
    showQuestions();

    interval = setInterval(function(){
                countDown();
            }, 1000);
    
}

//Function continues counting down the time until the quiz ends
function countDown(){
    //Ends the quiz when timer reaches 0 or all questions have
    //been answered
    if(time == 0 || quizFinish){
        endQuiz();
    }
    else{
        time = time - 1;
        displayTime();
    }
}

//Displays the current time
function displayTime(){
    timer.innerText ="Time Left: " + time;
}

//Stops the timer
function clearTimer(){
    clearInterval(interval);
}

//Clears the instructions from the screen and begins the quiz
function hideInstructions(){
    instructionsHTML.style.display = "none";
}

//Begins quiz by bringing in the questions
function showQuestions(){
    questionsHTML.style.display = "block";
}

function hideQuestions(){
    questionsHTML.style.display = "none";
}

//Function that ends the quiz, ask user for initials and post
//to leader board.
function endQuiz(){
    clearTimer();
    hideQuestions();
    
    if(quizFinish){
        showResults();
    }
    else{
        showTimeOut();
    }
}

function showresults(){
    //To-DO
}

function showTimeOut(){
    //To-Do
}

//Event listener for the Begin Quiz button
beginButton.addEventListener("click", startQuiz);



//TO - DO list
//- html for questions
//- html for timeout scenario
//- html for finish all questions scenario
//- html for clear leaderboard button
//- css style on everything
//- html get rid leaderboard link
//- js for leaderboard
//- js to show quesiton
//- js for incorrect answer scenario
//- js for correct answer scenario
//- js for score management
//- js to bring instructions back after quiz finishes