const express = require("express");
const Movies = require("./movies.entity");
const MoviesService = require("./movies.service");
const AuthService = require("../auth/auth.service");
const router = express.Router();

// Create a new movie
router.post("/", AuthService.JwtMiddleware, (req, res) => {
  const { title, description, genre, rating, year } = req.body;

  if (!title || !description || !genre || !rating || !year) {
    return res
      .status(400)
      .send("Missing title, description, genre, rating or year");
  }

  const movie = Movies.createNewMovie(req.body);
  res.status(201).json(movie).send();
});

router.get("/", AuthService.JwtMiddleware, (req, res) => {
  MoviesService.getAllMovies()
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", AuthService.JwtMiddleware, (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send("Missing id");
  }

  MoviesService.deleteMovie(req.params.id);
  res.status(200).send();
});

router.get("/:title", AuthService.JwtMiddleware, (req, res) => {
  const title = req.params.title;
  if (!title) {
    return res.status(400).send("Missing title");
  }

  MoviesService.getMovieFromTitle(req.params.title)
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

router.get("/date/:date", AuthService.JwtMiddleware, (req, res) => {
  const date = req.params.date.replaceAll("-", "/");
  if (!date) {
    return res.status(400).send("Missing date");
  }

  MoviesService.getMovieFromDate(date)
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
