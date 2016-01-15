function lg( params ){
	console.log( params );
}

function mythemes_hex2rgb( hex )
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
    var colors = result ? {
        r: parseInt( result[1], 16 ),
        g: parseInt( result[2], 16 ),
        b: parseInt( result[3], 16 )
    } : null;

    var rett = '';

    if( colors.hasOwnProperty( 'r' ) ){
    	rett += colors.r + ' , ';
    }
    else{
    	rett += '255 , ';
    }

    if( colors.hasOwnProperty( 'g' ) ){
    	rett += colors.g + ' , ';
    }
    else{
    	rett += '255 , ';
    }

    if( colors.hasOwnProperty( 'b' ) ){
    	rett += colors.b;
    }
    else{
    	rett += '255';	
    }

    return rett;
}

function mythemes_brightness( hex, steps )
{
    var steps 	= Math.max( -255, Math.min( 255, steps ) );
    var hex 	= hex.toString().replace( /#/g, "" );

    if ( hex.length == 3 ) {
        hex = 
        hex.substring( 0, 1 ) + hex.substring( 0, 1 ) +
        hex.substring( 1, 2 ) + hex.substring( 1, 2 ) +
        hex.substring( 2, 3 ) + hex.substring( 2, 3 );
    }

    var r = parseInt( hex.substring( 0, 2 ).toString() , 16 );
    var g = parseInt( hex.substring( 2, 4 ).toString() , 16 );
    var b = parseInt( hex.substring( 4, 6 ).toString() , 16 );

    r = Math.max( 0, Math.min( 255, r + steps ) ).toString(16).toUpperCase();
    g = Math.max( 0, Math.min( 255, g + steps ) ).toString(16).toUpperCase();  
    b = Math.max( 0, Math.min( 255, b + steps ) ).toString(16).toUpperCase();

	var r_hex = Array( 3 - r.length ).join( '0' ) + r;
	var g_hex = Array( 3 - g.length ).join( '0' ) + g;
	var b_hex = Array( 3 - b.length ).join( '0' ) + b;

    return '#' + r_hex + g_hex + b_hex;
}

function mythemes_load_sidebar( sidebar, position ){
    jQuery(function(){

        if( typeof mythemes_js_ajaxurl == 'string' && mythemes_js_ajaxurl.length ){

            if( jQuery( 'div.content > div.container > div.row > aside' ).length ){
                jQuery( 'div.content > div.container > div.row > aside' ).remove();
            }

            if( jQuery( 'div.content > div.container > div.row > section' ).hasClass( 'col-lg-12' ) ){
                jQuery( 'div.content > div.container > div.row > section' ).removeClass( 'col-lg-12' );
                jQuery( 'div.content > div.container > div.row > section' ).addClass( 'col-sm-8 col-md-9 col-lg-9' );
            }

            if( position == 'left' ){
                jQuery( 'div.content > div.container > div.row' ).prepend( '<aside class="col-sm-4 col-md-3 col-lg-3 mythemes-sidebar sidebar-to-' + position + '"></aside>' );
            }
            else{
                jQuery( 'div.content > div.container > div.row' ).append( '<aside class="col-sm-4 col-md-3 col-lg-3 mythemes-sidebar sidebar-to-' + position + '"></aside>' );
            }

            jQuery.post( mythemes_js_ajaxurl, 
                {
                    'action' : 'mythemes_layout_load_sidebar',
                    'sidebar': sidebar
                },
                function( result ){
                    jQuery( 'div.content > div.container > div.row > aside' ).html( result );
                }
            );
        }
    });
} 

(function($){

    wp.customize( 'blogname' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                jQuery( 'div.mythemes-header-antet a.mythemes-blog-title' ).html( newval );
            }
        });
    });

    wp.customize( 'description' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                jQuery( 'div.mythemes-header-antet a.mythemes-blog-description' ).html( newval );
            }
        });
    });

    wp.customize( 'mythemes-logo' , function( value ){
        value.bind(function( newval ){

        	if( newval.length ){
        		if( jQuery( 'div.mythemes-header-antet a.mythemes-logo' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-header-antet a.mythemes-logo' ).removeClass( 'hidden' );
        		}

        		if( jQuery( 'div.mythemes-header-antet a.mythemes-logo img' ).length ){
        			jQuery( 'div.mythemes-header-antet a.mythemes-logo img' ).attr( 'src' , newval );	
        		}
        		else{
        			jQuery( '<img src="' + newval + '"/>' ).appendTo( 'div.mythemes-header-antet a.mythemes-logo' );
        		}

                if( !jQuery( 'div.mythemes-header-antet a.mythemes-blog-title' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.mythemes-header-antet a.mythemes-blog-title' ).addClass( 'hidden' );    
                }

                if( !jQuery( 'div.mythemes-header-antet a.mythemes-blog-description' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.mythemes-header-antet a.mythemes-blog-description' ).addClass( 'hidden' );
                }
        		
        	}
        	else{
				if( !jQuery( 'div.mythemes-header-antet a.mythemes-logo' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-header-antet a.mythemes-logo' ).addClass( 'hidden' );
        		}

                if( jQuery( 'div.mythemes-header-antet a.mythemes-blog-title' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.mythemes-header-antet a.mythemes-blog-title' ).removeClass( 'hidden' );    
                }

                if( jQuery( 'div.mythemes-header-antet a.mythemes-blog-description' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.mythemes-header-antet a.mythemes-blog-description' ).removeClass( 'hidden' );
                }
        	}
        });
    });


    /* HEADER */
    /* GENERAL */
    wp.customize( 'mythemes-header-front-page' , function( value ){
        value.bind(function( newval ){
            if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'on-front-page' ) ){
                if( newval ){
                    if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).removeClass( 'hidden' );
                    }
                }
                else{
                    if( !jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).addClass( 'hidden' );
                    }   
                }
            }
        });
    });

    wp.customize( 'mythemes-header-blog-page' , function( value ){
        value.bind(function( newval ){
            if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'on-blog-page' ) ){
                if( newval ){
                    if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).removeClass( 'hidden' );
                    }
                }
                else{
                    if( !jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).addClass( 'hidden' );
                    }   
                }
            }
        });
    });

    wp.customize( 'mythemes-header-templates' , function( value ){
        value.bind(function( newval ){
            if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'on-templates' ) ){
                if( newval ){
                    if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).removeClass( 'hidden' );
                    }
                }
                else{
                    if( !jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).addClass( 'hidden' );
                    }   
                }
            }
        });
    });

    wp.customize( 'mythemes-header-single-posts' , function( value ){
        value.bind(function( newval ){
            if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'on-single-posts' ) ){
                if( newval ){
                    if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).removeClass( 'hidden' );
                    }
                }
                else{
                    if( !jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).addClass( 'hidden' );
                    }   
                }
            }
        });
    });

    wp.customize( 'mythemes-header-single-pages' , function( value ){
        value.bind(function( newval ){
            if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'on-single-pages' ) ){
                if( newval ){
                    if( jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).removeClass( 'hidden' );
                    }
                }
                else{
                    if( !jQuery( 'div.mythemes-header.mythemes-bkg-image' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-header.mythemes-bkg-image' ).addClass( 'hidden' );
                    }   
                }
            }
        });
    });

    wp.customize( 'mythemes-header-height' , function( value ){
        value.bind(function( newval ){
            jQuery( 'div.mythemes-header.parallax-container' ).css( 'height' , parseInt( newval ).toString() + 'px' );
        });
    });

    wp.customize( 'mythemes-header-background-color' , function( value ){
        value.bind(function( newval ){
            jQuery( 'body' ).css( 'background-color' , newval );
            jQuery( 'body' ).css( 'backgroundColor' , newval );
        });
    });

    wp.customize( 'mythemes-header-mask-color' , function( value ){
        value.bind(function( newval ){
            var opacity = parseFloat( wp.customize.instance( 'mythemes-header-mask-opacity' ).get() / 100 ).toString();
            jQuery( 'div.mythemes-header div.valign-cell-wrapper' ).css( 'background-color' , 'rgba(' + mythemes_hex2rgb( newval ) + ' , ' + opacity + ')' );
        });
    });

    wp.customize( 'mythemes-header-mask-opacity' , function( value ){
        value.bind(function( newval ){
            var opacity = parseFloat( newval / 100 ).toString();
            var color   = wp.customize.instance( 'mythemes-header-mask-color' ).get().toString();
            jQuery( 'div.mythemes-header div.valign-cell-wrapper' ).css( 'background-color' , 'rgba(' + mythemes_hex2rgb( color ) + ' , ' + opacity + ')' );
        });
    });

    /* CONTENT */
    wp.customize( 'mythemes-header-title-label' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                jQuery( '.mythemes-header a.header-title' ).html( newval );
            }
        });
    });

    wp.customize( 'mythemes-header-title-color' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                jQuery( 'style#mythemes-header-title-color').html(
                    'div.mythemes-header a.header-title{' +
                    'color: ' + newval + ';' +
                    '}'
                );
            }
        });
    });

    wp.customize( 'mythemes-header-description-color' , function( value ){
        value.bind(function( newval ){
            if( newval ){

                var hex    = newval;
                var rgba1  = 'rgba( ' + mythemes_hex2rgb( hex ) + ', 0.75 )';
                var rgba2  = 'rgba( ' + mythemes_hex2rgb( hex ) + ', 1.0 )';

                jQuery( 'style#mythemes-header-description-color').html(
                    'div.mythemes-header a.header-description{' +
                    'color: ' + rgba1 + ';' +
                    '}' +

                    'div.mythemes-header a.header-description:hover{' +
                    'color: ' + rgba2 + ';' +
                    '}'
                );
            }
        });
    });

    wp.customize( 'mythemes-header-title' , function( value ){
        value.bind(function( newval ){
        	if( newval ){
        		if( jQuery( '.mythemes-header a.header-title' ).hasClass( 'hidden' ) ){
        			jQuery( '.mythemes-header a.header-title' ).removeClass( 'hidden' );
        		}
        	}
        	else{
        		if( !jQuery( '.mythemes-header a.header-title' ).hasClass( 'hidden' ) ){
        			jQuery( '.mythemes-header a.header-title' ).addClass( 'hidden' );
        		}	
        	}
        });
    });

    wp.customize( 'mythemes-header-description-label' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                jQuery( '.mythemes-header a.header-description' ).html( newval );
            }
        });
    });

    wp.customize( 'mythemes-header-description' , function( value ){
        value.bind(function( newval ){
        	if( newval ){
        		if( jQuery( '.mythemes-header a.header-description' ).hasClass( 'hidden' ) ){
        			jQuery( '.mythemes-header a.header-description' ).removeClass( 'hidden' );
        		}
        	}
        	else{
        		if( !jQuery( '.mythemes-header a.header-description' ).hasClass( 'hidden' ) ){
        			jQuery( '.mythemes-header a.header-description' ).addClass( 'hidden' );
        		}	
        	}
        });
    });


    /* FIRST BUTTON */
    wp.customize( 'mythemes-first-btn' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                if( jQuery( 'div.header-button-wrapper a.first-btn' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.header-button-wrapper a.first-btn' ).removeClass( 'hidden' );
                }
            }
            else{
                if( !jQuery( 'div.header-button-wrapper a.first-btn' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.header-button-wrapper a.first-btn' ).addClass( 'hidden' );
                }   
            }
        });
    });
    
    wp.customize( 'mythemes-first-btn-url' , function( value ){
        value.bind(function( newval ){
            jQuery( '.header-button-wrapper a.first-btn' ).attr( 'href' , newval );
        });
    });
    
    wp.customize( 'mythemes-first-btn-label' , function( value ){
        value.bind(function( newval ){
            jQuery( '.header-button-wrapper a.first-btn' ).html( newval );
        });
    });
    
    wp.customize( 'mythemes-first-btn-description' , function( value ){
        value.bind(function( newval ){
            jQuery( '.header-button-wrapper a.first-btn' ).attr( 'title' , newval );
        });
    });

    //-  BACKGROUND COLOR -//
    wp.customize( 'mythemes-first-btn-bkg-color' , function( value ){
        value.bind(function( newval ){
            var hover = wp.customize.instance( 'mythemes-first-btn-bkg-h-color' ).get().toString();
            jQuery( 'style#mythemes-first-btn-bkg-color' ).html(
                '.header-button-wrapper a.btn.first-btn.header-button{' +
                'background-color: ' + newval + ';' +
                '}' +

                '.header-button-wrapper a.btn.first-btn.header-button:hover{' +
                'background-color: ' + hover + ';' +
                '}'
            );
        });
    });

    wp.customize( 'mythemes-first-btn-bkg-h-color' , function( value ){
        value.bind(function( newval ){
            var color = wp.customize.instance( 'mythemes-first-btn-bkg-color' ).get().toString();
            jQuery( 'style#mythemes-first-btn-bkg-color' ).html(
                '.header-button-wrapper a.btn.first-btn.header-button{' +
                'background-color: ' + color + ';' +
                '}' +

                '.header-button-wrapper a.btn.first-btn.header-button:hover{' +
                'background-color: ' + newval + ';' +
                '}'
            );
        });
    });

    /* SECOND BUTTON */
    wp.customize( 'mythemes-second-btn' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                if( jQuery( 'div.header-button-wrapper a.second-btn' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.header-button-wrapper a.second-btn' ).removeClass( 'hidden' );
                }
            }
            else{
                if( !jQuery( 'div.header-button-wrapper a.second-btn' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.header-button-wrapper a.second-btn' ).addClass( 'hidden' );
                }   
            }
        });
    });
    
    wp.customize( 'mythemes-second-btn-url' , function( value ){
        value.bind(function( newval ){
            jQuery( '.header-button-wrapper a.second-btn' ).attr( 'href' , newval );
        });
    });
    
    wp.customize( 'mythemes-second-btn-label' , function( value ){
        value.bind(function( newval ){
            jQuery( '.header-button-wrapper a.second-btn' ).html( newval );
        });
    });
    
    wp.customize( 'mythemes-second-btn-description' , function( value ){
        value.bind(function( newval ){
            jQuery( '.header-button-wrapper a.second-btn' ).attr( 'title' , newval );
        });
    });


    //- BACKGROUND COLOR -//
    wp.customize( 'mythemes-second-btn-bkg-color' , function( value ){
        value.bind(function( newval ){
            var hover = wp.customize.instance( 'mythemes-second-btn-bkg-h-color' ).get().toString();
            jQuery( 'style#mythemes-second-btn-bkg-color' ).html(
                '.header-button-wrapper a.btn.second-btn.header-button{' +
                'background-color: ' + newval + ';' +
                '}' +

                '.header-button-wrapper a.btn.second-btn.header-button:hover{' +
                'background-color: ' + hover + ';' +
                '}'
            );
        });
    });

    wp.customize( 'mythemes-second-btn-bkg-h-color' , function( value ){
        value.bind(function( newval ){
            var color = wp.customize.instance( 'mythemes-second-btn-bkg-color' ).get().toString();
            jQuery( 'style#mythemes-second-btn-bkg-color' ).html(
                '.header-button-wrapper a.btn.second-btn.header-button{' +
                'background-color: ' + color + ';' +
                '}' +

                '.header-button-wrapper a.btn.second-btn.header-button:hover{' +
                'background-color: ' + newval + ';' +
                '}'
            );
        });
    });


    /* BREADCRUMBS */
	wp.customize( 'mythemes-breadcrumbs' , function( value ){
        value.bind(function( newval ){

        	if( newval ){
        		jQuery( 'div.mythemes-page-header' ).show();
        	}
        	else{
        		jQuery( 'div.mythemes-page-header' ).hide();	
        	}
        });
    });

    wp.customize( 'mythemes-home-label' , function( value ){
        value.bind(function( newval ){
        	jQuery( 'div.mythemes-page-header li#home-label a span' ).html( newval );
        });
    });

    wp.customize( 'mythemes-home-link-description' , function( value ){
        value.bind(function( newval ){
            jQuery( 'div.mythemes-page-header li#home-label a' ).attr( 'title' , newval );
        });
    });

    wp.customize( 'mythemes-breadcrumbs-space' , function( value ){
        value.bind(function( newval ){
        	jQuery( 'div.mythemes-page-header' ).css({ 'padding-top' : newval + 'px' , 'padding-bottom' : newval + 'px' });
        });
    });

    /* ADDITIONAL */
    wp.customize( 'mythemes-blog-title' , function( value ){
        value.bind(function( newval ){
        	jQuery( 'div.mythemes-page-header h1#blog-title' ).html( newval );
        });
    });
    
    wp.customize( 'mythemes-default-content' , function( value ){
        value.bind(function( newval ){
            if( newval ){
                if( jQuery( 'div.mythemes-default-content' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.mythemes-default-content' ).removeClass( 'hidden' );
                }

                /* HEADER WIDGETS */
                if( jQuery( 'div.mythemes-white.mythemes-default-content aside > div' ).find( 'div.mythemes-default-content' ).length ){
                    if( jQuery( 'div.mythemes-white.mythemes-default-content' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-white.mythemes-default-content' ).removeClass( 'hidden' );
                    }
                }

                /* FOOTER WIDGETS */
                if( jQuery( 'footer aside.mythemes-default-content div.container div.row > div' ).find( 'div.mythemes-default-content' ).length ){
                    if( jQuery( 'footer aside.mythemes-default-content' ).hasClass( 'hidden' ) ){
                        jQuery( 'footer aside.mythemes-default-content' ).removeClass( 'hidden' );
                    }
                }
            }
            else{
                if( !jQuery( 'div.mythemes-default-content' ).hasClass( 'hidden' ) ){
                    jQuery( 'div.mythemes-default-content' ).addClass( 'hidden' );
                }

                /* HEADER WIDGETS */
                if( !jQuery( 'div.mythemes-white.mythemes-default-content aside > div' ).find( 'div.mythemes-default-content' ).length ){
                    if( jQuery( 'div.mythemes-white.mythemes-default-content' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-white.mythemes-default-content' ).removeClass( 'hidden' );
                    }
                }

                else if( jQuery( 'div.mythemes-white.mythemes-default-content aside > div' ).find( 'div.mythemes-default-content' ).length == 3 ){
                    if( !jQuery( 'div.mythemes-white.mythemes-default-content' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.mythemes-white.mythemes-default-content' ).addClass( 'hidden' );
                    }
                }

                /* FOOTER WIDGETS */
                if( !jQuery( 'footer aside.mythemes-default-content div.container div.row > div' ).find( 'div.mythemes-default-content' ).length ){
                    if( jQuery( 'div.content aside.mythemes-default-content' ).hasClass( 'hidden' ) ){
                        jQuery( 'div.content aside.mythemes-default-content' ).removeClass( 'hidden' );
                    }
                }

                else if( jQuery( 'footer aside.mythemes-default-content div.container div.row > div' ).find( 'div.mythemes-default-content' ).length == 3 ){
                    if( !jQuery( 'footer aside.mythemes-default-content' ).hasClass( 'hidden' ) ){
                        jQuery( 'footer aside.mythemes-default-content' ).addClass( 'hidden' );
                    }
                }
            }
        });
    });

    wp.customize( 'mythemes-top-meta' , function( value ){
        value.bind(function( newval ){

        	if( newval ){
        		jQuery( 'div.mythemes-top-meta' ).show();
        	}
        	else{
        		jQuery( 'div.mythemes-top-meta' ).hide();	
        	}
        });
    });

    wp.customize( 'mythemes-bottom-meta' , function( value ){
        value.bind(function( newval ){

        	if( newval ){
        		jQuery( 'div.post-meta-terms' ).show();
        	}
        	else{
        		jQuery( 'div.post-meta-terms' ).hide();	
        	}
        });
    });

    wp.customize( 'mythemes-html-suggestions' , function( value ){
        value.bind(function( newval ){

        	if( newval ){
        		jQuery( 'div.mythemes-html-suggestions' ).show();
        	}
        	else{
        		jQuery( 'div.mythemes-html-suggestions' ).hide();	
        	}
        });
    });

    /* LAYOUT */
    wp.customize( 'mythemes-layout' , function( value ){
        value.bind(function( newval ){

            if( jQuery( 'div.content > div.container > div.row > section' ).hasClass( 'mythemes-classic' ) ){

                var sidebar = wp.customize.instance( 'mythemes-sidebar' ).get().toString();

                if( newval == 'left' || newval == 'right' ){
                    mythemes_load_sidebar( sidebar, newval );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12 mythemes-classic' );
                }
            }

        });
    });

    /* SIDEBAR */
    wp.customize( 'mythemes-sidebar' , function( value ){
        value.bind(function( newval ){

            if( jQuery( 'div.content > div.container > div.row > section' ).hasClass( 'mythemes-classic' ) ){

                var layout = wp.customize.instance( 'mythemes-layout' ).get().toString();

                if( layout == 'left' || layout == 'right' ){
                    mythemes_load_sidebar( newval, layout );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12' );
                }
            }
        });
    });

    /* FRONT PAGE LAYOUT */
    wp.customize( 'mythemes-front-page-layout' , function( value ){
        value.bind(function( newval ){

            var id = wp.customize.instance( 'mythemes-special-page' ).get().toString();
            
            if( jQuery( 'body' ).hasClass( 'page-id-' + id ) ){
                return;
            }

            if( jQuery( 'body' ).hasClass( 'home' ) && jQuery( 'body' ).hasClass( 'page' ) ){

                var sidebar = wp.customize.instance( 'mythemes-front-page-sidebar' ).get().toString();

                if( newval == 'left' || newval == 'right' ){
                    mythemes_load_sidebar( sidebar, newval );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12 mythemes-classic' );
                }
            }
        });
    });

    /* FRONT PAGE SIDEBAR */
    wp.customize( 'mythemes-front-page-sidebar' , function( value ){
        value.bind(function( newval ){

            var id = wp.customize.instance( 'mythemes-special-page' ).get().toString();
            
            if( jQuery( 'body' ).hasClass( 'page-id-' + id ) ){
                return;
            }

            if( jQuery( 'body' ).hasClass( 'home' ) && jQuery( 'body' ).hasClass( 'page' ) ){

                var layout = wp.customize.instance( 'mythemes-front-page-layout' ).get().toString();

                if( layout == 'left' || layout == 'right' ){
                    mythemes_load_sidebar( newval, layout );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12' );
                }
            }
        });
    });

    /* PAGE LAYOUT */
    wp.customize( 'mythemes-page-layout' , function( value ){
        value.bind(function( newval ){

            var id = wp.customize.instance( 'mythemes-special-page' ).get().toString();

            if( jQuery( 'body' ).hasClass( 'page-id-' + id ) ){
                return;
            }

            if( !jQuery( 'body' ).hasClass( 'home' ) && jQuery( 'body' ).hasClass( 'page' ) ){

                var sidebar = wp.customize.instance( 'mythemes-page-sidebar' ).get().toString();

                if( newval == 'left' || newval == 'right' ){
                    mythemes_load_sidebar( sidebar, newval );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12 mythemes-classic' );
                }
            }
        });
    });

    /* PAGE SIDEBAR */
    wp.customize( 'mythemes-page-sidebar' , function( value ){
        value.bind(function( newval ){

            var id = wp.customize.instance( 'mythemes-special-page' ).get().toString();

            if( jQuery( 'body' ).hasClass( 'page-id-' + id ) ){
                return;
            }

            if( !jQuery( 'body' ).hasClass( 'home' ) && jQuery( 'body' ).hasClass( 'page' ) ){

                var layout = wp.customize.instance( 'mythemes-page-layout' ).get().toString();

                if( layout == 'left' || layout == 'right' ){
                    mythemes_load_sidebar( newval, layout );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12' );
                }
            }
        });
    });

    /* POST LAYOUT */
    wp.customize( 'mythemes-post-layout' , function( value ){
        value.bind(function( newval ){

            if( jQuery( 'body' ).hasClass( 'single' ) ){

                var sidebar = wp.customize.instance( 'mythemes-post-sidebar' ).get().toString();

                if( newval == 'left' || newval == 'right' ){
                    mythemes_load_sidebar( sidebar, newval );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12 mythemes-classic' );
                }
            }
        });
    });

    /* POST SIDEBAR */
    wp.customize( 'mythemes-post-sidebar' , function( value ){
        value.bind(function( newval ){

            if( jQuery( 'body' ).hasClass( 'single' ) ){

                var layout = wp.customize.instance( 'mythemes-post-layout' ).get().toString();

                if( layout == 'left' || layout == 'right' ){
                    mythemes_load_sidebar( newval, layout );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12' );
                }
            }
        });
    });

    /* SPECIAL PAGE */
    wp.customize( 'mythemes-special-page' , function( value ){
        value.bind(function( newval ){

            var id = newval;

            if( id == '0' ){
                return;
            }

            if( !jQuery( 'body' ).hasClass( 'home' ) && jQuery( 'body' ).hasClass( 'page' ) && jQuery( 'body' ).hasClass( 'page-id-' + id ) ){

                var sidebar = wp.customize.instance( 'mythemes-special-page-sidebar' ).get().toString();
                var layout  = wp.customize.instance( 'mythemes-special-page-layout' ).get().toString();

                if( layout == 'left' || layout == 'right' ){
                    mythemes_load_sidebar( sidebar, layout );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12 mythemes-classic' );
                }
            }
        });
    });

    /* SPECIAL PAGE LAYOUT */
    wp.customize( 'mythemes-special-page-layout' , function( value ){
        value.bind(function( newval ){

            var id = wp.customize.instance( 'mythemes-special-page' ).get().toString();

            if( id == '0' ){
                return;
            }

            if( !jQuery( 'body' ).hasClass( 'home' ) && jQuery( 'body' ).hasClass( 'page' ) && jQuery( 'body' ).hasClass( 'page-id-' + id ) ){

                var sidebar = wp.customize.instance( 'mythemes-special-page-sidebar' ).get().toString();

                if( newval == 'left' || newval == 'right' ){
                    mythemes_load_sidebar( sidebar, newval );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12 mythemes-classic' );
                }
            }
        });
    });

    /* SPECIAL PAGE SIDEBAR */
    wp.customize( 'mythemes-special-page-sidebar' , function( value ){
        value.bind(function( newval ){

            var id = wp.customize.instance( 'mythemes-special-page' ).get().toString();

            if( id == '0' ){
                return;
            }

            if( !jQuery( 'body' ).hasClass( 'home' ) && jQuery( 'body' ).hasClass( 'page' ) && jQuery( 'body' ).hasClass( 'page-id-' + id ) ){

                var layout = wp.customize.instance( 'mythemes-special-page-layout' ).get().toString();

                if( layout == 'left' || layout == 'right' ){
                    mythemes_load_sidebar( newval, layout );
                }
                else{
                    jQuery( 'div.content > div.container > div.row aside' ).addClass( 'hidden' );
                    jQuery( 'div.content > div.container > div.row section' ).removeAttr( 'class' );
                    jQuery( 'div.content > div.container > div.row section' ).addClass( 'col-lg-12' );
                }
            }
        });
    });
    

    /* SOCIAL */
    wp.customize( 'mythemes-vimeo' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-vimeo' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-vimeo' ).removeClass( 'hidden' );	
        		}
        		
        		jQuery( 'div.mythemes-social a.icon-vimeo' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-vimeo' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-vimeo' ).addClass( 'hidden' );	
        		}
        	}
        });
    });

    wp.customize( 'mythemes-twitter' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-twitter' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-twitter' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-twitter' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-twitter' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-twitter' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-skype' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-skype' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-skype' ).removeClass( 'hidden' );	
        		}
        		
        		jQuery( 'div.mythemes-social a.icon-skype' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-skype' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-skype' ).addClass( 'hidden' );	
        		}
        	}
        });
    });

    wp.customize( 'mythemes-renren' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-renren' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-renren' ).removeClass( 'hidden' );
        		}
        		
        		jQuery( 'div.mythemes-social a.icon-renren' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-renren' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-renren' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-github' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-github' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-github' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-github' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-github' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-github' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-rdio' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-rdio' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-rdio' ).removeClass( 'hidden' );
        		}
        		
        		jQuery( 'div.mythemes-social a.icon-rdio' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-rdio' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-rdio' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-linkedin' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-linkedin' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-linkedin' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-linkedin' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-linkedin' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-linkedin' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-behance' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-behance' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-behance' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-behance' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-behance' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-behance' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-dropbox' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-dropbox' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-dropbox' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-dropbox' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-dropbox' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-dropbox' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-flickr' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-flickr' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-flickr' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-flickr' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-flickr' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-flickr' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-tumblr' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-tumblr' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-tumblr' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-tumblr' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-tumblr' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-tumblr' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-instagram' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-instagram' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-instagram' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-instagram' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-instagram' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-instagram' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-vkontakte' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-vkontakte' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-vkontakte' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-vkontakte' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-vkontakte' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-vkontakte' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-facebook' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-facebook' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-facebook' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-facebook' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-facebook' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-facebook' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-evernote' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-evernote' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-evernote' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-evernote' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-evernote' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-evernote' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-flattr' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-flattr' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-flattr' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-flattr' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-flattr' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-flattr' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-picasa' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-picasa' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-picasa' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-picasa' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-picasa' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-picasa' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-dribbble' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-dribbble' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-dribbble' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-dribbble' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-dribbble' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-dribbble' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-mixi' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-mixi' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-mixi' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-mixi' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-mixi' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-mixi' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-stumbleupon' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-stumbleupon' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-stumbleupon' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-stumbleupon' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-stumbleupon' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-stumbleupon' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-lastfm' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-lastfm' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-lastfm' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-lastfm' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-lastfm' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-lastfm' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-gplus' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-gplus' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-gplus' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-gplus' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-gplus' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-gplus' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-google-circles' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-google-circles' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-google-circles' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-google-circles' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-google-circles' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-google-circles' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-pinterest' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-pinterest' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-pinterest' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-pinterest' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-pinterest' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-pinterest' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-smashing' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-smashing' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-smashing' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-smashing' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-smashing' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-smashing' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-soundcloud' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-soundcloud' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-soundcloud' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-soundcloud' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-soundcloud' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-soundcloud' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    wp.customize( 'mythemes-rss' , function( value ){
        value.bind(function( newval ){
        	if( newval.length ){
        		if( jQuery( 'div.mythemes-social a.icon-rss' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-rss' ).removeClass( 'hidden' );
        		}

        		jQuery( 'div.mythemes-social a.icon-rss' ).attr( 'href' , newval );
        	}
        	else{
        		if( !jQuery( 'div.mythemes-social a.icon-rss' ).hasClass( 'hidden' ) ){
        			jQuery( 'div.mythemes-social a.icon-rss' ).addClass( 'hidden' );
        		}
        	}
        });
    });

    /* OTHERS */
    wp.customize( 'mythemes-custom-css' , function( value ){
        value.bind(function( newval ){
        	jQuery( 'style#mythemes-custom-css' ).html( newval );
        });
    });

    wp.customize( 'mythemes-copyright' , function( value ){
        value.bind(function( newval ){
        	jQuery( 'div.mythemes-copyright span.copyright' ).html( newval );
        });
    });

    /* COLORS */
    wp.customize( 'background_color' , function( value ){
        value.bind(function( newval ){

            var bg_color        = newval;
            var bg_color_rgba   = 'rgba( ' + mythemes_hex2rgb( newval ) + ' , 0.91 )';
            jQuery( 'style#mythemes-custom-style-background' ).html(

                /* BACKGROUND COLOR */
                'body > div.content{' +
                'background-color: ' + bg_color + ';' +
                '}' +

                /* MENU NAVIGATION */
                /* BACKGROUND COLOR */
                'body.scroll-nav .mythemes-poor{' +
                'background-color: ' + bg_color_rgba + ';' +
                '}' +

                '.mythemes-poor{' +
                'background-color: ' + bg_color + ';' +
                '}'
            );
        });
    });

    /* BACKGROUND IMAGE */
    wp.customize( 'background_image' , function( value ){
        value.bind(function( newval ){
            console.log( newval );
            jQuery( 'body > div.content' ).css( 'background-image' , 'url(' + newval + ')' );
        });
    });

    wp.customize( 'background_repeat' , function( value ){
        value.bind(function( newval ){
            console.log( newval );
            jQuery( 'body > div.content' ).css( 'background-repeat' , newval );
        });
    });

    wp.customize( 'background_position_x' , function( value ){
        value.bind(function( newval ){
            console.log( newval );
            jQuery( 'body > div.content' ).css( 'background-position' , newval );
        });
    });

    wp.customize( 'background_attachment' , function( value ){
        value.bind(function( newval ){
            console.log( newval );
            jQuery( 'body > div.content' ).css( 'background-attachment' , newval );
        });
    });

})(jQuery);