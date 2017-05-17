package test.hv.web.http;

public class UnknownBuilder extends HtmlPageBuilder {

	@Override
	public HtmlPage build() {
		return new Unknown();
	}

}
