const NUMBER_OF_TWEETS = 10360; 
var JSONTweets = [];
var JSONTargets = [];

$.getJSON("TrumpInsults.json", function(json){
    JSONTweets = json;
});

$.getJSON("uniqueTargets.json", function(json){
    JSONTargets = json.targetsName;
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

function selectTargetTweets (){
    $('#targetGroup').empty();
    selectedTarget = $("#listOfTargets :selected").text()
    arrayOfTweetsTarget = getObjects(JSONTweets, 'target', selectedTarget);
    $("#numberOfInsults").html(arrayOfTweetsTarget.length);
    renderHTMLTweetArray(arrayOfTweetsTarget, "#targetGroup");
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

function findMatchingTextinTweet() {

    searchStr = $("#search").val();
    var matchedObjects = [];

    if (searchStr.length > 2){
        JSONTweets.insults.forEach((element, i) => { 
            var match = element.tweet.includes(searchStr)
                if (match){
                    matchedObjects[i] = element
                }
        })
    }
    matchedObjects = matchedObjects.filter(function(e){return e}); 
    return matchedObjects;
}


function searchTweets(){
    matchingTweets = findMatchingTextinTweet();
    $("#numberOfInsultsSearch").html(matchingTweets.length);
    renderHTMLTweetArray(matchingTweets, "#searchGroup")
}



function renderHTMLTweetArray(arrayToRender,htmlID){
    $(htmlID).empty();

    arrayToRender.forEach((element, i) => {
        container  = $("<div>").addClass("grid");
        container2 = $("<div>").addClass("grid");
        var txt = $("</p>").text("Date: "    +element.date);
        var txt1 = $("</p>").text("Insult: " +element.insult);
        var txt2 = $("</p>").text("Tweet: "  +element.tweet).addClass("smallerText");
        $(txt).appendTo(container).hide().fadeToggle  (400 +(1 * i));
        $(txt1).appendTo(container).hide().fadeToggle (600 +(1 * i));
        $(txt2).appendTo(container2).hide().fadeToggle(900 +(1 * i));
        $(htmlID).append(container).append(container2).append("<hr>");
    })
    
};