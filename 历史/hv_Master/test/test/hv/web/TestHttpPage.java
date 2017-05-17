package test.hv.web;

import hv.exception.HvException;

import org.junit.Test;

import test.hv.method.Open;
import test.hv.web.http.HttpContainer;

public class TestHttpPage {

	@Test
	public void test() throws HvException {
		HttpContainer tab = new HttpContainer();
		
		tab.execute(new Open("http://hentaiverse.org"));
		tab.execute(new LoginMethod("xiuxianren","la123456"));
		
	}

}
