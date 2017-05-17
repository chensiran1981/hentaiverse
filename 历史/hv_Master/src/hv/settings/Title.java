package hv.settings;

public enum Title {
	Newbie("No Bonus"),

	Beginner("+0.5% Damage"),

	Novice("+1.0% Damage"),

	Apprentice("+1.5% Damage"),

	Journeyman("+2.0% Damage"),

	Artisan("+2.5% Damage"),

	Expert("+3.0% Damage"),

	Master("+3.5% Damage"),

	Champion("+4.0% Damage"),

	Hero("+4.5% Damage"),

	Lord("+5.0% Damage"),

	Ascended("+6.0% Damage, +1% Evade"),

	Destined("+8.0% Damage, +2% Evade"),

	Godslayer("+10.0% Damage, +3% Evade");

	private String effect;

	Title(String e) {
		this.setEffect(e);
	}

	public static void main(String[] args) {
		for (Title d : Title.values()) {
			System.out.println(d);
		}
	}

	public String getEffect() {
		return effect;
	}

	public void setEffect(String effect) {
		this.effect = effect;
	}

}
