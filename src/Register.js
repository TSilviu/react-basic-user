import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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

    console.log('email:', this.state.user.name);
    console.log('password:', this.state.user.password);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  render() {
    return(
      <Card>
        <form onSubmit={this.processForm}>
          <h2>Sign Up</h2>

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
      </Card>
    )
  }
}
