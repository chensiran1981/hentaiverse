package test.hv.web.http;

import test.hv.web.PageBuilder;

public abstract class HtmlPageBuilder implements PageBuilder {
	
	protected String html;
	
	public HtmlPageBuilder setHtml(String html) {
		this.html = html;	
		return this;
	}

	@Override
	public abstract HtmlPage build();
	
	
}
