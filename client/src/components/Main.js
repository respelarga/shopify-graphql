import React, { Component } from "react";
import Template from "./Template";
import Subscriptions from "./Subscriptions";

class Main extends Component {
  render() {
    return (
      <div>
        <Template />
        <Subscriptions />
      </div>
    );
  }
}

export default Main;
