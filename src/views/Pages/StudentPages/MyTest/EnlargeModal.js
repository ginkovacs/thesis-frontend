import React, { Component } from 'react';
import { Col,  Modal, ModalBody, Row} from 'reactstrap';
import diamond from "../../../../../src/assets/img/Diamond.png";

class EnlargeModal extends Component {
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
                <Row>
                    <Col md="10"/>
                    <Col onClick={this.toggle}>
                        <img src={diamond} alt="diamond" className="picture"/>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        <img src={diamond} alt="diamond" className="enlarged"/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default EnlargeModal;

