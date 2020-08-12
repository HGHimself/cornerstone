import App from "./App";
import ReactDOM from "react-dom";
import React, { Component } from "react";

// dynamically load a few configuration props
const appProps = {};
const appRoot = 'root';

console.log(`Mounting App on ${appRoot}!`);
console.log({config: appProps});

// entrypoint to the application
// we are sticking the script tag into the element below
const root = document.getElementById(appRoot);

if ( root )  {
  ReactDOM.render(
    <App config={appProps} />,
    root
  );
} else {
  throw new Error(`We could not mount the App on ${appRoot}!`);
}
