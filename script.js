"use strict";
// Variable declarations
const score0 = document.querySelector("#score0");
const scorel = document.querySelector("#score1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector("#new");
const btnroll = document.querySelector("#roll");
const btnhold = document.querySelector("#hold");
const cur0 = document.querySelector("#current0");
const cur1 = document.querySelector("#current1");
const win = document.querySelector("#win");
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");
let scoreArr = [0, 0];
let state = true;
let activePlayer = 0;
let curscore = 0;

function init() {
  scoreArr = [0, 0];
  state = true;
  activePlayer = 0;
  curscore = 0;
  score0.textContent = curscore;
  score1.textContent = curscore;
  cur0.textContent = curscore;
  cur1.textContent = curscore;
  win.textContent = "";
  win.classList.add("hidden");
  player0.classList.remove("bg-success");
  player1.classList.remove("bg-success");
  player0.classList.add("player-b0");
  player1.classList.add("player-b1");
}

if (state) {
  const playerSwitch = function () {
    curscore = 0;
    document.querySelector(`#current${activePlayer}`).textContent = curscore;
    activePlayer = activePlayer === 0 ? 1 : 0;
  };

  // Rolling Dice---------------
  // Creating a random dice number
  btnroll.addEventListener("click", function () {
    if (state) {
      let dice = Math.trunc(Math.random() * 6) + 1;
      console.log(dice);
      // displaying the corresponding image
      diceEl.classList.remove("hidden");
      diceEl.src = `image/dice-${dice}.png`;
      if (dice != 1) {
        curscore += dice;
        document.querySelector(`#current${activePlayer}`).textContent =
          curscore;
      } else {
        playerSwitch();
      }
    }
  });

  btnhold.addEventListener("click", function () {
    if (state) {
      scoreArr[activePlayer] += curscore;
      document.querySelector(`#score${activePlayer}`).textContent =
        scoreArr[activePlayer];

      if (scoreArr[activePlayer] >= 100) {
        document.querySelector(`#score${activePlayer}`).textContent =
          scoreArr[activePlayer];
        document.querySelector(`#current${activePlayer}`).innerText = 0;
        win.innerText = `Player ${activePlayer === 0 ? 1 : 2} has won`;
        if (activePlayer === 0) {
          player0.classList.add("bg-success");
          player0.classList.remove("player-b0");
        } else {
          player1.classList.add("bg-success");
          player1.classList.remove("player-b1");
        }
        diceEl.classList.add("hidden");
        win.classList.remove("hidden");
        state = false;
      } else {
        playerSwitch();
      }
    }
  });
}

btnNew.addEventListener("click", function () {
  init();
});
