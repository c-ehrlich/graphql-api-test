const { MovieList, UserList } = require('../fakeData');
const ld = require('lodash');

// resolver args
// 1. parent
// 2. args
const resolvers = {
  // USER RESOLVERS
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const user = ld.find(UserList, { id: Number(args.id) });
      return user;
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = ld.find(MovieList, { name });
      return movie;
    },
  },
  // how do we know which movies are the favourite for each user
  // note that our data in User specifies nothing about movies but we can still do this
  User: {
    favoriteMovies: () => {
      return ld.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
};

module.exports = { resolvers };
