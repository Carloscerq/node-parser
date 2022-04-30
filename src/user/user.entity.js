const Parse = require("parse/node");
const bycrypt = require("bcrypt");

class User extends Parse.Object {
  constructor() {
    super("User");
  }

  static createNewUser(data) {
    const user = new User();
    data.password = bycrypt.hashSync(data.password, 10);
    user.set("data", data);

    return user.save().then(
      () => {
        return user;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

module.exports = User;
