

export default function Highscore(props){
    let content = ""
    if( props.highscore != null){
        const {nbCoups,timeElapsed} = props.highscore
        const {minutes,secondes} = timeElapsed
        content = `nbcoups ${nbCoups} time ${minutes}:${secondes}`
    }
    else {
        content = "no Highscore"
    }
    return (
        <div className='highscore'>
            <h2>Highscore</h2>
            {content}
        </div>
    )
}