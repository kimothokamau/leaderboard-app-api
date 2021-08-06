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
  const theaderPlayer = document.createElement('td');
  theaderPlayer.innerHTML = 'Player name';
  const theaderScore = document.createElement('td');
  theaderScore.innerHTML = 'Score';
  theader.appendChild(theaderPlayer);
  theader.appendChild(theaderScore);
  displayScores.appendChild(theader);
  return displayScores;
}

const loadScores = () => {
  theaders();
  getScores()
    .then((footballer) => {
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
  theaders();
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
window.onload = loadScores();
