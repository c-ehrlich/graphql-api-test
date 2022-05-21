const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');

// every query exists inside typeDefs
// every function that handles those queries exists inside resolvers
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Your API is Running at ${url}`);
});
