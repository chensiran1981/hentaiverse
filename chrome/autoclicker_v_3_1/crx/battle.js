// BattlePage模块


// 效果名、堆叠层数、持续时间
ac.Effect = function(name) {
	this.name = name;
	this.stack = 0;
	this.duration = new Gauge(0,0);
}

// 效果集合
ac.Effects = function() {}

// 名字、等级、血量、蓝量、精神、效果、
ac.Creature = function(name) {
	this.name = name;方法
	this.level = 0;
	this.health = new Gauge(0,0);
	this.magic = new Gauge(0,0)
	this.spirit = new Gauge(0,0)
	this.effects = new ac.Effects();
}

// Player继承Creature
ac.Player = function() {
	ac.Creature.call(this, 'player');
	this.overcharge = new Gauge(0,0); this.title = GDT.Newbie; this.spells = {};
}
ac.Player.prototype = Object.create(ac.Creature.prototype);
ac.Player.prototype.consturctor = ac.Player;

// Monster继承Creature
ac.Monster = function(name) {
	ac.Creature.call(this, name);
}
ac.Monster.prototype = Object.create(ac.Creature.prototype);
ac.Monsters.prototype.consturctor = ac.Monsters;

// 怪物集合
ac.Monsters = function() {}

// 现场数据
ac.Battle = function() {
	this.roundno = -1; this.turnno = -1;
	this.player = new ac.Player();
	this.monsters = new ac.Monsters();
	events.subscribe('onBattlePageUpdated', this);
}
ac.Battle.prototype.onBattlePageUpdated = function() {		
	// check 
};