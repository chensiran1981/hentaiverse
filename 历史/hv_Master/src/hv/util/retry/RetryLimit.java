package hv.util.retry;

public interface RetryLimit {

	public void open();

	public int consume();

	public void close();

}
