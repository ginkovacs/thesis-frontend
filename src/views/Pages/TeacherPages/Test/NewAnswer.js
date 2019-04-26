import React, { Component } from 'react';
import {Button, InputGroup, Input, Row, Col} from 'reactstrap';

export class NewAnswer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            inputState: false,
            inputValue: ''
        }

        this.addAnswer = props.addAnswer;

        this.toggle = this.toggle.bind(this);
        this.inputFunc = this.inputFunc.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.addAns = this.addAns.bind(this);

    }

    changeInput  = (event) => {
        this.setState({inputValue: event.target.value});
    }

    addAns () {
        this.addAnswer(this.state.inputValue);
        this.setState({inputValue: ''});
    }

    inputFunc () {
        if(this.state.inputState) {
            return (
                <div>
                    <InputGroup>
                        <Input type="textarea" name="textarea-input" id="textarea-input"
                               value={this.state.inputValue} onChange={this.changeInput}/>
                    </InputGroup>
                    <Row>
                        <Col md="5" />
                        <Col md="4" className="addAns">
                            <Button color="lightBlue" onClick={this.addAns}>Add answer</Button>
                        </Col>
                        <Col md="2">
                            <Button color="darkBlue" onClick={this.toggle}>Cancel</Button>
                        </Col>
                        <Col md="1"/>
                    </Row>
                </div>
            )
        }
    }

    toggle() {
        this.setState(prevState => ({
            inputState: !prevState.inputState
        }));
    }

    render() {
        return (
            <div>
                <Button color="lightBlue" onClick={this.toggle}>
                    Create new answer
                </Button>
                <div>
                    {this.inputFunc()}
                </div>
            </div>
        )
    }
}

export default NewAnswer;