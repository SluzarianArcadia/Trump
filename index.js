const NUMBER_OF_TWEETS = 10360; 
var JSONTweets = [];
var JSONTargets = [];

$.getJSON("TrumpInsults.json", function(json){
    JSONTweets = json;
});

$.getJSON("uniqueTargets.json", function(json){
    JSONTargets = json.targetsName;
    console.log(JSONTargets)
    renderSelectDropDown(JSONTargets)
});

$("#randomBtn").click(function (e) { 
    tweetPicked = JSONTweets.insults[Math.floor((Math.random() * NUMBER_OF_TWEETS) + 1)]
    $('#Date')  .text(tweetPicked.date)  .hide().fadeToggle(300);
    $('#Target').text(tweetPicked.target).hide().fadeToggle(400);
    $('#Insult').text(tweetPicked.insult).hide().fadeToggle(600);
    $('#Tweet') .text(tweetPicked.tweet) .hide().fadeToggle(800);
});


function renderSelectDropDown(JSONTargets){
    JSONTargets.forEach((element, i) => {
        var container = $('<option />');
        container.html(element).appendTo()
        $(container).appendTo("#listOfTargets");
    });
}