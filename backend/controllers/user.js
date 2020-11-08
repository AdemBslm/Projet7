const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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


 
/* 
User.findOne(body.id, user => {
    user.firstName = body.firstName;
    user.update();
});
*/  
  

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "utilisateur non trouvé"});
            }
            console.log("2")
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log("3")
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect"});
                    }
                    console.log("4")
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(400).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};