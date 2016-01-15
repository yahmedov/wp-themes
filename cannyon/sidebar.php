<?php
	global $wp_customize;

	$default_class = '';

	/* WP CUSTOMIZE */
	if( isset( $wp_customize ) ){
		$default = true;
		$default_class = !(bool)get_theme_mod( 'default-content', true ) ? 'hidden' : '';
	}

	/* FRONTEND */
	else{
		$default = (bool)get_theme_mod( 'default-content', true );
	}

	/* SIDEBAR */
    if ( dynamic_sidebar( 'main' ) ){
        /* IF NOT EMPTY */    
    }

    else if( $default ){
        /* SEARCH */
        echo '<div class="widget widget_search mythemes-default-content ' . esc_attr( $default_class ) . '">';
        get_template_part( 'searchform' );
        echo '</div>';

        /* TAGS */
        $tags = get_tags();

        if( !empty( $tags ) ){

            echo '<div class="widget widget_tag_cloud mythemes-default-content ' . esc_attr( $default_class ) . '">';
            echo '<h4 class="widget-title">' . __( 'Tags' , 'cannyon' ) . '</h4>';
            echo '<div class="tagcloud">';

            foreach( $tags as $t => $tag ){
                $tag_url = get_tag_link( $tag -> term_id );

                if( is_wp_error( $tag_url ) ){
                    continue;
                }

                echo '<a href="' . esc_url( $tag_url ) . '" title="' . absint( $tag -> count ) . '">';
                echo esc_html( $tag -> name );
                echo '</a>';
            }

            echo '</div>';
            echo '</div>';
        }

        /* CATEGORIES */
        $categories = get_categories( );

        if( !empty( $categories ) ){

            echo '<div class="widget widget_categories mythemes-default-content ' . esc_attr( $default_class ) . '">';
            echo '<h4 class="widget-title">' . __( 'Categories' , 'cannyon' ) . '</h4>';
            echo '<ul>';

            foreach( $categories as $c ){
            	$cat_url = get_category_link( $c -> term_id );

            	if( is_wp_error( $cat_url ) ){
                    continue;
                }

                echo '<li class="cat-item cat-item-' . absint( $c -> term_id ) . '">';
                echo '<a href="' . $cat_url . '" title="' . sprintf( __( 'View all posts filed under - %s' , 'cannyon' ) , esc_attr( $c -> name ) ) . '">' . esc_html( $c -> name ) . '</a>';
                echo '</li>';
            }
            
            echo '</ul>';
            echo '</div>';
        }
    }
?>