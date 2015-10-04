        <footer>
            <?php
                global $wp_customize;

                $are_active_sidebras =  is_active_sidebar( 'footer-first' ) ||
                                        is_active_sidebar( 'footer-second' ) ||
                                        is_active_sidebar( 'footer-third' ) ||
                                        is_active_sidebar( 'footer-fourth' );

                $items_class = '';

                /* WP CUSTOMIZE */
                if( isset( $wp_customize ) ){
                    $items = true;
                    $items_class = !($are_active_sidebras || (bool)get_theme_mod( 'mythemes-default-content', true ) ) ? 'hidden' : '';
                }

                /* FRONTEND */
                else{
                    $items = $are_active_sidebras || (bool)get_theme_mod( 'mythemes-default-content', true );
                }
                
                if( $items ){
            ?>
                    <aside class="mythemes-default-content <?php echo esc_attr( $items_class ); ?>">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                                    <?php get_sidebar( 'footer-first' ); ?>
                                </div>
                                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                                    <?php get_sidebar( 'footer-second' ); ?>
                                </div>
                                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                                    <?php get_sidebar( 'footer-third' ); ?>
                                </div>
                                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                                    <?php get_sidebar( 'footer-fourth' ); ?>
                                </div>
                            </div>
                        </div>
                    </aside>
            <?php
                }
            ?>

            <div class="mythemes-dark-mask">
                <div class="mythemes-copyright">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <p>
                                    <span class="copyright"><?php echo mythemes_validate_copyright( get_theme_mod( 'mythemes-copyright' , sprintf( __( 'Copyright &copy; %s %s. Powered by %s.' , 'cannyon' ) , date( 'Y' ) , esc_html( get_bloginfo( 'name' ) ) , '<a href="http://wordpress.org/">WordPress</a>' ) ) ); ?></span>
                                    <span><?php echo mythemes_options::get( 'author-link' ); ?></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>

        <?php wp_footer(); ?>

    </body>
</html>