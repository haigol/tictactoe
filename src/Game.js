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
  
  // const moves = history.map((step, move) => {
  //   const description = move ?
  //     'Go to move #' + move :
  //     'Go to game start';
  //   return (
  //     <li key={move}>
  //       <button onClick={() => this.jumpTo(move)}>{description}</button>
  //     </li>
  //   );
  // });

  render() {
    const history = this.state.history;
    const current = history[history.length -1];
    const winningState = calculateWinner(current.squares);

    
    //winnerSquares.every((e) => {e.classList.add('highlight')
    //});
   
    // const moves = history.map((step,move) => {
    //   const desc;
    // })

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
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
}



export default Game;