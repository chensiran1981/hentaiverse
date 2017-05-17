package hv.exception;

public class HvException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public HvException() {
		super();
	}

	public HvException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public HvException(String message, Throwable cause) {
		super(message, cause);
	}

	public HvException(String message) {
		super(message);
	}

	public HvException(Throwable cause) {
		super(cause);
	}
	
	

}
