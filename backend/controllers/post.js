const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createPublication = (req, res, next) => {
    const user_id = req.params.user_id
    console.log(req.params.user_id)
    const post = new Post(
        req.body.post,
        null,
        user_id,
        null
    );
    console.log(post)
    post.save()
        .then(() => res.status(201).json({message: 'Post saved successfully'}))
        .catch(error => res.status(400).json({error: error}));
};

exports.getAllPublication = (req, res, next) => {

};

exports.getOnePublication = (req, res, next) => {

};

exports.deletePublication = (req, res, next) => {

};

exports.modifyPublication = (req, res, next) => {

};

exports.likePublication = (req, res, next) => {

};

exports.createComment = (req, res, next) => {

};

exports.getAllComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

};