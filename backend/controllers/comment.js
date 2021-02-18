const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
    const post_id = req.params.post_id

    const comment = new Comment( 
        req.body.comment,
        null,
        post_id,
        req.body.user_id,
        null
    );
    comment.save()
        .then(() => res.status(201).json({message: 'Comment saved successfully'}))
        .catch(error => res.status(400).json({error: error}));
};
 
exports.getAllComment = (req, res, next) => {
    Comment.find(req.params.post_id)  
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({error: error}));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOneById(req.params.id)
        .then(comment => {
            comment.delete()
                .then(() => res.status(200).json({message: "Deleted !"}))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};