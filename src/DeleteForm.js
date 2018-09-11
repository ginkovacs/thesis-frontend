import React, { Component } from 'react';
import request from 'superagent';
import {refreshPage} from "./App";

class DeleteForm extends Component {
    constructor (props) {
        super(props);

        this.restHost = 'http://localhost:8080/rest';
        this.deleteHost='/customer/deleteCust';

        this.id = props.idToDel;
    }

    deleteHandler = (event) => {
        event.preventDefault();

        request
            .del(this.restHost + this.deleteHost)
            .send({ id: this.id })
            .catch(error => console.log(error));
        refreshPage();
    }

    render () {
        return (
            <form>
                <button onClick={this.deleteHandler.bind(this)}>X</button>
            </form>
        )
    }
}

export default DeleteForm;