const mysql = require('mysql');
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'adem',
    password : 'adem13200',
    database : 'groupomania'
});

class User {
    constructor(email, password, firstName, lastName, id) {
        this.id = id || null;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName
    }

    static findOne(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
                if (err){
                    return reject(err)
                }
                resolve(new User(result.email, result.password, result.first_name, result.last_name, result.id));
            })
        })
    }

    save() {

        return new Promise((resolve, reject) => {
            let user = [this.email, this.password, this.firstName, this.lastName];
            let sql = "INSERT INTO user SET email = ?, password = ?, first_name = ?, last_name = ?"
            db.query(sql, user, (err, result) => {
                    console.log("reussite")
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
    
    /*
    delete() {
        connection.query(
            "DELETE FROM user WHERE id = ?",
            [this.id],
            err => {
                if (err) throw err;
            }
        )
    };
    */

    update() {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ? WHERE id = ?";
            let user = [this.email, this.password, this.firstName, this.lastName, this.id];

            db.query(sql,user, err => {
                if (err) {
                    return reject(err)
                }
            })   
        })
    };
}

module.exports = User

