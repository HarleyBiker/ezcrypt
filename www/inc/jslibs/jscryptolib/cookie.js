/* jscrypto library, url utility
 *   by GUAN Zhi <guanzhi at guanzhi dot org>
 */


function cookie_set(name, value, expire) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = name + '=' + escape(value) + 
		((expire == null) ? '' : ';expires=' + exdate.toGMTString());
};

function cookie_get(name) {
};

function cookie_delete(name) {
};

function cookie_clear() {
};

jscrypto.cookie = {
	key: function(index) {
	},
	getItem: function(key) {
		var fragid = window.location.hash.slice(1);
	},
	setItem: function(key, data) {
	},
	removeItem: function(key) {
	},
	clear: function() {
	}
};

jscrypto.localStorage = {
	key: function(index) {
	},
	getItem: function(key) {
		var fragid = window.location.hash.slice(1);
	},
	setItem: function(key, data) {
	},
	removeItem: function(key) {
	},
	clear: function() {
	}
};

jscrypto.urlStorage = {
	key: function(index) {
	},
	getItem: function(key) {
	},
	setItem: function(key, data) {
	},
	removeItem: function(key) {
	},
	clear: function() {
	}	
};

jscrypto.adobeFlashStorage = {
	key: function(index) {
	},
	getItem: function(key) {
	},
	setItem: function(key, data) {
	},
	removeItem: function(key) {
	},
	clear: function() {
	}	
};




