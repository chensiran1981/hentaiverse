if (!this.auto) this.auto = {}


auto.warrior = {
	page:auto.fight.page
	
	,run() {
		console.log('warrior.run');
		this.loadParameters();
		if (this.round()) return true;
		if (this.heal()) return true;
		if (this.buff()) return true; 
		if (this.attack()) return true;
		return false;
	}

	,parameters:{
		healthDraught:70	,healthGem:60		,healthPotion:55
		,manaDraught:70		,manaGem:60			,manaPortion:40
		,spiritDraught:70	,spiritGem:70		,spiritPotion:40	
		,cure:55			,regen:60
		
		,regenEffect : 30	,heartSeekerEffect : 120		,effect : 20
		
		,overcharge:240
		
		,keepHeartSeeker:true		,keepRegen:true		,keepHaste:true
		,keepProtection:true		,keepShadowVeil:true	,keepSpiritShield:true
		,keepSparkOfLife:true
	}
	
	,loadParameters() {
		var ps = auto.db.getItem("auto.warrior.parameters");
		if (!ps)
			auto.db.setItem("auto.warrior.parameters",this.parameters);
		else
			this.parameters = ps;
	}
	
	,useHealthGem() {
		if (hv.gem.healthGem && hv.ch.health.percent < this.parameters.healthGem) 
			return this.page.castHealthGem();
		return false;
	}
	
	,useManaGem() {
		if (hv.gem.manaGem && hv.ch.magic.percent < this.parameters.manaGem) 
			return this.page.castManaGem();
		return false;
	}

	,useSpiritGem () {
		if (hv.gem.spiritGem && hv.ch.spirit.percent < this.parameters.spiritGem) 
			return this.page.castSpiritGem();
		return false;
	}

	,useMysticGem () {
		if (hv.gem.mysticGem) 
			return this.page.castMysticGem();
		return false;
	}

	,useHealthPotion () {
		if (hv.ch.health.percent < this.parameters.healthPotion) 
			return this.page.castHealthPotion();
		return false;
	}
	,useManaPotion () {
		if (hv.ch.magic.percent < this.parameters.manaPortion) 
			return this.page.castManaPotion();
		return false;
	}
	,useSpiritPotion () {
		if (hv.ch.spirit.percent < this.parameters.spiritPotion) 
			return this.page.castSpiritPotion();
		return false;
	}
	
	,useHealthDraught () {
		if (!hv.ch.buffs.hdra && hv.ch.health.percent < this.parameters.healthDraught) 
			return this.page.castHealthDraught();
		return false;
	}
	,useManaDraught () {
		if (!hv.ch.buffs.mdra && hv.ch.magic.percent < this.parameters.manaDraught) 
			return this.page.castManaDraught();
		return false;
	}
	,useSpiritDraught () {
		if (!hv.ch.buffs.sdra && hv.ch.spirit.percent < this.parameters.spiritDraught) 
			return this.page.castSpiritDraught();
		return false;
	}
	
	,useChanneling() {
		var bs = ["protection","shadow","absorb","spirit","spark","regen","heart","arcane"];
		var fs = ["castProtection","castShadowVeil","castAbsorb","castSpiritShield","castSparkOfLife","castRegen","castHeartSeeker","castArcaneFocus"];
		if (hv.ch.buffs.channel) {
			//优先考虑heartseeker和regen
			if (hv.ch.buffs.heart < this.parameters.heartSeekerEffect)
				return this.page.castHeartSeeker();
			
			if (hv.ch.buffs.regen < this.parameters.regenEffect)
				return this.page.castRegen();
			
			//选择时效最短的那个buff。
			var min = Infinity;
			var index;
			for (var i=0;i<bs.length;i++) {
				var e = hv.ch.buffs[bs[i]];
				if (e<min && e >0) {
					min = e;
					index = i;
				}
			}
			if (min < Infinity) {
				return this.page[fs[index]]();
			}
		}
		return false;
	}		


	,castCure () {
		if (hv.ch.health.percent < this.parameters.cure) 
			return this.page.castCure();
		return false;
	}

	,castRegen () {
		if (!hv.ch.buffs.regen && hv.ch.health.percent < this.parameters.regen)
			return this.page.castRegen(); 
		return false;
	}
	
	,castHeartSeeker () {
		if (!hv.ch.buffs.heart) 
			return this.page.castHeartSeeker();
		return false;
	}
	
	,castHaste () {
		if (!hv.ch.buffs.haste)
			return this.page.castHaste();
		return false;
	}

	,castProtection () {
		if (!hv.ch.buffs.protection)
			return this.page.castProtection();
		return false;
	}
	,castShadowVeil() {
		if (!hv.ch.buffs.shadow)
			return this.page.castShadowVeil();
		return false;
	}

	,castSpiritShield() {
		if (!hv.ch.buffs.spirit)
			return this.page.castSpiritShield();
		return false;
	}

	,castSparkOfLife() {
		if (!hv.ch.buffs.spark)
			return this.page.castSparkOfLife();
		return false;
	}
	,castSpiritStance() {
		if (hv.ch.overcharge.value >= this.parameters.overcharge) 
			return this.page.castSpiritStance();
	}
	
	,heal() {
		if (this.useHealthGem()) return true;
		if (this.castCure()) return true;
		if (this.useHealthPotion()) return true;
		
		if (this.useManaGem()) return true;
		if (this.useManaPotion()) return true;
		
		if (this.useSpiritGem()) return true;
		if (this.useSpiritPotion()) return true;
		
		if (this.useMysticGem()) return true;
	
		return false;
	}
	
	,buff() {
		if (this.useChanneling()) return true;
		
		//被设置成AutoCast的BUff，无需由程序来管理。
		//InnateMagic:411:Protection 412:Haste 413:Shadow Veil 422:Spark Of Life 423:Spirit Sheild
		var acs = hv.settings.get("autocasts");
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
		
		if (this.parameters.keepHeartSeeker && this.castHeartSeeker()) return true;
		
		if (this.parameters.keepRegen && this.castRegen()) return true;
		
		if (this.parameters.keepProtection && this.castProtection()) return true;
		if (this.parameters.keepHaste && this.castHaste()) return true;
		if (this.parameters.keepShadowVeil && this.castShadowVeil()) return true;
		if (this.parameters.keepSpiritShield && this.castSpiritShield()) return true;
		if (this.parameters.keepSparkOfLife && this.castSparkOfLife()) return true;
		
		if (this.useHealthDraught()) return true;
		if (this.useManaDraught()) return true;
		if (this.useSpiritDraught()) return true;
		
		if (this.castSpiritStance()) return true;
	
		return false;
	}
	
	,pd:{
		"Manbearpig":2	,"White Bunneh":2	,"Mithra":2	,"Dalek":2
		
		,"Konata":3	,"Mikuru Asahina":3	,"Ryouko Asakura":3	,"Yuki Nagato":3
		
		,"Yggdrasil":0	//这丫会给其他怪加血，第一个揍它。
		,"Skuld":4	,"Urd":4	,"Verdandi":4
		
		,"Rhaegal":5	,"Viserion":5	,"Drogon":5
		
		,"Real Life":6	,"Invisible Pink Unicorn":6	,"Flying Spaghetti Monster":6
		
		//小怪不在列表中，优先级定为1，低于Yggdrasil
		,p(name) {
			var d = this[name];
			if (!d) d = 1;
			return d;
		}
	}
	
	,chooseTarget() {
		var target,pmin=99;
		var mkeys = hv.monsters;
		if (mkeys.length>0) {
			for(i=0;i<mkeys.length;i++) {
				var m = mkeys[i];
				var name = m.name;
				priority = this.pd.p(name);
				if (priority == 0) {
					return m;
				} else {
					if (priority < pmin) {
						target = m;
						pmin = priority;
					}
				}
			}
		}
		return target;
	}
	
	,attack() {
		var monster = this.chooseTarget();
		if (monster) 
			return this.page.monsters.click(monster.name);
		return false;
	}
	
	,round() {
		return this.page.ckey_continue();
	}

}


