
import Tenzie from './components/Tenzie';
import Register from './components/Register';
import Main from './components/Main';
import Header from './components/Header';
import Login from './components/Login';
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
    <Routes>
      <Route path="/projects/tenzie" element={ <><Header/><Tenzie /></>}>
      </Route>
      <Route path="/login" element={ <><Header/><Login /></>}>
      </Route>
      <Route path="/register" element={<><Header/><Register /></>}>
            
    </Route>

    <Route path="/" element={<><Header/><Main /></>}>

    </Route>
    </Routes>
    </Router>
  );
}

export default App;
