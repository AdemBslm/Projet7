import React from 'react';
import { useHistory } from 'react-router-dom';

import avatar from '../../Logos/Avatar/default.png';
import avatar2 from '../../Logos/Avatar/phototest.png';

import {useForm} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

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
    "user_id": 35,
    "first_name_user": "Nicolas",
    "last_name_user": "Dupont",
    "avatar_user": null
}]

const comments = [{
    "id": 0,
    "comment": "Bonsoir a tous petit blalbalbalbalbalablballbalab Bonsoir a tous petit test blablablabla",
    "date": "2020-12-05T18:25:09.000Z",
    "post_id": 0,
    "user_id": 35,
    "first_name_user": "Adem",
    "last_name_user": "BSLM",
    "avatar_user": null
},{
    "id": 1,
    "comment": "hello words",
    "date": "2020-12-05T18:25:09.000Z",
    "post_id": 0,
    "user_id": 34,
    "first_name_user": "Bob",
    "last_name_user": "LeBrico",
    "avatar_user": null
},{
    "id": 2,
    "comment": "yo",
    "date": "2020-12-05T18:25:09.000Z",
    "post_id": 0,
    "user_id": 35,
    "first_name_user": "Nicolas",
    "last_name_user": "Dupont",
    "avatar_user": null
}]

const schema = yup.object().shape({
    comment: yup.string().max(255),
});

const user_id = 35;

function AddComment(){

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
                <textarea type="texte" id="comment" name="comment" ref={register} maxLength="255" placeholder="Laisser un commentaire." wrap="soft"/>  
            </div>

            <div className="button-addPost">
                <button className="button-send"><FontAwesomeIcon icon={faPaperPlane} className="icones icones-like"/> Envoyer</button>
            </div>
        </form>
    )
}

function Post(){
    
    //let {id} = useParams();
    let id = 0;

    return (
        <div className="post" key={posts[id].id} onClick=''>
            <div className="profils">
                
                <div className="profils-user">
                    <div className="avatar">
                        <img src={avatar} alt="avatar" />
                    </div>

                    <div className="names-date"> 
                        <div className="name">
                            {posts[id].first_name_user} {posts[id].last_name_user}
                        </div>
                        <div className="date">
                            {posts[id].date}
                        </div>
                    </div>
                </div>
 
                {user_id === posts[id].user_id && <button className="button-delete" onClick={() => window.confirm("Êtes-vous sûr de vouloir supprimer cette publication ?")}><FontAwesomeIcon icon={faTrashAlt} className="icones icones-like"/></button>}

            </div>

            <div className="post-texte">
                {!posts[id].post ||
                    <div className="texte">
                        {posts[id].post}
                    </div>
                }
                {!posts[id].image || <img src={avatar2} alt="imagePost" className="image-post"/>}
            </div>
        </div>
    )
}

function Comment() {
    const allComments = comments.map((comments) => 
        <div className="comment" key={comments.id} onClick=''>
            <div className="profils">

                <div className="profils-user">
                    <div className="avatar">
                        <img src={avatar} alt="avatar" />
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
                
                {user_id === comments.user_id && <button className="button-delete" onClick={() => window.confirm("Êtes-vous sûr de vouloir supprimer votre commentaire ?")}><FontAwesomeIcon icon={faTrashAlt} className="icones icones-like"/></button>}

            </div>

            <div className="comment-texte">
                {comments.comment}
            </div>
        </div>
    );

    return (
        <div className="comments">
            {allComments}
        </div>
    )
}


function PostId() {

    let history = useHistory();
    
    return (
        <div className='container'>
            <button className="button-return" onClick={() => history.push('/Posts')}> <FontAwesomeIcon icon={faArrowLeft} className="icones"/> Retour</button>
            <AddComment />
            <Post />
            <Comment />
        </div>
    )
}

export default PostId;