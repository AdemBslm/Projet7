const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth")

const commentCtrl = require('../controllers/comment');

router.post('/:post_id/comments/', auth, commentCtrl.createComment);
router.get('/:post_id/comments/', auth, commentCtrl.getAllComment);
router.delete('/:post_id/comments/:id', auth, commentCtrl.deleteComment);
 
module.exports = router;