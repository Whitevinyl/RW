<?php
/**
 * The Header template for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title>Piano Portraits</title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php // Loads HTML5 JavaScript file to add support for HTML5 elements in older IE versions. ?>
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->

    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/promise.min.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/tween.min.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/Tone.min.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/tombola.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/colorflex.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/perlin-simplex.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/lib/StartAudioContext.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.24/webfontloader.js"></script>

    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_UTILS.js"></script>

    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_PAINTER.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_STROKES.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_METERBRUSH.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_SPLAT.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_MAIN.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_METRICS.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_AUDIO.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_INTERACTION.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_DRAW.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_TWEENS.js"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/_FONTS.js"></script>

    <link href="<?php echo get_template_directory_uri(); ?>/webfonts/stylesheet.css" rel="stylesheet" type="text/css" >
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400" rel="stylesheet">


<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> onload="init()" onresize="metrics()">

<div>

