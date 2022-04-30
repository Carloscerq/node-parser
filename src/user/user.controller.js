const express = require("express");
const User = require("./user.entity");
const router = express.Router();

router.post('/', (req, res) => {
    const user = User.createNewUser(req.body);
    res.status(201).json(user).send();
})



module.exports = router;