package test.misc;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.zip.GZIPInputStream;

import org.junit.Test;

public class UsingHttp {
	
	private String u_hentaiverse = "http://hentaiverse.org";
	private String cookie_member_id = "ipb_member_id=602615"; 
	private String cookie_member_pass = "ipb_pass_hash=b54695ff8e425524cbffc5fa2c396bdc";
	
	private String u1 = "http://e-hentai.org/bounce_login.php?bt=6&hvreturn=1&encounter=";
	private String u_login = "http://e-hentai.org/bounce_login.php?bt=6";
	
	@Test
	public void login() throws IOException {
		
		URL hv = new URL(u_hentaiverse);
		
		HttpURLConnection http = (HttpURLConnection)hv.openConnection();
		http.setInstanceFollowRedirects(false);
		http.setRequestMethod("GET");
		http.setRequestProperty("user-agent", "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36");
		http.setRequestProperty("Accept-Encoding", "gzip,deflate,sdch");
		http.setRequestProperty("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4");
		http.setRequestProperty("Cookie", "ipb_member_id=602615; ipb_pass_hash=b54695ff8e425524cbffc5fa2c396bdc");
		
		InputStream in = http.getInputStream();
		if ("gzip".equalsIgnoreCase(http.getHeaderField("Content-Encoding"))) {
			//print(new GZIPInputStream(http.getInputStream()),"utf-8");
			Files.copy(new GZIPInputStream(in), new File("D:\\test.html").toPath(),StandardCopyOption.REPLACE_EXISTING);
		}
	}
	
	@Test
	public void yahoo() throws IOException {
		URL yahoo = new URL("http://www.yahoo.com");
		HttpURLConnection.setFollowRedirects(false);
        URLConnection yc = yahoo.openConnection();
        print(yc.getInputStream(),"UTF-8");
	}
	
	
	
	private void print(InputStream ins,String charset) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(ins,charset));
		String l;
		while((l = br.readLine()) != null) {
			System.out.println(l);
		}
	}

}
