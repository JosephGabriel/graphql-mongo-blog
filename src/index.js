const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server Rodando ${port}`));
