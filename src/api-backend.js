/* eslint no-template-curly-in-string: "error" */

const gameID = async (title) => {
  const result = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
      }),
    },
  );

  const data = await result.json();
  const gameId = data.result.split(' ')[3];
  return gameId;
};

const postScores = async (playerName, playerScore) => {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: playerName,
      score: playerScore,
    }),
  })

    .then((resp) => resp.json());
  return response;
};

const getScores = async () => {
  const refreshScores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`);
  const refreshScoresJson = refreshScores.json();
  return refreshScoresJson;
};

export { postScores, getScores, gameID };