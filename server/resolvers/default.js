import { PubSub } from "apollo-server-express";

const pubsub = new PubSub();
const POST_ADDED = "POST_ADDED";

const resolver = {
  Query: {
    hello: (args, _, context) => {
      return JSON.stringify(context.cookie);
    }
  },
  Subscription: {
    helloAdded: {
      subscribe: () => pubsub.asyncIterator(["POST_ADDED"])
    }
  },
  Mutation: {
    addHello: () => {
      pubsub.publish("POST_ADDED", { helloAdded: "Hello subscriptions" });
      return "Hello Mutation";
    }
  }
};
export default resolver;
