import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './DeletePopup.css'
import DeleteForm from './DeleteForm'


class DeletePopup extends Component {
    constructor (props) {
        super(props);

        this.state = { open: false };
        this.id = props.idToDel;
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
        )
    }
}

export default DeletePopup;