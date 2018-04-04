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
      successMessage: '',
      error: '',
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

    const self = this;
    const requestUrl = "http://localhost:4000/register";
    const payload = this.state.user;

    if(payload.name === '' || payload.email === '' || payload.password === '') {
        this.setState({error: 'All details required!'});
    } else {
      axios.post(requestUrl, payload)
        .then(
          function onSuccess(response) {
            self.setState({error: ''});
            self.setState({successMessage: 'Registered successfully!'});
          },
          function onError(res) {
            self.setState({error: res.response.data});
          }
        );
    }
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

        {this.state.error !== '' && <p className="error">{this.state.error}</p>}
        {
          this.state.successMessage !== '' &&
          <p className="success">{this.state.successMessage}</p>
        }

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
    );
  }
}
