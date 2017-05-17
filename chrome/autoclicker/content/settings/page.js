if (!this.auto) auto = {};
if (!auto.settings) auto.settings = {};

auto.settings.page = {
	yes() {
		return document.getElementById("settingsdiv") != null
	}
	
	,run() {
		this.check();
	}
	
	//==== check ====
	,autoCast:{
		check() {
			var autoCasts = [];
			var acs = document.querySelectorAll("select[name^='ac_']");
			if (acs) {
				for (var i=0;i<acs.length;i++) {
					var sel = acs[i];
					var sid = sel.selectedIndex;
					if (sid != 0) {
						var op = sel.options[sid];
						var name = op.text;
						var id = op.value;
						autoCasts.push({name:name,id:id});
					}
				}
			}
			hv.settings.set("autocasts",autoCasts);
		}
	}
	
	,check() {
		this.autoCast.check();
	}
}
