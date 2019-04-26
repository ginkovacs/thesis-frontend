import React, { Component } from 'react';
import {ACCESS_TOKEN, RESTHOST} from "../../../../constants/index";
import {get} from "../../../../user/UserUtils";
import {Col, Row, Label, Input, Button, Form, Container} from "reactstrap";
import "./MyTest.css";
import EnlargeModal from "./EnlargeModal";
//import diamond from "../../../../../src/assets/img/Diamond.png";

export class MyTest extends Component {
    constructor (props) {
        super(props);

        this.state = {
            questions: [],
            loading: true,
            test: null,
            chosenAnswers: {},
            checks: {},
            isSubmitted: false,
            start: new Date(),
            time: 0
        };

        this.testId = this.props.match.params.id;

        this.getQuestions = this.getQuestions.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.getTest = this.getTest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.elteltIdo = this.elteltIdo.bind(this);
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

        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1000);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({isSubmitted: true});

        this.state.questions.forEach(q => {
            let rightAnswer = q.answers.filter(a => a.right)[0].id;
            console.log(this.state.chosenAnswers[q.id]);
            console.log(rightAnswer);

            if (String(this.state.chosenAnswers[q.id]) === String(rightAnswer)) {
               console.log(q + ": jó")
            }
            else {
                console.log(q + ": rossz")
            }
        });

        clearInterval(this.timer);
    }

    handleAnswerCheck(event) {
        let values = event.target.value.split("-");
        let a = this.state.chosenAnswers;
        a[values[0]] = values[1];

        let b = this.state.checks;
        b[values[1]] = true;

        this.setState({chosenAnswers: a, checks: b});
        console.log(this.state.chosenAnswers);
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
                let tmpChecks = {};
                this.state.questions.forEach(q => {
                    q.answers.forEach(a => {
                        tmpChecks[a.id] = false;
                    })
                });
                this.setState({checks: tmpChecks});
            });
    }

    renderPicture (i) {
        if (i===1) {
            return (
                <EnlargeModal/>
            )
        }
    }

    renderQuestions = () => {
        let rows = [];

        let count = this.state.questions.length;

        for (let i = 0; i<count; i++) {
            let row = this.state.questions[i];

            rows.push(
                <Row>
                    <Col md="4">
                        {this.renderPicture(i)}
                    </Col>
                    <Col md="4">
                            <h4>{i+1}. {row.question}</h4>
                        <hr/>
                        {this.renderAnswers(row)}
                        <hr/>
                        <br/>
                    </Col>
                    <Col md="4"/>
                </Row>
            )
        }

        return rows;
    }

    renderAnswers = (question) => {
        let lista = [];
        let qId = "question-" + question.id;

        question.answers.forEach(a => {
            let answerRow =
                <Row>
                    <Col>
                        <Label check>
                            <Input type="radio" name={qId} value={question.id + "-" + a.id} disabled={this.state.isSubmitted}
                                   checked={this.state.checks[a.id]} onChange={this.handleAnswerCheck.bind(this)}/>

                            <h5>
                                {a.answer}

                                {this.state.isSubmitted && a.right && (
                                    <i className="fa fa-check chck" aria-hidden="true"/>
                                )}

                                {this.state.isSubmitted && !a.right && this.state.checks[a.id] && (
                                    <i className="fa fa-times cross" aria-hidden="true"/>
                                )}
                            </h5>
                        </Label>
                    </Col>
                </Row>;

            lista.push(answerRow)
        });

        return lista;
    }

    elteltIdo () {
        let eltelt = this.state.time;

        let seconds = Math.floor((eltelt / 1000) % 60);
        let minutes = Math.floor((eltelt / (1000 * 60)) % 60);
        let hours = Math.floor((eltelt / (1000 * 60 * 60)) % 24);

        return <div>{hours}:{minutes}:{seconds}</div>
    }

    render () {

        if(this.state.loading) {
            return <div>
                Loading...
            </div>
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="d-flex justify-content-center">
                    <Row>
                        <Col md="7">
                            <h2>{this.state.test.name}</h2>
                        </Col>
                        <Col>
                            <Container>
                                {this.elteltIdo()}
                            </Container>
                        </Col>
                    </Row>
                </div>
                <div className="questionsDiv">
                    {this.renderQuestions()}
                </div>
                <div className="d-flex justify-content-center">
                    <Row>{!this.state.isSubmitted ?
                        (<Button type="submit" color="darkBlue" onClick={this.toggle}>Submit</Button>):
                        (<Button type="submit" disabled>Submit</Button>)
                    }
                    </Row>
                </div>

            </Form>
        )
    }
}

export default MyTest;