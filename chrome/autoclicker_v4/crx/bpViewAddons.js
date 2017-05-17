ac.namespace('ac.addons');

ac.addons.roundCounter = {
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
// 响应事件。
ac.addons.roundCounter.onBattleModuleStarted = function() {
	this.prepare();
}
ac.addons.roundCounter.onBattlePageUpdated = function() {
	this.handle();
}
// 订阅事件。
ac.events.subscribe('onBattleModuleStarted', ac.addons.roundCounter);
ac.events.subscribe('onBattlePageUpdated', ac.addons.roundCounter);

ac.addons.duration = {
	prepare() {
		css =  '.duration{width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-4px} \
				.duration>div{background:white;border:1px solid black;padding:0 2px;display:inline-block;min-width:8px;font-weight:bold;height:13px}';
		var sheet = document.createElement('style');
		sheet.innerHTML = css;
		document.head.appendChild(sheet);
	}
	,handle() {
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
//
ac.addons.duration.onBattleModuleStarted = function() {
	this.prepare();
}
ac.addons.duration.onBattlePageUpdated = function() {
	this.handle();
}
//
ac.events.subscribe('onBattleModuleStarted', ac.addons.duration);
ac.events.subscribe('onBattlePageUpdated', ac.addons.duration);