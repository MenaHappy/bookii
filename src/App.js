import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';


import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

import Dashboard from './components/dashboard/Dashboard';
import EventDetails from './components/events/EventDetails';
import CreateEvent from './components/events/CreateEvent';
import UpdateEvent from './components/events/UpdateEvent';
import BookEvent from './components/events/BookEvent';


import CreateUser from './components/users/CreateUser';
import Users from './components/users/Users';
import UserDetails from './components/users/UserDetails';
// import UpdateUser from './components/users/UpdateUser';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            
            <Route exact path='/create' component={CreateEvent} />
            <Route exact path='/event/:id' component={EventDetails} />
            <Route exact path='/update/:id' component={UpdateEvent} />
            <Route exact path='/event/book/:id' component={BookEvent} />

            <Route exact path='/user' component={Users} />
            <Route exact path='/user/create' component={CreateUser} />
            <Route exact path='/user/:id' component={UserDetails} />
            {/* <Route path='/user/update/:id' component={UpdateUser} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
