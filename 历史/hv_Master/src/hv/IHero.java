package hv;

import hv.settings.Difficulty;
import hv.settings.Title;
import hv.util.IntValue;

public interface IHero extends ICreature {
	
	IntValue getOvercharge();
	
	IntValue getStamina();
	
	void setLevel(int level);
	int getLevel();
	
	void setTitle(Title title);
	Title getTitle();
	
	void setDifficulty(Difficulty difficulty);
	Difficulty getDifficulty();
	
	void setCredits(int credits);
	int getCredits();

}
