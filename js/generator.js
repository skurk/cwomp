/*
	This function generates random callsigns based on the selected
	difficulty. Consider this a starting point; feel free to improvise
	as needed. These were simply the settings I preferred at the time
	of making this game.
*/

function generateRandomCallsign()
{
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var randomNumber = Math.floor(Math.random()*9);
	var randomSuffixLength = 0;
	var randomPrefixList = prefixes.length;

	switch(difficulty)
	{
		case 0:
			randomSuffixLength = Math.floor(Math.random()*1)+1;
			randomPrefixList = singleCharacterPrefixes;
			break;
		case 1:
			randomSuffixLength = Math.floor(Math.random()*2)+1;
			break;
		case 2:
			randomSuffixLength = Math.floor(Math.random()*3)+1;
			break;
		case 3:
			randomSuffixLength = Math.floor(Math.random()*3)+1;
			break;
	}

	randomPrefix = prefixes[Math.floor(Math.random()*randomPrefixList)];

	// If prefix ends with number (e.g. "VP8") do not append any more
	if(Number.isInteger(parseInt(randomPrefix.substr(-1))))
	{
		randomNumber = "";
	}

	var randomSuffix = "";

	for(i=0; i<randomSuffixLength; i++)
	{
		randomSuffix += chars[Math.floor(Math.random()*chars.length)];
	}

	if(difficulty == 3)
	{
		if(Math.random()>0.75)
		{
			var rnd = Math.random()*4;
			switch(rnd)
			{
				case 0:
					randomSuffix += "/A";
					break;
				case 1:
					randomSuffix += "/M";
					break;
				case 2:
					randomSuffix += "/MM";
					break;
				default:
					randomSuffix += "/P";
					break;
			}
		}
	}


	var randomCallsign = randomPrefix + randomNumber + randomSuffix;
	callsignSent = randomCallsign;
}

