package test.hv.web.http;

import hv.exception.HvException;

import org.junit.Test;

public class GeneralPageBuilderTest {
	
	@Test
	public void test() throws HvException {
		GeneralPageBuilder b = new GeneralPageBuilder();
	}
	
	@Test
	public void _test() {
		String pathSeparator = System.getProperty("path.separator");
		String classpath = System.getProperty("java.class.path");
		System.out.println(classpath);
	}

}
