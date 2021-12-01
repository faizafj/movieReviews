import React, {useEffect, useState} from 'react';
import '../App.css';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {DatePicker} from '@material-ui/pickers';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Tooltip from '@material-ui/core/Tooltip';

const materialTheme = createMuiTheme({
  overrides: {
      
    MuiPickersToolbar: {
      toolbar: {
         color: '#BF4E30',
      },
    },
      
      MuiPickersHeader:{
      color: '#BF4E30',
},
      
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
      
    MuiPickersDay: {
      day: {
        color: '#BF4E30'
      },
      daySelected: {
        color: 'white',
      },
      dayDisabled: {
         color: 'black',
      },
      current: {
        color: 'black',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#BF4E30',
      },
    },
  },
});

const useStyles =  makeStyles( (theme) => ({
    movieForm: {
        font: '16px',
        margin: '10px',
        background: 'white',
        borderRadius: '7px',
        border: 'black 1px solid',
        height: '50px',
        width: '500px',
        '&::placeholder': {
            color: 'grey',
            fontSize: "16px",
        }, 
    },
    movieCast:{
        font: '16px',
        margin: '10px',
        background: 'white',
        borderRadius: '7px',
        border: 'black 1px solid',
        height: '100px',
        width: '500px',
        '&::placeholder': {
            color: 'grey',
            fontSize: "16px",
        },
    },    movieDescription:{
        font: '16px',
        margin: '10px',
        background: 'white',
        borderRadius: '7px',
        border: 'black 1px solid',
        height: '100px',
        width: '500px',
        '&::placeholder': {
            color: 'grey',
            fontSize: "16px",
        },
    },
       movieSummary:{
        font: '16px',
        margin: '10px',
        background: 'white',
        borderRadius: '7px',
        border: 'black 1px solid',
        height: '100px',
        width: '500px',
        '&::placeholder': {
            color: 'grey',
            fontSize: "16px",
        },
    },
    mainHeading:{
        fontSize: '35px',
        color: '#BF4E30',
        marginTop: '20px',
    },
     headings:{
        fontSize: '20px',
        color: '#BF4E30',
        textAlign:'Left',
        marginLeft: '15%',
    },
                                                   
    container:{
        font: "10px", 
        width: "80%",
        height: '1000px',
        borderRadius: '25px',
        background: 'white',
        marginTop: '20px',
        padding: '70px',
        boxShadow: 'inset 0 0 10px black',
},
    Buttons: {
        color: 'white',
        background: '#BF4E30',
        font: "10px", 
        margin: "10px",
        "&:hover": {
            color: '#BF4E30',
            background:'white',
},},  
    
    genres:{
        padding: '10px',
        fontSize: '15px',
        height: '50px',
        width: '300px',
        textAlign: 'Left',
},
    
    ReleaseDate:{
        padding: '10px',
        fontSize: '15px',
        height: '50px',
        width: '500px',
        textAlign: 'Left',
    },

    ReleaseDateContainer:{
        border: 'solid black 1px',
        borderRadius: '5px',
        width:'500px',
    },

}));                         

function file2Base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}



function AddAmovie() {  
	const classes = useStyles();  
    const [movieTitle, setMovieTitle] = useState('');
	const [movieCast, setMovieCast] = useState("");   
    const [movieDescription, setMovieDescription] = useState("");     
    const [movieSummary, setMovieSummary] = useState('');
    const [moviePoster, setMoviePoster] = useState('');
    const [movieReleaseDate, setMovieReleaseDate] = useState(new Date());
    const [genre, setMovieGenre] = useState('');
    const [movies, setMovies] = useState([]);
    const userId=localStorage.getItem('userid')
        useEffect(()=> {
            fetch('https://prefer-mercury-5000.codio-box.uk/addAMovie',
                  {credentials: 'include', 
                   method: 'POST', 
                   headers: { 'Content-type': 'application/json'}, 
                   body: JSON.stringify(movies)}).then(response =>response.json().then(data => {setMovies(data.movies);
            })
        );
    },[movies]);
    async function addMovies (event) {
        const filesToUploads = document.querySelector('#ImageSelect').files
        const file = filesToUploads[0]
        const fileName = file.name
        const data = await file2Base64(file)
        const movieInfo = [movieTitle, movieDescription, movieCast, movieSummary, data, movieReleaseDate, genre, userId, fileName];
                      console.log (movieInfo)
              fetch('https://prefer-mercury-5000.codio-box.uk/addAMovie', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-type': 'application/json',
                        },
                            body: JSON.stringify(movieInfo),
                    }).then(response =>response.json().then(data => {
                      window.location=('./')
                  }))
    event.preventDefault();
    }
    return (  <center> <div className= {classes.container}>
                    <div className={classes.mainHeading}> 
                        <p> Add a movie: </p>
                    </div>

                    <div className={classes.headings}>
                        <p> Choose an Image</p>
                     </div>
                    <div className= {classes.Poster}>
                        <input id='ImageSelect' type="file"  accept=".png, .gif, .jpeg, .jpg" value={moviePoster} src="./images/{'moviePoster'}" onChange={(e) => setMoviePoster(e.target.value)}/>
                    </div>
                    <div className={classes.headings}>
                        <p> Movie Title </p>
                     </div>
                    <div className= {classes.Title}>
                        <input className={classes.movieForm} type="text" placeholder="Movie Title" value={movieTitle}  onChange={(e) => setMovieTitle(e.target.value)}/>
                    </div>
                    <div className={classes.headings}>
                        <p> Movie Cast </p>
                     </div>
                    <div className= {classes.Cast}>
                        <textarea className={classes.movieCast} type="text" placeholder="Cast Details" value={movieCast}  onChange={(e) => setMovieCast(e.target.value)}/>
                    </div>
                    <div className={classes.headings}>
                        <p> Movie Summary </p>
                     </div>
                     <div className= {classes.Summary}>
                        <textarea className={classes.movieSummary} type="text" placeholder="Add a short movie summary here..." value={movieSummary} onChange={(e) => setMovieSummary(e.target.value)}/>
                    </div>
                    <div className={classes.headings}>
                        <p> Movie Description </p>
                     </div>
                    <div className= {classes.Description}>
                        <textarea className={classes.movieDescription} type="text" placeholder="Description" value={movieDescription} onChange={(e) => setMovieDescription(e.target.value)}/>
                    </div>
                    <div className={classes.headings}>
                        <p> Release Date </p>
                     </div>
                    <div className= {classes.ReleaseDateContainer}>
                        <ThemeProvider theme={materialTheme}>
                            <MuiPickersUtilsProvider utils={MomentUtils}> <DatePicker value={movieReleaseDate} format="yyyy/MM/dd" views={["year", "month", "date" ]}onChange={setMovieReleaseDate} />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                    </div>
                    <div className={classes.headings}>
                        <p> Genre </p>
                     </div>
                    <div className= {classes.containersGenres}>
                         <Tooltip title="Add" arrow>
                            <select value={genre} className= {classes.genres} onChange={(e) => setMovieGenre(e.target.value)}>
                                    <option value="Comedy">Comedies</option>
                                    <option value="ThrillersOrHorrors">Thrillers/Horrors</option>
                                    <option value="Children's Movies">Children's Movies</option>
                                    <option value="Superheroes">Super-Heroes</option>
                                    <option value="Action">Action</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Other">Other</option>
                          </select> 
                         </Tooltip>
                    </div>
                    <div className= {classes.Button}>
                        <Button className={classes.Buttons} onClick={() => {window.location=('./')}}>BACK</Button>
                        <Button className={classes.Buttons} onClick={addMovies}>Add Movie</Button>
                    </div>
                </div> </center>
)} 
export default AddAmovie;


