import React from 'react';
import Die from './components/Die';
// import Confetti from 'react-confetti';
import './App.css';

export default function App() {
  //set state for array of new dice from function
  const [dice,setDice] =React.useState(allNewDice());

  console.log(dice);

  //set state for end of game 
  const [tenzie,setTenzie] = React.useState(false);

  //write function to generate random dice value
  function generateNewValue() {
    return Math.ceil(Math.random()*6)
  }

  //write function to generate arrary of random dice objects with value, held, id
  function allNewDice() {
    let newArray = [];
    for(let i=0;i<10;i++){
      let newDie = {
        value:generateNewValue(),
        hold:false,
        id:i+1}
      newArray.push(newDie);
    };
    return newArray;
  }

  //each time dice array is changed check to see if tenzie has been reached


  //write handler function to roll unheld dice

  //write handler function to change status of dice held when element is clicked


  //write function to render all dice
  let diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} />
  ))

  console.log(diceElements)


  return (
    <div className="app-container">
      {/* {tenzie && Confetti} */}
      <h1 className="app-title">Jacob's Tenzie Game</h1>
      <p className="app-instructions">Instructions: Roll until all dice are the same. Click each die to freeze it betweeen rolls</p>
      <div className="app-die-container">{diceElements}</div>

    </div>
  );
}

