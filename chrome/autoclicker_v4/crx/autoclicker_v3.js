var GDT = {
	BattleForm:		{id:'battleform'}
	,RiddleForm:	{id:'riddleform'}
	,StuffBox:		{className:'stuffbox'}
	,HookSubmit:	{code:'battleform.submit = function() {document.dispatchEvent(new CustomEvent(\'submitBattleForm\'));}; document.addEventListener(\'reinitializeBattleManager\',function(e) {window.battle = new window.Battle();window.battle.clear_infopane();});'}                                                                  
	,SubmitBattleForm:			{name:'submitBattleForm'}
	,ReinitializeBattleManager:	{name:'reinitializeBattleManager'}
	
	,RiddleAlertSound:			{filename:'horse.ogg'}
	
	,HealthGem:		{ name:'Health Gem',		type:'item'	}
	,ManaGem:		{ name:'Mana Gem',			type:'item'	}
	,SpiritGem:		{ name:'Spirit Gem',		type:'item'	}
	,MysticGem:		{ name:'Mystic Gem',		type:'item',	buffName:'Channeling'}
	,HealthDraught:	{ name:'Health Draught',	type:'item',	buffName:'Regeneration'}
	,ManaDraught:	{ name:'Mana Draught',		type:'item',	buffName:'Replenishment'}
	,SpiritDraught:	{ name:'Spirit Draught',	type:'item',	buffName:'Refreshment'}
	,HealthPotion:	{ name:'Health Potion',		type:'item'}
	,ManaPotion:	{ name:'Mana Potion',		type:'item'}
	,SpiritPotion:	{ name:'Spirit Potion',		type:'item'}
	,HealthElixir:	{ name:'Health Elixir',		type:'item'}
	,ManaElixir:	{ name:'Mana Elixir',		type:'item'}
	,SpiritElixir:	{ name:'Spirit Elixir',		type:'item'}
	,LastElixir:	{ name:'Last Elixir',		type:'item'}
	
	,Overcharge:	{ name:'Overcharge',		max:250	}
	
	,Flee:				{ name:'Flee',				type:'skill',	id:1001}
	,Scan:				{ name:'Scan',				type:'skill',	id:1011}
	,IrisStrike:		{ name:'Iris Strike',		type:'skill',	id:2401}
	,Backstab:			{ name:'Backstab',			type:'skill',	id:2402}
	,FrenziedBlows:		{ name:'Frenzied Blows',	type:'skill',	id:2403}
	,ShieldBash:		{ name:'Shield Bash',		type:'skill',	id:2201}
	,VitalStrike: 		{ name:'Vital Strike',		type:'skill',	id:2202}
	,MercifulBlow:		{ name:'Merciful Blow',		type:'skill',	id:2203}
	,FieryBlast:		{ name:'Fiery Blast',		type:'skill',	id:111}
	,Inferno:			{ name:'Inferno',			type:'skill',	id:112}
	,FlamesOfLoki:		{ name:'Flames of Loki',	type:'skill',	id:113}
	,Freeze:			{ name:'Freeze',			type:'skill',	id:121}
	,Blizzard:			{ name:'Blizzard',			type:'skill',	id:122}
	,Fimbulvetr:		{ name:'Fimbulvetr',		type:'skill',	id:123}
	,Shockblast:		{ name:'Shockblast',		type:'skill',	id:131}
	,ChainedLightning:	{ name:'Chained Lightning',	type:'skill',	id:132}
	,WrathOfThor:		{ name:'Wrath of Thor',		type:'skill',	id:133}
	,Gale:				{ name:'Gale',				type:'skill',	id:141}
	,Downburst:			{ name:'Downburst',			type:'skill',	id:142}
	,StormsOfNjord:		{ name:'Storms of Njord',	type:'skill',	id:143}
	,Smite:				{ name:'Smite',				type:'skill',	id:151}
	,Banishment:		{ name:'Banishment',		type:'skill',	id:152}
	,ParadiseLost:		{ name:'Paradise Lost',		type:'skill',	id:153}
	,Corruption:		{ name:'Corruption',		type:'skill',	id:161}
	,Disintegrate:		{ name:'Disintegrate',		type:'skill',	id:162}
	,Ragnarok:			{ name:'Ragnarok',			type:'skill',	id:163}
	,Drain:				{ name:'Drain',				type:'skill',	id:211}
	,Weaken:			{ name:'Weaken',			type:'skill',	id:212}
	,Imperil:			{ name:'Imperil',			type:'skill',	id:213}
	,Slow:				{ name:'Slow',				type:'skill',	id:221}
	,Sleep:				{ name:'Sleep',				type:'skill',	id:222}
	,Confuse:			{ name:'Confuse',			type:'skill',	id:223}
	,Blind:				{ name:'Blind',				type:'skill',	id:231}
	,Silence:			{ name:'Silence',			type:'skill',	id:232}
	,MagNet:			{ name:'MagNet',			type:'skill',	id:233}
	,Cure:				{ name:'Cure',				type:'skill',	id:311}
	,Regen:				{ name:'Regen',				type:'skill',	id:312,	buffName:'Regen'}
	,FullCure:			{ name:'Full-Cure',			type:'skill',	id:313}
	,Protection:		{ name:'Protection',		type:'skill',	id:411,	buffName:'Protection'}
	,Haste:				{ name:'Haste',				type:'skill',	id:412,	buffName:'Hastened'}
	,ShadowVeil:		{ name:'Shadow Veil',		type:'skill',	id:413,	buffName:'Shadow Veil'}
	,Absorb:			{ name:'Absorb',			type:'skill',	id:421,	buffName:'Absorbing Ward'}
	,SparkOfLife:		{ name:'Spark of Life',		type:'skill',	id:422,	buffName:'Spark of Life'}
	,SpiritShield:		{ name:'Spirit Shield',		type:'skill',	id:423,	buffName:'Spirit Shield'}
	,Heartseeker:		{ name:'Heartseeker',		type:'skill',	id:431,	buffName:'Heartseeker'}
	,ArcaneFocus:		{ name:'Arcane Focus',		type:'skill',	id:432,	buffName:'Arcane Focus'}
	,Channeling:		{ name:'Channeling',								buffName:'Channeling'}
	,Stunned:			{ name:'Stunned',									buffName:'Stunned'}
	,BleedingWound: 	{ name:'Bleeding Wound',							buffName:'Bleeding Wound'}
	
	,SpiritStance:		{ name:'Spirit',			type:'mode',	mode:'spirit'}
	
	,randomEncounter:	{ name:'random encounter'}
	,battleStart:		{ name:'battle start'}	
	,roundStart:		{ name:'round start'}
	
	,grindfest:			{ name:'Grindfest',			type:'challenge'}
	
	,defeated:			{}
	,hurt:				{}
	,heal:				{}

	//----------------------------------------------------------------------------------------------------
}

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
	
	,gauge(value,max) {
		var percent = 0;
		value = commons.pInt(value);
		max = commons.pInt(max);
		if (value == max) 
			percent = 100;
		else 
			percent = (value * 100 / max).toFixed(0);
		return {value:value,max:max,percent:percent};
	}
	
	//
	,listen(obj,eventName,f) {
		obj.addEventListener(eventName,function(e){
			//console.log(e);
			f(e);
		});
	}
	,call(obj,name) {
		obj.dispatchEvent(new CustomEvent(name));
	}
	
	//
	,forEach(indexedCollection,f) {
		for(var i=0;i<indexedCollection.length;i++) 
			f(indexedCollection[i]);
	}
	
	,forD(obj,f) {
		var names = Object.getOwnPropertyNames(obj);
		for (var i = 0; i < names.length; i++) {
			var name = names[i];
			var value = obj[name];
			var type = typeof(value);
			if (type !== 'function') 
				if (f(name,value) === true) break;
		}
	}
	
	,audio(src,onend) {
		chrome.runtime.sendMessage({cmd:'audio',src:src}, function (response) {
			if (onend) onend();
		});
		/*
		if (src.indexOf('://') == -1)
			src = chrome.extension.getURL(src);
		
		var audioTag = document.createElement("audio");
		audioTag.src = src;
		//audioTag.setAttribute("autoplay","autoplay");
		audioTag.onended = function() {
			audioTag.remove();
			onend();
		}
		document.body.appendChild(audioTag);
		audioTag.play();
		*/
	}
	
	,audioWithControl(src,top,left) {
		commons.audio(src,function(r) {
			commons.audio(src);
		});
		/*
		if (src.indexOf('://') == -1)
			src = chrome.extension.getURL(src);
		
		var divAudio = document.createElement("div");
		divAudio.style.cssText = 'position: absolute;top: '+top+'px;left: '+left+'px;';
		var audioTag = document.createElement("audio");
		audioTag.src = src
		audioTag.loop = 'loop';
		audioTag.controls = 'controls';
		divAudio.appendChild(audioTag);
		document.body.appendChild(divAudio);
		audioTag.play();
		*/
	}
	
	,report(msg) {
		console.log(msg);
	}
	
	,store:{
		clear(obj) {
			var path;
			var type = typeof(obj);
			if (type === 'object')
				path = obj._path;
			else
				path = obj.toString();
				
			var toDel = [];
			if (path.charAt(path.length-1) == '.') {
				for(var i=0;i<localStorage.length;i++) {
					var key = localStorage.key(i);
					if (key.indexOf(path) == 0) 
						toDel.push(key);
				}
				for(var i=0;i<toDel.length;i++) {
					localStorage.removeItem(toDel[i]);
				}
			} else {
				localStorage.removeItem(path);
			}
		}
		
		,load(obj) {
			var path = obj._path;
			if (path.charAt(path.length-1) == '.') {
				commons.forD(obj,function(name,value) {
					if (name !== '_path') {
						var key = path + name;
						var s = localStorage.getItem(key);
						if (s !== null) 
							obj[name] = JSON.parse(s);
					}
				});
			} else {
				var s = localStorage.getItem(path);
				if (s != null) {
					var o = JSON.parse(s);
					// set properties.
					commons.forD(obj,function(name,value) {
						if (name !== '_path') {
							var v = o[name];
							if (v !== undefined) 
								obj[name] = v;
						}
					});
				}
			}
		}
		
		,save(obj) {
			var path = obj._path;
			if (path.charAt(path.length-1) == '.') {
				commons.forD(obj,function(name,value) {
					if (name !== '_path') {
						var s = JSON.stringify(value);
						localStorage.setItem(path + name,s);
					}
				});
			} else {
				var s = JSON.stringify(obj,function(name,value) {
					if (name == '_path')
						return undefined;
					return value;
				});
				localStorage.setItem(path,s);
			}
		}		
	}
}

// define classes

/* NamedPattern
example:
	var p = new NamedPattern('name',/(.+?) is (.+?)[.]/,['name','title'])
	var c = p.load('Mike is manager.');		// c: {name:'Mike',title:'manager'}

*/
var NamedPattern = function(name,pattern,group_names) {
	this.name = name;
	this.pattern = pattern;
	this.group_names = group_names;
}
NamedPattern.prototype.load = function(s,obj) {
	var g = this.pattern.exec(s);
	if (g == null) return null;
	if (obj == null) obj = {};
	var len = this.group_names.length;
	for(var i=0;i<len;i++) {
		obj[this.group_names[i]] = g[i+1];
	}
	return obj;
}

var Buff = function(name,stack,effect) {
	this.name = name;
	this.stack = stack;
	this.effect = commons.pInt(effect);
}
// 形如："battle.set_infopane_effect('Hastened', 'The target has been hastened, increasing its action speed by 25%.', 53)"
Buff.parse = function(s) {
	var args = /set_infopane_effect\((.+)\)/i.exec(s)[1];
	return eval('resolve('+args+');');
	function resolve(name,desc,effect) {
		// 形如：'bleeding (x3)'
		var g = /(.+) (?:\(x(\d+)\))/.exec(name);
		var stack=0;
		if (g != null) {
			name = g[1];
			stack = commons.pInt(g[2]);
		}
		return new Buff(name,stack,effect);
	}
}

var Buffs = function() {
	this.map = {};
}
Buffs.prototype.add = function(buff) {
	this.map[buff.name] = buff;
}
Buffs.prototype.effect = function(symbol) {
	var buff = this.map[symbol.buffName];
	if (!buff) return 0;
	return buff.effect;
}


var Creature = function(name) {
	this.name=name;
	this.health=commons.gauge(0,0);
	this.magic=commons.gauge(0,0);
	this.spirit=commons.gauge(0,0);
	this.overcharge=commons.gauge(0,0);
	this.buffs = new Buffs();
}
// define classes end.

var config = {
	_path: 'ac.settings.'
	
	// When in keyMode, BattleRunner wonnt action until you press a key. 
	// The default key is 'dot' key.
	,keyMode:{yes:false,key:46}
	
	,fightHandler:"Two_Hand"
	
	,addons:['Toast','Duration','RoundCounter','BattleRunner']
}

var gameSettings = {
	_path: 'ac.game.'
	,autoCasts:[]
}

var BattlePage = {
	addons:[]
	,yes(doc) {
		doc = doc || document;
		return doc.getElementById(GDT.BattleForm.id) != null;
	}
	
	,handle() {
		var _this = this;
		
		ajax();
		
		moduleLoaded();
		pageLoaded();
		//-- end --
		function moduleLoaded() {
			_this.addons.length = 0;
			
			commons.forEach(config.addons,function(addon_name){
				var ad = window[addon_name];
				if (ad !== undefined) {
					_this.addons.push(ad);
					if (ad.prepare !== undefined) {
						ad.prepare(_this);
					}
				}
			});
		}
		
		function pageLoaded() {
			console.timeEnd('done');
			_this.battle.checked = false;
			//
			commons.forEach(_this.addons,function (ad) {
				ad.handle(_this);
			});
		}
		
		function ajax() {
			var f = document.getElementById(GDT.BattleForm.id);
			document.body.appendChild(f);
			f.submit = onSubmit;		// 
			
			// inject code to page, hook battleform's submit handler, let it throw event to us。
			var code = GDT.HookSubmit.code;
			var tag = document.createElement('script');
			tag.innerHTML = code;
			document.body.appendChild(tag);
			
			//
			commons.listen(document,GDT.SubmitBattleForm.name,onSubmit);
			
			//
			var submiting = false;
			var xhrCount=0;
			function onSubmit() {
				if (submiting) 
					return;
				
				var form = document.getElementById(GDT.BattleForm.id);
				var inputs = form.getElementsByTagName('input');
				var encodedString = '';
				commons.forEach(inputs,function(input) {
					var name = input.name;
					var value = input.value;
					encodedString = encodedString + '&' + name + '=' + value;
				});
				encodedString = encodedString.substr(1,encodedString.length);
				
				// xhr transport.
				var xhr = new XMLHttpRequest();
				xhr.open('post','',true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				xhr.responseType = 'document';
				
				var flag = xhrCount + ' xhr';
				xhr.onload = function() {
					submiting = false;
					console.timeEnd(flag);
					if (xhr.status>=200 && xhr.status<400) 
						onAjaxLoad(xhr.response);
					else 
						commons.report('故障:'+xhr.status);
						
				}
				xhr.onerror = function(e) {
					commons.report("故障:"+e.toString());
				}
				console.time(flag);
				// send request.
				xhrCount++;
				xhr.send(encodedString);
				submiting = true;
			}
			
			function onAjaxLoad(newDoc) {
				if (BattlePage.yes(newDoc))	{
					newDoc.getElementById(GDT.BattleForm.id).remove();
					// merge new document to current document.
					var oldStuffBox = document.getElementsByClassName(GDT.StuffBox.className)[0];
					var newStuffBox = newDoc.getElementsByClassName(GDT.StuffBox.className)[0];
					document.body.replaceChild(newStuffBox,oldStuffBox);
					// need to reinitialize BattleManager.
					commons.call(document,GDT.ReinitializeBattleManager.name);
					
					pageLoaded();
				} else if (RiddlePage.yes(newDoc)) {
					 
					var oldStuffBox = document.getElementsByClassName(GDT.StuffBox.className)[0];
					var newStuffBox = newDoc.getElementsByClassName(GDT.StuffBox.className)[0];
					document.body.replaceChild(newStuffBox,oldStuffBox);
					RiddlePage.handle();
					//window.location.href = window.location.href;
				}
			}
		}
	}

	//
	,battle:{
		checked:false
		// Information ...
		,gem:{
			check() {
				this.name='';
				
				var div = document.querySelector("#ikey_p[onclick]");
				if (div) {
					this.name = div.textContent;
				}
			}
		}

		// 人物基本状态，类型为 {value,max,percent}
		// ----------------------------------------
		,primary: {
			check() {
				this.health = commons.gauge(0,0); 		
				this.magic = commons.gauge(0,0);			
				this.spirit = commons.gauge(0,0);		
				this.overcharge = commons.gauge(0,GDT.Overcharge.max);
				this.spiritStance = false;		
				
				//检查生命、法力、灵力、怒气。
				var s0 = document.querySelectorAll('div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt1>div.fd2>div')[0].textContent.split(' / ');
				var s1 = document.querySelectorAll('div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt1>div.fd2>div')[1].textContent.split(' / ');
				var s2 = document.querySelectorAll('div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt1>div.fd2>div')[2].textContent.split(' / ');
				var s3 = document.querySelector("body>div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt2>div.fd2>div").textContent.split('%');
			
				this.health = commons.gauge(s0[0],s0[1]);
				this.magic = commons.gauge(s1[0],s1[1]);
				this.spirit = commons.gauge(s2[0],s2[1]);
				this.overcharge = commons.gauge(s3[0],GDT.Overcharge.max);
				
				//检查姿态。
				var img = document.querySelector('img#ckey_spirit');
				this.spiritStance = img.src.indexOf('spirit_n.png') == -1;
			}
		}

		,buffs:{
			check() {
				this._map = {};
				var _this = this;
				
				// 检查BUFF
				var buffImgs = document.querySelectorAll('div#mainpane>div.btt>div.bte>img');
				for(var i = 0; i < buffImgs.length; i++) {
					img = buffImgs[i];
					args = /effect\((.+)\)/i.exec(img.getAttribute("onmouseover"))[1];
					eval('resolve('+args+')');
				}
				
				//
				function resolve(n,d,e) {
					_this._map[n] = e;
				}
			}
			,effect(symbol) {
				var e = this._map[symbol.buffName];
				e = commons.pInt(e);
				return e;
			}
		}
		
		,monsters:{
			check() {
				this.list = [];
				
				var mkDivs = document.querySelectorAll('[id^=mkey_][onclick]');
				for (var i=0;i<mkDivs.length;i++) {
					var monsterDiv = mkDivs[i];
					var position = parseInt(monsterDiv.id.substr(5));
					position = position == 0 ? 10 : position;
					var nameDiv = monsterDiv.getElementsByClassName("btm3")[0];
					var name = nameDiv.textContent;
					var mon = new Creature();
					mon.position = position;
					mon.name = name;
					mon.clickable = monsterDiv;
					var healthDiv = monsterDiv.getElementsByClassName('btm5')[0];
					var healthImg = healthDiv.getElementsByTagName('img')[0];
					var h = healthImg.style.width.match(/\d+/)[0];
					h = (parseInt(h) * 100 / 120).toFixed(0);
					mon.health.percent = h;
					//
					// check monster's debuff
					var effectDiv = monsterDiv.getElementsByClassName("btm6")[0];
					monsterDiv.getElementsByClassName("btm5")[0];
					var effectImgs = effectDiv.getElementsByTagName('img');
					for (var j=0;j<effectImgs.length;j++) {
						var s = effectImgs[j].getAttribute('onmouseover');
						var buff = Buff.parse(s);
						mon.buffs.add(buff);
					}
					this.list.push(mon);
				}
			}
			,forEach(f) {
				var i=0, len = this.list.length;
				for(; i < len ;i++) {
					var b = f(this.list[i], i, this.list);
					if (b) 
						return;
				}
			}
		}
		
		,continueDialog:{
			check() {
				this.yes = false;
				this.victory = false;
				this.battleEnd = false;
				
				var ckey = document.getElementById('ckey_continue');
				if (ckey == null) {
					this.yes = false;
					return;
				}
				this.yes = true;
				var logPane = document.getElementById("togpane_log");
				var log = logPane.innerText;
				this.victory =log.indexOf("You are Victorious!")>=0;
				this.battleEnd = ckey.getAttribute("onclick").indexOf('goto')>=0;
			}
			,click() {
				var ckey = document.getElementById('ckey_continue');
				ckey.click();
			}
		}
		
		,check() {
			if (!this.checked) {
				this.gem.check();
				this.primary.check();
				this.buffs.check();
				this.monsters.check();
				this.continueDialog.check();
				
				this.checked = true;
			}
		}
		
		// Actions ...
		,commit(symbol) {
			var type = symbol.type;
			
			if (type == 'item') 
				return use(symbol);
			
			if (type == 'skill') 
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
						divs[i].click();
						console.log('use:'+symbol.name);
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
					console.log('cast:'+symbol.name);
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
		// commit() end.
		
		//
		,target(monster) {
			monster.clickable.click();
			console.log('target:'+monster.name);
			return true;
		}
		// target() end.
	} 
	// battle{} end
}

var RiddlePage = {
	yes(doc) {
		doc = doc || document;
		return doc.getElementById(GDT.RiddleForm.id) != null;
	}
	
	,handle() {
		
		// 播放警示音效。
		commons.audioWithControl(GDT.RiddleAlertSound.filename,5,900);

		// 保存小马图片。
		var riddleform = document.getElementById(GDT.RiddleForm.id);
		var imgs = riddleform.getElementsByTagName("img");
		var imgsrc = null;
		var i = imgs.length;
		while(i--) {
			var s = imgs[i].src;
			//if (s.indexOf("=riddlemaster.jpg")>=0) {	// 测试用
			if (s.indexOf("riddlemaster.php")>=0) {
				imgsrc = s;
				break;
			}
		}
		if (imgsrc != null) {
			var a = imgsrc.lastIndexOf("=");
			var b = imgsrc.length;
			var name = imgsrc.slice(a + 1, b);
			name = "pony/"+name+".jpg";
			var options = {
				url:imgsrc
				,filename:name
				,conflictAction:"uniquify"
				,saveAs:false
			};
			chrome.runtime.sendMessage({cmd:"download",options:options},function(response){
				if (response && response.error) {
					//alert("小马图片没存成功："+response.error);
					console.log("小马图片没存成功：");
					console.log(response.error);
				}
			});
		}
	}
}

var SettingPage = {
	yes() {
		return document.getElementById("settingsdiv") != null
	}
	
	,handle() {
		this.autoCast.check();
	}
	
	//==== check ====
	,autoCast:{
		check() {
			var arr = [];
			var acs = document.querySelectorAll("select[name^='ac_']");
			if (acs) {
				for (var i=0;i<acs.length;i++) {
					var sel = acs[i];
					var sid = sel.selectedIndex;
					if (sid != 0) {
						var op = sel.options[sid];
						var name = op.text;
						var id = parseInt(op.value);
						arr.push({name:name,id:id});
					}
				}
			}
			gameSettings.autoCasts = arr;
			commons.store.save(gameSettings);
		}
	}
}

var RoundCounter = {
	prepare() {
		var css = '#round{position:absolute;left:1080px;top:15px;width:120px;font-size:20px;font-weight:bold;z-index:10;text-align:right}';			
		var sheet = document.createElement('style');
		sheet.innerHTML = css;
		document.head.appendChild(sheet);
	}
	
	,handle() {
		var logs = document.querySelector('#togpane_log tr:nth-last-child(2)').textContent;
		if (/Round ([\d\s\/]+)/.test(logs)) {
			var round = logs.match(/Round ([\d\s\/]+)/)[1];
			localStorage.setItem('rounds', round);
		} else {
			var round = localStorage.getItem('rounds') || undefined;
		}

		if (round !== undefined) {
			var x = document.getElementById('mainpane').appendChild(document.createElement('div'));
			x.id = 'round';
			x.innerHTML = round;
			var final = round.split('/');
			switch (final[1] - final[0]) {
				case 0:
					x.style.color = '#ff0000';
					break;
				case 1:
					x.style.color = '#ffcc99';
					break;
			}
		}
	}
}

var Duration = {
	prepare() {
		css =  '.duration{width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-4px} \
				.duration>div{background:white;border:1px solid black;padding:0 2px;display:inline-block;min-width:8px;font-weight:bold;height:13px}';
		var sheet = document.createElement('style');
		sheet.innerHTML = css;
		document.head.appendChild(sheet);
	}
	,handle() {
		if (this.firstTime)	{
			prepare();
			firstTime = false;
		}
		
		// 显示BUFF剩余回合数。
		var targets = document.querySelectorAll('img[onmouseover^="battle.set_infopane_effect"]');
		var i = targets.length;
		while (i--) {
			var duration = targets[i].getAttribute('onmouseover').match(/, ([-\d]+)\)/);
			if (!duration || duration < 0) duration = '-';
			else duration = duration[1];
			var div = targets[i].parentNode.insertBefore(document.createElement('div'), targets[i].nextSibling);
			div.appendChild(document.createElement('div')).innerHTML = duration;
			div.className = 'duration';
		}
	}
}

var Toast = {
	handle() {
		var rows = document.querySelectorAll("#togpane_log tbody tr");
		if (rows.length ==0) return;
		
		var i,t=-1, c0, c1, c2, row,arr=[];
		for(i=0;i<rows.length;i++) {
			row = rows[i];
			c0 = parseInt(row.childNodes[0].textContent);
			if (t == -1) t = c0;
			
			if (c0 != t) break;
			
			c1 = parseInt(row.childNodes[1].textContent);
			c2 = row.childNodes[2].textContent;
			if (c2.indexOf('You')==0)
				arr.push(c2);
		}
		var s = arr.pop();
		this.toast(s);
	}	
	
	,toast(txt) {
		//**<div class="toast">hello world!</div>**//
		var div = document.createElement("div");
		div.className = "toast";
		div.style.cssText = "font-size: large; position: relative; top: -30px; padding: 5px; border: 1px solid; border-top-left-radius: 4px; border-top-right-radius: 4px;";
		div.innerHTML = txt;
		document.getElementsByClassName('stuffbox')[0].appendChild(div);
	}
}

var TeamA = {
	Laozhang:{
		cache:{
			_path:'ac.laozhang.temp'
			,turn:-1
		}
		,patterns:[]
		,prepare() {
			this.patterns = [this.p0,this.p1,this.p2,this.p3];
		}
		,getTurn(page) {
			var rows = document.querySelectorAll("#togpane_log tbody tr");
			if (rows.length ==0) return null;
			
			commons.store.load(this.cache);
			var i,t=-1, c0, c1, c2, row,arr=[];
			for(i=0;i<rows.length;i++) {
				row = rows[i];
				c0 = parseInt(row.childNodes[0].textContent);
				if (t == -1) 
					t = c0;
				if (t == this.cache.turn) return null;
				
				if (c0 != t) break;
				
				c1 = parseInt(row.childNodes[1].textContent);
				c2 = row.childNodes[2].textContent;
				
				var event = {order:c1,log:c2};
				var j;
				for (j = 0;j<this.patterns.length;j++) {
					var p = this.patterns[j];
					if (p.match(event))
						break;
				}
				if (j == this.patterns.length)
					event.type = 'unknown';
				arr.push(event);
			}
			this.cache.turn = t;
			commons.store.save(this.cache);
			return {order:t,events:arr.reverse()};
		}
		//
		,p0:{
			pa:'Initializing random encounter ...'
			,pb:/Initializing (.+)\(Round (\d+) \/ (\d+)\)/
			,match(event) {
				var log = event.log;
				if (log == this.pa) {
					event.type = GDT.battleStart;
					event.challenge=GDT.randomEncounter.name;
					event.round=1;
					event.totalRound=1;
					return true;
				}
				var g = this.pb.exec(log);
				if (g) {
					event.type = GDT.roundStart;
					event.challenge = g[1];
					event.round = parseInt(g[2]);
					event.totalRound = parseInt(g[3]);
					if (event.round == 1)  
						event.type = GDT.battleStart;
					return true;
				}
				return false;
			}
		}
		,p1:{
			pa:/(.+?) has been defeated/
			,match(event) {
				var g = this.pa.exec(event.log);
				if (g != null) {
					event.type = GDT.defeated;
					event.who = g[1];
					return true;
				}
				return false;
			}
		}
		,p2:{
			// 伤害形如：you for 391 elec damage.
			pa:/.+ you for (\d+).+?damage/
			,match(event) {
				var g = this.pa.exec(event.log);
				if (g != null) {
					event.type = GDT.hurt;
					//event.subType='hits' or 'crits' or ...
					//event.who = 'a monster'
					event.value = parseInt(g[1]);
					return true;
				}
				return false;
			}
		}
		,p3:{
			// Hot形如：restores 201 points of health.
			pa:/.+?restores (\d+) points of health/
			,match(event) {
				var g = this.pa.exec(event.log);
				if (g != null) {
					event.type = GDT.heal;
					//event.subType='regen' or 'regeneration' or ...
					event.value = parseInt(g[1]);
					return true;
				}
				return false;
			}
		}
	}
	,Mike:{}
	,Rose:{
		stats:{_path:'ac.battle.stats',challenge:'',rounds:0,turns:0,monsters:0,hurtPeak:0}
		,vars:[]
		,prepare() {
			this.vars = [this.v0];
			commons.store.load(this.stats);
			for(var i=0;i<this.vars.length;i++) {
				var v = this.vars[i];
				v.read(this.stats);
			}
		}
		,handle(turn) {
			for (var j=0;j<this.vars.length;j++) {
				var v = this.vars[j];
				v.process(turn);
				v.write(this.stats);
			}
			commons.store.save(this.stats);
			console.log(this.stats);
		}
		// challenge, rounds, turns, monsters.
		,v0:{
			challenge:''
			,rounds:0
			,turns:0
			,monsters:0
			,hurtPeak:0
			,read(stats) {
				this.challenge = stats.challenge;
				this.rounds = stats.rounds;
				this.turns = stats.turns;
				this.monsters = stats.monsters;
				this.hurtPeak = stats.hurtPeak;
			}
			,write(stats) {
				stats.challenge = this.challenge;
				stats.rounds = this.rounds;
				stats.turns = this.turns;
				stats.monsters = this.monsters;
				stats.hurtPeak = this.hurtPeak;
			}
			,process(turn) {
				if (turn.order == 0) {
					var e = turn.events[1];
					this.challenge = e.challenge;
					if (e.type == GDT.battleStart) {
						this.rounds = 0;
						this.turns = 0;
						this.monsters = 0;
						this.hurtPeak = 0;
					}
					this.rounds++;
				}
				
				if (turn.order > 0) {
					this.turns++;
					var hurt = 0;peak=0;
					for (var i = 0 ;i<turn.events.length;i++) {
						e = turn.events[i];
						if (e.type == GDT.defeated && e.who != 'You') {
							this.monsters++;
						}
						if (e.type == GDT.hurt) {
							hurt = hurt + e.value;
						}
						if (e.type == GDT.heal) {
							hurt = hurt - e.value;
						}
						if (peak < hurt) 
							peak = hurt
					}
					if (this.hurtPeak < peak)
						this.hurtPeak = peak;
				}
			}
		}
	}
	,prepare(page) {
		this.Laozhang.prepare();
		//this.Mike.prepare();
		this.Rose.prepare();
	}
	,onTurnDone(page) {
		var turn = this.Laozhang.getTurn(page);
		if (turn != null) {
			//this.Mike.handle(events);
			this.Rose.handle(turn);
		}
	}
}

var BattleRunner = {
	fighter:null
	,addons:[TeamA]
	,keyModeHandler: {
		toDo:null
		,handle(e) {
			if (e.keyCode == config.keyMode.key) {
				if (this.toDo != null) {
					this.toDo();
					this.toDo = null;
				}
			}
		}
	}
	,prepare(page) {
		var _this = this;
		
		// prepare addons.
		commons.forEach(this.addons,function(addon) {
			if (addon.prepare)
				addon.prepare(page);
		});
		
		// Load fighter.
		var handlerName = config.fightHandler;
		this.fighter = new window[handlerName]();
		
		// if in KeyMode register keypress listener.
		if (config.keyMode.yes) {
			commons.listen(document,"keypress",function(e) {
				_this.keyModeHandler.handle(e);
			});
		}
		//
	}
	,handle(page) {
		var _this = this;
		
		if (config.keyMode.yes) {
			this.keyModeHandler.toDo = action;
			return;
		}
		action();
		
		// Define action()
		function action() {
			console.log('\r\naction start:');
			console.time('done');
			
			var battle = page.battle;
			battle.check();
			
			commons.forEach(_this.addons,function(addon){
				if (addon.onTurnDone)
					addon.onTurnDone(page);
			});
			if (_this.fighter && _this.fighter.onTurnDone)
				_this.fighter.onTurnDone(page);
			
			if (battle.continueDialog.yes) {
				if (battle.continueDialog.victory) {
					if (_this.fighter && _this.fighter.roundCleared)
						_this.fighter.roundCleared(page);
						
					if (battle.continueDialog.battleEnd) {
						commons.audio('battleCleared.mp3');
						if (_this.fighter && _this.fighter.onBattleCleared) 
							_this.fighter.onBattleCleared(page);
					} else {
						battle.continueDialog.click();
					}
				}
				else {
					commons.audio('defeated.mp3');
					if (_this.fighter && _this.fighter.onDefeated) 
						_this.fighter.onDefeated(page);
				}
			} else {
				if (_this.fighter)
					_this.fighter.onFight(page);
			}
		}

	}
	
}

var Warrior = function() {
	
	this.parameters = {
		_path:'ac.warrior.params.'
		,HealthDraught:70	,HealthGem:60		,HealthPotion:55
		,ManaDraught:70		,ManaGem:60			,ManaPotion:40
		,SpiritDraught:70	,SpiritGem:70		,SpiritPotion:40	
		,Cure:54			,Regen:60
		
		,regenEffect : 30	,heartSeekerEffect : 120		,otherEffect : 20
		
		,Overcharge:240
		
		,keepHeartSeeker:true		,keepArcaneFocus:false		
		,keepRegen:true				,keepHaste:true
		,keepProtection:true		,keepShadowVeil:true	,keepSpiritShield:true
		,keepSparkOfLife:true
	}
	// These parameters maybe set by user, means they need to be stored.
	// Also means these hard coded values are the default value.
	// I may add a function in future to restore default settings.
	commons.store.load(this.parameters);

	// monster priority table.
	this.pd = {
		"Manbearpig":2	,"White Bunneh":2	,"Mithra":2	,"Dalek":2
		
		,"Konata":3	,"Mikuru Asahina":3	,"Ryouko Asakura":3	,"Yuki Nagato":3
		
		,"Yggdrasil":0	//这丫会给其他怪加血，先揍它。
		,"Skuld":7	,"Urd":7	,"Verdandi":7
		
		,"Rhaegal":5	,"Viserion":5	,"Drogon":5
		
		,"Real Life":6	,"Invisible Pink Unicorn":6	,"Flying Spaghetti Monster":6

		,"others": 8
		
		//
		,p(name) {
			var d = this[name];
			if (d == undefined) d = this.others;
			return d;
		}
	}
}
Warrior.prototype.onFight = function(page) {
	var ret = this.heal(page.battle) || this.buff(page.battle) || this.attack(page.battle);
	return ret;
}
Warrior.prototype.heal = function(battle) {
	var _this = this;
	var ha = ['HealthGem','HealthPotion','Cure'];
	var ma = ['ManaGem','ManaPotion'];
	var sa = ['SpiritGem','SpiritPotion'];
	
	var hp = battle.primary.health.percent;
	var mp = battle.primary.magic.percent;
	var sp = battle.primary.spirit.percent;
	return restore(ha,hp) || restore(ma,mp) || restore(sa,sp) || battle.commit(GDT.MysticGem);
	//
	function restore(arr,p) {
		arr.sort(function(m,n){
			return _this.parameters[m] - _this.parameters[n];
		});
		var i;
		for(i=0; i < arr.length;i++) {
			var name = arr[i];
			var ae = _this.parameters[name];
			
			if (p <= ae && battle.commit(GDT[name])) 
				return true;
		}
		return false;
	}
}	
Warrior.prototype.buff = function(battle) {
	var acs = gameSettings.autoCasts;
	for (var i=0;i<acs.length;i++) {
		var id = acs[i].id;
		switch(id) {
			case 411:this.parameters.keepProtection = false; break;
			case 412:this.parameters.keepHaste = false; break;
			case 413:this.parameters.keepShadowVeil = false; break;
			case 422:this.parameters.keepSparkOfLife = false; break;
			case 423:this.parameters.keepSpiritShield = false; break;
		}
	}

	var _this = this;
	var ret = channel() 
		|| haste() 			|| protection()	
		|| shadowVeil()		|| spiritShield()	
		|| sparkOfLife()	|| regen() 		  	
		|| heart()			|| arcane()
		|| hdra()		|| mdra()			|| sdra()
		|| spiritStance();
	return ret;
	
	function channel() {
		// 圈定受益技能列表。
		var list = [GDT.Heartseeker,GDT.ArcaneFocus,GDT.Regen,GDT.Protection,GDT.ShadowVeil,GDT.Absorb,GDT.SpiritShield,GDT.SparkOfLife];
		if (battle.buffs.effect(GDT.Channeling) > 0) {
			//优先考虑heartseeker和regen
			if (battle.buffs.effect(GDT.Heartseeker) < _this.parameters.heartSeekerEffect)
				return battle.commit(GDT.Heartseeker);
			if (battle.buffs.effect(GDT.Regen) < _this.parameters.regenEffect)
				return battle.commit(GDT.Regen);
			
			// 然后选择现有且时效最短的那个buff。
			var min = Infinity;
			var symbol = null;
			for (var i=0;i<list.length;i++) {
				var e = battle.buffs.effect(list[i]);
				if (e<min && e >0) {	// can't choose buff with effect = 0, cause it may not be necessary in most situation.
					min = e;
					symbol = list[i];
				}
			}
			if (symbol != null) 
				return battle.commit(symbol);
		}
		return false;				
	}
	
	function heart() {
		return _this.parameters.keepHeartSeeker && battle.buffs.effect(GDT.Heartseeker) == 0 && battle.commit(GDT.Heartseeker);
	}

	function arcane() {
		return _this.parameters.keepArcaneFocus && battle.buffs.effect(GDT.ArcaneFocus) == 0 && battle.commit(GDT.ArcaneFocus);
	}


	function regen() {
		return _this.parameters.keepRegen 
			&& battle.buffs.effect(GDT.Regen) == 0 && battle.primary.health.percent <= _this.parameters.Regen
			&& battle.commit(GDT.Regen)
	}
	
	function protection() {
		return _this.parameters.keepProtection && battle.buffs.effect(GDT.Protection) == 0 && battle.commit(GDT.Protection);
	}
	
	function haste() {
		return _this.parameters.keepHaste && battle.buffs.effect(GDT.Haste) == 0 && battle.commit(GDT.Haste);
	}
	
	function shadowVeil() {
		return _this.parameters.keepShadowVeil && battle.buffs.effect(GDT.ShadowVeil) == 0 && battle.commit(GDT.ShadowVeil);
	}
	
	function spiritShield() {
		return _this.parameters.keepSpiritShield && battle.buffs.effect(GDT.SpiritShield) == 0 && battle.commit(GDT.SpiritShield);
	}
	
	function sparkOfLife() {
		return _this.parameters.keepSparkOfLife && battle.buffs.effect(GDT.SparkOfLife) == 0 && battle.commit(GDT.SparkOfLife);
	}
	
	function hdra() {
		return battle.buffs.effect(GDT.HealthDraught) == 0 && battle.primary.health.percent <= _this.parameters.HealthDraught && battle.commit(GDT.HealthDraught);
	}
	
	function mdra() {
		return battle.buffs.effect(GDT.ManaDraught) == 0 && battle.primary.magic.percent <= _this.parameters.ManaDraught && battle.commit(GDT.ManaDraught);
	}
	
	function sdra() {
		return battle.buffs.effect(GDT.SpiritDraught) == 0 && battle.primary.spirit.percent <=_this.parameters.SpiritDraught && battle.commit(GDT.SpiritDraught);
	}
	
	function spiritStance() {
		return !battle.primary.spiritStance && battle.primary.overcharge.value >= _this.parameters.Overcharge && battle.commit(GDT.SpiritStance);
	}
}
Warrior.prototype.attack = function(battle) {
	var _this = this;
	var monster = this.chooseTarget(battle);
	if (monster) {
		SB(monster) || VS(monster) || MB(monster);
		return battle.target(monster);
	}
	return false;
	
	function SB(monster) {
		var e = monster.buffs.effect(GDT.Stunned)
		return (e == 0 || e >= 2) && battle.primary.overcharge.value >= 25
			&& battle.primary.spiritStance && battle.commit(GDT.ShieldBash);
	}
	
	function VS(monster) {
		return battle.commit(GDT.VitalStrike);
	}

	function MB(monster) {
		var p = _this.pd.p(monster.name);
		// p != 1，表示该怪为boss。
		return p != 1 && monster.health.percent < 25 && monster.buffs.effect(GDT.BleedingWound) > 0
			&& battle.commit(GDT.MercifulBlow);
	}
}
Warrior.prototype.chooseTarget = function(battle) {
	var target=null,min=99 , _this = this;
	battle.monsters.forEach(function(monster){
		var name = monster.name;
		var p = _this.pd.p(name);
		if (p == 0) {
			target = monster;
			return true;
		} else if (p < min) {
			target = monster;
			min = p;
		}
	});
	return target;
}

var Two_Hand = function() {
	Warrior.call(this);
}
Two_Hand.prototype = Object.create(Warrior.prototype);
Two_Hand.prototype.chooseTarget = function(battle) {
	//选择优先级最高(数字最小)，且（同等优先级里）横扫最多敌人的那个目标。
	var target=null, priority=99, domino = 0, _this = this;
	battle.monsters.forEach(function(monster, index, list){
		var name = monster.name;
		var p = _this.pd.p(name);
		if (p <= priority) {
			//计算横扫数量。
			var position = monster.position, total=0;
			for(var i=Math.max(index-3,0), end=Math.min(index+3, list.length-1); i <=end; i++) {
				if (Math.abs(list[i].position - position) <= 3) total++;
			}
			if (p < priority || (p == priority && total > domino)) {
				target = monster;
				domino = total;
				priority = p;
			}
		}
	});
	return target;
};

//主脚本
var script = {	
	// 
	pageModules:[BattlePage,RiddlePage,SettingPage]
	,run() {
		commons.store.load(config);
		commons.store.load(gameSettings);
		
		commons.forEach(this.pageModules,function(page) {
			if (page.yes()) {
				page.handle();
			}
		});
		
		commons.store.save(gameSettings);
		commons.store.save(config);
	}
}

script.run();