if (!this.auto) auto = {};
if (!auto.riddle) auto.riddle={};

auto.riddle.page = {
	
	yes() {
		return document.getElementById("riddleform") != null;
	}
	
	,run() {
		//播放声音提示。
		this.playSound("/content/riddle/horse.ogg");
		
		//保存小马图片。
		this.savePonyPicture();
		
		return true;
	}
	,playSound(filename) {
		var fileurl = chrome.extension.getURL(filename);
		var divAudio = document.createElement("div");
		divAudio.style.cssText = "position: absolute;top: 5px;left: 900px;";
		divAudio.innerHTML = "<audio src='"+fileurl+"' autoplay='autoplay' loop='loop' controls='controls'></audio>";
		document.body.appendChild(divAudio);
	}
	,getPonyImageTag() {
		var riddleform = document.getElementById("riddleform");
		var imgs = riddleform.getElementsByTagName("img");
		for(i=0;i<imgs.length;i++) {
			img = imgs[i];
			if (img && img.src.indexOf("riddlemaster.php")>=0) return img;
		}
		return null;
	}
	,savePonyPicture() {
		var img = this.getPonyImageTag();
		if (img) {
			var src = img.src;
			a = src.lastIndexOf("=");
			b = src.length;
			var name = src.slice(a+1,b);
			name = "pony/"+name+".jpg";
			var options = {
				url:src
				,filename:name
				,conflictAction:"uniquify"
				,saveAs:false
			};
			chrome.runtime.sendMessage({cmd:"download",options:options},function(response){
				if (response && response.error) {
					//alert("小马图片没存成功："+response.error);
					console.log("小马图片没存成功：");
					console.log(response.error);
				}
			});
		}
	}

}

