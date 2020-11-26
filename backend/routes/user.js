const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require("../middleware/auth")


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer, userCtrl.update);
router.delete('/:id', auth, userCtrl.delete);

module.exports = router;