from flask import Blueprint, jsonify, request
from . import db
from .models import Movie
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
	movie_list = Movie.query.all()
	movies = []
	
	for movie in movie_list:
		movies.append({'movieTitle' : movie.movieTitle, 'movieSummary' : movie.movieSummary, 'movieDescription' : movie.movieDescription,'movieCast' : movie.movieCast, 'moviePoster' : movie.moviePoster, 'movieReleaseDate' : movie.movieReleaseDate, 'genre' : movie.genre })

	return jsonify ({'movies': movies})


#Displays the data from taking it from the database.