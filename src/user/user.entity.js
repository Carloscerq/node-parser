const Parse = require("parse/node");

class User extends Parse.Object {
  constructor() {
    super("User");
  }

  static createNewUser(data) {
    const user = new User();
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
