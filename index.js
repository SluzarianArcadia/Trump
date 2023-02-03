const NUMBER_OF_TWEETS = 10360; 
var JSONTweets = [];

$.getJSON("TrumpInsults.json", function(json){
    JSONTweets = json;
});

$("#randomBtn").click(function (e) { 
    tweetPicked = JSONTweets.insults[Math.floor((Math.random() * NUMBER_OF_TWEETS) + 1)]
    $('#Date')  .text(tweetPicked.date)  .hide().fadeToggle(300);
    $('#Target').text(tweetPicked.target).hide().fadeToggle(400);
    $('#Insult').text(tweetPicked.insult).hide().fadeToggle(600);
    $('#Tweet') .text(tweetPicked.tweet) .hide().fadeToggle(800);
});