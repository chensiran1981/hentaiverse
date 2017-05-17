// -----------------------------------------------------------------
var GDT = {
	BattleForm:		{id:'battleform'}
	,RiddleForm:	{id:'riddleform'}
	,StuffBox:		{className:'stuffbox'}
	,HookSubmit:	{code:'battleform.submit = function() {document.dispatchEvent(new CustomEvent(\'submitBattleForm\'));}; document.addEventListener(\'reinitializeBattleManager\',function(e) {window.battle = new window.Battle();window.battle.clear_infopane();});'}                                                                  
	,SubmitBattleForm:			{name:'submitBattleForm'}
	,ReinitializeBattleManager:	{name:'reinitializeBattleManager'}
	
	,Overcharge:	{ name:'Overcharge',		max:250	}

	,HealthGem:		{ name:'Health Gem',	type:'item'}
	,ManaGem:		{ name:'Mana Gem',		type:'item'}
	,SpiritGem:		{ name:'Spirit Gem',	type:'item'}
	,MysticGem:		{ name:'Mystic Gem',	type:'item', 	effect:'EChanneling'}
	,HealthDraught:	{ name:'Health Draught',type:'item',	effect:'ERegeneration'}
	,ManaDraught:	{ name:'Mana Draught',	type:'item',	effect:'EReplenishment'}
	,SpiritDraught:	{ name:'Spirit Draught',type:'item',	effect:'ERefreshment'}
	,HealthPotion:	{ name:'Health Potion',	type:'item'}
	,ManaPotion:	{ name:'Mana Potion',	type:'item'}
	,SpiritPotion:	{ name:'Spirit Potion',	type:'item'}
	,HealthElixir:	{ name:'Health Elixir',	type:'item'}
	,ManaElixir:	{ name:'Mana Elixir',	type:'item'}
	,SpiritElixir:	{ name:'Spirit Elixir',	type:'item'}
	,LastElixir:	{ name:'Last Elixir',	type:'item'}

	,Flee:				{ name:'Flee',				type:'spell',	id:1001}
	,Scan:				{ name:'Scan',				type:'spell',	id:1011}
	,IrisStrike:		{ name:'Iris Strike',		type:'spell',	id:2401}
	,Backstab:			{ name:'Backstab',			type:'spell',	id:2402}
	,FrenziedBlows:		{ name:'Frenzied Blows',	type:'spell',	id:2403}
	,ShieldBash:		{ name:'Shield Bash',		type:'spell',	id:2201}
	,VitalStrike: 		{ name:'Vital Strike',		type:'spell',	id:2202}
	,MercifulBlow:		{ name:'Merciful Blow',		type:'spell',	id:2203}
	,FieryBlast:		{ name:'Fiery Blast',		type:'spell',	id:111}
	,Inferno:			{ name:'Inferno',			type:'spell',	id:112}
	,FlamesOfLoki:		{ name:'Flames of Loki',	type:'spell',	id:113}
	,Freeze:			{ name:'Freeze',			type:'spell',	id:121}
	,Blizzard:			{ name:'Blizzard',			type:'spell',	id:122}
	,Fimbulvetr:		{ name:'Fimbulvetr',		type:'spell',	id:123}
	,Shockblast:		{ name:'Shockblast',		type:'spell',	id:131}
	,ChainedLightning:	{ name:'Chained Lightning',	type:'spell',	id:132}
	,WrathOfThor:		{ name:'Wrath of Thor',		type:'spell',	id:133}
	,Gale:				{ name:'Gale',				type:'spell',	id:141}
	,Downburst:			{ name:'Downburst',			type:'spell',	id:142}
	,StormsOfNjord:		{ name:'Storms of Njord',	type:'spell',	id:143}
	,Smite:				{ name:'Smite',				type:'spell',	id:151}
	,Banishment:		{ name:'Banishment',		type:'spell',	id:152}
	,ParadiseLost:		{ name:'Paradise Lost',		type:'spell',	id:153}
	,Corruption:		{ name:'Corruption',		type:'spell',	id:161}
	,Disintegrate:		{ name:'Disintegrate',		type:'spell',	id:162}
	,Ragnarok:			{ name:'Ragnarok',			type:'spell',	id:163}
	,Drain:				{ name:'Drain',				type:'spell',	id:211}
	,Weaken:			{ name:'Weaken',			type:'spell',	id:212}
	,Imperil:			{ name:'Imperil',			type:'spell',	id:213}
	,Slow:				{ name:'Slow',				type:'spell',	id:221}
	,Sleep:				{ name:'Sleep',				type:'spell',	id:222}
	,Confuse:			{ name:'Confuse',			type:'spell',	id:223}
	,Blind:				{ name:'Blind',				type:'spell',	id:231}
	,Silence:			{ name:'Silence',			type:'spell',	id:232}
	,MagNet:			{ name:'MagNet',			type:'spell',	id:233}
	,Cure:				{ name:'Cure',				type:'spell',	id:311}
	,Regen:				{ name:'Regen',				type:'spell',	id:312,	effectRef:'ERegen'}
	,FullCure:			{ name:'Full-Cure',			type:'spell',	id:313}
	,Protection:		{ name:'Protection',		type:'spell',	id:411,	effectRef:'EProtection'}
	,Haste:				{ name:'Haste',				type:'spell',	id:412,	effectRef:'EHaste'}
	,ShadowVeil:		{ name:'Shadow Veil',		type:'spell',	id:413,	effectRef:'EShadowVeil'}
	,Absorb:			{ name:'Absorb',			type:'spell',	id:421,	effectRef:'EAbsorb'}
	,SparkOfLife:		{ name:'Spark of Life',		type:'spell',	id:422,	effectRef:'ESparkOfLife'}
	,SpiritShield:		{ name:'Spirit Shield',		type:'spell',	id:423,	effectRef:'ESpiritShield'}
	,Heartseeker:		{ name:'Heartseeker',		type:'spell',	id:431,	effectRef:'EHeartseeker'}
	,ArcaneFocus:		{ name:'Arcane Focus',		type:'spell',	id:432,	effectRef:'EArcaneFocus'}

	,EChanneling:		{ name:'Channeling',		type:'effect',	itemRef:'MysticGem'}
	,ERegeneration:	{ name:'Regeneration',	type:'effect',	itemRef:'HealthDraught'}
	,EReplenishment:	{ name:'Replenishment',	type:'effect',	itemRef:'ManaDraught'}	
	,ERefreshment:	{ name:'Refreshment',	type:'effect',	itemRef:'SpiritDraught'}
	,ERegen:		{ name:'Regen',		type:'effect',	spellRef:'Regen'}
	,EProtection:		{ name:'Protection',		type:'effect',	spellRef:'Protection'}
	,EHaste:		{ name:'Hastened',		type:'effect',	spellRef:'Haste'}
	,EShadowVeil:	{ name:'Shadow Veil',	type:'effect',	spellRef:'ShadowVeil'}
	,EAbsorb:		{ name:'Absorbing Ward',	type:'effect',	spellRef:'Absorb'}
	,ESparkOfLife:	{ name:'Spark of Life',	type:'effect',	spellRef:'SparkOfLife'}
	,ESpiritShield:	{ name:'Spirit Shield',	type:'effect',	spellRef:'SpiritShield'}
	,EHeartseeker:	{ name:'Heartseeker',	type:'effect',	spellRef:'Heartseeker'}
	,EArcaneFocus:	{ name:'Arcane Focus',	type:'effect',	spellRef:'ArcaneFocus'}
	,EStunned:		{ name:'Stunned',		type:'effect'	}
	,EBleedingWound: 	{ name:'Bleeding Wound',	type:'effect'}

	,SpiritStance:		{ name:'Spirit',			type:'mode',	mode:'spirit'}
	
	,RandomEncounter:	{ name:'random encounter'}
	,BattleStart:		{ name:'battle start'}	
	,RoundStart:		{ name:'round start'}
	
	,Grindfest:			{ name:'Grindfest',			type:'challenge'}
	,Hurt:				{ }
	,Heal:				{ }

	,Manbearpig: 	{ name:'Manbearpig', type:'monster', isBoss:true}
	,WhiteBunneh: 	{ name:'White Bunneh', type:'monster', isBoss:true}	
	,Mithra: 		{ name:'Mithra', type:'monster', isBoss:true}	
	,Dalek: 		{ name:'Dalek', type:'monster', isBoss:true}
			
	,Konata: 		{ name:'Konata', type:'monster', isBoss:true}	
	,MikuruAsahina: { name:'Mikuru Asahina', type:'monster', isBoss:true}	
	,RyoukoAsakura: { name:'Ryouko Asakura', type:'monster', isBoss:true}	
	,YukiNagato: 	{ name:'Yuki Nagato', type:'monster', isBoss:true}
	
	,Yggdrasil: 	{ name:'Yggdrasil', type:'monster', isBoss:true}
	,Skuld: 		{ name:'Skuld', type:'monster', isBoss:true}	
	,Urd: 			{ name:'Urd', type:'monster', isBoss:true}	
	,Verdandi: 		{ name:'Verdandi', type:'monster', isBoss:true}
	
	,Rhaegal: 		{ name:'Rhaegal', type:'monster', isBoss:true}	
	,Viserion: 		{ name:'Viserion', type:'monster', isBoss:true}	
	,Drogon: 		{ name:'Drogon', type:'monster', isBoss:true}
	
	,RealLife: 		{ name:'Real Life', type:'monster', isBoss:true}	
	,InvisiblePinkUnicorn: { name:'Invisible Pink Unicorn', type:'monster', isBoss:true}	
	,FlyingSpaghettiMonster: { name:'Flying Spaghetti Monster', type:'monster', isBoss:true}

	//---------------------------------------------------------------------------
}

var GDT_Helper = {
	lookup: {
		typeAndName:null
		,byTypeAndName(type, name) {
			if (this.typeAndName == null) {
				var _this = this;
				this.typeAndName = {};
				commons.forD(GDT,function (name,value) {
					if (value.name != undefined && value.type != undefined) {
						_this.typeAndName[value.type+':'+value.name] = value;
					}
				});
			}
			return this.typeAndName[type+':'+name];
		}
	}
	,bosses:{
		'Manbearpig':GDT.Manbearpig, 'White Bunneh':GDT.WhiteBunneh, 'Mithra':GDT.Mithra, 'Dalek':GDT.Dalek
		,'Konata': GDT.Konata,'Mikuru Asahina': GDT.MikuruAsahina,'Ryouko Asakura': GDT.RyoukoAsakura,'Yuki Nagato': GDT.YukiNagato
		,'Yggdrasil': GDT.Yggdrasil,'Skuld': GDT.Skuld,'Urd': GDT.Urd,'Verdandi': GDT.Verdandi
		,'Rhaegal': GDT.Rhaegal,'Viserion': GDT.Viserion,'Drogon': GDT.Drogon
		,'Real Life': GDT.RealLife,'Invisible Pink Unicorn': GDT.InvisiblePinkUnicorn,'Flying Spaghetti Monster': GDT.FlyingSpaghettiMonster
	}
	,isBoss(name) {
		return this.bosses[name] !== undefined;
	}
}

// -----------------------------------------------------------------
var commons = {
	
	pInt(value) {
		if (value == null || value == undefined)
			value = 0;
		else {
			value = parseInt(value);
			if (isNaN(value)) 
				value = Infinity;
		}
		return value;
	}
	
	,forEach(indexedCollection,f) {
		for(var i=0;i<indexedCollection.length;i++) 
			f(indexedCollection[i]);
	}
	
	,forD(obj,f) {
		var names = Object.getOwnPropertyNames(obj);
		for (var i = 0; i < names.length; i++) {
			var name = names[i];
			if (name.indexOf('_') == 0)  continue;
			var value = obj[name] , type = typeof(value);
			if (type === 'function') continue;
			if (f(name,value) === true) break;
		}
	}
	
	,audio(type,onend) {
		chrome.runtime.sendMessage({cmd:'audio',type:type}, function (response) {
			if (onend) onend();
		});
	}

	,listToString(list) {
		var ret = '';
		for (var i=0, len = list.length;i<len;i++) {
			ret = ret + list[i]+ '\t';
			if (i%3 == 0) {
				ret = ret + '\r\n';
			}
		}
		return ret;
	}

	,report(msg) {
		console.log(msg);
	}
		
	
	,store:{
		load(path,obj) {
			if (path.charAt(path.length-1) == '.') {
				commons.forD(obj,function(name,value) {
					var key = path + name;
					var s = localStorage.getItem(key);
					if (s !== null) 
						obj[name] = JSON.parse(s);
				});
			} else {
				var s = localStorage.getItem(path);
				if (s != null) {
					var o = JSON.parse(s);
					commons.forD(obj,function(name,value) {
						var v = o[name];
						if (v !== undefined) 
							obj[name] = v;
					});
				}
			}
		}
		
		,save(path,obj) {
			if (path.charAt(path.length-1) == '.') {
				commons.forD(obj,function(name,value) {
					var s = JSON.stringify(value, jsonfilter);
					localStorage.setItem(path + name,s);
				});
			} else {
				var s = JSON.stringify(obj, jsonfilter);
				localStorage.setItem(path,s);
			}
			function jsonfilter(name,value) {
				if (name.indexOf('_') == 0) {
					return undefined;
				} else {
					return value;
				}
			}
		}		
	}
}
// -----------------------------------------------------------------
var Gauge = function(value,max) {
	this.value = commons.pInt(value);
	this.max = commons.pInt(max);
	this.percent = 0;
	if (value == max && max !=0) 
		this.percent = 100;
	else 
		this.percent = Math.ceil(value * 100 / max);
}
Gauge.prototype.toString = function() {
	return `${this.value}/${this.max} (${this.percent}%)`;
};
//** Effect
var Effect = function(name,stack,remaining) {
	this.name = name; this.stack = stack; this.remaining = remaining;
}
Effect.prototype.toString = function() {
	return `${this.name}${this.stack?'(x'+this.stack+')':''}:${this.remaining}`
};
//** Spell
var Spell = function(name,id,mana,overcharge,cooldown) {
	this.name = name; this.id = id; this.mana = mana; this.overcharge = overcharge; this.cooldown = cooldown;
	this.duration = 0;
}
Spell.prototype.toString = function() {
	return `${this.name}_${this.id}(${this.mana},${this.overcharge},${this.cooldown})`;
};

var Monster = function(name,id,position,health,magic,spirit) {
	this.name = name; this.id = id, this.position = position; this.health = health; this.magic = magic; this.spirit = spirit;
	this.effects = new Effects();
}
Monster.prototype.toString = function() {
	return this.name+'('+this.position+'):'+this.health+','+this.magic+','+this.spirit;
};

var Effects = function() {
	this.map = {};
}
Effects.prototype.add = function(effect) {
	this.map[effect.name] = effect;
};
Effects.prototype.get = function(D) {
	return this.map[D.name];
};

// -----------------------------------------------------------------
var BattlePageModule = {
	test(doc) {
		return (doc || document).getElementById(GDT.BattleForm.id) != null;
	}
	,start() {
		events.fire('onBattlePageModuleStart');
		events.queue('onBattlePageUpdated');
	}
}

var RiddlePageModule = {
	test(doc) {
		return (doc || document).getElementById(GDT.RiddleForm.id) != null;
	}
	
	,start() {
		events.fire('onRiddlePageModuleStart');
		events.queue('onPonyEncountered');
	}
}

// -----------------------------------------------------------------
var hello = {
	onBattlePageModuleStart: function() {
		console.log('Hello, welcome use AutoClicker for HentaiVerse!');
	}
}

var laoxu = {
	gem:{
		check() {
			this.name='';
			var div = document.querySelector("#ikey_p[onclick]");
			if (div) {
				this.name = div.textContent;
			}
		}
		,toString() {
			return 'gem: '+this.name;
		}
	}

	,basic: {
		check() {
			//检查生命、法力、灵力、怒气。
			var divs = document.querySelectorAll('.cwbdv');
			var s0 = divs[0].textContent.trim().split(' / ');
			var s1 = divs[1].textContent.trim().split(' / ');
			var s2 = divs[2].textContent.trim().split(' / ');
			var s3 = divs[3].textContent.trim().split('%');
		
			this.health = new Gauge(s0[0],s0[1]);
			this.magic = new Gauge(s1[0],s1[1]);
			this.spirit = new Gauge(s2[0],s2[1]);
			this.overcharge = new Gauge(s3[0],GDT.Overcharge.max);
			
			//检查姿态。
			var img = document.querySelector('img#ckey_spirit');
			this.spiritStance = img.src.indexOf('spirit_n.png') == -1;
		}
		,toString() {
			return `health:${this.health},magic:${this.magic},spirit:${this.spirit},overcharge:${this.overcharge},spiritStance:${this.spiritStance}`;
		}
	}

	,effect: {
		fromMouseOverInfo(s) {
			var args = /set_infopane_effect\((.+)\)/i.exec(s)[1];
			return eval('resolve('+args+');');

			function resolve(name,desc,remaining) {
				// 形如：'bleeding (x3)'
				var g = /(.+) (?:\(x(\d+)\))/.exec(name);
				var stack=0;
				if (g != null) {
					name = g[1];
					stack = commons.pInt(g[2]);
				}
				return new Effect(name,stack,commons.pInt(remaining));
			}
		}
	}

	,effects:{
		map:{}
		,list:[]
		,check() {
			this.map = {};this.list = [];
			var imgs = document.querySelectorAll('div#mainpane>div.btt>div.bte>img');
			for(var i = 0, len = imgs.length; i < len; i++) {
				img = imgs[i];
				var e = laoxu.effect.fromMouseOverInfo(img.getAttribute("onmouseover"));
				this.map[e.name] = e; this.list.push(e);
			}
		}
		,get(symbol) {
			return this.map[symbol.name];
		}
		,toString() {
			return commons.listToString(this.list);
		}
	}

	,spell: {
		fromDiv(div) {
			var onmouseover = div.getAttribute('onmouseover');
			//battle.set_infopane_spell('Merciful Blow', 'Finish off a mortally wounded enemy. Instantly kills a target with bleed and less than 25% health.', 'smerciful', 0, 75, 10)
			var args = /set_infopane_spell\((.+)\)/.exec(onmouseover)[1];
			return eval('resolve(' + args + ')');

			function resolve(name,desc,pic,mana,overcharge,cooldown) {
				var ret = new Spell(name,div.id,mana,overcharge,cooldown);
				if (div.hasAttribute('onclick')) ret.clickable = div;
				return ret;
			}
		}
	}

	,spellBook: {
		map:{}
		,list:[]
		,check() {
			var divs = document.querySelectorAll('.btsd');
			for (var i=0, len = divs.length; i < len; i++) {
				var div = divs[i];
				var spell = laoxu.spell.fromDiv(div);
				var exist = this.map[spell.name];
				if (exist) {
					if (exist.mana == 1) {
						exist.mana = spell.mana;
					}
					exist.clickable = spell.clickable;
				} else {
					this.map[spell.name] = spell;
					this.list.push(spell);
				}
			}
		}
		,get(symbol) {
			return this.map[symbol.name];
		}
		,toString() {
			return commons.listToString(this.list);
		}
	}
		
	,monsters: {
		list:[]
		,check() {
			var divs = document.querySelectorAll('[id^=mkey_][onclick]');
			for (var i=0,len=divs.length;i<len;i++) {
				this.list.push(laoxu.monster.fromDiv(divs[i]));
			}
		}
		,getList() {
			return this.list.slice();
		}
		,toString() {
			return commons.listToString(this.list);
		}
	}
	,monster: {
		fromDiv(monsterDiv) {
			var mon = new Monster();
			var nameDiv = monsterDiv.getElementsByClassName("btm3")[0];
			var name = nameDiv.textContent;
			mon.name = name;
			mon.position = parseInt(monsterDiv.id.substr(5));
			mon.isBoss = GDT_Helper.isBoss(name);
			mon.clickable = monsterDiv;
			var healthDiv = monsterDiv.getElementsByClassName('btm5')[0];
			var healthImg = healthDiv.getElementsByTagName('img')[0];
			var h = healthImg.style.width.match(/\d+/)[0];
			h = Math.ceil(parseInt(h) * 100 / 120);
			mon.health = new Gauge(0,0);
			mon.health.percent = h;

			var effectDiv = monsterDiv.getElementsByClassName("btm6")[0];
			var effectImgs = effectDiv.getElementsByTagName('img');
			for (var j=0;j<effectImgs.length;j++) {
				var s = effectImgs[j].getAttribute('onmouseover');
				var e = laoxu.effect.fromMouseOverInfo(s);
				mon.effects.add(e);
			}
			return mon;		
		}
	}

	,noteEffectDuration: {
		flag:false	// true if last spell was a buff spell.
		,spell:null	// casted spell in the last turn.
		,channeling:false
		,check() {
			if (this.flag == true) {
				var effect  = laoxu.effects.get(GDT[this.spell.effectRef]);
				if (effect) {
					var duration = effect.remaining;
					if (this.channeling) {
						duration = Math.ceil(duration / 1.5);
					}
					var spell = laoxu.spellBook.get(this.spell)
					spell.duration = duration;
				}
			}
		}
	}
	,continueDialog:{
		check() {
			this.yes = false;
			this.victory = false;
			this.battleEnd = false;
			
			this.ckey = document.getElementById('ckey_continue');
			if (this.ckey == null) {
				this.yes = false;
				return;
			}
			this.yes = true;
			var logPane = document.getElementById("togpane_log");
			var log = logPane.innerText;
			this.victory =log.indexOf("You are Victorious!")>=0;
			this.battleEnd = this.ckey.getAttribute("onclick").indexOf('goto')>=0;
		}
		,click() {
			this.ckey.click();
		}
	}

	,onBattlePageUpdated: function() {
		this.gem.check();
		this.basic.check();
		this.effects.check();
		this.spellBook.check();
		this.monsters.check();
		this.noteEffectDuration.check();
		this.continueDialog.check();
	}

	,onBeforeCast: function(e) {
		var symbol = e.symbol;
		if (symbol.effectRef) {
			this.noteEffectDuration.flag = true;
			this.noteEffectDuration.spell = e.symbol;
			this.noteEffectDuration.channeling = this.effects.get(GDT.EChanneling) != null;
		} else {
			this.noteEffectDuration.flag = false;
		}
	}

	,battleFormPostString() {
		var form = document.getElementById(GDT.BattleForm.id);
		var inputs = form.getElementsByTagName('input');
		var encodedString = '';
		commons.forEach(inputs,function(input) {
			var name = input.name, value = input.value;
			encodedString = encodedString + '&' + name + '=' + value;
		});
		return encodedString.substr(1,encodedString.length);
	}

	,commit(symbol) {
		var type = symbol.type;
		
		if (type == 'item') 
			return use(symbol);
		
		if (type == 'spell') 
			return cast(symbol);
		
		if (type == 'mode')
			return mode(symbol);
		// -- end --
		function use(symbol) {
			var name = symbol.name;
			var divs = document.querySelectorAll("div[id^='ikey_'][onclick]");
			for(i=0;i<divs.length;i++) {
				var s = divs[i].textContent;
				if (s == name) {
					console.log('use:'+symbol.name);
					divs[i].click();
					return true;
				}
			}
			return false;
		}
			function cast(symbol) {
				var id = symbol.id;
				div = document.querySelector('div[id="'+id+'"][onclick]');
				if (div) {
					console.log('cast:'+symbol.name);
					events.fire('onBeforeCast',{symbol:symbol});
					div.click();			
					return true;
				}
				return false;
			}
			function mode(symbol) {
				var bf = document.getElementById(GDT.BattleForm.id);
				bf.battleaction.value = 1
				bf.battle_targetmode.value = symbol.mode;
				bf.battle_target.value = 0
				bf.battle_subattack.value = 0
				console.log('mode:'+symbol.name);
				bf.submit();
				return true;
			}		
	}

	,target(monster) {
		if (monster.clickable) {
			console.log('target:'+monster.name);
			monster.clickable.click();
		}
	}

}

var ajax = {
	onBattlePageModuleStart: function() {
		console.log('let me adapt your page to ajax mode.');
		var _this = this;
		ajaxify();
		this.submiting = false;

		function ajaxify() {
			var f = document.getElementById(GDT.BattleForm.id);
			document.body.appendChild(f);
			f.submit = this.doAjaxPost;		

			var code = GDT.HookSubmit.code;
			var tag = document.createElement('script');
			tag.innerHTML = code;
			document.body.appendChild(tag);
			document.removeEventListener(GDT.SubmitBattleForm.name,_this.doAjaxPost);
			document.addEventListener(GDT.SubmitBattleForm.name,_this.doAjaxPost);
		}
	}
	,submiting:false
	,doAjaxPost() {
		if (!this.submiting) {
			var xhr = new XMLHttpRequest();
			xhr.open('post','',true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.responseType = 'document';
			var _this = this;
			xhr.onload = function() {
				_this.submiting = false;
				if (xhr.status>=200 && xhr.status<400) {
					events.fire('onAjaxDocumentArrived',xhr.response);
				}
				else 
					commons.report('故障:'+xhr.status);
			}
			xhr.onerror = function(error) {
				_this.submiting = false;
				commons.report(error);
			}
			encodedString = laoxu.battleFormPostString();
			this.submiting = true;
			xhr.send(encodedString);
		}
	}
}

var update = {
	onAjaxDocumentArrived: function(newDoc) {
		if (BattlePageModule.test(newDoc))	{
			newDoc.getElementById(GDT.BattleForm.id).remove();
			var oldStuffBox = document.getElementsByClassName(GDT.StuffBox.className)[0];
			var newStuffBox = newDoc.getElementsByClassName(GDT.StuffBox.className)[0];
			document.body.replaceChild(newStuffBox,oldStuffBox);
			document.dispatchEvent(new CustomEvent(GDT.ReinitializeBattleManager.name));
			events.queue('onBattlePageUpdated');
		} else if (RiddlePageModule.test(newDoc)) {
			var oldStuffBox = document.getElementsByClassName(GDT.StuffBox.className)[0];
			var newStuffBox = newDoc.getElementsByClassName(GDT.StuffBox.className)[0];
			document.body.replaceChild(newStuffBox,oldStuffBox);
			document.dispatchEvent(new CustomEvent(GDT.ReinitializeBattleManager.name));
			events.queue('onPonyEncountered');
		}
	}
}

var notify = {
	onPonyEncountered: function() {
		// 播放警示音效。
		commons.audio('riddle_pony');
	}
	,onChallengeCleared: function() {
		commons.audio('challenge_cleared')
	}
	,onDefeated: function() {
		commons.audio('defeated')
	}
}

var robot = {
	onBattlePageModuleStart: function() {
	}
	,onBattlePageUpdated: function() {
		if (config.robot.keyMode) {
			var _this = this;
			document.addEventListener('keypress',function fn(e){
				if (e.keyCode == config.robot.keyCode) {
					document.removeEventListener('keypress',fn);
					_this.progress();
				}
			});
		} else {
			this.progress();
		}
	}
	,progress: function() {
		events.fire('onTurnResult');
		if (laoxu.continueDialog.yes) {
			if (laoxu.continueDialog.victory) {
				events.fire('onRoundCleared');
				if (laoxu.continueDialog.battleEnd) {
					events.fire('onChallengeCleared');
				} else {
					laoxu.continueDialog.click();
				}
			} else {
				events.fire('onDefeated')
			}
		} else {
			events.fire('onFight');
		}
	}
}

var heal = {
	parameters: {
		HealthGem:60		,HealthPotion:55
		,ManaGem:60			,ManaPotion:40
		,SpiritGem:70		,SpiritPotion:40	
		,Cure:50			,FullCure:10

		,load() {
			commons.store.load('ac.heal.',this);
		}
		,save() {
			commons.store.save('ac.heal.',this);
		}
	}
	,onBattlePageModuleStart: function() {
		this.parameters.load();
		this.parameters.save();
	}
	,exec() {
		var _this = this;
		var ha = ['HealthGem','HealthPotion','Cure','FullCure'];
		var ma = ['ManaGem','ManaPotion'];
		var sa = ['SpiritGem','SpiritPotion'];
		
		var hp = laoxu.basic.health.percent;
		var mp = laoxu.basic.magic.percent;
		var sp = laoxu.basic.spirit.percent;
		return restore(ha,hp) || restore(ma,mp) || restore(sa,sp) || laoxu.commit(GDT.MysticGem);
		//
		function restore(arr,p) {
			arr.sort(function(m,n){
				return _this.parameters[m] - _this.parameters[n];
			});
			var i;
			for(i=0; i < arr.length;i++) {
				var name = arr[i];
				var ae = _this.parameters[name];
				
				if (p <= ae && laoxu.commit(GDT[name])) 
					return true;
			}
			return false;
		}
	}
}

var buff = {
	parameters: {
		haste:{symbol:GDT.EHaste, keep:true}					,sparkOfLife:{symbol:GDT.ESparkOfLife, keep:true}
		,protection:{symbol:GDT.EProtection, keep:true}			,spiritShield:{symbol:GDT.ESpiritShield, keep:true}
		,shadowVeil:{symbol:GDT.EShadowVeil, keep:true}			,absorb:{symbol:GDT.EAbsorb, keep:true}
		,heartseeker:{symbol:GDT.EHeartseeker, keep:true}		,arcaneFocus:{symbol:GDT.EArcaneFocus, keep:true}

		,regen:{symbol:GDT.ERegen, keep:true, 	hp:70}				
		,regeneration:{symbol:GDT.ERegeneration, keep:true, 	hp:70}
		,replenishment:{symbol:GDT.EReplenishment, keep:true,mp:70}
		,refreshment:{symbol:GDT.ERefreshment, keep:true, 	sp:70}

		,load() {
			commons.store.load('ac.buff.',this);
			commons.forD(this, function(name,value) {
				if (typeof(value.symbol) == 'string') {
					value.symbol = GDT_Helper.lookup.byTypeAndName('effect', value.symbol);
				}
			});
		}
		,save() {
			commons.forD(this, function(name,value) {
				value._symbol = value.symbol;
				value.symbol = value.symbol.name;
			});
			commons.store.save('ac.buff.',this);
			commons.forD(this, function(name,value) {
				value.symbol = value._symbol;
				delete value._symbol;
			});
		}
	}
	,onBattlePageModuleStart: function() {
		this.parameters.load();
		this.parameters.save();
	}
	,exec() {
		var ret = this.channel() 
			|| this.normal(this.parameters.haste) 		|| this.normal(this.parameters.protection)
			|| this.normal(this.parameters.sparkOfLife)	|| this.normal(this.parameters.spiritShield)
			|| this.normal(this.parameters.shadowVeil)		
			|| this.restore(this.parameters.regen)
			|| this.normal(this.parameters.heartseeker)	|| this.normal(this.parameters.arcaneFocus)
			|| this.restore(this.parameters.regeneration)		
			|| this.restore(this.parameters.replenishment)			
			|| this.restore(this.parameters.refreshment)
		return ret;
	}
	,channel() {
		if (!laoxu.effects.get(GDT.EChanneling)) return false;
		var profit = 0,	effect = null;
		commons.forD(this.parameters, function(name,value) {
			if ( value.keep && value.symbol.spellRef) {
				var spell = laoxu.spellBook.get(GDT[value.symbol.spellRef]);
				var E = laoxu.effects.get(value.symbol);
				var r = E ? E.remaining : 0;
				if (r != Infinity) {
					var p = spell.mana * 1.5;
					if (r > 0) {
						p = p - spell.mana * r / spell.duration;
					}
					p = Math.ceil(p);
					if (profit < p) {
						profit = p;
						effect = value.symbol;
					}
				}
			}
		});
		if (effect != null) {
			return laoxu.commit(GDT[effect.spellRef]);
		}
		return false;
	}
	,normal(param) {
		return param.keep && laoxu.effects.get(param.symbol) == null && laoxu.commit(GDT[param.symbol.spellRef]);
	}
	,restore(param) {
		return param.keep 
			&& laoxu.effects.get(param.symbol) == null 
			&& (param.hp != undefined ? laoxu.basic.health.percent <= param.hp : true)
			&& (param.mp != undefined ? laoxu.basic.magic.percent <= param.mp : true)
			&& (param.sp != undefined ? laoxu.basic.spirit.percent <= param.sp : true)
			&& laoxu.commit(GDT[param.symbol.spellRef] || GDT[param.symbol.itemRef])
	}
}

var spiritStance = {
	parameters: {
		overcharge: 240
	}
	,onBattlePageModuleStart: function() {
		commons.store.load('ac.spiritmode.',this.parameters);
		commons.store.save('ac.spiritmode.',this.parameters);
	}
	,exec: function() {
		return !laoxu.basic.spiritStance && laoxu.basic.overcharge.percent >= this.parameters.overcharge && laoxu.commit(GDT.SpiritStance);
	}
}


var one_hand = {
	onFight: function() {
		return this.exec();
	}
	,exec() {
		return heal.exec() || buff.exec() || spiritStance.exec() || this.attack.exec();
	}
	,attack: {
		parameters: {
			"Manbearpig":2	,"White Bunneh":2	,"Mithra":2	,"Dalek":2
			
			,"Konata":3	,"Mikuru Asahina":3	,"Ryouko Asakura":3	,"Yuki Nagato":3
			
			,"Yggdrasil":0	//这丫会给其他怪加血，先揍它。
			,"Skuld":4	,"Urd":4	,"Verdandi":4
			
			,"Rhaegal":5	,"Viserion":5	,"Drogon":5
			
			,"Real Life":6	,"Invisible Pink Unicorn":6	,"Flying Spaghetti Monster":6
				
			,priority(name) {
				var d = this[name];
				//不在列表中的怪为普通小怪，优先级定为1。
				if (!d) d = 1;
				return d;
			}
			,load() {
				commons.store.load('ac.one_hand.',this);
			}
			,save() {
				commons.store.save('ac.one_hand.',this);
			}
		}
		,onBattlePageModuleStart: function() {
			this.parameters.load();
			this.parameters.save();
			buff.parameters.arcaneFocus.keep = false;			
		}
		,exec() {
			var _this = this;
			var monster = chooseTarget();
			if (monster) {
				SB(monster) || VS(monster) || MB(monster);
				return laoxu.target(monster);
			}
			return false;
			
			function SB(monster) {
				var E = monster.effects.get(GDT.EStunned);
				return (E == null || E.remaining >= 2) && laoxu.basic.overcharge.value >= 25
					&& laoxu.basic.spiritStance && laoxu.commit(GDT.ShieldBash);
			}
			
			function VS(monster) {
				return laoxu.commit(GDT.VitalStrike);
			}

			function MB(monster) {
				return monster.isBoss && monster.health.percent < 25 && monster.effects.get(GDT.EBleedingWound) != null
					&& laoxu.commit(GDT.MercifulBlow);
			}

			function chooseTarget() {
				var target=null,min=99;
				// commons.forEach(laoxu.monsters.getList(),function(monster){
				var list = laoxu.monsters.getList()
				var i = list.length;
				while(i--) {
					var monster = list[i];
					var name = monster.name;
					var p = _this.parameters.priority(name);
					if (p == 0) {
						target = monster;
						return true;
					} else if (p < min) {
						target = monster;
						min = p;
					}
				// });
				}
				return target;
			}
		}
	}
}

// -----------------------------------------------------------------
var config = {
	robot:	{ keyMode:false,keyCode:46 }
	,onBattlePageModuleStart: function() {
		commons.store.load('ac.config.',this);
		commons.store.save('ac.config.',this);
	}
}

var events = {
	onBattlePageModuleStart:	{ handlers:[config,hello,ajax,robot,heal,buff,spiritStance,one_hand.attack]}
	,onAjaxDocumentArrived:		{ handlers:[update]}
	,onBattlePageUpdated:		{ handlers:[laoxu,robot]}
	,onPonyEncountered:			{ handlers:[notify]}

	,onTurnResult:				{ handlers:[]}
	,onRoundCleared:			{ handlers:[]}
	,onChallengeCleared:		{ handlers:[notify]}
	,onDefeated:				{ handlers:[notify]}
	,onFight:					{ handlers:[one_hand]}
	,onBeforeCast:				{ handlers:[laoxu]}

	,fire(name,data) {
		var handlers = events[name].handlers;
		for(var i=0,len=handlers.length;i<len;i++) {
			if (handlers[i][name](data) === true) return true;
		}
	}
	,queue(name,data) {
		var _this = this;
		setTimeout(function() {
			_this.fire(name,data);
		});
	}
}


var modules = [BattlePageModule]
	
for (var i = 0, len = modules.length; i < len; i++) {
	if (modules[i].test(document)) {
		modules[i].start();
	}
}

