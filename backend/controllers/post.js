const Post = require('../models/post');
const fs = require('fs');

exports.createPublication = (req, res, next) => {
    const post = new Post(
        req.body.post,
        req.body.image,
        null,
        req.body.user_id,
        null
    ); 
    post.save()
        .then(() => res.status(201).json({message: 'Post saved successfully'}))
        .catch(error => res.status(400).json({error: error}));
};




exports.getOnePublication = (req, res, next) => {
    Post.getOnePostById(req.params.id) 
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error: error}));
};




exports.deletePublication = (req, res, next) => {
    Post.findOneById(req.params.id)
        .then(post => {
            console.log(post)
            post.delete()
                .then(() => res.status(200).json({message: "Deleted !"}))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};




exports.likePublication = (req, res, next) => {
    switch(req.body.like) {
        case 0 :
            Post.findOneById(req.params.id)
                .then(post => {
                    post.dislike(req.params.id, req.body.user_id)
                        .then(() => res.status(201).json({message: "Like enlevé !"}))
                        .catch(error => res.status(400).json({error: error}));
                    })
                .catch(error => res.status(500).json({ error }));
            break;
        case 1 :
            Post.findOneById(req.params.id)
                .then(post => {
                    post.like(req.params.id, req.body.user_id)
                        .then(() => res.status(201).json({message: "Like rajouté !"}))
                        .catch(error => res.status(400).json({error: error}));
                    })
                .catch(error => res.status(500).json({ error }));
            break;
        default :    
            console.error('Bad request');
    }
};




exports.getAllPublication = (req, res, next) => {
    Post.find() 
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error: error}));
};