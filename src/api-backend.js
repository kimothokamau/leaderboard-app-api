const postScores = async (playerName, playerScore) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zeWhEaKsT4ZEAaPGExUD/scores/', {
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
  const refreshScores = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zeWhEaKsT4ZEAaPGExUD/scores/');
  const refreshScoresJson = refreshScores.json();
  return refreshScoresJson;
};

export { postScores, getScores };