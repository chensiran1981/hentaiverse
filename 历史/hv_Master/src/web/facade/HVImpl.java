package web.facade;

import web.IPageListener;
import web.ISession;
import hv.IHV;
import hv.IHero;

public class HVImpl implements IHV,IPageListener {

	private ISession session;
	private IHero hero = new HeroImpl(this);

	public HVImpl(ISession session) {
		this.session = session;
		this.session.addPageListener(this);
		this.session.getPage().loadHV(this);
	}

	@Override
	public IHero getHero() {
		return this.hero ;
	}

	public ISession getSession() {
		return session;
	}

	@Override
	public void onPageChanged(ISession s) {
		if (s == this.session) {
			session.getPage().loadHV(this);
		}
	}


}
