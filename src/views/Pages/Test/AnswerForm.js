import React, { Component } from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';

export class AnswerForm extends Component {

    render() {
        return (
            <Form>
                <FormGroup check className="checkbox">
                    <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                    <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                    <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                    <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                </FormGroup>
                <FormGroup check className="checkbox">
                    <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3" />
                    <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                </FormGroup>
            </Form>
        )
    }
}

export default AnswerForm;