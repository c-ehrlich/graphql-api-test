const { UserList } = require('../fakeData');
const ld = require('lodash');

// resolver args
// 1. parent
// 2. args
const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const user = ld.find(UserList, { id: Number(args.id) });
      return user;
    },
  },
};

module.exports = { resolvers };
