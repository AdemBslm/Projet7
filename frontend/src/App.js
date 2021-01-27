import './App.scss';
import Inscription from './composants/Inscription';
import Connexion from './composants/Connexion';
import Navigation from './composants/Navigation';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './Logos/icon-above-font.png';




function App() {
  return (
    <div className="App">
        <Router>

        <div id="pannel_connexion">
            <Navigation />
            <img src={logo} className="App-logo" alt="logo" />
            <Switch>
              <Route path="/Inscription" exact component={Inscription}/>
              <Route path="/" exact component={Connexion}/>
              <Route path="/" component={() => <h1>ERREUR 404</h1>}/>
            </Switch>
        </div>

        </Router>
    </div>
  );
}

export default App;
