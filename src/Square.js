import React from 'react';
import './index.css';

//controlled components don't need constructors (no brain or states):) 

const Square= (props) => (
    <button 
      className={props.hasBorder? "square highlight" : "square"}
      onClick = {props.onClick}>
      {props.value}
    </button>
);


export default Square;

