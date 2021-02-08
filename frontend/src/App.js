import './App.scss';
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './Logos/icon-above-font.png';

import Inscription from './composants/Login/Inscription';
import Connexion from './composants/Login/Connexion';
import Navigation from './composants/Login/Navigation';

import { hasAuthenticated } from './composants/Auth/AuthApi';
import Auth from './composants/Auth/Auth';

import Posts from './composants/Posts/Posts';
import PostId from './composants/Posts/PostId';
import Profil from './composants/Posts/Header';
 



function App() {

    const [isAuthenticated, setIsAuthenticadted] = useState(hasAuthenticated());

      return (
        <div className="App">
          <Auth.Provider value={isAuthenticated}>
            <Router>

              {(isAuthenticated && (
                <>  
                  <div id="pannel_connexion">
                        <Navigation />
                        <img src={logo} className="App-logo" alt="logo" />
                        <Switch>
                          <Route path="/Inscription" exact component={Inscription}/>
                          <Route path="/" exact component={Connexion}/>
                        </Switch>
                  </div>
                </> 
              )) || (
                  <>
                    <div id="posts">
                      <Profil className="profil" />
                      <Route path="/Posts" exact component={Posts}/> 
                      <Route path="/Posts/:id"  component={PostId}/> 
                    </div>
                  </>
                ) 
              }  

            </Router>
          </Auth.Provider>
        </div>
    );
}

export default App;
