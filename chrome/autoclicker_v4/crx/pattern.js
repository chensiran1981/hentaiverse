//@ sourceURL=pattern.js
ac.namespace('ac.pattern')

ac.pattern.hits = {
	regex:
	groups:[undefined, 'subject', 'object', 'damage', 'type'] 
	,exec(battleEvent) {
		var g = this.regex.exec(battleEvent.message);
		if (g) {
			this.groups.forEach(function(currentValue, index) {
				if (currentValue != undefined) {
					battleEvent.data[currentValue] = g[index];
				}
			});
		}
	}
}