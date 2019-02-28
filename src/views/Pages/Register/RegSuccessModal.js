import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export class RegSuccessModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.modal = props.modal;
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
            return (
                <div>
                    <Modal isOpen={this.modal} toggle={this.toggle}>
                        <ModalBody>
                            Register successfull.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Najsu</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );

    }
}

export default RegSuccessModal;