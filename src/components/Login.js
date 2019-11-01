import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import Footer from './Footer'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({
   ...state.auth,
   copyRight: state.common.copyRight
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="auth-page">
        <MDBContainer className="pt-5">
          <MDBRow>
            <MDBCol md='3'/>
            <MDBCol md='6' >
            <form onSubmit={this.submitForm(email, password)}>
              <p className="h5 text-center mb-4">Sign in</p>
              <p className="text-xs-center">
                <Link to="/register">
                  Need an account?
                </Link>
              </p>
              <ListErrors errors={this.props.errors} />
              <div className="grey-text">
                <MDBInput
                  label="Your name"
                  icon="user"
                  group
                  type="text"                  
                  validate
                  error="wrong"
                  success="right"
                  value={email}
                  onChange={this.changeEmail}
                />
                <MDBInput
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  value={password}
                  onChange={this.changePassword}
                />
              </div>
              <div className="text-center">
                <MDBBtn color="primary" type="submit"
                    disabled={this.props.inProgress}>Login</MDBBtn>
              </div>
            </form>
            </MDBCol>
            <MDBCol md='3'/>
          </MDBRow>
        </MDBContainer>
        <Footer copyRight={this.props.copyRight} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
