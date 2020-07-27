import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {firebaseContext} from '../context';

function Header() {
  const value = useContext(firebaseContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link className="navbar-brand" to="/">Keeper</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <Link className="nav-item nav-link" to="/notes">Your Notes</Link>
          {
            value.isUserAuth
            ? <Link className="nav-item nav-link" to="/" onClick={() => value.firebase.signOutUser()}>Log Out </Link>
            : <Link className="nav-item nav-link" to="/login">Login</Link>
          }
        </div>
      </div>
    </nav>
);
}

export default Header;
