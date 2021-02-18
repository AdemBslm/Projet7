import './UpdateAvatar.scss';
import React from "react";

import avatarDefault from '../../Logos/Avatar/default.png';
import {useForm} from 'react-hook-form';

import Profil from './Header';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
//import axios from 'axios';

const schema = yup.object().shape({
    avatar: yup.string().max(255),
});

//const user_id = parseInt(localStorage.getItem('userId'));
const avatarUser = localStorage.getItem('avatar');
//const token = localStorage.getItem('miniToken');

function UpdateAvatar(){

    let history = useHistory();

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        console.log(data)

        /*const avatar = {
            "avatar": image
        }
        
        console.log(avatar)
        try{
            const response = await axios.update('http://localhost:3000/api/auth/' + user_id, avatar, {headers: {'Authorization': `Bearer ${token}`}});
            console.log(response);
            window.location.reload()
        } catch ({response}){
            console.log(response)
        }*/
    }

    return(
        
        <div className="forum">
            <Profil className="profil" />
            <div className="updateAvatar">
                <button className="button-return" onClick={() => history.push('/Posts')}> <FontAwesomeIcon icon={faArrowLeft} className="icones"/> Retour</button>
                {avatarUser === "null" ? <img src={avatarDefault} alt="avatarProfil" className="avatar"/> : <img src={avatarUser} alt="avatarProfil" className="avatar"/>}

                <form className="updateAvatarForm" onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" ref={register}/>
                    <button className="button-send"><FontAwesomeIcon icon={faPaperPlane} className="icones"/> Envoyer</button>
                </form>

            </div>
        </div>
    )
}

export default UpdateAvatar;