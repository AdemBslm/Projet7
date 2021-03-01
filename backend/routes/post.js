const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth")

const postCtrl = require('../controllers/post');
 
router.post('/', auth, postCtrl.createPublication);
router.get('/', auth, postCtrl.getAllPublication);
router.get('/:id', auth, postCtrl.getOnePublication);
router.delete('/:id', auth, postCtrl.deletePublication);
router.post('/:id/like', auth, postCtrl.likePublication);
router.get('/:id/like', auth, postCtrl.getLikes); 

module.exports = router;