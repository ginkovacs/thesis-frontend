import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddForm from './AddForm';
import DeletePopup from './DeletePopup';

export const refreshPage = () => {
    window.location.reload();
}

class App extends Component {

    constructor(props){
        super(props);
        this.state={elist:[],}
        this.restHost = 'http://localhost:8080/rest';
        this.customersList = [];
        this.myList = [];
    }


    componentDidMount() {
        this.setState({elist: []});
        this.myList.length=0;
        fetch(this.restHost + '/customer/findAll')
            .then(results => results.json())
            .then(data => {
                    for(let cust of data) {
                        this.customersList.push(cust);
                        for(let i=0; i<this.customersList.length; i++) {
                            this.myList.push({
                                listid: this.customersList[i].id, firstname: this.customersList[i].firstName,
                                lastname: this.customersList[i].lastName
                            });
                        }
                    }
                    this.setState({elist:this.myList});
                })
            .catch(function(error) {
                console.log(error)});
        }

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
                    <AddForm />

                    <table>
                        {this.state.elist.map(item =>
                            <tr>
                                <td>{item.listid}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>
                                    <DeletePopup/>
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>

        );
    }
}

export default App;

/*
<td><DeleteForm idToDel={item.listid}/></td>
 */