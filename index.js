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

function selectTargetTweets (){
    $('#targetGroup').empty();
    selectedTarget = $("#listOfTargets :selected").text()
    arrayOfTweetsTarget = getObjects(JSONTweets, 'target', selectedTarget);
    $("#numberOfInsults").html(arrayOfTweetsTarget.length);

    arrayOfTweetsTarget.forEach(element => {
        container  = $("<div>").addClass("grid");
        container2 = $("<div>").addClass("grid");
        var txt = $("</p>").text("Date: "    +element.date);
        var txt1 = $("</p>").text("Insult: " +element.insult);
        var txt2 = $("</p>").text("Tweet: "  +element.tweet).addClass("smallerText");

        $(txt).appendTo(container);
        $(txt1).appendTo(container);
        $(txt2).appendTo(container2);

        $("#targetGroup").append(container).append(container2).append("<hr>");
    });

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