import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import avatarDefault from '../../Logos/Avatar/default.png';

import Profil from './Header';

import {useForm} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize'; 

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const schema = yup.object().shape({
    comment: yup.string().max(255),
});

const user_id = parseInt(localStorage.getItem("userId"));

function Post(){
    
    let { id } = useParams();
    let history = useHistory();

    const [post, setPost] = useState([]);
    const [avatar, setAvatar] = useState(null)

    const token = localStorage.getItem('miniToken')

    useEffect(function () {
        (async function () {
            const response = await axios.get('http://localhost:3000/api/posts/' + id, {headers: {'Authorization': `Bearer ${token}`}});
            const responseData = response.data
            console.log(response)
            if (response.status === 200){
                setPost(responseData)
                setAvatar(responseData.avatar_user)
            } else {
                alert(JSON.stringify(responseData))
            }
        })()
    },[token, id])

    const deletePost = async(id) => {
        if(window.confirm('Êtes-vous sûr de vouloir supprimer votre publication ?')){
            axios.delete('http://localhost:3000/api/posts/' + id ,{headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                console.log(res.data);
                history.push('/Posts')
            })
        } else {
            console.log("Annulation")
        }
    }

    return (
        <div className="post" key={post.id}>
            <div className="profils">
                
                <div className="profils-user">
                    <div className="avatar">
                        
                    {avatar === null ? <img src={avatarDefault} alt="imageAvatar" className="image-addPost"/> : <img src={'http://localhost:3000/' + avatar} alt="imageAvatar" className="image-addPost"/>}
                    </div>

                    <div className="names-date"> 
                        <div className="name">
                            {post.first_name_user} {post.last_name_user}
                        </div>
                        <div className="date">
                            {post.date}
                        </div>
                    </div>
                </div>
 
                {user_id === post.user_id && <button className="button-delete" onClick={() => deletePost(post.id)}><FontAwesomeIcon icon={faTrashAlt} className="icones icones-like"/></button>}

            </div>

            <div className="post-texte">
                {!post.post ||
                    <div className="texte">
                        {post.post}
                    </div>
                }
                {!post.image || <img src={post.image} alt="imagePost" className="image-post"/>}
            </div>
        </div>
    )
}


function Comment() {

    let { id } = useParams();
    const token = localStorage.getItem('miniToken'); 
    const avatar = localStorage.getItem('avatar');


    const [comments, setComments] = useState([]);
    const [handleComments, setHandleComments] = useState(0)

    useEffect(function () {
        (async function () {
            const response = await axios.get('http://localhost:3000/api/posts/' + id + '/comments', {headers: {'Authorization': `Bearer ${token}`}});
            const responseData = response.data
            console.log(response)
            if (response.status === 200){
                setComments(responseData)
            } else {
                alert(JSON.stringify(responseData))
            }
        })()
    },[token, id, handleComments])


    const deleteComment = async(commentId) => {
        if(window.confirm('Êtes-vous sûr de vouloir supprimer votre commentaire ?')){
            axios.delete('http://localhost:3000/api/posts/' + id + '/comments/' + commentId ,{headers: {'Authorization': `Bearer ${token}`}})
            .then(() => {
                setHandleComments(handleComments => handleComments + 1)
            })
        } else {
            console.log("Annulation")
        }
    }

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        const comment = {
            "user_id": user_id,
            "comment": data.comment,
        }
            
        try{
            const response = await axios.post('http://localhost:3000/api/posts/' + id + '/comments', comment, {headers: {'Authorization': `Bearer ${token}`}});
            console.log(response)
            setHandleComments(handleComments => handleComments + 1)
            console.log(handleComments)
        } catch ({response}){
            console.log(response)
        }

        e.target.reset();
    }

    return (
        <>
        <form className="addPost" onSubmit={handleSubmit(onSubmit)}>
                <div className="texte-addPost">
                    
                {avatar === null ? <img src={avatarDefault} alt="imageAvatar" className="image-addPost"/> : <img src={'http://localhost:3000/' + avatar} alt="imageAvatar" className="image-addPost"/>}
                    <TextareaAutosize type="texte" id="comment" name="comment" ref={register} maxLength="255" placeholder="Laisser un commentaire." wrap="soft"/>  
                </div>
    
                <div className="button-addPost">
                    <button className="button-send"><FontAwesomeIcon icon={faPaperPlane} className="icones icones-like"/> Envoyer</button>
                </div>
            </form>
        <div className="comments">
            {comments.map((comments) => 
            <div className="comment" key={comments.id}>
                <div className="profils">

                    <div className="profils-user">
                        <div className="avatar">
                            {comments.avatar_user === null ? <img src={avatarDefault} alt="avatarProfil" /> : <img src={'http://localhost:3000/' + comments.avatar_user} alt="avatarProfil" />}
                        </div>

                        <div className="names-date"> 
                            <div className="name">
                                {comments.first_name_user} {comments.last_name_user}
                            </div>
                            <div className="date">
                                {comments.date}
                            </div>
                        </div>
                    </div>
                    
                    {user_id === comments.user_id && <button className="button-delete" onClick={() => deleteComment(comments.id)}><FontAwesomeIcon icon={faTrashAlt} className="icones icones-like"/></button>}

                </div>

                <div className="comment-texte">
                    {comments.comment}
                </div>
            </div>
            )}
        </div>
        </>
    )
}


function PostId() {

    let history = useHistory();

    return (
        <div className="forum">
            <Profil className="profil" />
            <div className='container'>
                <button className="button-return" onClick={() => history.push('/Posts')}> <FontAwesomeIcon icon={faArrowLeft} className="icones"/> Retour</button>
                <Post />
                <Comment />
            </div>
        </div>
    )
}

export default PostId;