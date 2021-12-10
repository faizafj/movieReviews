import React, {useState} from 'react'; //required imports such as makeStyles which is used for styling
import '../App.css';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
const useStyles =  makeStyles( (theme) => ({ //styling the page
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
        color: 'white',
        margin: '10px',
        background: 'black',
        borderRadius: '2px',
        border: 'white 1px solid',
        height: '50px',
        width: '250px',
        '&::placeholder': {
            color: 'white',
            fontSize: "16px",
        }, '&:focus': {
            color: 'white',
            fontSize: "16px",
            marignLeft:"10px",
},},
    loginButton: {
        color: 'white',
        background: '#BF4E30',
        font: "10px", 
        marginLeft: "10px",
        "&:hover": {
            color: '#BF4E30',
            background:'white',
},},   
    backButton: {
        color: 'white',
        background: '#BF4E30',
        font: "10px", 
        marginLeft: "120px",
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
    heading:{
        fontSize: '30px',
        color: 'white',
    },
    
    dropLink:{
        color: '#BF4E30',
        textAlign: 'right',
        width: '500px',
        margin: '15px',
       fontSize: '14px',
        "&:hover": {
            color: '#BF4E30',
            textDecoration: 'underline',
},},
}))

function Login() {
    const [username, setUsername] = useState([]); //use states for inputs
    const [password, setPassword] = useState([]);
    const classes = useStyles();
    async function onSubmit(){ //when the button is clicked it calls this function
        if(username ==='' || password===''){ //checks if there's something being entered if not then an alert shows up
            alert ('Please enter username and password')
            return
            }
            const token = `Basic `+btoa(`${username}:${password}`) //calls the login API to authenticate user
            console.log(token)
            fetch('https://prefer-mercury-5000.codio-box.uk/Login', {
                method: 'GET',
                credentials: 'include',
                headers: {
                'Content-type': 'application/json',
                'Authorization': token },
            }).then(response =>response.json().then(data => {
             if(data.userId==null){ //checks if the password entered matches the userId, if not then the API returns userId = null so it knows the password is wrong
                   alert ('Incorrect Password')   
        }else{
            localStorage.setItem('userid',data.userId) //once successful adds userId to local storange along with the auth token
            localStorage.setItem('authorization',token) 
            window.location.href='/' //redirects user to the homepage
        }})); };
    
    /* used to create the whole page 
     * Uses input fields so users can eneter their username and password. When a value is enetred this is set to be the set useState
     * There is a hyperlink to the sign up page for users who enetered the wrong page and actually need to sign up
     * Submit button calls the API which checks everything is correct
     * */
	   return (
            <React.Fragment>
                <center> 
                   <div className= {classes.container}>
                       <img  className={classes.logo} src= "./images/logo.png" alt="movie club logo" onClick={() => {window.location=('/')}}/>
                       <p className={classes.heading}> Login: </p>
                       <div className={classes.usrcontainer}>
                            <input className={classes.usernameForm} label="Username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className={classes.pwdContainer}>
                            <input className={classes.passwordForm} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className={classes.linkSU}> 
                        <Link to="/signUp" className={classes.dropLink}>Don't have an account? Sign-Up instead</Link>
                        </div>
                        <div className={classes.btnContainer}>
                            <Button className={classes.backButton} onClick={() => {window.location=('/')}}>BACK</Button>
                            <Button className={classes.loginButton} onClick={onSubmit}>LOGIN</Button>
                        </div>
                    </div>
            </center>
            </React.Fragment>
	);     
}

export default Login;

