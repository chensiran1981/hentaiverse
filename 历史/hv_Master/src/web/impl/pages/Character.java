package web.impl.pages;

import hv.IHV;
import web.impl.Session;

public class Character extends AbstractPage {
	
	static String keyword = "pattrform";
	private RegularStatusPane regularStatusPane;

	public Character(Session s) {
		super(s);
	}

	@Override
	public void loadHV(IHV hv) {
		getRegularStatusPane().loadHV(hv);
		//getPrimaryAttrPane().loadHV(hv);
		//getStatisticPane().loadHV(hv);
		//getEquipmentProficiencyPane().loadHV(hv);
		//getMagicProficiencyPane().loadHV(hv);
		//getBaseVitalsPane().loadHV(hv);
		
	}

	private RegularStatusPane getRegularStatusPane() {
		if (regularStatusPane == null) {
			regularStatusPane = new RegularStatusPane(this,getJSoupDocument().select("div.clb").first());
		}
		return regularStatusPane;
	}

	@Override
	public String getName() {
		return "Character";
	}

	@Override
	public boolean accept(String html) {
		return html.contains(keyword);
	}

}
