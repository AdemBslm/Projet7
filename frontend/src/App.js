import './App.scss';
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Inscription from './composants/Login/Inscription';
import Connexion from './composants/Login/Connexion';

import { hasAuthenticated } from './composants/Auth/AuthApi';
import Auth from './composants/Auth/Auth';
import AuthenticatedRoute from './composants/Auth/AuthenticatedRoute'

import Posts from './composants/Posts/Posts';
import UpdateAvatar from './composants/Posts/UpdateAvatar';
import PostId from './composants/Posts/PostId';


function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

      return (
        <div className="App">
          
          <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <Router>

              <Switch>
                  <Route exact path="/Inscription"component={Inscription}/>
                  <Route exact path="/" component={Connexion}/>
                  <AuthenticatedRoute  path="/UpdateAvatar" component={UpdateAvatar}/>
                  <AuthenticatedRoute path="/Posts/:id" component={PostId}/> 
                  <AuthenticatedRoute path="/Posts" component={Posts}/> 
              </Switch>

            </Router>
          </Auth.Provider>
        </div>
    );
}

export default App;
