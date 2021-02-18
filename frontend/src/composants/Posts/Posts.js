import './Posts.scss';
import React, { useEffect, useState } from 'react';

import avatarDefault from '../../Logos/Avatar/default.png';

import Profil from './Header';

import {useForm} from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { faComment, faPaperPlane, faHeart, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const user_id = parseInt(localStorage.getItem('userId'));
const avatar = localStorage.getItem('avatar');

const schema = yup.object().shape({
    post: yup.string().max(255),
});

function Likes(id) {

    const token = localStorage.getItem('miniToken')

    const [likes, setLikes] = useState([]);
    const [handleLikes, setHandleLikes] = useState(0);

    useEffect(function () {
        (async function () {
            const response = await axios.get('http://localhost:3000/api/posts/' + id.id + '/like', {headers: {'Authorization': `Bearer ${token}`}});
            const responseData = response.data
            if (response.status === 200){
                setLikes(responseData)
            
            } else {
                alert(JSON.stringify(responseData))
            }
        })()
    },[token, id, handleLikes])

    const likePost = likes.find(likePost => likePost.user_id === user_id)

    const clickLike = (id, like) => {
        console.log(like)
        axios.post('http://localhost:3000/api/posts/' + id + '/like', like ,{headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            setHandleLikes(handleLikes => handleLikes + 1)
        })
    }

    return <>
        {likePost === undefined ? 
            <button className="button-like dislike" onClick={() => clickLike(id.id, {like: 1,user_id: user_id})}>{likes.length} <FontAwesomeIcon icon={faHeart} className="icones icones-like"/> J'aime</button>
        :
            <button className="button-like like" onClick={() => clickLike(id.id, {like: 0,user_id: user_id})}>{likes.length} <FontAwesomeIcon icon={faHeart} className="icones icones-like"/> J'aime</button>}
        </>
}

function Posts(){

    let history = useHistory();
    
    const [posts, setPosts] = useState([]);
    const [handlePosts, setHandlePosts] = useState(0);

    const token = localStorage.getItem('miniToken')

    useEffect(function () {
        (async function () {
            const response = await axios.get('http://localhost:3000/api/posts', {headers: {'Authorization': `Bearer ${token}`}});
            const responseData = response.data
            console.log(response)
            if (response.status === 200){
                setPosts(responseData)
            } else {
                alert(JSON.stringify(responseData))
            }
        })()
    },[token, handlePosts])

    const deletePost = async(id) => {
        if(window.confirm('Êtes-vous sûr de vouloir supprimer votre publication ?')){
            axios.delete('http://localhost:3000/api/posts/' + id ,{headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                setHandlePosts(handlePosts => handlePosts + 1)
            })
        } else {
            console.log("Annulation")
        }
    }

    //Début addPost
    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {

        const image = data.image[0].name

        const post = {
            "user_id": user_id,
            "post": data.post,
            "image": image
        }
        
        try{
            const response = await axios.post('http://localhost:3000/api/posts', post, {headers: {'Authorization': `Bearer ${token}`}});
            console.log(response);
            setHandlePosts(handlePosts => handlePosts + 1)
        } catch ({response}){
            console.log(response)
        }
    }
    //Fin addPost

    return(
        
        <div className="forum">
            <Profil className="profil" />
            <div className="container">
                <form className="addPost" onSubmit={handleSubmit(onSubmit)}>
                    <div className="texte-addPost">
                        {avatar === "null" ? <img src={avatarDefault} alt="imageAvatar" className="image-addPost"/> : <img src={avatar} alt="imageAvatar" className="image-addPost"/>}
                        <TextareaAutosize type="texte" id="post" name="post" ref={register} maxLength="255" placeholder="Quoi de neuf ?" wrap="soft"/>  
                    </div>

                    <div className="button-addPost">
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg" ref={register}/>
                        <button className="button-send"><FontAwesomeIcon icon={faPaperPlane} className="icones"/> Envoyer</button>
                    </div>
                </form>
                
                {posts.map((posts) => 
                <div className="post" key={posts.id}>
                    <div className="profils">

                        <div className="profils-user">
                            <div className="avatar">
                            {avatar === "null" ? <img src={avatarDefault} alt="imageAvatar" className="image-addPost"/> : <img src={avatar} alt="imageAvatar" className="image-addPost"/>}
                            </div>

                            <div className="names-date"> 
                                <div className="name">
                                    {posts.first_name_user} {posts.last_name_user}
                                </div>
                                <div className="date">
                                    {posts.date}
                                </div>
                            </div>
                        </div>
                    
                        {user_id === posts.user_id && <button className="button-delete" onClick={() => deletePost(posts.id)}><FontAwesomeIcon icon={faTrashAlt} className="icones icones-like"/></button>}

                    </div>

                    <div className="post-texte">
                        {!posts.post ||
                            <div className="texte">
                                {posts.post}
                            </div>
                        }
                        {!posts.image || <img src={posts.image} alt="imagePost" className="image-post"/>}
                    </div>

                    <div className="button-like-comment">
                        <Likes id={posts.id}/>
                        <button className="button-comment" onClick={() => history.push('/Posts/' + posts.id)}><FontAwesomeIcon icon={faComment} className="icones"/> Commenter</button>
                    </div>
                </div>
                )};
            </div>
        </div>
    )
};

export default Posts;