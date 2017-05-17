package web.impl;

import hv.exception.HvException;

import java.util.ArrayList;
import java.util.List;

import web.ISessions;

public class Sessions implements ISessions {

	private Browser browser;
	private List<Session> list = new ArrayList<Session>();

	public Sessions(Browser browser) {
		this.browser = browser;
	}

	public Browser getBrowser() {
		return browser;
	}

	@Override
	public Session find(String host, String user,String password) {
		for (Session s : list ) {
			if (host.equalsIgnoreCase(s.getHost())
					&& user.equalsIgnoreCase(s.getUser())
					&& password.equalsIgnoreCase(s.getPassword())) {
				return s;
			}
		}
		return null;
	}

	@Override
	public Session create(String host) throws HvException {
		Session s = new Session(browser);
		list.add(s);
		return s;
	}

}
