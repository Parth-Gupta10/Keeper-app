import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App.jsx';
import "./styles.css";
import {FirebaseProvider} from './context';
import { BrowserRouter as Router } from "react-router-dom";

ReactDom.render(
  <FirebaseProvider>
    <Router>
      <App />
    </Router>
  </FirebaseProvider>,
  document.getElementById("root")
);
