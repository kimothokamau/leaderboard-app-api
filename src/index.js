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

refreshBtn.addEventListener('click', () => {
  getScores()
    .then((playerscore) => {
      displayScores.innerHTML = '';
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
