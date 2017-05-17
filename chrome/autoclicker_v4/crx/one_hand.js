ac.namespace('ac.one_hand');

ac.modules.import('Heal');
ac.modules.import('Buff');

// 短名
ac.oh = ac.one_hand;

ac.oh.defaultPriority = {
	"Manbearpig":2	,"White Bunneh":2	,"Mithra":2	,"Dalek":2
	
	,"Konata":3	,"Mikuru Asahina":3	,"Ryouko Asakura":3	,"Yuki Nagato":3
	
	,"Yggdrasil":0	//这丫会给其他怪加血，先揍它。
	,"Skuld":9	,"Urd":9	,"Verdandi":9		//这些怪死后会给其他怪加buff，放在最后杀。
	
	,"Rhaegal":5	,"Viserion":5	,"Drogon":5
	
	,"Real Life":6	,"Invisible Pink Unicorn":6	,"Flying Spaghetti Monster":6

	,"normal" : 8
}

ac.oh.onFight = function(cxt) {
	return return ac.heal.execute() || ac.buff.execute() || this.attack(cxt);
}
ac.oh.attack = function(cxt) {

}
ac.oh.chooseTarget = function(cxt) {
	var target=null,min=99;
	// var list = laoxu.monsters.getList()
	var monsters = cxt.battlePage.monsters;
	var i = list.length;
	while(i--) {
		var monster = list[i];
		var name = monster.name;
		var p = _this.parameters.priority(name);
		if (p == 0) {
			target = monster;
			return true;
		} else if (p < min) {
			target = monster;
			min = p;
		}
	// });
	}
	return target;
}

ac.oh.start = function() {
	ac.modules.Heal.start();
	ac.modules.Buff.start();
	//初始化
	ac.oh.priorityConfig = new ac.config.Configuration('ac.oh.priority', ac.oh.defaultPriority);
	ac.buff.setBuffList(this.getBuffList());
	// 装配事件。
	ac.events.subscribe('onFight', this);
}

