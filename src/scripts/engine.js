const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#scores"),
        lives: document.querySelector("#total-lives"),
        startButton: document.querySelector("#start-button"),
    },
    values: {
        timerId: null,
        countDownTimerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
        gameStarted: false,
    },
    
    actions: {
        
    },
};

let audio = new Audio("./src/audios/hit.m4a")

function countDown() { 
    if (state.values.currentTime > 0) { 
        state.values.currentTime--; 
        state.view.timeLeft.textContent = state.values.currentTime; 
    } else { 
        endGame("Game over! O seu resultado foi: " + state.values.result);
    } 
}

function playSound() {
    audio.volume = 0.2;
    audio.currentTime = -10;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function endGame(message) { 
    clearInterval(state.values.timerId); 
    clearInterval(state.values.countDownTimerId); 
    state.values.gameStarted = false; 
    alert(message);
}

function decreaseLives() {
    if (state.values.lives > 0) {
      state.values.lives--;
      state.view.lives.textContent = state.values.lives;
    }
    if (state.values.lives === 0) {
      endGame("Você perdeu todas as vidas!");
    }
}

document.addEventListener("mousedown", (event) => {
    const isEnemy = event.target.classList.contains("enemy");
    if (!isEnemy && state.values.gameStarted) {
      decreaseLives();
    }
});

function resetGame() {
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownTimerId);
    
    state.values.currentTime = 60;
    state.values.result = 0;
    state.view.score.textContent = 0;
    state.view.timeLeft.textContent = 60;
    state.values.lives = 3; 
    state.view.lives.textContent = state.values.lives;
    state.values.gameStarted = false
}  

function startGame() {
    if (!state.values.gameStarted) { 
        resetGame();
        state.values.gameStarted = true; 
        
        randomSquare();
        state.values.countDownTimerId = setInterval(countDown, 1000); 
        state.values.timerId = setInterval(randomSquare, 1000); 
    }
}

function init() {
    addListenerHitBox();
    state.view.startButton.addEventListener("click", startGame);
}

init();