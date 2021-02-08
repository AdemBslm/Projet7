import './Header.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logoSite from '../../Logos/icon-left-font.png';
import avatarProfil from '../../Logos/Avatar/phototest.png';

import { faPen, faPowerOff, faSearch, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Menu(){

    const [toggleMenu,setToggleMenu] = useState(false);

    const toggleMenuChange = () => {
        setToggleMenu(!toggleMenu)
    }

    return(
        <nav id="menu">
            {toggleMenu && 
                <ul className="liste">
                    <li className="items">
                        <FontAwesomeIcon icon={faUser} className="icones"/>
                        BENSALEM Adem
                    </li>
                    <li className="items">
                        <FontAwesomeIcon icon={faSearch} className="icones"/>
                        <button id="afficher" className="button-menu">Afficher l'Avatar</button>
                    </li>
                    <li className="items">
                        <FontAwesomeIcon icon={faPen} className="icones"/>
                        <button id="update" className="button-menu">Modifier l'Avatar</button>
                    </li>
                    <li className="items">
                        <FontAwesomeIcon icon={faPowerOff} className="icones"/>
                        <NavLink to="/">Se déconnecter</NavLink>
                    </li>
                    <li className="items">
                        <FontAwesomeIcon icon={faTrash} className="delete icones" />
                        <button className="delete button-menu" onClick={() => window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")}>Supprimer le compte</button>
                    </li>
                </ul>
            }   

            <button onClick={toggleMenuChange} id="button-avatar"className="button-menu">
                <img src={avatarProfil} alt="avatarProfil" />
            </button>

        </nav>
    )
}

function Profil(){
    return(
        <div id='header'>
            <img src={logoSite} alt="logoSite" />
            <Menu />

        </div>
    )
};

export default Profil;