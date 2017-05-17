//@ sourceURL=soundAlert.js
ac.namespace('ac.alert');

ac.alert.onWhoIsThisPony = function() {
	ac.audio.play('pony.mp3');
}
ac.alert.onDefeated = function() {
	ac.audio.play('defeated.mp3');
}
ac.alert.onChallengeCleared = function() {
	ac.audio.play('victory.mp3');
}
//
ac.events.subscribe('onDefeated', ac.alert);
ac.events.subscribe('onChallengeCleared', ac.alert);
ac.events.subscribe('onWhoIsThisPony', ac.alert);