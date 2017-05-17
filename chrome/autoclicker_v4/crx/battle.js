ac.namespace('ac.battle.page')
//
ac.battle.page.detect = function(doc) {
	doc = doc || document;
	return doc.getElementById(ac.symbols.BattleForm.id) != undefined;
}
ac.battle.page.run = function() {
	ac.import('bpViewAddons.js');
	// 导入HV建模。
	ac.import('hv.js');
	// 导入check功能。
	ac.import('bpChecker.js');
	ac.battle.page.hv = ac.hv;
	// 导入ajax功能。
	ac.import('bpAjax.js')
	ac.battle.ajax.ajaxify();
	// 导入声音警示功能。
	ac.import('soundAlert.js');
	// 导入robot功能。
	ac.import('bpRobot.js');
	// 导入统计功能。
	ac.import('bpLog.js');
	ac.import('bpStats.js');
	ac.import('bpStatistic.js');
	// 激发模块就绪事件。
	ac.events.queue('onBattleModuleStarted');
	// 激发onBattlePageUpdated事件。
	ac.events.queue('onBattlePageUpdated');
}
//
ac.main.pages.push(ac.battle.page);

