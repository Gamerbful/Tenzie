
export default function Die(props){
    return(
    <div onClick={props.onClick} className={`die ${props.isHeld ? "green" : ""}`} >
        {props.number}
    </div>
    )
}