import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, InputGroup, Input} from "reactstrap";

export class LinkModal extends Component {

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
                <Button color="darkBlue"  onClick={this.toggle}>Add new link</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        <InputGroup>
                            <Input type="text" placeholder="Copy link here"/>
                        </InputGroup>
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

export default LinkModal;