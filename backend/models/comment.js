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

    static find() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM comment", (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                console.log(result)
                resolve(result);

            }) 
        })
    }  

    static findOneById(req) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM comment WHERE id = ?", [req.params.id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                console.log(result[0])
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
            console.log("test delete")
            console.log(this.id)
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