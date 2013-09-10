/* Author: Chris McClean */

// call parent, and create settings array
var navObj = $('#nav'),
    options = {
        targets: '#nav a',                  // the elements you want dynamically padded
        remainder: '#nav .remainder',       // element for overflow padding to run off into
        vertical: false,                    // if you want to dynamically pad a vertical list,
        paddingBoundary: 34                 // set an upper bound on the padding that is applied per element
    };

if ($(window).width() >= 768) {
    // Call to dynamicPadding function
    $(navObj).dynPadding('init', options);
}

$(window).resize(function () {
    var windowWidth = $(window).width();

    // if our window width is below 767px remove dynPadding functionality
    if (windowWidth < 767) {
        // Call to remove dynamicPadding function
        $(navObj).dynPadding('destroy', options);
    }
    // if our width is above or equal to 768px AND padding hasn't already been applied
    else if (windowWidth >= 768 && $(navObj).has('.dynPadding_parent') != true) {
        // Call to dynamicPadding function
        $(navObj).dynPadding('init', options);
    }
});



// usage: log('inside coolFunc',this,arguments);  |  paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
	log.history = log.history || [];        // store logs to an array for reference
	log.history.push(arguments);
 	if (this.console) {
    		console.log( Array.prototype.slice.call(arguments) );
  	}
};



// catch all document.write() calls
(function(doc) {
  	var write = doc.write;
  	doc.write = function(q) { 
    		log('document.write(): ',arguments); 
    		if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
 	};
})(document);



















