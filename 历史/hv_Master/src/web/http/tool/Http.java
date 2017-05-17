package web.http.tool;

import hv.exception.HvException;

import java.io.IOException;

import org.apache.http.client.fluent.Request;

public class Http {
	
	private CharSequence htmlchars = null;
	
	
	public Http() {
	}

	public void get(String url) throws HvException  {
		Request req = Request.Get(url);
		setGeneralHeaders(req);
		try {
			htmlchars = req.execute().returnContent().asString();
		} catch (IOException e) {
			throw new HvException(e);
		}
	}

	private void setGeneralHeaders(Request c) {
		c.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		c.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36");
		c.setHeader("Accept-Encoding", "gzip");
		c.setHeader("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4");
	}

}
