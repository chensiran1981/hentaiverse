package test.hv.web.http;

import hv.exception.HvException;
import test.hv.method.Open;
import test.hv.web.Method;
import test.hv.web.Page;
import test.hv.web.PageContainer;
import web.http.tool.Http;

public class HttpContainer implements PageContainer,Page {
	
	Http http;
	GeneralPageBuilder builder;
	
	private HtmlPage active;
	

	public HttpContainer() {
		super();
	}

	@Override
	public Page execute(Method m) throws HvException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HtmlPage getPage() {
		return this.active;
	}

}
