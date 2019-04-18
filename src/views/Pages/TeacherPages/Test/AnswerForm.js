import React, { Component } from 'react';
import {Form, FormGroup, Row, Label, Input} from 'reactstrap';
import NewAnswer from './NewAnswer';
import {ACCESS_TOKEN} from "../../../../constants/index";

export class AnswerForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            answers: props.answers
        }

        this.renderAnswers = this.renderAnswers.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    handleOptionChange (changeEvent) {
        let list = this.state.answers;

        for (let i = 0; i<list.length; i++) {
            if (String(i) !== changeEvent.target.value) {
                list[i].isRight = false;
            }
            else list[i].isRight = true;
        }

        this.setState({answers: list});
        console.log(this.state.answers);
    }

    renderAnswers = () => {
        let rows = [];
        let count = this.state.answers.length;

        for (let i=0; i<count; i++) {

            rows.push(
                <FormGroup check>
                  <Row>
                      <Label check>
                          <Input type="radio" name="answer" value={i} onChange={this.handleOptionChange}/>
                            {this.state.answers[i].answer}
                      </Label>
                  </Row>
                </FormGroup>
            );
        }

        return rows;
    }

    addAnswer (answer) {
        this.state.answers.push({"answer": answer, "isRight": false});
        this.setState(this.state);
    }

    render() {
        return (
            <Form>
                {this.renderAnswers()}
                <NewAnswer addAnswer={this.addAnswer}/>
            </Form>
        )
    }
}

export default AnswerForm;