const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] === '' && isGameActive) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      message.textContent = `Player ${board[a]} wins!`;
      return;
    }
  }

  if (!board.includes('')) {
    isGameActive = false;
    message.textContent = 'It\'s a tie!';
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
