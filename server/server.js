import dotenv from "dotenv";
import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Schema } from "./schema";
import session from "express-session";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const port = process.env.PORT;
const MongoStore = connectMongo(session);
const app = express();

mongoose
  .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch(err => {
    console.log(`Unable to connect to MongoDB: ${err}`);
  });

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

const server = new ApolloServer({
  schema: Schema
  // context: async ({ req, connection }) => {
  //   if (connection) {
  //     return connection.context;
  //   } else {
  //     return { cookie: req.cookies };
  //   }
  // }
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// app.get("/hello", (req, res) => {
//   console.log(req.cookies);
//   res.send("Hello from Expressss");
// });

app.use(express.static("client/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "/../client", "dist", "index.html"));
});

httpServer.listen(port, err => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${
        server.subscriptionsPath
      }`
    );
  }
});
