import React, { Component } from 'react';
import {Button, Form, FormGroup, Input, InputGroup, Modal, ModalBody, ModalFooter} from 'reactstrap';

class EditModal extends Component {
    constructor (props) {
        super(props);

        this.state = { modal: false };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render () {
        return (
            <div>
                <Button outline color="darkBlue" className="butpen" onClick={this.toggle}>
                    <i className="fa fa-pencil"  aria-hidden="true"/>
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        <InputGroup>
                            <Input type="text" placeholder="Course name"/>
                        </InputGroup>
                        <br/>
                        <Form>
                            <FormGroup>
                                <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                       placeholder="Description of the course..." />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="lightBlue" onClick={this.toggle}>Yes</Button>
                        <Button color="darkBlue" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EditModal;

