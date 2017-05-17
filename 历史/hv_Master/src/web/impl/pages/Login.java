package web.impl.pages;

import web.impl.Session;
import hv.IHV;
import hv.exception.HvException;

public class Login extends AbstractPage {

	static String login_url = "http://e-hentai.org/bounce_login.php?bt=6";

	public Login(Session s) {
		super(s);
	}

	@Override
	public void loadHV(IHV hv) {
	}

	@Override
	public String getName() {
		return "Login";
	}

	@Override
	public boolean accept(String html) {
		return html.contains(login_url);
	}

	@Override
	public void doLogin(String host, String user, String pass)
			throws HvException {
		getSessionImpl().post(
				login_url,
				new String[][] { { "ipb_login_username", user },
						{ "ipb_login_password", pass },
						{ "ipb_login_submit", "Login!" } });
	}

}
