package test.misc;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.junit.Test;

public class TestPath {

	@Test
	public void test() throws ClassNotFoundException, IOException, InstantiationException, IllegalAccessException {
		String pkg = this.getClass().getPackage().getName();
		System.out.println(pkg);
		
		URL url = this.getClass().getResource("");
		System.out.println(url);
		
		URLClassLoader ucl = new URLClassLoader(new URL[] {});
		Class<Testing> c = (Class<Testing>) ucl.loadClass(pkg+".Testing");
		Testing o = c.newInstance();
		o.test();
		ucl.close();
	}
	
	@Test
	public void test2() throws URISyntaxException {
		String pkg = this.getClass().getPackage().getName();
		int segs = 1;
		for (int i=0;i<pkg.length();i++) {
			if (pkg.charAt(i) == '.') {
				segs++;
			}
		}
		System.out.println(pkg+" has "+segs+" name elements.");
		
		URL url = this.getClass().getResource("");
		System.out.println(url);
		Path path = Paths.get(url.toURI());
		System.out.println(path);
		
		//去掉包名路径，得到类路径。
		Path cp = path.subpath(0, path.getNameCount()-segs);
		System.out.println(cp);
		
		cp = cp.toAbsolutePath();
		System.out.println(cp);
		
		URI uri = cp.toUri();
		System.out.println(uri);
	}
	
	@Test
	public void test1() throws URISyntaxException, IOException {
		//Get the package of current.
		Package pkg = TestPath.class.getPackage();
		
		//Get the path of current package.
		URL url = TestPath.class.getResource("");
		System.out.println(url);
		
		//Convert url to path.
		Path path = Paths.get(url.toURI());
		System.out.println(path);
		
	}
}
