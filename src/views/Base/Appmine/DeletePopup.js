import React, { Component } from 'react';
//import Popup from "reactjs-popup"
import './DeletePopup.css'
import DeleteForm from './DeleteForm'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './modal.css';


class DeletePopup extends Component {
    constructor (props) {
        super(props);

        this.state = { modal: false };
        this.id = props.idToDel;
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
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        Are you sure you want to delete this?
                    </ModalBody>
                    <ModalFooter>
                        <DeleteForm idToDel={this.id}/>
                        <Button color="danger" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default DeletePopup;

