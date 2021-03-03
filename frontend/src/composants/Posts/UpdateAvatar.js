import './UpdateAvatar.scss';
import React, { useState } from "react";

import avatarDefault from '../../Logos/Avatar/default.png';
import {useForm} from 'react-hook-form';

import Profil from './Header';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const schema = yup.object().shape({
    avatar: yup.string().max(255),
});

const MIME_TYPES = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif'
];

function UpdateAvatar(){

    const user_id = parseInt(localStorage.getItem('userId'));
    const token = localStorage.getItem('miniToken');

    let history = useHistory();
    const [file, setFile] = useState('');
    const [fileMessageError, setFileMessageError] = useState(false)
    const avatarUser = localStorage.getItem('avatar');

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const onChange = e => {
        console.log(e.target.files[0])
        if(e.target.files[0] !== undefined){
            setFile(e.target.files[0])
            const type = MIME_TYPES.find(type => type === e.target.files[0].type)
            if(type === undefined){
                setFileMessageError(true)
            }else{
                setFileMessageError(false)  
            }
        }
    }
    
    const onSubmit = async data => {
        console.log(file)
        if(data.avatar.length === 0){
            return false;
        }
        if(file !== undefined){
            const type = MIME_TYPES.find(type => type === file.type)
            console.log(type)
            if(type === undefined){
                setFileMessageError(true)
                return false
            }else{
                setFileMessageError(false)  
            }
        }
        
        const formData = new FormData();
        formData.append('file', file);


        try{
            const response = await axios.post('http://localhost:3000/upload', formData, {headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'multipart/form-data'}});
           const post = {
                "avatar": response.data.filePath,
                "userId": user_id
            }
            localStorage.setItem('avatar', response.data.filePath)

            await axios.put('http://localhost:3000/api/auth/' + user_id, post, {headers: {'Authorization': `Bearer ${token}`}});
        } catch ({response}){
            console.log(response)
        }
    }

    return(
        
        <div className="forum">
            <Profil className="profil" />
            <div className="updateAvatar">
                <button className="button-return" onClick={() => history.push('/Posts')}> <FontAwesomeIcon icon={faArrowLeft} className="icones"/> Retour</button>
                {(avatarUser === "null" || avatarUser === "undefined") ? <img src={avatarDefault} alt="avatarProfil" className="avatar"/> : <img src={'http://localhost:3000/' + avatarUser} alt="avatarProfil" className="avatar"/>}

                <form className="updateAvatarForm" onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" ref={register} onChange={onChange}/>
                    <button className="button-send"><FontAwesomeIcon icon={faPaperPlane} className="icones"/> Envoyer</button>
                </form>
                {fileMessageError && <span role="alert">Le type du fichier n'est pas accepté.</span>}

            </div>
        </div>
    )
}

export default UpdateAvatar;