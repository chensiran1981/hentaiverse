//@ sourceURL=bpHeal.js
ac.namespace('ac.battle.ai.heal');

ac.battle.ai.heal.Line = function(symbol, value) {
	this.symbol = symbol;
	this.value = value;
}
ac.battle.ai.heal.Line.prototype.trigger = function() {
	return ac.hv.battle.player.commit(this.symbol);
}
ac.battle.ai.heal.EffectiveLine = function(symbol, value) {
	ac.battle.ai.heal.Line.call(this, symbol, value);
	this.effectSymbol = ac.symbols[this.symbol.effectRef];
}
ac.battle.ai.heal.EffectiveLine.prototype = Object.create(ac.battle.ai.heal.Line.prototype);
ac.battle.ai.heal.EffectiveLine.prototype.constructor = ac.battle.ai.heal.EffectiveLine;
ac.battle.ai.heal.EffectiveLine.prototype.trigger = function() {
	return !ac.hv.battle.player.effects.name(this.effectSymbol.name)
		&& ac.battle.ai.heal.Line.prototype.trigger.call(this);
}
ac.battle.ai.heal.Lines = function(lineArray) {
	this.data = lineArray;
}
ac.battle.ai.heal.Lines.prototype.set = function(nameValuePairs) {
	this.data.sort(function(a, b) {
		var an = a.symbol.name, bn = b.symbol.name;
		var av = nameValuePairs[an], bv = nameValuePairs[bn];
		if (av === undefined) av = a.value;
		if (bv === undefined) bv = b.value;
		a.value = av;
		b.value = bv;
		return av - bv;
	});
}
ac.battle.ai.heal.Lines.prototype.trigger = function(value) {
	var i = 0, len = this.data.length, line;
	for (;i<len;i++) {
		line = this.data[i];
		if (line.value >= value) {
			if (line.trigger()) {
				return true;
			}
		}
	};
	return false;
}

ac.battle.ai.heal.healthLines = new ac.battle.ai.heal.Lines([new ac.battle.ai.heal.EffectiveLine(ac.symbols.HealthDraught, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.HealthGem, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.HealthPotion, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.Cure, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.FullCure, 0)
								, new ac.battle.ai.heal.EffectiveLine(ac.symbols.Regen, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.HealthElixir, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.LastElixir, 0)]);
ac.battle.ai.heal.magicLines = new ac.battle.ai.heal.Lines([new ac.battle.ai.heal.EffectiveLine(ac.symbols.ManaDraught, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.ManaGem, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.ManaPotion, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.ManaElixir, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.LastElixir, 0)]);
ac.battle.ai.heal.spiritLines = new ac.battle.ai.heal.Lines([new ac.battle.ai.heal.EffectiveLine(ac.symbols.SpiritDraught, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.SpiritGem, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.SpiritPotion, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.SpiritElixir, 0)
								, new ac.battle.ai.heal.Line(ac.symbols.LastElixir, 0)]);

ac.battle.ai.heal.exec = function() {
	var hp = ac.hv.battle.player.health.percent;
	var mp = ac.hv.battle.player.magic.percent;
	var sp = ac.hv.battle.player.spirit.percent;
	return this.healthLines.trigger(hp) || this.magicLines.trigger(mp) || this.spiritLines.trigger(sp);
}