import React, { useEffect } from "react";
import { Collection } from "./generated-sources";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Designer from "./pages/Designer";
import BasicBuild from "./pages/BasicBuild.jsx";

import NavBar from "./components/navbar/navbar";
import { getCollectionData, getCollectionNames } from "./ContextInitialisation";

type ContextType = {
  collections: Collection[];
  names: Collection["name"][];
};

const initialContext: ContextType = {
  collections: [],
  names: [],
};

export const Context = React.createContext(initialContext);

export const App: React.FC = () => {
  const [ContextData, setContextData] = React.useState<ContextType>(
    initialContext
  );

  useEffect(() => {
    async function fetchData() {
      const collectionNames = await getCollectionNames();
      const collectionData = await getCollectionData();

      setContextData((C) => {
        return { collections: collectionData, names: collectionNames };
      });
    }
    fetchData();
  }, []);

  return (
    <Context.Provider value={ContextData}>
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
    </Context.Provider>
  );
};

export default App;
