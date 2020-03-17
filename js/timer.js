//Variables selecting the timer location and Begin Quiz button
var timer = document.getElementById("timer");
var beginButton = document.getElementById("beginQuiz");

//Variable declarations for questions
var questions = [
    {
      title: "Question 1:",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      answer: "answer from choices"
    },
    {
      title: "Question 2:",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      answer: "answer from choices"
    }
  ]
  [  
  {
      title: "Question 3:",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      answer: "answer from choices"
    }
  ]
  [
    {
      title: "Question 4:",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      answer: "answer from choices"
    }
  ]
  [
    {
      title: "Question 5:",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      answer: "answer from choices"
    }
  ];


//Function for starting that quiz
function startQuiz(){
    

    var time = 90;
    timer.innerText ="Time Left: " + time;


    setInterval(function(){
        time = time - 1;
        timer.innerText ="Time Left: " + time;
    }, 1000);

    var instructions = document.getElementById("instructions");
    instructions.parentNode.removeChild(instructions);



    
}


//Event listener for the Begin Quiz button
beginButton.addEventListener("click", startQuiz);


