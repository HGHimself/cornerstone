import App from "./App";
import ReactDOM from "react-dom";
import React, { Component } from "react";

// dynamically load a few configuration props
const appProps = {};
console.log("Mounting App on root!");
console.log({config: appProps});

// entrypoint to the application
// we are sticking the script tag into the element below
ReactDOM.render(
  <App config={appProps} />,
  document.getElementById('root')
);
