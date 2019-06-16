import React from 'react';
import './index.css';
import Board from './Board';
import calculateWinner from './CalculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,

    };
  }  

  jumpTo(moveIndex) {
    this.setState((state) => ({
      history: state.history.slice(0, moveIndex+1),
      xIsNext: (moveIndex % 2 === 0 ),
    }))
  }
  
  handleClick(i) {
    const history = this.state.history;
  
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'X':'O';
    this.setState({
      history: history.concat([{squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  


  render() {
    const history = this.state.history;
    const current = history[history.length -1];
    const winningState = calculateWinner(current.squares);

    const moves = history.map((squares, moveIndex) => {
      const description = moveIndex ?
        'Go to move #' + moveIndex :
        'Go to game start';
      return (
        <li key={moveIndex}>
          <button onClick={() => this.jumpTo(moveIndex)}>{description}</button>
        </li>
      );
    });



    let status;
    if (winningState) {
      status = "Winner: " + winningState.winner;
    } else if (!current.squares.includes(null)) {
      status = "It's a draw";
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
    }
  

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares} 
              onClick = {(i) => this.handleClick(i)}
              squaresWithBorder = {winningState? winningState.winnerSquares: []}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ul>{moves}</ul>
          </div>
        </div>
      );
    }
}



export default Game;