import React, {useEffect, useState} from 'react';
import '../App.css';
import { Movies } from "./Movies";
import {makeStyles} from '@material-ui/core/styles'

const useStyles =  makeStyles( (theme) => ({

theTitle:{
        textAlign: 'center',
        fontSize: '30px',
        color: '#BF4E30',
},
  
}))

function App() {
	const [movies, setMovies] = useState([]);
    const classes = useStyles();
	useEffect(()=> {
			fetch('https://prefer-mercury-5000.codio-box.uk/movies', 
                  { credentials: 'include' }).then(response =>response.json().then(data => {setMovies(data.movies);
			})
		);
	},[]);
	return (
        <div className= {classes.profileContainer}>              
                <p className={classes.theTitle}>Trending</p> 
		<div className="Movies">
           <center> <div>
            </div> </center>
            <Movies movies={movies.slice().sort((a, b) => (b.rating > a.rating) ? 1 : -1).slice(0, 10)}/> 
        </div>
                </div>
	);     
}

export default App;
