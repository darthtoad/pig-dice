var playerArray = [];
//var currentPlayer = "";
var currentScoreArray = [];
var finalRoundTotal = 0;
var total = 0;
var turn = 1;
var wipe = false;
// var re = /(\[object Object\])/gi;

var Player = function(player) {
  this.totalScore = 0;
  this.name = player;
}

/*function switchPlayer(currentPlayer, playerArray) {
  if (currentPlayer === playerArray[0]) {
    currentPlayer = playerArray[1];
  } else {
    currentPlayer = playerArray[0];
  }
}*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function rollDice(currentScoreArray) {
  //debugger;
  var randomNumber = getRandomIntInclusive(1, 6);
  if (randomNumber !== 1) {
    currentScoreArray.push(randomNumber);
    var roundTotal = 0;
    for (var i in currentScoreArray) {
      roundTotal += currentScoreArray[i];
    }
    console.log(roundTotal);
    return roundTotal;
  } else {
    currentScoreArray.length = 0;
  //  currentScoreArray[0] = 0;
    turn = turn + 1;
    return currentScoreArray;
  }
}

function rollDice2(currentScoreArray) {
  var random1 = getRandomIntInclusive(1, 6);
  var random2 = getRandomIntInclusive(1, 6);
  if (random1 === 1 && random2 === 1) {
    console.log("wipe");
    currentScoreArray.length = 0;
    wipe = true;
    if (turn % 2 === 0) {
      playerArray[1].totalScore = 0;
      turn = turn + 1;
      return 0;
    } else {
      playerArray[0].totalScore = 0;
      turn = turn + 1;
      return 0;
    }
  } else if (random1 === 1 || random2 === 1) {
    currentScoreArray.length = 0;
    turn = turn + 1;
    return currentScoreArray;
  } else {
    var result = 0;
    if (random1 === random2) {
      result = (random1 + random2) * 2
    } else {
      var result = random1 + random2;
    }
    console.log(result);
    currentScoreArray.push(result);
    var roundTotal = 0;
    for (var i in currentScoreArray) {
      roundTotal += currentScoreArray[i];
    }
    console.log(roundTotal);
    return roundTotal;
  }
}

Player.prototype.computer = function(currentScoreArray) {
  var currentScore = rollDice(currentScoreArray);
  if (currentScore > 0) {
    currentScore = rollDice(currentScoreArray);
  }
  console.log(currentScore);
  if (turn % 2 === 0) {
    turn = turn + 1;
  }
  currentScoreArray.length = 0;
  total = 0;
  finalRoundTotal = 0;
  playerArray[1].totalScore = parseInt(playerArray[1].playerParseInt() + currentScore);
  console.log(playerArray[1].totalScore)
  currentScore = 0;
}

Player.prototype.computerHard = function(currentScoreArray) {
  var currentScore = rollDice(currentScoreArray);
  if (currentScore > 0) {
    while (currentScore > 0 && currentScore < 10){
      currentScore = rollDice(currentScoreArray);
    }
  }
  console.log(currentScore);
  if (turn % 2 === 0) {
    turn = turn + 1;
  }
  currentScoreArray.length = 0;
  total = 0;
  finalRoundTotal = 0;
  playerArray[1].totalScore = parseInt(playerArray[1].playerParseInt() + currentScore);
  console.log(playerArray[1].totalScore)
  currentScore = 0;
}

Player.prototype.hold = function(currentScoreArray, playerArray, finalRoundTotal, turn) {
  for (var i in currentScoreArray) {
    finalRoundTotal += currentScoreArray[i];
  }
  var parseIntTotal1 = playerArray[0].playerParseInt();
  var parseIntTotal2 = playerArray[1].playerParseInt();
  // var thing = currentPlayer.totalScore.toString().replace(re, "");
  if (turn % 2 === 0) {
    parseIntTotal2 += finalRoundTotal;
    playerArray[1].totalScore = parseIntTotal2;
  } else {
    parseIntTotal1 += finalRoundTotal;
    playerArray[0].totalScore = parseIntTotal1;
  }

  /*if (currentPlayer === playerArray[0]) {
    currentPlayer = playerArray[1];
  } else {
    currentPlayer = playerArray[0];
  }*/
}

Player.prototype.playerParseInt = function() {
  return parseInt(this.totalScore);
}

// function rollDice(currentPlayer) {
//   var roll = getRandomIntInclusive(1, 6);
//   currentPlayer.roundScore += roll;
// }


//var enterPlayer = function() {}

$(document).ready(function(){
  $("form#players").submit(function(event){
    event.preventDefault();
    $("#round").empty();
    $("#1").empty();
    $("#total1").empty();
    $("#2").empty();
    $("#total2").empty();
    var namePlayer1 = $("input#name1").val();
    var namePlayer2 = $("input#name2").val();
    if (!namePlayer1 || !namePlayer2) {
      alert("Please enter player names");
    } else {
      $("#1").append(namePlayer1);
      $("#2").append(namePlayer2);
      var player1 = new Player(namePlayer1);
      var player2 = new Player(namePlayer2);
      playerArray.push(player1, player2);
      turn = 1;
      alert("Ready");
    }
  })
  $("form#roll").submit(function(event){
    event.preventDefault();
    if (!($("input#name1").val()) || !($("input#name2").val())) {
      alert("Please enter player names");
    } else {
      var currentScore = 0;
      var diceType = $("input:radio[name=dice]:checked").val();
      var player2type = $("input:radio[name=player2]:checked").val();
      if (diceType === "1") {
        currentScore += rollDice(currentScoreArray);
      } else {
        currentScore += rollDice2(currentScoreArray);
      }
      $("#round").empty();
      if (wipe) {
        if (turn % 2 === 0) {
          $("#total1").empty();
          $("#total1").append(0);
        } else {
          $("#total2").empty();
          $("#total2").append(0);
        }
        wipe = false;
      }
      $("#round").append(currentScore);
      if (player2type === "computer" && turn % 2 === 0) {
        playerArray[1].computer(currentScoreArray);
        $("#total2").empty();
        $("#total2").append(playerArray[1].playerParseInt());
        $("#round").empty();
      }
      if (player2type === "hard" && turn % 2 === 0) {
        playerArray[1].computerHard(currentScoreArray);
        $("#total2").empty();
        $("#total2").append(playerArray[1].playerParseInt());
        $("#round").empty();
      }
      if (playerArray[0].totalScore >= 100) {
        alert(playerArray[0].name + " has won!");
        $("#round").empty();
        $("#1").empty();
        $("#total1").empty();
        $("#2").empty();
        $("#total2").empty();
        playerArray = [];
      } else if (playerArray[1].totalScore >= 100) {
        alert(playerArray[1].name + " has won!");
        $("#round").empty();
        $("#1").empty();
        $("#total1").empty();
        $("#2").empty();
        $("#total2").empty();
        playerArray = [];
      } else {
        console.log("consoling logs is nice");
      };
    }
    // $(".total1").empty();
    // $(".")
    //alert(roll);
  })
  $("form#hold").submit(function(event){
    event.preventDefault();
    if (!($("input#name1").val()) || !($("input#name2").val())) {
      alert("Please enter player names");
    } else {
      var player2type = $("input:radio[name=player2]:checked").val();
      if (turn % 2 !== 0) {
        playerArray[0].hold(currentScoreArray, playerArray, finalRoundTotal, turn);
      } else {
        playerArray[1].hold(currentScoreArray, playerArray, finalRoundTotal, turn);
      }
      //currentPlayer.hold(currentScoreArray, playerArray, currentPlayer, finalRoundTotal);
      // var thing = currentPlayer.totalScore.toString.replace(re, "");
      //console.log(thing);
      if (turn % 2 !== 0) {
        $("#total1").empty();
        $("#total1").append(playerArray[0].playerParseInt());
      } else {
        $("#total2").empty();
        $("#total2").append(playerArray[1].playerParseInt());
      }
      finalRoundTotal = 0;
      turn = turn + 1;
      $("#round").empty();
      currentScoreArray.length = 0;
      //currentScoreArray[0] = 0;
      if (player2type === "computer" && turn % 2 === 0) {
        playerArray[1].computer(currentScoreArray);
        $("#total2").empty();
        $("#round").empty();
        $("#total2").append(playerArray[1].playerParseInt());
        console.log(playerArray[1].playerParseInt());
      };
      if (player2type === "hard" && turn % 2 === 0) {
        playerArray[1].computerHard(currentScoreArray);
        $("#total2").empty();
        $("#total2").append(playerArray[1].playerParseInt());
        $("#round").empty();
      }
      if (playerArray[0].totalScore >= 100) {
        alert(playerArray[0].name + " has won!");
        $("#round").empty();
        $("#1").empty();
        $("#total1").empty();
        $("#2").empty();
        $("#total2").empty();
        playerArray = [];
      } else if (playerArray[1].totalScore >= 100) {
        alert(playerArray[1].name + " has won!");
        $("#round").empty();
        $("#1").empty();
        $("#total1").empty();
        $("#2").empty();
        $("#total2").empty();
        playerArray = [];
      } else {
        console.log("consoling logs is nice");
      };
    };
  })
})
