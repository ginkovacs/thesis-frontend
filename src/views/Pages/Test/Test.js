import React, { Component } from 'react';
import {ACCESS_TOKEN} from "../../../constants";
import './Test.css';
import {Col, Row} from "reactstrap";

export class Test extends Component {

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-center">
                    <h2>Test name</h2>
                </div>
                <div class="questionsDiv">
                    <Row>
                        question 1
                    </Row>
                    <Row>
                        <Col>
                            <Row>answer a</Row>
                            <Row>answer b</Row>
                            <Row>answer c</Row>
                            <Row>answer d</Row>
                        </Col>
                    </Row>
                    <Row>
                        question 2
                    </Row>
                    <Row>
                        <Col>
                            <Row>answer a</Row>
                            <Row>answer b</Row>
                            <Row>answer c</Row>
                            <Row>answer d</Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Test;