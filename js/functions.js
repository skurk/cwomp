/*
  Various game related functions for this and that.
  It's apparent that I'm not a front-end developer by trade.
*/

var claimedScore = 0;
var totalScore = 0;
var callsignSent = "";
var roundCounter = 0;
var difficulty = 0;
var speed = 20;
var audioInitialized = 0;
var selectedDifficulty = 0;
var selectedSpeed = 20;
var noPointsAlerted = 0;

function flashText(id, col) {
	var element = document.getElementById(id);
	element.style.color = col;
    setTimeout(() => { element.style.color = '#ffff00'; }, 500);
}

function reduceClaimedScore(withSound=1)
{
	if(withSound)
	{
		stopPlaying();
		document.getElementById("wrong").play();
	}
	else
	{
		stopPlaying();
		document.getElementById("replay").play();
	}

	if(claimedScore > 0)
	{
		claimedScore--;
	}
	flashText("claimed", "#ff0000");
}

function addToTotalScore()
{
	stopPlaying();
	document.getElementById("correct").play();
	totalScore += claimedScore;
	flashText("score", "#00ff00");
}

function updateScore()
{
	document.getElementById("score").innerHTML = "Score: " + totalScore;
	document.getElementById("claimed").innerHTML = "Claimed: " + claimedScore;
	document.getElementById("guess").focus();
}

function stopPlaying()
{
	var t = ctx.currentTime;
	gainNode.gain.cancelScheduledValues(t);
	gainNode.gain.setValueAtTime(0, t);
}

function playCallsign()
{
	stopPlaying();

	var cwStream = [];
	for(i=0; i<callsignSent.length; i++)
	{
		cwStream.push(cwlookup.filter(v=>v[0].toUpperCase() === callsignSent[i].toUpperCase()));
	}

	cwKeyString(cwStream.join(" "));
}

function nextRound(clear=0)
{
	noPointsAlerted = 0;
	roundCounter++;

	if(clear == 0)
	{
		clearLog();
	}

	logLine("----------- Round " + roundCounter + " ----------------");
	claimedScore = 3;
	document.getElementById("guess").value = "";
	updateScore();
	generateRandomCallsign();
	playCallsign();
}

function repeatCallAndDeductScore(withSound=1)
{
	reduceClaimedScore(withSound);

	if(claimedScore == 0)
	{
		if(noPointsAlerted == 0)
		{
			logLine("");
			logLine("Sorry! The correct call was " + callsignSent + "!");
			logLine("Keep trying for as long as you like, but no score will be added.");
			logLine("Hit the \"Give up\" button to move on.");
			noPointsAlerted = 1;
		}

		updateScore();
		setTimeout(playCallsign, 1000);
	}
	else
	{
		logLine("Incorrect, 1 point deducted");
		updateScore();
		setTimeout(playCallsign, 1000);
	}
}

function giveUpSendNextCall()
{
	logLine("You gave up! The correct call was " + callsignSent + ".");
	setTimeout(nextRound, 1000);

}

function validateSubmittedCall(guess, correct)
{
	stopPlaying();

	guess = guess.trim().toUpperCase();
	correct = correct.trim().toUpperCase();
	if(guess == correct)
	{
		logLine(callsignSent + " was correct! " + (claimedScore) + " points added to your total score.");
		addToTotalScore();
		setTimeout(nextRound, 1000);
	}
	else
	{
		repeatCallAndDeductScore();
	}
}

function submitFromButton()
{
	var input = document.getElementById("guess").value;
	validateSubmittedCall(input, callsignSent);
}

function submit(input)
{
	if(event.key === 'Enter')
	{
		validateSubmittedCall(input.value, callsignSent);
	}
}

function setDifficulty()
{
	var selectBox = document.getElementById("difficulty");
	selectedDifficulty = selectBox.options[selectBox.selectedIndex].value;
}

function setSpeed()
{
	var selectBox = document.getElementById("speed");
	selectedSpeed = selectBox.options[selectBox.selectedIndex].value;
}

