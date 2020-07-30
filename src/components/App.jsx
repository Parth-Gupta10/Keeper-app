import React, {useContext} from "react";
import { Route, Switch} from "react-router-dom";
import Home from './Home';
import NoteList from './NoteList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from "./Header";
import ForgetPassword from './ForgetPassword';
import {firebaseContext} from '../context';
import Error from './Error';

function App() {
  const value = useContext(firebaseContext);

  return (
    <div style={{minHeight: '100%', height: '100%'}}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/notes'>
          {
            value.isUserAuth
            ? <NoteList />
            : <SignIn />
          }
        </Route>
        <Route path="/notes" component={NoteList} />
        <Route path="/login" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
