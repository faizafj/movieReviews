import React, {useEffect, useState} from 'react';
import '../App.css';
import {makeStyles} from '@material-ui/core/styles'

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
}))



function Login() {
	const [movies, setMovies] = useState([]);
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const classes = useStyles();
    async function handleClick(){
if(username ==='' || password===''){
return
}
const token = `Basic `+btoa(`${username}:${password}`)
console.log(token)
fetch('https://prefer-mercury-5000.codio-box.uk/Login', {
method: 'GET',
credentials: 'include',
headers: {
'Content-type': 'application/json',
'Authorization': token
},
}).then(response =>response.json().then(data => {
if(data.userId==null){
}else{
localStorage.setItem('userid',data.userId)
localStorage.setItem('authorization',token)
window.location.href='/'
}
}));
};
	return (
        <React.Fragment>
    <input className={classes.input} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
    <input className={classes.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button className={classes.btn} onClick={handleClick}>LOGIN</button>

        </React.Fragment>
	);     
}

export default Login;


//Homepage / template for everything