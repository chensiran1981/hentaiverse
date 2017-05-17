import java.util.regex.*;


public class Test {
	static final Pattern spliter = Pattern.compile("\\W+");
	public static void main( String[] args ) {
		
		String[] parts = spliter.split("hello(a,b)");
		
		for (int i=0;i<parts.length;i++) {
			System.out.println(parts[i]);
		}
		
	}
	
}