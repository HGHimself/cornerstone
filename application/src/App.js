import React, { Component } from "react";
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Dashboard from "./containers/Dashboard/";
import StyledWrapper from "./style";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <StyledWrapper>
        <h1>Header</h1>
        <Router>
          <Switch>
            <Route path="/"><Dashboard /></Route>
          </Switch>
        </Router>
      </StyledWrapper>
    );
  }
}

export default App;
