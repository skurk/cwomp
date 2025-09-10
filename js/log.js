
function clearLog()
{
	var ta = document.getElementById("log");
	ta.value = "";
}

function logLine(text)
{
	var ta = document.getElementById("log");
	ta.value += text.trim() + "\r\n";
	ta.scrollTop = ta.scrollHeight;
}

