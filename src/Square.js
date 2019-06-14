import React from 'react';
import './index.css';

//controlled components don't need constructors (no brain or states):) 

function Square(props) {
  return (
    <button 
      className={"square"}
      onClick = {props.onClick}>
      {props.value}
    </button>
    );
}

export default Square;

