import Die from './components/Die'
import Info from './components/Info'
import './App.css';
import {useState,useEffect} from 'react';
import {nanoid} from 'nanoid';
const confetti = require('canvas-confetti');



function App() {

  const [tenzies,setTenzies] = useState(() => false);
  const [dices,setDices] = useState(() => loadDices())
  const [cft,setConfetti] = useState( ()=> {
    var myCanvas = document.getElementsByClassName('confetti')[0]
  
    return  confetti.create(myCanvas, {
      resize: true,
      useWorker: true
    });

  })


  const [info,setInfo] = useState( () => false )

  useEffect( ()=>{
    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        cft({
          particleCount: 200,
          spread: 100
          // any other options from the global
          // confetti function
        });
    }
  },[dices])

  function loadDices(){
    let n = 10
    let dices = []
    for( let i=0; i<n; i++ ) {
      dices.push(generateNewDie())
    }
    setTenzies(false);
    return dices
  }


  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }


}

  function renderDices(){
    return dices.map( die => <Die  onClick={ ()=>{holdDice(die.id)}} key={die.id} number={die.value} isHeld={die.isHeld}/>)
  }

  function rollDices(){
    setDices( prevDices =>{
      return prevDices.map( dice =>{
        return dice.isHeld ? { ...dice }
        : generateNewDie()
      })
    } )
  }


  function holdDice(id){
    setDices( prevDices => {
      return prevDices.map( 
        dice =>{
          if( dice.id === id) return {...dice,isHeld:!dice.isHeld}
          return {...dice}
        }
      )
    })
  }

  function toggleInfos(event){
    console.log(event.target)
    event.target.style.width = "40%"
  }

  return (
    <main className='content'>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die--wrapper'>
        {renderDices()}
        </div>
        <button 
        className="content--button"
        onClick={tenzies ? ()=>{setDices(loadDices())} : rollDices}
        >{tenzies ? "New Game" : "Roll"}</button>
        <canvas className='confetti'></canvas>
        <Info onClick={toggleInfos}/>
    </main>
  );
}

export default App;
