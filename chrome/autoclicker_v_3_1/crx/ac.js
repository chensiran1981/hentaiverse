var ac = {}

ac.Gauge = function(value,max) {
	this.set(value, max);
};
ac.Gauge.prototype.set = function(value, max) {
	this.value = parseInt(value); this.max = parseInt(max); 
	if (this.value==0) this.percent = 0;
	else this.percent = Math.round(100 * this.value / this.max);
};

ac.events = {
	fire(eventName,data) {
		var handlers = this[eventName];
		if (handlers != undefined) {
			handlers.forEach(function(handler) {
				if (typeof(handler) === 'function') {
					handler(data);
				} else {
					handler[eventName](data);
				}
			});
		}
	}
	,queue(eventName,data) {
		var _this = this;
		setTimeout(function() {
			_this.fire(eventName, data);
		});
	}
	,subscribe(eventName, handler) {
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
			handlers = new Set();
			this[eventName] = handlers;
		}
		handlers.add(handler);
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

