import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import NoteList from './NoteList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from "./Header";
import ForgetPassword from './ForgetPassword';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/notes" component={NoteList} />
        <Route path="/login" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/forget-password" component={ForgetPassword} />
      </Switch>
    </div>
  );
}

export default App;
