import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/Home'
import AddAMovie from './components/AddAMovie'
import MenuBar from "./components/MenuBar";
import Details from "./components/Details";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() { 
    return (
        <BrowserRouter>
            <MenuBar />
            <Switch>
                <Route exact path='/' component={ Home } />
                <Route exact path="/AddAMovie" component={AddAMovie}/>
                   <Route exact path="/Details/:id" component={Details}/> 
                    <Route exact path="/Login" component={Login}/>
                        <Route exact path="/SignUp" component={SignUp}/>
            </Switch>
        </BrowserRouter>

    );

}
export default App;


//routes everything
