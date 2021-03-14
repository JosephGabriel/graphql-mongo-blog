const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv/config");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    req.headers.authorization = `Bearer ${process.env.TOKEN}`;
    return { req };
  },
});

server.applyMiddleware({ app });

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server Rodando ${port}`));
  })
  .catch((e) => console.log(`Erro na conexão com banco de dados: ${e}`));
