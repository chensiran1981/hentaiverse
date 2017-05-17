// 2016-11-19	采用的新的设计，见日志
var GDT = {
	//HTML&JS
	BattleForm:	{ id:'battleform'}
	,RiddleForm:	{ id:'riddleform'}
	,StuffBox:	{ className:'stuffbox'}
	,HookSubmit:	{ code:'battleform.submit = function() {document.dispatchEvent(new CustomEvent(\'submitBattleForm\'));}; document.addEventListener(\'reinitializeBattleManager\',function(e) {window.battle = new window.Battle();window.battle.clear_infopane();});'}                                                                  
	,SubmitBattleForm:			{name:'submitBattleForm'}
	,ReinitializeBattleManager:		{name:'reinitializeBattleManager'}
	//Basic
	,Overcharge:	{ name:'Overcharge',		max:250	}
	//Difficulty
	,PFUDOR: 	{ name:'PFUDOR'}
	//Title
	,Newbie: 	{ name:'Newbie'}
	//Item
	,HealthGem:		{ name:'Health Gem',	type:'item'}
	,ManaGem:		{ name:'Mana Gem',		type:'item'}
	,SpiritGem:		{ name:'Spirit Gem',		type:'item'}
	,MysticGem:		{ name:'Mystic Gem',	type:'item', 	effectRef:'EChanneling'}
	,HealthDraught:	{ name:'Health Draught',	type:'item',	effectRef:'ERegeneration'}
	,ManaDraught:	{ name:'Mana Draught',	type:'item',	effectRef:'EReplenishment'}
	,SpiritDraught:	{ name:'Spirit Draught',	type:'item',	effectRef:'ERefreshment'}
	,HealthPotion:	{ name:'Health Potion',	type:'item'}
	,ManaPotion:		{ name:'Mana Potion',	type:'item'}
	,SpiritPotion:		{ name:'Spirit Potion',	type:'item'}
	,HealthElixir:		{ name:'Health Elixir',	type:'item'}
	,ManaElixir:		{ name:'Mana Elixir',	type:'item'}
	,SpiritElixir:		{ name:'Spirit Elixir',	type:'item'}
	,LastElixir:		{ name:'Last Elixir',		type:'item'}

	//Spell
	,Flee:			{ name:'Flee',		type:'spell',	id:1001}
	,Scan:			{ name:'Scan',		type:'spell',	id:1011}
	,IrisStrike:		{ name:'Iris Strike',		type:'spell',	id:2401}
	,Backstab:		{ name:'Backstab',		type:'spell',	id:2402}
	,FrenziedBlows:	{ name:'Frenzied Blows',	type:'spell',	id:2403}
	,ShieldBash:		{ name:'Shield Bash',	type:'spell',	id:2201}
	,VitalStrike: 		{ name:'Vital Strike',	type:'spell',	id:2202}
	,MercifulBlow:	{ name:'Merciful Blow',	type:'spell',	id:2203}
	,FieryBlast:		{ name:'Fiery Blast',		type:'spell',	id:111}
	,Inferno:		{ name:'Inferno',		type:'spell',	id:112}
	,FlamesOfLoki:	{ name:'Flames of Loki',	type:'spell',	id:113}
	,Freeze:		{ name:'Freeze',		type:'spell',	id:121}
	,Blizzard:		{ name:'Blizzard',		type:'spell',	id:122}
	,Fimbulvetr:		{ name:'Fimbulvetr',		type:'spell',	id:123}
	,Shockblast:		{ name:'Shockblast',		type:'spell',	id:131}
	,ChainedLightning:	{ name:'Chained Lightning',	type:'spell',	id:132}
	,WrathOfThor:	{ name:'Wrath of Thor',	type:'spell',	id:133}
	,Gale:			{ name:'Gale',		type:'spell',	id:141}
	,Downburst:		{ name:'Downburst',		type:'spell',	id:142}
	,StormsOfNjord:	{ name:'Storms of Njord',	type:'spell',	id:143}
	,Smite:		{ name:'Smite',		type:'spell',	id:151}
	,Banishment:		{ name:'Banishment',	type:'spell',	id:152}
	,ParadiseLost:	{ name:'Paradise Lost',	type:'spell',	id:153}
	,Corruption:		{ name:'Corruption',		type:'spell',	id:161}
	,Disintegrate:		{ name:'Disintegrate',	type:'spell',	id:162}
	,Ragnarok:		{ name:'Ragnarok',		type:'spell',	id:163}
	,Drain:			{ name:'Drain',		type:'spell',	id:211}
	,Weaken:		{ name:'Weaken',		type:'spell',	id:212}
	,Imperil:		{ name:'Imperil',		type:'spell',	id:213}
	,Slow:			{ name:'Slow',		type:'spell',	id:221}
	,Sleep:			{ name:'Sleep',		type:'spell',	id:222}
	,Confuse:		{ name:'Confuse',		type:'spell',	id:223}
	,Blind:			{ name:'Blind',		type:'spell',	id:231}
	,Silence:		{ name:'Silence',		type:'spell',	id:232}
	,MagNet:		{ name:'MagNet',		type:'spell',	id:233}
	,Cure:			{ name:'Cure',		type:'spell',	id:311}
	,Regen:		{ name:'Regen',		type:'spell',	id:312,		effectRef:'ERegen'}
	,FullCure:		{ name:'Full-Cure',		type:'spell',	id:313}
	,Protection:		{ name:'Protection',		type:'spell',	id:411,		effectRef:'EProtection'}
	,Haste:		{ name:'Haste',		type:'spell',	id:412,		effectRef:'EHaste'}
	,ShadowVeil:		{ name:'Shadow Veil',	type:'spell',	id:413,		effectRef:'EShadowVeil'}
	,Absorb:		{ name:'Absorb',		type:'spell',	id:421,		effectRef:'EAbsorb'}
	,SparkOfLife:	{ name:'Spark of Life',	type:'spell',	id:422,	effectRef:'ESparkOfLife'}
	,SpiritShield:		{ name:'Spirit Shield',	type:'spell',	id:423,	effectRef:'ESpiritShield'}
	,Heartseeker:	{ name:'Heartseeker',	type:'spell',	id:431,		effectRef:'EHeartseeker'}
	,ArcaneFocus:	{ name:'Arcane Focus',	type:'spell',	id:432,	effectRef:'EArcaneFocus'}
	//Effect
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
	//Boss
	,Manbearpig: 		{ name:'Manbearpig', type:'monster', isBoss:true}
	,WhiteBunneh: 	{ name:'White Bunneh', type:'monster', isBoss:true}	
	,Mithra: 		{ name:'Mithra', type:'monster', isBoss:true}	
	,Dalek: 		{ name:'Dalek', type:'monster', isBoss:true}
			
	,Konata: 		{ name:'Konata', type:'monster', isBoss:true}	
	,MikuruAsahina: 	{ name:'Mikuru Asahina', type:'monster', isBoss:true}	
	,RyoukoAsakura: 	{ name:'Ryouko Asakura', type:'monster', isBoss:true}	
	,YukiNagato: 		{ name:'Yuki Nagato', type:'monster', isBoss:true}
	
	,Yggdrasil: 		{ name:'Yggdrasil', type:'monster', isBoss:true}
	,Skuld: 		{ name:'Skuld', type:'monster', isBoss:true}	
	,Urd: 			{ name:'Urd', type:'monster', isBoss:true}	
	,Verdandi: 		{ name:'Verdandi', type:'monster', isBoss:true}
	
	,Rhaegal: 		{ name:'Rhaegal', type:'monster', isBoss:true}	
	,Viserion: 		{ name:'Viserion', type:'monster', isBoss:true}	
	,Drogon: 		{ name:'Drogon', type:'monster', isBoss:true}
	
	,RealLife: 			{ name:'Real Life', type:'monster', isBoss:true}	
	,InvisiblePinkUnicorn:  	{ name:'Invisible Pink Unicorn', type:'monster', isBoss:true}	
	,FlyingSpaghettiMonster:  	{ name:'Flying Spaghetti Monster', type:'monster', isBoss:true}	
}

var GDTHelper = {
	bosses:null
	,boss(name)  {
		if (this.bosses == null) {
			this.bosses = {};
			var key,value;
			for(key in GDT) {
				value = GDT[key];
				if (value.type && value.type == 'monster' && value.isBoss == true) {
					this.bosses[value.name] = value;
				}
			}
		}
		return this.bosses[name];
	}
}

var commons = {
	array: {
		foreach(array, func) {
			var i=0;len=array.length;
			for(; i < len ; i++) {
				if (func(i, array[i])) return i;
			}
			return len-1;
		}
	}
	,map: {
		foreach(map, func) {
			var key;
			for (key in map) {
				var value = map[key];
				if (typeof(value) !== 'function' && func(key,value)) return key;
			}
			return key;
		}
	}
	,store: {
		load(path, object) {
			var jsonString;
			var pathLen=path.length, lastPathChar = path.charAt(pathLen-1);
			if (object === undefined) {
				if (lastPathChar === '.') {
					var ret = {}, empty = true;
					var i=0, len=localStorage.length,  key, name, value;
					for(;i<len;i++) {
						key = localStorage.key(i);
						if (key.length > pathLen && key.indexOf(path) == 0) {
							name = key.substr(pathLen);
							value = JSON.parse(localStorage.getItem(key));
							ret[name] = value; empty = false;
						}
					}
					if (empty) return null;
					else return ret;
				} else {
					return JSON.parse(localStorage.getItem(path));
				}
			} else {
				if (lastPathChar === '.') {
					var key;
					commons.map.foreach(object, function(name,value) {
						if (name.indexOf('_') != 0) {
							key = path+name;
							jsonString = localStorage.getItem(key);
							if (jsonString !== null)  object[name]  = JSON.parse(jsonString);
							else localStorage.setItem(key, JSON.stringify(value));
						}
					});
				} else {
					jsonString = localStorage.getItem(path);
					var needInitialization = true;
					if (jsonString !== null) {
						needInitialization = false;
						var his = JSON.parse(jsonString);
						commons.map.foreach(object, function(name,value) {
							if (name.indexOf('_') != 0) {
								var hisvalue = his[name];
								if (hisvalue !== undefined) object[name] = hisvalue;
								else needInitialization = true;
							}
						});
					} 
					if (needInitialization) {
						jsonString = JSON.stringify(object, function(name,value) {
							if (name.indexOf('_') == 0) return undefined;
							else return value;
						});
						localStorage.setItem(path, jsonString);
					}
				}
			}
		}
		,save(path, object) {
			var lastChar = path.charAt(path.length-1);
			if (lastChar === '.') {
				commons.map.foreach(object, function(name,value) {
					if (name.indexOf('_') == 0) return;
					localStorage.setItem(path+name, JSON.stringify(value, commons.store.jsonfilter));
				});
			} else {
				localStorage.setItem(path, JSON.stringify(object, commons.store.jsonfilter));
			}
		}
		,jsonfilter: function(name, value) {
			if (name.indexOf('_') == 0) return undefined;
			else return value;
		}
	}

	,dialog: {
		apply(titleString, func) {
			var template = document.createElement('template');
			var overlayHtml = '<div  id="ac_overlay" style="top: 0px;left: 0px;z-index: 1000;position: absolute;background-color:rgba(255,255,255,0.5);"></div>';
			var dialogHtml = '<div id="ac_dialog" style="top: 10%; left: 10%; bottom: 10%; right: 10%; position: absolute; border: 1px solid; border-radius: 5px; z-index: 1001; display:flex; flex-flow: column; background-color: white;" ><div id="ac_title" style="border-bottom: 1px solid;height: 2em;padding-top: 5px;"><span class="ac_titleString" style="margin-left: 10px;">我是对话框</span><span style="float: right;margin-right: 10px;"><a class="ac_close" href="javascript:void(0)">关闭</a></span></div><div class="ac_content" style="display:flex;flex: 1 1 auto;"></div><div id="ac_foot" style="padding-top: 5px;padding-bottom: 5px;border-top: 1px solid;"><button class="ac_apply" style="width: 50px;float: right;margin-right: 10px;"> Apply </button></div></div>';
			template.innerHTML = overlayHtml + dialogHtml;
			var overlay = template.content.childNodes[0], dlg = template.content.childNodes[1];
			var w = document.body.scrollWidth, h = document.body.scrollHeight;
			overlay.style.width = w+'px';overlay.style.height = h+'px';
			var ac_titleString = dlg.getElementsByClassName('ac_titleString')[0];
			ac_titleString.textContent = titleString;
			var ac_close =  dlg.getElementsByClassName('ac_close')[0];
			ac_close.onclick = close;
			var ac_apply =  dlg.getElementsByClassName('ac_apply')[0];
			ac_apply.onclick = func;
			var ac_content =  dlg.getElementsByClassName('ac_content')[0];
			function close() {
				overlay.remove(); dlg.remove();
			}
			return {
				show() {
					document.body.appendChild(overlay);
					document.body.appendChild(dlg);
					template.remove();
				}
				,getContentPane() {
					return ac_content;
				}
			}
		}
	}
	,audio: {
		defeated() {
			chrome.runtime.sendMessage({cmd:'audio',file:'defeated.mp3'});
		}
		,challengeCleared() {
			chrome.runtime.sendMessage({cmd:'audio',file:'victory.mp3'});
		}
		,pony() {
			chrome.runtime.sendMessage({cmd:'audio',file:'pony.mp3'});
		}
	}
};

var Gauge = function(value,max) {
	this.set(value, max);
};
Gauge.prototype.set = function(value, max) {
	this.value = parseInt(value); this.max = parseInt(max); 
	if (this.value==0) this.percent = 0;
	else this.percent = Math.round(100 * this.value / this.max);
};

var Effect = function(name) {
	this.name = name; this.stack = 0; this.duration = new Gauge(0,0);
}

var Spell = function(name, id) {
	this.name = name; this.id = id; this.mana = 0; this.overcharge = 0; this.cooldown = 0;
}

var Creature = function(name) {
	this.name = name;
	this.level = 0;
	this.health = new Gauge(0,0);
	this.magic = new Gauge(0,0);
	this.spirit = new Gauge(0,0);
	this.effects = {};
}

var Player = function() {
	Creature.call(this, 'player');
	this.overcharge = new Gauge(0,0); this.title = GDT.Newbie; this.spells = {};
}
Player.prototype = Object.create(Creature.prototype);

var Monster = function(name) {
	Creature.call(this, name);
}
Monster.prototype = Object.create(Creature.prototype);

var events = {
	fire(name,data) {
		var handlers = this[name];
		if (handlers) {
			commons.array.foreach(handlers, function(index,handler) {
				return handler[name](data);
			});
		}
	}
	,queue(name,data) {
		var _this = this;
		setTimeout(function() {
			_this.fire(name,data);
		});
	}
}

var BattlePage = {
	yes(doc) {
		return (doc || document).getElementById(GDT.BattleForm.id) != null;
	}
	,start() {
		events.fire('onBattlePageStarted');
		events.fire('onBattlePageUpdated');
	}
}

var RiddlePage = {
	yes(doc) {
		return (doc || document).getElementById(GDT.RiddleForm.id) != null;
	}
	,start() {
		events.fire('onWhoIsThisPony');
	}
}

var ajax = (function() {
	var submiting = false;
	function battleFormPostString() {
		var form = document.getElementById(GDT.BattleForm.id);
		var inputs = form.getElementsByTagName('input');
		var encodedString = '';
		commons.forEach(inputs,function(input) {
			var name = input.name, value = input.value;
			encodedString = encodedString + '&' + name + '=' + value;
		});
		return encodedString.substr(1,encodedString.length);
	};
	function AJAXSubmit() {
		if (!submiting) {
			var xhr = new XMLHttpRequest();
			xhr.open('post','',true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.responseType = 'document';
			xhr.onload = function() {
				submiting = false;
				if (xhr.status>=200 && xhr.status<400) {
					events.fire('onAjaxDocumentArrived',xhr.response);
				}
				else 
					commons.report('故障: '+xhr.status);
			}
			xhr.onerror = function(e) {
				submiting = false;
				commons.report('故障: '+e);
			}
			encodedString = battleFormPostString();
			submiting = true;
			xhr.send(encodedString);
		}
	};
	return {
		onBattlePageStarted: function() {
			submiting = false;
			var f = document.getElementById(GDT.BattleForm.id);
			document.body.appendChild(f);
			f.submit = AJAXSubmit;		
			var code = GDT.HookSubmit.code;
			var tag = document.createElement('script');
			tag.innerHTML = code;
			document.body.appendChild(tag);
			document.removeEventListener(GDT.SubmitBattleForm.name, ajax.AJAXSubmit);
			document.addEventListener(GDT.SubmitBattleForm.name, ajax.AJAXSubmit);
		}
	}
})()

var updater = {
	onAjaxDocumentArrived: function(arrivedDocument) {
		if (BattlePage.yes(arrivedDocument))	{
			arrivedDocument.getElementById(GDT.BattleForm.id).remove();
			var oldStuffBox = document.getElementsByClassName(GDT.StuffBox.className)[0];
			var newStuffBox = arrivedDocument.getElementsByClassName(GDT.StuffBox.className)[0];
			document.body.replaceChild(newStuffBox,oldStuffBox);
			document.dispatchEvent(new CustomEvent(GDT.ReinitializeBattleManager.name));
			events.queue('onBattlePageUpdated');
		} else if (RiddlePage.yes(arrivedDocument)) {
			var oldStuffBox = document.getElementsByClassName(GDT.StuffBox.className)[0];
			var newStuffBox = arrivedDocument.getElementsByClassName(GDT.StuffBox.className)[0];
			document.body.replaceChild(newStuffBox,oldStuffBox);
			document.dispatchEvent(new CustomEvent(GDT.ReinitializeBattleManager.name));
			events.queue('onWhoIsThisPony');
		}
	}
}

var audio = {
	onWhoIsThisPony: function() {
		commons.audio.pony();
	}
	,onChallengeCleared: function() {
		commons.audio.challengeCleared();
	}
	,onDefeated: function() {
		commons.audio.defeated();
	}
}

var laoxu = (function() {
	var ret = {
		difficulty: GDT.PFUDOR
		,gem: ''
		,player: new Player()
		,monsters: {}
	}
	function updateEffect(element, effects) {
		var set_infopane_effect = element.getAttribute('onmouseover');
		var args = /set_infopane_effect\((.+)\)/i.exec(set_infopane_effect)[1];
		eval('resolve('+args+');');

		function resolve(name,desc,remaining) {
			// 形如：'bleeding (x3)'
			var g = /(.+) (?:\(x(\d+)\))/.exec(name);
			var stack=0;
			if (g != null) {
				name = g[1];
				stack = parseInt(g[2]);
			}
			if (isNaN(parseInt(remaining))) remaining = Infinity;
			var effect = effects[name];
			if (!effect) {
				effect = new Effect(name);
				effects[name] = effect;
			}
			effect.stack = stack;
			effect.duration.set(remaining, effect.duration.max);
		}
	}
	function updateSpell(element, spells) {
		var onmouseover = element.getAttribute('onmouseover');
		//battle.set_infopane_spell('Merciful Blow', 'Finish off a mortally wounded enemy. Instantly kills a target with bleed and less than 25% health.', 'smerciful', 0, 75, 10)
		var args = /set_infopane_spell\((.+)\)/.exec(onmouseover)[1];
		eval('resolve(' + args + ')');

		function resolve(name,desc,pic,mana,overcharge,cooldown) {
			var spell = spells[name];
			if (!spell) {
				spell = new Spell(name, element.id);
				spells[name] = spell;
			}
			if (spell.mana == 0) spell.mana = mana;
			else if (mana != 1) spell.mana = mana;
			spell.overcharge = overcharge; spell.cooldown = cooldown;
		}
	}
	function updateMonster(element, monsters) {
		var nameDiv = element.getElementsByClassName("btm3")[0];
		var name = nameDiv.textContent;
		var mon = monsters[name];
		if (!mon) {
			mon = new Monster(name); 
			monsters[name] = mon;
		}
		mon.position = parseInt(element.id.substr(5));
		mon.isBoss = GDTHelper.boss(name) !== undefined;
		var healthDiv = element.getElementsByClassName('btm5')[0];
		var healthImg = healthDiv.getElementsByTagName('img')[0];
		var h = healthImg.style.width.match(/\d+/)[0];
		h = Math.round(parseInt(h) * 100 / 120);
		mon.health.percent = h;

		var effectDiv = element.getElementsByClassName("btm6")[0];
		var effectImgs = effectDiv.getElementsByTagName('img');
		for (var j=0,len = effectImgs.length;j<len;j++) {
			updateEffect(effectImgs[j], mon.effects);
		}
	}
	function checkGem() {
		//检查gem
		ret.gem = '';
		var div = document.querySelector("#ikey_p[onclick]");
		if (div) {
			ret.gem = div.textContent;
		}
	}
	function checkPlayer() {
		//检查生命、法力、灵力、怒气。
		var divs = document.querySelectorAll('.cwbdv');
		var hp = divs[0].textContent.trim().split(' / ');
		var mp = divs[1].textContent.trim().split(' / ');
		var sp = divs[2].textContent.trim().split(' / ');
		var oc = divs[3].textContent.trim().split('%');
		ret.player.health.set(hp[0],hp[1]);
		ret.player.magic.set(mp[0],mp[1]);
		ret.player.spirit.set(sp[0],sp[1]);
		ret.player.overcharge.set(oc[0],GDT.Overcharge.max);
		//检查姿态。
		var img = document.querySelector('img#ckey_spirit');
		ret.player.spiritStance = img.src.indexOf('spirit_n.png') == -1;
		//检查身上的效果。
		var imgs = document.querySelectorAll('div#mainpane>div.btt>div.bte>img');
		var effects = ret.player.effects;
		for(var i = 0, len = imgs.length; i < len; i++) {
			updateEffect(imgs[i], effects);
		}
	}
	function checkSpells() {
		var divs = document.querySelectorAll('.btsd');
		var spells = ret.player.spells;
		for (var i=0, len = divs.length; i < len; i++) {
			updateSpell(divs[i], spells);
		}
	}
	function checkMonsters() {
		var divs = document.querySelectorAll('[id^=mkey_][onclick]');
		ret.monsters = {};
		var monsters = ret.monsters;
		for (var i = 0, len = divs.length; i < len; i++) {
			updateMonster(divs[i], monsters);
		}

	}
	ret.onBattlePageUpdated = function() {
		checkGem();
		checkPlayer();
		checkSpells();
		checkMonsters();
	}
	return ret;
})()

var config = (function() {
	function settings() {
		config.pages = [BattlePage,RiddlePage];
		events.onBattlePageStarted = [ajax];
		events.onBattlePageUpdated = [laoxu];
		events.onAjaxDocumentArrived = [updater];
		events.onWhoIsThisPony = [audio];
		events.onChallengeCleared = [audio];
		events.onDefeated = [audio];
	};
	settings.version = '000';
	var storeKey = 'ac.config.'+settings.version;
	var defaultConfigLines = /settings[\s\S]+?{([\s\S]*)}/m.exec(settings.toString())[1].trim();
	function getStoredConfigLines() {
		return localStorage.getItem(storeKey);
	}
	function saveConfigLines(lines) {
		if (lines) localStorage.setItem(storeKey, lines);
		else localStorage.setItem(storeKey, defaultConfigLines);
	}
	return {
		load() {
			var configLines = getStoredConfigLines();
			if (!configLines) {
				configLines = defaultConfigLines;
				saveConfigLines(configLines);
			}
			eval(configLines);			
		}
		,edit() {
			var txtArea = document.createElement('textarea');
			var lines = getStoredConfigLines();
			if (!lines) lines = defaultConfigLines;
			txtArea.value = lines;
			txtArea.style.cssText = 'width:100%;resize:none;margin:2px;padding:5px';

			var dlg = commons.dialog.apply('编辑配置', function() {
				var codes = txtArea.value;
				eval(codes);
				saveConfigLines(codes);
			});
			dlg.getContentPane().appendChild(txtArea);
			dlg.show();
		}
	}
})()
//
config.load();
BattlePage.start();


