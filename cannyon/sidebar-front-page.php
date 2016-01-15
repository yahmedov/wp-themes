<?php
	global $wp_customize;

	$default_class = '';

	/* WP CUSTOMIZE */
	if( isset( $wp_customize ) ){
		$default = true;
		$default_class = !(bool)get_theme_mod( 'mythemes-default-content', true ) ? 'hidden' : '';
	}

	/* FRONTEND */
	else{
		$default = (bool)get_theme_mod( 'mythemes-default-content', true );
	}

	/* SIDEBAR */
    if ( dynamic_sidebar( 'front-page' ) ){
        /* IF NOT EMPTY */    
    }

    else if( $default ){
    	/* SEARCH */
        echo '<div class="widget widget_search mythemes-default-content ' . esc_attr( $default_class ) . '">';
        get_template_part( 'searchform' );
        echo '</div>';
        
        echo '<div class="widget widget_text mythemes-default-content ' . esc_attr( $default_class ) . '">';
        echo '<h4 class="widget-title">' . __( 'Default Content' , 'cannyon' ) . '</h4>';
        echo '<div class="textwidget">';
        echo '<p>' . __( 'You can hide all default content from sidebars if you go to Admin Dashboard &rsaquo; Appearance &rsaquo; Customize &rsaquo; Additional and disable option "Display default content".' , 'cannyon' ) . '</p>';
        echo '</div>';
        echo '</div>';
    }
?>