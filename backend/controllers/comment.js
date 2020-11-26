const Comment = require('../models/comment');

exports.createComment = (req, res, next) => {
    const post_id = req.query.post_id
    const user_id = req.query.user_id
    const comment = new Comment(
        req.body.comment,
        null,
        post_id,
        user_id,
        null
    );
    comment.save()
        .then(() => res.status(201).json({message: 'Comment saved successfully'}))
        .catch(error => res.status(400).json({error: error}));
};
 
exports.getAllComment = (req, res, next) => {
    Comment.find()  
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({error: error}));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOneById(req)
        .then(comment => {
            comment.delete()
                .then(() => res.status(200).json({message: "Deleted !"}))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};