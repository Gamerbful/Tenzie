import Button from './Button'
import Info from './Info'
import Highscore from './Highscore'
import Die from './Die'
import Leaderboard from './Leaderboard'
import {useState,useEffect} from 'react';
import Draggable from 'react-draggable';
import {nanoid} from 'nanoid';
const confetti = require('canvas-confetti');



export default function Tenzie(props){


      // APP STATES 
  const [tenzies,setTenzies] = useState(() => false); // if true game ended!
  const [dices,setDices] = useState(() => loadDices()) // array of dice object
  // cft function to pop confetti!
  const [cft,setConfetti] = useState( ()=> {
    var myCanvas = document.getElementsByClassName('confetti')[0]
  
    return  confetti.create(myCanvas, {
      resize: true,
      useWorker: true
    });

  })
  const [info,setInfo] = useState( () => true ) // tell if we are on info slide else we have content
  const [anim,setAnim] = useState( () => false ) // tell if we are in animation state
  const [toggle,setToggle] = useState ( () => false ) // tell if we click the toggle button
  const [nbCoups, setNbCoups] = useState ( () => 0) // number of rolls
  const [time, setTime ] = useState ( () => { // time elapsed
    return {minutes:0,secondes:0}
  }) 
  const [itv, setItv] = useState(() => null) // interval id to remove it
  // localStorage.clear("highscore")
  const [highscore, setHighScore] = useState( () => null )

  const [toggleHighScore, setUpdateHighScore] = useState( () => { return false})

  // USE EFFECTS HOOK

  useEffect( ()=>{ // check the winning condition each time dices change!
    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        updateHighScore();
        clearInterval(itv)
        cft({
          particleCount: 200,
          spread: 100
          // any other options from the global
          // confetti function
        });
    }
  },[dices])

  useEffect(() => {
      async function loadHighscore() {
       
    await fetch(`https://bryanserver.herokuapp.com/record/${getCookie("temporaryKey")}`)
    .then( response => response.json())
    .then(data => {
        setHighScore(data)
    })
        }
        loadHighscore()
     ;
  },[toggleHighScore])



// animation of slidebar
  useEffect( () => {
    if( anim ) {
    let infoSlideContent = document.getElementsByClassName("appear")[0]
    infoSlideContent.style.opacity = 0;
    setTimeout( () => {
      infoSlideContent.style.opacity = 1;
      setAnim(prevAnim => !prevAnim)
      setInfo( prevInfo => !prevInfo)
    },500)
}
  },[toggle])


  // time count add 1 seconds!
  useEffect( ()=> {
    if ( itv == null ){
    let itv = setInterval( () => {
      tickTime() },1000)
    setItv(itv)
    }
  },[itv])





  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  

  // UTILS FUNCTION

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
    setNbCoups( prevnbCoups => prevnbCoups + 1 )
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

  function toggleInfos(){
    if ( !anim ){
        
        setToggle(prevToggle => !prevToggle)
        setAnim( prevAnim => !prevAnim )
        let infoSlide = document.getElementsByClassName("info")[0]
        infoSlide.style.width = info ? "10%" : "40%"
  }
  }

  function tickTime(){
    setTime( prevTime => {
      let minutesValue = prevTime.minutes
      let secondesValue = prevTime.secondes

      if ( secondesValue == 59 ){
        secondesValue = 0
        minutesValue += 1
      }
      else{
        secondesValue += 1
      }
      return {minutes:minutesValue,secondes:secondesValue}
    })
  }

  function newGame(){
    setDices(loadDices())
    setNbCoups(0)
    setTime({minutes:0,secondes:0})
    setItv(null)
  }



  async function updateData(highscoreValue){
  
    await fetch(`https://bryanserver.herokuapp.com/update/${getCookie("temporaryKey")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {highscore:highscoreValue})
    })
    setUpdateHighScore( prevUpdateHighScore => !prevUpdateHighScore )
  }

  function update(highscoreValue){
      
    setHighScore(highscoreValue)
    console.log(highscore)
    updateData(highscoreValue)

  }

  function updateHighScore(){
    let highscoreValue = {
      nbCoups : nbCoups,
      timeElapsed: {...time}
    }
 
    if(highscore){
       
      if ( nbCoups < highscore.nbCoups ){
        update(highscoreValue)
      }
    else if ( nbCoups == highscore.nbCoups ){
      let currentTime = time.minutes*60 + time.secondes
      let highscoreTime = highscore.minutes*60 + highscore
      let boolTime = currentTime < highscoreTime 
      if ( boolTime ) {
        update(highscoreValue)
      }
    }
      }
    else{
      update(highscoreValue)
    }
  }


    return (
    <>
    <Leaderboard />
    <div className="wrapper">
    <main className='content'>
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className='die--wrapper'>
        {renderDices()}
        </div>
        <Button 
        tenzies={tenzies}
        newGame={newGame}
        rollDices={rollDices}
        />
        <canvas className='confetti'></canvas>
        <Info time={time} nbCoups={nbCoups} toggle={info} onClick={toggleInfos}/>
        <Highscore highscore={highscore}/>
    </main>
    </div>
    </>
    )
}


