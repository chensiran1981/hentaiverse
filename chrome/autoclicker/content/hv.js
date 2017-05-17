var hv={}

hv.Buff = function(name,desc,effect) {
	this.name = name;
	this.description = desc;
	this.effect = util.PositiveInteger.toPositiveInt(effect);
}
hv.Buff.prototype.toString = function() {
	return this.name+": "+this.effect;
}

hv.toString = function() {
	return hv.ch.toString() + "\r\n"
		+ hv.ch.buffs.toString() + "\r\n"
		+ hv.gem.toString();
}

hv.settings = {
	set(name,value) {
		this[name] = value;
		auto.db.setItem("hv.settings."+name,value);
	}
	,get(name,latest) {
		var ret = this[name];
		if (!ret || latest) {
			ret = auto.db.getItem("hv.settings."+name);
			this[name] = ret;
		}
		return ret;
	}
}

hv.events = [];

hv.supportives = {
	"Heartseeker":{name:"Heartseeker",spell:"Hearseeker",duration:0,mana:0}
	,"Arcane Focus":{name:"Arcane Focus",spell:"Arcane Focus",duration:0,mana:0}
	,"Hastened":{name:"Hastened",spell:"Haste",duration:0,mana:0}
	,"Shadow Veil":{name:"Shadow Veil",spell:"Shadow Veil",duration:0,mana:0}
	,"Protection":{name:"Protection",spell:"Protection",duration:0,mana:0}
	,"Regen":{name:"Regen",spell:"Regen",duration:0,mana:0}
	,"Absorbing Ward":{name:"Absorbing Ward",spell:"Absorbing Ward",duration:0,mana:0}
	,"Spirit Shield":{name:"Spirit Shield",spell:"Spirit Shield",duration:0,mana:0}
	,"Spark Of Life":{name:"Spark Of Life",spell:"Spark Of Life",duration:0,mana:0}
}

//Gem掉落状态。
hv.gem = {
	manaGem:0
	,healthGem:0
	,spiritGem:0
	,mysticGem:0
	
	,toString() {
		if (this.manaGem) return "manaGem:1";
		if (this.healthGem) return "healthGem:1";
		if (this.spiritGem) return "spiritGem:1";
		if (this.mysticGem) return "mysticGem:1";
		return "Gem:No gem.";
	}
}

//人物状态。
hv.ch = {
	health:new util.Gauge()
	,magic:new util.Gauge()
	,spirit:new util.Gauge()
	,overcharge:new util.Gauge(0,250)
	,spiritStance:false
	
	,toString() {
		var s = "Health:" + this.health.toString() + ", " 
			+ "Magic:" + this.magic.toString() + ", " 
			+ "Spirit:" + this.spirit.toString() + ", " 
			+ "Overcharge:" + this.overcharge.toString();
		return s;
	}
}

hv.ch.buffs = {
	heart:0,arcane:0,haste:0,protection:0,shadow:0,absorb:0,spirit:0,spark:0,regen:0,hdra:0,mdra:0,sdra:0,channel:0
	
	,_array:[]
	,push : function(buff) {
		this._array.push(buff);
	}
	,clear() {
		this._array.length=0;
		this.heart = 0;	this.arcane = 0;	this.haste = 0;	this.protection = 0;	this.shadow = 0;
		this.absorb = 0;	this.spirit = 0;	this.spark = 0;	this.regen = 0;	this.hdra = 0;	this.mdra = 0;	this.sdra = 0;
		this.channel = 0;
	}
	,get(name) {
		for(var i=0;i<this._array.length;i++) {
			var b = this._array[i];
			if (b.name == name) return b;
		}
		return null;
	}
	,getMinEffectBuff() {
		var b = null;ar = this._array;
		if (ar.length > 0) {
			var b = ar[0];
			for(i=1;i<ar.length;i++) {
				if (ar[i].effect < b.effect) b = ar[i];
			}
		}
		return b;
	}
	,toString(){
		var i;ar = this._array;s="";
		for (i=0;i<ar.length-1;i++) {
			s = s + ar[i].toString() + ", ";
		}
		s = s + ar[i].toString() +"\r\n";
		s = s + "最短时效的Buff: "+this.getMinEffectBuff().toString();
		return s;
	}
}

hv.monsters = [];