function add() {
	document.getElementById("btn").addEventListener("click", function fn(event) {
		alert("You'll only see this once!");
	},{once:true});
}