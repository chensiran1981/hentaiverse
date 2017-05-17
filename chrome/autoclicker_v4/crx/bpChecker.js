//@ sourceURL=bpChecker.js

ac.namespace('ac.battle.page');

ac.import('hv.js');

// 依赖
ac.battle.page.hv = undefined;
//
ac.battle.page.basics = {
	check(hv) {
		var player = hv.battle.player;
		//检查生命、法力、灵力、怒气。
		var divs = document.querySelectorAll('.cwbdv');
		var hp = divs[0].textContent.trim().split(' / ');
		var mp = divs[1].textContent.trim().split(' / ');
		var sp = divs[2].textContent.trim().split(' / ');
		var oc = divs[3].textContent.trim().split('%');
		player.health.set(hp[0],hp[1]);
		player.magic.set(mp[0],mp[1]);
		player.spirit.set(sp[0],sp[1]);
		player.overcharge.set(oc[0],ac.symbols.Overcharge.max);
		//
		var eles = document.querySelectorAll('.cit .fd4');
		player.stamina = parseInt(eles[0].textContent.trim().split(':')[1]);
		player.difficulty = eles[2].textContent.trim();
		player.level = parseInt(eles[3].textContent.trim().split(' ')[1]);
		player.title = eles[4].textContent.trim();
	}
}

ac.battle.page.status = {
	spiritStanceImgSelector : 'img#ckey_spirit'
	,effectImgsSelector: 'div#mainpane>div.btt>div.bte>img'
	,check(hv) {
		var player = hv.battle.player;
		var img = document.querySelector(this.spiritStanceImgSelector);
		player.spiritStance = img.src.indexOf('spirit_n.png') == -1;
		// 效果。
		var imgs = document.querySelectorAll(this.effectImgsSelector);
		ac.battle.page.effectImgs.check(player.effects, imgs);
	}
	,storageItem: new ac.storage.Item('ac.effects'
		, {
			snap:{
				hash:0
				,turn:-1
				,data:[]
			}
			,max:{}
		}
	)
	,fix(hv) {
		var saved = this.storageItem.getValue();
		var hash = hv.battle.monsters.hash();
		var turn = hv.battle.turn.no;
		var effects = hv.battle.player.effects.name();
		// 获取上回合的效果快照。
		var snap = saved.snap;
		var max = saved.max;
		// 检验快照时间，若确为上一回则可利用该数据推断效果上限。
		if (snap.hash == hash && turn == snap.turn+1) {
			// 获取效果持续上限。
			function update(name, targetValue, sourceValue, target) {
				if (sourceValue.duration > targetValue) {
					max[name] = ac.Effect.fixedDuration(sourceValue.duration, ac.symbols.EChanneling.name in target);
				}
			}
			function add(name, sourceValue, target) {
				max[name] = ac.Effect.fixedDuration(sourceValue.duration, ac.symbols.EChanneling.name in target);
			}
			ac.object.update(snap.data, effects, update, add);
		}
		// 保存本回合的快照和上限。
		snap.hash = hash;
		snap.turn = turn;
		var k, v, d = {};
		for (k in effects) {
			v = effects[k];
			d[k] = v.duration;
		}
		snap.data = d;
		this.storageItem.save();
		// 将上限数据提交到hv。
		hv.battle.player.effects.max = max;
	}
}
ac.battle.page.effectImg = {
	check(effect, img) {
		var onmouseover = img.getAttribute('onmouseover');
		var args = /set_infopane_effect\((.+)\)/i.exec(onmouseover)[1];
		return eval('this.checkA(effect, '+args+');');
	}
	,checkA(effect, name,desc,remaining) {
		// 形如：'bleeding (x3)'
		var g = /(.+) (?:\(x(\d+)\))/.exec(name);
		var stack=0;
		if (g != null) {
			name = g[1];
			stack = parseInt(g[2]);
		}
		if (isNaN(parseInt(remaining))) remaining = Infinity;
		effect.name = name;
		effect.stack = stack;
		effect.duration = remaining;
		return effect;
	}
}
ac.battle.page.effectImgs = {
	check(effects, imgs) {
		effects.clear();
		[].forEach.call(imgs, function(img) {
			effect = new ac.Effect();
			ac.battle.page.effectImg.check(effect, img);
			effects.add(effect);
		}); 
	}
}
ac.battle.page.skillDiv = {
	check(skill, div) {
		var onmouseover = div.getAttribute('onmouseover');
		var args = /set_infopane_spell\((.+)\)/.exec(onmouseover)[1];
		eval('this.checkA(skill, '+ args + ')');
		skill.id = div.id;
		skill.enabled = div.hasAttribute('onclick');
		skill.clickable =skill.enabled ? div : null;
	}
	,checkA(skill, name,desc,pic,mana,overcharge,cooldown) {
		skill.name = name;
		if (skill.mana == 0 || mana != 1) skill.mana = mana;
		skill.overcharge = overcharge; 
		skill.cooldown = cooldown;
	}
}
ac.battle.page.skillBook = {
	skillDivsSelector:'.btsd'
	,check(hv) {
		var player =hv.battle.player;
		var divs = document.querySelectorAll(this.skillDivsSelector), skill;
		[].forEach.call(divs,function(div) {
			skill = new ac.Skill();
			ac.battle.page.skillDiv.check(skill, div);
			player.skillBook.add(skill);
		});
	}
	,fix(hv) {
		if (hv.battle.player.effects.name(ac.symbols.EChanneling.name)) {
			var mana = this.storage.getData();
			if (mana) {
				var k,v;
				for (k in mana) {
					v = hv.battle.player.skillBook.name(k);
					if (v) {
						v.mana = mana[k];
					}
				}
			}
		} else {
			this.storage.save(hv);
		}
	}
}
ac.battle.page.skillBook.storage ={
	item: new ac.storage.Item('ac.skillbook' , {})
	,save(hv) {
		// 合法性。
		var sb = hv.battle.player.skillBook.name();
		var mana = {};
		// 拷贝。
		var k, v
		for (k in sb) {
			v = sb[k];
			mana[k] = v.mana;
		}
		// 保存。
		this.item.save(mana);
	}
	,getData() {
		return this.item.getValue();
	}
}

ac.battle.page.items = {
	gemSelector : "#ikey_p[onclick]"
	,check(hv) {
		var items = hv.battle.player.items;
		var div = document.querySelector(this.gemSelector);
		if (!div) items.gem = '';
		else items.gem = div.textContent.trim();
	}
}

ac.battle.page.monsterDiv = {
	check(monster, div) {
		monster.name = div.getElementsByClassName("btm3")[0].textContent;
		monster.position = parseInt(div.id.substr(5));
		var healthImg = div.getElementsByClassName('btm5')[0].getElementsByTagName('img')[0];
		var h = 0;
		if (healthImg.src.indexOf('green') >= 0) {
			h = parseInt(healthImg.style.width.match(/\d+/)[0]);
		}
		monster.health.setPercent(h / 120);
		var effectImgs = div.getElementsByClassName("btm6")[0].getElementsByTagName('img');
		ac.battle.page.effectImgs.check(monster.effects, effectImgs);
		var alive = div.hasAttribute('onclick');
		monster.alive = alive;
		monster.clickable =  alive ? div : null;
	}
}

ac.battle.page.monsters = {
	monsterDivsSelector : '[id^=mkey_]'
	,check(hv) {
		var monsters = hv.battle.monsters;
		var divs = document.querySelectorAll(this.monsterDivsSelector);
		for (var i = 0, len = divs.length, mon; i < len; i++) {
			var mon = monsters.index(i);
			if (!mon) {
				mon = new ac.Monster();
				monsters.index(i, mon);
			}
			ac.battle.page.monsterDiv.check(mon, divs[i]);
		}
	}
	,spawnItem: new ac.storage.Item('ac.spawn', {})
	,fix(hv) {
		var spawn;
		var hash = hv.battle.monsters.hash();
		// 首回合，保存spawn数据到数据库。
		if (hv.battle.turn.no == 0) {
			var spawnData = hv.battle.turn.spawnData;
			spawn = {hash:hash, data:spawnData};
			this.spawnItem.setValue(spawn);
			this.spawnItem.save();
		} 
		// 否则从数据库读取spawn数据。
		else {
			spawn = this.spawnItem.getValue();
			// 若非同一轮次，数据无效。
			if (spawn.hash != hash) {
				spawn = undefined;
			}
		}
		if (spawn) {
			// 数组，每一项对应一个怪物，顺序与monster顺序相同。
			var data = spawn.data;
			for (var i=0,len=data.length;i<len;i++) {
				var hp = data[i].hp;
				var m = hv.battle.monsters.index(i);
				m.health.max = hp;
				// 刷新value值。
				m.health.setPercent(m.health.percent);
			}
		}
	}
}

ac.battle.page.logs = {
	check(hv) {
		var rows = document.querySelectorAll("#togpane_log tbody tr"), len = rows.length;
		var turn = new ac.Turn();
		ac.battle.page.logs.turn.check(turn, rows);
		hv.battle.turn = turn;
		// 提取日志中包含的数据。
		this.dataA(hv, turn);
	}
	,dataA(hv, turn) {
		// 如果是首回合，可以提取轮次、怪物生命值等有用的信息。
		if (turn.no == 0) {
			var p = ac.battle.page.logs.pattern, logs = turn.events;
			var log = logs[1];
			p.initializingRandomEncounter.check(log) || p.initializingRound.check(log);
			hv.battle.round = log.data.round;
			hv.battle.totalRounds = log.data.totalRound;
			var spawnData = [];
			for (var i=2, len = logs.length; i<len; i++) {
				log = logs[i];
				if (p.spawnMonster.check(log)) {
					spawnData.push({
						name: log.data.name
						,mid: log.data.mid
						,level: log.data.level
						,hp: log.data.hp
					});
				}
			}
			turn.spawnData = spawnData;
			return true;
		} else {
			return false;
		}
	}
}

ac.battle.page.logs.row = {
	check(battleEvent, row) {
		battleEvent.turn = parseInt(row.childNodes[0].textContent);
		battleEvent.no = parseInt(row.childNodes[1].textContent);
		battleEvent.message = row.childNodes[2].textContent;
		return true;
	}
}

ac.battle.page.logs.turn = {
	check(turn, rows) {
		var len = rows.length, log, turnno, descendingLogs = [];
		if (len ==0) return false;
		log = new ac.BattleEvent();
		ac.battle.page.logs.row.check(log, rows[0]);
		turnno = log.turn;
		descendingLogs.push(log);
		for(var i = 1; i < len; i++) {
			log = new ac.BattleEvent();
			ac.battle.page.logs.row.check(log, rows[i]);
			if (log.turn != turnno) break;
			descendingLogs.push(log);
		}
		turn.no = turnno;
		turn.events = descendingLogs.reverse();
		return true;
	}
}

ac.battle.page.logs.pattern = {};

ac.battle.page.logs.pattern.initializingRandomEncounter = {
	pa : 'Initializing random encounter ...'
	,check(battleEvent) {
		if (battleEvent.message == this.pa) {
			battleEvent.type = ac.symbols.ChallengeStart;
			var data = {};
			battleEvent.data = data;
			data.challenge=ac.symbols.RandomEncounter.name;
			data.round=1;
			data.totalRound=1;
			return true;
		}
		return false;
	}
}
ac.battle.page.logs.pattern.initializingRound = {
	pa:/Initializing (.+)\(Round (\d+) \/ (\d+)\)/
	,check(battleEvent) {
		var g = this.pa.exec(battleEvent.message);
		if (g) {
			battleEvent.type = ac.symbols.RoundStart;
			var data = {};
			battleEvent.data = data;
			data.challenge = g[1];
			data.round = parseInt(g[2]);
			data.totalRound = parseInt(g[3]);
			return true;
		}
		return false;
	}
}
ac.battle.page.logs.pattern.spawnMonster = {
	// Spawned Monster B: MID=23 (Yuki Nagato) LV=292 HP=1458912
	pa:/Spawned .+MID=(\d+) \((.+)\) LV=(\d+) HP=(\d+)/
	,check(battleEvent) {
		var g = this.pa.exec(battleEvent.message);
		if (g) {
			battleEvent.type = ac.symbols.SpawnMonster;
			var data = {}
			battleEvent.data = data;
			data.mid = g[1];
			data.name = g[2];
			data.level = parseInt(g[3]);
			data.hp = parseInt(g[4]);
			return true;
		}
		return false
	}
}

ac.battle.page.dialog = {
	ckeySelector : 'ckey_continue'
	,togpane_logSelector : 'togpane_log'
	,continueDialog: null
	,check() {
		this.continueDialog = null;
		var ckey = document.getElementById(this.ckeySelector);
		if (ckey != null) {
			this.continueDialog = {};
			var logPane = document.getElementById(this.togpane_logSelector);
			var log = logPane.innerText;
			this.continueDialog.victory =log.indexOf("You are Victorious!")>=0;
			this.continueDialog.battleEnd = ckey.getAttribute("onclick").indexOf('goto')>=0;
			this.continueDialog.click = function() {
				ckey.click();	
			}
		}
	}
}

ac.battle.page.check = function(hv) {
	this.logs.check(hv);
	this.basics.check(hv);
	this.status.check(hv);
	this.items.check(hv);
	this.skillBook.check(hv);
	this.monsters.check(hv);
	this.dialog.check(hv);
	// fix
	this.monsters.fix(hv);
	this.status.fix(hv);
	this.skillBook.fix(hv);
	// 安装战场动作。
	hv.battle.player.commit = this.commit;
	hv.battle.player.target = this.target;
}

ac.battle.page.commit = function(symbol) {
	var type = symbol.type;
	if (type == 'item') return use(symbol);
	if (type == 'skill') return cast(symbol);
	if (type == 'mode') return mode(symbol);
	//
	function use(symbol) {
		var name = symbol.name;
		var divs = document.querySelectorAll("div[id^='ikey_'][onclick]");
		for(i=0;i<divs.length;i++) {
			var s = divs[i].textContent;
			if (s == name) {
				divs[i].click();
				ac.log.debug('use:'+symbol.name);
				return true;
			}
		}
		return false;
	}
	function cast(symbol) {
		var id = symbol.id;
		div = document.querySelector('div[id="'+id+'"][onclick]');
		if (div) {
			div.click();			
			ac.log.debug('cast:'+symbol.name);
			return true;
		}
		return false;
	}
	function mode(symbol) {
		var bf = document.getElementById(ac.symbols.BattleForm.id);
		bf.battleaction.value = 1
		bf.battle_targetmode.value = symbol.mode;
		bf.battle_target.value = 0
		bf.battle_subattack.value = 0
		ac.log.debug('mode:'+symbol.name);
		bf.submit();
		return true;
	}
}

ac.battle.page.target = function(monster) {
	monster.clickable.click();
	ac.log.debug('target:'+monster.name);
	return true;
}

ac.battle.page.onBattlePageUpdated = function() {
	if (!this.hv.battle) {
		this.hv.battle = new ac.Battle();
	}
	this.check(this.hv);
	ac.events.queue('onBattlePageChecked', {page:ac.battle.page});
}
ac.events.subscribe('onBattlePageUpdated', ac.battle.page);
