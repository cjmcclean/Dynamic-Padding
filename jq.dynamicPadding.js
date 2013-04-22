/**
 * Dynamic Padding
 * @ver: 1.2
 * @author: Chris McClean
 * 
 * Copyright 2013, Chris McClean
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.gnu.org/licenses/gpl.html  |  http://opensource.org/licenses/mit-license.php
 * 
 * Credits: Original script written by Les James @ http://www.lesjames.com
 **/
(function($) {
	
	$.fn.dynPadding = function(opts) {
		
		var defaults = {
			targets: '#nav a',
			remainder: '',
			vertical: false
		};
		var opts = $.extend(defaults, opts);
		
		return this.each(function() {
			
			var parent = $(this);
			var link_size = 0;
			var unpadded = 0;
			
			if (opts.vertical) {
				var parent_size = parent.height();
			} else {
				var parent_size = parent.width();
			}
			
			var link_count = $(opts.targets).length;
			
			// find unpadded size of links and reset link size to whole numbers
			if (opts.vertical) {
				$(opts.targets).each(function() {
					// unpad element
					$(this).css({ 'padding-top': '0', 'padding-bottom': '0' });
					
					// measure element size with borders
					unpadded += $(this).outerHeight();
					
					// set element size to erase decimal sizing
					link_size = $(this).height();
					$(this).css({ height: link_size + 'px' });
				});
			} else {
				$(opts.targets).each(function() {
					$(this).css({ 'padding-left': '0', 'padding-right': '0' });
					unpadded += $(this).outerWidth(true);
					
					if ( $.browser.mozilla ) { 
						link_size = $(this).width()+ 1;
						$(this).css({ width: link_size + 'px' });
					} else {
						link_size = $(this).width();
						$(this).css({ width: link_size + 'px' });
					}
				});
			}
			
			// find raw padding and convert to whole number padding
			var raw_padding = (parent_size - unpadded)/link_count;
			var padding = Math.floor(raw_padding);
			
			if (padding >= 34) { padding = 32; }
		
			if (opts.remainder.length > 0) {
				// calculate remainder from decimal padding
				remainder = Math.round((raw_padding - padding) * link_count);
				
				if (remainder >= 17) { remainder = 16; }
				
				if (opts.vertical) {
					// apply padding to links (if padding is a decimal apply floor to left and ceil to right)
					$(opts.targets).css({ 'padding-top': Math.floor(padding/2), 'padding-bottom': Math.floor(padding/2) });
					// apply remainder
					$(opts.remainder).css({ 'padding-top': Math.floor(remainder/2) + Math.floor(padding/2), 'padding-bottom': Math.floor(remainder/2) + Math.floor(padding/2) });
				} else {
					$(opts.targets).css({ 'padding-left': Math.floor(padding/2), 'padding-right': Math.floor(padding/2) });
					$(opts.remainder).css({ 'padding-left': Math.floor(remainder/2) + Math.floor(padding/2), 'padding-right': Math.floor(remainder/2) + Math.floor(padding/2) });
				}
			} else {  
				if (opts.vertical) {
					// apply padding to links (if padding is a decimal apply floor to left and ceil to right)
					$(opts.targets).css({ 'padding-top': Math.floor(padding/2), 'padding-bottom': Math.floor(padding/2) });
				} else {
					$(opts.targets).css({ 'padding-left': Math.floor(padding/2), 'padding-right': Math.floor(padding/2) });
				}
			}			
					
		});
			
	}; /* END Dynamic Padding function */
	
})(jQuery);