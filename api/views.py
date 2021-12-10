from flask import Blueprint, jsonify, request #imports all modules that are required 
import base64
from . import db
from .models import Movie #imports every table (class) from models.py
from .models import Reviews
from .models import Users
from flask_cors import CORS
import urllib 

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/movies') #queries all the fields from the movies table.
def movies():
    movie_list = db.session.query((Movie.movieId),
                                  (Movie.movieTitle),
                                  (Movie.movieSummary),
                                  (Movie.movieDescription),
                                  (Movie.movieReleaseDate),
                                  (Movie.movieCast), 
                                  (Movie.genre),
                                  (Movie.moviePoster),
                                  db.func.avg(Reviews.stars),).outerjoin(Reviews).group_by(Movie.movieId).all() #groups the movies by the movie id, averages the rating for each movie which is taken from the Reviews table. 
    movies = [] #creates a list called movie so that each record can be appended. 
    
    for movie in movie_list: #iterates over every record and appends it to the movies list. 
        movies.append({'movieId': movie[0], 
                       'movieTitle' : movie[1], 
                       'movieSummary' : movie[2], 
                       'movieDescription' : movie[3],
                       'movieReleaseDate' : movie[4],                       
                       'movieCast' : movie[5], 
                       'genre' : movie[6] , 
                       'moviePoster' : movie[7],                       
                       'rating': movie[8]})
    return jsonify ({'movies': movies}) #returns a json string with the appended movies data. 



@main.route('/Reviews') #queries all the reviews data. 
def reviewDetails ():
    reviewList = db.session.query((Reviews.reviewID ),
                                  (Reviews.movieID ),
                                  (Reviews.userID),
                                  (Reviews.movieTitle),
                                  (Reviews.Description))
    for review in reviewList: #appends the data into a list
            reviews.append({'reviewId': review.reviewID,
                            'movieId': review.movieID,
                            'userId': review.userId,
                            'movieTitle' : review.movieTitle,
                            'Description': review.description,
                            'Stars': review.stars })
    
    return jsonify ({'reviewList': reviews})    #returns a json string with the appended reviews data. 


  #gets all the users data from the Users table and turns it into a JSON string.  
@main.route('/users')
def users():
    usersList = users.query.all() #queries all the users data. 
    allUsers = [] #creates an empty list called allUsers which will be used for appended the data.
    
    for user in userList: #iterates over every record and appends them to the list and sets the variable name.
        allUsers.append({ 'id' : User.userId, 
                       'username' : User.username, 
                       'password' : User.password})
    return jsonify ({'allUsers': allUsers})   #returns a JSON string with the allUsers list. 





@main.route('/addAMovie', methods=['POST']) #creates a POST api used to addAMovie into the database.
def addMovie():
    movieInfo = request.get_json() #requests the movie information in the form a JSON string from the website.
    releaseDate = movieInfo[5][0:10] #used to format the date so it is readable by the user and not to specific (e.g contain time etc)
    data = movieInfo[4] #sets the postion in the list where the date data should go. 
    response = urllib.request.urlopen(data)
    fileName = 'movieclub/public/images/'+ str(movieInfo[8]) #sets the location for the image uploaded by the users to be stored into. 
    with open(fileName, 'wb') as f:
        f.write(response.file.read())  
    newMovie = Movie(movieTitle = movieInfo[0], #sets out the position for each variable in the list. This is so the data can be referrenced easier and to place it correctly. 
                    movieDescription = movieInfo[1],                     
                    movieCast =  movieInfo[2],
                    movieSummary = movieInfo[3],
                    moviePoster = movieInfo[8],
                    movieReleaseDate = releaseDate,
                    genre = movieInfo[6],)   
    db.session.add(newMovie) #Adds data provided to the database as new record. 
    db.session.commit() #This pushes the changes to the SQLAlchemy which adds the record. 
    return jsonify () #returns a string


#Movie details for homepage - Displays the data from taking it from the database.
@main.route('/Details', methods=['POST']) #POST API for displaying movie details. 
def Details():
    id = request.get_json() #request the id (as a string) of the record to pull out. This is provided by the webpage through a useParamas function which supplies the id. 
    detailsList = db.session.query((Movie.movieId), #queries the database 
                                  (Movie.movieTitle),
                                  (Movie.movieSummary),
                                  (Movie.movieDescription),
                                  (Movie.movieReleaseDate),
                                  (Movie.movieCast), 
                                  (Movie.genre),
                                  (Movie.moviePoster),
                                  db.func.avg(Reviews.stars).label('stars'),).outerjoin(Reviews).group_by(Movie.movieId).filter(Movie.movieId==id).all() #groups the movies by the movie id, averages the rating for each movie which is taken from the Reviews table and filters the movieId so it is the one the user requested. 
    Details = [] #details empty list.
    for detail in detailsList: #appends the details into the list by iterating through each record. 
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
         
   
    reviewsList = db.session.query((Reviews.reviewID ), #queries the reviews data for the corresponding movie. 
                                  (Reviews.movieID ),
                                  (Reviews.userID),
                                  (Reviews.description),
                                  (Reviews.stars),
                                  (Users.username),).outerjoin(Users).filter(Reviews.movieID==id).all()  #filters by the movieId

    ReviewDetails = [] #reviews list
    for review in reviewsList: #iterates every record that has been queries 
        ReviewDetails.append({'reviewID': review.reviewID, #appends to the list
                        'movieID': review.movieID,
                        'userID': review.userID,
                        'Description': review.description,
                        'Stars': review.stars,
                        'Username':review.username})
        
    return jsonify ({'detailsList': Details,'reviewsList': ReviewDetails})    #returns both the details and reviews records as JSON list.



#Login into account - encodes too
@main.route('/Login', methods=['GET']) #GET API to retrieve login data.
def login():
    token = request.headers.get('Authorization') #token is set as the header Authorization.  
    [type,details]=token.split() 
    decodedDetails=base64.b64decode(details.encode('ascii')) #encodes the details using ascii
    decodedString=((decodedDetails).decode('utf-8')).split(':') #decoded details are decoded using utf-8
    check_username = db.session.query((Users.userId),(Users.password)).filter(Users.username==decodedString[0]).all() #this checks to see if the username/password entered exists within the database. 
    if (len(check_username)==0): #if there's nothing returned, then a JSON string of none is returned. 
        return jsonify ({'userId': None})
    else:
        if (decodedString[1] == check_username [0][1]): #However if there is a user then it returns the userid. 
            return jsonify ({'userId': check_username[0][0]})
    return jsonify ({'userId': None})
#Make a new account
@main.route('/SignUp', methods=['POST'])
def newAccount():
    account = request.get_json() #requests data from the website. 
    userID = 0 #defines userID
    check = db.session.query((Users.userId)).filter(Users.username==account[0]).all() #queries the userId and filters by username enteres to see if it already exists. 
    if len(check)==1: #if there's already that username, none is returned.
        return jsonify({userID: None})
    newAccount = Users(username=account[0], password=account[1]) #pushes data into each field. 
    db.session.add(newAccount) #adds the record to the database.
    db.session.commit () #commits it to the database.
    userID = db.session.query(Users.userId).filter(Users.username==account[0]).all()
    return jsonify ({'userID': userID[0][0]})  #returns user ID



@main.route('/Genres', methods=['POST'])
def Genres():
    genre = request.get_json() #requests whatever was input into useParams from the website to filter the genres.
    movieList = db.session.query((Movie.movieId), #intakes all the data from the movie table. 
                                  (Movie.movieTitle),
                                  (Movie.movieSummary),
                                  (Movie.movieDescription),
                                  (Movie.movieReleaseDate),
                                  (Movie.movieCast), 
                                  (Movie.genre),
                                  (Movie.moviePoster),
                                  db.func.avg(Reviews.stars),).outerjoin(Reviews).group_by(Movie.movieId).filter(Movie.genre==genre).all() #filters by the genre selected by user.
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

    return jsonify ({'Genres': movies}) #returns the movies from that genre.

    
    
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


#Shows user their reviews by obtaining their id (from useParams in the javascript which takes it from local storage)
@main.route('/MyReviews', methods=['POST'])
def MyReviews(): 
    userId = request.get_json()
    reviewsList = db.session.query((Movie.movieTitle), #queries the data 
                                  (Movie.moviePoster),
                                  (Reviews.movieID),
                                  (Reviews.stars),
                                  (Reviews.description),).outerjoin(Reviews).group_by(Movie.movieId).filter(Reviews.userID == userId).all()

    MyReviews = [] #creates an empty list where the details from above appended into records.
    for review in reviewsList:
        MyReviews.append({
                        'movieTitle' : review.movieTitle,
                        'moviePoster': review.moviePoster,
                        'movieId': review.movieID,
                        'stars': review.stars,
                        'description': review.description})
        
    userList = db.session.query((Users.userId),
                                    (Users.username),).filter(Users.userId==userId).all() #selects reviews made by that user only
    users=[]
    
    for user in userList:
        users.append({'userId' : user[0],'username' : user[1]}) #appends userID and their reviews
    return jsonify ({'MyReviews': MyReviews, 'Users': users})     #returns the reviews and the user


@main.route('/DeleteReview', methods=['POST']) #delete review api
def DeleteReview():
    reviewData = request.get_json() #gets the userId using use params to select which reviews to delete
    Reviews.query.filter(Reviews.userID == reviewData["userId"]).filter(Reviews.movieID == reviewData["id"]).delete()  #removes the review from the reviews table.
    db.session.commit() #saves the changes
    return 'Done', 201 #returns done to show success to api so it knows to finish.



    