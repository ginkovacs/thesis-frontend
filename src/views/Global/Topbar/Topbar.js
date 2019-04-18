import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import './Topbar.css';

class Topbar extends Component {

    render () {
        return (
                <Row className="topRow">
                    <Col className="col-md-10">
                    </Col>
                    <Col className="d-flex justify-content-end col-md-1 oszlop">
                        test
                    </Col>
                    <Col className="col-md-1">
                        <Button color="lightBlue gomb">
                            <i className="fa fa-sign-out" aria-hidden="true"/>
                        </Button>
                    </Col>
                </Row>
        )
    }
}

export default Topbar;