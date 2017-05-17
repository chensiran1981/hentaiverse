package hv.settings;

public enum Difficulty {
	Normal(1.0, "Balanced Fun"),

	Hard(2.0, "Somewhat Tricky"),

	Nightmare(4.0, "Pretty Tough"),

	Hell(6.0, "Even Tougher"),

	Nintendo(9.0, "Old School"),

	Battletoads(12.0, "Death"),

	IWBTH(15.0, "I Wanna Be The Hentai"),

	PFUDOR(20.0, "Smiles");

	private double expmode;
	private String desc;
	
	Difficulty(double expmod, String desc) {
		this.setExpmode(expmod);
		this.setDesc(desc);
	}

	public double getExpmode() {
		return expmode;
	}

	public void setExpmode(double expmode) {
		this.expmode = expmode;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

}
