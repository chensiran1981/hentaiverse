package test.hv.web.http;

import hv.exception.HvException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import util.ClassFinder;

public class GeneralPageBuilder extends HtmlPageBuilder {

	private List<HtmlPageBuilder> builders = new ArrayList<HtmlPageBuilder>();// should
																				// be
																				// injected.
	private UnknownBuilder unknownBuilder = new UnknownBuilder();

	public GeneralPageBuilder() throws HvException {
		super();
		createBuilders();
	}

	protected void createBuilders() throws HvException {
		try {
			ClassFinder<HtmlPageBuilder> f = new ClassFinder<>(
					new ClassFinder.ClassNameFilter() {
						String u = UnknownBuilder.class.getName();
						String d = GeneralPageBuilder.class.getName();

						@Override
						public boolean accept(String classFullName) {
							return classFullName.endsWith("Builder")
									&& !classFullName.equalsIgnoreCase(u)
									&& !classFullName.equalsIgnoreCase(d);
						}
					}, HtmlPageBuilder.class);
			List<Class<? extends HtmlPageBuilder>> bs = f.findClass();

			this.builders.clear();
			for (Class<? extends HtmlPageBuilder> c : bs) {
				this.builders.add(c.newInstance());
			}
		} catch (ClassNotFoundException | IOException | InstantiationException
				| IllegalAccessException e) {
			throw new HvException(e);
		}

	}

	@Override
	public HtmlPage build() {
		for (HtmlPageBuilder b : builders) {
			HtmlPage ret = b.setHtml(this.html).build();
			if (ret != null)
				return ret;
		}
		return unknownBuilder.setHtml(this.html).build();
	}
	
	

}
