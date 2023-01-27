import React from 'react';
import Die from './components/Die';
import Confetti from 'react-confetti';
import './App.css';
import {nanoid} from 'nanoid';

export default function App() {
  //set state for array of new dice from function
  const [dice,setDice] =React.useState(allNewDice());

  //set state for end of game 
  const [tenzie,setTenzie] = React.useState(false);

  //set state for total rolls
  const [rollCount,setRollCount] = React.useState(1);

  //set state of personal best from local storage
  const [personalBest,setPersonalBest]=React.useState(parseInt(localStorage.getItem('personalBest'))||0)
  
  // console.log(personalBest);

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
        held:false,
        id:nanoid()}
      newArray.push(newDie);
    }; 

    return newArray;
  }

  //each time dice array is changed check to see if tenzie has been reached
  React.useEffect(()=>{
    let firstValue = dice[0].value;
    let allEqual = dice.every((die)=>die.value===firstValue);
    let allHeld = dice.every((die)=>die.held===true)

    if(allEqual && allHeld){
      setTenzie(true);

      if(rollCount<personalBest||personalBest===0){
        localStorage.setItem('personalBest',rollCount);
        setPersonalBest(rollCount);
      }
      
    }
  },[dice])


  //write handler function to roll unheld dice
  function rollUnheldDice() {
    if(tenzie===true){
      setTenzie(false);
      setDice(allNewDice());
      setRollCount(1);
      return;
    }

    setDice(oldDice => oldDice.map(oldDie => (
      oldDie.held===true ? {...oldDie}:
      {...oldDie, value:generateNewValue(), id:nanoid()}
    )))

    setRollCount(oldRollCount => oldRollCount+1);
  }

  //write handler function to change status of dice held when element is clicked
  function handlerHold(id) {
    setDice(oldDice => oldDice.map(oldDie => (
      (oldDie.id===id) ? {...oldDie, held:!oldDie.held}: {...oldDie}
    )))

  }

  //write function to render all dice
  let diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} held={die.held} id={die.id}handlerHold={handlerHold} />
  ))

  return (
    <div className="app-container">
      {tenzie &&<Confetti />}
      <h1 className="app-title">Jacob's Tenzie Game</h1>

      <p className="app-instructions">
        Roll until all dice are the same.<br></br>
        Click each die to freeze it between rolls.<br></br> 
        {personalBest ?`Your personal best is ${personalBest} rolls in a game.`:""}<br></br>
        {tenzie 
        ? `You won in ${rollCount} rolls!`
        : `${rollCount} rolls this game.`}
      
      </p> 
      
      <div className="app-die-container">{diceElements}</div>

      <button 
        className={tenzie ?"app-button button-animation": "app-button"}
        onClick={rollUnheldDice}
        >{tenzie ? "Play Again":"Roll Dice"}</button>
    </div>
  );
}

