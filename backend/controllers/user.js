const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
 
exports.signup = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    if(!email || !password || !lastName || !firstName){
        return res.status(401).send({ message: "Tous les champs ne sont pas remplis."});
    } 
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user)
            if (user) {
                return res.status(401).json({ error: "utilisateur déjà existant"});
            }
            bcrypt.hash(password, 10)
                .then((hash) => {
                    let user = new User(
                        email,
                        hash,
                        firstName,
                        lastName
                    );
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                }) 
                .catch(error => res.status(500).json({ error })); 
            })
        .catch(error => res.status(500).json({ error}));
};  
  

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "utilisateur non trouvé"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect"});
                    }
                    console.log(user.id)
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '72h' }
                        ),
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar
                    }); 
                })
                .catch(error => res.status(500).json({ error: "test"}));
        })
        .catch(error => res.status(500).json({ error}));
};

exports.update = (req, res, next) => {
    User.findOneById(req.params.id)
        .then(user => {
            console.log(user)
            fs.unlink(`${user.avatar}`, () => { 
                user.update(req.body.avatar, req.body.userId)
                    .then(() => res.status(200).json({message: "Modified!"}))
                    .catch((error) => res.status(400).json({error: error}));
            })
        })
        .catch((error) => res.status(500).json({error: error}));
};
  
exports.delete = (req, res, next) => {
    User.findOneById(req.params.id)  
        .then(user => {
            user.deleteUser()
                .then(() => res.status(200).json({message: "Deleted !"}))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};