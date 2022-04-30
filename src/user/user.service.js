const Parse = require("parse/node");
const User = require("./user.entity");

class UserService {
  static getUserFromEmail(email) {
    const query = new Parse.Query(User);
    query.equalTo("data.email", email);
    return query.find().then(
      (users) => {
        return users;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  static deleteUser(id) {
    const query = new Parse.Query(User);
    query.equalTo("objectId", id);
    return query.find().then((users) => {
      const user = users[0];
      return user.destroy().then(
        () => {
          return user;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  static getAllUsers() {
    const query = new Parse.Query(User);
    return query.find().then(
      (users) => {
        return users;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

module.exports = UserService;
