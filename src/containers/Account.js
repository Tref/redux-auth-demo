import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SignOutButton } from 'redux-auth/bootstrap-theme';
import { browserHistory } from 'react-router';
import { fetch } from 'redux-auth';

class Account extends React.Component {
  componentDidMount() {
    console.log(" 🔔 <Account.js> componentDidMount(props):", this.props)
    const url = "http://localhost:3002/managers/1.json"
    fetch(url, {
          credentials: 'include'
        })
          .then(resp => {
            console.log('got resp');
            if (resp && resp.statusText === 'OK') {
              // dispatch(requestTestComplete(key));
            } else {
              // dispatch(requestTestError(key));
            }

            console.log('retrieving json');

            return resp.json();
          })
          .then(json => {
            console.log('@-->resp json', json);
            return json;
          })
          .catch(resp => {
            console.log('fail', resp);
            // dispatch(requestTestError(key));
          });

  }
  render() {
    return (
      <div>
        <PageHeader>Account page</PageHeader>
        <p>This page should only visible to authenticated users.</p>
        <SignOutButton next={() => browserHistory.push('/')} />
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({ auth })
)(Account);
