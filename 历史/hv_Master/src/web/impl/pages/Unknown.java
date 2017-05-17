package web.impl.pages;

import web.impl.Session;
import hv.IHV;

public class Unknown extends AbstractPage {

	public Unknown(Session s) {
		super(s);
	}

	@Override
	public void loadHV(IHV hv) {
	}

	@Override
	public String getName() {
		return "Unknown";
	}

	@Override
	public boolean accept(String html) {
		return false;
	}

}
