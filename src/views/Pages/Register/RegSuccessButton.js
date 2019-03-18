import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
//import RegSuccessModal from "./RegSuccessModal";

export class RegSuccessButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: true
        };
        this.success = true;
        this.toggle = this.toggle.bind(this);
    }

    modalPopup () {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        Register successfull.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Najsu</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Button color="success" type="submit" block onClick={this.modalPopup}> Create Account </Button>
            </div>
        );
    }
}

export default RegSuccessButton;
/*

 */