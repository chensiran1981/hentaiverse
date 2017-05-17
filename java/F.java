import java.io.*;

import org.apache.http.*;
import org.apache.http.client.methods.*;
import org.apache.http.util.*;
import org.apache.http.impl.client.*;


public class F {
	
	static final String url = "http://hentaiverse.org/login.php?ipb_member_id=602615&ipb_pass_hash=b54695ff8e425524cbffc5fa2c396bdc";
	static final String url1 = "http://httpbin.org/get";
	static PrintStream out = System.out;
	
	static class Console {
		PrintStream out = System.out;
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in))；
		public String readLine() {
			return in.readLine();
		}
		
		public void println(String s) {
			out.println(s);
		}
		
		public void close() {
			out.close();
			in.close()
		}
	}
	
	public static void main(String[] args) throws IOException {
		Console console = new Console();
		CloseableHttpClient client = HttpClients.createDefault();
		
		for(;;) {
			String inputLine = console.readLine();
			
			if ("quit".equals(inputLine)) break;
			
			
			
			
		}
		
		client.close();
		console.close();
	}
		
}