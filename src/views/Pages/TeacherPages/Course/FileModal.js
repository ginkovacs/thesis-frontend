import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";

export class FileModal extends Component {

    constructor (props) {
        super(props);

        this.state = {
            modal: false
        };

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
                <Button color="darkBlue"  onClick={this.toggle}>Add new file</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        <Button color="lightBlue" className="text-darkBlue">Search</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="text-darkBlue" color="lightBlue">Save</Button>
                        <Button onClick={this.toggle} color="darkBlue">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default FileModal;