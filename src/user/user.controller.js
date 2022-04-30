const express = require("express");
const User = require("./user.entity");
const UserService = require("./user.service");
const AuthService = require("../auth/auth.service");
const router = express.Router();

router.post("/", (req, res) => {
  if (!email || !password) {
    return res.status(400).send("Missing email or password");
  }

  if (UserService.getUserFromEmail(req.body.email)[0]) {
    return res.status(400).send("User already exists");
  }

  const user = User.createNewUser(req.body);
  res.status(201).json(user).send();
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing email or password");
  }

  AuthService.login(email, password)
    .then((token) => {
      res.json({ token }).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(401).send(error);
    });
});

router.get("/", AuthService.JwtMiddleware, (req, res) => {
  UserService.getAllUsers()
    .then((users) => {
      res.json(users).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.delete("/:id", AuthService.JwtMiddleware, (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("Missing id");
  }

  UserService.deleteUser(id)
    .then((user) => {
      res.json(user).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(401).send(error);
    });
});

module.exports = router;
