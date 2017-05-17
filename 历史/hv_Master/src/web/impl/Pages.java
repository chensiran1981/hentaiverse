package web.impl;

import web.IPage;
import web.IPages;

public class Pages implements IPages {

	private IPage active;

	@Override
	public IPage active() {
		return this.active;
	}

}
