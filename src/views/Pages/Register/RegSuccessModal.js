import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class RegSuccessModal extends Component {
    constructor(props) {
        super(props);

        this.modal = props.modal;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.modal}>
                    <ModalHeader isOpen={this.modal}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Do Something</Button>{' '}
                        <Button color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default RegSuccessModal;