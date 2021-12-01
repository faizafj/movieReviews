from flask import Blueprint, jsonify, request
import base64
from . import db
from .models import Movie
from .models import Reviews
from .models import Users
from flask_cors import CORS
import urllib 

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/movies')
def movies():
    movie_list = db.session.query((Movie.movieId),
                                  (Movie.movieTitle),
                                  (Movie.movieSummary),
                                  (Movie.movieDescription),
                                  (Movie.movieReleaseDate),
                                  (Movie.movieCast), 
                                  (Movie.genre),
                                  (Movie.moviePoster),
                                  db.func.avg(Reviews.stars),).outerjoin(Reviews).group_by(Movie.movieId).all()
    movies = []
    
    for movie in movie_list:
        movies.append({'movieId': movie[0], 
                       'movieTitle' : movie[1], 
                       'movieSummary' : movie[2], 
                       'movieDescription' : movie[3],
                       'movieReleaseDate' : movie[4],                       
                       'movieCast' : movie[5], 
                       'genre' : movie[6] , 
                       'moviePoster' : movie[7],                       
                       'rating': movie[8]})
    return jsonify ({'movies': movies})



@main.route('/Reviews')
def reviewDetails ():
    reviewList = db.session.query((Reviews.reviewID ),
                                  (Reviews.movieID ),
                                  (Reviews.userID),
                                  (Reviews.movieTitle),
                                  (Reviews.Description))
    for review in reviewList:
            reviews.append({'reviewId': review.reviewID,
                            'movieId': review.movieID,
                            'userId': review.userId,
                            'movieTitle' : review.movieTitle,
                            'Description': review.description,
                            'Stars': review.stars })
    
    return jsonify ({'reviewList': reviews})    


  #gets all the users data from the Users table and turns it into a JSON string.  
@main.route('/users')
def users():
    usersList = users.query.all()
    allUsers = []
    
    for user in userList:
        allUsers.append({ 'id' : User.userId, 
                       'username' : User.username, 
                       'password' : User.password})
    return jsonify ({'allUsers': allUsers})   





@main.route('/addAMovie', methods=['POST'])
def addMovie():
    movieInfo = request.get_json() #requests the movie information in the form a JSON string from the website.
    print(movieInfo)
    releaseDate = movieInfo[5][0:10]
    print (releaseDate)
    data = movieInfo[4]
    response = urllib.request.urlopen(data)
    fileName = 'movieclub/public/images/'+ str(movieInfo[8])
    print (fileName)
    with open(fileName, 'wb') as f:
        f.write(response.file.read())  
    newMovie = Movie(movieTitle = movieInfo[0], 
                    movieDescription = movieInfo[1],                     
                    movieCast =  movieInfo[2],
                    movieSummary = movieInfo[3],
                    moviePoster = movieInfo[8],
                    movieReleaseDate = releaseDate,
                    genre = movieInfo[6],)   
    db.session.add(newMovie) #Adds data provided to the database as new record. 
    db.session.commit() #This pushes the changes to the SQLAlchemy which adds the record. 
    return jsonify ()


#Movie details for homepage - Displays the data from taking it from the database.
@main.route('/Details', methods=['POST'])
def Details():
    id = request.get_json()
    detailsList = db.session.query((Movie.movieId),
                                  (Movie.movieTitle),
                                  (Movie.movieSummary),
                                  (Movie.movieDescription),
                                  (Movie.movieReleaseDate),
                                  (Movie.movieCast), 
                                  (Movie.genre),
                                  (Movie.moviePoster),
                                  db.func.avg(Reviews.stars).label('stars'),).outerjoin(Reviews).group_by(Movie.movieId).filter(Movie.movieId==id).all()
    Details = []
    for detail in detailsList:
        Details.append({'movieId': detail.movieId, 
                        'movieTitle' : detail.movieTitle, 
                        'movieSummary' : detail.movieSummary, 
                        'movieDescription' : detail.movieDescription,
                        'movieCast' : detail.movieCast, 
                        'moviePoster' : detail.moviePoster, 
                        'movieReleaseDate' : detail.movieReleaseDate, 
                        'genre' : detail.genre,
                        'stars' : detail.stars,
                       })
         
   
    reviewsList = db.session.query((Reviews.reviewID ),
                                  (Reviews.movieID ),
                                  (Reviews.userID),
                                  (Reviews.description),
                                  (Reviews.stars),
                                  (Users.username),).outerjoin(Users).filter(Reviews.movieID==id).all()   

    ReviewDetails = []
    for review in reviewsList:
        ReviewDetails.append({'reviewID': review.reviewID,
                        'movieID': review.movieID,
                        'userID': review.userID,
                        'Description': review.description,
                        'Stars': review.stars,
                        'Username':review.username})
        
    return jsonify ({'detailsList': Details,'reviewsList': ReviewDetails})   



#Login into account - encodes too
@main.route('/Login', methods=['GET'])
def login():
    token = request.headers.get('Authorization')
    [type,details]=token.split()
    decodedDetails=base64.b64decode(details.encode('ascii'))
    decodedString=((decodedDetails).decode('utf-8')).split(':')
    check_username = db.session.query((Users.userId),(Users.password)).filter(Users.username==decodedString[0]).all()
    if (len(check_username)==0):
        print ("Hellooooooo")
        return jsonify ({'userId': None})
    else:
        if (decodedString[1] == check_username [0][1]):
            print ("hello")
            return jsonify ({'userId': check_username[0][0]})
    return jsonify ({'userId': None})
#Make a new account
@main.route('/SignUp', methods=['POST'])
def newAccount():
    account = request.get_json()
    userID = 0
    check = db.session.query((Users.userId)).filter(Users.username==account[0]).all()
    if len(check)==1:
        return jsonify({userID: None})
    newAccount = Users(username=account[0], password=account[1])
    db.session.add(newAccount)
    db.session.commit ()
    userID = db.session.query(Users.userId).filter(Users.username==account[0]).all()
    return jsonify ({'userID': userID[0][0]})


    

@main.route('/Genres', methods=['POST'])
def Genres():
    genre = request.get_json()
    movieList = db.session.query((Movie.movieId), #intakes all the data from the movie table. 
                                  (Movie.movieTitle),
                                  (Movie.movieSummary),
                                  (Movie.movieDescription),
                                  (Movie.movieReleaseDate),
                                  (Movie.movieCast), 
                                  (Movie.genre),
                                  (Movie.moviePoster),
                                  db.func.avg(Reviews.stars),).outerjoin(Reviews).group_by(Movie.movieId).filter(Movie.genre==genre).all()
    movies = []
    for movie in movieList: #appends all the data into a list which is then turned into a json string. 
        movies.append({'movieId': movie.movieId, 
                            'movieTitle' : movie.movieTitle, 
                            'movieSummary' : movie.movieSummary, 
                            'movieDescription' : movie.movieDescription,
                            'movieCast' : movie.movieCast, 
                            'moviePoster' : movie.moviePoster, 
                            'movieReleaseDate' : movie.movieReleaseDate, 
                            'genre' : movie.genre 
                           })
    print(movies)
    return jsonify ({'Genres': movies})

    
    
@main.route('/addReview', methods=['POST'])
def addReview():
    reviewInfo = request.get_json() #requests the movie information in the form a JSON string from the website.
    newReview = Reviews(movieID = reviewInfo[0], 
                    userID   = reviewInfo[1], 
                    description = reviewInfo[2],
                    stars = reviewInfo[3] )
    db.session.add(newReview) #Adds data provided to the database as new record. 
    db.session.commit() #This pushes the changes to the SQLAlchemy which adds the record. 
    return jsonify ()


@main.route('/MyReviews', methods=['POST'])
def MyReviews(): 
    userId = request.get_json()
    reviewsList = db.session.query((Movie.movieTitle), 
                                  (Movie.moviePoster),
                                  (Reviews.movieID),
                                  (Reviews.stars),
                                  (Reviews.description),).outerjoin(Reviews).group_by(Movie.movieId).filter(Reviews.userID == userId).all()

    MyReviews = []
    for review in reviewsList:
        MyReviews.append({
                        'movieTitle' : review.movieTitle,
                        'moviePoster': review.moviePoster,
                        'movieId': review.movieID,
                        'stars': review.stars,
                        'description': review.description})
        
    userList = db.session.query((Users.userId),
                                    (Users.username),).filter(Users.userId==userId).all()
    users=[]
    
    for user in userList:
        users.append({'userId' : user[0],'username' : user[1]})
    print (users)
    return jsonify ({'MyReviews': MyReviews, 'Users': users})    


@main.route('/DeleteReview', methods=['POST'])
def DeleteReview():
    reviewData = request.get_json()
    Reviews.query.filter(Reviews.userID == reviewData["userId"]).filter(Reviews.movieID == reviewData["id"]).delete() 
    db.session.commit()
    return 'Done', 201



    