import React, {useState} from 'react';
import '../App.css';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
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
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const classes = useStyles();
    async function handleClick(){
        if(username ==='' || password===''){
            alert ('Please enter username and password')
            return
            }
            const token = `Basic `+btoa(`${username}:${password}`)
            console.log(token)
            fetch('https://prefer-mercury-5000.codio-box.uk/Login', {
                method: 'GET',
                credentials: 'include',
                headers: {
                'Content-type': 'application/json',
                'Authorization': token },
            }).then(response =>response.json().then(data => {
             if(data.userId==null){
                   alert ('Incorrect Password')   
        }else{
            localStorage.setItem('userid',data.userId)
            localStorage.setItem('authorization',token)
            window.location.href='/'
        }})); };
    
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
                            <Button className={classes.loginButton} onClick={handleClick}>LOGIN</Button>
                        </div>
                    </div>
            </center>
            </React.Fragment>
	);     
}

export default Login;


//Homepage / template for everything