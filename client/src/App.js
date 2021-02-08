import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import PasswordReset from "./components/PasswordReset";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/password-reset" component={PasswordReset} /> 
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  )
}

function NoMatch() {
  return (
    <div>
      <h3>
        404 not found
      </h3>
    </div>
  );
}

export default App;
