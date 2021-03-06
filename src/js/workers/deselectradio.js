/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*
 * Deselectable radio buttons plugin
 */
(function () {
	"use strict";
	var _pe = window.pe || {
		fn : {}
	};
	/* local reference */
	_pe.fn.deselectradio = {
		type : 'plugin',
		depends : [],
		_exec : function (elm) {
			var inputs = document.getElementsByTagName('input'),
				inputs_len = inputs.length,
				input;
			// Functionality can be disabled by applying deselect-off to the radio button
			while (inputs_len--) {
				input = inputs[inputs_len];
				if (input.type === 'radio' && input.className.indexOf('deselect-off') === -1) {
					input.className += ' deselectable' + (input.checked ? ' checked' : '');
				}
			}
			_pe.document.on('click vclick', 'input[type="radio"].deselectable', function (e) {
				var button = e.button;
				if (typeof button === 'undefined' || button === _pe.leftMouseButton) { // Ignore middle/right mouse buttons
					e.stopPropagation();
					if (this.className.indexOf(' checked') !== -1) { // Already selected so deselect and remember that it is no longer selected
						this.checked = false;
						this.className = this.className.replace(' checked', '');
					} else { // Not selected previously so remember that it is now selected
						var name = this.getAttribute('name'),
							inputs,
							input,
							inputs_len;
						if (name !== undefined) {
							inputs = document.getElementsByName(name);
							inputs_len = inputs.length;
							while (inputs_len--) {
								input = inputs[inputs_len];
								if (input.className.indexOf(' checked') !== -1) {
									input.className = input.className.replace(' checked', '');
								}
							}
							this.className += ' checked';
						}
					}
				}
			});
			return elm;
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
}
());
