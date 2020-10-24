const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/', postCtrl.createPublication);
router.get('/', postCtrl.getAllPublication);
router.get('/:id', postCtrl.getOnePublication);
router.delete('/:id', postCtrl.deletePublication);
router.put('/:id', postCtrl.modifyPublication);
router.post('/:id/like', postCtrl.likePublication);
router.post('/:id/comments', postCtrl.createComment);
router.get('/:id/comments', postCtrl.getAllComment);
router.delete('/:id/comments/:id', postCtrl.deleteComment);

module.exports = router;