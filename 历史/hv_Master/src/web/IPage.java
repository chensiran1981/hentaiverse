package web;

import hv.IHV;
import hv.exception.HvException;

public interface IPage {
	
	void loadHV(IHV hv);

	String getName();

	void execute(IAction action) throws HvException;

}
