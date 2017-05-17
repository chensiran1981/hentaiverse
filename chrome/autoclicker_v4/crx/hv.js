//@ sourceURL=hv.js 
ac.namespace('ac.hv');

ac.Gauge = function(value,max) {
	this.set(value, max);
};
ac.Gauge.prototype.set = function(value, max) {
	this.value = parseInt(value); this.max = parseInt(max); 
	this.recalculatePercent();
};
ac.Gauge.prototype.setValue = function(value) {
	this.value = parseInt(value);
	this.recalculatePercent();
}
ac.Gauge.prototype.setMax = function(max) {
	this.max = parseInt(max);
	this.recalculatePercent();
}
ac.Gauge.prototype.setPercent = function(value) {
	this.percent = ac.math.round(value,2);
	this.value = ac.math.round(this.max * this.percent);
}
ac.Gauge.prototype.recalculatePercent = function() {
	if (this.value==0) this.percent = 0;
	else this.percent = ac.math.round(this.value / this.max, 2);
}
ac.Gauge.prototype.copy = function(other) {
	if (other) {
		this.value = other.value;
		this.max = other.max;
		this.percent = other.percent;
	}
}
// 效果名、堆叠层数、持续时间
ac.Effect = function(name) {
	this.name = name;
	this.stack = 0;
	this.duration = 0;
}
ac.Effect.fixedDuration = function(duration, channeling) {
	return channeling ?  Math.ceil(duration / ac.symbols.EChanneling.factor) : duration;
}
ac.Effect.prototype.copy = function(other) {
	if (other) {
		this.name = other.name;
		this.stack = other.stack;
		this.duration = other.duration;
	}
}
// 效果集合。
ac.Effects = function() {
	this.data = {};
}
ac.Effects.prototype.clear = function() {
	this.data = {};
}
ac.Effects.prototype.add = function(effect) {
	this.data[effect.name] = effect;
}
ac.Effects.prototype.name = function(name) {
	if (arguments.length == 0) {
		var ret = {}, k, v;
		for (k in this.data) {
			ret[k] = this.data[k];
		}
		return ret;
	} else {
		return this.data[name];
	}
}
ac.Effects.prototype.copy = function(other) {
	if (other) {
		this.copydata(other.data);
	}
}
ac.Effects.prototype.copydata = function(data) {
	var d = this.data;
	var k, v;
	for(k in data) {
		v = d[k];
		if (!v)  {
			v = new ac.Effect();
			d[k] = v;
		}
		v.copy(data[k]);
	}
}
// 技能
ac.Skill = function(name, id) {
	this.name = name; 
	this.id = id; 
	this.mana = 0; 
	this.overcharge = 0; 
	this.cooldown = 0;
}
// 技能书。
ac.SkillBook = function() {
	this.data = {};
}
ac.SkillBook.prototype.add = function(skill) {
	this.data[skill.name] = skill;
}
ac.SkillBook.prototype.name = function(name) {
	if (name == undefined) {
		var ret = {}, k;
		for (k in this.data) {
			ret[k] = this.data[k];
		}
		return ret;
	} else {
		return this.data[name]
	}
}
// 名字、等级、血量、蓝量、精神、效果、
ac.Creature = function(name) {
	this.name = name;
	this.id = '';
	this.level = 0;
	this.health = new ac.Gauge(0,0);
	this.magic = new ac.Gauge(0,0)
	this.spirit = new ac.Gauge(0,0)
}
ac.Creature.prototype.copy = function(other) {
	if (other) {
		this.name = other.name;
		this.id = other.id;
		this.level = other.id;
		this.health.copy(other.health);
		this.magic.copy(other.magic);
		this.spirit.copy(other.spirit);
	}
}
// Monster继承Creature
ac.Monster = function(name) {
	ac.Creature.call(this, name);
	this.effects = new ac.Effects;
}
ac.Monster.prototype = Object.create(ac.Creature.prototype);
ac.Monster.prototype.consturctor = ac.Monster;
ac.Monster.prototype.copy = function(other) {
	if (other) {
		ac.Creature.prototype.copy.call(this, other);
		this.effects.copy(other.effects);
	}
}
// 怪物数组。
ac.Monsters = function() {
	this.data = [];
}
ac.Monsters.prototype.clear = function() {
	this.data.length = 0;
}
ac.Monsters.prototype.add = function(monster) {
	this.data.push(monster);
}
ac.Monsters.prototype.index = function(index, monster) {
	if (arguments.length == 0) {
		return this.data.slice(0);
	} else if (arguments.length == 1) {
		return this.data[index];
	} else {
		this.data[index] = monster;
	}
}
ac.Monsters.prototype.copy = function(other) {
	if (other) {
		var i = 0, d = this.data, d1 = other.data, len = d1.length;
		var v, v1;
		for(;i<len;i++) {
			v1 = d1[i];	
			v = d[i];
			if (!v) {
				v = new ac.Monster();
				d[i] = v;
			}
			v.copy(v1);
		}
	}
}
ac.Monsters.prototype.hash = function() {
	//按顺序连接所有怪物的名称，计算连接后的字符串的hash值。
	var s = '';
	for(var i=0, len=this.data.length;i<len;i++) {
		s = s + this.data[i].name;
	}
	return ac.hash(s);
}
// 玩家的战斗储物。
ac.Items = function() {
	this.gem = '';
}
// 玩家继承自Creature
ac.Player = function() {
	ac.Creature.call(this, 'player');
	this.overcharge = new ac.Gauge(0, ac.symbols.Overcharge.max);
	this.title = undefined;
	this.stamina = undefined;
	this.spiritStance = false;
	this.items = new ac.Items();
	this.effects = new ac.Effects()
	this.skillBook = new ac.SkillBook();
}
ac.Player.prototype = Object.create(ac.Creature.prototype);
ac.Player.prototype.consturctor = ac.Player;
ac.Player.prototype.commit = function(symbol) {
	ac.log.debug('commit : '+symbol.name);
}
ac.Player.prototype.target = function(monster) {
	ac.log.debug('target : '+monster.name);
}
// 战斗事件。
ac.BattleEvent = function(turn, no, message) {
	this.turn = turn;
	this.no = no;
	this.message = message;
}
// 回合记录。
ac.Turn = function() {
	this.no = undefined;
	this.events = [];
}
// 战斗现场。
ac.Battle = function() {
	this.player = new ac.Player();
	this.round = undefined;
	this.totalRounds = undefined;
	this.turn = new ac.Turn();
	this.monsters = new ac.Monsters();
}
ac.Battle.prototype.turnHash = function() {
	return this.monsters.hash() + ' ' + this.turn.no;
}

