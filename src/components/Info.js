import { useEffect } from "react"


export default function Info(props){
    const classes = `appear ${props.toggle ? "display" : "label"}`
    const secondes = props.time.secondes < 10 ? `0${props.time.secondes}` : `${props.time.secondes}`
    return(
        <div onClick={props.onClick} className="info">
            <div className={classes} > {props.toggle ? 
            <><h1>Steps</h1><h2>{props.nbCoups}</h2> <h1>Time elapsed</h1><h2>{`${props.time.minutes}:${secondes}`}</h2></>  : 
            <h3>Infos</h3>} </div>
        </div>
    )
}
