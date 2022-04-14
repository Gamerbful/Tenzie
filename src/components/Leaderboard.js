import {useEffect,useState} from 'react'


export default function Leaderboard(){

    const [lbData,setLbData] = useState( () => [] )

    useEffect(() => {
        fetch(`https://bryanserver.herokuapp.com/record`)
        .then( res => res.json() )
        .then( data => setLbData(sortData(data)) )
    },[])

    function sortData(data){
        let highscoreData = data.filter( val => val.highscore != null)
        let sorted = highscoreData.sort( (a,b) => {
            let nbCoupsA = a.highscore.nbCoups
            let nbCoupsB = b.highscore.nbCoups
            let timeA = a.highscore.timeElapsed
            let timeB = b.highscore.timeElapsed
            let minutesA = timeA.minutes
            let minutesB = timeB.minutes
            let secondesA = timeA.secondes
            let secondesB = timeB.secondes

            if ( nbCoupsA != nbCoupsB ){
                return nbCoupsA < nbCoupsB ? -1 : 1
            }
            else {
                if ( minutesA != minutesB){
                    return minutesA < minutesB ? -1 : 1
                }
                else{
                    return secondesA < secondesB ? -1 : 1
                }
            }
        })
        console.log(sorted)
        return sorted
    }


    function renderData(){
        return lbData.slice(0,10).map(data => {
            let {minutes,secondes} = data.highscore.timeElapsed
            secondes = secondes < 10 ? `0${secondes}` : `${secondes}`
            return (
                <div key={data._id}>
                <h5 >{`${data._id}`}</h5> 
                <h5>{`${minutes}:${secondes}`}</h5>
                <h5>{`${data.highscore.nbCoups}`}</h5>
                </div>
            )
        } )
    }
    return(
        <div className='lb--wrapper'>
            <h1>Leaderboard</h1>
            <section className='lb--data'>
            {renderData()}
            </section>
        </div>
    )
}