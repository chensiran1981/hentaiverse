ac.namespace('ac.log')

ac.log.Patterns = function() {
	this.set = new Set();
}
ac.log.Patterns.prototype.exec = function(data, hv) {
	var vs = this.set.values();
	for(var t of vs) {
		if (t.exec(data, hv)) return true;
	}
	return false;
}
ac.log.Patterns.prototype.add = function(generator) {
	this.set.add(generator);
}
//
ac.log.eventify = {
	logPatterns : new ac.log.Patterns()
	,hashItem : new ac.storage.Item('ac.log.eventify.turnhash')
	,process(hv) {
		var old = this.hashItem.getValue();
		var cur = hv.battle.turnHash();
		if (!cur.equals(old)) {
			this.exec(hv);
		}
		this.hashItem.save(cur);
	}
	,exec(hv) {
		ac.events.fire('onNewTurn', {turn:hv.battle.turn.no});
		//
		var events = hv.battle.turn.events;
		for(var i=0,len=events.length;i<len;i++) {
			this.logPatterns.exec(events[i], hv);
		}
	}
	,onBattlePageexeced(data) {
		this.process(ac.hv);
	}
}
// Random Encounter
ac.log.patterns.random = {
	ra : 'Initializing random encounter ...'
	,exec(battleEvent, hv) {
		var msg = battleEvent.message, data = {};
		if (this.ra == msg) {
			data.challenge = ac.symbols.RandomEncounter.name;
			data.round = 1;
			data.totalRounds = 1;
			ac.events.fire('onNewRound', data);
			return true;
		} 
		return false;
	}
}
// New Round of Area\Ring Of Blood\GrindFest\ItemWorld
ac.log.patterns.initializing = {
	ra : new ac.NamedRegex(/Initializing (.+)\(Round (\d+) \/ (\d+)\)/, ['challenge', 'round', 'totalRounds'])
	,exec(battleEvent, hv) {
		var msg = battleEvent.message, data = {};
		if (this.ra.exec(msg, data)) {
			ac.events.fire('onNewRound', data);
			return true;
		}
		return false;
	}
}
ac.log.patterns.defeated = {
	ra : new ac.NamedRegex(/(.+?) has been defeated/,['who'])
	,exec(battleEvent, hv) {
		var data = {};
		if (this.ra.exec(battleEvent.message, data)) {
			if (data.who != 'You') {
				ac.events.fire('onKilledMonster', {name:data.who});
				return true;
			}
		}
		return false;
	}
}
// You hit Kirika Ueno for 6144 void damage.
ac.log.patterns.hit = {
	ra : new ac.NamedRegex(/You hit (.+) for (\d+) (\w+) damage./, ['target', 'damage', 'damageType'])
	,exec(battleEvent, hv) {
		var data = {};
		if (this.ra.exec(battleEvent.message, data)) {
			data.attack = 'normal';
			ac.events.fire('onDamage', data);
			return true;
		}
		return false;
	}
}
