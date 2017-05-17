var ac = {
	// 摘自网上，使用方法：ac.namespace("druid.index")。
	namespace() {
		var a = arguments, o = null, i, j, d;
		for (i = 0; i < a.length; i = i + 1) {
			d = a[i].split(".");
			o = window;
			for (j = 0; j < d.length; j = j + 1) {
				o[d[j]] = o[d[j]] || {};
				o = o[d[j]];
			}
		}
		return o;
	}
	,importedJavaScript:{}
	,import(js) {
		if (ac.importedJavaScript[js]) return;
		ac.loadScript('', js);
		ac.importedJavaScript[js] = {js:js, imported:true};
	}
	,resolve(name) {
		var parts = name.split('.'), parent = window, obj;
		for(var i=0, len = parts.length-1; i < len;i++) {
			obj = parent[parts[i]];
			if (obj === undefined) {
				throw new ReferenceError(parts.slice(0,i+1).join('.') + ' is undefined');
			}
			if (obj === null) {
				throw new ReferenceError(parts.slice(0,i+1).join('.') +' is null');	
			}
			parent = obj;
		}
		return parent[parts[i]];
	}
	,getResourceAsText(path, filename) {
		var url = chrome.extension.getURL(path + filename);
		var xhr = new XMLHttpRequest();
		xhr.open('GET',url, false);
		xhr.send();
		return xhr.responseText;
	}
	,loadScript(path, filename) {
		var scriptText;
		if (arguments.length == 1)
			scriptText = this.getResourceAsText('', arguments[0]);
		else if (arguments.length == 2)
			scriptText = this.getResourceAsText(arguments[0], arguments[1]);
		eval(scriptText);
	}
	,hash: function(string) {
		var hash = 0, i, chr, len;
		if (string.length === 0) return hash;
		for (i = 0, len = string.length; i < len; i++) {
			chr   = string.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}
}

ac.FixedQueue = function(limit) {
	this.data = [];
	this.setLimit(limit == undefined ? 0 : parseInt(limit));
}
Object.defineProperty(ac.FixedQueue.prototype, 'length', {
	get: function() {
		return this.data.length;
	}
});
ac.FixedQueue.prototype.setLimit = function(limit) {
	this.limit = limit;
	var diff = limit - this.data.length;
	if (diff < 0) {
		for (var i=diff;i<0;i++) {
			this.data.shift();
		}
	}
}
ac.FixedQueue.prototype.push = function(object) {
	this.data.push(object);
	if (this.data.length > this.limit) {
		return this.data.shift();
	}
	return undefined;
}
ac.FixedQueue.prototype.shift = function() {
	return this.data.shift();
}
ac.FixedQueue.prototype.forEach = function(func, thisArg) {
	for(var i=0, data=this.data, len=data.length;i<len;i++) {
		func.call(thisArg, data[i], data);
	}
}
ac.FixedQueue.prototype.loadFromArray = function(array, limit) {
	this.limit = limit;
	this.data.length = 0;
	var len = Math.min(array.length, limit);
	for (var i=0;i<len;i++) {
		this.data[i] = array[i];
	}
}
ac.FixedQueue.prototype.getArray = function() {
	return this.data.slice(0);
}
//
ac.NamedRegex = function(regex, groupNames) {
	this.regex = regex;
	this.groupNames = groupNames;
}
ac.NamedRegex.prototype.exec = function(text, data) {
	var g = this.regex.exec(text);
	if (g) {
		var j, jlen = this.groupNames.length, gname;
		for(var i=1,len=g.length;i<len;i++) {
			j = i-1;
			if (j >= jlen) break;
			gname = this.groupNames[j];
			if (gname) {
				data[gname] = g[i];
			}
		}
		return true;
	}
	return false;
}
//
ac.audio = {
	play(file) {
		chrome.runtime.sendMessage({cmd:'audio',file:file});
	}
}

ac.log = {
	error(error) {
		console.log(error);
	}
	,debug(info) {
		console.log(info);
	}
}

ac.math = {
	round: function(number, precision) {
		if (precision === undefined || precision === 0) {
			return Math.round(number);
		}
		var factor = Math.pow(10, precision);
		var tempNumber = number * factor;
		var roundedTempNumber = Math.round(tempNumber);
		return roundedTempNumber / factor;
	}
}

ac.object = {
	deepCopy(target, source, create) {
		var k, v, t;
		for (k in source) {
			v = source[k];
			t = typeof v;
			if (t === 'string' || t === 'number' || t === 'boolean') {
				target[k] = v;		// 复写
			}
			if (t === 'object') {
				var tv = target[k];
				if (!tv) {
					tv = {};
					if (create) {
						tv = create(k, v, source);
					}
					target[k] = tv;
				}
				if (tv.copy) {
					tv.copy(v);
				} else {
					this.deepCopy(tv, v, create);
				}
			}
		}
	}
	,map(storeObject, keyPropertyName, mapObject) {
		if (typeof(keyPropertyName) !== 'string') throw new TypeError('keyPropertyName参数必须为字符串');
		if (mapObject == undefined) mapObject = {};
		var keys = Object.keys(storeObject), i=0, len = keys.length, value;
		for(;i<len;i++) {
			value = storeObject[keys[i]];
			if (value && value[keyPropertyName]) {
				mapObject[value[keyPropertyName]] = value;
			}
		}
		return mapObject;
	}
	,get(target, propertyName, defaultValue) {
		var ret = target[propertyName];
		// set default when undefined or null.
		if (ret == undefined) {
			ret = defaultValue;
			target[propertyName] = ret;
		} 
		return ret;
	}
	,update(target, source, update, add, remove) {
		var key, targetValue, sourceValue;
		for(key in target) {
			targetValue = target[key];
			sourceValue = source[key];
			if (sourceValue === undefined) {
				if (remove) {
					remove(key, targetValue, target, source);
				}
			} else {
				if (update) {
					update(key, targetValue, sourceValue, target, source);
				}
			}
		}
		if (add) {
			for (key in source) {
				targetValue = target[key];
				sourceValue = source[key];
				if (targetValue === undefined) {
					add(key, sourceValue, target, source);
				}
			}
		}
	}
	,for_in(target, func, thisArg) {
		for(var k in target) {
			func.call(thisArg, k, target[k], target);
		}
	}
	,some(target, func, thisArg) {
		for(var k in target) {
			if (func.call(thisArg, k, target[k], target) === true) {
				return true;
			}
		}
		return false;
	}
}

ac.storage = {
	getObject(key) {
		var str = localStorage.getItem(key);
		if (str == null)  return undefined;
		else return JSON.parse(str);
	}
	,setObject(key, obj) {
		if (obj !== undefined) {
			localStorage.setItem(key, JSON.stringify(obj));
		}
	}
}
ac.storage.Item = function(name, defaultValue) {
	this.name = name;
	this.defaultValue = defaultValue;
}
ac.storage.Item.prototype = {
	_value : undefined
	,get value() {
		return this.getValue();
	}
	,set value(value) {
		this.setValue(value);
	}
	,getValue() {
		if (this._value == undefined) {
			this._value = ac.storage.getObject(this.name);
			if (this._value == undefined) {
				ac.storage.setObject(this.name, this.defaultValue);
				this._value = ac.storage.getObject(this.name);
			} 
		}
		return this._value;
	}
	,setValue(value) {
		this._value = value;
	}
	,save() {
		if (arguments.length == 1) {
			this.setValue(arguments[0]);
		}
		var v = this._value;
		if (v == undefined) v = this.defaultValue;
		ac.storage.setObject(this.name, v);
	}
};

ac.config = {}
ac.config.Configuration = function(name, defaultValue) {
	ac.storage.Item.call(this, name, defaultValue);
}
ac.config.Configuration.prototype = Object.create(ac.storage.Item.prototype);
ac.config.Configuration.prototype.consturctor = ac.config.Configuration;
//
ac.events = {
	fire(eventName,data) {
		var handlers = this[eventName];
		if (handlers != undefined) {
			handlers.triggerAll(data)
		}
	}
	,queue(eventName,data) {
		var _this = this;
		setTimeout(function() {
			_this.fire(eventName, data);
		});
	}
	,subscribe(eventName, handler, position) {
		if (!eventName) 
			throw new TypeError('订阅消息时，消息参数不能为空。');
		if (typeof(eventName) !== 'string') 
			throw new TypeError('订阅消息时，消息参数只能是字符串。');
		if (!handler) 
			throw new TypeError('订阅消息时，handler参数不可以为空。');;
		var type = typeof(handler);
		if (type !== 'function' && type !== 'object') 
			throw new TypeError('订阅消息时，handler参数只能是函数或者对象。');
		var handlers = this[eventName];
		if (handlers == undefined) {
			handlers = new ac.events.Handlers(eventName);
			this[eventName] = handlers;
		}
		handlers.add(handler, position);
	}
	,unsubscribe(eventName, handler) {
		if (!eventName) 
			throw new TypeError('取消订阅消息时，消息参数不能为空。');
		if (typeof(eventName) !== 'string') 
			throw new TypeError('取消订阅消息时，消息参数只能是字符串。');
		if (!handler) 
			throw new TypeError('取消订阅消息时，handler参数不可以为空。');;
		var type = typeof(handler);
		if (type !== 'function' && type !== 'object') 
			throw new TypeError('取消订阅消息时，handler参数只能是函数或者对象。');
		var handlers = this[eventName];
		if (handlers == undefined) {
			return false;
		}
		return handlers.delete(handler);
	}
}
//
ac.events.Handlers = function(eventName) {
	this.eventName = eventName;
	this.set = new Set();
	this.last = null;
}
ac.events.Handlers.prototype.triggerAll = function(data) {
	var _this = this;
	this.set.forEach(function(handler) {
		exec(handler);
	});
	if (this.last) {
		exec(this.last);
	}
	function exec(handler) {
		if (typeof(handler) === 'function') {
			handler(data, _this.eventName);
		} else {
			handler[_this.eventName](data);
		}
	}
}
ac.events.Handlers.prototype.add = function(handler, position) {
	if (handler) {
		if (position == 'last') {
			this.set.delete(handler);
			if (this.last != handler) {
				if (this.last) {
					this.set.add(this.last);
				}
				this.last = handler;
			}
		} else {
			this.set.add(handler);
			if (this.last == handler) {
				this.last == null;
			}
		}
	}
}
ac.events.Handlers.prototype.delete = function(handler) {
	var ret = this.set.delete(handler);
	if (this.last == handler) {
		this.last = null;
		ret = true;
	}
	return ret;
}
//
ac.events.Configuration = function(name, defaultValue) {
	ac.config.Configuration.call(this, name, defaultValue);
}
ac.events.Configuration.prototype = Object.create(ac.config.Configuration.prototype);
ac.events.Configuration.prototype.consturctor = ac.events.Configuration;
ac.events.Configuration.prototype.config = function() {
	var map = this.value, handlerNames=null;
	for (var eventName in map) {
		handlerNames = map[eventName];
		handlerNames.forEach(function (handlerName) {
			ac.events.subscribe(eventName, ac.resolve(handlerName));
		});
	}
}
