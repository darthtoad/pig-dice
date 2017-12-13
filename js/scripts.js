var playerArray = [];
//var currentPlayer = "";
var currentScoreArray = [];
var finalRoundTotal = 0;
var total = 0;
var turn = 1;
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

  if (playerArray[0].totalScore >= 100) {
    alert(playerArray[0].name + " has won!");
  } else if (playerArray[1].totalScore >= 100) {
    alert(playerArray[1].name + " has won!");
  } else {
    turn = turn + 1;
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
    $("#1").append(namePlayer1);
    $("#2").append(namePlayer2);
    var player1 = new Player(namePlayer1);
    var player2 = new Player(namePlayer2);
    playerArray.push(player1, player2);
    turn = 1;
    //currentPlayer = player1;
    //console.log(currentPlayer);
    alert("Ready");
  })
  $("form#roll").submit(function(event){
    event.preventDefault();
    var player2type = $("input:radio[name=player2]:checked").val();
    var currentScore = rollDice(currentScoreArray);
    $("#round").empty();
    $("#round").append(currentScore);
    if (player2type === "computer" && turn % 2 === 0) {
      playerArray[1].computer(currentScoreArray);
      $("#total2").empty();
      $("#total2").append(playerArray[1].playerParseInt());
      $("#round").empty();
    }
    // $(".total1").empty();
    // $(".")
    //alert(roll);
  })
  $("form#hold").submit(function(event){
    event.preventDefault();
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
    if (playerArray[0].totalScore >= 100) {
      alert(playerArray[0].name + " has won!");
      $("#round").empty();
      $("#1").empty();
      $("#total1").empty();
      $("#2").empty();
      $("#total2").empty();
      playerArray = [];
    }
    if (playerArray[1].totalScore >= 100) {
      alert(playerArray[1].name + " has won!");
      $("#round").empty();
      $("#1").empty();
      $("#total1").empty();
      $("#2").empty();
      $("#total2").empty();
      playerArray = [];
    };
  })
})
