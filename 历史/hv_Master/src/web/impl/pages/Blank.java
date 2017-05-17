package web.impl.pages;

import web.impl.Session;
import hv.IHV;
import hv.exception.HvException;

public class Blank extends AbstractPage {

	public Blank(Session sessionImpl) {
		super(sessionImpl);
	}

	@Override
	public void loadHV(IHV hv) {
	}

	@Override
	public void doLogin(String host, String user, String pass) throws HvException {
		getSessionImpl().get(host);
		getSessionImpl().getPage().doLogin(host,user,pass);
	}

	@Override
	public String getName() {
		return "Blank";
	}

	@Override
	public boolean accept(String html) {
		return false;
	}

}
