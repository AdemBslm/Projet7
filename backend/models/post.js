const mysql = require('mysql');
const db = require('../connection');

class Post {
    constructor(post, image, user_id, id) {
        this.id = id || null;
        this.post = post || null;
        this.image = image || null;
        this.date = null;
        this.user_id = user_id || null
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
}

module.exports = Post
