import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import Footer from './Footer'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
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
  onChangePassword2: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password2', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
    
      
      <div className="auth-page">

        <MDBContainer className="pt-5">
          <MDBRow>
            <MDBCol md='3'/>
            <MDBCol md='6' >
            <form onSubmit={this.submitForm(username, email, password)}>
              <p className="h5 text-center mb-4">Sign up</p>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
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
                  value={this.props.username}
                  onChange={this.changeUsername}
                />
                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  value={this.props.email}
                  onChange={this.changeEmail}
                />
                <MDBInput
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  value={this.props.password}
                  onChange={this.changePassword}
                />
                <MDBInput
                  label="Confirm password"
                  icon="exclamation-triangle"
                  group
                  type="password"
                  validate
                  error="wrong"
                  success="right"
                  value={this.props.password2}
                  onChange={this.changePassword2}
                />
              </div>
              <div className="text-center">
                <MDBBtn 
                color="primary"
                type="submit"
                disabled={this.props.inProgress}>Register</MDBBtn>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
