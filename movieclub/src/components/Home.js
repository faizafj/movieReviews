import React, {useEffect, useState} from 'react';
import '../App.css';
import { Movies } from "./Movies";

function App() {
	const [movies, setMovies] = useState([]);

	useEffect(()=> {
			fetch('https://prefer-mercury-5000.codio-box.uk/movies', { credentials: 'include' }).then(response =>response.json().then(data => {setMovies(data.movies);
			})
		);
	},[]);

	return (
        
		<div className="Movies">
		<Movies movies={movies}/> </div>
	);     
}

export default App;


//Homepage / template for everything