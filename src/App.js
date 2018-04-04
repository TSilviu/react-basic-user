import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

import Register from './Register.js';
import Login from './Login.js';
import UserDashboard from './UserDashboard.js';
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
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  hasLoggedIn(user) {
      this.setState({isLoggedIn: true});
      this.setState({user: user});
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={HomeScreen}/>
        <Route path="/register" component={Register}/>
        <Route
          path="/login"
          render={() => <Login onLogin={this.hasLoggedIn.bind(this)}/>}
        />
        {
          this.state.isLoggedIn === true &&
          <div>
            <Route
              path="/dashboard"
              render={() => <UserDashboard user={this.state.user} />}
            />
            {
              window.location.pathname !== '/dashboard' &&
              <Redirect from='/login' to='/dashboard' />
            }
          </div>
        }
        {
          this.state.isLoggedIn === false &&
          window.location.pathname === '/dashboard' &&
          <div>
            You have to be logged in to view this page:
            <Link to="/login">Log in</Link>
          </div>
        }
      </div>
    );
  }
}

export default App;
