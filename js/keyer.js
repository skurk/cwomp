const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const osc = ctx.createOscillator();
const gainNode = ctx.createGain();

const DOT		= 1;
const DASH		= 3;
const SPACE		= 3;
const NEXT		= DOT;

function initializeAudio()
{
	if(audioInitialized == 0)
	{
		osc.type = "sine";
		osc.frequency.value = 600;
		osc.connect(gainNode);
		osc.start();
		gainNode.connect(ctx.destination);
		gainNode.gain.value = 0;
		audioInitialized = 1;
	}
	else
	{
		if(!confirm("Restart game?"))
		{
			return;
		}
	}

	claimedScore = 0;
	totalScore = 0;
	callsignSent = "";
	roundCounter = 0;
	difficulty = parseInt(selectedDifficulty);
	speed = parseInt(selectedSpeed);

	clearLog();

	var welcomeText = "Starting new game, difficulty: ";
	switch(difficulty)
	{
		case 0:
			welcomeText += "easy (1x1)";
			break;
		case 1:
			welcomeText += "beginner (up to 2x2)";
			break;
		case 2:
			welcomeText += "medium (up to 2x3)";
			break;
		case 3:
			welcomeText += "expert (up to 2x3 including /M, /P etc)";
			break;
	}
	logLine(welcomeText);
	
	const divCss = document.querySelectorAll('div.game');
	divCss.forEach(element => {
		element.style.visibility = 'visible';
	});

	updateScore();
	setTimeout(nextRound, 1000, 1);
}

/*
	The following function is based on the borderline brilliant idea
	by Stuart Wakefield, shamelessly ripped from this Stack Overflow thread:
	https://stackoverflow.com/questions/54096028/repeat-an-audiocontext-oscillator-every-5-seconds
*/

function cwKeyString(stream) {
	var SPEED = 1.2/speed;
	let t = ctx.currentTime;
	gainNode.gain.setValueAtTime(0, t);
	for (var i = 0; i < stream.length; i++) {
		switch(stream.charAt(i)) {
			case ".":
				gainNode.gain.setValueAtTime(1, t);
				t += DOT * SPEED;
				gainNode.gain.setValueAtTime(0, t);
				t += NEXT * SPEED;
				break;
			case "-":
				gainNode.gain.setValueAtTime(1, t);
				t += DASH * SPEED;
				gainNode.gain.setValueAtTime(0, t);
				t += NEXT * SPEED;
				break;
			case " ":
				t += SPACE * SPEED;
				break;
		}  
	}
}
