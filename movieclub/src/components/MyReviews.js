import React, {useEffect, useState} from 'react'; //imports required
import '../App.css';
import {makeStyles} from '@material-ui/core/styles'
import {Rating} from 'semantic-ui-react'
import Button from '@material-ui/core/Button';

const useStyles =  makeStyles( (theme) => ({ //adds styling to elements
    movieDetails:{
        font: "10px", 
        width: "250px",
        height: 'auto',
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
},}, 
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
    userTag:{
        textAlign: 'center',
        fontSize: '25px',
        color: '#BF4E30',
},
   
    yourReviews:{
        textAlign: 'center',
        fontSize: '30px',
        color: '#BF4E30',
},
profilePic:{
    width: '200px',
    height: '200px',

},    
    
    profileContainer:{
        marginTop: '20px',
},
    
    stars:{
        textAlign: 'center',
    },
    
    reviewsLen:{
        fontSize: '20px',
        color: '#BF4E30',
        
    },
})); 

function MyReviews() { //function used to display user reviews
	const [reviews, setReviews] = useState([]); //use states to fetch required info
    const [users, setUsers] = useState([]);
    const userID=localStorage.getItem('userid'); //gets userId so we know which user reviews to fetch and display.
	useEffect(()=> { //myReviews API sends data based on that user.
			fetch('https://prefer-mercury-5000.codio-box.uk/MyReviews', { 
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                            'Content-type': 'application/json',},
                    body: JSON.stringify(userID),
            }).then(response =>response.json().then(data => {setReviews(data.MyReviews); setUsers(data.Users[0]);
			})
		);
	},[userID]); //knows which userID to use
    console.log(users)
    const classes = useStyles();
    const lenMyReviews = reviews.length //counts how many reviews there are (displays to user the number of reviews they have made)
         /*Create the features of the page including adding a profile image which is set to a default image.
          * Then shows the user all their reviews in the style of the movie Cards which is used in other pages.
          * Only shows the title, image, their description of the review and the rating they have them. 
          * A button to take user to the review is available too so they can delete the view when on the details page. 
          *  */     
	return (
        <div className= {classes.profileContainer}>             
            <center> 
                <img className={classes.profilePic} src='/images/profile.png'/> 
                <p className={classes.userTag}>@{users.username}</p> 
                <p className={classes.reviewsLen}> You have {lenMyReviews} movie reviews </p>
                <p className={classes.yourReviews}>Your Reviews</p> 
            </center>
            <div className = {classes.container}> 
                {reviews.map (review => {
                return (
                   <div className={classes.movieDetails}>
                      <p className={classes.title}> {review.movieTitle} </p>
                      <img className ={classes.moviePoster} src= {"/images/"+ review.moviePoster}/>
                      <div className={classes.stars}>
                       <Rating rating={review.stars} maxRating={5} precision={0.5} disabled icon="ui large rating" />
                        <Button className={classes.viewDetails} onClick={() => {window.location=('/Details/'+ review.movieId)}} > View Details </Button> 
                      </div>
                       <p className={classes.summary}> {review.description} </p> 
                   </div> 
)})} 

             </div>
          </div>	
);}

export default MyReviews;


//Homepage / template for everything calls Movies first


