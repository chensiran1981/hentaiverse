package hv.util;

import java.util.ArrayList;
import java.util.List;


public class NameValues {
	
	private List<NameValue> list = new ArrayList<NameValue>();

	public void copy(NameValues fs) {
		list.clear();
		list.addAll(fs.list);
	}

	public NameValues add(String name, Object value) {
		list.add(new NameValue(name,value));
		return this;
	}
	
}
