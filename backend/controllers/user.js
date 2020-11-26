const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            console.log("test")
            let user = new User(
                req.body.email,
                hash,
                req.body.firstName,
                req.body.lastName
            );
            console.log("test 2")
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        }) 
        .catch(error => res.status(500).json({ error })); 
};  
  

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(400).json({ error: "utilisateur non trouvé"});
            }
            console.log("2")
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log("3")
                    if (!valid) {
                        return res.status(400).json({error: "Mot de passe incorrect"});
                    }
                    console.log(user.id)
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(400).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};

exports.update = (req, res, next) => {
    User.findOneById(req)
        .then(user => {
            console.log(req.body)
            const userObject = req.file ?
            {
                ...JSON.parse(req.body.user),
                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {...req.body};
            user.update(req)
                .then(() => res.status(200).json({message: "Modified!"}))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};
  
exports.delete = (req, res, next) => {
    User.findOneById(req)
        .then(user => {
            console.log(user)
            user.deleteUser()
                .then(() => res.status(200).json({message: "Deleted !"}))
                .catch((error) => res.status(400).json({error: error}));
        })
        .catch((error) => res.status(500).json({error: error}));
};