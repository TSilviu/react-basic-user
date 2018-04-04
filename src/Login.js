import React from 'react';
import { Link } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      user: {
        email: '',
        password: ''
      }
    }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const self = this;
    const requestUrl = "http://localhost:4000/login";
    const payload = this.state.user;

    axios.post(requestUrl, payload)
      .then(
        function onSuccess(response) {
          const loggedInUser = response.data;
          self.setState({error: ''});
          self.props.onLogin(loggedInUser);
        },
        function onError(res) {
          self.setState({error: res.response.data});
        }
      );
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  render() {
    return(
      <form onSubmit={this.processForm}>
      <AppBar title="Login"/>

        {this.state.error !== '' && <p className="error">{this.state.error}</p>}

        <div>
          <TextField
            floatingLabelText="Email"
            name="email"
            onChange={this.changeUser}
            value={this.state.user.email}
          />
        </div>

        <div>
          <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={this.changeUser}
            value={this.state.user.password}
          />
        </div>

        <RaisedButton type="submit" label="Log in" primary />

        <CardText>Need an account? <Link to={'/register'}>Register</Link></CardText>

      </form>
    );
  }
}
