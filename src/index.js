const express = require("express");
const Parse = require("parse/node");
const ParseServer = require("parse-server").ParseServer;
const movieRoutes = require("./movies/movies.controller");
const movieEntity = require("./movies/movies.entity");
const userEntity = require("./user/user.entity");
const userRoutes = require("./user/user.controller");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

Parse.initialize(
  process.env.APP_ID,
  process.env.MASTER_KEY,
  process.env.APP_NAME
);
Parse.serverURL = process.env.SERVER_URL;
Parse.Object.registerSubclass("Movies", movieEntity);
Parse.Object.registerSubclass("User", userEntity);

const api = new ParseServer({
  databaseURI: process.env.DATABASE, // Connection string for your MongoDB database
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY, // Keep this key secret!
  serverURL: process.env.SERVER_URL, // Don't forget to change to https if needed
});

app.use(express.json());
app.use("/parse", api);
app.use("/movies", movieRoutes);
app.use("/user", userRoutes);

app.listen(1337, () => {
  console.log("parse-server-example running on port 1337.");
});
