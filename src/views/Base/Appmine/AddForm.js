import React, { Component } from 'react';
import {Form} from 'reactstrap';
import {RESTHOST} from '../../../constants';
import {post} from '../../../user/UserUtils';

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fnameval : '',
            lnameval : '',
        };

        this.fname ='';
        this.lname='';
    }

    fnameChange = (event) => {
        this.setState({fnameval: event.target.value});
    }

    lnameChange = (event) => {
        this.setState({lnameval: event.target.value})
    }

   addname = (event) => {
        event.preventDefault();
        this.fname = this.state.fnameval;
        this.lname = this.state.lnameval;

        post({
            url: RESTHOST + '/customer/add',
            data: {firstName: this.fname, lastName: this.lname}
        })
            .then(console.log('Customer added.'));
    }

    render() {
        return (
            <Form onSubmit={this.addname}>
                <label>
                    <input type="text" placeholder="first name" value={this.state.fnameval} onChange={this.fnameChange} />
                    <input type="text" placeholder="last name" value={this.state.lnameval} onChange={this.lnameChange} />
                </label>
                <button type="submit">Add</button>
            </Form>
        )
    }
}

export default AddForm;
