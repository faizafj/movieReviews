from . import db
class Movie(db.Model):
    movieId = db.Column(db.Integer, primary_key=True)
    movieTitle = db.Column(db.String(200))
    movieSummary = db.Column(db.String(200))
    movieDescription = db.Column(db.String(4000))
    movieCast = db.Column(db.String(250))
    moviePoster = db.Column(db.String(50))
    movieReleaseDate = db.Column(db.String(50))
    genre = db.Column(db.String(20))
#Takes the data from the database
