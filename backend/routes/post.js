const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth")
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');
 
router.post('/', auth, postCtrl.createPublication);
router.get('/', auth, postCtrl.getAllPublication);
router.get('/:id', auth, postCtrl.getOnePublication);
router.delete('/:id', auth, postCtrl.deletePublication);
router.post('/:id/like', auth, postCtrl.likePublication);

module.exports = router;