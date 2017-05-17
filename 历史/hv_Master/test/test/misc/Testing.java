package test.misc;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;

public class Testing {
	
	static Pattern ph = Pattern.compile("(?i)Health points(?=) ((\\d*) / (\\d*))");
	static Pattern pm = Pattern.compile("(?i)Magic points(?=) ((\\d*) / (\\d*))");
	static Pattern ps = Pattern.compile("(?i)Spirit points(?=) ((\\d*) / (\\d*))");
	static Pattern po = Pattern.compile("(?i)Overcharge(?=) (\\d*)%");

	@Test
	public void test() {
		String input = "Health points 6383 / 7225 Magic points 1166 / 1166 Spirit points 368 / 368 Overcharge 10% Level 238";
		Matcher m = ph.matcher(input);
		if (m.find()) {
			System.out.println(m.group(0));		
			System.out.println(m.group(1));
			System.out.println(m.group(2));
			System.out.println(m.group(3));
		} else
			System.out.println("found nothing.");
		
	}
	
	@Test
	public void testparseint() {
		String s = "1100";
		System.out.println(Integer.parseInt(s)); 
	}


}
