module.exports = Object.freeze({
	BASE_URL :'http://localhost:8086',
	ACTION_VALID:'Some other action',
		getParameterByName: function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	getToken(name: string): string {
	    return localStorage.getItem(name);
	},
	setToken(name: string, token: string): void {
    	localStorage.setItem(name, token);
 	}
});