import { makeExecutableSchema } from "graphql-tools";
import Resolvers from "./resolvers/default";

const TypeDefs = `
  type Query {
    hello: String!
  },
  type Mutation {
    addHello: String!
  },
  type Subscription {
    helloAdded: String!
  }
`;
export const Schema = makeExecutableSchema({
  typeDefs: [TypeDefs],
  resolvers: [Resolvers]
});
