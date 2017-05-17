package test.hv.web;

import hv.exception.HvException;

public interface Page {
	
	Page execute(Method m) throws HvException ;

}
