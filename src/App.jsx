import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { winningCombinations } from "./winning-combinations";

const getGameBoard = turns => {
  const gameBoard = Array(3).fill(null).map(() => Array(3).fill(null));
  turns.forEach(({ square: { row, column }, player }) => gameBoard[row][column] = player);
  return gameBoard;
}

const getWinner = (gameBoard, players) => {
  for (const combination of winningCombinations) {
    const [{ row: r1, column: c1 }, { row: r2, column: c2 }, { row: r3, column: c3 }] = combination;
    const [symbol1, symbol2, symbol3] = [gameBoard[r1][c1], gameBoard[r2][c2], gameBoard[r3][c3]];
    if (symbol1 && symbol1 === symbol2 && symbol2 === symbol3) return players[symbol1];
  }
}

export default function App() {
  const [turns, setTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });

  const gameBoard = getGameBoard(turns);
  const winner = getWinner(gameBoard, players);

  const handleSelectSquare = (rowIndex, columnIndex) => {
    setActivePlayer(activePlayer => activePlayer === "X" ? "O" : "X");
    setTurns(prevTurns => [{ square: { row: rowIndex, column: columnIndex }, player: prevTurns.length > 0 && prevTurns[0].player === "X" ? "O" : "X" }, ...prevTurns]);
  }
  const handlePlayerNameChange = (symbol, newName) => setPlayers(prevPlayers => ({ ...prevPlayers, [symbol]: newName }));

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player defaultName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player defaultName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || (turns.length === 9 && !winner)) && <GameOver winner={winner} onRestart={() => setTurns([])} />}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  );
}