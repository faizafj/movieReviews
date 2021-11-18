import React, {useEffect, useState} from 'react';
import '../App.css';
import { Movies } from "./Movies";
import { useParams } from "react-router-dom";

function App() {
	const [movies, setMovies] = useState([]);
    
const{id} = useParams();
    console.log (id)

	useEffect(()=> {
			fetch('https://prefer-mercury-5000.codio-box.uk/Details', { method: "POST", credentials: 'include', headers: {'Content-type': 'application/json' }, body: JSON.stringify(id) }).then(response =>response.json().then(data => {setMovies(data.Details);
			})
		);
	},[]);

	return (
		<Movies movies={movies}/>
        
	);     
}

export default App;


//Homepage / template for everything