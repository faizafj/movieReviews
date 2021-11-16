import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Card, Image } from 'semantic-ui-react'

const useStyles = makeStyles((theme) => ({
    movieCard:
    {
        width: '90%',
        display: 'flex',
        position: 'relative',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '40px',
        rowGap: '10px',
        columnGap: '20px',
        
    }

}));

export const Movies = ({ movies }) => {
     const classes = useStyles();
	return (
        <div className={classes.movieCard}>
        { movies.map(movie => {
            return (    
                <div className = {classes.details}>
                 <h1>{movie.movieTitle}</h1>  
                 <p>{movie.movieSummary}</p>
</div>

)})} 
    </div>
)}

export default Movies 

	const PopupExampleTrigger = () => (
	      <Card>
	        <Image src='https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg' />
	        <Card.Content>
	          <Card.Header>My Neighbor Totoro</Card.Header>
	          <Card.Description>
	            Two sisters move to the country with their father in order to be
	            closer to their hospitalized mother, and discover the surrounding
	            trees are inhabited by magical spirits.
	          </Card.Description>
	        </Card.Content>
	      </Card>
	)
export {PopupExampleTrigger}