const NUMBER_OF_TWEETS = 10360; 
var insult = [];


test = $.getJSON('TrumpInsults.json')

console.log(test)

function myFunction() {
    console.log("hi222")
 }

    $("#randomBtn").click(function (e) { 
        let x = Math.floor((Math.random() * NUMBER_OF_TWEETS) + 1);
    
        $.getJSON('TrumpInsults.json', function(data) {
                insult = data.insults[x];                      
                $('#Date').html(insult.date);
                $('#Target').html(insult.target);
                $('#Insult').html(insult.insult);
                $('#Tweet').html(insult.tweet);
            });  
    });