import React, { Component } from 'react';
import {RESTHOST} from "../../../../constants/index";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input} from "reactstrap";
import {post} from "../../../../user/UserUtils";
import AnswerForm from "./AnswerForm";
import "./Modal.css";

export class NewQuestionModal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modal: false,
            questionName: '',
            answers: []
        };

        this.testId = props.id;

        this.addQuestion = this.addQuestion.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getQuestions = props.getQuestions;
    }

    addQuestion = (event) => {
        event.preventDefault();

        post({
            url: RESTHOST + '/question/addQuestion',
            data: {question: this.state.questionName,
                answers: this.state.answers,
                testId: this.testId}
        })
            .then(() => {
                this.toggle();
                this.getQuestions();
            });
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    changeName  = (event) => {
        this.setState({questionName: event.target.value});
    }

    render() {
        return (
            <div className="d-flex justify-content-end">
                <Button className="addBut" onClick={this.toggle} color="darkBlue">Add new question</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>
                        <InputGroup>
                            <Input type="text" placeholder="Insert your question here..." value={this.state.questionName} onChange={this.changeName}/>
                        </InputGroup>
                    </ModalHeader>
                    <ModalBody>
                        <AnswerForm answers={this.state.answers}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="lightBlue" onClick={this.addQuestion}>Save</Button>
                        <Button color="darkBlue" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default NewQuestionModal;