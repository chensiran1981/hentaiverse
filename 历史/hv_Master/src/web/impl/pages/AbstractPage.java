package web.impl.pages;

import hv.exception.HvException;

import java.net.URI;

import javax.naming.OperationNotSupportedException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import web.IOperablePage;
import web.impl.Session;

public abstract class AbstractPage implements IOperablePage {

	private Session session;
	private String html;
	private URI uri;
	private Document doc;

	public AbstractPage(Session s) {
		session = s;
	}

	public Session getSessionImpl() {
		return session;
	}

	public abstract boolean accept(String html);
	
	@Override
	public void doLogin(String host, String user, String pass) throws HvException {
		throw new HvException(new OperationNotSupportedException(this.getName()+ "不支持login(host,user,pass)操作。"));
	}

	public void setContent(String h, URI u) {
		html = h;
		uri = u;
		doc = Jsoup.parse(html);
	}

	public Document getJSoupDocument() {
		return doc;
	}


}
