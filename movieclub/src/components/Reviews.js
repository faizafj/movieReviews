import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Rating} from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import { useParams } from "react-router-dom";

const useStyles =  makeStyles( (theme) => ({
    reviewDetails:{
        font: "10px", 
        width: "300px",
        height: "400px",
        borderRadius: "25px",
        margin:'20px',
        padding: '10px',
        background: 'white',
        flexWrap: 'wrap',
        display:'grid',
       boxShadow: 'inset 0 0 10px black',
},
    container: {
        width: 'auto',
        height: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '30px',
        
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
    description: {
        fontSize: '15px',
        color: 'black',
        textAlign: "justify",
        height: "120px",
},


    profilePic:{
        width: '100px',
        height: '100px',


},
     reviewTitle: {
            fontSize: '20px',
            textAlign: 'center',
            color: '#BF4E30',
},
 
    userTag:{
        fontSize: '20px',
        textAlign:'center',
    
},
    
    sectionOne:{
        gridColumnStart: '1',
        gridColumnEnd: '1',
        marginLeft: '30px',
        marginRight: '30px',
    },
        sectionTwo:{
        gridColumnStart: '2',
        gridColumnEnd: '10',
        border: '1px solid grey',
        padding: '30px',
        borderRadius: '20px',
        height: 'auto',
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
        sectionOneUser:{
            gridColumnStart: '1',
            color: '#BF4E30',
            gridColumnEnd: '10',
            fontSize: '20px',
    },
         sectionThreeUser:{
            gridColumnStart: '2',
            gridColumnEnd: '10',
            border: '1px solid grey',
            padding: '10px',
            borderRadius: '20px',
    },
       
        sectionTwoUser:{
            gridColumnStart: '1',
            gridColumnEnd: '1',
            marginLeft: '30px',
            marginRight: '30px',
            borderRight: '5px solid black',
            height: 'auto',
    },
    
        reviewDetailsUser:{
            font: "10px", 
            width: "75%",
            height: "200px",
            borderRadius: "25px",
            marginLeft: '12%',
            padding: '10px',
            background: 'white',
            flexWrap: 'wrap',
            display:'grid',
            boxShadow: 'inset 0 0 10px #BF4E30 ',
        },    
        descriptionUser: {
              fontSize: '15px',
              color: 'black',
              textAlign: "justify",
              height: "auto",
},
    
    info:{
    fontSize: '14px',
    textAlign: 'right',
},
    NoReviews:{
        fontSize: '20px',
        color: 'white',
        textAlign: 'center',
        marginLeft: '45%',
        border: '1px solid white',
        padding:'5px',
        borderRadius: '5px',
    },
        reviewsLen:{
        fontSize: '15px',
        color: '#BF4E30',
        
        
    },
           reviewsUser:{
        fontSize: '30px',
        color: '#BF4E30',
        margin:'0px',
       
    },
}));                                  
                                       
export const Reviews = ({reviews}) => {
  const classes = useStyles();
   const{id} = useParams();
   const userId=localStorage.getItem('userid');
   const token = localStorage.getItem('authorization');
   const lenMyReviews = reviews.length
    async function DeleteReview() {
        const reviewDetails = {userId, id }
        console.log (reviewDetails)
        const response = await fetch('https://prefer-mercury-5000.codio-box.uk/DeleteReview', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify(reviewDetails)
            })
        if(response.ok){
          window.location.reload()
        }
}
    return ( 
       
     <center>  
                           <p className={classes.reviewsUser}>All User Reviews </p>
                           <p className={classes.reviewsLen}> There are {lenMyReviews} Movie Reviews </p>
        <div className = {classes.container}>                                              
         {(() => { 
            if (reviews.length == 0){
                return(
                         <React.Fragment>
                                  <p className = {classes.NoReviews}> No Reviews Yet </p> 
                              </React.Fragment>
                          )
            }
        })()}
            {reviews.map (review => {
                if(userId === review.userID){
                            return(
                                <React.Fragment>
                               <div className={classes.reviewDetailsUser}>
                                <div className= {classes.sectionOneUser}>
                                    <p> Your Review </p>
                                </div>
                               <center>  <div className={classes.sectionTwoUser}>
                                    <img className={classes.profilePic} src='/images/profile.png'/> 
                                    <p className={classes.userTag}>  @{review.Username}</p>
                                </div> </center>
                                <div className={classes.sectionThreeUser}> 
                                     <Rating rating={review.Stars} className={classes.rating} maxRating={5} precision={0.5} disabled icon="ui massive rating" />
                                     <p className={classes.descriptionUser}> {review.Description} </p>    
                                    <Button className={classes.Buttons} onClick={DeleteReview}>Delete Review</Button>
                                   </div> 
                </div>
                                </React.Fragment>
                               )}
})}

            {reviews.map (review => {
                if(userId !== review.userID){
                            return(
                                        <React.Fragment>
                                
                                            <div className={classes.reviewDetails}>
                                                <div className={classes.sectionOne}>
                                                    <img className={classes.profilePic} src='/images/profile.png'/>
                                                    <p className={classes.userTag}> @{review.Username}</p>
                                                    <center> <Rating rating={review.Stars} className={classes.rating} maxRating={5} precision={0.5} disabled icon="ui massive rating" /> </center>                                                     <p className={classes.description}> {review.Description} </p>         
                                                </div>
                                               </div> 
                                
                                          </React.Fragment>
)}})}

</div>  </center>

)}

export default Reviews 


