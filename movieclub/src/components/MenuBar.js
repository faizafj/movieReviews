import React from "react";
import { AppBar,Toolbar, CssBaseline, Typography, makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: "10px",
    display: "flex",
  },
 logo: {
    height: "100px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: "30px",
    "&:hover": {
     color: '#BF4E30',
    },
  },
  bar:{
    background: 'black',
  },

  alt: {
    fontSize: '3px',
  },
}));

function MenuBar() {
  const classes = useStyles();
const handleLogout = () => {
  localStorage.removeItem('userid')
  localStorage.removeItem('authorization')
  window.location.href='/'
  alert ("Logged out")
};
 const userId=localStorage.getItem('userid');
  console.log (userId)
  return (
    <AppBar position="static" >
      <CssBaseline />
      <Toolbar className={classes.bar} >
        <Typography>
          <img  className={classes.logo} src= "./images/logo.png" alt="movie club logo"/>
      <Link to="/" className={classes.link}> Movie Club </Link>
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}> Home </Link>
            <Link to="/AddAMovie" className={classes.link}>  Add A Movie </Link>
            <Link to="/Trending" className={classes.link}> Trending </Link>
            
            {(() => {
               console.log ("Hoellllooo")
            if(userId==null){
              console.log ("Hoellllooo")
               return(
                  <React.Fragment>
                  <Link to="/Login" className={classes.link}>  Login </Link>
                  <Link to="/SignUp" className={classes.link}> Sign Up </Link>
                  </React.Fragment>
            ) } else{
               console.log ("Hoellllooo")
               return(
                  <React.Fragment>
                  <Link onClick={handleLogout} className={classes.link}> Logout </Link>
                  </React.Fragment>
)
}
})()}


          </div>
      </Toolbar>
    </AppBar >
  );
}
export default MenuBar;