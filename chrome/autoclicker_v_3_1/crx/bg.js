function handleMessage(request,sender,sendResponse) {
	if (request.cmd) {
		var cmd = request.cmd;
		switch(request.cmd) {
			case "download":return download(request,sender,sendResponse);
			case "audio":return audio(request,sender,sendResponse);
			default:sendResponse({error:cmd+":尚未实现"}); return false;
		}
	}
}

function audio(request,sender,sendResponse) {
	var src = request.file;
	var audioTag = document.createElement("audio");
	audioTag.src = chrome.extension.getURL(src);
	audioTag.setAttribute("autoplay","autoplay");
	audioTag.onended = function() {
		audioTag.remove();
		sendResponse({});
	}
	document.body.appendChild(audioTag);
	
	return true;
}

function download(request,sender,sendResponse) {
	chrome.downloads.download(request.options,function(id) {
		if (!id) sendResponse({error:chrome.runtime.lastError.message});
		else sendResponse({});
	});
	return true;
}

chrome.runtime.onMessage.addListener(handleMessage);