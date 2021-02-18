import {useForm} from 'react-hook-form';
import React, { useContext, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Navigation from "./Navigation";
import logo from '../../Logos/icon-above-font.png';
import Auth from '../Auth/Auth';
import { login } from '../Auth/AuthApi';


const schema = yup.object().shape({
    email: yup.string().email().required('Veuillez mettre un email !'),
    password: yup.string().required('Veuillez mettre un mot de passe !'),
});

function Connexion({history}){

    const {isAuthenticated, setIsAuthenticated} = useContext(Auth)

    const {register, handleSubmit, errors} = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {

        try{
            const response = await login(data);
            setIsAuthenticated(response)
            history.replace('/Posts')
        } catch ({response}){
            console.log(response)
        }

    }


    useEffect(() => {
        if (isAuthenticated){
            history.replace('/Posts')
        }
    }, [history, isAuthenticated])

    return(
        <div className="accueil">

            <Navigation />
            <img src={logo} className="App-logo" alt="logo" />

            <form className="formulaire" onSubmit={handleSubmit(onSubmit)}>

                <h1>Connectez-vous</h1>

                <div className="form_champs"> 
                    <label htmlFor="email">Email :</label>
                    <input type="texte" id="email" name="email" ref={register}></input>
                </div>
                {errors.email && <span role="alert">{errors.email.message}</span>}

                <div className="form_champs">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" ref={register}></input>
                </div>
                {errors.password && <span role="alert">Mot de passe incorrect.</span>}

                <button className="button button-mat button-formulaire">
                    <div className="psuedo-text">se connecter</div>
                </button> 

            </form>
        </div>
    )
};

export default Connexion;