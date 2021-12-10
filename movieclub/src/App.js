import React from 'react'; //all the required imports to use in the react app. 
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './components/Home' //imports all the component functions from each javascript page
import AddAMovie from './components/AddAMovie'
import MenuBar from "./components/MenuBar";
import Details from "./components/Details";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Trending from "./components/Trending";
import Genres from "./components/Genres";
import MyReviews from "./components/MyReviews";
import Reviews from "./components/Reviews";
function App() {  //used to route the pages and adds the hyperlink to the menu bar so it knows where to direct users
    return (
        <BrowserRouter>
            <MenuBar />
            <Switch>
                <Route exact path='/' component={ Home } />
                <Route exact path="/AddAMovie" component={AddAMovie}/>
                <Route exact path="/Details/:id" component={Details}/> 
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/SignUp" component={SignUp}/>
                <Route exact path="/Trending" component={Trending}/>
                <Route exact path="/Genres/:genre" component={Genres}/>
                <Route exact path="/Reviews/:movieId" component={Reviews}/>    
                <Route exact path="/MyReviews" component={MyReviews}/>
            </Switch>
        </BrowserRouter>

    );

}
export default App;


//routes everything
