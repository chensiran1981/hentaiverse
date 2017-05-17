package test.hv.web.http;

import hv.exception.HvException;
import test.hv.web.Method;
import test.hv.web.Page;

public abstract class HtmlPage implements Page {
	
	private String html;
	private String name;
	
	

	public HtmlPage(String name) {
		super();
		this.name = name;
	}

	@Override
	public abstract HtmlPage execute(Method m) throws HvException;

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}

	public String getName() {
		return this.name;
	}

}
