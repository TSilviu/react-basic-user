import React from 'react';
import { Link } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const requestUrl = "http://localhost:4000/register";
    const payload = this.state.user;

    axios.post(requestUrl, payload);
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
        <AppBar title="Register"/>

        <div>
          <TextField
            floatingLabelText="Name"
            name="name"
            onChange={this.changeUser}
            value={this.state.user.name}
          />
        </div>

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

        <RaisedButton type="submit" label="Register" primary />

        <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
      </form>
    )
  }
}
