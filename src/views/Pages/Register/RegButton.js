import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
//import RegSuccessModal from "./RegSuccessModal";

export class RegButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            success: props.success
        };

        this.toggle = this.toggle.bind(this);
    }

    modalPopup () {
        console.log(this.state.success);
        if (this.state.success) {
            return (
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalBody>
                            Registration was successful!
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.proceed}>Proceed</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
    }

    proceed () {
        this.props.history.push("/login");
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Button color="primary" type="submit" onClick={this.modalPopup}> Create Account </Button>
            </div>
        );
    }
}

export default RegButton;