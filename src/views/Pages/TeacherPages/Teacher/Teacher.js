import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../../constants/index";
import './Teacher.css';
import {Card, CardHeader, CardBody, Row, Col} from "reactstrap";
import {get} from "../../../../user/UserUtils";
import NewCourseModal from './NewCourseModal';
import Topbar from '../../../Global/Topbar/Topbar';
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export class Teacher extends Component {

    constructor (props) {
        super(props);

        this.state = {
            courses: [],
            user: null,
            loading: true
        }

        this.toCourse=this.toCourse.bind(this);
        this.getCourses = this.getCourses.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    componentDidMount() {
        get({
            url: RESTHOST + '/user'
        })
            .end((err, res) => {
                this.setState({user : res.body});
                this.getCourses();
            })
    }

    getCourses() {
        get({
            url: RESTHOST + '/course/findAll',
            data: {email: this.state.user.email}
        })
            .then(response => {
                this.setState({courses: response.body});
                this.setState({loading: false});
            });
    }

    toCourse(id) {
        this.props.history.push("/course/" + id);
    }

    renderCols = (egySlice) => {
        let cols = [];

        egySlice.forEach( s => {
                cols.push(
                    <Col md="4">
                        <Card >
                            <CardHeader className="cardH">
                                <Row>
                                    <Col md="8" onClick={() => this.toCourse(s.id)}>
                                        <h5 className="name" >{s.name}</h5>
                                    </Col>
                                    <Col md="2">
                                        <EditModal/>
                                    </Col>
                                    <Col md="1">
                                        <DeleteModal/>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>{s.description}</CardBody>
                        </Card>
                    </Col>
                )
            }
        )

        return cols;
    }

    renderCards = () => {
        let rows = [];

        let count = this.state.courses.length;

        let numInRow = 3;

        for (let i=0; i<=count/numInRow; i+=1) {
            let egySlice = this.state.courses.slice(i*numInRow, (i+1)*numInRow);

            rows.push(
                <Row className="mb-3">
                    {this.renderCols(egySlice)}
                </Row>);
        }

        return rows;
    }

    render() {
        if(this.state.loading) {
            return <div>
                Loading...
            </div>
        }

        return (
            <div>
                <Topbar/>
                <br/>
                <NewCourseModal userEmail={this.state.user.email} getCourses={this.getCourses}/>
                <br/>
                <div className="tableDiv justify-content-center">
                    {this.renderCards()}
                </div>
            </div>
        );

    }
}

export default Teacher;