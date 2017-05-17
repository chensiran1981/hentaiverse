var data = {
	
}

var options = {
	debug:false
}

/*
	Battle:{name,start,end,rounds}
	Round:{index,turns}
	Turn:{index,events}
	Event:{order,log}
	Frame:{......}
*/

var battle = {
	rounds:[]
}

var round = {
	turns:[]
}

var turn = {
	events:[]
	,frame:{}
}

function handleMessage(request,sender,sendResponse) {
	if (request.cmd) {
		var cmd = request.cmd;
		switch(request.cmd) {
			case "download":return download(request,sender,sendResponse);
			case "playSound":return playSound(request,sender,sendResponse);
			case "get":return onGet(request,sender,sendResponse);
			case "post":return onPost(request,sender,sendResponse);
			default:sendResponse({error:cmd+":尚未实现"}); return false;
		}
	}
}

function onGet(request,sender,sendResponse) {
	var file = request.file;
	switch(file) {
		case "options":{
			options.debug  = localStorage.getItem('auto.debug') == 'true' ? true : false;
			sendResponse(options);
		}
	}
}

function download(request,sender,sendResponse) {
	chrome.downloads.download(request.options,function(id) {
		if (!id) sendResponse({error:chrome.runtime.lastError.message});
		else sendResponse({});
	});
	return true;
}

function playSound(request,sender,sendResponse) {
	var type = request.type;
	switch(type) {
		case "battleVictory": {
			audio("battleVictory.mp3");break;
		}
		case "defeated":{
			audio("defeated.mp3");break;
		}
		default:sendResponse({error:type+"类型不知道如何处理。"});
	}
	return false;
}

function audio(src) {
	var audioTag = document.createElement("audio");
	audioTag.src = src;
	audioTag.autoplay = "autoplay";
	audioTag.onended = function() {
		document.body.removeChild(audioTag);
	}
	document.body.appendChild(audioTag);
}

chrome.runtime.onMessage.addListener(handleMessage);