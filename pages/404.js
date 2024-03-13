import React, { Component } from "react";
import Router from "next/router";

export default class _error extends Component {
  componentDidMount = () => {
    Router.push("/overview");
  };

  render() {
    return <div />;
  }
}
