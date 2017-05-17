var otherPageHandler = {
	handle: function() {
		//在右上角显示设置按钮。
		var stuffbox = document.body.getElementsByClassName("stuffbox csp")[0];
		var div = document.createElement("div");
		div.style.cssText="position: absolute;top: 5px;left: 1180px;cursor: pointer;"

		var button = document.createElement("button");
		button.id = 'myautobutton';
		button.innerHTML = "Auto";
		button.onclick = function() {settingsPanel.show();}

		div.appendChild(button);
		stuffbox.insertBefore(div,null);
		
		return true;
	}
}

