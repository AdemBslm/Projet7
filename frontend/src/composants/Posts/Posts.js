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

const schema = yup.object().shape({
    post: yup.string().max(255),
});

function Likes(post) {

    const token = localStorage.getItem('miniToken')

    const [likes, setLikes] = useState([]);
    const [handleLikes, setHandleLikes] = useState(0);

    
    const user_id = parseInt(localStorage.getItem('userId'));


    useEffect(function () {
        (async function () {
            const response = await axios.get('http://localhost:3000/api/posts/' + post.id + '/like', {headers: {'Authorization': `Bearer ${token}`}});
            const responseData = response.data
            if (response.status === 200){
                setLikes(responseData)
            
            } else {
                alert(JSON.stringify(responseData))
            }
        })()
    },[token, post.id, handleLikes])

    const likePost = likes.find(likePost => likePost.user_id === user_id)

    const clickLike = (id, like) => {
        console.log(like)
        axios.post('http://localhost:3000/api/posts/' + id + '/like', like ,{headers: {'Authorization': `Bearer ${token}`}})
        .then(() => {
            setHandleLikes(handleLikes => handleLikes + 1)
        })
    }

    return <>
        {likePost === undefined ? 
            <button className="button-like dislike" onClick={() => clickLike(post.id, {like: 1,user_id: user_id})}>{likes.length} <FontAwesomeIcon icon={faHeart} className="icones icones-like"/> J'aime</button>
        :
            <button className="button-like like" onClick={() => clickLike(post.id, {like: 0,user_id: user_id})}>{likes.length} <FontAwesomeIcon icon={faHeart} className="icones icones-like"/> J'aime</button>}
        </>
}

function Posts(){

    let history = useHistory();
    
    const [posts, setPosts] = useState([]);
    const [handlePosts, setHandlePosts] = useState(0);

    const [file, setFile] = useState('');
    const [fileMessageError, setFileMessageError] = useState(false);

    const token = localStorage.getItem('miniToken')
    const avatar = localStorage.getItem('avatar');
    const user_id = parseInt(localStorage.getItem('userId'));


    const MIME_TYPES = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif'
    ];

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
            try{
                await axios.delete('http://localhost:3000/api/posts/' + id ,{headers: {'Authorization': `Bearer ${token}`}})
            }catch ({response}){
                console.log(response)
            }
            setHandlePosts(handlePosts => handlePosts + 1)
        } else {
            console.log("Annulation")
        }
    }

    //Début addPost
    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const onChange = e => {
        if(e.target.files[0] !== undefined){
            const type = MIME_TYPES.find(type => type === e.target.files[0].type)
            if(type === undefined){
                setFileMessageError(true)
            }else{
                setFileMessageError(false)  
            }
        }
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    
    const onSubmit = async (data, e) => {
        if(data.post.replace(/ /g,"").replace(/\n|\r/g,'') === ""  && data.image.length === 0){
            return false;
        }
        
        console.log(file)
        if(file !== undefined && file !== ''){
            const type = MIME_TYPES.find(type => type === file.type)
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
            console.log(response.data.filePath)
            const post = {
                "user_id": user_id,
                "post": data.post,
                "image": response.data.filePath
            }
            const responsePost = await axios.post('http://localhost:3000/api/posts', post, {headers: {'Authorization': `Bearer ${token}`}});
            console.log(responsePost);
            setHandlePosts(handlePosts => handlePosts + 1)
            setFile('')
        } catch ({response}){
            console.log(response)
        }

        e.target.reset();

    }
    //Fin addPost

    return(
        
        <div className="forum">
            <Profil className="profil" />
            <div className="container">
                <form className="addPost" onSubmit={handleSubmit(onSubmit)}>
                    <div className="texte-addPost">
                        {(avatar === "null" || avatar === "undefined") ? <img src={avatarDefault} alt="imageAvatar" className="image-addPost"/> : <img src={'http://localhost:3000/' + avatar} alt="imageAvatar" className="image-addPost"/>}
                        <TextareaAutosize type="texte" id="post" name="post" ref={register} maxLength="255" placeholder="Quoi de neuf ?" wrap="soft"/>  
                    </div>

                    <div className="button-addPost">
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg" ref={register} onChange={onChange} />
                        <button className="button-send"><FontAwesomeIcon icon={faPaperPlane} className="icones"/> Envoyer</button>
                    </div>
                    {fileMessageError && <span role="alert">Le type du fichier n'est pas accepté.</span>}
                </form>
                
                {posts.map((post) => 
                <div className="post" key={post.id}>
                    <div className="profils">

                        <div className="profils-user">
                            <div className="avatar">
                            {post.avatar_user === null ? <img src={avatarDefault} alt="imageAvatar" className="image-addPost"/> : <img src={'http://localhost:3000/' + post.avatar_user} alt="imageAvatar" className="image-addPost"/>}
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
                        {!post.image || <img src={'http://localhost:3000/' + post.image} alt="imagePost" className="image-post"/>}
                    </div>

                    <div className="button-like-comment">
                        <Likes id={post.id}/>
                        <button className="button-comment" onClick={() => history.push('/Posts/' + post.id)}><FontAwesomeIcon icon={faComment} className="icones"/> Commenter</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
};

export default Posts;