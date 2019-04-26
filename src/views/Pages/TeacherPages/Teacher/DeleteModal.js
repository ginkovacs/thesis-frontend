import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class DeleteModal extends Component {
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
                <Button outline color="darkBlue" className="butt" onClick={this.toggle}>
                    <i className="fa fa-trash" aria-hidden="true"/>
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        Are you sure you want to delete this?
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

export default DeleteModal;

