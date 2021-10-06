console.log('hollow world');

// Mood radio selction changes colors on page

function moodCalm() {
    $("#header").addClass("has-background-info-dark");
    $("#body").addClass("has-background-info-dark");
    $("article").addClass("has-background-grey-dark");
    $("article p").addClass("has-text-info-light");
    $("button").addClass("has-background-info-dark");
}

function moodMotivated() {
    $("#header").addClass("has-background-primary");
    $("#body").addClass("has-background-primary");
    $("article").addClass("has-background-danger");
    $("article p").addClass("has-text-link-light");
    $("button").addClass("has-background-primary");
}

function moodBlue() {
    $("#header").addClass("has-background-dark");
    $("#body").removeClass("has-background-primary");
    $("#body").addClass("has-background-dark");
    $("article").addClass("has-background-link-dark");
    $("article p").addClass("has-text-info-light");
    $("button").addClass("has-background-dark");
}

function moodSunshine() {
    $("#header").addClass("has-background-warning-light");
    $("#body").addClass("has-background-warning-light");
    $("article").addClass("has-background-warning");
    $("header p").addClass("has-text-info");
    $("article p").addClass("has-text-info");
    $("button").addClass("has-background-warning-light");
    $("button").addClass("has-text-info");
}

$("input").click(function moodSelector() {
    if($(this).is("#calm")) {
        console.log("calm");
        moodCalm();
    }
    else if ($(this).is("#motivated")) {
        console.log("motivated");
        moodMotivated();
    }
    else if ($(this).is("#blue")) {
        console.log("blue");
        moodBlue();
    }
    else if ($(this).is("#sunshine")) {
        console.log("sunshine");
        moodSunshine();
    }
})

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
        .then(function (data) {
            // console.log(data[0].category);
            // var category = data[0].category;
            // console.log(category);
            // $('#appendHere').after(`<p id="cat">Category: ${category} </p>`)
            var question = data[0].question;
            console.log(question);
            $('#trivia-question').text(`${question}?`)
            var correctAnswer = data[0].correctAnswer;
            console.log(correctAnswer);
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
        .then(function (data) {
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
team();