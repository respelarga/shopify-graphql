import React, { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const SUBSCRIBE_HELLO = gql`
  subscription {
    helloAdded
  }
`;

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  render() {
    return (
      <div>
        <Subscription subscription={SUBSCRIBE_HELLO}>
          {({ loading, error, data }) => {
            if (loading) return <p>Listening...</p>;
            if (error) return <p>{JSON.stringify(error)}</p>;
            return <div>{JSON.stringify(data)};</div>;
          }}
        </Subscription>
      </div>
    );
  }
}

export default Subscriptions;
