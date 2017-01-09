<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header(); ?>

    <div id="app" >

        <canvas id="cnvs0" class="unselectable"></canvas>
        <canvas id="cnvs1" class="unselectable"></canvas>

        <div id="card">

            <div id="cardWrap">

                <div id="tt">'Life On Mars'</div>

                <div id="message">
                    Featured on the new album 'Piano Portraits' out 13.01.17
                </div>

                <a class="button"href="https://rickwakeman.lnk.to/ppWa" target="_blank">Order Now</a>

                <a id="specialButton" >Close X</a>

            </div>





        </div>

        <audio id="player" type="audio/mpeg" autoplay="true"></audio>

    </div>

    <div id="legals">
        <div id="copy">&copy; 2017 UNIVERSAL RECORDS</div>
        <div id="links">
            <a href="http://www.umusic.co.uk/terms.html" target="_blank">Website Terms of Use</a>
            <a href="http://www.umusic.co.uk/home/safe.php" target="_blank">Safe Surf Guide</a>
            <a href="http://www.umusic.co.uk/privacy.html" target="_blank">Privacy Policy</a>
            <a href="http://www.umusic.co.uk/cookie-info.html" target="_blank">Cookie Info</a>
        </div>

    </div>

<?php get_footer(); ?>
