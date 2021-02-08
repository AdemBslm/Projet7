import './Navigation.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(){

    return(
        <ul id="navigation">
            <NavLink exact activeClassName="current" className="inscription" to="/Inscription">
                <li>Inscription</li>
            </NavLink>

            <NavLink exact activeClassName="current" className="connexion" to="/">
                <li>Connexion</li>
            </NavLink>
        </ul>
    )
};

export default Navigation;