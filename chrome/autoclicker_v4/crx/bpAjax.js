//@ sourceURL=bpAjax.js
ac.namespace('ac.battle.ajax');

ac.battle.ajax.ajaxify = function() {
	var _this = this;
	function callback() {
		_this.submit();
	}
	var f = document.getElementById(ac.symbols.BattleForm.id);
	document.body.appendChild(f);
	f.submit = callback;		
	var code = ac.symbols.HookSubmit.code;
	var tag = document.createElement('script');
	tag.innerHTML = code;
	document.body.appendChild(tag);
	document.removeEventListener(ac.symbols.SubmitBattleForm.name, callback);
	document.addEventListener(ac.symbols.SubmitBattleForm.name, callback);
	this.submiting = false;
}
ac.battle.ajax.submit = function() {
	if (!this.submiting) {
		var xhr = new XMLHttpRequest();
		xhr.open('post','',true);
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.responseType = 'document';
		var _this = this;
		xhr.onload = function() {
			_this.submiting = false;
			if (xhr.status>=200 && xhr.status<400) {
				_this.replace(xhr.response);
			}
			else 
				ac.log.error('故障:'+xhr.status);
		}
		xhr.onerror = function(e) {
			_this.submiting = false;
			ac.log.error('xhr.onerror:'+xhr.status);
			location = location.href;
		}
		var formData = new FormData(document.getElementById(ac.symbols.BattleForm.id));
		this.submiting = true;
		xhr.send(formData);
	}
}

ac.battle.ajax.replace = function(newDoc) {
	if (ac.battle.page.detect(newDoc)) {
		newDoc.getElementById(ac.symbols.BattleForm.id).remove();
		var oldStuffBox = document.getElementsByClassName(ac.symbols.StuffBox.className)[0];
		var newStuffBox = newDoc.getElementsByClassName(ac.symbols.StuffBox.className)[0];
		// 用新来的页面替换现有的页面。
		document.body.replaceChild(newStuffBox,oldStuffBox);
		document.dispatchEvent(new CustomEvent(ac.symbols.ReinitializeBattleManager.name));
		ac.events.queue('onBattlePageUpdated', {document:document});
	} else if (ac.riddle.page.detect(newDoc)) {
		// 重新加载页面。
		location.assign(location.href);
	}
}
