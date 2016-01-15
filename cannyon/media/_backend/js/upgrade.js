jQuery(document).ready(function(){
	if( typeof mythemes_premium_url == 'string' && mythemes_premium_url.length ){
	    if( jQuery( 'div#customize-theme-controls li#accordion-section-themes' ).length ){
	        jQuery( 'div#customize-theme-controls li#accordion-section-themes' ).append(
	            '<a href="' + mythemes_premium_url + '" target="_blank" class="mythemes-button mythemes-submit-options"><i class="icon-publish"></i>Upgrade to Premium</a>'
	        );
	    }
	}
});