//container with two rows four divs as buttons
// made array with four colors
let buttonColors = ['red', 'yellow', 'blue', 'green'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    };
})



$(".btn").click(function () {
    // console.log(event);
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    let lastColor = userClickedPattern.length - 1;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(lastColor)
});



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("not success");

    }
}
function nextSequence() {
    level++;
    $("#level-title").text(`Level   ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    let chosenButton = $("#" + randomChosenColor);
    chosenButton.fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};




