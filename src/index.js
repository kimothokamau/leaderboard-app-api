import './style.css';
import { postScores, getScores, gameID } from './api-backend.js';

const displayScores = document.querySelector('.player-scores');
const form = document.querySelector('.add-score');
const playerNameDom = document.querySelector('.playername');
const playerScoreDom = document.querySelector('.playerscore');
const refreshBtn = document.querySelector('.refresh-btn');

form.addEventListener('submit', (event) => {
  const playerNameVal = playerNameDom.value;
  const playerScoreVal = playerScoreDom.value;
  event.preventDefault();
  postScores(playerNameVal, playerScoreVal);
  form.reset();
});

const theaders = () => {
  const theader = document.createElement('tr');
  theader.classList.add('t-header');
  const theaderPlayer = document.createElement('td');
  theaderPlayer.innerHTML = 'Player name';
  const theaderScore = document.createElement('td');
  theaderScore.innerHTML = 'Score';
  theader.appendChild(theaderPlayer);
  theader.appendChild(theaderScore);
  displayScores.appendChild(theader);
  return displayScores;
};

const loadScores = () => {
  getScores()
    .then((footballer) => {
      theaders();
      footballer.result.forEach((playerscore) => {
        const scoreEntryElem = document.createElement('tr');
        const playerNameElem = document.createElement('td');
        playerNameElem.innerHTML = `${playerscore.user}`;
        scoreEntryElem.appendChild(playerNameElem);
        const playerScoreElem = document.createElement('td');
        playerScoreElem.innerHTML = `${playerscore.score}`;
        scoreEntryElem.appendChild(playerScoreElem);
        displayScores.appendChild(scoreEntryElem);
      });
    });
};

refreshBtn.addEventListener('click', () => {
  getScores()
    .then((playerscore) => {
      displayScores.innerHTML = '';
      theaders();
      playerscore.result.forEach((playerscore) => {
        const scoreEntryElem = document.createElement('tr');
        const playerNameElem = document.createElement('td');
        playerNameElem.innerHTML = `${playerscore.user}`;
        scoreEntryElem.appendChild(playerNameElem);
        const playerScoreElem = document.createElement('td');
        playerScoreElem.innerHTML = `${playerscore.score}`;
        scoreEntryElem.appendChild(playerScoreElem);
        displayScores.appendChild(scoreEntryElem);
      });
    });
});

gameID('foorball');
window.onload = loadScores();
