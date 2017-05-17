package test.hv.web;

public class LoginMethod extends Method {
	
	private String user,password;

	public LoginMethod(String user, String password) {
		super("login");
		this.user = user;
		this.password = password;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


}
