import React, { useState } from "react";
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
const useStyles =  makeStyles( (theme) => ({
    usernameForm: {
        font: '16px',
        fontColor: 'pink',
        margin: '10px',
        background: 'black',
        borderRadius: '2px',
        border: 'white 1px solid',
        height: '50px',
        width: '250px',
        color: 'white',
        marginBottom: '20px',
        '&::placeholder': {
            color: 'white',
            fontSize: "16px",
            marignLeft:"10px",
        }, '&:focus': {
            color: 'white',
            fontSize: "16px",
            marignLeft:"10px",
},},
    passwordForm: {
        font: '16px',
        margin: '10px',
        background: 'black',
        borderRadius: '2px',
        border: 'white 1px solid',
        height: '50px',
        width: '250px',
        color: 'white',
        marginBottom: '20px',
        '&::placeholder': {
            color: 'white',
            fontSize: "16px",
        }, '&:focus': {
            color: 'white',
            fontSize: "16px",
            marignLeft:"10px",
},},
    signUpButton: {
        color: 'white',
        background: '#BF4E30',
        font: "10px", 
        marginLeft: "5px",
        "&:hover": {
            color: '#BF4E30',
            background:'white',
},},
    
    backButton: {
        color: 'white',
        background: '#BF4E30',
        font: "10px", 
        "&:hover": {
            color: '#BF4E30',
            background:'white',
},},
    container:{
    background: 'black',
    height: '500px',
    width: 'auto',
    marginTop: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    borderRadius: '5px',

},
    logo: {
        height: "200px",
        cursor: "pointer",
},
    
     linkSU:{
        color: '#BF4E30 !important',
        textAlign: 'right',
        width: '250px',
        margin: '10px',
        fontSize: '14px',
        textDecoration: 'None !important',
},
    heading:{
        fontSize: '30px',
        color: 'white',
    },
    
    helpTitle:{ 
        fontSize: '20px',
         color: 'white',
},
}));

export default function SignUp () { 
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setreenterPassword] = useState("");
	const classes = useStyles();  
    function onAccountSubmit(event) {
        
        if (username === '' || password === ''){
             alert("Please enter username and password details")
        }else if(password !== reenterPassword){
                      alert("The passswords do not match, please re-enter.")
      }
        const account = [username, password];
                        fetch('https://prefer-mercury-5000.codio-box.uk/SignUp', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(account),})
                            .then(response =>response.json().then(data => {
                            if (data.userID==null){
                                alert("Sorry this username already exists! Please try a different username.")
                            }else{      
                              localStorage.setItem('userId',data.userID)
                              const token = `Basic ` +btoa(`${username}:${password}`)
                              localStorage.setItem('authorization', token)
                              localStorage.setItem('username', username)
                              console.log (username)
                              alert("Your account has been created!")
                              window.location.href='/'
                         }}))
    event.preventDefault();
  }
     return (
     
           <center>  
                 <div className={classes.container}>
                     <img className={classes.logo} src= "./images/logo.png" alt="movie club logo" onClick={() => {window.location=('/')}}/>
                     <p className={classes.heading}> Sign Up: </p>
                    <div className={classes.helpTitle}>
                        <p> Enter a username: </p>
                    </div>
                    <div className={classes.form}>
                         <input value={username} className={classes.usernameForm} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className={classes.form}>
                        <div className={classes.helpTitle}>
                        <p> Enter a password: </p>
                    </div>
                         <input value={password} className={classes.passwordForm} placeholder="Enter Password" type="password"  onChange={(e) => setPassword(e.target.value)}/>
                    <div className={classes.helpTitle}>
                        <p> Re-enter password: </p>
                    </div>
                         <input value={reenterPassword} className={classes.passwordForm} placeholder="Re-Enter Password" type="password"  onChange={(e) => setreenterPassword(e.target.value)}/>
                     </div>
                     <div className={classes.btnContainer}>
                          <Button className={classes.backButton} onClick={() => {window.location=('/')}}>BACK</Button>
                          <Button className ={classes.signUpButton} onClick={onAccountSubmit}>SIGN UP</Button>
                     </div>
                </div>  
        </center>
)}