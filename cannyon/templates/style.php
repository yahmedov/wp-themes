<?php
    $bg_color       = esc_attr( '#' . get_background_color() );
    $hd_bkg_color   = esc_attr( get_theme_mod( 'header-background-color', '#343b43' ) );
    $bkg            = esc_url( get_theme_mod( 'background_image' ) );
?>

<style type="text/css">

    /* HEADER */
    body{
        background-color: <?php echo esc_attr( $hd_bkg_color ); ?>;
    }

    /* BACKGROUND IMAGE */
    body > div.content{

    <?php
        if( !empty( $bkg ) ){
    ?>
            background-image: url(<?php echo $bkg; ?>);
            background-repeat: <?php echo esc_attr( get_theme_mod( 'background_repeat' , 'repeat' ) ); ?>;
            background-position: <?php echo esc_attr( get_theme_mod( 'background_position_x' , 'center' ) ); ?>;
            background-attachment: <?php echo esc_attr( get_theme_mod( 'background_attachment' , 'scroll' ) ); ?>;
    <?php
        }
    ?>
    }

    /* BREADCRUMBS */
    div.mythemes-page-header{
        padding-top: <?php echo absint( get_theme_mod( 'mythemes-breadcrumbs-space', 60 ) ); ?>px;
        padding-bottom: <?php echo absint( get_theme_mod( 'mythemes-breadcrumbs-space', 60 ) ); ?>px;
    }

</style>

<style type="text/css" id="mythemes-custom-style-background">

    /* BACKGROUND COLOR */
    body > div.content{
        background-color: <?php echo $bg_color; ?>;
    }

</style>

<?php 
    /* HEADER ELEMENTS */
    /* CONTENT TITLE / DESCRIPTION */
?>

<style type="text/css" id="mythemes-header-title-color" media="all">
    div.mythemes-header a.header-title{
        color: <?php echo esc_attr( get_theme_mod( 'mythemes-header-title-color', '#ffffff' ) ); ?>;
    }
</style>

<style type="text/css" id="mythemes-header-description-color" media="all">
    <?php
        $hex    = esc_attr( get_theme_mod( 'mythemes-header-description-color', '#ffffff' ) );
        $rgba1  = 'rgba( ' . mythemes_tools::hex2rgb( $hex ) . ', 0.75 )';
        $rgba2  = 'rgba( ' . mythemes_tools::hex2rgb( $hex ) . ', 1.0 )';
    ?>
    div.mythemes-header a.header-description{
        color: <?php echo esc_attr( $rgba1 ); ?>;
    }
    div.mythemes-header a.header-description:hover{
        color: <?php echo esc_attr( $rgba2 ); ?>;
    }
</style>

<?php
    /* BUTTONS */
    /* FIRST BUTTON */
?>
<style type="text/css" id="mythemes-first-btn-bkg-color" media="all">
    .header-button-wrapper a.btn.first-btn.header-button{
        background-color: <?php echo esc_attr( get_theme_mod( 'mythemes-first-btn-bkg-color', '#26ad60' ) ); ?>;
    }

    .header-button-wrapper a.btn.first-btn.header-button:hover{
        background-color: <?php echo esc_attr( get_theme_mod( 'mythemes-first-btn-bkg-h-color', '#00aeef' ) ); ?>;
    }
</style>

<?php /* SECOND BUTTON */ ?>
<style type="text/css" id="mythemes-second-btn-bkg-color" media="all">
    .header-button-wrapper a.btn.second-btn.header-button{
        background-color: <?php echo esc_attr( get_theme_mod( 'mythemes-second-btn-bkg-color', '#636363' ) ); ?>;
    }

    .header-button-wrapper a.btn.second-btn.header-button:hover{
        background-color: <?php echo esc_attr( get_theme_mod( 'mythemes-second-btn-bkg-h-color', '#424242' ) ); ?>;
    }
</style>


<style type="text/css" id="mythemes-custom-css">
    <?php
        echo mythemes_validate_css( get_theme_mod( 'mythemes-custom-css' ) );
    ?>
</style>