require("dotenv").config();
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');

// var spotify = new Spotify(keys.spotify);

var spotify = new Spotify({
    id: '54c4c4a7f42f4eba83bc6f1564b9aa8d',
    secret: 'ad11e0b2288c4cdeb08aa27d4ce524cc'
  });

var argument = process.argv[2];
var query = process.argv;
query = query.splice(3,(process.argv.length - 1)).join('+');

switch (argument) {
    case 'concert-this':
    queryURL = 'https://rest.bandsintown.com/artists/' + query + '/events?app_id=codingbootcamp';
    console.log(queryURL);
    request(queryURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            for(var i = 0; i < (JSON.parse(body)).length; i++) {
                console.log('The Venue Name Is: ' + JSON.parse(body)[i].venue.name);
                console.log('The Venue Location Is: ' + JSON.parse(body)[i].venue.city + ', ' + JSON.parse(body)[i].venue.region);
                console.log('The Venue Location Is: ' + moment(JSON.parse(body)[i].datetime).format('MM/DD/YYYY'));
                console.log('******************************');
    }
        } else {
            console.log(error);
        }
    });
    break;

    case 'spotify-this-song':
    if(!query) {
        query = 'The+Sign';
    }
    spotify.search({ type: 'track', query: query })
  .then(function(response) {
      for(var i = 0; i < response.tracks.items.length; i++) {
    console.log('Artist(s): ' + response.tracks.items[i].artists[0].name);
      console.log('Title of Song: ' + response.tracks.items[i].name);
      console.log('Spotify Song Preview: ' + response.tracks.items[i].album.external_urls.spotify);
      console.log('Album Name: ' + response.tracks.items[i].album.name);
      console.log('***************************');
    }

  });
    break;

    case 'movie-this':
    if(!query) {
        query = "Mr.+Nobody";
    }
    queryURL = 'http://www.omdbapi.com/?t=' + query + '&y=&plot=short&apikey=trilogy';
    console.log(queryURL);
    request(queryURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Release Date: ' + JSON.parse(body).Released);
                console.log('IMDB Rating: ' + JSON.parse(body).Ratings[0].Value);
                console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
                console.log('Country where it was Produced: ' + JSON.parse(body).Country);
                console.log('Language' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);
                console.log('******************************');
        } else {
            console.log(error);
        }
    });
    break;

    case 'do-what-it-says':
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        } else {
        query = data.split(' ').join('+');
        console.log(query);
        spotify.search({ type: 'track', query: query })
        .then(function(response) {
            for(var i = 0; i < response.tracks.items.length; i++) {
          console.log('Artist(s): ' + response.tracks.items[i].artists[0].name);
            console.log('Title of Song: ' + response.tracks.items[i].name);
            console.log('Spotify Song Preview: ' + response.tracks.items[i].album.external_urls.spotify);
            console.log('Album Name: ' + response.tracks.items[i].album.name);
            console.log('***************************');
          }
        
    
    
    
    
    });
}
    });
    break;
}