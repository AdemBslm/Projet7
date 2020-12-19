const mysql = require('mysql');
const db = require('../connection');

class Post {
    constructor(post, image, date, user_id, id) {
        this.id = id || null;
        this.post = post || null;
        this.image = image || null;
        this.date = date || null;
        this.user_id = user_id || null
    }

    static find() {
        return new Promise((resolve, reject) => {
            db.query("SELECT post.*, user.first_name AS first_name_user, user.last_name AS last_name_user, user.avatar AS avatar_user FROM post INNER JOIN user ON post.user_id = user.id", (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                console.log(result)
                resolve(result);

            })  
        })
    } 
    
    static getOnePostById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT post.*, user.first_name AS first_name_user, user.last_name AS last_name_user, user.avatar AS avatar_user, likes.user_id AS likes_user FROM post INNER JOIN user ON post.user_id = user.id LEFT JOIN likes ON post.id = likes.post_id WHERE post.id = ?", [id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(result[0]);

            }) 
        })
    }

    static findOneById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM post WHERE post.id = ?", [id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(new Post(result[0].post, result[0].image, result[0].date, result[0].user_id, result[0].id));

            }) 
        })
    }

    save() {
        return new Promise((resolve, reject) => {
            let post = [this.post, this.image, this.user_id];
            let sql = "INSERT INTO post SET post = ?, image = ?, date = NOW(), user_id = ?"
            db.query(sql, post, err => {
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
    
    delete() {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM post WHERE id = ?";
            let id = [this.id]

            db.query(sql, id, err => {
                if (err) {
                    return reject(err);
                }
                return resolve()
            })
        }) 
    };

    //dislike represente la suppression du like.
    dislike(user_id) {
        return new Promise((resolve, reject) => {
            let like = [user_id, this.id];
            let sql = "DELETE FROM likes WHERE user_id = ? AND post_id = ? "

            db.query(sql, like, err => {
                if (err) {
                    return reject(err)
                }else{
                    return resolve()
                }
            })
        })     
    };

    verifyLike(user_id) {
        return new Promise((resolve, reject) => {
            let like = [user_id, this.id];
            let sql = "SELECT * FROM likes WHERE user_id = ? AND post_id = ? "
            
            db.query(sql, like, err => {
                if (err) {
                    return reject()
                }else{
                    return resolve()
                }
            })
        }) 
    };

    like(user_id) {
        return new Promise((resolve, reject) => {
            let like = [user_id, this.id];
            let sql = "INSERT INTO likes SET user_id = ?, post_id = ? "
            
            db.query(sql, like, err => {
                if (err) {
                    return reject(err)
                }else{
                    return resolve()
                }
            })
        })    
    };
}

module.exports = Post
