import './Header.scss';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logoSite from '../../Logos/icon-left-font.png';
import avatarDefault from '../../Logos/Avatar/default.png';

import { faPen, faPowerOff, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from '../Auth/AuthApi';
import Auth from '../Auth/Auth';
import axios from 'axios';


function Menu(){

    const [toggleMenu,setToggleMenu] = useState(false);

    const toggleMenuChange = () => {
        setToggleMenu(!toggleMenu)
    }

    const {setIsAuthenticated} = useContext(Auth)

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    }

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const avatar = localStorage.getItem('avatar');
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('miniToken');

    const deleteUser = async(id) => {
        if(window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')){
            axios.delete('http://localhost:3000/api/auth/' + id ,{headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                logout();
                setIsAuthenticated(false);
            })
        } else {
            console.log("Annulation")
        }
    }

    return(
        <nav id="menu">
            {toggleMenu && 
                <ul className="liste">
                    <li className="items">
                        <FontAwesomeIcon icon={faUser} className="icones"/>
                        {lastName} {firstName}
                    </li>
                    <li className="items">
                        <FontAwesomeIcon icon={faPen} className="icones"/>
                        <NavLink to ="/UpdateAvatar">Modifier l'Avatar</NavLink>
                    </li>
                    <li className="items">
                        <FontAwesomeIcon icon={faPowerOff} className="icones"/>
                        <button className="button-menu" onClick={handleLogout}>Se déconnecter</button>
                    </li>
                    <li className="items">
                        <FontAwesomeIcon icon={faTrash} className="delete icones" />
                        <button className="delete button-menu" onClick={() => deleteUser(id)}>Supprimer le compte</button>
                    </li>
                </ul>
            }   

            <button onClick={toggleMenuChange} id="button-avatar"className="button-menu">
                {avatar === "null" ? <img src={avatarDefault} alt="avatarProfil" /> : <img src={avatar} alt="avatarProfil" />}
            </button>

        </nav>
    )
}

function Profil(){
    return(
        <div id='header'>
            <img src={logoSite} alt="logoSite" className="logoSite"/>
            <Menu />

        </div>
    )
};

export default Profil;