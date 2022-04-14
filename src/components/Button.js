

export default function Button(props){

    return(
        <div className="button--wrapper">
        <button 
        className="content--button"
        onClick={props.tenzies ? ()=>{
          props.newGame()} : props.rollDices}
        >
        <img src="/dice.png"></img>
        <h3>{props.tenzies ? "New Game" : "Roll"}</h3>
        
        </button>
        </div>
    )
}