from . import db
'''Each class is created to take data from each table and to use it with the flask back-end. '''
class Movie(db.Model): #Takes in Movie table data and sets up each field, defines its data type and sets primary keys. 
    __tablename__ = 'movie'
    movieId = db.Column(db.Integer, primary_key=True) #primary key
    movieTitle = db.Column(db.String(200))
    movieSummary = db.Column(db.String(200))
    movieDescription = db.Column(db.String(4000))
    movieCast = db.Column(db.String(250))
    moviePoster = db.Column(db.String(50))
    movieReleaseDate = db.Column(db.String(50))
    genre = db.Column(db.String(20))
#Takes the data from the database

class Reviews(db.Model):
    __tablename__ = 'reviews' #Takes in Reviews table data and sets up each field, defines its data type and sets primary keys. 
    reviewID = db.Column(db.Integer, primary_key=True) #primary key 
    movieID = db.Column(db.Integer,db.ForeignKey('movie.movieId')) #foreign key from movies table
    userID = db.Column(db.Integer,db.ForeignKey('users.userId')) #foreign key from users table
    movieTitle = db.Column(db.String(200))
    stars = db.Column(db.Integer)
    description = db.Column(db.String(400))

class Users (db.Model): #Takes in Users table data and sets up each field, defines its data type and sets primary keys. 
    __tablename__ = 'users'
    userId =  db.Column(db.Integer, primary_key=True) #primary key
    username = db.Column(db.String(15))
    password = db.Column(db.String(20))
