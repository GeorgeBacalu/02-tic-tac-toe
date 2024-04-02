export default function GameBoard({ onSelectSquare, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>{row.map((symbol, columnIndex) => <li key={columnIndex}><button onClick={() => onSelectSquare(rowIndex, columnIndex)} disabled={symbol}>{symbol}</button></li>)}</ol>
        </li>))} 
    </ol>
  );
}