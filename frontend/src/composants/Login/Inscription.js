import {useForm} from 'react-hook-form';
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object().shape({
    nom: yup.string().matches(/^[a-zA-Zà-ÿÀ-Ÿ-]+$/,'Ecriture incorrect').required('Veuillez mettre un nom !'),
    prenom: yup.string().matches(/^[a-zA-Zà-ÿÀ-Ÿ-]+$/,'Ecriture incorrect').required('Veuillez mettre un prénom !'),
    mail: yup.string().email().required('Veuillez mettre un email !'),
    password: yup.string().min(6,"Mot de passe trop court !").required('Veuillez mettre un mot de passe !'),
});


function Inscription(){

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log(data)
    }

    return(
        <div>

            <form className="formulaire" onSubmit={handleSubmit(onSubmit)}>

                <h1>Inscrivez-vous</h1>

                <div className="form_champs"> 
                    <label htmlFor="nom">Nom :</label>
                    <input type="texte" id="nom" name="nom" ref={register}></input>
                </div>
                {errors.nom && <span role="alert">{errors.nom.message}</span>}


                <div className="form_champs"> 
                    <label htmlFor="prenom">Prénom :</label>
                    <input type="texte" id="prenom" name="prenom" ref={register}></input>
                </div>
                {errors.prenom && <span role="alert">{errors.prenom.message}</span>}

                <div className="form_champs"> 
                    <label htmlFor="mail">Email :</label>
                    <input type="texte" id="mail" name="mail" ref={register}></input>
                </div>
                {errors.mail && <span role="alert">{errors.mail.message}</span>}

                <div className="form_champs">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" ref={register}></input>
                </div>
                {errors.password && <span role="alert">{errors.password.message}</span>}

                <button className="button button-mat button-formulaire">
                    <div className="psuedo-text">s'inscrire</div>
                </button> 

            </form>

        </div>
    )
};

export default Inscription;