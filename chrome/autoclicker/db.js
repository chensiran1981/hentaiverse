if (!this.auto) this.auto={};


auto.db = {
	getItem(name) {
		return JSON.parse(localStorage.getItem(name));
	}
	,setItem(name,value) {
		localStorage.setItem(name,JSON.stringify(value));
	}
}