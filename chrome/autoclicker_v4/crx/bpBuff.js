//@ sourceURL=bpBuff.js
ac.namespace('ac.battle.ai.buff')

ac.battle.ai.buff.Buff = function(symbol, enabled) {
	this.symbol = symbol;
	this.enabled = enabled;
}
ac.battle.ai.buff.Buff.prototype.commit = function() {
	var skill = ac.symbols[this.symbol.skillRef];
	return ac.hv.battle.player.commit(skill);
}
ac.battle.ai.buff.Buff.prototype.channelProfit = function() {
	var e = ac.hv.battle.player.effects.name(this.symbol.name);
	var dur =  e ? e.duration : 0;
	if (dur == Infinity) return 0;
	var max = ac.hv.battle.player.effects.max[this.symbol.name];
	max = max ? max : dur;
	if (max == Infinity) return 0;
	var mana = ac.hv.battle.player.skillBook.name(ac.symbols[this.symbol.skillRef].name).mana;
	var most = Math.ceil(mana * ac.symbols.EChanneling.factor);
	return max == 0 ? most : Math.ceil(most - mana * dur / max);
}
ac.battle.ai.buff.Buff.prototype.exec = function() {
	return this.enabled && !ac.hv.battle.player.effects.name(this.symbol.name) && this.commit();
}

ac.battle.ai.buff.haste = new ac.battle.ai.buff.Buff(ac.symbols.EHaste, false)
ac.battle.ai.buff.spark = new ac.battle.ai.buff.Buff(ac.symbols.ESparkOfLife, false)
ac.battle.ai.buff.spirit = new ac.battle.ai.buff.Buff(ac.symbols.ESpiritShield, false)
ac.battle.ai.buff.protect = new ac.battle.ai.buff.Buff(ac.symbols.EProtection, false)
ac.battle.ai.buff.shadow = new ac.battle.ai.buff.Buff(ac.symbols.EShadowVeil, false)
ac.battle.ai.buff.heart = new ac.battle.ai.buff.Buff(ac.symbols.EHeartseeker, false)
ac.battle.ai.buff.arcane = new ac.battle.ai.buff.Buff(ac.symbols.EArcaneFocus, false)
ac.battle.ai.buff.absorb = new ac.battle.ai.buff.Buff(ac.symbols.EAbsorb, false)

var g = ac.battle.ai.buff;
ac.battle.ai.buff.data = [g.haste, g.spark, g.spirit, g.protect, g.shadow, g.heart, g.arcane, g.absorb];

ac.battle.ai.buff.overcharge = 245;
ac.battle.ai.buff.enable = function(name, bool) {
	for(var i=0,len=this.data.length;i<len;i++) {
		if (this.data[i].symbol.name == name) {
			this.data[i].enabled = bool;
			break;
		}
	}
}
ac.battle.ai.buff.exec = function() {
	if (this.channel()) return true;
	for (var i=0,len=this.data.length;i<len;i++)	{
		if (this.data[i].exec()) return true;
	};
	if (this.sps()) return true;
	if (this.mystic())  return true;
	return false;
}
ac.battle.ai.buff.channel = function() {
	var player = ac.hv.battle.player, effects = player.effects;
	var channeling = effects.name(ac.symbols.EChanneling.name);
	if (channeling) {
		var profit = -1, theBuff;
		this.data.forEach(function(buff) {
			if (buff.enabled) {
				var p = buff.channelProfit();
				if (p > profit) {
					profit = p;
					theBuff = buff;
				}
			}
		});
		ac.log.debug(theBuff.symbol.name + ' profit:'+profit);
		return theBuff.commit();
	}
	return false;				
}

ac.battle.ai.buff.mystic = function() {
	var player = ac.hv.battle.player;
	return player.items.gem == ac.symbols.MysticGem.name
		&& player.commit(ac.symbols.MysticGem);
}

ac.battle.ai.buff.sps = function() {
	var player = ac.hv.battle.player;
	return !player.spiritStance 
		&& player.overcharge.value >= this.overcharge 
		&& player.commit(ac.symbols.SpiritStance);
}
