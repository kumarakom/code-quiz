// Var array  with questions and answers 
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];
// Declared variables
var score = 0;
var questionPosition = 0;

// Start of code 

// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var main = document.querySelector("#main");

// Seconds left is 20 seconds per question:
var secondsRemaining = 101;

// Keep track of seconds lapsed
var tempSeconds = 0;

// Holds penalty time
var penalty = 10;

// Creates new element ; following best practises as per internet and class
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
// From : https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (tempSeconds === 0) {
        tempSeconds = setInterval(function () {
            secondsRemaining--;
            currentTime.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(tempSeconds);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionPosition);
});

// Provide question and choice  
function render(questionPosition) {
    // Clears existing data ; great example from class 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Read question and choice from array 
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var askQuestion = questions[questionPosition].title;
        var userChoices = questions[questionPosition].choices;
        questionsDiv.textContent = askQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compareAnswer));
    })
}
// Compare choices with valid answer
function compareAnswer(event) {
    var element = event.target;
   
    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionPosition].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionPosition].answer;
        } else {
            // Will deduct -10 seconds off secondsRemaining for wrong answers
            secondsRemaining = secondsRemaining - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionPosition].answer;
        }

    }
    // Question postion:  determines which question user is on
    questionPosition++;

    if (questionPosition >= questions.length) {
        // When all questions are asked, print final score 
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionPosition);
    }
    questionsDiv.appendChild(createDiv);

}
// All done create the final page 
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates seconds remaining and replaces it with score
    if (secondsRemaining >= 0) {
        var timeRemaining = secondsRemaining;
        var createP2 = document.createElement("p");
        clearInterval(tempSeconds);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    // Stated by example from: 
    // https://www.codegrepper.com/code-examples/javascript/dynamically+set+label+attribute+javascript
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
        // Now append 
        questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
        // Now append 
        questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
        // Now append 
        questionsDiv.appendChild(createSubmit);


    // Use local storage to capture initial and score 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null || initials === '') {

            alert("Please enter your initials");

        } else {
            var finalScore = {
                initials: initials,
                timeScore: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) { 
                allScores = []; 
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Go to highscores page 
            window.location.replace("./highscores.html");
        }
    });

}


