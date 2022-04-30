const Parse = require("parse/node");
const User = require("./user.entity");

class UserService {
    static getUserFromEmail(email) {
        const query = new Parse.Query(User);
        query.equalTo("data.email", email);
        return query.find().then((users) => {
            return users;
        }, (error) => {
            console.log(error);
        });
    }
}

module.exports = UserService;