
import Tenzie from './components/Tenzie';
import Register from './components/Register'
import './App.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


console.log(document.cookie)

function App() {
  return (
    <Router>

    <Link className=".link" to="/register">Register</Link>
    <Link className=".link" to="/projects/tenzie">Tenzie</Link>
    <Routes>
      <Route path="/projects/tenzie" element={        
      <Tenzie />
         }>
      </Route>

      <Route path="/register" element={<Register />}>
            
    </Route>
    </Routes>
    </Router>
  );
}

export default App;
