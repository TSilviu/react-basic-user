import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

export default class UserDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      transfer: {
        toEmail: '',
        amount: ''
      }
    }

    this.processForm = this.processForm.bind(this);
    this.changeTransferDetails = this.changeTransferDetails.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    const self = this;
    const requestUrl = "http://localhost:4000/transfer";
    const amountNo = Number(this.state.transfer.amount);

    if(!isNaN(amountNo)){
      const payload = {
        toEmail: this.state.transfer.toEmail,
        fromEmail: this.props.user.email,
        amount: amountNo
      };

      axios.post(requestUrl, payload)
      .then(
        function onSuccess(response) {
          self.setState({errpr: ''});
        },
        function onError(res) {
          self.setState({error: res.response.data});
        }
      );
    } else {
      this.setState({error: 'Please enter a valid number'});
    }
  }

  changeTransferDetails(event) {
    const field = event.target.name;
    const transfer = this.state.transfer;
    transfer[field] = event.target.value;

    this.setState({transfer});
  }


  render() {
    const { name, bambeuros } = this.props.user;
    return (
      <div>
      <AppBar title="Dashboard"/>
      Hello, {name}, you have {bambeuros} bambeuros.

      <form onSubmit={this.processForm}>
        <p>Send some bambeuros:</p>

        {this.state.error !== '' && <p className="error">{this.state.error}</p>}

        <div>
          <TextField
            floatingLabelText="User email"
            name="toEmail"
            onChange={this.changeTransferDetails}
            value={this.state.transfer.toEmail}
          />
        </div>

        <div>
          <TextField
            floatingLabelText="Amount"
            name="amount"
            onChange={this.changeTransferDetails}
            value={this.state.transfer.amount}
          />
        </div>

        <RaisedButton type="submit" label="Confirm transaction" primary />
      </form>

      <h2>Transactions:</h2>
      <h3>Sent by you:</h3>
      <div>To {name}, amount: some amount</div>
      <div>To {name}, amount: some amount</div>
      <h3>Received by you:</h3>
      <div>From {name}, amount: some amount</div>
      <div>From {name}, amount: some amount</div>
      <div>From {name}, amount: some amount</div>
      </div>
    );
  }
}
