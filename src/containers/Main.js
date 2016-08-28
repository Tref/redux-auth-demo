import React, { PropTypes } from 'react';
import IndexPanel from '../components/IndexPanel';
import CodeSnippet from '../components/CodeSnippet';
import ExampleWell from '../components/ExampleWell';
import RequestTestButton from '../components/RequestTestButton';
import { updateDemoTheme, updateDemoEndpoint } from '../actions/demo-ui';
import { PageHeader, OverlayTrigger, Tooltip, Row, ButtonGroup, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as BSTheme from 'redux-auth/bootstrap-theme';
import * as DefaultTheme from 'redux-auth/default-theme';
import * as MUITheme from 'redux-auth/material-ui-theme';
import Select from 'react-select';

if (!global.__SERVER__ && !global.__TEST__) {
  require('../styles/main.scss');
}

class Main extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pageEndpoint: PropTypes.string,
    theme: PropTypes.string,
    currentUserUid: PropTypes.string,
    currentUserProvider: PropTypes.string,
    currentUserEndpoint: PropTypes.string,
  };

  updateTheme({ value }) {
    this.props.dispatch(updateDemoTheme(value));
  }

  updateEndpoint({ value }) {
    this.props.dispatch(updateDemoEndpoint(value));
  }

  render() {
    let Theme;
    let themePath;
    const endpointAttr = (this.props.pageEndpoint === 'default')
      ? ''
      : 'endpoint="evilUser"';


    switch (this.props.theme) {
      case 'bootstrap':
        Theme = BSTheme;
        themePath = '/bootstrap-theme';
        break;
      case 'default-theme':
        Theme = DefaultTheme;
        themePath = '/default-theme';
        break;
      default:
        Theme = MUITheme;
        themePath = '/material-ui-theme';
        break;
    }

    return (
      <div>
        <PageHeader>Gitadel</PageHeader>

        <IndexPanel header="Current User" cols="6">
          <label>current user provider</label>
          <p>{this.props.currentUserUid}</p>

          <label>current user uid</label>
          <p>{this.props.currentUserProvider}</p>



          <label>currently selected endpoint</label>
          <Select
            value={this.props.pageEndpoint}
            clearable={false}
            options={[
              { value: 'default', label: 'Default User Class' },
              { value: 'evilUser', label: 'Alternate User Class' }
            ]}
            onChange={this.updateEndpoint.bind(this)}
          />

          <Table>
            <thead>
              <tr>
                <th colSpan={2}>
                  ajax test
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Default user:</td>
                <td>
                  <RequestTestButton
                    path="/demo/members_only"
                    endpointKey="default"
                  />
                </td>
              </tr>
              <tr>
                <td>Alternate user class:</td>
                <td>
                  <RequestTestButton
                    path="/demo/members_only_mang"
                    endpointKey="evilUser"
                  />
                </td>
              </tr>
              <tr>
                <td>Group that includes both user classes:</td>
                <td>
                  <RequestTestButton
                    path="/demo/members_only_group"
                    endpointKey="any"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </IndexPanel>
 
        <IndexPanel header="OAuth Sign In" cols="6">
          <Theme.OAuthSignInButton
            provider="github"
            next={() => browserHistory.push('/account')}
            endpoint={this.props.pageEndpoint}
            >
            Github
          </Theme.OAuthSignInButton>
        </IndexPanel>
          
      </div>
    );
  }
}

export default connect(({ auth, demoUi }) => ({
  currentUserUid: auth.getIn(['user', 'attributes', 'provider']) || 'none',
  currentUserProvider: auth.getIn(['user', 'attributes', 'uid']) || 'none',
  currentUserEndpoint: auth.getIn(['user', 'endpointKey']) || 'none',
  theme: demoUi.get('theme'),
  pageEndpoint: demoUi.get('endpoint'),
}))(Main);
