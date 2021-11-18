from flask import Blueprint, jsonify, request
import base64
from . import db
from .models import Movie
from .models import Reviews
from .models import Users
from flask_cors import CORS

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/add_movie', methods=['POST'])
def add_movie():
	movie_data = request.get_json()
	new_movie = Movie(movieTitle=movie_data['movieTitle'], movieSummary=movie_data['movieSummary'], movieDescription=movie_data['movieDescription'], movieCast=movie_data['movieCast'], moviePoster=movie_data['moviePoster'], movieReleaseDate=movie_data['movieReleaseDate'], genre=movie_data['genre'])
	db.session.add(new_movie)
	db.session.commit()
    
	return 'Done', 201

@main.route('/movies')
def movies():
    Review_list = Reviews.query.all() 
    movie_list = db.session.query((Movie.movieId),(Movie.movieTitle),(Movie.movieSummary),(Movie.movieDescription),(Movie.movieReleaseDate),(Movie.movieCast), (Movie.genre),(Movie.moviePoster),db.func.avg(Reviews.stars),).outerjoin(Reviews).group_by(Movie.movieId).all()
    movies = []
    
    for movie in movie_list:
        movies.append({'movieId': movie[0], 'movieTitle' : movie[1], 'movieSummary' : movie[2], 'movieDescription' : movie[3],'movieCast' : movie[5], 'moviePoster' : movie[7], 'movieReleaseDate' : movie[4], 'genre' : movie[6] , 'rating': movie[8]})
        
    return jsonify ({'movies': movies})




@main.route('/Details', methods=['POST'])
def Details():
    id = request.get_json()
    details_list = Movie.query.filter(Movie.movieId==id).all()
    Details = []
    
    for detail in details_list:
        Details.append({'movieId': detail.movieId, 'movieTitle' : detail.movieTitle, 'movieSummary' : detail.movieSummary, 'movieDescription' : detail.movieDescription,'movieCast' : detail.movieCast, 'moviePoster' : detail.moviePoster, 'movieReleaseDate' : detail.movieReleaseDate, 'genre' : detail.genre })
        
    return jsonify ({'Details': Details})

#Displays the data from taking it from the database.



@main.route('/Login', methods=['GET'])
def login():
  token = request.headers.get('Authorization')
  [type,details]=token.split()
  decodedDetails=base64.b64decode(details.encode('ascii'))
  decodedString=((decodedDetails).decode('utf-8')).split(':')
  print (decodedString)
  check_username = db.session.query((Users.userId),(Users.password)).filter(Users.username==decodedString[0]).all()
  print (check_username)
  if (len(check_username)==0):
      return jsonify ({'userId': None})
  else:
    if (decodedString[1] == check_username [0][1]):
      print ("hello")
      return jsonify ({'userId': check_username[0][0]})