ac.namespace('ac.pony.save')

ac.pony.save.onWhoIsThisPony = function(data) {
	// 下载图片。
	this.download();
}
ac.pony.save.download = function() {
	// 保存小马图片。
	var riddleform = document.getElementById(ac.symbols.RiddleForm.id);
	var imgs = riddleform.getElementsByTagName("img");
	var imgsrc = null;
	var i = imgs.length;
	while(i--) {
		var s = imgs[i].src;
		//if (s.indexOf("=riddlemaster.jpg")>=0) {	// 测试用
		if (s.indexOf("riddlemaster.php")>=0) {
			imgsrc = s;
			break;
		}
	}
	if (imgsrc != null) {
		var a = imgsrc.lastIndexOf("=");
		var b = imgsrc.length;
		var name = imgsrc.slice(a + 1, b);
		name = "pony/"+name+".jpg";
		var options = {
			url:imgsrc
			,filename:name
			,conflictAction:"uniquify"
			,saveAs:false
		};
		chrome.runtime.sendMessage({cmd:"download",options:options}, function(response){
			if (response && response.error) {
				ac.log.error("小马图片没存成功：");
				ac.log.error(response.error);
			}
		});
	}
}
//
ac.events.subscribe('onWhoIsThisPony', ac.pony.save);