package hv.util.retry;


public class Retry {

	private RetryLimit limit;

	/**
	 * 
	 * @param times
	 * @param timeout	∫¡√Îµ•Œª°£
	 */
	public Retry(int times, long timeout) {
		limit = new DefaultLimit(times, timeout);
	}

	public boolean run(TryHandler tryHandler) {
		limit.open();
		try {
			while (limit.consume() != -1) {
				boolean b = tryHandler.run();
				if (b) return true;
			}
			return false;
		} finally {
			limit.close();
		}
	}

}
