/* Author: Chris McClean */


// Call to dynamicPadding function
$('#nav').dynPadding({
	targets: '#nav a', // the elements you want dynamically padded
	remainder: '#nav .remainder', // element for overflow padding to run off into
	vertical: false // if you want to dynamically pad a vertical list
});



// usage: log('inside coolFunc',this,arguments);  |  paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
	log.history = log.history || [];   // store logs to an array for reference
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



















