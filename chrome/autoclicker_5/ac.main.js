//ac.main
ac.namespace('ac.main');

//主函数入口。
ac.main = function() {
	//抛出页面内容更新事件。
	ac.e.queue('PageUpdated');
}

//start:
ac.main();