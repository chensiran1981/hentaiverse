package web.impl;

import hv.exception.HvException;
import web.IBrowser;
import web.IPage;
import web.ISession;
import web.Product;
import web.actions.LoginAction;

public class Browser implements IBrowser {

	private Product product;
	private Sessions sessions = new Sessions(this);

	public Browser(Product p) {
		product = p;
	}

	public ISession open(String host, String user, String pass) throws HvException {
		Session s = getSessions().find(host,user,pass);
		if (s == null) {
			s = getSessions().create(host);
			IPage p = s.getPages().active();
			p.execute(new LoginAction(user,pass));
		}
		
		return s;
	}

	/* (non-Javadoc)
	 * @see web.IBrowser#getSessions()
	 */
	@Override
	public Sessions getSessions() {
		return sessions;
	}

	/* (non-Javadoc)
	 * @see web.IBrowser#getProduct()
	 */
	@Override
	public Product getProduct() {
		return product;
	}
	
}
