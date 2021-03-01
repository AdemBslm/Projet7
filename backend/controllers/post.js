const Post = require('../models/post');
const fs = require('fs');
const { verify } = require('crypto');

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
            console.log(post.image)
            fs.unlink(`${post.image}`, () => { 
                post.delete()
                    .then(() => res.status(200).json({message: "Deleted !"}))
                    .catch((error) => res.status(400).json({error: error}));
            })
        })
        .catch((error) => res.status(500).json({error: error}));
};




exports.likePublication = (req, res, next) => {
    switch(req.body.like) {
        case 0 :
            Post.findOneById(req.params.id)
                .then(post => {
                    post.dislike(req.body.user_id)
                        .then(() => res.status(201).json({message: "Like enlevé !"}))
                        .catch(error => res.status(400).json({error: error}));
                    })
                .catch(error => res.status(500).json({ error }));
            break;
        case 1 :
            Post.findOneById(req.params.id)
                .then(post => {
                    post.verifyLike(req.body.user_id,req.params.id)
                        .then(result => {
                            if (result == ""){
                                post.like(req.body.user_id)
                                    .then(() => res.status(201).json({message: "Like Ajouté !"}))
                                    .catch(error => res.status(400).json({error: error}));
                            }else{
                                res.status(400).json({message: "Like déjà présent !"})
                            }})
                    })
                .catch(error => res.status(500).json({ error }));
            break;
        default :    
            console.error('Bad request');
    }
};


exports.getLikes = (req, res, next) => {
    Post.findOneById(req.params.id)
        .then(post => {
            post.getLikes(req.params.id)
                .then(likes => res.status(200).json(likes))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};


exports.getAllPublication = (req, res, next) => {
    Post.find() 
        .then(posts => res.status(200).json(posts.reverse()))
        .catch(error => res.status(400).json({error: error}));
};