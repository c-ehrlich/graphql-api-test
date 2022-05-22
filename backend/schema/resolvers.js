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

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          updatedUser = user;
        }
      });

      return updatedUser;
    },

    // we can use _ for parent if not using it
    deleteUser: (_, args) => {
      // lodash remove returns an array
      const deletedUsers = ld.remove(UserList, (user) => user.id === Number(args.id));
      return deletedUsers[0];
    },
  },
};

module.exports = { resolvers };
