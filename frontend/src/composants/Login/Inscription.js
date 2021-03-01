import {useForm} from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Navigation from "./Navigation";
import logo from '../../Logos/icon-above-font.png';
import { login, signup } from '../Auth/AuthApi';
import Auth from '../Auth/Auth';


const schema = yup.object().shape({
    lastName: yup.string().matches(/^[a-zA-Zà-ÿÀ-Ÿ-]+$/,'Ecriture incorrect').required('Veuillez mettre un nom !'),
    firstName: yup.string().matches(/^[a-zA-Zà-ÿÀ-Ÿ-]+$/,'Ecriture incorrect').required('Veuillez mettre un prénom !'),
    email: yup.string().email().required('Veuillez mettre un email !'),
    password: yup.string().min(6,"Mot de passe trop court !").required('Veuillez mettre un mot de passe !'),
});


function Inscription({history}){

    const {isAuthenticated, setIsAuthenticated} = useContext(Auth)

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });

    const [status, setStatus] = useState("")

    const onSubmit = async data => {
        try{
            await signup(data);
            const responseLogin = await login(data);
            setIsAuthenticated(responseLogin)
            history.replace('/Posts')
        } catch ({response}){
            setStatus(response.status)
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

                <h1>Inscrivez-vous</h1>

                <div className="form_champs"> 
                    <label htmlFor="lastName">Nom :</label>
                    <input type="texte" id="lastName" name="lastName" ref={register}></input>
                </div>
                {errors.lastName && <span role="alert">{errors.lastName.message}</span>}


                <div className="form_champs"> 
                    <label htmlFor="firstName">Prénom :</label>
                    <input type="texte" id="firstName" name="firstName" ref={register}></input>
                </div>
                {errors.firstName && <span role="alert">{errors.firstName.message}</span>}

                <div className="form_champs"> 
                    <label htmlFor="email">Email :</label>
                    <input type="texte" id="email" name="email" ref={register}></input>
                </div>
                {errors.email && <span role="alert">{errors.email.message}</span>}

                <div className="form_champs">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" ref={register}></input>
                </div>
                {errors.password && <span role="alert">{errors.password.message}</span>}

                {status === 400 && <p>Adresse mail déjà utilisé.</p>}
                <button className="button button-mat button-formulaire">
                    <div className="psuedo-text">s'inscrire</div>
                </button> 

            </form>

        </div>
    )
};

export default Inscription;