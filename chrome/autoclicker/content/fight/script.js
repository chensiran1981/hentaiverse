if (!this.auto) auto = {};
if (!auto.fight) auto.fight={};
if (!auto.options) auto.options = {};

auto.fight.script = {
	
	page:auto.fight.page
	
	,run() {
		var _this = this;
		chrome.runtime.sendMessage({cmd:"get",file:"options"},function(response){
			_this.onGet_Options(response);
		});
	}
	
	,onGet_Options(ops) {
		var _this = this;
		
		// 选项。
		auto.options = ops;
		
		// 初始化BUFF回合显示功能。
		this.duration.prepare();
		if (auto.options.debug) 
			//46是小数点。
			this.page.bindKey(46,function() {
				auto.warrior.run();
			});	
		
		// 进入ajax模式。
		// this.page.ajax();
		// this.page.onAjaxReloaded = subrun;
		
		function subrun() {
			
			// 运行BUFF回合显示代码。
			_this.duration.run();
		
			//检查页面状态。
			_this.page.check();
			
			//在底部显示最近的操作。
			_this.page.toast(_this.page.logs.a_Last.result.eventLog);
			
			// 战斗
			_this.fight();
		}
		
		//subrun;
		subrun();
	}
	
	,fight() {
		if (!auto.options.debug) 
			auto.warrior.run();
	}
	
	,duration:{
		prepare() {
			css =  '.duration{width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-4px} \
					.duration>div{background:white;border:1px solid black;padding:0 2px;display:inline-block;min-width:8px;font-weight:bold;height:13px}';
			var sheet = document.createElement('style');
			sheet.innerHTML = css;
			document.head.appendChild(sheet);
		}
		,run() {
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

}




