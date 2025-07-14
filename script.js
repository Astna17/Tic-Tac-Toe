let currentPlayer = 'X';
let botPlayer = 'O'; 
let board = Array(9).fill('');
let isGameActive = true;
let mode = 'player';
let timerInterval;
let timeLeft = 15;
let score = { X: -1, O: +1 };

function startGame(selectedMode) {
  document.querySelector('.menu').classList.add('hidden');
  document.querySelector('.game').classList.remove('hidden');
  mode = selectedMode;
  document.getElementById('mode-label').innerText =
    mode === 'two' ? 'Two Player ' : 'Single Player';
  resetBoard();
  startTimer();
}

function howToPlay() {
  alert("Place your symbol (X or O) in turn.\nFirst to line up 3 wins!");
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15;
  document.getElementById('time').innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isGameActive = false;

      document.getElementById('status').innerText = `Time out`;
      
      setTimeout(() => {
        resetBoard(); 
        document.getElementById('status').innerText = '';
      }, 2000); 
    }
  }, 1000);
}

function resetBoard() {
  board = Array(9).fill('');
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';
  board.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => handleCellClick(i));
    boardEl.appendChild(cell);
  });

  isGameActive = true;
  currentPlayer = botPlayer;
  document.getElementById('status').innerText = '';
  startTimer();

  if (mode === 'player' && currentPlayer === 'O') {
    setTimeout(botMove, 400);
  }

}

function handleCellClick(index) {
  if (!isGameActive || board[index]) return;

  board[index] = currentPlayer;
  document.querySelectorAll('.cell')[index].innerText = currentPlayer;

  if (checkWin()) {
    document.getElementById('status').innerText = `${currentPlayer} wins! `;
    score[currentPlayer]++;
    updateScore();
    isGameActive = false;
    clearInterval(timerInterval);

    botPlayer = currentPlayer === 'X' ? 'O' : 'X';

    setTimeout(() => {
      resetBoard();
      document.getElementById('status').innerText = '';
    }, 2000);


    return;
  }

  if (!board.includes('')) {
    document.getElementById('status').innerText = "It's a draw!";
    isGameActive = false;
    clearInterval(timerInterval);

    setTimeout(() => {
      resetBoard();
      document.getElementById('status').innerText = '';
    }, 2000);

    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (mode === 'player' && currentPlayer === 'O') {
    setTimeout(botMove, 500);
  }
}

function updateScore() {
  document.getElementById('scoreX').innerText = score.X;
  document.getElementById('scoreO').innerText = score.O;
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === currentPlayer)
  );
}

function botMove() {
  const bot = 'O';
  const player = 'X';

  const corners = [0, 2, 6, 8];
  const edges = [1, 3, 5, 7];

  const xMoves = board.map((val, i) => val === player ? i : null).filter(i => i !== null);
  const botMoves = board.map((val, i) => val === bot ? i : null).filter(i => i !== null);

  if (xMoves.length === 1 && botMoves.length === 0) {
    const firstX = xMoves[0];

    if (corners.includes(firstX)) {
      if (board[4] === '') {
        handleCellClick(4);
        return;
      }
    }

    if (edges.includes(firstX)) {
      if (board[4] === '') {
        handleCellClick(4);
        return;
      }
    }

    if (firstX === 4) {
      const availableCorners = corners.filter(i => board[i] === '');
      if (availableCorners.length > 0) {
        const move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        handleCellClick(move);
        return;
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = bot;
      if (checkWin()) {
        board[i] = '';
        handleCellClick(i);
        return;
      }
      board[i] = '';
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = player;
      if (checkWin()) {
        board[i] = '';
        handleCellClick(i);
        return;
      }
      board[i] = '';
    }
  }

  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const pattern of winPatterns) {
    const line = pattern.map(i => board[i]);
    if (!line.includes(player)) {
      const move = pattern.find(i => board[i] === '');
      if (move !== undefined) {
        handleCellClick(move);
        return;
      }
    }
  }

  const empty = board.map((v, i) => (v === '' ? i : null)).filter(v => v !== null);
  if (empty.length > 0) {
    const move = empty[Math.floor(Math.random() * empty.length)];
    handleCellClick(move);
  }
}


function goToMenu() {
  clearInterval(timerInterval);
  document.querySelector('.game').classList.add('hidden');
  document.querySelector('.menu').classList.remove('hidden');
  document.getElementById('status').innerText = '';
}
function resetGame() {
  score = { X: 0, O: 0 };
  updateScore();
  resetBoard();
  document.getElementById('status').innerText = '';
}