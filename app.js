
// grabbing all the required elements
const squares = document.querySelectorAll(".square")
const mole = document.querySelectorAll(".mole")
const timeLeft = document.querySelector("#time-left")
const score = document.querySelector("#score")
const statusDisplay = document.querySelector(".status")
const startButton = document.querySelector(".start")
const timerHeading = document.querySelector(".timer")
const scoreboard = document.querySelector(".scoreboard")

// declaring all the variables
let timerId = null
let result = 0
let hitPosition
let currentTime = 60
let countDownTimerId
let reset
let finalScore



// Each time mole is smashed -> green color blinks once and score increases by 1 
squares.forEach(square => {
    square.addEventListener("mousedown", () => {
        if (square.id === hitPosition){
            square.classList.add("bingo");
            setTimeout(function(){
                square.classList.remove("bingo");
            }, 100);
            score.innerHTML = ++result
            hitPosition = null 
        }
    })
})

// adding mole to randomly selected square
function randomSquare() {
// removing mole class
    squares.forEach(square => {
        square.classList.remove("mole")
    })
// choosing a random square for mole
    let randomSquare = squares[Math.floor(Math.random() * 16)]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
}

// moving the mole randomly after every 500ms
function moveMole() {
    // for moving mole after every 500ms
     timerId = setInterval(randomSquare, 500)
     
    // for timer display 
     countDownTimerId = setInterval(countDown, 1000)

     // disappear start button and display reset button
     startButton.classList.add("invisible")
     reset = document.createElement("button")
     reset.textContent = "Reset"
     reset.classList.add("reset")
     reset.addEventListener("click",resetGame)
     statusDisplay.insertBefore(reset, statusDisplay.children[1])

    
}

// timer display
function countDown() {
// decreasing the timer 
    currentTime--
    timeLeft.textContent = currentTime

// when timer reaches zero
    if (currentTime == 0) {

        // remove both, mole movement and timer setInverals()
        clearInterval(countDownTimerId)
        clearInterval(timerId)     

        // make them invisible - timer, score, mole
        timerHeading.classList.add("invisible")
        scoreboard.classList.add("invisible")        
        squares[hitPosition - 1].classList.remove("mole")

        // adding another element to display result
        finalScore = document.createElement("h3")
        finalScore.textContent = "Your final Score is " + result + "."
        statusDisplay.insertBefore(finalScore,statusDisplay.children[0])
        reset.classList.add("align-reset")
        result = 0

    }
}

// resetting everything to orinal state
function resetGame() {
    if (finalScore) {
    finalScore.classList.add("invisible")
    }
    score.textContent = 0
    timeLeft.textContent = "60"
    result = 0
    reset.classList.remove("align-reset")
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    reset.classList.add("invisible")
    squares[hitPosition - 1].classList.remove("mole")
    startButton.classList.remove("invisible")
    scoreboard.classList.remove("invisible")
    timerHeading.classList.remove("invisible")
    
    timerId = null
    hitPosition = null
    currentTime = 60
    countDownTimerId = null

}





