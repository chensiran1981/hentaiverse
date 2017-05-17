//@ sourceURL=bpLog.js
ac.namespace('ac.battleLog')

ac.battleLog.Patterns = function() {
	this.set = new Set();
}
ac.battleLog.Patterns.prototype.exec = function(data, hv) {
	var vs = this.set.values();
	for(var t of vs) {
		if (t.exec(data, hv)) return true;
	}
	return false;
}
ac.battleLog.Patterns.prototype.add = function(generator) {
	this.set.add(generator);
}
//
ac.battleLog.Pattern = function(eventName, namedRegex, dataHandler) {
	this.namedRegex = namedRegex;
	this.eventName = eventName;
	this.dataHandler = dataHandler;
}
ac.battleLog.Pattern.prototype.exec = function(battleEvent, hv) {
	var data = {};
	if (this.namedRegex.exec(battleEvent.message, data)) {
		if (this.dataHandler) {
			this.dataHandler(data);
		}
		ac.events.fire(this.eventName, data);
		return true;
	}
	return false;
}
//
ac.battleLog.patterns = new ac.battleLog.Patterns();
// Random Encounter
ac.battleLog.random = new ac.battleLog.Pattern(
	'onNewRound'
	, new ac.NamedRegex(/Initializing random encounter/, [])
	, function(data) {
		data.challenge = ac.symbols.RandomEncounter.name;
		data.round = 1;
		data.totalRounds = 1;
	});
ac.battleLog.patterns.add(ac.battleLog.random);
// New Round of Area\Ring Of Blood\GrindFest\ItemWorld
ac.battleLog.initializing = new ac.battleLog.Pattern(
	'onNewRound'
	, new ac.NamedRegex(/Initializing (.+)\(Round (\d+) \/ (\d+)\)/, ['challenge', 'round', 'totalRounds'])
);
ac.battleLog.patterns.add(ac.battleLog.initializing);
//
ac.battleLog.kill = new ac.battleLog.Pattern(
	'onKill'
	,new ac.NamedRegex(/^(?!You)(.+) has been defeated/, ['name'])
);
ac.battleLog.patterns.add(ac.battleLog.kill);
// You hit Kirika Ueno for 6144 void damage.
// You crit Bzobzo for 12524 void damage.
ac.battleLog.normalAttack = new ac.battleLog.Pattern(
	'onDamage'
	,new ac.NamedRegex(/(You) (hit|crit) (.+) for (\d+) (\w+) damage/, ['subject', 'verb', 'object', 'damage', 'damageType'])
);
ac.battleLog.patterns.add(ac.battleLog.normalAttack);
// You counter Temp172 for 5381 points of void damage.
ac.battleLog.counter = new ac.battleLog.Pattern(
	'onDamage'
	,new ac.NamedRegex(/(You) (counter) (.+) for (\d+) points of (\w+) damage/, ['subject', 'verb', 'object','damage', 'damageType'])
);
ac.battleLog.patterns.add(ac.battleLog.counter);
//xxx hits Noel The Celestial for 84650 void damage
ac.battleLog.skill = new ac.battleLog.Pattern(
	'onDamage'
	,new ac.NamedRegex(/(.+) (hits|crits) (?!you)(.+) for (\d+)( | points of )(\w+) damage/, ['subject', 'verb', 'object','damage', undefined, 'damageType'])
);
ac.battleLog.patterns.add(ac.battleLog.skill);
//
ac.battleLog.eventify = {
	hashItem : new ac.storage.Item('ac.battleLog.eventify.turnhash')
	,process(hv) {
		var old = this.hashItem.getValue();
		var cur = hv.battle.turnHash();
		if (cur != old) {
			this.exec(hv);
		}
		this.hashItem.save(cur);
	}
	,exec(hv) {
		ac.events.fire('onNewTurn', {turn:hv.battle.turn.no});
		//
		var events = hv.battle.turn.events;
		for(var i=0,len=events.length;i<len;i++) {
			ac.battleLog.patterns.exec(events[i], hv);
		}
	}
	,onBattlePageChecked(data) {
		this.process(ac.hv);
	}
}
//
ac.events.subscribe('onBattlePageChecked', ac.battleLog.eventify);
