/*	(c) 2010 Matt Evanoff
*	RTPMatt At Gmail Dot Com
*	I don't really care what you do 
*	with this as long as you don't go telling 
*	people you wrote it.
*	v 0.03
*/

(function ($) {
	//the list of "live subscribes" we have
	var liveSubs = {}, regSubs = {};

	//this function adds the "live subscribe" to the DOM node
	$.fn.subscribe = function (eventName, callback) {
		var i = 0, name = null;
		eventName = eventName.split(' ');
		for(i=0;i<eventName.length;i++) {
			name = eventName[i];
			liveSubs[name] = liveSubs[name] || [];
			liveSubs[name].push({ 
				selector: this.selector,
				callback: callback
			});
		}
		return this;
	}

	//This function removes the subscribe - it takes the name of the "subscribe event" and the callback to execute
	$.fn.unsubscribe = function (eventName, callback) {
		if (!liveSubs[eventName]) {
			return;
		}
		for (var i = 0, len = liveSubs[eventName].length; i < len; i++) {
			if (this.selector === liveSubs[eventName][i].selector && callback === liveSubs[eventName][i].callback) {
				liveSubs[eventName].splice(i, 1);
				i = 0;
			}
		}
		return this;
	}

	//this sets up a normal subscription
	$.subscribe = function (eventName, callback) {
		var i = 0, name = null;
		eventName = eventName.split(' ');
		for(i=0;i<eventName.length;i++){
			name = eventName[i];
			regSubs[name] = regSubs[name] || [];
			regSubs[name].push(callback);
		}
	}

	//this unsubscribes a normal subscription
	$.unsubscribe = function (eventName, callback) {
		if (!regSubs[eventName]) {
			return;
		}
		for (var i = 0, len = regSubs[eventName].length; i < len; i++) {
			if (regSubs[eventName][i] === callback) {
				regSubs[eventName].splice(i, 1);
				i = 0;
			}
		}
	}

	//this is publish an event to be picked up from the list of live subscribes
	$.publish = function (eventName) {		
		var args = arguments, name = null, i = 0;
		eventName = eventName.split(' ');
		for(i=0;i<eventName.length;i++) {
			name = eventName[i];
			if (!liveSubs[name] && !regSubs[name]) {
				return;
			}
			if (liveSubs[name]) {
				//this deals with our awesome live sub/pubs
				for (var i = 0, len = liveSubs[name].length; i < len; i++) {
					$(liveSubs[name][i].selector).each(function () { //look for all nodes that match our selector
						liveSubs[name][i].callback.apply(this, args); //apply our fctn 
					});
				}
			}
			if (regSubs[name]) {
				//this handles the normal sub/pubs
				for (i = 0, len = regSubs[name].length; i < len; i++) {
					regSubs[name][i].apply(this, args); //apply our fctn 
				}
			}
		}
	}
})(jQuery);