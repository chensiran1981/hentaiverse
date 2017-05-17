package web;

import hv.exception.HvException;

public interface ISessions {
	
	ISession find(String host,String user,String password);
	ISession create(String host) throws HvException;

}
