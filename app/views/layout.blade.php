<!DOCTYPE html>
<html class="no-js skrollr skrollr-desktop" lang="en">
<head>
    <meta name='viewport' content='content="width=device-width, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0' />
    <title>Realty One Group</title>
    <meta name="description" content="Realty One Group">

    

{{ HTML::style('/css/bootstrap.css') }}
{{ HTML::style('/css/landing.css') }}

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>


    {{ HTML::script('/js/js/jquery_004.js') }}
    {{ HTML::script('/js/js/TweenMax.min.js') }}
    {{ HTML::script('/js/js/jquery.js') }}
    {{ HTML::script('/js/js/skrollr.js') }}
    {{ HTML::script('/js/js/jquery_006.js') }}
    {{ HTML::script('/js/js/jquery_002.js') }}
    {{ HTML::script('/js/js/jquery_003.js') }}
    {{ HTML::script('/js/js/jquery_04.js') }}
    {{ HTML::script('/js/js/jquery_009.js') }}
    {{ HTML::script('/js/js/unveil.js') }}
    {{ HTML::script('/js/watch.min.js') }}
    {{ HTML::script('/js/jquery.easing.min.js') }}
    {{ HTML::script('/js/jquery.scrollsnap.js') }}
    {{ HTML::script('/js/jquery.scrollstop.js') }}
    {{ HTML::script('/js/js/jquery.flexisel.js') }}
    {{ HTML::script('/js/js/jquery.bxslider.min.js') }}
    {{ HTML::script('/js/jquery.lazyload.min.js') }}
    {{ HTML::script('/js/jquery.smoothwheel.js') }}
    {{ HTML::script('/js/bootstrap.min.js') }}
    {{ HTML::script('/js/application.js') }}



    @yield('header')


    <!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

</head>
    <body>

        <div id="nav">
            <div id="navContainer">
                <a id="navLogo" href="#Home" class="navBackgroundSize"></a>
                <div id="navLinkSection">
                    <div id="navScrollBackground" class="navBackgroundSize">
                        <div id="navScrollArea">

                            <div id="navScrollMiddle" ></div>

                        </div>
                    </div>
                    <div id="navLinks">
                        <a href="#Home" style="padding-left: 8px;">About</a>
                        <a href="#Culture">Culture</a>
                        <a href="#Growth">Growth</a>
                        <a href="#Success">Success</a>
                        <a href="#Locations">Locations</a>
                        <a href="#LetsTalk">Let's Talk</a>
                    </div>
                </div>
                <div class="options">
                    <ul>
                        <li style="display: none;">Search</li>
                        <li>Menu</li>
                    </ul>
                </div>
                <nav class="vertical menu">
                    <ul>
                        <li><a href="#Home">About</a> </li>
                        <li><a href="#Culture">Culture</a></li>
                        <li><a href="#Growth">Growth</a> </li>
                        <li><a href="#Success">Success</a></li>
                        <li><a href="#Locations">Location</a> </li>
                        <li><a href="#LetsTalk">Let's Talk</a> </li>
                    </ul>
                </nav>
                <div id="navSocialLinks">
                    <div>
                        <a href="javascript:void(0)" data-target="https://www.facebook.com/RealtyONEGroup" target="_blank" class="facebook"></a>
                        <a href="javascript:void(0)" data-target="https://twitter.com/RealtyONEnews" target="_blank" class="twitter"></a>
                        <a href="javascript:void(0)" data-target="https://plus.google.com/+Realtyonegroup/posts" target="_blank" class="gplus"></a>
                        <a href="javascript:void(0)" data-target="http://www.pinterest.com/realtyonegroup/" target="_blank" class="pinit"></a>
                        <a href="javascript:void(0)" data-target="http://blog.realtyonegroup.com/" target="_blank" class="rss"></a>
                        <a href="javascript:void(0)" data-target="http://instagram.com/realtyonegroup" target="_blank" class="histogram"></a>
                    </div>
                    <div id="one_magazine">
                        <a href="javascript:void(0)" data-target="http://cloud.digipage.net/go/one_magazine_issue_4/" target="_blank" style="background: transparent; z-index: -1">ONE MAGAZINE</a>
                    </div>
                </div>
            </div>
        </div>

        @yield('content')

        <footer>
            <div class="footer">
                <ul>
                    <li><a target="_blank"  href="http://realtyonegroup.com">Realty<span>ONE</span>Group.com</a></li>
                    <li><a target="_blank"  href="http://realtyonegroup.tv">Realty<span>ONE</span>Group.TV</a></li>
                    <li><a target="_blank"  href="http://ownaone.com">OwnA<span>ONE</span>.com</a></li>
                    <li><a target="_blank"  href="http://cloud.digipage.net/go/one_magazine_issue_4/"><span>ONE</span> Magazine</a></li>
                </ul>
                <div class="socialmedia">
                    <a target="_blank" href="https://www.facebook.com/RealtyONEGroup" class="facebook"></a>
                    <a target="_blank"  href="https://twitter.com/RealtyONEnews" class="twitter"></a>
                    <a target="_blank"  href="https://plus.google.com/+Realtyonegroup/posts" class="gplus"></a>
                    <a target="_blank"  href="http://www.pinterest.com/realtyonegroup/" class="pinit"></a>
                    <a target="_blank"  href="http://blog.realtyonegroup.com/" class="rss"></a>
                    <a target="_blank"  href="http://instagram.com/realtyonegroup" class="histogram"></a>
                </div>
            </div>
        </footer>
    </body>
</html>