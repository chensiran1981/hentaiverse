package web;

import hv.exception.HvException;

public interface ISession {

	void execute(IAction action) throws HvException;

}
