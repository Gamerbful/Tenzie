


import {useState,useEffect} from 'react'

export default function Highscore(props){
    let content = ""
    if( props.highscore != null){
        const {nbCoups,timeElapsed} = props.highscore
        const {minutes,secondes} = timeElapsed
        content = <><h4>{`Steps ${nbCoups}`}</h4><h4>{`Time ${minutes}:${secondes}`}</h4> </>
    }
    else {
        content = <h4>no Highscore</h4>
    }


    const [anim,setAnim] = useState( () => false ) // tell if we are in animation state
    const [toggle,setToggle] = useState ( () => false ) // tell if we click the toggle button


    useEffect( () => {
        if( anim ) {
        let infoSlideContent = document.getElementsByClassName("highscore--content")[0]
        infoSlideContent.style.opacity = 0;
        setTimeout( () => {
          infoSlideContent.style.opacity = 1;
          setAnim(prevAnim => !prevAnim)
        },500)
    }
      },[toggle])

      
    function toggleInfos(){
        if ( !anim ){ 
            setToggle(prevToggle => !prevToggle)
            setAnim( prevAnim => !prevAnim )
      }
      }

    return (
        <div style= {
             {
                transform:!toggle ?  "translateX(-50%)" : "translateX(-20%)",
                width:!toggle ? "10%" : "30%",
                height:!toggle ? "10%" : "20%",
                alignItems:!toggle ?  "center" : "start"
            }}
            onClick={toggleInfos} className='highscore'>
            <div className="highscore--content">
            {toggle ? <><h2>Highscore</h2>{content}</> : <h2>H</h2>}
            </div>
        </div>
    )
}