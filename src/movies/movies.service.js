const Parse = require('parse/node');
const Movies = require('./movies.entity');

class MoviesService {

  static getAllMovies() {
    const query = new Parse.Query(Movies);
    return query.find().then((movies) => {
      return movies;
    }, (error) => {
      console.log(error);
    });
  }

  static getMovieFromTitle(title) {
    const query = new Parse.Query(Movies);
    query.equalTo('data.title', title);
    return query.find().then((movies) => {
      return movies;
    }, (error) => {
      console.log(error);
    });
  }

  static getMovieFromDate(date) {
    const query = new Parse.Query(Movies);
    query.equalTo('data.date', date);
    return query.find().then((movies) => {
      return movies;
    }, (error) => {
      console.log(error);
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
        return movie;
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  static deleteMovie(id) {
    const query = new Parse.Query(Movies);
    query.equalTo('objectId', id);
    return query.find().then((movies) => {
      const movie = movies[0];
      return movie.destroy().then(() => {
        return movie;
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }
}

module.exports = MoviesService;
