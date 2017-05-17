package web.http.tool;

import java.io.File;
import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.junit.Test;

public class Testing {

	@Test
	public void testFluent() throws ClientProtocolException, IOException {
		String url = "http://hentaiverse.org";
		Response rep = Request.Get(url).execute();
		rep.saveContent(new File("hvtestpage.html"));
	}

}
