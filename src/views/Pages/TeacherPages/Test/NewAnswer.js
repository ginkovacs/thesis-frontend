import React, { Component } from 'react';
import {Button, InputGroup, Input, Row} from 'reactstrap';

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
                        <Button onClick={this.addAns}>Add answer</Button>
                        <Button onClick={this.toggle}>Cancel</Button>
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
                <Button onClick={this.toggle}>
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