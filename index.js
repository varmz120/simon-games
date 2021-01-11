$(".play-again").hide();
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelCount = -1;
var level = "level";
var press = true;

function nextSequence() {
  var randomnumber = Math.floor(Math.random() * (4 - 0));

  var randomChosenColour = buttonColours[randomnumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
  levelCount++;
  $("#level-title").text(level + " " + levelCount);


}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(this);
  checkAnswer();


})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed")
  }, 100);

}

$(document).keydown(function() {
  if (press === true) {
    nextSequence();
    $(".how-to-play").hide();
    press = false;
  }
});


function arrayEqualChecker(array1, array2) {
  var a = 0;

  for (var i = 0; i < array1.length; i++) {
    if (array1[i] === array2[i]) {
      a++;
    }

    else {
      return false;
    }

  }
  if (a === array1.length) {
    return true;
  }



}


function checkAnswer() {
  var equal = arrayEqualChecker(userClickedPattern, gamePattern);
  if (userClickedPattern.length !== gamePattern.length) {
    if (equal === false) {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").html("game over!" + "<br>" + "<br>" + "press any key to play again");

      restartGame();







    }

    return false;
  }
  if (userClickedPattern.length === gamePattern.length) {
    if (equal === true) {
      $("#level-title").html("success");
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);

    }

    else {
      playSound("wrong");
      $("#level-title").html("game over!" + "<br>" + "<br>" + "press any key to play again");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      restartGame();








    }
    return false;
  }

}

function restartGame() {
  levelCount = -1;
  userClickedPattern = [];
  gamePattern = [];
  press = true;
}
