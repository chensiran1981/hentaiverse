package test.hv.method;

import test.hv.web.Method;

public class Open extends Method {
	
	private String url;

	public Open(String url) {
		super("open");
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
