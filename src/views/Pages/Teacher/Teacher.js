import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../constants";
import './Teacher.css';
import {Button, Card, CardHeader, CardBody, Row, Col} from "reactstrap";
import {get} from "../../../user/UserUtils";

export class Teacher extends Component {

    constructor (props) {
        super(props);

        this.state = {
            courses: [],
            user: null
        }

        this.toCourse=this.toCourse.bind(this);
        this.getCourses = this.getCourses.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }

        get({
            url: RESTHOST + '/user'
        })
            .then(response => {
                this.setState({user : response.body});
            })
    }

    componentDidMount() {
        if (this.state.user === null) {
            get({
                url: RESTHOST + '/user'
            })
                .end((err, res) => {
                    this.setState({user : res.body});
                    this.getCourses();
                })
        }
        else {
            this.getCourses();
        }
    }

    getCourses() {
        get({
            url: RESTHOST + '/course/findAll',
            data: {email: this.state.user.email}
        })
            .then(response => {
                this.setState({courses: response.body});
            });
    }

    toCourse(id) {
        /*this.props.history.push({
            pathname: '/course',
            state: {id: id}
        });*/
        this.props.history.push('/course');
    }

    renderCols = (egySlice) => {
        let cols = [];

        egySlice.forEach( s =>
            cols.push(
                <Col md="4">
                    <Card onClick={this.toCourse(s.id)}>
                        <CardHeader>
                            {s.name}
                        </CardHeader>
                        <CardBody>Something About The Course? {s.description}</CardBody>
                    </Card>
                </Col>
            )
        )

        return cols;
    }

    renderCards = () => {
        let rows = [];

        let count = this.state.courses.length;

        let numInRow = 3;

        for (let i=0; i<=count/numInRow; i+=3) {
            let egySlice = this.state.courses.slice(i, i+2);

            rows.push(
                <Row>
                    {this.renderCols(egySlice)}
                </Row>);
        }

        return rows;
    }


    render() {
        return (
            <div>
                <div class="d-flex justify-content-end">
                    <Button>Add new course</Button>
                </div>
                <br/>
                <div class="tableDiv justify-content-center">
                    {this.renderCards()}
                </div>
            </div>
        );

    }
}

export default Teacher;