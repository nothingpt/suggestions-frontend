import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Header from "./Header";
import AddSuggestion from "./AddSuggestion";
import Suggestions from "./Suggestions";
import Login from "./Login";
import Admin from "./Login2";
import Suggestion from "./Suggestion";
import Me from './Me';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={ history }>
      <div className="container-add">
        <Header />
        <Route exact path="/" component={AddSuggestion} />
        <Route path="/see" component={Suggestions} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/me" component={Me} />
        <Route path="/suggestion/:id" component={Suggestion} />
      </div>
    </Router>
  );
};

export default App;
