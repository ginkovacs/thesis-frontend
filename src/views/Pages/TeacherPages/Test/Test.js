import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../../constants/index";
import './Test.css';
import {Col, Row} from "reactstrap";
import {get} from "../../../../user/UserUtils";
import NewQuestionModal from './NewQuestionModal';

export class Test extends Component {
    constructor (props) {
        super(props);

        this.state = {
            questions: [],
            loading: true
        }

        this.testId = this.props.match.params.id;

        this.getQuestions = this.getQuestions.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    getQuestions () {
        get({
            url: RESTHOST + '/question/findAllQuestion',
            data: {testId: this.testId}
        })
            .then(response => {
                this.setState({questions: response.body});
                this.setState({loading: false});
            });
    }

    renderQuestions = () => {
        let rows = [];

        let count = this.state.questions.length;

        for (let i = 0; i<count; i++) {
            let row = this.state.questions[i];

            rows.push(
                <Row>
                    {row.question}
                </Row>
            )
        }

        return rows;
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-center">
                    <Row>
                        <Col md="7">
                            <h2>Test name</h2>
                        </Col>
                        <Col>
                            <NewQuestionModal id={this.state.id}/>
                        </Col>
                    </Row>
                </div>
                <div class="questionsDiv">
                    <Row>
                        {this.renderQuestions()}
                    </Row>
                </div>
            </div>
        )
    }
}

export default Test;