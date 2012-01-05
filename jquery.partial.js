/**
 * jQuery partial plugin
 *
 * Copyright (c) 2010-2012 Jonathan Brumley <cayasso@gmail.com>
 * Under the MIT licenses.
 * version 0.0.2
 */
(function ($) {

	var xhr;
	
    /**
     * This plugin allow you to load a partial
     * html page from the server.
     *
     * @param {String|jQuery} url
     * @param {jQuery|Function} target
     * @param {Function} fn
     * @return {Object}
     */
	var Partial = function (url, target, fn) {

		if ($.isFunction(target)) {
            fn = target;
            target = null;
        }

        if (url instanceof jQuery) {
            url = url.attr('data-url');
        }
        
        var $div = defaults.div,
        $target = target || defaults.target;
        $target.html($div);
        $div.show();

        // Abort the previous xhr if wasnt loaded
        xhr && xhr.abort && xhr.abort();

        xhr = $.get(url, function(data){
            $target.html(data);
            $div.remove();
            (typeof fn === 'function') && fn(data);
        });

        return xhr;
	},

	defaults = {
		target: $('#dynamic_content:first'),
		div: $("<div/>").addClass('loading').append("<span/>")
	};

	// Expose as plugin to jQuery
    $.partial = function (path, target, fn) {
		return Partial(path, target, fn);
	};
    
})(jQuery);
