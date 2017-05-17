//@ sourceURL=bpOneHand.js
// AI Handler
ac.namespace('ac.battle.oh');

ac.import('bpHeal.js');
ac.import('bpBuff.js');

ac.battle.oh.defaultConfiguration = {
	buffs:{}
	,priority:{}
	,hp:{}
	,mp:{}
	,sp:{}
	,sps:245
};
var g = ac.battle.oh.defaultConfiguration.buffs;
var s = ac.symbols;
// 增益效果。
g[s.EHeartseeker.name] = true;
g[s.EArcaneFocus.name] = false;
g[s.ESpiritShield.name] = true;
g[s.ESparkOfLife.name] = true;
g[s.EShadowVeil.name] = true;
g[s.EHaste.name] = true;
g[s.EProtection.name] = true;
g[s.EAbsorb.name] = false;
g[s.ERegen.name] = true;
g[s.ERefreshment.name] = true;
g[s.EReplenishment.name] = true;
g[s.ERegeneration.name] = true;
// 怪物优先级。
g = ac.battle.oh.defaultConfiguration.priority;
s = ac.symbols.Bosses;
g[s.Manbearpig.name] = 7;
g[s.WhiteBunneh.name] = 7;
g[s.Mithra.name] = 7;
g[s.Dalek.name] = 7;
g[s.Konata.name] = 6;
g[s.MikuruAsahina.name] = 5;
g[s.RyoukoAsakura.name] = 5;
g[s.YukiNagato.name] = 5;
g[s.Yggdrasil.name] = 0;
g[s.Skuld.name] = 9;
g[s.Urd.name] = 9;
g[s.Verdandi.name] = 9;
g[s.Rhaegal.name] = 4;
g[s.Viserion.name] = 4;
g[s.Drogon.name] = 4;
g[s.RealLife.name] = 3;
g[s.InvisiblePinkUnicorn.name] = 2;
g[s.FlyingSpaghettiMonster.name] = 1;
g.others = 99;
// 血线、蓝线、精神线
g = ac.battle.oh.defaultConfiguration.hp;
s = ac.symbols;
g[s.HealthDraught.name] = 0.8;
g[s.HealthGem.name] = 0.7;
g[s.Regen.name] = 0.6;
g[s.Cure.name] = 0.5;
g[s.HealthPotion.name] = 0.5;
g[s.FullCure.name] = 0.1;
g[s.HealthElixir.name] = 0;
g[s.LastElixir.name] = 0;
g = ac.battle.oh.defaultConfiguration.mp;
g[s.ManaDraught.name] = 0.8;
g[s.ManaGem.name] = 0.7;
g[s.ManaPotion.name] = 0.5;
g[s.ManaElixir.name] = 0;
g[s.LastElixir.name] = 0;
g = ac.battle.oh.defaultConfiguration.sp;
g[s.SpiritDraught.name] = 0.8;
g[s.SpiritGem.name] = 0.7;
g[s.SpiritPotion.name] = 0.5;
g[s.SpiritElixir.name] = 0;
g[s.LastElixir.name] = 0;

ac.battle.oh.configItem = new ac.storage.Item('ac.oh', ac.battle.oh.defaultConfiguration);
ac.battle.oh.prepare = function() {
	var config = this.configItem.getValue();
	// 设置血线。
	var ah = ac.battle.ai.heal;
	ah.healthLines.set(config.hp);
	ah.magicLines.set(config.mp);
	ah.spiritLines.set(config.sp);
	// 设置需要自动补哪些BUFF。
	var ab = ac.battle.ai.buff;
	ab.overcharge = config.sps;
	var k, buffs = config.buffs;
	for (k in buffs) {
		ab.enable(k, buffs[k])
	}
	// 缓存配置数据。
	this.cachedConfig = config;
}
ac.battle.oh.attack = function() {
	return this.sb() || this.vs() || this.mb() || this.pg();
}
ac.battle.oh.priority = function(monster) {
	var ret = this.cachedConfig.priority[monster.name];
	if (ret === undefined) {
		ret = this.cachedConfig.priority.others;
	}
	return ret;
}
ac.battle.oh.chooseTarget = function() {
	var target=null,min=999;
	var list = ac.hv.battle.monsters.index();
	var i = 0, len = list.length, mon, p;
	for(;i<len;i++) {
		var mon = list[i];
		if (mon.alive) {
			p = this.priority(mon);
			if (p == 0) {
				target = mon;
				return target;
			} else if (p < min) {
				target = mon;
				min = p;
			}
		}
	}
	return target;
}
ac.battle.oh.sb = function() {
	var target = this.chooseTarget();
	var e = target.effects.name(ac.symbols.EStunned.name);
	e = e ? e.duration : 0;
	var player = ac.hv.battle.player;
	return (e == 0 || e >= 2) 
		&& player.overcharge.value >= 25
		&& player.spiritStance 
		&& player.commit(ac.symbols.ShieldBash)
		&& player.target(target);
}
ac.battle.oh.vs = function() {
	var target = this.chooseTarget();
	var player = ac.hv.battle.player;
	return player.commit(ac.symbols.VitalStrike)
		&& player.target(target);
}
ac.battle.oh.mb = function() {
	var target = this.chooseTarget();
	var isBoss = ac.symbols.Bosses.name(target.name) != null;
	var player = ac.hv.battle.player;
	var e = target.effects.name(ac.symbols.EBleedingWound.name);
	e = e ? e.duration : 0;
	return isBoss 
		&& target.health.percent < 0.25 
		&& e > 0
		&& player.commit(ac.symbols.MercifulBlow)
		&& player.target(target);
}
// pg = pu gong, 普攻。
ac.battle.oh.pg = function() {
	var target = this.chooseTarget();
	return ac.hv.battle.player.target(target);
}

ac.battle.oh.onFight = function() {
	return ac.battle.ai.heal.exec() || ac.battle.ai.buff.exec() || this.attack();
}
//
ac.battle.oh.prepare();
ac.events.subscribe('onFight', ac.battle.oh);