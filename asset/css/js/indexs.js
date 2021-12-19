var questions = [
    {
        question: 'Which of the following is true about variable naming conventions in JavaScript?',
        choices: ["A - JavaScript variable names must begin with a letter or the underscore character.",
                "B - JavaScript variable names are case sensitive.",
                "C - Both of the above.",
                "D - None of the above."],
        answer: "C - Both of the Above"
    },
    {
        question:'Can you assign a anonymous function to a variable?',
        choices:["A - true",
                "B - false" ],
        answer:"A - true",
    },

    {
        question:'Which built-in method returns the character at the specified index?',
        choices:["A - characterAt()",
                "B - getCharAt()",
                "C - charAt()",
                "D - None of the above."],
        answer:"C - charAt()"
    },
    {
        question:'Which built-in method reverses the order of the elements of an array?',
        choices:["A - changeOrder(order)",
                "B - reverse()",   
                "C - sort(order)",
                "D - None of the above."],
        answer:"B - reverse()",
    },
    {
        question:'Which of the following function of Array object adds and/or removes elements from an array?',
        choices:["A - toSource()",
                "B - sort()",
                "C - splice()",
                "D - unshift()"],
        answer:"C - splice()",
    }

];
// Declared variables
var score = 0;
var questionIndex = 0;

// Start working code 
// Declared variables
var currentTime = document.querySelector("#t-seconds");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 15 seconds per question:
var secondsLeft = 75;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ol");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
        questionsDiv.className ="questions"
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.className = "answer"
        listItem.addEventListener("click", (compare));
        
    })
}





// Event to compare choices with answer
function compare(event) {
    var element = event.target;
   

    if (element.matches("li")) {
        

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent === questions[questionIndex].answer) {
           
                score = score++ + 5;
            
            createDiv.textContent = "Correct!";
            createDiv.className = "right";
            
            
            
           
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            if (score >= 0){
                score = score;
            } 
        
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
            createDiv.className = "wrong";
            
        }
        

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" 
        createDiv.className = "wrong";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
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

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + score;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    createInput.className= "input-box"

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    createSubmit.className = "btn2"

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null || initials === "") {

            alert("Enter Initials before proceeding");

        } else {
            var finalScore = {
                initials: initials,
                score: score
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
            // Travels to final page
            window.location.replace("./highscore.html");
        }
    });

}

