package hv.util;

public class IntValue {
	
	private int value = 0;
	private int max = 0;
	private float percent = 0;
	
	private void updatePercent() {
		if (max != 0) percent = value/max;
	}
	
	private void updateValue() {
		value = Math.round(max*percent);
	}
	
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		if (value < 0 || this.value == value) return;
		this.value = value;
		updatePercent();
	}
	
	public int getMax() {
		return max;
	}
	
	public void setMax(int max) {
		if (max < 0 || this.max == max) return;
		this.max = max;
		updatePercent();
	}
	
	public float getPercent() {
		return percent;
	}
	
	public void setPercent(float percent) {
		if (percent < 0 || this.percent == percent) return;
		this.percent = percent;
		updateValue();
	}

	@Override
	public String toString() {
		return value + " / " + max;
	}
	
	
	

}
