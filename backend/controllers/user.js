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
    const emailVerification = email.split("@");
    const emailVerificationPoint = emailVerification[1].split(".");
    const emailRegex =  /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(emailRegex.test(email) === false || emailVerificationPoint.length !== 2 ){
        return res.status(401).json({ message: "L'Email n'est pas au bon format. Voici un exemple: exemple@gmail.fr "});
    }
    if((password.length >= 8 && password.match( /[A-Z]/g) && password.match(/[a-z]/g) && password.match(/[^a-zA-Z\d]/g)) === null ){
        return res.status(401).json({ message: "Le mot de passe doit contenir au moins 8 caractères dont au moins 1 lettre majuscule, 1 lettre minuscule et 1 caractère spécial"});
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user)
            if (user) {
                return res.status(401).json({ message: "utilisateur déjà existant"});
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