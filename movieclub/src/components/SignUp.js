import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Rating } from 'semantic-ui-react'


function SignUp () {
   return (
        <Typography> <Rating rating="5" maxRating={5} disabled /> </Typography>
    )
}


export default SignUp; 