console.log('hollow world');

answer = ""
// Mood radio selction changes colors on page

var colorPossibilities = ["has-background-info-dark", "has-text-info", "has-background-grey-dark", "has-text-info-light", "has-background-primary", "is-primary", "has-background-danger", "has-text-link-light", "has-background-dark", "has-text-info", "has-background-warning", "has-background-warning-light", "has-text-info-dark", "has-text-info", "has-background-grey-light"]

function moodCalm() {
    $("#header, header p, #body, article, article p, article i, article h2, button").removeClass(colorPossibilities);
    $("header p").addClass("has-text-light")
    $("article i").addClass("has-text-light")
    $("#header").addClass("has-background-info-dark");
    $("#body").addClass("has-background-info-dark");
    $("article").addClass("has-background-grey-light");
    $("article p").addClass("has-text-info-light");
    $("button").addClass("has-background-info-dark");
}

function moodMotivated() {
    $("#header, header p, #body, article, article p, article i, article h2, button").removeClass(colorPossibilities);
    $("header p").addClass("has-text-light")
    $("article i").addClass("has-text-light")
    $("#header").addClass("has-background-primary");
    $("#body").addClass("has-background-primary");
    $("article").addClass("has-background-danger");
    $("article p").addClass("has-text-link-light");
    $("button").addClass("has-background-primary");
}

function moodBlue() {
    $("#header, header p, #body, article, article p, article i, article h2, button").removeClass(colorPossibilities);
    $("header p").addClass("has-text-info-dark")
    $("article i").addClass("has-text-light")
    $("#header").addClass("has-background-dark");
    $("#body").addClass("has-background-dark");
    $("article").addClass("has-background-link");
    $("article p").addClass("has-text-info-light");
    $("button").addClass("has-background-info");
}

function moodSunshine() {
    $("#header, header p, #body, article, article p, article i, article h2, button").removeClass(colorPossibilities);
    $("header p").addClass("has-text-info");
    $("article i").addClass("has-text-info")
    $("#header").addClass("has-background-warning-light");
    $("#body").addClass("has-background-warning-light");
    $("article").addClass("has-background-warning");
    $("article p, article h2").addClass("has-text-info");
    $("label i").addClass("has-text-info");
    $("button").addClass("has-background-warning-light");
    $("button").addClass("has-text-info");
}

$("input").click(function moodSelector() {
    if ($(this).is("#calm")) {
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
});


//Trivia Question function
function getTrivia() {
    triviaUrl = ("https://api.trivia.willfry.co.uk/questions?limit=5");
    var radioBtns = document.getElementsByClassName('trivia-selected');
    for (let i = 0; i < radioBtns.length; i++) {
        radioBtns[i].checked=false;
    }


    //parse api endpoint for trivia
    fetch(triviaUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            //crude shuffle for placing correct answer in a random index each time
            var radio = ["radio-1", "radio-2", "radio-3", "radio-4"]
            const removeIndex = Math.floor(Math.random() * radio.length);
            //remove random index item from array [radio]
            var removed = radio.splice(removeIndex, 1);
            //remove the "-" to get the right id for the input and assign to answer
            var answer = removed[0].replace("-", "");
            //assign the correct and incorrect answers to variables
            var question = data[0].question;
            $('#trivia-question').text(`${question}?`)
            var correctAnswer = data[0].correctAnswer;
            localStorage.setItem('correct-answer', correctAnswer);
            //update the html with the possible answers
            $(`#${removed}`).text(correctAnswer);
            var incorrectAnswer1 = data[0].incorrectAnswers[0];
            $(`#${radio[0]}`).text(incorrectAnswer1);
            var incorrectAnswer2 = data[0].incorrectAnswers[1];
            $(`#${radio[1]}`).text(incorrectAnswer2);
            var incorrectAnswer3 = data[0].incorrectAnswers[2];
            $(`#${radio[2]}`).text(incorrectAnswer3);
            localStorage.setItem('answer', answer)
            
        });
}
//run getTrivia for initial page load
getTrivia()

//trivia select listener

$('.trivia-selected').on('change', function () {
    const radioid = $(this).attr('id');
    console.log(`${radioid} you clicked me`);
    var ans = localStorage.getItem('answer')
    if ($(this).attr('id') == ans) {
        console.log("write answer")
        $('#trivia-response').text("Correct Answer")
    } else {
        var corans = localStorage.getItem('correct-answer');
        $('#trivia-response').text(`Wrong Answer - the correct answer is ${corans}`)
        return
    }
});

//listen for play again trivia button
$('#play-again').on('click', function () {
    console.log("you just clicked the play again selector");
    getTrivia();
    $('#trivia-response').text("")
});


//quote of the day function

function quote() {
    //random page generator for quotes
    var pageNo = Math.floor(Math.random() * 7000);
    var qod = (`https://quote-garden.herokuapp.com/api/v3/quotes?&&page=${pageNo}`)
    fetch(qod)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //get quote from first index on random page
            var dayQuote = data.data[0].quoteText;
            $('#quote').text('"' + dayQuote + '"')
            var quoteAuthor = data.data[0].quoteAuthor;
            $('#author').text("-" + quoteAuthor);
        })

}

quote()

//weather function
var cityEl = $('#city');
$('#city').on('change', function () {
    var citySel = ($(this).val())
    //convert to uppercase if not already
    citySel = citySel[0].toUpperCase()+citySel.slice(1);
    var apiKey = "d45dbf09865d86748795ff69876d41b7";
    //build url for city
    cityWeatherUrl = ("https://api.openweathermap.org/data/2.5/weather?q=" + citySel + "&units=imperial" + "&appid=" + apiKey);

    fetch(cityWeatherUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            var temp = data.main["temp"];
            $('#city-temp').text(`Temperature: ${temp}`);
            var icon = data.weather[0].icon;
            iconimg = "https://openweathermap.org/img/w/" + icon + ".png"
            $('#city-weather-icon').attr('src', iconimg);
            var descr = data.weather[0].main;
            $('#current-conditions').text(`Current Conditions for ${citySel}: ${descr}`)
            $('#weather-content').removeClass('is-hidden');
        });
    return
});