import { nanoid } from "nanoid";
import {
    useState
} from "react"

export default function Register(props) {

    const [formData, setFormData] = useState(() => {
        return {
            email: "",
            name: "",
            password: ""
        }
    })

    const [error,setError] = useState( () => {
        return false
    })



    async function AddData(){
    await fetch("https://bryanserver.herokuapp.com/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {name:formData.name,
         email:formData.email,
         password:formData.password,
         temporaryKey:nanoid(),
        highscore:null })
    })
    .then(response => {
        return response.json()
    }).then(
        data => {
            if (data.code){
                raiseNameError()
            }
            else{
                raiseSucess()
                document.cookie = `temporaryKey=${data.temporaryKey};expires=Fri, 31 Dec 9999 23:59:59 GMT`
                

            }
            
        }

    )
  }

    function raiseNameError(){
        if(!error)
        setError( prevError => !prevError)
    }

    function raiseSucess() {
        if(error){
            setError( prevError => !prevError)
        }

    }



    function handleInputChange(event) {
        
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });


    }


    function handleSubmit(event) {
        event.preventDefault();
        AddData()
        
      }

    return (
        <div className="form--wrapper">
        <img className="form--logo" src="/registered.png"></img>
        
        <form className="createAccount" onSubmit={handleSubmit}>
        <img className="form--img first" src="/back.svg"></img>
        <img className="form--img second" src="/back2.svg"></img>
            <section>
            <label htmlFor="name">Name</label>
            <input onChange={handleInputChange} id="name" type="name" name="name" value={formData.name}></input>
            <h5 className="form--error">{ error ? "Nom déjà pris!" : ""}</h5>
            </section>
            <section>
            <label htmlFor="password">Password</label>
            <input onChange={handleInputChange} id="password" type="password" name="password" value={formData.password}></input>
            <h5 className="form--error"></h5>
            </section>
            <button>Login</button>
        </form>
        </div>
    )
}