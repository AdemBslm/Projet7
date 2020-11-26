const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createPublication = (req, res, next) => {
    const user_id = req.query.user_id
    const post = new Post(
        req.body.post,
        null,
        null,
        user_id,
        null
    );
    post.save()
        .then(() => res.status(201).json({message: 'Post saved successfully'}))
        .catch(error => res.status(400).json({error: error}));
};

exports.getOnePublication = (req, res, next) => {
    Post.findOneById(req) 
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error: error}));
};

exports.deletePublication = (req, res, next) => {
    Post.findOneById(req)
        .then(post => {
            post.delete()
                .then(() => res.status(200).json({message: "Deleted !"}))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};

exports.likePublication = (req, res, next) => {

};

exports.getAllPublication = (req, res, next) => {
    Post.find() 
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error: error}));
};

exports.createComment = (req, res, next) => {

};

exports.getAllComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

};