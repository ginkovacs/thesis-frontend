import React, { Component } from 'react';
//import Popup from "reactjs-popup";
import './DeletePopup.css'
//import DeleteForm from './DeleteForm'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './modal.css';


class DeletePopup extends Component {
    constructor (props) {
        super(props);

        this.state = { open: false };
        this.id = props.idToDel;
        this.modal = props.modal;
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    render () {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>X</Button>
                <Modal isOpen={this.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default DeletePopup;

/*
<div>
                <button className="button" onClick={this.openModal}>
                    X
                </button>
                <Popup open={this.state.open}
                        closeOnDocumentClick
                        onClose={this.closeModal}>
                    <div className="modal">
                        <a className="close" onClick={this.closeModal}>
                            &times;
                        </a>
                        <div className="content">
                            Are you sure you want to delete this customer?
                        </div>
                        <div className="actions">
                            <DeleteForm idToDel = {this.id}/>
                            <button className="button" onClick={this.closeModal}>
                                No
                            </button>
                        </div>
                    </div>
                </Popup>
            </div>
 */

