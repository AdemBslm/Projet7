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
            db.query("SELECT * FROM post", (err, result) => {
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
            db.query("SELECT * FROM post WHERE id = ?", [req.params.id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                console.log(result[0])
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
        console.log("test")
        return new Promise((resolve, reject) => {
            console.log("test delete")
            console.log(this.id)
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
}

module.exports = Post
