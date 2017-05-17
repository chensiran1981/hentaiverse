package web.impl.pages;

import hv.IHV;
import hv.settings.Difficulty;
import hv.settings.Title;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.nodes.Element;

public class RegularStatusPane {
	
	private AbstractPage owner;
	private Element element;
	
	public RegularStatusPane(AbstractPage parent,Element e) {
		super();
		this.setElement(e);
		this.owner = parent;
	}
	
	//Health points 6383 / 7225 Magic points 1166 / 1166 Spirit points 368 / 368 Overcharge 10% Level 238 Godslayer Difficulty Normal Credits 401,707 Current exp 10,691,993 To next level 38,207,543 Stamina: 99
	static Pattern ph = Pattern.compile("(?i)Health points(?=) ((\\d*) / (\\d*))");
	static Pattern pm = Pattern.compile("(?i)Magic points(?=) ((\\d*) / (\\d*))");
	static Pattern ps = Pattern.compile("(?i)Spirit points(?=) ((\\d*) / (\\d*))");
	static Pattern po = Pattern.compile("(?i)Overcharge(?=) (\\d*)%");
	static Pattern pst = Pattern.compile("(?i)Stamina:(?=) (\\d*)");
	static Pattern plv = Pattern.compile("(?i)Level(?=) (\\d*)");
	static Pattern pti = Pattern.compile("(?i)Newbie|Beginner|Novice|Apprentice|Journeyman|Artisan|Expert|Master|Champion|Hero|Lord|Ascended|Destined|Godslayer");
	static Pattern pdi = Pattern.compile("(?i)Difficulty(?=) (Normal|Hard|Nightmare|Hell|Nintendo|Battletoads|IWBTH|PFUDOR)");
	static Pattern pcr = Pattern.compile("(?i)Credits(?=) ([\\d,]*)");
	
	public void loadHV(IHV hv) {
		String t = this.element.text();
		loadHealth(t,hv);
		loadMagic(t,hv);
		loadSpirit(t,hv);
		loadOvercharge(t,hv);
		loadStamina(t,hv);
		loadLevel(t,hv);
		loadTitle(t,hv);
		loadDifficulty(t,hv);
		loadCredits(t,hv);
	}
	
	private void loadCredits(String t, IHV hv) {
		Matcher m = pcr.matcher(t);
		if (m.find()) {
			String v = m.group(1);
			hv.getHero().setCredits(Integer.parseInt(v.replace(",", "")));
		}
	}

	private void loadDifficulty(String t, IHV hv) {
		Matcher m = pdi.matcher(t);
		if (m.find()) {
			String v = m.group(1);
			hv.getHero().setDifficulty(Difficulty.valueOf(v));
		}
	}

	private void loadTitle(String t, IHV hv) {
		Matcher m = pti.matcher(t);
		if (m.find()) {
			String v = m.group();
			hv.getHero().setTitle(Title.valueOf(v));
		}
	}

	private void loadLevel(String t, IHV hv) {
		Matcher m = plv.matcher(t);
		if (m.find()) {
			String v = m.group(1);
			hv.getHero().setLevel(Integer.parseInt(v));
		}
	}

	private void loadStamina(String t, IHV hv) {
		Matcher m = pst.matcher(t);
		if (m.find()) {
			String v = m.group(1);
			hv.getHero().getStamina().setValue(Integer.parseInt(v));
			hv.getHero().getStamina().setMax(99);
		}
	}

	private void loadOvercharge(String t, IHV hv) {
		Matcher m = po.matcher(t);
		if (m.find()) {
			String v = m.group(1);
			hv.getHero().getOvercharge().setValue(Integer.parseInt(v));
		}
	}

	private void loadSpirit(String t, IHV hv) {
		Matcher m = ps.matcher(t);
		if (m.find()) {
			String v = m.group(2);
			String l = m.group(3);
			hv.getHero().getSpirit().setMax(Integer.parseInt(l));
			hv.getHero().getSpirit().setValue(Integer.parseInt(v));
		}
		
	}

	private void loadHealth(String t,IHV hv) {
		Matcher m = ph.matcher(t);
		if (m.find()) {
			String v = m.group(2);
			String l = m.group(3);
			hv.getHero().getHealth().setMax(Integer.parseInt(l));
			hv.getHero().getHealth().setValue(Integer.parseInt(v));
		}
	}
	
	private void loadMagic(String t,IHV hv) {
		Matcher m = pm.matcher(t);
		if (m.find()) {
			String v = m.group(2);
			String l = m.group(3);
			hv.getHero().getMagic().setMax(Integer.parseInt(l));
			hv.getHero().getMagic().setValue(Integer.parseInt(v));
		}
	}

	public Element getElement() {
		return element;
	}

	public void setElement(Element root) {
		this.element = root;
	}
	
}
