const Parse = require('parse/node');
const Movies = require('./movies.entity');
const logger = require('../utils/logger.service');

class MoviesService {

  static getAllMovies() {
    const query = new Parse.Query(Movies);
    return query.find().then((movies) => {
      logger.info("MoviesService.getAllMovies: " + movies);
      return movies;
    }, (error) => {
      logger.error(error);
      throw new Error("Error getting movies");
    });
  }

  static getMovieFromTitle(title) {
    const query = new Parse.Query(Movies);
    query.equalTo('data.title', title);
    return query.find().then((movies) => {
      logger.info("MoviesService.getMovieFromTitle: " + movies);
      return movies;
    }, (error) => {
      logger.error(error);
      throw new Error("Error getting movie");
    });
  }

  static getMovieFromDate(date) {
    const query = new Parse.Query(Movies);
    query.equalTo('data.date', date);
    return query.find().then((movies) => {
      logger.info("MoviesService.getMovieFromDate: " + movies);
      return movies;
    }, (error) => {
      logger.error(error);
      throw new Error("Error getting movie");
    });
  }

  static updateMovie(id, newMovie) {
    const query = new Parse.Query(Movies);
    query.equalTo('objectId', id);
    return query.find().then((movies) => {
      const movie = movies[0];
      movie.set('title', newMovie.title);
      movie.set('date', newMovie.date);
      movie.set('rating', newMovie.rating);
      movie.set('image', newMovie.image);
      movie.set('description', newMovie.description);
      return movie.save().then(() => {
        logger.info("MoviesService.updateMovie: " + movie);
        return movie;
      }, (error) => {
        logger.error(error);
        throw new Error("Error updating movie");
      });
    }, (error) => {
      logger.error(error);
      throw new Error("Error updating movie");
    });
  }

  static deleteMovie(id) {
    const query = new Parse.Query(Movies);
    query.equalTo('objectId', id);
    return query.find().then((movies) => {
      const movie = movies[0];
      return movie.destroy().then(() => {
        logger.info("MoviesService.deleteMovie: " + movie);
        return movie;
      }, (error) => {
        logger.error(error);
        throw new Error("Error deleting movie");
      });
    }, (error) => {
      logger.error(error);
      throw new Error("Error deleting movie");
    });
  }
}

module.exports = MoviesService;
