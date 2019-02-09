import React, { Component } from 'react';
import { Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import request from "superagent";

class Register extends Component {

    constructor(props) {
        super(props);
        this.restHost = 'http://localhost:8080/rest';

        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.username = '';
        this.email = '';
        this.password = '';
    }

    usernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    emailChange = (event) => {
        this.setState({email: event.target.value});
    }

    passwordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.username = this.state.username;
        this.email = this.state.email;
        this.password = this.state.password

        request
            .post(this.restHost + '/register')
            .set('Content-Type', 'application/json')
            .send({email: this.username,
                    username: this.username,
                    password: this.password})
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <form onSubmit={this.handleSubmit}>
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username"
                                                    value={this.state.username} onChange={this.usernameChange()}/>
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Email" autoComplete="email"
                                                   value={this.state.email} onChange={this.emailChange()}/>
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" autoComplete="new-password"
                                                   value={this.state.password} onChange={this.passwordChange()}/>
                                        </InputGroup>

                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>

                                            <Input type="password" placeholder="Repeat password" autoComplete="new-password"/>
                                        </InputGroup>
                                        <button type="submit" color="success" block>Create Account</button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
  }
}

export default Register;
