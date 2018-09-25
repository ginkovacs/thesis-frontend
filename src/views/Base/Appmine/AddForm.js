import React, { Component } from 'react';
import request from 'superagent';

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fnameval : '',
            lnameval : '',
        };

        this.fname ='';
        this.lname='';

        this.restHost = 'http://localhost:8080/rest';
        this.addHost='/customer/add';
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

        request
            .post(this.restHost + this.addHost)
            .set('Content-Type', 'application/json')
            .send({firstName: this.fname, lastName: this.lname})
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.addname}>
                <label>
                    <input type="text" placeholder="first name" value={this.state.fnameval} onChange={this.fnameChange} />
                    <input type="text" placeholder="last name" value={this.state.lnameval} onChange={this.lnameChange} />
                </label>
                <button type="submit">Add</button>
            </form>
        )
    }
}

export default AddForm;
