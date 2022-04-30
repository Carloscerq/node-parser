const Parse = require("parse/node");
const User = require("./user.entity");
const logger = require("../utils/logger.service");

class UserService {
  static getUserFromEmail(email) {
    const query = new Parse.Query(User);
    query.equalTo("data.email", email);
    return query.find().then(
      (users) => {
        logger.info("UserService.getUserFromEmail: " + users);
        return users;
      },
      (error) => {
        logger.error(error);
        throw new Error("Error getting user");
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
          logger.info("UserService.deleteUser: " + user);
          return user;
        },
        (error) => {
          logger.error(error);
          throw new Error("Error deleting user");
        }
      );
    });
  }

  static getAllUsers() {
    const query = new Parse.Query(User);
    return query.find().then(
      (users) => {
        logger.info("UserService.getAllUsers: " + users);
        return users;
      },
      (error) => {
        logger.error(error);
        throw new Error("Error getting users");
      }
    );
  }
}

module.exports = UserService;
