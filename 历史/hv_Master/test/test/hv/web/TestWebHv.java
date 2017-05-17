package test.hv.web;


import hv.ICreature;
import hv.IHero;
import hv.exception.HvException;

import org.junit.Test;

import web.ISession;
import web.Product;
import web.facade.HVImpl;
import web.impl.Browser;

public class TestWebHv {
	
	static String host = "http://hentaiverse.org";
	static String user = "xiuxianren";
	static String pass = "la123456";
	
	@Test
	public void showHeroStatus() throws HvException {
		Browser browser = new Browser(Product.Chrome);
		ISession session = browser.open(host,user,pass);
		HVImpl hv = new HVImpl(session);
		IHero hero = hv.getHero();
		print(hero);
	}
	
	private void print(ICreature obj) {
		System.out.println("Health: " + obj.getHealth());
		System.out.println("Magic: " + obj.getMagic());
		System.out.println("Spirit: " + obj.getSpirit());
	}
	
	private void print(IHero hero) {
		print((ICreature)hero);
		System.out.println("Overcharge: " + hero.getOvercharge());
		System.out.println("Level: " + hero.getLevel());
		System.out.println("Title: " + hero.getTitle());
		System.out.println("Difficulty: " + hero.getDifficulty());
		System.out.println("Stamina: " + hero.getStamina());
		System.out.println("Credits: " + hero.getCredits());
	}
	
}
