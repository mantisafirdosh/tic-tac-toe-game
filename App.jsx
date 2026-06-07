import React, { useState } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'move') {
      oscillator.frequency.value = 440;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'win') {
      oscillator.frequency.value = 523.25;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      oscillator.start(audioContext.currentTime);
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 659.25;
        gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.2);
      }, 150);
      setTimeout(() => {
        const osc3 = audioContext.createOscillator();
        const gain3 = audioContext.createGain();
        osc3.connect(gain3);
        gain3.connect(audioContext.destination);
        osc3.frequency.value = 783.99;
        gain3.gain.setValueAtTime(0.3, audioContext.currentTime);
        osc3.start(audioContext.currentTime);
        osc3.stop(audioContext.currentTime + 0.3);
      }, 300);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'draw') {
      oscillator.frequency.value = 300;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const checkGameStatus = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    // Check for winner first
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log('Winner found:', board[a]);
        return { type: 'winner', player: board[a] };
      }
    }

    // Check for draw - only if no winner
    const isFull = board.every(cell => cell !== null);
    if (isFull) {
      console.log('Game is a draw!');
      return { type: 'draw' };
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    playSound('move');

    const gameStatus = checkGameStatus(newBoard);
    
    console.log('Game status:', gameStatus);
    console.log('Current scores before update:', scores);

    if (gameStatus) {
      if (gameStatus.type === 'winner') {
        console.log('Setting winner to:', gameStatus.player);
        setWinner(gameStatus.player);
        setScores(prev => {
          const newScores = { ...prev, [gameStatus.player]: prev[gameStatus.player] + 1 };
          console.log('New scores (winner):', newScores);
          return newScores;
        });
        playSound('win');
      } else if (gameStatus.type === 'draw') {
        console.log('Setting winner to: draw');
        setWinner('draw');
        setScores(prev => {
          const newScores = { ...prev, draws: prev.draws + 1 };
          console.log('New scores (draw):', newScores);
          return newScores;
        });
        playSound('draw');
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  const getStatusMessage = () => {
    if (winner === 'draw') {
      return "It's a draw!";
    } else if (winner) {
      return `Player ${winner} wins!`;
    } else {
      return `Player ${currentPlayer}'s turn`;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px', 
      backgroundColor: '#1a0a2e',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ color: '#d4a5ff', marginBottom: '10px', fontSize: '3em' }}>Tic Tac Toe</h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        marginBottom: '20px', 
        backgroundColor: '#2d1b4e', 
        padding: '15px 30px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: '2px solid #5a3d7a'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#4fc3f7' }}>Player X</div>
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#4fc3f7' }}>{scores.X}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#ce93d8' }}>Draws</div>
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#ce93d8' }}>{scores.draws}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#ff5252' }}>Player O</div>
          <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#ff5252' }}>{scores.O}</div>
        </div>
      </div>

      <p style={{ 
        fontSize: '1.5em', 
        fontWeight: 'bold', 
        color: winner === 'draw' ? '#ce93d8' : winner ? '#4fc3f7' : '#d4a5ff',
        marginBottom: '20px'
      }}>
        {getStatusMessage()}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 120px)',
        gridTemplateRows: 'repeat(3, 120px)',
        gap: '0px',
        marginBottom: '20px',
        border: '4px solid #5a3d7a',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
      }}>
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: cell ? '#2d1b4e' : '#1f0d3e',
              color: cell ? (cell === 'X' ? '#4fc3f7' : '#ff5252') : 'transparent',
              fontSize: '4em',
              fontWeight: 'bold',
              cursor: cell || winner ? 'default' : 'pointer',
              border: '3px solid #5a3d7a',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={resetGame}
          style={{
            padding: '12px 24px',
            fontSize: '1.1em',
            backgroundColor: '#4fc3f7',
            color: '#1a0a2e',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(79, 195, 247, 0.3)'
          }}
        >
          New Game
        </button>
        <button
          onClick={resetScores}
          style={{
            padding: '12px 24px',
            fontSize: '1.1em',
            backgroundColor: '#ff5252',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(255, 82, 82, 0.3)'
          }}
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;