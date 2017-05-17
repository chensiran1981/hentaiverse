package web.impl;

import hv.exception.HvException;
import web.IAction;
import web.ISession;

public class Session implements ISession {

	private Browser browser;
	private Pages pages;
	
	private String host;
	private String user;
	private String password;
	
	
	public Session(Browser browser) {
		this.browser = browser;
	}
	
	public void connect() {
		
	}
	
	@Override
	public void execute(IAction action) throws HvException {
		this.pages.active().execute(action);
	}
	
	public String getHost() {
		return this.host;
	}

	public String getUser() {
		return this.user;
	}

	public Pages getPages() {
		return this.pages;
	}

	public String getPassword() {
		return password;
	}

	public Browser getBrowser() {
		return browser;
	}

}
