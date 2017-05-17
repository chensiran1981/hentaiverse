package test.hv.web.http;

import hv.exception.HvException;
import test.hv.web.Method;

public class Unknown extends HtmlPage {

	public Unknown() {
		super("Unknown");
	}

	@Override
	public HtmlPage execute(Method m) throws HvException {
		throw new HvException("我是"+this.getName()+"页面，我收到了命令"+m.getName()+"，但我不知道如何处理该命令。");
	}

}
