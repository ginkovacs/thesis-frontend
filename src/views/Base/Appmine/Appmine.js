import React, { Component } from 'react';
import logo from '../../../logo.svg';
import './Appmine.css';
import AddForm from './AddForm';
//import DeletePopup from './DeletePopup';
//import { Redirect } from 'react-router';
import {ACCESS_TOKEN, RESTHOST} from '../../../constants';
import {get} from '../../../user/UserUtils';
import DeletePopup from './DeletePopup';

class Appmine extends Component {

    constructor(props){
        super(props);

        this.state={customersList:[],}

        this.restHost = 'http://localhost:8080/rest';
        this.customersList = [];
        //this.redirect = false;
        this.setState({customersList: this.customersList});
        this.fckThis = this.fckThis.bind(this);
        this.fckThisToo = this.fckThisToo.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.history.push("/login");
        }
    }

    componentDidMount() {
        get({
            url: RESTHOST + '/customer/findAll',
        })
            .then(response => {
                let list = response.body;
                this.setState({customersList: list});
            })
    }

    fckThis(added) {
        let tempList = this.state.customersList;
        console.log(tempList);
        tempList.push(added);
        this.setState({customersList: tempList});
    }

    fckThisToo(deletedId) {
        let tempList = this.state.customersList.filter(customer => {
            return customer.id !== deletedId
        });
        console.log(tempList);
        this.setState({customersList: tempList});
    }

        /*onclickHandler = () => {
            this.setState({redirect: true});
        }*/

    render() {

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
                    {/*<button onClick={this.onclickHandler} type="button"> Killmepls </button>*/}
                    <AddForm fckThis={this.fckThis}/>

                    <table>
                        {this.state.customersList.map(item =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>
                                    <DeletePopup fckThisToo={this.fckThisToo} idToDel={item.id}/>
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

/*

        if (this.state.redirect) {
            return <Redirect push to="/App" />;
        }
        <DeletePopup idToDel={item.listid} modal={this.modal}/>
 */