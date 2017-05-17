//  事件转译
//
log 
// 系统定义
log parse system = {
	// 事件转译。
	translate(hv)
	// event : round, challenge, total
	,onNewRound(event)
	// event : turn no, action_type[attact, heal, buff, mode]
	,onNewTurn(event)
	// event: 
	,onKillMonster(event)
	// event: damage
	,onDamage(event)
}
// 细分onDamage事件。
subdivision of onDamage = {
	onDamage(event)
	// event from onDamage。
	translate(event)
	//
	onShieldBash(event)
	onVitalStrike(event)
	onMercifulBlow(event)
}
//
system = {
	,translate(hv) {

	}
	onBattlePageChecked() {
		//记录挑战名。
		//  挑战名位于首轮首回合的编号1事件里。
		//  1st round && 1st turn && 1st event
		//  Initializing random encounter ...
		//  Initializing arena challenge #21 (Round 34 / 65) ...
		//记录轮数。
		//  每当发生新轮事件，轮数+1。
		//记录回合数。
		//  每当发生新的回合，回合数+1。
		//记录攻击次数。
		//  抛出治疗、使用物品操作后，纯粹的攻击动作引发的回合数。
		//记录杀死的怪物数。
		//  每个回合的日志里包含怪物死亡事件。
		//记录总伤害。
		//  每个日志里包含具体的伤害信息。
	}	
}
//
eNewRound = {
	ra = ''
	rb = ''
	,trigger(battleEvent, hv) {
		var msg = battleEvent.message;
		if (ra == msg) {

		} else if () {

		}
		return false;
	}
}
eNewTurn = {}
eKillMonsster = {}
eDamage = {}
system = {
	triggers : new Triggers()
	,onBattlePageChecked(data) {
		// 遍历日志。
		// 对每条日志调用triggers.trigger(log)方法。
	}
}
// 细分damage事件。
eShieldBash = {
	trigger(data) {

	}
}
system = {
	triggers: new Triggers()
	,onDamage(event) {
		triggers.trigger(event);
	}
}
// 统计。
challenge = {
	name : {
		name : ''
		,onNewRound() {}
	}
	,rounds : {
		rounds : 0
		,onNewRound() {}
	}
	,turns : {
		turns : 0
		,onNewRound(data) {
		}
		,onNewTurn(data) {
		}
	}
	,killedMonsters : {
		killedMonsters : 0
	}
	,hits : {
		hit : 0
		crit : 0
		miss : 0
	}
	,damage : {
		total : 0
		over : 0
	}
}



ac.stats.Variable = function() {
}
ac.stats.Variable.prototype.update = function(value) {
	this.value = value;
}
ac.stats.Variable.prototype.export = function(data) {
	if (!data) data = {};
	data.value = this.value;
	return data;
}
ac.stats.Variable.prototype.import = function(data) {
	if (data) {
		this.value = data.value;
	}
}
//
ac.stats.Avg = function(limit) {
	this.acum = 0;
	this.avg = 0;
	this.queue = new ac.FixedQueue(limit);
}
ac.stats.Avg.prototype.import = function(data) {
	if (data) {
		this.acum = data.acum;
		this.avg = data.avg;
		this.queue.loadFromArray(data.values, data.limit);
	}
}
ac.stats.Avg.prototype.export = function(data) {
	if (!data) data = {};
	data.acum = this.acum;
	data.avg = this.avg;
	data.limit = this.queue.limit;
	data.values = this.queue.getArray();
	return data;
}
ac.stats.Avg.prototype.setLimit = function(limit) {
	this.queue.setLimit(limit);
	this.calc();
}
ac.stats.Avg.prototype.calc = function() {
	var sum = 0;
	this.queue.forEach(function(value) {
		sum = sum + value;
	}, this);
	this.setAcum(sum);
}
ac.stats.Avg.prototype.setAcum = function(value) {
	this.acum = value;
	this.avg = ac.math.round(this.acum/this.queue.length,1);
}
ac.stats.Avg.prototype.update = function(newValue) {
	var del = this.queue.push(newValue);
	var sum = this.acum + newValue;
	if (del) {
		sum = sum - del;
	}
	this.setAcum(sum);
}
ac.stats.Avg.prototype.value = function() {
	return this.avg;
}
//
ac.stats.Item = function(storage, vars) {
	this.storage = storage;
	this.vars = vars;
}
ac.stats.Item.prototype.prepare = function() {
	var data = this.storage.getValue();
	ac.object.for_in(this.vars, function(key, var) {
		var.import(data[key]);
	});
}
ac.stats.Item.prototype.update = function(hv) {
	ac.object.for_in(this.vars, function(key, var) {
		var.update(hv);
	});
	this.save();
}
ac.stats.Item.prototype.save = function() {
	var data = this.storage.getValue();
	ac.object.for_in(this.vars, function(key, var) {
		var.export(data[key]);
	});
	this.storage.save();
}
// 通用统计：挑战名、轮数、回合数、攻击数、杀死怪物数、总伤害数。
ac.stats.common.vChallenge = {
	import(data) {

	}
	,export(data) {
		if (!data) data = {};
		data.name = this.name;
		data.round = this.round;
		data.totalRound = this.totalRound;
		data.turns = this.turns;
		data.hits = this.hits;
		data.monsters = this.monsters;
		data.
	}
	,update(hv) {

	}
}
ac.stats.common.vChallenge = {
	vName:
	vRound: {
		update(hv) {
			var hash = hv.battle.monsters.hash();
			var savedHash = 
			var savedTurn = 
		}
	}
	vTurn:
}
//
ac.stats.common = new ac.stats.Item(new ac.storage.Item('ac.stats.common'), {});
ac.stats.common.vars.challenge = ac.stats.common.vChallenge;
ac.stats.common.prepare();
//
ac.stats.logParser = {
	patterns : {
		p0 : {
			ra:'Initializing random encounter ...'
			,rb:new ac.NamedRegex(/Initializing (.+)\(Round (\d+) \/ (\d+)\)/, ['challenge', 'round', 'totalRound'])
			,exec(event) {
				var msg = event.message;
				var data = {};
				if (msg == ra) {
					data.type = ac.symbols.RoundStart;
					data.challenge=ac.symbols.RandomEncounter.name;
					data.round=1;
					data.totalRound=1;
					event.data = data;
					return true;
				}
				if (rb.exec(msg, data)) {
					data.type = ac.symbols.RoundStart;
					event.data = data;
					return true;
				}
				return false;
			}
		}
	}
	,process(hv) {
		var events = hv.battle.turn;
		for (var i=0,len=events.length;i<len;i++) {
			ac.object.some(this.patterns, function(key, value) {
				return value.exec(events[i]);
			});
		}
	}
}
//
ac.stats.onBattlePageChecked = function() {
	this.logParser.process(ac.hv);
	this.common.update(ac.hv);
}
//
ac.events.subscribe('onBattlePageChecked', ac.stats);


