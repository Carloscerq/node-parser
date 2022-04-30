const express = require("express");
const Movies = require("./movies.entity");
const MoviesService = require("./movies.service");
const AuthService = require("../auth/auth.service");
const router = express.Router();

// Create a new movie
router.post("/", AuthService.JwtMiddleware, (req, res) => {
  const movie = Movies.createNewMovie(req.body);
  res.status(201).json(movie).send();
});

router.get("/", AuthService.JwtMiddleware, (req, res) => {
  MoviesService.getAllMovies()
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", AuthService.JwtMiddleware, (req, res) => {
  MoviesService.deleteMovie(req.params.id);
  res.status(200).send();
});

router.get("/:title", AuthService.JwtMiddleware, (req, res) => {
  MoviesService.getMovieFromTitle(req.params.title)
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

router.get("/date/:date", AuthService.JwtMiddleware, (req, res) => {
  const date = req.params.date.replaceAll('-', '/');
  MoviesService.getMovieFromDate(date)
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
