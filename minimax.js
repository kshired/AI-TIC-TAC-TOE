function bestMove() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, -Infinity, Infinity, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = { i, j };
        }
      }
    }
  }
  board[bestMove.i][bestMove.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0,
};

function minimax(board, depth, alpha, beta, isMaximizing) {
  if (alpha >= beta) {
    if (isMaximizing) {
      return Infinity;
    } else {
      return -Infinity;
    }
  }

  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, alpha, beta, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
          alpha = max(bestScore, alpha);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, alpha, beta, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
          beta = min(bestScore, beta);
        }
      }
    }
    return bestScore;
  }
}
