import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Register from './Register.js';
import Login from './Login.js';
import './App.css';

function HomeScreen() {
  return (
    <div>
      <Link to="/register">Register</Link>
      <Link to="/login">Log in</Link>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={HomeScreen}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </div>
    );
  }
}

export default App;
