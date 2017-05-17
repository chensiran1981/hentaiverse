package web.actions;


public class LoginAction extends BaseAction {
	
	private String user;
	private String password;

	public LoginAction(String user,String pass) {
		this.user = user;
		this.password = pass;
	}
	
	public String getUser() {
		return this.user;
	}
	
	public String getPassword() {
		return this.password;
	}


}
