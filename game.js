//container with two rows four divs as buttons
// made array with four colors
let buttonColors = ['red', 'yellow', 'blue', 'green'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// $(document).keypress(function () {
//     if (!started) {
//         $("#level-title").text("Level " + level)
//         nextSequence();
//         started = true;
//     };
// });

document.getElementById("start").addEventListener("click", handler);

// handler function
function handler(e) {
	// remove this handler
	e.target.removeEventListener(e.type, arguments.callee);
    this.remove();
         $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
}


    $(".btn").click(function () {
        // console.log(event);
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        let lastColor = userClickedPattern.length - 1;
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1)
    });



    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () { nextSequence() }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 500);
            startOver();

        }
    }

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text(`Level   ${level}`);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        let chosenButton = $("#" + randomChosenColor);
        chosenButton.fadeOut(100).fadeIn(100);
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
    };



    function animatePress(currentColor) {
        $('#' + currentColor).addClass("pressed");
        setTimeout(() => {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    };
    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    };

    function startOver() {
        level = 0;
        gamePattern = [];
        started = true;
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }




