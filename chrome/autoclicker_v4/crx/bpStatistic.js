//@ sourceURL=bpStatistic.js
ac.namespace('ac.stats')

//
ac.stats.Avg = function(limit) {
	this.avg = 0;
	this.queue = new ac.FixedQueue(limit);
}
ac.stats.Avg.prototype.import = function(po) {
	this.avg = po.avg;
	this.queue.loadFromArray(po.values, po.limit);
}
ac.stats.Avg.prototype.export = function(po) {
	if (!po) po = {};
	po.avg = this.avg;
	po.limit = this.queue.limit;
	po.values = this.queue.getArray();
	return po;
}
ac.stats.Avg.prototype.calc = function() {
	var sum = 0, i = 0;
	this.queue.forEach(function(value) {
		sum = sum + value;
		i++;
	}, this);
	this.avg = ac.math.round(sum / i,1);
}
ac.stats.Avg.prototype.update = function(newValue) {
	this.queue.push(newValue);
	this.calc();
}
ac.stats.Avg.prototype.value = function() {
	return this.avg;
}
// challenge, rounds,  turns, attack, killed, damage
ac.stats.a = {
	item : new ac.storage.Item('ac.stats.a', {})
	,onNewRound : function(event) {
		if (event.round == 1) {
			var data = this.item.value;
			data.challenge = event.challenge;
			data.rounds = 1;
			data.turns = 0;
			data.damage = 0;
		} else {
			var data = this.item.value;
			data.rounds++;
		}
		this.item.save();
	}
	,onNewTurn : function(event) {
		if (event.turn > 0) {
			var data = this.item.value;
			if (!data.turns) data.turns = 0;
			data.turns++ ;
			this.item.save();
		}
	}
	,onDamage : function(event) {
		var data = this.item.value;
		if (!data.damage) data.damage = 0;
		data.damage += parseInt(event.damage);
		this.item.save();
	}
	,onKill : function(event) {
		var data = this.item.value;
		if (!data.killed) data.killed = 0;
		data.killed += 1;
		this.item.save();
	}
}
//
ac.events.subscribe('onNewTurn', ac.stats.a);
ac.events.subscribe('onNewRound', ac.stats.a);
ac.events.subscribe('onDamage', ac.stats.a);
ac.events.subscribe('onKill', ac.stats.a);
// 统计各项技能最近10次伤害的均值。
ac.stats.b = {
	item : new ac.storage.Item('ac.stats.b', {})
	,onDamage : function(event) {
		var value = this.item.value;
		var avgdata = value[event.subject];
		if (!avgdata) {
			avgdata = {};
			value[event.subject] = avgdata;
		}
		var avg = new ac.stats.Avg(10);
		avg.import(avgdata);
		avg.update(event.damage);
		avg.export(avgdata);
		this.item.save();
	}
}
ac.events.subscribe('onDamage', ac.stats.b);
//
