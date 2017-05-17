if (!window.auto) auto = {};
if (!auto.fight) auto.fight={};

auto.fight.page = {
	

	yes() {
		return  document.getElementById("battleform") != null;
	}
	
	,bindKey(keyCode,f) {
		util.answer('keypress',function(e) {
			if (e.keyCode === keyCode) 
				f();
		});
	}
	
	/*
	,ajax() {
		
		// 将battleform从stuffbox中移开。
		document.body.appendChild(document.getElementById('battleform'));
		
		// 向页面注入一段代码，替换battleform的submit函数，令其抛出一个事件，使得我们自己的响应代码得以执行。
		var codeInjected = `
			var call = ${util.call.toString()}
			var answer = ${util.answer.toString()}
			battleform.submit = function() {
				call('submit');
			};
			
			function initBattleManager() {
				window.battle = new window.Battle();
				window.battle.clear_infopane();
				call('battle manager reinitialized');
			}
			answer('init battle manager',initBattleManager);
			`
			
		var tag = document.body.appendChild(document.createElement('script'));
		tag.innerHTML = codeInjected;
		
		// 响应表单提交，以ajax的方式展现新的页面内容。
		var _this = this;
		var form = document.getElementById('battleform');
		util.answer('submit',function () {
			var inputs = form.getElementsByTagName('input');
			var formString = '';
			for (var i=0;i<inputs.length;i++) {
				if (i != 0) 
					formString = '&' + formString;
				var name = inputs[i].name;
				var value = inputs[i].value;
				formString = name+'='+value+formString;
			}
			var xhr = new XMLHttpRequest();
			xhr.open('post','',true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.responseType = 'document';
			xhr.onload = function () {
				console.log('onload: '+xhr.status);
				if (xhr.status >=200 && xhr.status<400) 
					// 更新页面内容。
					replace(xhr.response);
			}
			console.log('post: '+formString);
			xhr.send(formString);
			
			function replace(data) {
				var newstuffbox = data.getElementsByClassName('stuffbox')[0];
				// 移除新来的battleform，以免冲突。
				data.getElementById('battleform').remove();
				var oldstuffbox = document.getElementsByClassName('stuffbox')[0];
				oldstuffbox.parentNode.replaceChild(newstuffbox,oldstuffbox);
				
				
				// 需要更新原页面脚本空间中的Battle对象，由于空间隔离，所以必须通过事件来及激发页面脚本。
				util.call('init battle manager');
			}});
		
		// recreatebattle完成后事件通知。
		util.answer('battle manager reinitialized',function() {
			_this.doAjaxReloaded();
		});
		
	}
	
	,doAjaxReloaded() {
		if (typeof(this.onAjaxReloaded) === 'function') {
			this.onAjaxReloaded();
		}
	}
	,onAjaxReloaded() {
	}
	*/
	
	,basic:{
		check () {
			//检查生命、法力、灵力、怒气。
			var s0 = document.querySelectorAll('div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt1>div.fd2>div')[0].textContent.split(' / ');
			var s1 = document.querySelectorAll('div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt1>div.fd2>div')[1].textContent.split(' / ');
			var s2 = document.querySelectorAll('div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt1>div.fd2>div')[2].textContent.split(' / ');
			var s3 = document.querySelector("body>div.stuffbox.csp>div.clb>div.cwbdv>div.cwbt>div.cwbt2>div.fd2>div").textContent.split('%');
		
			hv.ch.health.set(s0[0],s0[1]);
			hv.ch.magic.set(s1[0],s1[1]);
			hv.ch.spirit.set(s2[0],s2[1]);
			hv.ch.overcharge.set(s3[0],250);
		}
	}
	
	,stance:{
		check() {
			//检查姿态。
			var img = document.querySelector('img#ckey_spirit');
			if (!img) hv.ch.spiritStance = false;
			else {
				if (img.src.indexOf('spirit_n.png')>=0) hv.ch.spiritStance = false;
				else hv.ch.spiritStance = true;
			}
		}
	}

	,buffs:{
		resolve(name,desc,effect) {
			var b = new hv.Buff(name,desc,effect);
			hv.ch.buffs.push(b);
			
			var e = b.effect;
			//解码。
			switch(name) {
				case "Heartseeker":hv.ch.buffs.heart=e;break;
				case "Arcane Focus":hv.ch.buffs.arcane=e;break;
				case "Protection":hv.ch.buffs.protection=e;break;
				case "Hastened":hv.ch.buffs.haste=e;break;
				case "Shadow Veil":hv.ch.buffs.shadow=e;break;
				case "Absorbing Ward":hv.ch.buffs.absorb=e;break;
				case "Spirit Shield":hv.ch.buffs.spirit=e;break;
				case "Spark of Life":hv.ch.buffs.spark=e;break;
				case "Regen":hv.ch.buffs.regen=e;break;
				case "Regeneration":hv.ch.buffs.hdra=e;break;
				case "Replenishment":hv.ch.buffs.mdra=e;break;
				case "Refreshment":hv.ch.buffs.sdra=e;break;
				case "Channeling":hv.ch.buffs.channel=e;break;
				default:break;
			}
		}
		,check() {
			hv.ch.buffs.clear();
			var buffImgs = document.querySelectorAll('div#mainpane>div.btt>div.bte>img');
			for(i=0;i<buffImgs.length;i++) {
				img = buffImgs[i];
				args = /effect\((.+)\)/i.exec(img.getAttribute("onmouseover"))[1];
				eval('this.resolve('+args+')');
			}
		}
	}

	,gem:{
		div:null
		,click () {
			if (this.div) {this.div.click();return true;}
			return false;
		}
		,check() {
			var div = document.querySelector("#ikey_p[onclick]");
			if (div) {
				var s = div.textContent;
				if (s == "Mystic Gem") hv.gem.mysticGem=1;
				else if (s == "Mana Gem") hv.gem.manaGem = 1;
				else if (s == "Health Gem") hv.gem.healthGem = 1;
				else if (s == "Spirit Gem") hv.gem.spiritGem = 1;
			}
			this.div = div;
		}
	}
	
	,battleItems:{
		click(name) {
			var divs = document.querySelectorAll("div[id^='ikey_'][onclick]");
			for(i=0;i<divs.length;i++) {
				var s = divs[i].textContent;
				if (s == name) {divs[i].click();return true;}
			}
			return false;
		}
	}
	
	,skills:{
		click(id) {
			var div = document.querySelector('div[id="'+id+'"][onclick]');
			if (div) {div.click();return true;}
			return false;
		}

	}
	
	,monsters:{
		_clickables:new util.Clickables()
		,check() {
			var mkDivs = document.querySelectorAll('[id^=mkey_][onclick]');
			var arr = [];
			for (var i=0;i<mkDivs.length;i++) {
				var monsterDiv = mkDivs[i];
				var nameDiv = monsterDiv.getElementsByClassName("btm3")[0];
				var name = nameDiv.textContent;
				this._clickables[name] = monsterDiv;
				
				var monster = {name:name};
				arr.push(monster);
			}
			hv.monsters = arr;
		}
		,click(name) {
			return this._clickables.click(name);
		}
	}
	
	,logs:{
		//[{turnIndex,eventOrder,eventLog}...]
		events:[]
		
		,prepareEvents() {
			this.events.length = 0;
			
			var rows = document.querySelectorAll("#togpane_log tbody tr");
			if (rows.length <=0) return;
			
			var i,t=-1;
			for(i=0;i<rows.length;i++) {
				var row = rows[i];
				var c0 = parseInt(row.childNodes[0].textContent);
				if (t == -1) t = c0;
				
				if (c0 != t) break;
				
				var c1 = parseInt(row.childNodes[1].textContent);
				var c2 = row.childNodes[2].textContent;
				this.events.push({turnIndex:c0,eventOrder:c1,eventLog:c2});
			}
			this.events.reverse();
			hv.events = this.events;
		}
		
		,check() {
			this.prepareEvents();
			this.a_Last.clear();
			for (var i=0;i<this.events.length;i++){
				var e = this.events[i];
				this.a_Last.check(e);
			}
		}
		
		,a_Last:{
			result:{turnIndex:-1,eventOrder:Infinity,eventLog:null}
			,clear() {
				this.result = {turnIndex:-1,eventOrder:Infinity,eventLog:null};
			}
			,check(e) {
				if (e.eventOrder < this.result.eventOrder) {
					if (e.eventLog.indexOf("You")==0) {
						this.result =  e;
					}
				}
			}
		}
	}	
	
	,toast(txt) {
		//**<div class="toast">hello world!</div>**//
		var div = document.createElement("div");
		div.className = "toast";
		div.style.cssText = "font-size: large; position: relative; top: -30px; padding: 5px; border: 1px solid; border-top-left-radius: 4px; border-top-right-radius: 4px;";
		div.innerHTML = txt;
		document.getElementsByClassName('stuffbox')[0].appendChild(div);
	}
	
	,check() {
		this.basic.check();
		this.stance.check();
		this.gem.check();
		this.buffs.check();
		this.monsters.check();
		this.logs.check();
	}
	
	,execute(action) {
		
	}
	
	,castHealthGem() {
		return this.gem.click();
	}

	,castManaGem() {
		return this.gem.click();
	}
	,castSpiritGem() {
		return this.gem.click();
	}
	,castMysticGem() {
		return this.gem.click();
	}
	
	,castHealthDraught() {
		return this.battleItems.click("Health Draught");
	}
	,castManaDraught() {
		return this.battleItems.click("Mana Draught");
	}
	,castSpiritDraught() {
		return this.battleItems.click("Spirit Draught");	
	}
	,castHealthPotion() {
		return this.battleItems.click("Health Potion");
	}
	,castManaPotion() {
		return this.battleItems.click("Mana Potion");
	}
	,castSpiritPotion() {
		return this.battleItems.click("Spirit Potion");	
	}
	,castSpiritStance() {
		var img = document.querySelector('img#ckey_spirit');
		if (img && img.src.indexOf('spirit_n.png')>=0) 	//没开spirit姿态时显示spirit_n.png。
		{
			img.click();
			return true;
		}
		return false;
	}
	,castCure() {
		return this.skills.click(311);
	}
	,castRegen() {
		return this.skills.click(312);
	}
	,castHeartSeeker() {
		return this.skills.click(431);
	}
	,castArcaneFocus() {
		return this.skills.click(432);
	}
	,castHaste() {
		return this.skills.click(412);
	}
	
	,castProtection() {
		return this.skills.click(411);
	}
	,castShadowVeil() {
		return this.skills.click(413);
	}
	,castSpiritShield() {
		return this.skills.click(423);
	}
	,castSparkOfLife() {
		return this.skills.click(422);
	}
	,castAbsorb() {
		return this.skills.click(421);
	}
	
	//战场胜利时的处理。
	,onBattleVictory() {
		chrome.runtime.sendMessage({cmd:"playSound",type:"battleVictory"});
	}

	//落败时的处理。
	,onDefeated() {
		chrome.runtime.sendMessage({cmd:"playSound",type:"defeated"});
	}

	,ckey_continue() {
		ckey = document.querySelector('#ckey_continue');
		if (ckey) {
			logPane = document.getElementById("togpane_log");
			log = logPane.innerText;
			
			// "You are Victorious!"表示这轮胜利。
			if (log.indexOf("You are Victorious!")>=0) {
				
				//通过ckey的点击代码里的函数名来判断是否整场战斗结束。
				code = ckey.getAttribute("onclick");
				if (code.indexOf("goto")>=0) {
					this.onBattleVictory();
				}
			} 
			//若日志中包含"You have been defeated."这句话表示落败。
			else if (log.indexOf("You have been defeated.")>=0) {
				this.onDefeated();
			}
			
			//点击。
			ckey.click();
			return true;
		}
		return false;
	}
	
	,commit(order) {
		console.log(order.toString());
	}

}

