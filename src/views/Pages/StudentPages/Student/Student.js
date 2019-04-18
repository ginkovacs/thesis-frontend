import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../../constants/index";
import Topbar from '../../../Global/Topbar/Topbar';
import {get} from "../../../../user/UserUtils";
import {Card, CardHeader, CardBody, Row, Col} from "reactstrap";

export class Student extends Component {

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

    renderCols = (egySlice) => {
        let cols = [];

        egySlice.forEach( s => {
                cols.push(
                    <Col md="4">
                        <Card onClick={() => this.toCourse(s.id)}>
                            <CardHeader className="cardH">
                                {s.name}
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

    toCourse(id) {
        this.props.history.push("/course/" + id);
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
                <div className="tableDiv justify-content-center">
                    {this.renderCards()}
                </div>
            </div>
        )
    }
}

export default Student;