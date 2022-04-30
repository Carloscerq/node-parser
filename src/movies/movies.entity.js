const Parse = require('parse/node');

class Movies extends Parse.Object {
  constructor() {
    super('Movies');
  }

  static createNewMovie(data) {
    const movie = new Movies();
    movie.set('data', data);

    return movie.save().then(() => {
      return movie;
    }, (error) => {
      console.log(error);
    });
  }
}

module.exports = Movies;
