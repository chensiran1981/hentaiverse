package test.hv.web.http;

import hv.exception.HvException;
import test.hv.web.Method;

public class Unknown extends HtmlPage {

	public Unknown() {
		super("Unknown");
	}

	@Override
	public HtmlPage execute(Method m) throws HvException {
		throw new HvException("����"+this.getName()+"ҳ�棬���յ�������"+m.getName()+"�����Ҳ�֪����δ�������");
	}

}
