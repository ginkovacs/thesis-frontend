import React, { Component } from 'react';
import {RESTHOST} from "../../../../constants/index";
import {Button, Modal, ModalBody, ModalFooter, InputGroup, Input} from "reactstrap";
import {post} from "../../../../user/UserUtils";
import './NewTestModal.css';

export class NewTestModal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modal: false,
            testName: ''
        };

        this.courseId = props.id;
        this.getTests = props.getTests;

        this.testName = '';

        this.addTest = this.addTest.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    addTest = (event) => {
        event.preventDefault();
        this.testName = this.state.testName;

        post({
            url: RESTHOST + '/test/addTest',
            data: {name: this.testName,
                questions: [],
                courseId: this.courseId}
        })
            .then(() => {
                this.toggle();
                this.getTests();
            });
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    changeName  = (event) => {
        this.setState({testName: event.target.value});
    }

    render() {
        return (
            <div className="d-flex justify-content-end">
                <Button onClick={this.toggle} className="testGomb" color="darkBlue">Add new test</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        <InputGroup>
                            <Input type="text" placeholder="Test name" value={this.state.testName} onChange={this.changeName}/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.addTest}>Save</Button>
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default NewTestModal;