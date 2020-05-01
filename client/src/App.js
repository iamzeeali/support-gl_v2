import React, { Fragment, useEffect } from "react";
import "./App.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";
//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/UI/Navbar";
import Alert from "./components/UI/Alert";
import Landing from "./components/UI/Landing";
import About from "./components/UI/About";
import Login from "./components/Login";
import Routes from "./components/routing/Routes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
