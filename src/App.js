import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Basic from "./Pages/Basic";
import Designer from "./Pages/Designer";

import NavBar from "./Components/navbar/navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/basic" component={Basic} />
          <Route path="/designer" component={Designer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
