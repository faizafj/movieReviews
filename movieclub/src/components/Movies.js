import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Rating } from 'semantic-ui-react'

const useStyles =  makeStyles( (theme) => ({
  movieDetails:{
   font: "10px", 
    width: "250px",
    height: "auto",
    marginLeft:'5%',
      marginRight: '5%',
    marginTop: '20px',
    marginBottom: '40px',
    rowGap: '1.5em',
 },
  
  viewDetails: {
    color: '#BF4E30',
  }, 
  
  title:{
    fontSize: '15px;',
    color: 'black',
  },
 
  summary: {
  fontSize: '12px',
  color: 'black',
},
  
    containerForGrid:{
    display:"flex",
},
    moviePoster:{
    height:"300px",
        width: "200px", 
    },
    
}));                                  
                                       
export const Movies = ({movies}) => {
  const classes = useStyles();
    console.log(movies)
    return ( 
        <div className = {classes.containerForGrid}>
{  movies.map (movie => {
            return (
              <Card className={classes.movieDetails}>
	        <CardContent>
           <Typography className={classes.title}>
          {movie.movieTitle}
        </Typography>
      
        <img className ={classes.moviePoster} src= {"/images/"+ movie.moviePoster} />
        <Typography className={classes.summary}>  {movie.movieSummary}  </Typography>
      </CardContent>
 <CardActions>
        <Button size="small" color="orange" className={classes.viewDetails} onClick={() => {window.location=('/Details/'+ movie.movieId)}} >
         View Details
        </Button>
<Typography> <Rating rating={movie.rating} maxRating={5} disabled />
             </Typography>
      </CardActions>
     </Card>

)} )} </div>
) }

export default Movies 


