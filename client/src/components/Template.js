import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_HELLO = gql`
  {
    hello
  }
`;

class template extends Component {
  render() {
    return (
      <Query query={GET_HELLO}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{JSON.stringify(error)}</p>;
          return <div>{JSON.stringify(data)};</div>;
        }}
      </Query>
    );
  }
}

export default template;
