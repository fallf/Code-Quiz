// logic track time
var time = 5
var timerId;
//start the quiz 
// determine if the user wrote the right question
// determine the score as well as 

const questionsEL = document.getElementById("question");
const timerEL = document.getElementById("timer");
//var choices div
//var start button 
// submit button for line 25
//var line 24 intial
//function 

const startBt = document.getElementById("start-btn");

function Start(){
    timerEL.innerHTML = time
timerId = setInterval(countDown, 1000)

//Hide All starter code
//Show question
//We do this by using document.getElementByClass (intro)
}

function countDown(){
    time--

    timerEL.innerText = time
    
 if (time <= 0){
     stop()
 }


}

function stop(){
    clearInterval(timerId)
    console.log('Quiz has Stopped')
}
startBt.onclick = Start