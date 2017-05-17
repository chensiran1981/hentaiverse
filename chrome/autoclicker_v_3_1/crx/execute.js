// 执行脚本。
ac.BattleModule = {
	handle(doc) {
		var ret = true, d = doc || document;
		if (d.getElementById(GDT.BattleForm.id) != null) {
			// ac.util.import('battle.js');
			events.fire('onBattlePageStarted');
			events.fire('onBattlePageUpdated');
		} else if (d.getElementById(GDT.RiddleForm.id) != null) {
			// ac.util.import('battle.js');
			events.fire('onWhoIsThisPony');
		} else {
			ret = false;
		}
		return ret;
	}
}

ac.modules = [ac.BattleModule];
ac.modules.some(function(module) {
	return module.handle();
}) 
