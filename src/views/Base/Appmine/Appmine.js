import React, { Component } from 'react';
import logo from '../../../logo.svg';
import './Appmine.css';
import AddForm from './AddForm';
import DeletePopup from './DeletePopup';
import { Redirect } from 'react-router';

class Appmine extends Component {

    constructor(props){
        super(props);
        this.state={customersList:[],}
        this.restHost = 'http://localhost:8080/rest';
        this.customersList = [];
        this.redirect = false;
    }


    componentDidMount() {
        this.setState({customersList: []});
        fetch(this.restHost + '/customer/findAll')
            .then(results => results.json())
            .then(data => {
                for (let cust of data) {
                    this.setState({customersList: [...this.state.customersList, {listid: cust.id, firstname: cust.firstName,
                        lastname: cust.lastName}]});
                }
            })
            .catch(function(error) {
                console.log(error)});
        }

        onclickHandler = () => {
            this.setState({redirect: true});
        }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/App" />;
        }

        return (
            <div className="root">
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to HELL</h1>
                    </header>
                    <p className="App-intro">
                    </p>
                </div>

                <div>
                    <button onClick={this.onclickHandler} type="button"> Killmepls </button>
                    <AddForm />

                    <table>
                        {this.state.customersList.map(item =>
                            <tr>
                                <td>{item.listid}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>
                                    <DeletePopup idToDel={item.listid}/>
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>

        );
    }
}

export default Appmine;