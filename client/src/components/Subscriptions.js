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
          {({ data: { helloAdded }, loading }) => (
            <h4>{JSON.stringify(helloAdded)}</h4>
          )}
        </Subscription>
      </div>
    );
  }
}

export default Subscriptions;
