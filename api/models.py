from . import db
class Movie(db.Model):
    __tablename__ = 'movie'
    movieId = db.Column(db.Integer, primary_key=True)
    movieTitle = db.Column(db.String(200))
    movieSummary = db.Column(db.String(200))
    movieDescription = db.Column(db.String(4000))
    movieCast = db.Column(db.String(250))
    moviePoster = db.Column(db.String(50))
    movieReleaseDate = db.Column(db.String(50))
    genre = db.Column(db.String(20))
#Takes the data from the database

class Reviews(db.Model):
    __tablename__ = 'reviews'
    reviewID = db.Column(db.Integer, primary_key=True)
    movieID = db.Column(db.Integer,db.ForeignKey('movie.movieId'))
    userID = db.Column(db.Integer,db.ForeignKey('users.userId'))
    movieTitle = db.Column(db.String(200))
    stars = db.Column(db.Integer)
    description = db.Column(db.String(400))

class Users (db.Model):
    __tablename__ = 'users'
    userId =  db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15))
    password = db.Column(db.String(20))
    