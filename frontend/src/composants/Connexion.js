import '../scss/Connexion.scss';
import React from 'react';


function Connexion(){
    return(
        <div>
            <form>

                <h1>Connectez-vous</h1>

                <div className="form_champs"> 
                    <label htmlFor="mail">Email :</label>
                    <input type="texte" id="mail" name="mail"></input>
                </div>

                <div className="form_champs">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="texte" id="password" name="password"></input>
                </div>

                <button className="button button-mat">
                    <div className="psuedo-text">se connecter</div>
                </button> 

            </form>
        </div>
    )
};

export default Connexion;