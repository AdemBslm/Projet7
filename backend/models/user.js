const mysql = require('mysql');
const db = require('../connection');

class User {
    constructor(email, password, firstName, lastName, avatar, id) {
        this.id = id || null;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = null
    }

    static findOne(user) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE email = ?", [user.email], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(new User(result[0].email, result[0].password, result[0].first_name, result[0].last_name, result[0].avatar, result[0].id));

            }) 
        })
    }
 
    static findOneById(req) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(new User(result[0].email, result[0].password, result[0].first_name, result[0].last_name, result[0].avatar, result[0].id));

            }) 
        })
    }

    save() {
        return new Promise((resolve, reject) => {
            let user = [this.email, this.password, this.firstName, this.lastName];
            let sql = "INSERT INTO user SET email = ?, password = ?, first_name = ?, last_name = ?"
            db.query(sql, user, err => {
                    if (err) {
                        return reject(err)
                    }else{
                        db.query("SELECT LAST_INSERT_ID()", [], (err, res) => {
                            if (err) {
                                return reject(err)
                            }else{
                                this.id = res;
                                return resolve()
                            }
                        })
                    }
                })
        })

    };
    
    deleteUser() {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM user WHERE id = ?";
            let id = [this.id]

            db.query(sql, id, err => {
                if (err) {
                    return reject(err);
                }
                return resolve()
            })
        }) 
    };

    update() {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE user SET avatar = ? WHERE id = ?";
            let user = [this.avatar, this.id];

            db.query(sql,user, err => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            })   
        })
    };
}

module.exports = User

