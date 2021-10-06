console.log('hollow world');



//Trivia Question function
function getTrivia() {
    triviaUrl = ("https://api.trivia.willfry.co.uk/questions?limit=5");
    console.log(triviaUrl);
  
    //parse api endpoint for trivia
    fetch(triviaUrl)
    .then(function (response) {
        console.log(response)
        return response.json();
      
    })
    .then(function(data) {
        // console.log(data[0].category);
        // var category = data[0].category;
        // console.log(category);
        // $('#appendHere').after(`<p id="cat">Category: ${category} </p>`)
        var question = data[0].question;
        console.log(question);
        $('#trivia-question').text(`${question}?`)
        // var correctAnswer = data[0].correctAnswer;
        // console.log(correctAnswer);
        // $('#ques').after(`<p id="corrAns">Correct Answer: ${correctAnswer} </p>`)
  
        
    });
    return
  }
  getTrivia()

  var teamUrl = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=seattle%20seahawks"


//team information function

function team() {

    fetch(teamUrl)
    .then(function (response) {
        console.log(response)
        return response.json();
        
    })
    .then(function(data) {
        console.log(data.teams[0].strTeamBadge);
        var teamBadge = (`"${data.teams[0].strTeamBadge}"`);
        console.log(teamBadge);
        $('#team').after(`<img src=${teamBadge}></img>`)
        // console.log(data.response[6].matchviewUrl);
        // var scoreVideo = data.response[6].matchviewUrl
        // $('#scores').after(`<img id="vid" src="${scoreVideo}"></img>`)
        // console.log(data.response)
        
        
    })
}
console.log(team)

// var magicBtn = $(".magicBtn")
// magicBtn.on("click", console.log())

// var teams = $("select").val();

// console.log(teams)
// $("#magicBtn").click(function(){
// console.log(teams)
// })

$('#teamList').change(function(){
console.log($(this).children(":selected").attr("selected", true).val())
})