import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import request from "superagent";
import {ACCESS_TOKEN, RESTHOST} from '../../../constants';

class Login extends Component {

  constructor(props) {
    super(props);

      this.state = {
          email: '',
          password: ''
      }

      this.email = '';
      this.password = '';
  }

    emailChange(event) {
        this.setState({email: event.target.value});
    }

    passwordChange(event) {
        this.setState({password: event.target.value});
    }

  loginSubmit = (event) => {
      event.preventDefault();
      this.email = this.state.email;
      this.password = this.state.password;

      request
          .post(RESTHOST + '/auth/login')
          .set('Content-Type', 'application/json')
          .send({ usernameOrEmail: this.email,
              password: this.password
          })
          .then(response => localStorage.setItem(ACCESS_TOKEN, response.body.accessToken))
          .catch(error => console.log(error));

      if (localStorage.getItem(ACCESS_TOKEN)) {
          this.props.history.push("/teacher");
      }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.loginSubmit}>
                      <h1 className="text-darkBlue">Login</h1>
                      <p className="text-muted text-darkBlue">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                              <i className="fa fa-at" aria-hidden="true"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email Address" autoComplete="email"
                               value={this.state.email} onChange={this.emailChange.bind(this)}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                              <i className="fa fa-lock" aria-hidden="true"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                               value={this.state.password} onChange={this.passwordChange.bind(this)}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="lightBlue" className="px-4 text-darkBlue" type="submit">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }} color="lightBlue">
                  <CardBody className="text-center">
                    <div>
                      <h2 className="text-darkBlue">Sign up</h2>
                      <p className="text-darkBlue">Join us and become a part of the community!</p>
                        <Button color="white">
                            <Link to="/register" className="text-darkBlue">Register Now!</Link>
                        </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
