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
	,ShieldBashVital:	{ name:'Shield BashVital',	type:'skill',	id:2201}
	,StrikeMerciful: 	{ name:'StrikeMerciful',	type:'skill',	id:2202}
	,Blow:				{ name:'Blow',				type:'skill',	id:2203}
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
	
	,SpiritStance:		{ name:'Spirit',			type:'mode',	mode:'spirit'}
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
		/*
		chrome.runtime.sendMessage({cmd:'audio',src:src}, function (response) {
			onend();
		});
		*/
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
	}
	
	,audioWithControl(src,top,left) {
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
			for(var i=0;i<localStorage.length;i++) {
				var key = localStorage.key(i);
				if (key.indexOf(path) == 0) 
					toDel.push(key);
			}
			for(var i=0;i<toDel.length;i++) {
				localStorage.removeItem(toDel[i]);
			}
		}
		
		,load(obj) {
			var path = obj._path;
			commons.forD(obj,function(name,value) {
				if (name !== '_path') {
					var key = path+'.'+name
					var s = localStorage.getItem(key);
					if (s !== null) 
						obj[name] = JSON.parse(s);
					else {
						s = JSON.stringify(obj[name]);
						localStorage.setItem(key,s);
					}
				}
			});
		}
		
		,save(obj) {
			var path = obj._path;
			commons.forD(obj,function(name,value) {
				if (name !== '_path') {
					var s = JSON.stringify(value);
					localStorage.setItem(path+'.'+name,s);
				}
			});
		}		
	}
}

var config = {
	_path : 'ac.settings'
	
	// When in keyMode, BattleRunner wonnt action until you press a key. 
	// The default key is 'dot' key.
	,keyMode:{yes:false,key:46}
	
	,fightHandler:"Warrior"
	
	,addons:['Toast','Duration','RoundCounter','BattleRunner']
}

var gameSettings = {
	_path : 'ac.game'
	,autoCasts:[]
	/*
	,buffs:['Channeling','HealthDraught','ManaDraught','SpiritDraught','Regen','Protection','Haste','ShadowVeil','Absorb','SparkOfLife','SpiritShield','Heartseeker','ArcaneFocus']
	*/
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
				xhr.onerror = function(error) {
					commons.report(error);
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
		// Information ...
		gem:{
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
		,primary:{
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

		// heart, arcane, haste, protection, shadow, absorb, spirit, spark, regen, hdra, mdra, sdra, channel
		// 431:0,432:0,412:0,411:0,413:0,421:0,423:0,422:0,312:0
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
					var nameDiv = monsterDiv.getElementsByClassName("btm3")[0];
					var name = nameDiv.textContent;
					this.list.push({name:name,clickable:monsterDiv});
				}
			}
			,forEach(f) {
				var i = this.list.length;
				while(i--) {
					var b = f(this.list[i]);
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
			this.gem.check();
			this.primary.check();
			this.buffs.check();
			this.monsters.check();
			this.continueDialog.check();
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

var BattleRunner = {
	fighter:null
	
	,prepare(page) {
		var _this = this;
		var handlerName = config.fightHandler;
		this.fighter = new window[handlerName]();
		//
		if (config.keyMode.yes) {
			commons.listen(document,"keypress",onkeypress);
		}
		//
		function onkeypress(e) {
			if (e.keyCode == config.keyMode.key)
				_this.action(page);
		}
		
	}
	,handle(page) {
		if (!config.keyMode.yes) 
			this.action(page);
	}
	
	,action(page) {
		var _this = this;
		console.log('\r\naction start:');
		console.time('done');
		var battle = page.battle;
		
		battle.check();
		turnDone(battle);
		
		if (!battle.continueDialog.yes) 
			fight(battle);
		else {
			// "You are Victorious!"
			if (battle.continueDialog.victory) {
				roundCleared(battle);
				
				if (!battle.continueDialog.battleEnd) 
					battle.continueDialog.click();
				else 
					battleCleared(battle);
			} 
			// "You have been defeated."
			else 
				defeated(battle);
		}

		//
		function turnDone(battle) {
			if (_this.fighter && _this.fighter.onTurnDone)
				_this.fighter.onTurnDone(battle);
		}
		
		function fight(battle) {
			if (_this.fighter && _this.fighter.onFight) 
				_this.fighter.onFight(battle);
		}

		function roundCleared(battle) {
			if (_this.fighter && _this.fighter.onRoundCleared) 
				_this.fighter.onRoundCleared(battle);
		}
		
		function battleCleared(battle) {
			commons.audio('battleCleared.mp3',function() {
				battle.continueDialog.click();
			});
			if (_this.fighter && _this.fighter.onBattleCleared) 
				_this.fighter.onBattleCleared(battle);
		}
		
		function defeated(battle) {
			commons.audio('defeated.mp3',function() {
				battle.continueDialog.click();
			});
			if (_this.fighter && _this.fighter.onDefeated) 
				_this.fighter.onDefeated(battle);
		}
		
	}
}

var Warrior = function() {
	
	var parameters = {
		_path:'ac.warrior.params'
		,HealthDraught:70	,HealthGem:60		,HealthPotion:55
		,ManaDraught:70		,ManaGem:60			,ManaPotion:40
		,SpiritDraught:70	,SpiritGem:70		,SpiritPotion:40	
		,Cure:54			,Regen:60
		
		,regenEffect : 30	,heartSeekerEffect : 120		,otherEffect : 20
		
		,Overcharge:240
		
		,keepHeartSeeker:true		,keepRegen:true		,keepHaste:true
		,keepProtection:true		,keepShadowVeil:true	,keepSpiritShield:true
		,keepSparkOfLife:true
	}
	// These parameters maybe set by user, means they need to be stored.
	// Also means these hard coded values are the default value.
	// I may add a function in future to restore default settings.
	commons.store.load(parameters);

	// monster priority table.
	var pd = {
		"Manbearpig":2	,"White Bunneh":2	,"Mithra":2	,"Dalek":2
		
		,"Konata":3	,"Mikuru Asahina":3	,"Ryouko Asakura":3	,"Yuki Nagato":3
		
		,"Yggdrasil":0	//这丫会给其他怪加血，先揍它。
		,"Skuld":4	,"Urd":4	,"Verdandi":4
		
		,"Rhaegal":5	,"Viserion":5	,"Drogon":5
		
		,"Real Life":6	,"Invisible Pink Unicorn":6	,"Flying Spaghetti Monster":6
		
		//小怪优先级定为1，仅次于Yggdrasil
		,p(name) {
			var d = this[name];
			if (!d) d = 1;
			return d;
		}
	}
	
	
	this.onFight = function(battle) {
		var ret = heal() || buff() || attack();
		
		
		function heal() {
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
					return parameters[m] - parameters[n];
				});
				var i;
				for(i=0; i < arr.length;i++) {
					var name = arr[i];
					var ae = parameters[name];
					
					if (p <= ae && battle.commit(GDT[name])) 
						return true;
				}
				return false;
			}
			
		}	

		function buff() {
			//InnateBuff:411:Protection 412:Haste 413:Shadow Veil 422:Spark Of Life 423:Spirit Sheild
			var acs = gameSettings.autoCasts;
			for (var i=0;i<acs.length;i++) {
				var id = acs[i].id;
				switch(id) {
					case 411:parameters.keepProtection = false; break;
					case 412:parameters.keepHaste = false; break;
					case 413:parameters.keepShadowVeil = false; break;
					case 422:parameters.keepSparkOfLife = false; break;
					case 423:parameters.keepSpiritShield = false; break;
				}
			}

			var ret = channel() || heart() 
				|| regen() 		|| protection() 	|| haste() 
				|| shadowVeil() || spiritShield() 	|| sparkOfLife()
				|| hdra()		|| mdra()			|| sdra()
				|| spiritStance();
			return ret;
			
			function channel() {
				// 圈定受益技能列表。
				var list = [GDT.Protection,GDT.ShadowVeil,GDT.Absorb,GDT.SpiritShield,GDT.SparkOfLife,GDT.Regen,GDT.Heartseeker,GDT.ArcaneFocus];
				if (battle.buffs.effect(GDT.Channeling) > 0) {
					//优先考虑heartseeker和regen
					if (battle.buffs.effect(GDT.Heartseeker) < parameters.heartSeekerEffect)
						return battle.commit(GDT.Heartseeker);
					if (battle.buffs.effect(GDT.Regen) < parameters.regenEffect)
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
				return parameters.keepHeartSeeker && battle.buffs.effect(GDT.Heartseeker) == 0 && battle.commit(GDT.Heartseeker);
			}

			function regen() {
				return parameters.keepRegen 
					&& battle.buffs.effect(GDT.Regen) == 0 && battle.primary.health.percent <= parameters.Regen
					&& battle.commit(GDT.Regen)
			}
			
			function protection() {
				return parameters.keepProtection && battle.buffs.effect(GDT.Protection) == 0 && battle.commit(GDT.Protection);
			}
			
			function haste() {
				return parameters.keepHaste && battle.buffs.effect(GDT.Haste) == 0 && battle.commit(GDT.Haste);
			}
			
			function shadowVeil() {
				return parameters.keepShadowVeil && battle.buffs.effect(GDT.ShadowVeil) == 0 && battle.commit(GDT.ShadowVeil);
			}
			
			function spiritShield() {
				return parameters.keepSpiritShield && battle.buffs.effect(GDT.SpiritShield) == 0 && battle.commit(GDT.SpiritShield);
			}
			
			function sparkOfLife() {
				return parameters.keepSparkOfLife && battle.buffs.effect(GDT.SparkOfLife) == 0 && battle.commit(GDT.SparkOfLife);
			}
			
			function hdra() {
				return battle.buffs.effect(GDT.HealthDraught) == 0 && battle.primary.health.percent <= parameters.HealthDraught && battle.commit(GDT.HealthDraught);
			}
			
			function mdra() {
				return battle.buffs.effect(GDT.ManaDraught) == 0 && battle.primary.magic.percent <= parameters.ManaDraught && battle.commit(GDT.ManaDraught);
			}
			
			function sdra() {
				return battle.buffs.effect(GDT.SpiritDraught) == 0 && battle.primary.spirit.percent <=parameters.SpiritDraught && battle.commit(GDT.SpiritDraught);
			}
			
			function spiritStance() {
				return !battle.primary.spiritStance && battle.primary.overcharge.value >= parameters.Overcharge && battle.commit(GDT.SpiritStance);
			}
		}
		
		function attack() {
			var monster = chooseTarget();
			if (monster) 
				return battle.target(monster);
			return false;
			
			function chooseTarget() {
				var target=null,min=99;
				battle.monsters.forEach(function(monster){
					var name = monster.name;
					var p = pd.p(name);
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
		}
	}
}

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
	}
}

script.run();