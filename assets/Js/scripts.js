let player;

function playerPrompt() {
  var txt;
  let player = prompt("Please enter your name: ", "");
  txt = "Good luck " + player + " !";
  document.getElementById("player-name").innerHTML = txt;

}
let start = document.querySelector("#start");
let playerName = document.querySelector("#player-name");
let moves = document.querySelector("#moves");

let lifes = document.querySelector("#lifes-left");
let lifesLeft;

start.addEventListener('click', (event) => {
  lifes.innerHTML = "3";
  moves.innerHTML = "1";
  play();
});




let order = [];
let playerOrder = [];
let flash; //lifes
let turn;
let good;
let compTurn;
let intervalId;

let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#lifes");
const redField = document.querySelector("#red-field");
const blueField = document.querySelector("#blue-field");
const yellowField = document.querySelector("#yellow-field");
const greenField = document.querySelector("#green-field");






function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  lifesLeft = 3;
  good = true;
  
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 700);
}

function gameTurn() {
  on = false;
  

  if (flash == turn) {
    
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
    gameOver();
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("sound1");
    audio.play();
  }
  noise = true;
  redField.style.backgroundColor = "red";
}

function two() {
  if (noise) {
    let audio = document.getElementById("sound2");
    audio.play();
  }
  noise = true;
  blueField.style.backgroundColor = "blue";
}

function three() {
  if (noise) {
    let audio = document.getElementById("sound3");
    audio.play();
  }
  noise = true;
  yellowField.style.backgroundColor = "#e8ff99";
}

function four() {
  if (noise) {
    let audio = document.getElementById("sound4");
    audio.play();
  }
  noise = true;
  greenField.style.backgroundColor = "#6aff4c";
}

function clearColor() {
  redField.style.backgroundColor = "#A70000";
  blueField.style.backgroundColor = "#313A89";
  yellowField.style.backgroundColor = "#eae609";
  greenField.style.backgroundColor = "#008E06";
}

function flashColor() {
  redField.style.backgroundColor = "red";
  blueField.style.backgroundColor = "blue";
  yellowField.style.backgroundColor = "#e8ff99";
  greenField.style.backgroundColor = "#6aff4c";
}

redField.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 200);
    }
  }
});

blueField.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

yellowField.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

greenField.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    lifesLeft--;
    lifes.innerHTML = lifesLeft;
    setTimeout(() => {
      
      clearColor();
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 700);
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    moves.innerHTML = turn;
    intervalId = setInterval(gameTurn, 700);
  }
  gameOver();
}

function winGame() {
  flashColor();
  
  on = false;
  win = true;
}

function gameOver() {
  if (lifesLeft === 0) {
    flashColor();
    on = false;
    win = false;
    clearInterval();
  }
};