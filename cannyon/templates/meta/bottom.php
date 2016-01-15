<?php
	global $wp_customize;

    if( isset( $wp_customize ) ) {
        $bottom_meta = true;
        $classes = !(bool)get_theme_mod( 'mythemes-bottom-meta' , true ) ? 'hidden' : '';
    }
    else{
        $bottom_meta = (bool)get_theme_mod( 'mythemes-bottom-meta' , true );
        $classes = '';
    }

    if( $bottom_meta ){

	    if( has_tag() ){
?>
	        <div class="post-meta-terms <?php echo esc_attr( $classes ); ?>">
	            <div class="post-meta-tags">
	                <span class="btn"><i class="icon-tags"></i></span>
	                <?php the_tags( '' , '' , '' ); ?>
	                <div class="clear clearfix"></div>
	            </div>
	        </div>
<?php
	    }
	}
?>