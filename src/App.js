import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Styles
import './App.css';

// Containers
import {DefaultLayout} from './containers';
// Pages
import {Page404, Page500,
        Login, Register,
        Teacher, Course, Test,
        Student, MyCourse, MyTest} from './views/Pages';
import Appmine from "./views/Base/Appmine";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" name="Home" component={DefaultLayout}/>
                    <Route path="/login" name="Login Page" component={Login}/>
                    <Route exact path="/register" name="Register Page" component={Register}/>
                    <Route exact path="/404" name="Page 404" component={Page404}/>
                    <Route exact path="/500" name="Page 500" component={Page500}/>
                    <Route exact path="/App" name='Base' component={Appmine}/>
                    <Route exact path="/teacher" name='Teacher' component={Teacher}/>
                    <Route exact path="/course/:id" name='Course' component={Course}/>
                    <Route exact path="/test/:id" name='Test' component={Test}/>
                    <Route exact path="/student" name='Student' component={Student}/>
                    <Route exact path="/MyCourse/:id" name='MyCourse' component={MyCourse}/>
                    <Route exact path="/MyTest/:id" name='MyTest' component={MyTest}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
