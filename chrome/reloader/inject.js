var xhr  = new XMLHttpRequest();
xhr.open("get",chrome.extension.getURL("reloader_1.3.3b.js"),true);
xhr.onload = function () {
	if (xhr.status>=200 && xhr.status<400) {
		var scpt = document.createElement('script');
		scpt.innerHTML = xhr.responseText;
		document.body.appendChild(scpt);
	}
}
xhr.send();
