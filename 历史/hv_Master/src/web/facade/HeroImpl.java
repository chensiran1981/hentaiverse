package web.facade;

import hv.IHero;
import hv.settings.Difficulty;
import hv.settings.Title;
import hv.util.IntValue;

public class HeroImpl extends CreatureImpl implements IHero {

	private IntValue stamina = new IntValue();
	private IntValue overcharge = new IntValue();
	private int level;
	private Title title;
	private Difficulty difficulty;
	private int credits;

	public HeroImpl(HVImpl webHV) {
		super(webHV);
	}

	@Override
	public IntValue getStamina() {
		return this.stamina ;
	}

	@Override
	public IntValue getOvercharge() {
		return this.overcharge  ;
	}

	@Override
	public void setLevel(int level) {
		this.level = level;
		
	}

	@Override
	public void setTitle(Title title) {
		this.title = title;
		
	}

	@Override
	public void setDifficulty(Difficulty difficulty) {
		this.difficulty = difficulty;
		
	}

	@Override
	public void setCredits(int credits) {
		this.credits = credits;
		
	}

	@Override
	public int getLevel() {
		
		return this.level;
	}

	@Override
	public Title getTitle() {
		
		return this.title;
	}

	@Override
	public Difficulty getDifficulty() {
		
		return this.difficulty;
	}

	@Override
	public int getCredits() {
		
		return this.credits;
	}

}
