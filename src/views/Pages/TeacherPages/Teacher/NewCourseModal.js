import React, { Component } from 'react';
import {RESTHOST} from "../../../../constants/index";
import {Button, Modal, ModalBody, ModalFooter, InputGroup, Input, Form, FormGroup} from "reactstrap";
import {post} from "../../../../user/UserUtils";
import './NewCourseModal.css';

export class NewCourseModal extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modal: false,
            courseName: '',
            description: ''
        };

        this.userEmail = props.userEmail;
        this.getCourses = props.getCourses;

        this.courseName = '';
        this.description = '';

        this.toggle = this.toggle.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
    }


    addCourse = (event) => {
        event.preventDefault();
        this.courseName = this.state.courseName;
        this.description = this.state.description;

        post({
            url: RESTHOST + '/course/addCourse',
            data: {courseName: this.state.courseName,
                description: this.state.description,
                userEmail: this.userEmail}
        })
            .then(() => {
                this.toggle();
                this.getCourses();
            });
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    changeName  = (event) => {
        this.setState({courseName: event.target.value});
    }

    changeDesc  = (event) => {
        this.setState({description: event.target.value});
    }

    render() {
        return (
            <div className="d-flex justify-content-end">
                <Button onClick={this.toggle} className="modalGomb" color="darkBlue">Add new course</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        <InputGroup>
                            <Input type="text" placeholder="Course name" value={this.state.courseName} onChange={this.changeName}/>
                        </InputGroup>
                        <br/>
                        <Form>
                            <FormGroup>
                                <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                       value={this.state.description} onChange={this.changeDesc}
                                placeholder="Description of the course..." />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.addCourse}>Save</Button>
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default NewCourseModal;