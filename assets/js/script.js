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
    .then(function(data) {
        console.log(data);
        var radio = ["radio-1", "radio-2", "radio-3", "radio-4"]
        const removeIndex = Math.floor(Math.random() * radio.length);
        console.log(`${removeIndex} removeIndex`);
        var removed = radio.splice(removeIndex,1);
        console.log(`${removed} removed array`);
        console.log(`${radio} shortened radio`);
        var answer = removed[0].replace("-", "");
        console.log(`${answer} is this the answer`)
        //Math.floor(Math.random() * arr.length)
        // console.log(data[0].category);
        // var category = data[0].category;
        // console.log(category);
        // $('#appendHere').after(`<p id="cat">Category: ${category} </p>`)
        var question = data[0].question;
        console.log(question);
        $('#trivia-question').text(`${question}?`)
        var correctAnswer = data[0].correctAnswer;
        localStorage.setItem('correct-answer', correctAnswer);
        console.log(correctAnswer);

        // var answerChosen = $(this).value();
        // console.log(answerChosen);

        console.log(`this was removed ---  #${removed}`);
        $(`#${removed}`).text(correctAnswer);
        var incorrectAnswer1 = data[0].incorrectAnswers[0];

        $(`#${radio[0]}`).text(incorrectAnswer1);
        var incorrectAnswer2 = data[0].incorrectAnswers[1];
        $(`#${radio[1]}`).text(incorrectAnswer2);
        var incorrectAnswer3 = data[0].incorrectAnswers[2];
        $(`#${radio[2]}`).text(incorrectAnswer3);
        // console.log(incorrectAnswer1);
        // console.log(incorrectAnswer2);
        // console.log(incorrectAnswer3);
        localStorage.setItem('answer', answer)
        
    });
    
  }
  getTrivia()



//trivia select listener
console.log(`${answer} - checking the vaue of answer in global after running triva`);

$('.trivia-selected').on('change', function() {
    console.log("you just clicked this selector");
    // const attribute = $(this).attr('id');
    // console.log($(this).attr('id'));
    const radioid = $(this).attr('id');
    console.log($(this));
    console.log($(this).attr('id'));
    console.log(`${radioid} you clicked me`)
    var ans = localStorage.getItem('answer')
    console.log(`ans = ${ans}`);
    if ($(this).attr('id') == ans) {
        console.log("write answer")
        $('#trivia-response').text("Correct Answer")
        // alert("write answer");
    } else {
        var corans = localStorage.getItem('correct-answer');
        $('#trivia-response').text(`Wrong Answer - the correct answer is ${corans}` )
        return
    }
    // console.log(`time ${time}`);
    // const value = $(this).siblings('textarea').val()
    // console.log(`value ${value}`);
    // localStorage.setItem(time, value)
    })

//listen for play again trivia button
$('#play-again').on('click', function() {
    console.log("you just clicked the play again selector");
    getTrivia();
    $('#trivia-response').text("")
})




function quote() {
    //random page generator
    var pageNo = Math.floor(Math.random() * 7000);
    console.log(pageNo);
    var qod = (`https://quote-garden.herokuapp.com/api/v3/quotes?&&page=${pageNo}`)
    console.log(qod)
    fetch(qod)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        console.log(data.data[0].quoteText)
        
        
        var dayQuote = data.data[0].quoteText;
        $('#quote').text('"' + dayQuote + '"')
        var quoteAuthor = data.data[0].quoteAuthor;
        $('#author').text("-" + quoteAuthor);
        // var quoteOfDay = (data.contents.quotes[0].quote)
        // $('#quote').text(quoteOfDay);
    })

}
quote()

// fetch('https://api.quotable.io/random')
//   .then(response => response.json())
//   .then(data => {
//     console.log(`${data.content} —${data.author}`)
//   })

//         .then(function (response) {
//             console.log(response)
//             return response.json();

//         })
//         .then(function (data) {
//             // console.log(data[0].category);
//             // var category = data[0].category;
//             // console.log(category);
//             // $('#appendHere').after(`<p id="cat">Category: ${category} </p>`)
//             var question = data[0].question;
//             console.log(question);
//             $('#trivia-question').text(`${question}?`)
//             var correctAnswer = data[0].correctAnswer;
//             console.log(correctAnswer);
//             // $('#ques').after(`<p id="corrAns">Correct Answer: ${correctAnswer} </p>`)


//         });
//     return
// }
getTrivia()

var teamUrl = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=seattle%20seahawks"


//team information function

// function team() {

//     fetch(teamUrl)
//         .then(function (response) {
//             console.log(response)
//             return response.json();

//         })
//         .then(function (data) {
//             console.log(data.teams[0].strTeamBadge);
//             var teamBadge = (`"${data.teams[0].strTeamBadge}"`);
//             console.log(teamBadge);
//             $('#team').after(`<img src=${teamBadge}></img>`)
//             // console.log(data.response[6].matchviewUrl);
//             // var scoreVideo = data.response[6].matchviewUrl
//             // $('#scores').after(`<img id="vid" src="${scoreVideo}"></img>`)
//             // console.log(data.response)


//         })
// }
// team();