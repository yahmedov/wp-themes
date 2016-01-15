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
    if ( dynamic_sidebar( 'front-page-header-second' ) ){
        /* IF NOT EMPTY */    
    }

    else if( $default ){
        echo '<div class="widget widget_text mythemes-default-content ' . esc_attr( $default_class ) . '">';
        echo '<div class="textwidget">';
        echo '<h3>' . __( 'Block Model' , 'cannyon' ) . '</h3>';
        echo '<p>' . __( 'With Cannyon free WordPress theme you can easily combine components in a variety ways for different design projects. It\'s easy!' , 'cannyon' ) . '</p>';
        echo '</div>';
        echo '</div>';
    }
?>