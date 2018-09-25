import React, { Component } from 'react';
import request from 'superagent';

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
    }

    render () {
        return (
            <div>
                <button onClick={this.deleteHandler.bind(this)}>Yes</button>
            </div>
        )
    }
}

export default DeleteForm;