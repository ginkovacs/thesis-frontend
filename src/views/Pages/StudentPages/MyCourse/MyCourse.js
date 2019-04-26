import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../../constants/index";
import Topbar from '../../../Global/Topbar/Topbar';
import {get} from "../../../../user/UserUtils";
import classnames from "classnames";
import {Card, CardHeader, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {Link} from "react-router-dom";
import pdf from "../../../../../src/assets/img/pdf.png";
import "./MyCourse.css";

export class MyCourse extends Component {
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

        this.getTests = this.getTests.bind(this);
        this.renderCols = this.renderCols.bind(this);
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
            this.getTests()
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
                            <CardHeader className="testH">
                                <Row>
                                    <Col>
                                        <h5 className="names">{s.name}</h5>
                                    </Col>
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                )
            }
        )

        return cols;
    }

    toggle (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toTest(id) {
        this.props.history.push("/MyTest/" + id);
    }

    render () {
        if(this.state.loading) {
            return <div>
                Loading...
            </div>
        }

        return (
            <div>
                <Topbar/>
                <br/>
                <div className="tableDiv">
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
                                        Achievements
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <br/>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col md="6">
                                            <Row>
                                                <h5>Files:</h5>
                                            </Row>
                                            <Row>
                                                <Col md="1"/>
                                                <Col>
                                                    <img src={pdf} alt="pdf" className="picture"/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="1"/>
                                                <Col>
                                                    <p className="szoveg">pdf.pdf</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                                <h5>Links:</h5>
                                            </Row>
                                            <Row>
                                                <Col md="1"/>
                                                <Col>
                                                    <Link to="www.google.com">http://localhost:8080/course/</Link>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="tableDiv justify-content-center">
                                        {this.renderCards()}
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row>
                                        <Col md="6">
                                            <Card color="lightBlue">
                                                <CardHeader>
                                                    <h5>
                                                        You were the fastest out of all the students with: 0:__ !! ٩( ๑╹ ꇴ╹)۶
                                                    </h5>
                                                </CardHeader>
                                            </Card>
                                        </Col>
                                        <Col md="6">
                                            <Card color="lightBlue">
                                                <CardHeader>
                                                    <h5>
                                                        You had the most right answers out of all the students with: __% !!
                                                    </h5>
                                                </CardHeader>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col md="6">
                                            <Card color="lightBlue">
                                                <CardHeader>
                                                    <h5>
                                                        You were the first to complete the <i>test</i> at: 2019. 04. __!!
                                                    </h5>
                                                </CardHeader>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default MyCourse;