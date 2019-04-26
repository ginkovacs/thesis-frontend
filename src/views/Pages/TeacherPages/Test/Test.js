import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../../constants/index";
import './Test.css';
import {Col, Row, Button} from "reactstrap";
import {get} from "../../../../user/UserUtils";
import NewQuestionModal from './NewQuestionModal';
import diamond from "../../../../../src/assets/img/Diamond.png";

export class Test extends Component {
    constructor (props) {
        super(props);

        this.state = {
            questions: [],
            loading: true,
            test: null
        }

        this.testId = this.props.match.params.id;


        this.getQuestions = this.getQuestions.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.getTest = this.getTest.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    componentDidMount() {
        Promise.all([
            this.getTest(),
            this.getQuestions()
        ])
            .then(() => {
                    this.setState({loading: false});
                }
            );
    }

    getTest() {
        return get({
            url: RESTHOST + '/test/findTest',
            data: {id: this.testId}
        })
            .then(response => {
                this.setState({test: response.body});
            });
    }

    getQuestions () {
        get({
            url: RESTHOST + '/question/findAllQuestion',
            data: {testId: this.testId}
        })
            .then(response => {
                this.setState({questions: response.body});
            });
    }

    renderQuestions = () => {
        let rows = [];

        let count = this.state.questions.length;

        for (let i = 0; i<count; i++) {
            let row = this.state.questions[i];

            rows.push(
                <Row>
                    <Col md="3">
                        <Row>
                            <Col md="10"/>
                            <Col onClick={this.toggle}>
                                <img src={diamond} alt="diamond" className="picture"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6">
                        <Row>
                            <Col md="9">
                                <h4>{i+1}. {row.question}</h4>
                            </Col>
                            <Col md="1">
                                <Button color="lightBlue">
                                    <i className="fa fa-plus-square" aria-hidden="true"/>
                                </Button>
                            </Col>
                            <Col md="1">
                                <Button outline color="lightBlue">
                                    <i className="fa fa-pencil" aria-hidden="true"/>
                                </Button>
                            </Col>
                            <Col md="1">
                                <Button outline color="darkBlue">
                                    <i className="fa fa-trash" aria-hidden="true"/>
                                </Button>
                            </Col>
                        </Row>
                        <hr/>
                        <p>{this.renderAnswers(row.answers)}</p>
                        <hr/>
                        <br/>
                    </Col>
                    <Col md="3"/>
                </Row>
            )
        }

        return rows;
    }

    renderAnswers = (answers) => {
        let lista = [];

        answers.forEach(a => {
            let answerRow;
            if(a.right) {
                answerRow =
                    <Row>
                        <Col md="10"><h5>{a.answer}</h5></Col>
                        <Col md="1">
                            <Button color="lightBlue">
                                <i className="fa fa-pencil" aria-hidden="true"/>
                            </Button>
                        </Col>
                        <Col md="1">
                            <Button color="darkBlue">
                                <i className="fa fa-trash" aria-hidden="true"/>
                            </Button>
                        </Col>
                    </Row>
            }
            else {
                answerRow =
                    <Row>
                        <Col md="10"><h5>{a.answer}</h5></Col>
                        <Col md="1">
                            <Button color="lightBlue">
                                <i className="fa fa-pencil" aria-hidden="true"/>
                            </Button>
                        </Col>
                        <Col md="1">
                            <Button color="darkBlue">
                                <i className="fa fa-trash" aria-hidden="true"/>
                            </Button>
                        </Col>
                    </Row>
            }
            lista.push(answerRow)
        });

        return lista;
    }

    render() {
        if(this.state.loading) {
            return <div>
                Loading...
            </div>
        }

        return (
            <div>
                <br/>
                <div className="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <h2>{this.state.test.name}</h2>
                        </Col>
                    </Row>
                </div>
                <br/>
                <div className="questionsDiv">
                    {this.renderQuestions()}
                </div>
                <Row className="d-flex justify-content-end">
                    <Col md="8">
                        <NewQuestionModal id={this.state.test.id} getQuestions={this.getQuestions}/>
                    </Col>
                    <Col md="4"/>
                </Row>
            </div>
        )
    }
}

export default Test;