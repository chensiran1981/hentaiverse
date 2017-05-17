package web.http.tool;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

public class HttpClientTool {

	public static Iterable<NameValuePair> toNameValuePairs(String[][] inputs) {
		List<NameValuePair> ret = new ArrayList<NameValuePair>();
		for (int i=0;i<inputs.length;i++) {
			ret.add(new BasicNameValuePair(inputs[i][0], inputs[i][1]));
		}
		return ret;
	}

}
