import React from 'react'; //required imports
import {makeStyles} from '@material-ui/core/styles'
import {Rating} from 'semantic-ui-react'
import Button from '@material-ui/core/Button';

const useStyles =  makeStyles( (theme) => ({ //styling
    movieDetails:{
        font: "10px", 
        width: "250px",
        height: "500px",
        border: "1px solid black",
        borderRadius: '5px',
        marginLeft:'25px',
        marginRight: '10px',
        marginTop: '20px',
        marginBottom: '40px',
        rowGap: '1.5em',
        background: 'white',
},
    container: {
        width: 'auto',
        height: '300px',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        rowGap: '5px',
},
    viewDetails: {
        color: '#BF4E30',
        background: 'None',
        font: "10px", 
        marginLeft: "25px",
         "&:hover": {
            color: 'black',
            background:'white',
        },
}, 
    title:{
        fontSize: '15px;',
        height: '30px',
        color: 'black',
        paddingTop: '5px',
        textAlign: 'center',
 },
    summary: {
        fontSize: '12px',
        color: 'black',
        marginLeft: "5px",
        marginRight: "5px",
        textAlign: "justify",
        height: "120px",
},

    moviePoster:{
        height:"280px",
        width: "200px",
        marginLeft: "25px",
        marginRight: "25px",
        borderRadius: '5px', 
        cursor: "pointer",
},

    
    titleHeading:{
        color: 'green',
        fontSize: '20px',
    },
    
}));    
 /* This function uses the movie records from the Movies api to display the data.           
It creates container for the whole div, this adds styling too such as paddings and margins etc.
 for each movie record the layout is set as the following. */

export const Movies = ({movies}) => { 
  const classes = useStyles(); 
    return ( 
        <div className = {classes.container}> 
            {movies.map (movie => { 
             console.log(movie)
            return (
               <div className={classes.movieDetails}> 
                  <p className={classes.title}> {movie.movieTitle} </p> 
                  <img className ={classes.moviePoster} src= {"/images/"+ movie.moviePoster} onClick={() => {window.location=('/Details/'+ movie.movieId)}}/> 
                  <p className={classes.summary}> {movie.movieSummary} </p>
                  <div className={classes.reviews}>  
                      <Button className={classes.viewDetails} onClick={() => {window.location=('/Details/'+ movie.movieId)}} > View Details </Button> 
                      <Rating rating={movie.rating} maxRating={5} precision={0.5} disabled icon="ui large rating" />
                  </div>
               </div> 
)})} 
    </div>    
)}

export default Movies 


