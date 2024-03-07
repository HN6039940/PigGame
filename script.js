'use strict';
// count
let current, keepScore, activatePlayer, playing;

// totalscore
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const score = document.querySelectorAll('.score');

score1.textContent = 0;
score2.textContent = 0;
score.textContent = 0;

// current (score)
const current1 = document.querySelector('#current--0');
const current2 = document.getElementById('current--1');

// playername
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

// btn
const Newbtn = document.querySelector('.btn--new');
const Rollbtn = document.querySelector('.btn--roll');
const Holdbtn = document.querySelector('.btn--hold');

// dice
const Dice = document.querySelector('.dice');
Dice.classList.add('hidden');

// function
const reset = function () {
  keepScore = [0, 0];
  current = 0;
  activatePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  Dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
reset();

const Toggle = function () {
  current = 0;
  document.getElementById(`current--${activatePlayer}`).textContent = 0;
  activatePlayer = activatePlayer === 0 ? 1 : 0;
  // css切り替え
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

const diceroll = function () {
  if (playing) {
    let Randomnumber = Math.trunc(Math.random(1) * 6) + 1;
    Dice.classList.remove('hidden');
    Dice.src = `dice-${Randomnumber}.png`;

    if (Randomnumber !== 1) {
      current += Randomnumber;
      document.getElementById(
        `current--${activatePlayer}`
      ).textContent = current;
    } else {
      Toggle();
    }
  }
};

const hold = function () {
  if (playing) {
    keepScore[activatePlayer] += current;
    document.getElementById(`score--${activatePlayer}`).textContent =
      keepScore[activatePlayer];

    if (keepScore[activatePlayer] >= 100) {
      document
        .querySelector(`.player--${activatePlayer}`)
        .classList.add('player--winner');
      Dice.classList.add('hidden');
      playing = false;
    }
    Toggle();
  }
};

//Event
Rollbtn.addEventListener('click', diceroll);
Holdbtn.addEventListener('click', hold);
Newbtn.addEventListener('click', reset);
