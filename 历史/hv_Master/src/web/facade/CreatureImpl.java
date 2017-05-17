package web.facade;

import hv.ICreature;
import hv.util.IntValue;

public class CreatureImpl extends ObjectImpl implements ICreature {

	private IntValue health = new IntValue();
	private IntValue magic = new IntValue();
	private IntValue spirit = new IntValue();

	public CreatureImpl(HVImpl hv) {
		super(hv);
	}

	@Override
	public IntValue getHealth() {
		return this.health;
	}

	@Override
	public IntValue getMagic() {
		return this.magic;
	}

	@Override
	public IntValue getSpirit() {
		return this.spirit;
	}

}