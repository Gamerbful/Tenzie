
import {
    Link
  } from "react-router-dom";


export default function Header(){

    return(
        <header>
    <Link className="link" to="/register">Register</Link>
    <Link className="link" to="/login">Login</Link>
    <Link className="link" to="/projects/tenzie">Tenzie</Link>
        </header>
    )
}