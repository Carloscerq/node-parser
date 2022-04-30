const UserService = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class AuthService {
    static async login(username, password) {
        const userResp = await UserService.getUserFromEmail(username);
        const user = userResp[0];
        if (!user) {
            throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(password, user.get("data").password);
        if (!isValid) {
            throw new Error("Invalid password");
        }

        const token = await this.generateToken(user);
        return Promise.resolve(token);
    }

    static async generateToken(user) {
        const token = jwt.sign({
            id: user.id,
            email: user.get("data").email
        }, process.env.JWT_SECRET);

        return Promise.resolve(token);
    }

    static async JwtMiddleware(req, res, next) {
        const authorization = req.headers.authorization.split(" ");
        const token = authorization[1];

        if (!token) {
            return res.status(401).send("Unauthorized");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserService.getUserFromEmail(decoded.email);
            req.user = user;
            next();
        } catch (error) {
            console.log(error)
            return res.status(401).send("Unauthorized");
        }
    }
}

module.exports = AuthService;