/**
 * Dynamic Padding
 * @ver: 2.0
 * @author: Chris McClean
 * 
 * Copyright September 2013, Chris McClean
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.gnu.org/licenses/gpl.html  |  http://opensource.org/licenses/mit-license.php
 * 
 * Credits: Original script written by Les James @ http://www.lesjames.com
 **/
(function ($) {

    // Create an object literal for our methods
    var methods = {
        // Define individual methods within the literal
        init: function (opts) {

            // Repeat over each element in selector, taken from our main function and moved into each method for flexibility
            return this.each(function () {

                // Create a jQuery object to use with this individual element
                var parent = $(this);

                // Attempt to grab saved settings, if they don't exist we'll get "undefined".
                var settings = $(parent).data('dynPadding');

                // If we could't grab settings, create them from defaults and passed options
                if (typeof (settings) == 'undefined') {

                    var defaults = {
                        targets: '#nav a',
                        remainder: null,
                        vertical: false,
                        paddingBoundary: 34
                    };

                    settings = $.extend(defaults, opts);

                    // Save our newly created settings
                    $(parent).data('dynPadding', settings);

                } else {

                    // We got settings, merge our passed options in with them (optional)
                    settings = $.extend({}, settings, opts);

                    // If you wish to save options passed each time, add:
                    // $(parent).data('dynPadding', settings);

                }

                var parent_size = 0,
                    link_size   = 0,
                    unpadded    = 0,
                    link_count  = $(opts.targets).length;

                if (opts.vertical) {
                    parent_size = parent.height();
                } else {
                    parent_size = parent.width();
                }

                $(parent).addClass('dynPadding_parent');

                // find unpadded size of links and reset link size to whole numbers
                if (opts.vertical) {

                    $(opts.targets).each(function () {
                        // unpad element
                        $(this).css({ 'padding-top': '0', 'padding-bottom': '0' });

                        // measure element size with borders
                        unpadded += $(this).outerHeight();

                        // set element size to erase decimal sizing
                        link_size = $(this).height();
                        $(this).css({ height: link_size + 'px' });
                    });

                } else {

                    $(opts.targets).each(function () {
                        $(this).css({ 'padding-left': '0', 'padding-right': '0' });
                        unpadded += $(this).outerWidth(true);
                        link_size = $(this).width() + 1;
                        $(this).css({ width: link_size + 'px' });
                    });

                }

                // find raw padding and convert to whole number padding
                var raw_padding = (parent_size - unpadded) / link_count,
                    padding     = Math.floor(raw_padding);

                // DEFAULT UPPER PADDING BOUNDARY: set an upper bound on the amount of padding
                if (padding >= opts.paddingBoundary) { padding = parseInt(opts.paddingBoundary - 2); }

                // if we have remainder enabled...
                if (opts.remainder != null) {
                    
                    // calculate remainder from decimal padding
                    remainder = Math.round((raw_padding - padding) * link_count);

                    // DEFAULT UPPER REMAINDER BOUNDARY: set an upper bound on the amount of padding
                    if (remainder >= Math.floor(opts.paddingBoundary / 2)) { remainder = (Math.floor(opts.paddingBoundary / 2) - 1); }

                    if (opts.vertical) {
                        // apply padding to links (if padding is a decimal apply floor to left and ceil to right)
                        $(opts.targets).css({
                            'padding-top': Math.floor(padding / 2), 'padding-bottom': Math.floor(padding / 2)
                        });
                        // apply remainder
                        $(opts.remainder).css({
                            'padding-top': Math.floor(remainder / 2) + Math.floor(padding / 2), 'padding-bottom': Math.floor(remainder / 2) + Math.floor(padding / 2)
                        });
                    } else {
                        $(opts.targets).css({
                            'padding-left': Math.floor(padding / 2), 'padding-right': Math.floor(padding / 2)
                        });
                        $(opts.remainder).css({
                            'padding-left': Math.floor(remainder / 2) + Math.floor(padding / 2), 'padding-right': Math.floor(remainder / 2) + Math.floor(padding / 2)
                        });
                    }

                } else {
                    
                    if (opts.vertical) {
                        // apply padding to links (if padding is a decimal apply floor to left and ceil to right)
                        $(opts.targets).css({
                            'padding-top': Math.floor(padding / 2), 'padding-bottom': Math.floor(padding / 2)
                        });
                    } else {
                        $(opts.targets).css({
                            'padding-left': Math.floor(padding / 2), 'padding-right': Math.floor(padding / 2)
                        });
                    }

                }

            });

        },
        destroy: function (opts) {

            // Repeat over each element in selector
            return this.each(function () {

                // find unpadded size of links and reset link size to whole numbers
                if (opts.vertical) {

                    $(opts.targets).each(function () {
                        // remove dynamic element padding
                        $(this).css({ 'padding-top': '', 'padding-bottom': '', width: '' });
                    });

                } else {

                    $(opts.targets).each(function () {
                        // remove dynamic element padding
                        $(this).css({ 'padding-left': '', 'padding-right': '', width: '' });
                    });

                }
                
                $(parent).removeClass('dynPadding_parent').removeData('dynPadding');

            });

        }
    };
	
	$.fn.dynPadding = function() {

	    var method = arguments[0];

	    if (methods[method]) {

	        method = methods[method];

	        // Our method was sent as an argument, remove it using slice because it's not an argument for our method
	        arguments = Array.prototype.slice.call(arguments, 1);

	    } else if (typeof (method) == 'object' || !method) {

	        method = methods.init;

	    } else {

	        $.error('Method ' + method + ' does not exist on jQuery.pluginName');
	        return this;

	    }

	    // Use apply to sent arguments when calling our selected method
	    return method.apply(this, arguments);
			
	}; 
    /* END Dynamic Padding function */
	
})(jQuery);