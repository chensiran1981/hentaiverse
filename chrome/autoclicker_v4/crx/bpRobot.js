//@ sourceURL=bpRobot.js
ac.namespace('ac.battle.robot');

ac.battle.robot.run = function() {
	var dialog = ac.battle.page.dialog, cdialog = dialog.continueDialog;
	if (cdialog) {
		if (cdialog.victory) ac.events.fire('onRoundCleared');
		if (cdialog.victory && cdialog.battleEnd) ac.events.fire('onChallengeCleared');
		if (cdialog.victory && !cdialog.battleEnd) cdialog.click();
		if (!cdialog.victory)  ac.events.fire('onDefeated');
	} else {
		ac.events.fire('onFight');
	}
}

ac.battle.robot.aimap = {
	'onehand' : 'bpOneHand.js'
}
ac.battle.robot.aiconfig = new ac.storage.Item('ac.ai', '');

ac.battle.robot.onBattleModuleStarted = function() {
	// 导入AI功能。
	var name = this.aiconfig.getValue();
	var js = this.aimap[name];
	if (js) {
		ac.import(js);
	}
}

ac.battle.robot.defaultKeyMode = {
	yes: false
	,code : 46
};
ac.battle.robot.keyModeItem = new ac.storage.Item('ac.keymode', ac.battle.robot.defaultKeyMode);
ac.battle.robot.onBattlePageChecked = function () {
	// 区分按键激发和自动激发。
	var mode = this.keyModeItem.getValue();
	if (mode.yes) {
		var _this = this;
		document.addEventListener('keypress',function fn(e){
			if (e.keyCode == mode.code) {
				document.removeEventListener('keypress',fn);
				_this.run();
			}
		});
	} else {
		this.run();
	}
}
//
ac.events.subscribe('onBattleModuleStarted', ac.battle.robot);
ac.events.subscribe('onBattlePageChecked', ac.battle.robot, 'last');