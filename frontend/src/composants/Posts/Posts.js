import './Posts.scss';
import React from 'react';

import avatar from '../../Logos/Avatar/default.png';
import avatar2 from '../../Logos/Avatar/phototest.png';

import {useForm} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { faComment, faHeart, faPaperPlane, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';

const posts = [{
    "id": 0,
    "post": "Bonsoir a tous petit test blablablablablablablablabla et blablablalbalbalbalbalablballbalab Bonsoir a tous petit test blablablablablablablablabla et blablablalbalbalbalbalablballbalab Bonsoir a tous petit test blablablablablablablablabla et blablablalbalbalbalbalablballbalab Bonsoir a tous petit test blablablablablablablablabla et blablablalbalbalbalbalablballbalab Bonsoir a tous petit test blablablablablablablablabla et blablablalbalbalbalbalablballbalab Bonsoir a tous petit test blablablablablablablablabla et blablablalbalbalbalbalablballbalab Bonsoir a tous petit test blablablablablablablablabla et blablablalbalbalbalbalablballbalab",
    "image": null,
    "date": "2020-12-05T18:25:09.000Z",
    "user_id": 35,
    "first_name_user": "Adem",
    "last_name_user": "BSLM",
    "avatar_user": null
},{
    "id": 1,
    "post": "hello words",
    "image": "../../Logos/Avatar/default.png",
    "date": "2020-12-05T18:25:09.000Z",
    "user_id": 35,
    "first_name_user": "Bob",
    "last_name_user": "LeBrico",
    "avatar_user": null
},{
    "id": 2,
    "post": null,
    "image": "../../Logos/Avatar/default.png",
    "date": "2020-12-05T18:25:09.000Z",
    "user_id": 36,
    "first_name_user": "Nicolas",
    "last_name_user": "Dupont",
    "avatar_user": null
}]

const user_id = 35;

const schema = yup.object().shape({
    post: yup.string().max(255),
});

function AddPost(){

    const {register, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <form className="addPost" onSubmit={handleSubmit(onSubmit)}>
            <div className="texte-addPost">
                <img src={avatar} alt="imageAvatar" className="image-addPost"/>
                <textarea type="texte" id="post" name="post" ref={register} maxLength="255" placeholder="Quoi de neuf ?" wrap="soft"/>  
            </div>

            <div className="button-addPost">
                <input type="file" id="image" name="image" accept="image/png, image/jpeg" ref={register}/>
                <button className="button-send"><FontAwesomeIcon icon={faPaperPlane} className="icones icones-like"/> Envoyer</button>
            </div>
        </form>
    )
}

function Posts(){

    let history = useHistory();

    const allPosts = posts.map((posts) => 
        <div className="post" key={posts.id} onClick=''>
            <div className="profils">

                <div className="profils-user">
                    <div className="avatar">
                        <img src={avatar} alt="avatar" />
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

                {user_id === posts.user_id && <button className="button-delete" onClick={() => window.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")}><FontAwesomeIcon icon={faTrashAlt} className="icones icones-like"/></button>}

            </div>

            <div className="post-texte">
                {!posts.post ||
                    <div className="texte">
                        {posts.post}
                    </div>
                }
                {!posts.image || <img src={avatar2} alt="imagePost" className="image-post"/>}
            </div>

            <div className="button-like-comment">
                <button className="button-like"><FontAwesomeIcon icon={faHeart} className="icones icones-like"/> J'aime</button>
                <button className="button-comment" onClick={() => history.push('/Posts/' + posts.id)}><FontAwesomeIcon icon={faComment} className="icones"/> Commenter</button>
            </div>
        </div>
    );


    return(
        <div className="container">
            <AddPost />
            {allPosts}
        </div>
    )
};

export default Posts;