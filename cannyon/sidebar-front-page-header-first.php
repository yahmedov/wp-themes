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
    if ( dynamic_sidebar( 'front-page-header-first' ) ){
        /* IF NOT EMPTY */
    }

    else if( $default ){
        echo '<div class="widget widget_text mythemes-default-content ' . esc_attr( $default_class ) . '">';
        echo '<div class="textwidget">';
        echo '<h3>' . __( 'Many Components' , 'cannyon' ) . '</h3>';
        echo '<p>' . __( 'There are a lot of different components that will help you to make a perfect suit for startup project with WordPress theme Cannyon.' , 'cannyon' ) . '</p>';
        echo '</div>';
        echo '</div>';
    }
?>