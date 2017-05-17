package test.misc;

public class TestCovariant {
	
	class SuperClass {
		void m() {
		}
		SuperClass m1() {
			return null;
		}
	}
	
	class SubClass extends SuperClass {
		void m() {
			
		}
		SubClass m1() {
			return null;
		}
	}
	
	
	

}
