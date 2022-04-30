const express = require("express");
const Movies = require("./movies.entity");
const MoviesService = require("./movies.service");
const router = express.Router();

// Create a new movie
router.post("/", (req, res) => {
  const movie = Movies.createNewMovie(req.body);
  res.status(201).json(movie).send();
});

router.get("/", (req, res) => {
  MoviesService.getAllMovies()
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  MoviesService.deleteMovie(req.params.id);
  res.status(200).send();
});

router.get("/:title", (req, res) => {
  MoviesService.getMovieFromTitle(req.params.title)
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

router.get("/date/:date", (req, res) => {
  const date = req.params.date.replaceAll('-', '/');
  MoviesService.getMovieFromDate(date)
    .then((movies) => res.status(200).json(movies))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
