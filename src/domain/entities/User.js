
class User {
    constructor(id, name, email, passwordHash, googleId = null, appleId = null) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.passwordHash = passwordHash;
      this.googleId = googleId;
      this.appleId = appleId;
    }
  }
  
module.exports = User;