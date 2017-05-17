package web.facade;

import hv.IObject;

public class ObjectImpl implements IObject {
	
	private HVImpl owner;

	public ObjectImpl(HVImpl owner) {
		super();
		this.owner = owner;
	}

	public HVImpl getHV() {
		return owner;
	}

}
