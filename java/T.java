import java.io.*;

public class T {
	public static String CRLF = "\r\n";
	
	public static void main(String[] args) throws IOException {
		String s = System.getProperty("line.separator");
		System.out.println(CRLF.equals(s));
	}
}
