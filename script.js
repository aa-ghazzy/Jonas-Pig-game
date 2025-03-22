'use strict';

const player0Score = document.querySelector('#score--0');
const player1Score = document.querySelector('#score--1');

const DicePic = document.querySelector('.dice');

const btnReset = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currRoll, currPlayer, score, playing;
const currScore = [0, 0];

let rollDice = () => Math.trunc(Math.random() * 6) + 1;

const init = function () {
  playing = true;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');

  currRoll = 0;
  currPlayer = 0;
  score = 0;
  playing = true;
  currScore[0] = 0;
  currScore[1] = 0;
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  DicePic.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};

init();

const switchPlayers = function () {
  document
    .querySelector(`.player--${currPlayer}`)
    .classList.remove('player--active');
  currPlayer = currPlayer === 0 ? (currPlayer = 1) : (currPlayer = 0);
  document
    .querySelector(`.player--${currPlayer}`)
    .classList.toggle('player--active');
};

const displayStats = function () {
  DicePic.src = `dice-${currRoll}.png`;
  if (DicePic.classList.contains('hidden')) DicePic.classList.remove('hidden');
  document.querySelector(`#current--${currPlayer}`).textContent = score;
};

player0Score.textContent = 0;
player1Score.textContent = 0;
DicePic.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (playing) {
    currRoll = rollDice();
    score += currRoll;

    if (currRoll !== 1) {
      displayStats();
    } else {
      score = 0;
      displayStats();
      document.querySelector(`#current--${currPlayer}`).textContent = 0;
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    currScore[currPlayer] += score;
    if (currScore[currPlayer] >= 100) {
      document
        .querySelector(`.player--${currPlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#score--${currPlayer}`).textContent =
        currScore[currPlayer];
      document.querySelector(`#current--${currPlayer}`).textContent = 0;

      playing = false;
    } else {
      score = 0;
      document.querySelector(`#current--${currPlayer}`).textContent = 0;
      document.querySelector(`#score--${currPlayer}`).textContent =
        currScore[currPlayer];
      switchPlayers();
    }
  }
});

btnReset.addEventListener('click', init);
