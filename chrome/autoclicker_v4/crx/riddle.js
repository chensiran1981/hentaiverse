ac.namespace('ac.riddle.page')

ac.riddle.page.detect = function (doc) {
	doc = doc || document;
	return doc.getElementById(ac.symbols.RiddleForm.id) != undefined;
}

ac.riddle.page.run = function() {
	ac.import('soundAlert.js');
	ac.import('ponyPicSaver.js');
	// onWhoIsThisPony事件。
	ac.events.queue('onWhoIsThisPony');
}
//
ac.main.pages.push(ac.riddle.page);