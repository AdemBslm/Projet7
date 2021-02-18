const mysql = require('mysql');
const db = require('../connection');

class Comment {
    constructor(comment, date, post_id, user_id, id) {
        this.id = id || null;
        this.comment = comment || null;
        this.date = date || null;
        this.post_id = post_id || null;
        this.user_id = user_id || null
    }
 
    static find(post_id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT comment.*, user.first_name AS first_name_user, user.last_name AS last_name_user, user.avatar AS avatar_user FROM comment INNER JOIN user ON comment.user_id = user.id WHERE post_id = ?",[post_id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(result);

            }) 
        })
    }  

    static findOneById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM comment WHERE id = ?", [id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(new Comment(result[0].comment, result[0].date, result[0].post_id, result[0].user_id, result[0].id));

            }) 
        })
    }

    save() {
        return new Promise((resolve, reject) => {
            let post = [this.comment, this.post_id, this.user_id];
            let sql = "INSERT INTO comment SET comment = ?, date = NOW(), post_id = ?, user_id = ?"

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
            let sql = "DELETE FROM comment WHERE id = ?";
            let id = [this.id]

            db.query(sql, id, err => {
                if (err) {
                    return reject(err);
                }
                return resolve()
            })
        }) 
    };

}

module.exports = Comment