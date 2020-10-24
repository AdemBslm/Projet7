User.findOne(body.id, user => {
    user.firstName = body.firstName;
    user.update();
  });
  
  
  class User {
    constructor(email, password, firstName, lastName, id) {
      this.id = id || null;
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
    }
    
    static findOne(id, callback) {
      connection.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
          if (err){
            throw err;
          }
        
          callback(new User(result.email, result.password, result.first_name, result.last_name, result.id));
      })
    }
    
    save() {
      connection.query(
        "INSERT INTO user SET email = ?, password = ?, first_name = ?, last_name = ?",
        [this.email, this.password, this.firstName, this.lastName],
        err => {
          if (err){
            throw err;
          }
          
          connection.query("SELECT LAST_INSERT_ID()", [], (err, res) => {
            if (err) {
              throw err;
            }
            
            this.id = res;
          })
        }
      )
    }
    
    delete() {
      connection.query(
        "DELETE FROM user WHERE id = ?",
        [this.id],
        err => {
          if (err) throw err;
        }
      )
    }
    
    update() {
      connection.query(
        "UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ? WHERE id = ?",
        [this.email, this.password, this.firstName, this.lastName, this.id],
        err => {
          if (err) throw err;
        }
      )
    }
  }