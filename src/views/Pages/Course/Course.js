import React, { Component } from 'react';
import {ACCESS_TOKEN} from "../../../constants";
import './Course.css';
import {Button, Card, CardBody, Row, Col} from "reactstrap";
import { Link } from 'react-router-dom';

export class Course extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    render () {
        return (
            <div>
                <div className="d-flex justify-content-end">
                    <Button>Add new test</Button>
                </div>
                <br/>
                <div class="tableDiv">
                    <Row>
                        <Col>
                            <h3>Materials</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Link to="/">Material 1</Link>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Link to="/">Material 2</Link>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Link to="/">Material 3</Link>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Tests</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Link to="/test">Test 1</Link>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Link to="/">Test 2</Link>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Link to="/">Test 3</Link>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Course;