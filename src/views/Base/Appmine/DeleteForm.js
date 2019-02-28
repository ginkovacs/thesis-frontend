import React, { Component } from 'react';
import {del} from '../../../user/UserUtils'
import {RESTHOST} from '../../../constants';
import {Button} from 'reactstrap';

class DeleteForm extends Component {
    constructor (props) {
        super(props);

        this.id = props.idToDel;
    }

    deleteHandler = (event) => {
        event.preventDefault();

        del({
            url: RESTHOST + '/customer/deleteCust',
            data: { id: this.id }
        })
        .then(response => console.log("Delete successful"))
            .then(window.location.reload());
    }

    render () {
        return (
            <div>
                <Button color="success" onClick={this.deleteHandler.bind(this)}>Yes</Button>
            </div>
        )
    }
}

export default DeleteForm;