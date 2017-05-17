var util = {}

/*============================================
Null和Undefined当0看。
负数当0看。
无法解析成数字的字符串当无穷大看。
==============================================*/
util.Field = function(v) {
	this._value = v;
}
util.Field.prototype.get = function() {return this._value}
util.Field.prototype.set = function(v) {this._value = v}
util.Field.prototype.toString = function() {return this._value;}

util.PositiveInteger = function(v) {
	this.field = new util.Field(v);
}
util.PositiveInteger.prototype.get = function() {return this.field.get();}
util.PositiveInteger.prototype.set = function(v) {this.field.set(util.PositiveInteger.toPositiveInt(v));}
util.PositiveInteger.prototype.toString = function() {return this.field.toString();}
util.PositiveInteger.toPositiveInt = function(v) {
	if (!v) return 0;
	var i = parseInt(v);
	if (isNaN(i)) return Infinity;
	return i < 0 ? 0 : i;
}

/*=============================================
Gauge:
血槽对象，有值，最大值，百分比（整数）。
输入值、最大值时，百分比自动刷新。
===============================================*/
util.Gauge = function(v,m) {
	this._value = new util.PositiveInteger(0);
	this._max = new util.PositiveInteger(0);
	this._percent = new util.Field(100);
	this.set(v,m);
}
util.Gauge.prototype = {
	_calc : function() {
		if (this._value.get() == this._max.get()) this._percent.set(100);
		else this._percent.set((this._value.get()*100 / this._max.get()).toFixed(0));
	}
	,get value() {return this._value.get();}
	,set value(v) {
		this._value.set(v);
		this._calc();
	}
	,get max() {return this._max.get();}
	,set max(v) {
		this._max.set(v);
		this._calc();
	}
	,get percent() {return this._percent.get();}
	,set percent(v) {
		this._percent.set(v);
	}
	,set:function(v,m) {
		this._value.set(v);
		this._max.set(m);
		this._calc();
	}
	,toString() {
		return this.value+" / "+this.max+" ("+this.percent+"%)";
	}
}

util.Clickables = function() {
}
util.Clickables.prototype.click = function(name) {
	var c = this[name];
	if (c && c.click) {
		c.click();
		return true;
	}
	return false;
}

util.call = function(name) {
	console.log('呼叫'+name);
	document.dispatchEvent(new CustomEvent(name));
}
util.answer = function(name,f) {
	document.addEventListener(name, function(e) {
		console.log('响应'+name);
		f(e);
	});
}

