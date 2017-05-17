//@ sourceURL=bpStats.js
ac.namespace('ac.stats');
ac.namespace('ac.stats.oh');

ac.stats.Avg = function(key, limit) {
	this.key = key;
	this.acum = 0;
	this.avg = 0;
	this.queue = new ac.FixedQueue(limit);
	this.storage = new ac.storage.Item(this.key, this.export({}));
}
ac.stats.Avg.prototype.import = function(po) {
	this.acum = po.acum;
	this.avg = po.avg;
	this.queue.loadFromArray(po.values, po.limit);
}
ac.stats.Avg.prototype.export = function(po) {
	if (!po) po = {};
	po.acum = this.acum;
	po.avg = this.avg;
	po.limit = this.queue.limit;
	po.values = this.queue.getArray();
	return po;
}
ac.stats.Avg.prototype.load = function() {
	var v = this.storage.getValue();
	this.import(v);
}
ac.stats.Avg.prototype.setLimit = function(limit) {
	this.queue.setLimit(limit);
	this.calc();
}
ac.stats.Avg.prototype.setAcum = function(value) {
	this.acum = value;
	this.avg = ac.math.round(this.acum/this.queue.length,1);
	this.storage.save(this.export());
}
ac.stats.Avg.prototype.calc = function() {
	var sum = 0;
	this.queue.forEach(function(value) {
		sum = sum + value;
	}, this);
	this.setAcum(sum);
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
// 对象：武器技能伤害。
ac.stats.oh.skill = {
	items: {
		sb: {
			avg: new ac.stats.Avg('ac.stats.oh.sb', 5)
			,regex: /Shield Bash hits .* for (\d+) .*/
		}
		,vs: {
			avg: new ac.stats.Avg('ac.stats.oh.vs', 5)
			,regex: /Vital Strike hits .* for (\d+) .*/
		}
		,mb: {
			avg: new ac.stats.Avg('ac.stats.oh.mb', 5)
			,regex: /Merciful Blow hits .* for (\d+) .*/
		}
	}
	,load() {
		for (var k in this.items) {
			this.items[k].avg.load();
		}
	}
	,update(hv) {
		var turn = hv.battle.turn;
		if (turn.no == 0) return;
		var events = turn.events;
		for (var i = 0, len = events.length; i < len; i++) {
			ac.object.for_in(this.items, function(k, v) {
				var g = v.regex.exec(events[i].message);
				if (g) {
					v.avg.update(parseInt(g[1]));
				}
			}, this);
		}
	}
	,value(name) {
		var item = this.items[name];
		if (item) {
			return item.avg.value();
		}
	}
}
//
ac.stats.oh.skill.onBattlePageChecked = function () {
	this.update(ac.hv);
}
//
ac.stats.oh.skill.load();
ac.events.subscribe('onBattlePageChecked', ac.stats.oh.skill);