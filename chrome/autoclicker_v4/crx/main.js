ac.namespace('ac.main');

ac.main.pages = [];

ac.main.onBoot = function () {
	this.pages.some(function(page) {
		if (page.detect && page.detect(document)) {
			page.run();
			return true;
		}
	});
}
ac.events.subscribe('onBoot', ac.main);
ac.events.queue('onBoot');
