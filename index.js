const NUMBER_OF_TWEETS = 10359; 
var JSONTweets = [];
var JSONTargets = [];


$.getJSON("TrumpInsults.json", function(json){
    JSONTweets = json;
});

$.getJSON("uniqueTargets.json", function(json){
    JSONTargets = json.targetsName;
    renderSelectDropDown(JSONTargets)
});

function getRandom(){

    tweetPicked = JSONTweets.insults[Math.floor((Math.random() * NUMBER_OF_TWEETS) + 1)]
    renderHTMLTweetArray([tweetPicked], "#random")
}

function renderSelectDropDown(JSONTargets){
    JSONTargets.forEach((element) => {
        var container = $('<option />');
        container.html(element).addClass("cap")
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
    if((matchedObjects.length === 0) && (searchStr.length > 2)){
        return [{"date": "N/A","target": "N/A","insult": "N/A","tweet": "No tweet was found with this text, try again!"}]
    } else {
        return matchedObjects;
    }

}


 function searchTweets(callback){

    matchingTweets = findMatchingTextinTweet();
    $("#numberOfInsultsSearch").html(matchingTweets.length);
    renderHTMLTweetArray(matchingTweets, "#searchGroup")

    callback();
}

function renderHTMLTweetArray(arrayToRender,htmlID){

    $(htmlID).empty();

    arrayToRender.forEach((element, i) => {
        container  = $("<div>").addClass("grid");
        container2 = $("<div>").addClass("grid");
        var txt  = $("<p>Date: " +element.date+ "</p><p class='cap'>Target: "+element.target+"</p> <p class='cap'>Insult: "+element.insult+"</p>");
        var txt2 = $("</p>").text("Tweet: " +element.tweet).addClass("smallerText");
        $(txt) .appendTo(container).hide().fadeToggle  (400 +(1 * i));
        $(txt2).appendTo(container2).hide().fadeToggle(900 +(1 * i));
        $(htmlID).append(container).append(container2).append("<hr>");
    })
};

  function addLoader(){
     $('#loader').addClass("loader");
} 

function removeLoader(){
    $('#loader').removeClass("loader");
} 
