import React from "react";
import "./App.css";
import { Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import RouteWithTitle from "./components/Routes/RouteWithTitle";
import routes from "./navigation/RootRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithTitle
              key={i}
              component={route.component}
              path={route.path}
              name={route.name}
            />
          ))}
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
