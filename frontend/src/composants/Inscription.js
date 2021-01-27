import '../scss/Inscription.scss';

import React from 'react';

function Inscription(){
    return(
        <div>

            <form>

                <h1>Inscrivez-vous</h1>

                <div className="form_champs"> 
                    <label htmlFor="nom">Nom :</label>
                    <input type="texte" id="nom" name="nom"></input>
                </div>

                <div className="form_champs"> 
                    <label htmlFor="prenom">Prénom :</label>
                    <input type="texte" id="prenom" name="prenom"></input>
                </div>

                <div className="form_champs"> 
                    <label htmlFor="mail">Email :</label>
                    <input type="texte" id="mail" name="mail"></input>
                </div>

                <div className="form_champs">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="texte" id="password" name="password"></input>
                </div>

                <button className="button button-mat">
                    <div className="psuedo-text">s'inscrire</div>
                </button> 

            </form>

        </div>
    )
};

export default Inscription;