import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Designer from "./pages/Designer";
import BasicBuild from "./pages/BasicBuild.jsx";

import NavBar from "./components/navbar/navbar";

export const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/basicbuild-standard" component={BasicBuild} />
          <Route path="/about" component={About} />
          <Route path="/designer" component={Designer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
