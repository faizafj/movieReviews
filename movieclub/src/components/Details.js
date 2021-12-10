import React, {useEffect, useState} from 'react'; //selects imports required
import '../App.css'; //takes in the Apps.css as it requires the background to be black which was changed there.
import { useParams } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles'
import {Rating} from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import { Reviews } from "./Reviews";
import Tooltip from '@material-ui/core/Tooltip'; //tooltip used for extra guidance. 

const useStyles =  makeStyles( (theme) => ({ //styling for elements
    movieDetails:{
        font: "10px", 
        width: "80%",
        height: 'auto',
        borderRadius: '25px',
        background: 'white',
        marginTop: '20px',
        boxShadow: 'inset 0 0 10px black',
        display:'grid',
        gridGap: '0px',
        marginBottom: '50px',
        paddingBottom: '50px',
},
    container: {
        width: 'auto',
        height: '300px',
},
    title:{
        fontSize: '30px;',
        height: '40px',
        color: '#BF4E30',
        textAlign: 'left',
 },
    summary: {
        fontSize: '16px',
        color: 'black',
        textAlign: "justify",
        width: '80%',
        marginRight: '25%',
        lineHeight: '1.2',
},
    
    cast: {
        fontSize: '16px',
        color: 'black',
        textAlign: "justify",
        width: '80%',
        marginRight: '25%',
        lineHeight: '1.2',
        marginTop: '40px',
},
     release: {
        fontSize: '16px',
        color: '#BF4E30',
        textAlign: "justify",
        width: '80%',
        marginRight: '25%',
        lineHeight: '1.2',   
},

    moviePoster:{
        height:"480px",
        width: "325px",
        borderRadius: '5px', 
        marginLeft: '30px',
        marginBottom: '50px',
    },
    sectionOne:{
        marginTop: '50px',
        gridColumnStart: '1',
        gridColumnEnd: '3',
        marginLeft: '30px',
    },
    sectionTwo:{
        marginTop: '50px',
        gridColumnStart: '3',
        gridColumnEnd: '4',
        marginLeft: '30px',
    },  
    
    sectionThree:{
        marginTop: '50px',
        gridColumnStart: '1',
        gridColumnEnd: '5',        
        margin: '50px',
        paddingLeft:'20px',
        border: 'Solid grey 1px',
        borderRadius: '25px',
        boxShadow: 'inset 0 0 10px black',
            
    },  
        Buttons: {
        color: 'white',
        background: '#BF4E30',
        font: "10px", 
        margin: "10px",
        "&:hover": {
            color: 'white',
            background: 'black',
},},
    movieDesc:{
                gridColumnStart: '1',
                gridColumnEnd: '5',

    },
    
    movieDescr:{
                fontSize: '15px',
                textAlign: 'center',
                margin: '50px',
                marginTop: '5px',
                

    },
 
    
    reviewDescription:{
        font: '16px',
        margin: '5px',
        background: 'white',
        borderRadius: '7px',
        border: 'black 1px solid',
        height: '100px',
        width: '80%',
        '&::placeholder': {
            color: 'black',
            fontSize: "16px",
        },
    },
    

    reviewTitle:{
        textAlign: 'center',
        fontSize: '25px',
        color: '#BF4E30',
},   
  reviewHelp:{
            textAlign: 'Left',
            fontSize: '20px',
            color: '#BF4E30',
},
    
    Tooltip:{
            fontSize: '20px',
    },
    
}));                   


function Details() { 
    const{id} = useParams(); //useParams finds the movieId to know which movie details to show.
    const classes = useStyles();  //adds styling by referring to classes.
    const [movies, setMovies] = useState([]); //sets the use states for each element
    const [reviews, setReviews] = useState([]);
    const [description, setDescription] = useState('');    
    const [stars, setStars] = useState('1'); //use state sets to be integer
    const userId=localStorage.getItem('userid') //gets userId from local storage

    
    function submitReview (event) { //adds a review when button clicked
        const reviewInfo = [id, userId, description, stars]; //all the information required (users enter description and stars themseleves)
              fetch('https://prefer-mercury-5000.codio-box.uk/addReview', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-type': 'application/json',
                        },
                            body: JSON.stringify(reviewInfo),
                    }).then(response =>response.json().then(data => {
                      window.location.reload() //refreshes the page when it is done
                  }))
    event.preventDefault();
    }    

	useEffect(()=> { //fetches the details for the movie
			fetch('https://prefer-mercury-5000.codio-box.uk/Details', { 
                method: "POST", 
                credentials: 'include', 
                headers: {'Content-type': 'application/json' }, 
                body: JSON.stringify(id) })
                .then(response =>response.json().then(data => {setMovies(data.detailsList); setReviews(data.reviewsList);
			})
		);
	},[id]); //uses the movieId
    return ( 
      <center>  <div className = {classes.container}> 
            {movies.map (movie => {
            return (
               <div className={classes.movieDetails}>
               <div className={classes.sectionOne}>
                  <img className={classes.moviePoster} src= {"/images/"+ movie.moviePoster}/> 
               </div>
                <div className={classes.sectionTwo}>
                  <p className={classes.title}> {movie.movieTitle} <Rating rating={movie.stars} maxRating={5} precision={0.5} disabled icon="ui massive rating" /> </p>
                  <p className={classes.cast}> Starring: {movie.movieCast} </p>
                  <p className={classes.release}> Released: {movie.movieReleaseDate}&nbsp; &nbsp; &nbsp; &nbsp; Genre: {movie.genre}  </p>
                  <p className={classes.summary}> {movie.movieSummary} </p>
                </div>
              <div className= {classes.movieDesc}> 
                         <p className={classes.reviewTitle}>Description</p>
                         <p className={classes.movieDescr}> {movie.movieDescription} </p> 
                      </div>

                     {(() => {
                    if(userId!=null){ /* If a userId exists then they are shown a form to add their own review */
                            return(
                                <React.Fragment>
                                <div className={classes.sectionThree}>
                                     <p className={classes.reviewTitle}>Add Your Own Review</p> 
                                      <div className= {classes.reviews}>
                                      <div className= {classes.starRating}>
                                         <p className={classes.reviewHelp}>Stars</p> 
                                           <Tooltip title="Click on the star of the rating you wish to add" arrow>
                                            <Rating rating={stars} maxRating={5} precision={0.5} icon="ui massive rating" onRate={(_,data) => {setStars(data.rating)}}/> 
                                            </Tooltip>
                                       </div>                      
                                            <div className= {classes.description}>
                                                 <p className={classes.reviewHelp}>Description</p> 
                                                  <textarea className={classes.reviewDescription} type="text" placeholder="Add your comments..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                                        </div>
                                         </div> 
                                         <div className= {classes.Button}>
                                            <Button className={classes.Buttons} onClick={() => {window.location=('./')}}>BACK</Button>
                                            <Button className={classes.Buttons} onClick={submitReview}>Add Review</Button>
                                        </div>
                                     </div> 
                                        </React.Fragment>
)}})()}
                                
</div> 

)})}
        <center> 
            <div>
                 <Reviews reviews = {reviews}/> 
            </div> 
        </center>
    </div> 
</center>
)}
export default Details;