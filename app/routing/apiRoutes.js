
var friends = require('../data/friends.js');

module.exports = function (app) {
    // GET request handles when user 'visits' a page
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });
    // POST request handles when a user submits a form
    app.post('/api/friends', function (req, res) {
        // loop through all of the possible options
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // To take the result of the user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;
        // To take the results of the user's name and photo, other than the survey questions, to post and parse it
        var userName = userData.name;
        var userPhoto = userData.photo;

        // The variable used to calculate the difference b/n the user's socres and the scores of each user
        var totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        for (var i = 0; i < friends.length - 1; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            for (var j = 0; j < 10; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                if (totalDifference <= bestMatch.friendDifference) {

                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // The push method use to save user's data to the database
        friends.push(userData);

        //The res.json method will return a JSON data with the user's match which was looped through frieds data array. 
        res.json(bestMatch);
    });
};