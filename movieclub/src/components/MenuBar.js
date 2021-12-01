import React, {useState} from 'react';
import { AppBar,Toolbar, CssBaseline, makeStyles,} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navlinks: {
    marginLeft: "10px",
    display: "flex",
},
    logo: {
        height: "100px",
        cursor: "pointer",
        marginRight: 'auto',     
},
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: "30px",
        textAlign: 'right',
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


  dropdownContent: {
      position: 'absolute',
      backgroundColor: 'black',
      minWidth: '200px',
},   
     dropDown:{
        position:'relative',
        display:'inline-block',
},

    dropLink:{
        color: 'white',
        textDecoration: 'None',
        fontSize: '20px',
        display: 'block',
        textAlign: 'left',
        margin: '4px',
        borderTop: 'grey 1px solid',
        
         "&:hover": {
             color: 'white',
             backgroundColor: '#BF4E30',
             textDecoration: 'underline',
},},
    
}));

function MenuBar() {
    const classes = useStyles();
    const [onHover, setOnHover] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('userid')
        localStorage.removeItem('authorization')
        window.location.href='/'
};
    const userId=localStorage.getItem('userid');
    console.log (userId)
    return (
        <AppBar position="static" >
            <CssBaseline />
            <Toolbar className={classes.bar} >
                <img  className={classes.logo} src= "/images/logo.png" alt="movie club logo" onClick={() => {window.location=('/')}}/>
                <div className={classes.navlinks}>
                    <Link to="/" className={classes.link}> Home </Link>
                    <Link to="/Trending" className={classes.link}> Trending </Link>   

                    <div className={classes.dropDown}>
                        <Link className={classes.link} onMouseEnter={() => setOnHover(true)}> Genres </Link> 
                        {onHover && (
                       <React.Fragment> <div className={classes.dropdownContent} onMouseLeave={() => setOnHover(false)}>
                        <Link to="/Genres/Action" className={classes.dropLink}>Action</Link>
                        <Link to="/Genres/Superheros" className={classes.dropLink}>Superheroes</Link>
                        <Link to="/Genres/Children's Movies" className={classes.dropLink}>Children's Movies</Link>
                        <Link to="/Genres/Sci-Fi" className={classes.dropLink}>Sci-Fi</Link>
                        <Link to="/Genres/ThrillersOrHorror" className={classes.dropLink}>Thrillers/Horrors</Link>
                        <Link to="/Genres/Other" className={classes.dropLink}>Others</Link>
                        <Link to="/Genres/Comedy" className={classes.dropLink}>Comedies</Link>
                    </div> </React.Fragment>
                        )}
                    </div>
                     {(() => {
                    if(userId==null){
                            return(
                                <React.Fragment>
                                <Link to="/Login" className={classes.link}>  Login </Link>
                                <Link to="/SignUp" className={classes.link}> Sign Up </Link>
                                </React.Fragment>
                   )} else {
                            return(
                                 <React.Fragment>
                                <Link to="/AddAMovie" className={classes.link}>  Add A Movie </Link>
                                <Link to="/MyReviews" className={classes.link}> My Reviews</Link> 
                                <Link onClick={handleLogout} className={classes.link}> Logout </Link>
                                </React.Fragment>
                        )}})()}
               </div>
        </Toolbar>
       </AppBar >
      );}

export default MenuBar;