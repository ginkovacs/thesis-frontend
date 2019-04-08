import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../constants";
import './Course.css';
import {Card, CardHeader, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {get} from "../../../user/UserUtils";
import NewTestModal from "./NewTestModal";
import classnames from 'classnames';

export class Course extends Component{
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            tests: [],
            loading: true,
            activeTab: '1',
            users: []
        }

        this.courseId = this.props.match.params.id;
        this.name ='';

        this.changeName = this.changeName.bind(this);
        this.getTests = this.getTests.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.renderCols = this.renderCols.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.toTest = this.toTest.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    componentDidMount() {
        Promise.all([
            this.getTests(),
            this.getUsers()
        ])
            .then(() => {
                this.setState({loading: false});
            }
        );
    }

    getTests() {
        return get({
            url: RESTHOST + '/test/findAll',
            data: {courseId: this.courseId}
        })
            .then(response => {
                this.setState({tests: response.body});
            });
    }

    getUsers() {
        return get({
            url: RESTHOST + '/user/findAll'
        })
            .then(response => {
                this.setState({users: response.body});
            });
    }


    renderCards = () => {
        let rows = [];

        let count = this.state.tests.length;

        let numInRow = 3;

        for (let i=0; i<=count/numInRow; i+=1) {
            let egySlice = this.state.tests.slice(i*numInRow, (i+1)*numInRow);

            rows.push(
                <Row className="mb-3">
                    {this.renderCols(egySlice)}
                </Row>);
        }

        return rows;
    }

    renderCols = (egySlice) => {
        let cols = [];

        egySlice.forEach( s => {
                cols.push(
                    <Col md="4">
                        <Card onClick={() => this.toTest(s.id)}>
                            <CardHeader>
                                {s.name}
                            </CardHeader>
                        </Card>
                    </Col>
                )
            }
        )

        return cols;
    }

    renderUsers = () => {
        let rows = [];

        this.state.users.forEach( r => {
                rows.push(
                    <Row>
                        {r.email}
                    </Row>
                )
            }
        )

        return rows;
    }

    toTest(id) {
        this.props.history.push("/test/" + id);
    }

    changeName  = (event) => {
        this.setState({name: event.target.value});
    }

    toggle (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render () {
        if(this.state.loading) {
            return <div>
                Loading...
            </div>
        }

        return (
            <div>
                <div className="d-flex justify-content-end">
                    <NewTestModal id={this.courseId} getTests={this.getTests}/>
                </div>
                <br/>
                <div class="tableDiv">
                    <Row>
                        <Col>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>
                                            Materials
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}>
                                            Tests
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}>
                                        Students
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <h4>Tab 1 Contents</h4>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="tableDiv justify-content-center">
                                        {this.renderCards()}
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="tableDiv justify-content-center">
                                        {this.renderUsers()}
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Course;