const Parse = require('parse/node');

export class Movies extends Parse.Object {
  constructor() {
    super('Movies');

  }

  static createNewMovie(title, date, rating, image, description) {
    const movie = new Movies();
    movie.set('title', title);
    movie.set('date', date);
    movie.set('rating', rating);
    movie.set('image', image);
    movie.set('description', description);

    return movie.save().then(() => {
      return movie;
    }, (error) => {
      console.log(error);
    });
  }

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
    query.equalTo('title', title);
    return query.find().then((movies) => {
      return movies;
    }, (error) => {
      console.log(error);
    });
  }

  static getMovieFromDate(date) {
    const query = new Parse.Query(Movies);
    query.equalTo('date', date);
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
}
