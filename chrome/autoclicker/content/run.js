if (!this.auto) this.auto={};

auto.run = function() {
	if (auto.fight.page.yes()) return auto.fight.script.run();
	if (auto.riddle.page.yes()) return auto.riddle.page.run();
	if (auto.settings.page.yes()) return auto.settings.page.run();
}

auto.run();












