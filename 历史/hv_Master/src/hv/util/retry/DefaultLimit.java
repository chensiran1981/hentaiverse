package hv.util.retry;

public class DefaultLimit implements RetryLimit {

	private int times;
	private long timeout;
	private long startms;

	public DefaultLimit(int maxtimes, long maxtimeout) {
		this.times = maxtimes;
		this.timeout = maxtimeout;
	}

	@Override
	public void open() {
		startms = System.currentTimeMillis();
	}

	@Override
	public int consume() {
		times--;
		timeout = timeout - (System.currentTimeMillis()-startms);
		if (times <=0 || timeout <=0) {
			return -1;
		}
		return 1;
	}

	@Override
	public void close() {
		//本限时器未使用任何系统资源。
	}

}
