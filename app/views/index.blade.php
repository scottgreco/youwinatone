@extends('layout')

@section('header')

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
<script>
    var map;
    var baseUrl = 'http://localhost:8000';
    var infowindow;
    var eviction_list = [];
    var offices;

    function initialize() {

        var styles = [];

        $.get('/offices', function(items) {
            offices = items.offices;
            var pairs = items.states;
            var $state = $('#state');
            var $city = $('#city');
            $state.children().remove();
            $state.prepend($('<option value="">Select a State</option>'));
            $.each(pairs, function(state) {

                $state.append($('<option value="' + state.capitalize() + '"> ' + state.capitalize() + '</option>'));

            });

            $state.change(function(e) {

                $city.children().remove();
                $city.prepend($('<option value="">Select a City</option>'));
                var val = $(this).val();
                if (val.length == 0) {
                    $.each(pairs, function(i, c) {
                        $.each(c, function(x, y) {
                            $city.append($('<option value="' + y.capitalize() + '"> ' + x.capitalize() + '</option>'));
                        });
                    
                    });                    

                } else {
                                        
                    $.each(pairs, function(i, c) {
                        if(i.toLowerCase() == val.toLowerCase()){
                            $.each(c, function(x, y) {
                                $city.append($('<option value="' + y.capitalize() + '"> ' + x.capitalize() + '</option>'));
                            });
                        }
                    });                    
                }
            });

            var myLatlng = new google.maps.LatLng(offices[0]["lat"], offices[0]["lng"]);
            var myOptions = {
                zoom: 8,
                center: myLatlng,
                streetViewControl: false,
                mapTypeId: "terrain",
                scrollwheel: false,
                styles: styles,
                panControl: true
            }


            map = new google.maps.Map(document.getElementById("mappy"), myOptions);

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                map.setOptions({ draggable: false });
            }

            var stylez = [{
                featureType: "all",
                elementType: "all",
                stylers: [ { saturation: -100 } ]
            }];

            var mapType = new google.maps.StyledMapType(stylez, { name: "Grayscale" });
            map.mapTypes.set('tehgrayz', mapType);
            map.setMapTypeId('tehgrayz');

            google.maps.event.addListener(map, 'zoom_changed', function() {
                zoomChangeBoundsListener =
                    google.maps.event.addListener(map, 'bounds_changed', function(event) {
                        if (this.getZoom() > 15 && this.initialZoom == true) {
                            // Change max/min zoom here
                            this.setZoom(15);
                            this.initialZoom = false;
                        }
                    google.maps.event.removeListener(zoomChangeBoundsListener);
                });
            });

            setMarkers(map, offices);

            $('div').on('touchstart', '.gmnoprint div[title^=Pan], .gmnoprint div[title^=Obtiene]', function () {
                $(this).trigger('click');
                return false;
            });
        });

        $("#location_form").submit(function(e) {
            e.preventDefault();
            var city = $("#city").val();
            var found_offices = $.grep(offices, function(v) {
                return v.city_id.toLowerCase() === city.toLowerCase();
            });

            setMarkers(map, found_offices);
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    function setMarkers(map, off) {

        $('div').on('touchstart', '.gmnoprint div[title^=Pan]', function() {
            $(this).trigger('click');
            return false;
        });

        var fullBounds = new google.maps.LatLngBounds();
        for (var i = 0; i < off.length; i++) {
            var coor = off[i];

            var myLatLng = new google.maps.LatLng(coor["lat"], coor["lng"]);

            fullBounds.extend(myLatLng);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map
            });
            eviction_list.push(marker);

            bindMarker(marker, map, coor);
        }
        map.initialZoom = true;
        map.fitBounds(fullBounds);
    }

    function bindMarker(marker, map, office) {
        var contentString = '<div>' +
            '<div class="infowindow-img"><img class="office_img" src="' + baseUrl + '/images/building.png' + '" data-original="' + baseUrl + 'images/offices/' + office["image"] + '" alt="" /></div>' +
            '<div class="infowindow-text">' +
            '<span>' + office["name"].toUpperCase() + '<br/>' + office["address"] + '<br/>' + office["phone"] + '<br/><a href="javascript:void(0);" class="view-more">View more</a></span>' +
            '</div>' +
            '</div>';


        google.maps.event.addListener(marker, 'click', function() {

            if (infowindow != null) {
                infowindow.close();
            }


            var w = 400;

            if ($(window).width() < 768) {
                w = 200;
            }

            infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: w
            });

            google.maps.event.addListener(infowindow, 'domready', function() {
                $(".office_img").lazyload({
                    effect: "fadeIn"
                });
                $(".office_img").trigger("appear");

                $(".view-more").on("click", function() {

                    infowindow.close();

                    $('#map-modal').modal('show');

                    var manager = office.manager;

                    $(".office_img").attr("data-original", baseUrl + 'images/offices/' + office["image"]);
                    $(".office_img").attr("src", baseUrl + "/images/building.png");
                    $(".office_img").lazyload({
                        effect: "fadeIn"
                    });
                    $(".office_img").trigger("appear");

                    $(".off_description").text(office["description"]);
                    $(".off_name").text(office["name"].toUpperCase());
                    $(".off_address").text(office["address"]);
                    $(".off_phone").text(office["phone"]);

                    $(".us_title").text(manager["title"].toUpperCase());
                    $(".us_name").text(manager["name"]);
                    $(".us_license").text("License: " + manager["license"]);
                    $(".us_description").text(manager["description"]);
                    $("#man_email").val(manager["email"]);
                    $(".manager_img").attr("data-original", baseUrl + "/images/managers/" + manager["image"]);
                    $(".manager_img").attr("src", baseUrl + "/images/Placeholder.png");
                    $(".manager_img").lazyload({
                        effect: "fadeIn"
                    });
                    $(".manager_img").trigger("appear");
                });
            });

            infowindow.open(map, marker);

        });
    }

    function evictMarkers() {

        // clear all markers

        $(eviction_list).each(function() {
            this.setMap(null);
        });

        // reset the eviction array
        eviction_list = [];
    }

</script>

@stop


@section('content')

    <div id="skrollr-body">
        <section id="page1" class="scroll pageHeight page white_color height_1320" data-order="1">
            <div id="page1Container">
                <div id="Home" class="pageScrollSpeed scroll pageHeight subPage">
                    <div class="contentContainer">
                        <div class="homemain">
                            {{ HTML::image('images/maintxt.png') }}
                            <br />
                            <h1>we are REALTY <span>ONE</span> GROUP</h1>
                            <p>
                                The 5<sup>th</sup> largest independent residential<br />
                                real estate brokerage in the nation. We<br />
                                like to push the limits, think outside the<br />
                                box, and create the change our industry<br />
                                needs. We empower our agents to<br />
                                elevate their business and dream<br />
                                about what's next.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="anim-home-btn" class="homebottom">
                <div id="anim-home-btn-m" class="homebottom_m">
                    <h2>how? by offering:</h2>
                    <div class="box culture">
                        <p>Cool</p>
                        <p><span>CULTURE</span></p>
                    </div>
                    <div class="box coaching">
                        <p>Creative</p>
                        <p><span>COACHING</span></p>
                    </div>
                    <div class="box commission">
                        <p>Crazy</p>
                        <p><span>COMMISSION</span></p>
                    </div>
                </div>
            </div>
        </section>
        <section id="page2" class="scroll pageHeight page blck_color height_1320" data-order="2">
            <div id="Culture" class="parentPage">
                <div id="Data" class="pageScrollSpeed scroll pageHeight subPage">
                    <div class="contentContainer" style="text-align: center; letter-spacing: 1px;">
                        <p style="margin-bottom: 2em">
                            <span>contribute to a vibrant culture</span><br />
                            EveryONE matters and adds something positive to our dynamic team.<br />
                            We celebrate each other's successes by giving back, taking action, working<br />
                            hard and having fun.
                        </p>
                        {{ HTML::image('images/txt-wheel.jpg', 'a wheel', array('class' => 'textwheel')) }}
                        <div class="content">
                            <div class="ID-Image">
                                <ul id="follow">
                                    <li class="line1"><span id="layerBall" class="layerBall ball" data-id="0">LINKED IN</span><span id="layerPulse" class="pulse"></span></li>
                                    <li class="line2"><span id="layerBall1" class="layerBall ball1" data-id="1">FOORST</span><span id="layerPulse1" class="pulse1"></span></li>
                                    <li class="line3"><span id="layerBall2" class="layerBall ball2" data-id="2">TWITTER</span><span id="layerPulse2" class="pulse2"></span></li>
                                    <li class="line4"><span id="layerBall3" class="layerBall ball3" data-id="3">FACEBOOK</span><span id="layerPulse3" class="pulse3"></span></li>
                                    <li class="line5"><span id="layerBall4" class="layerBall ball4" data-id="4">FACEBOOK</span><span id="layerPulse4" class="pulse4"></span></li>
                                    <li class="line6"><span id="layerBall5" class="layerBall ball5" data-id="5">FACEBOOK</span><span id="layerPulse5" class="pulse5"></span></li>
                                    <li class="line7"><span id="layerBall6" class="layerBall ball6" data-id="6">FACEBOOK</span><span id="layerPulse6" class="pulse6"></span></li>
                                    <li class="line8"><span id="layerBall7" class="layerBall ball7" data-id="7">FACEBOOK</span><span id="layerPulse7" class="pulse7"></span></li>
                                    <li class="line9"><span id="layerBall8" class="layerBall ball8" data-id="8">FACEBOOK</span><span id="layerPulse8" class="pulse8"></span></li>
                                    <li class="line10"><span id="layerBall9" class="layerBall ball9" data-id="9">FACEBOOK</span><span id="layerPulse9" class="pulse9"></span></li>
                                    <li class="line11"><span id="layerBall10" class="layerBall ball10" data-id="10">FACEBOOK</span><span id="layerPulse10" class="pulse10"></span></li>
                                </ul>
                                <ul id="social">
                                    <li id="layerSocialControl" class="layerSocialControl zone" data-id="0" data-target=".description10"><span></span></li>
                                    <li id="layerSocialControl1" class="layerSocialControl magazine" data-id="1" data-target=".description11"><span></span></li>
                                    <li id="layerSocialControl2" class="layerSocialControl impressions" data-id="2" data-target=".description5"><span></span></li>
                                    <li id="layerSocialControl3" class="layerSocialControl day" data-id="3" data-target=".description4"><span></span></li>
                                    <li id="layerSocialControl4" class="layerSocialControl talks" data-id="4" data-target=".description3"><span></span></li>
                                    <li id="layerSocialControl5" class="layerSocialControl sumit" data-id="5" data-target=".description2"><span></span></li>
                                    <li id="layerSocialControl6" class="layerSocialControl worldwide" data-id="6" data-target=".description1"><span></span></li>
                                    <li id="layerSocialControl7" class="layerSocialControl care" data-id="7" data-target=".description6"><span></span></li>
                                    <li id="layerSocialControl8" class="layerSocialControl belief" data-id="8" data-target=".description7"><span></span></li>
                                    <li id="layerSocialControl9" class="layerSocialControl studio" data-id="9" data-target=".description8"><span></span></li>
                                    <li id="layerSocialControl10" class="layerSocialControl coaching" data-id="10" data-target=".description9"><span></span></li>
                                </ul>
                                <div class='description description1'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Worldwide</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Maximize your exposure with our impressive nationwide network of professionals.</p>
                                    </div>
                                </div>
                                <div class='description description2 '>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Summit</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Where bright minds and bold ideas come to life.</p>
                                    </div>
                                </div>

                                <div class='description description3'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Talks</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Empowering breakthrough sessions with industry leaders and top producers to elevate your success in business and life.</p>
                                    </div>
                                </div>

                                <div class='description description4'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Day</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Lending a hand together. Building a better tomorrow, today.</p>
                                    </div>
                                </div>

                                <div class='description description5'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Impression</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Fashioned for success with offices built to impress</p>
                                    </div>
                                </div>

                                <div class='description description6'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Cares</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Giving back to the communities where we live and serve to make a difference, together as ONE!</p>
                                    </div>
                                </div>

                                <div class='description description7'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Belief</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>EveryONE and everything matters. You have a voice!</p>
                                    </div>
                                </div>

                                <div class='description description8'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Studio</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>3, 2, ONE…action! See our vibrant culture on RealtyONEGroup.TV</p>
                                    </div>
                                </div>

                                <div class='description description9'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Coaching</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Your Success System to Win. Live training, online webinars, and more!</p>
                                    </div>
                                </div>

                                <div class='description description10'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Zone</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>Command your territory with the paperless simplicity and powerful technology of our proprietary business system</p>
                                    </div>
                                </div>
                                <div class='description description11'>
                                    <div class='line-container'>
                                        <div class='connection-line'></div>
                                    </div>
                                    <div class='description-content'>
                                        <h4>Magazine</h4>

                                        <div class='hor-line-container rot'>
                                            <div class='line'></div>
                                        </div>
                                        <p>A lifestyle and business magazine created quarterly to celebrate our professionals and clients</p>
                                    </div>
                                </div>





                            </div>
                            <div class="ID-Mobile">
                                <div class="description">
                                    <div class='worldwide'>
                                    </div>
                                    <div class="text">Maximize your exposure with our impressive nationwide network of professionals.</div>
                                </div>
                                <div class="description">
                                    <div class='sumit'>
                                    </div>
                                    <div class="text">Where bright minds and bold ideas come to life.</div>
                                </div>

                                <div class="description">
                                    <div class='talks'>
                                    </div>
                                    <div class="text">Empowering breakthrough sessions with industry leaders and top producers to elevate your success in business and life.</div>
                                </div>
                                <div class="description">
                                    <div class='day'>
                                    </div>
                                    <div class="text">Lending a hand together. Building a better tomorrow, today.</div>
                                </div>
                                <div class="description">
                                    <div class='impressions'>
                                    </div>
                                    <div class="text">Fashioned for success with offices built to impress</div>
                                </div>
                                <div class="description">
                                    <div class='care'>
                                    </div>
                                    <div class="text">Giving back to the communities where we live and serve to make a difference, together as ONE!</div>
                                </div>

                                <div class="description">
                                    <div class='belief'>
                                    </div>
                                    <div class="text">EveryONE and everything matters. You have a voice!</div>
                                </div>

                                <div class="description">
                                    <div class='studio'>
                                    </div>
                                    <div class="text">3, 2, ONE…action! See our vibrant culture on RealtyONEGroup.TV</div>
                                </div>

                                <div class="description">
                                    <div class='coaching'>
                                    </div>
                                    <div class="text">Your Success System to Win. Live training, online webinars, and more!</div>
                                </div>

                                <div class="description">
                                    <div class='zone'>
                                    </div>
                                    <div class="text">Command your territory with the paperless simplicity and powerful technology of our proprietary business system</div>
                                </div>

                                <div class="description">
                                    <div class='magazine'>
                                    </div>
                                    <div class="text">A lifestyle and business magazine created quarterly to celebrate our professionals and clients</div>
                                </div>

                            </div>
                            <a id="trigger">Follow Me!</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="page3" class="scroll pageHeight page white_color" data-order="3">
            <div id="Growth" class="parentPage">
            <div id="Campaign" class="pageScrollSpeed scroll subPage">
                    <div class="contentContainer">
                        <p>
                            <span>be a part of our rapid growth</span>We grow fast. Just take a look at our numbers!<br />
                            By the way, we don't plan on slowing down anytime soon.
                        </p>
                        <div class="box">
                            <span class="small_part">#</span><span class="timer yellow_sign" data-from="0" data-to="5"></span><br />
                            In Nation
                        </div>
                        <div class="box">
                            <span class="timer yellow_sign" data-from="0" data-to="50"></span><span class="small_part">+</span><br />
                            Offices
                        </div>
                        <div class="box">
                            <span class="timer yellow_sign" data-from="0" data-to="5000"></span><span class="small_part">+</span><br />
                            Agents
                        </div>
                        <div class="box">
                            <span class="timer yellow_sign" data-from="0" data-to="100"></span><span class="yellow_sign">%</span><br />
                            Debt-Free
                        </div>

                </div>
            </div>
            <div id="Campaign2">
                <div class="contentContainer">
                        <p class="whitecolor"><span class="header-51">media recognition</span>We're creating quite a buzz:</p>
                        <ul id="flexiselDemo1">
                            <li>
                                {{ HTML::image('images/logo1.png') }}
                            </li>
                            <li>
                                {{ HTML::image('images/logo2.png') }}
                            </li>
                            <li>
                                {{ HTML::image('images/logo3.png') }}
                            </li>
                            <li>
                                {{ HTML::image('images/logo4.png') }}
                            </li>
                            <li>
                                {{ HTML::image('images/logo5.png') }}
                            </li>
                            <li>
                                {{ HTML::image('images/logo6.png') }}
                            </li>
                            <li>
                                {{ HTML::image('images/logo7.png') }}
                            </li>
                            <li>
                                {{ HTML::image('images/logo8.png') }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section id="page4" class="scroll pageHeight page height_6190 " data-order="4">
            <div id="Success" class="parentPage">
                <div id="Experience" class="blackbox_animation white_color">

                        <div class="contentContainer">
                            <p><span>create your own success</span></p>
                            <div class="box1">
                                <div class="corclecontainer">
                                    <div class="dottedcircle">
                                        <div class="innercircle"></div>
                                    </div>
                                    <div class="txtlefttop txtcolorblack">
                                        <span>Our agents love<br />
                                            What they do.</span>
                                    </div>
                                    <div class="txtrightwithoutbg txtcolorblack">
                                        <span>We love helping<br />
                                            them do it.</span>
                                    </div>
                                    <div class="txtleftwithoutbg txtcolorblack">
                                        <span>That's why we give them
                                        <br />
                                            MORE of Everything!</span>
                                    </div>
                                    <div class="arc"></div>
                                </div>
                                <div class="corclecontainerbtm margin_top44" id="bottombox1" style="margin-top: 46px;"></div>
                            </div>
                        </div>

                </div>
                <div class="blackbox_animation blck_color">
                    <div class="box2">
                        <div class="corclecontainertopc" style="opacity:0" id="topbox2">
                            <div class="corclecontainertop"></div>
                        </div>
                        <div class="corclecontainer">
                            <div class="boxheading txtcolorwhite">
                                <span>more</span><br />
                                technology
                            </div>
                            <div class="dottedcircle">
                                <div class="innercircle">
                                    <a class="pulses video" data-video="http://player.vimeo.com/video/97578783" href="javascript:void(0);"></a>
                                </div>
                            </div>
                            <div class="txtleft txtcolorwhite" style="left:-142px">
                                <span>myROG: boost your<br />
                                    business with our<br />
                                    proprietary software</span>
                            </div>
                            <div class="txtrightwithoutbg txtcolorwhite">
                                <span>FREE APPS:<br />
                                    personalized<br />
                                    home search and<br />
                                    showing apps</span>
                            </div>
                            <div class="txtleftbtm txtcolorwhite" style="left:-120px; padding-top:26px">
                                <span style=" margin-top: 12px;">PAPERLESS EXCHANGE:<br />
                                    effectively manage your<br />
                                    transactions</span>
                            </div>
                            <div class="arc2"></div>
                        </div>
                        <div class="corclecontainerbtm" id="bottombox2" style="height: 0px;position: relative;"></div>
                    </div>
                </div>
                <div class="blackbox_animation white_color">
                    <div class="box3">
                        <div class="corclecontainertopc" style="opacity:0">
                            <div class="corclecontainertop"></div>
                        </div>
                        <div class="corclecontainer">
                            <div class="boxheading txt_rightalign txtcolorblack">
                                <span>more</span><br />
                                support
                            </div>
                            <div class="dottedcircle">
                                <div class="innercircle">
                                    <a class="pulses video" data-video="http://player.vimeo.com/video/100762021" href="javascript:void(0);"></a>
                                </div>
                            </div>
                            <div class="txtleftwithoutbg txtcolorblack">
                                <span>Onsite,<br />
                                    non-competing<br />
                                    managers</span>
                            </div>
                            <div class="txtrighttop txtcolorblack">
                                <span>Friendly and<br />
                                    experienced<br />
                                    staff</span>
                            </div>
                            <div class="txtrightbtm txtcolorblack"><span>Accessible 24/7</span></div>
                            <div class="arc3"></div>
                        </div>
                        <div class="corclecontainerbtm" style="height: 0px;position: relative;"></div>
                    </div>
                </div>
                <div class="blackbox_animation blck_color">
                    <div class="box4">
                        <div class="corclecontainertopc" style="opacity:0">
                            <div class="corclecontainertop"></div>
                        </div>
                        <div class="corclecontainer">
                            <div class="boxheading txt_rightalign txtcolorwhite">
                                <span>more</span><br />
                                commission
                            </div>
                            <div class="dottedcircle">
                                <div class="innercircle">
                                    <a class="pulses video" data-video="http://player.vimeo.com/video/101467180" href="javascript:void(0);"></a>
                                </div>
                            </div>
                            <div class="txtleftwithoutbg txtcolorwhite"><span>100% commission</span></div>
                            <div class="txtleftbtm txtcolorwhite">
                                <span style="margin-top: 12px;">Low monthly fees</span>
                            </div>
                            <div class="txtrightbtm txtcolorwhite">
                                <span>Reinvest into your<br />
                                    own business!</span>
                            </div>
                            <div class="arc3"></div>
                        </div>
                        <div class="corclecontainerbtm" style="height: 0px;position: relative;"></div>
                    </div>
                </div>
                <div class="blackbox_animation white_color">
                    <div class="box5">
                        <div class="corclecontainertopc" style="opacity:0">
                            <div class="corclecontainertop"></div>
                        </div>
                        <div class="corclecontainer">
                            <div class="boxheading">
                                <span>more</span><br />
                                education
                            </div>
                            <div class="dottedcircle">
                                <div class="innercircle">
                                    <a class="pulses video" data-video="http://player.vimeo.com/video/99886720" href="javascript:void(0);"></a>
                                </div>
                            </div>
                            <div class="txtrighttop txtcolorblack" ><span>ONE Talks</span></div>
                            <div class="txtrightbtm txtcolorblack"><span>ONE Coaching</span></div>
                            <div class="txtrightwithoutbg txtcolorblack"><span>ONE University</span></div>
                            <div class="arc4" ></div>
                        </div>
                        <div class="corclecontainerbtm" style="height: 0px;position: relative;"></div>
                    </div>
                </div>

                <div class="blackbox_animation blck_color">
                    <div class="box6">
                        <div class="corclecontainertopc" style="opacity:0">
                            <div class="corclecontainertop"></div>
                        </div>
                        <div class="corclecontainer">
                            <div class="boxheading txt_rightalign txtcolorwhite"  style="z-index:9999; height:90px">
                                <span>more</span><br />
                                marketing
                            </div>
                            <div class="dottedcircle">
                                <div class="innercircle">
                                    <a class="pulses video" data-video="http://player.vimeo.com/video/99386552" href="javascript:void(0);"></a>
                                </div>
                            </div>
                            <div class="txtleftwithoutbg txtcolorwhite">
                                <span>All leads straight<br />
                                    to you!</span>
                            </div>
                            <div class="txtleftbtm txtcolorwhite" style="z-index:9999">
                                <span>FREE featured<br />
                                    listings online</span>
                            </div>
                            <div class="txtrightwithoutbg txtcolorwhite">
                                <span>Reinvest into your<br />
                                    own business!</span>
                            </div>
                            <div class="arc4"></div>
                        </div>
                        <div class="corclecontainerbtm" style="height: 0px;position: relative;"></div>
                    </div>
                </div>

                <div class="blackbox_animation white_color">
                    <div class="box7">
                        <div class="corclecontainertopc" style="opacity:0">
                            <div class="corclecontainertop"></div>
                        </div>
                        <div class="corclecontainer">
                            <div class="boxheading">
                                <span>more</span><br />
                                success
                            </div>
                            <div class="dottedcircle">
                                <div class="innercircle" >
                                    <a class="pulses video" data-video="http://player.vimeo.com/video/102046934" href="javascript:void(0);"></a>
                                </div>
                            </div>
                            <div class="txtrightwithoutbg txtcolorblack"><span>YOU are the brand!</span></div>
                            <div class="arc2"  style="z-index:9998"></div>
                        </div>
                        <div class="corclecontainerbtm" style="position:relative; z-index:9">
                        {{ HTML::image('images/one_logo.png', 'a logo', array('style' => 'position:absolute; left:192px')) }}
                        </div>
                    </div>

                </div>
            </div>
        </section>



        <section id="page8" class="scroll pageHeight page white_color height_1695" data-order="5">
            <div id="Location">
                <div id="Lab" class="pageScrollSpeed scroll height_710 subPage ">
                    <div class="contentContainer height_710">
                        <div class="testimonials">
                            <p><span class="testimonials_header">Testimonials</span></p>
                            <div class="testimonialsmain">
                                <div class="theading">
                                    <div class="testimonials-name"><span>Jim Brooks</span></div>
                                     <div class="testimonials-loc">Green Valley, NV</div>
                                    <div class="testimonials-loc">Formerly with Better Homes & Gardens</div>
                                </div>
                                <div class="tcontent">Realty ONE Group, all the way from the admins to the  CEO, are great people who truly want to support the agents and help us grow our business.</div>
                            </div>
                            <div class="testimonialsmain">
                                <div class="theading">
                                    <div class="testimonials-name"><span>Raul Aldama</span></div>
                                    <div class="testimonials-loc">Laguna Niguel, CA</div>
                                    <div class="testimonials-loc">Formerly with Prudential California Reality</div>
                                </div>
                                <div class="tcontent">Kuba had a vision of how the relationship between the Broker and agent should be and he carried it out perfectly. He provides an atmosphere that lets us thrive and grow.</div>
                            </div>
                            <div class="testimonialsmain">
                                <div class="theading">
                                    <div class="testimonials-name"><span>Bill Arseneau</span></div>
                                    <div class="testimonials-loc">Mission Viejo, CA</div>
                                    <div class="testimonials-loc">Formerly with Star Real Estate</div>
                                </div>
                                <div class="tcontent">This Company is changing the model of Real Estate  and they are doing it right.</div>
                            </div>
                            <div class="testimonialsmain">
                                <div class="theading">
                                    <div class="testimonials-name"><span>Matt Dunshie</span></div>
                                    <div class="testimonials-loc">Glendale, AZ</div>
                                    <div class="testimonials-loc">Formerly with Keller Williams</div>
                                </div>
                                <div class="tcontent">I was looking for a company that was built to support top producing Realtors and I found it.</div>
                            </div>
                            <div class="testimonialsmain">
                                <div class="theading">
                                    <div class="testimonials-name"><span>The Pessin Team</span></div>
                                    <div class="testimonials-loc">Summerlin, NV</div>
                                    <div class="testimonials-loc">Formerly with Realty Executives</div>
                                </div>
                                <div class="tcontent">The respect, knowledge and ethics of management is extremely important to us. Office locations are convenient to all areas of town and the support is incredible!</div>
                            </div>
                            <div class="testimonialsmain">
                                <div class="theading">
                                    <div class="testimonials-name"><span>Cheryl Krone</span></div>
                                    <div class="testimonials-loc">Goodyear, AZ</div>
                                    <div class="testimonials-loc">Formerly with Keller Williams</div>
                                </div>
                                <div class="tcontent">The main reason I left my last company was due to no longer having a value proposition in the fees I was paying. My team will save $40,000+ with Realty ONE Group.</div>
                            </div>

                        </div>
                        <div style="clear:both"></div>
                        <div id="Locations" class="frm-location">
                        <p>
                            <span>locations</span><br />
                            It's all about location, and with our 50+ beautiful offices, we bet we've got one near you!
                            <br />
                            Search our offices and connect with the broker in your area.
                        </p>
                            <form accept-charset="UTF-8" data-remote="true" id="location_form" method="post">
                                <div style="margin: 0; padding: 0; display: inline">
                                    <input name="utf8" type="hidden" value="&#x2713;" />
                                </div>
                                <div class="selectbox">
                                    <select id="state" name="state">
                                        <option value="">Select a State</option>
                                    </select>
                                </div>
                                <div class="selectbox">
                                    <select id="city" name="city">
                                        <option value="">Select a City</option>
                                    </select>
                                </div>
                                <div class="submit">
                                    <input class="submit_btn" disabled="disabled" name="submit" type="submit" value="OFFICE SEARCH" />
                                </div>
                            </form>
                            </div>

                    </div>
                </div>
            </div>
            <div id="mappy" class="mapiframe"></div>
            <div class="notyfyme">
                <div class="notyfymetxt">If we don't, chances are one is coming soon.</div>
                <div class="notyfymetxt"><a id="notifyMe" href="#" data-toggle="modal" data-target="notify-modal">NOTIFY ME WHEN YOU'RE IN MY AREA</a></div>
            </div>
        </section>
        <section id="page5" class="scroll height_840 page blck_color" data-order="6">
            <div id="LetsTalk">
                <div id="Research" class="pageScrollSpeed scroll height_830 subPage">
                    <div class="contentContainer height_830 contact_page">

                           <p> <span>what are you waiting for?</span></p>
                           <p>Advance your career and join us to win! #HelloTomorrow</p>
                            <p><a class="tel" tabIndex="-1" href="tel:888.461.0101">
                            {{ HTML::image('images/phine_icon.png') }}888.461.0101</a> </p>


                        <form accept-charset="UTF-8" data-remote="true" id="feedback_form" method="post">
                            <div style="margin: 0; padding: 0; display: inline">
                                <input name="utf8" type="hidden" value="✓">
                            </div>
                            <div class="row">
                                <input id="feedback_name" name="feedback_name" placeholder="Name" type="text" value="" data-toggle="tooltip" title="Please Fill Out This Field"  data-trigger="manual" class="gold-tooltip">
                                <input id="feedback_email" name="feedback_email" placeholder="Email" type="email" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                                <input id="feedback_phone" name="feedback_phone" placeholder="Phone" type="tel" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                            </div>
                            <div class="row">
                                <textarea id="feedback_message" name="message" placeholder="Message"  data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip"></textarea>
                            </div>
                            <p>
                                <input class="btn modal-btn" name="sendmessage" type="submit" value="Send Message">
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    </div>

    <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="videoModal" aria-hidden="true">
      <div class="modal-dialog" style="">
        <div class="modal-content" style="background-color: #000">
          <div class="modal-body" style="background-color: transparent;">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color:#fff; opacity: 1">&times;</button>
              <div class="container_video">
                  <iframe id="frame-video" width="100%" height="100%" frameborder="0" allowfullscreen=""></iframe>
              </div>
          </div>
        </div>
      </div>
    </div>



    <div class="modal fade" id="map-modal" tabindex="-1" role="dialog" aria-labelledby="map-model-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                </div>
                <div class="modal-body modal-form" style="display: none">
                    <form accept-charset="UTF-8" data-remote="true" id="conversation_form" method="post">
                        <div style="margin: 0; padding: 0; display: inline">
                            <input name="utf8" type="hidden" value="✓">
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <input id="conversation_name" name="conversation_name" placeholder="Name" type="text" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                                <input id="conversation_email" name="conversation_email" placeholder="Email" type="email" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                                <input id="conversation_phone" name="conversation_phone" placeholder="Phone" type="tel" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                                <input type="hidden" id="man_email"/>
                            </div>
                            <div class="col-sm-6">
                                <textarea id="conversation_message" name="conversation_message" placeholder="Message"  data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip"></textarea>
                            </div>
                        </div>
                        <p class="text-center">
                            <input class="btn modal-btn" name="sendmessage" type="submit" value="Send Message">
                        </p>
                    </form>
                </div>
                <div class="modal-body" style="padding-bottom: 0 !important">
                    <div class="row">
                        <div class="col-sm-4" style="width: auto">
                            <div class="image-wrap">
                            {{ HTML::image('images/building.png', 'a building', array('class' => 'img-responsive office_img')) }}

                            </div>
                        </div>
                        <div class="col-sm-8 office_text" style="padding-left:0">
                            <div class="off_name" style="font-size: 20px"></div>
                            <div class="off_address" style="font-size: 12px; width: 145px;"></div>
                            <div class="off_phone"></div>
                            <div class="off_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel hendrerit erat. Aenean posuere congue odio, ut fermentum ipsum tempor sed. Vivamus non leo molestie, congue arcu sed, fringilla tortor. Quisque volutpat aliquet tincidunt.</div>
                        </div>
                    </div>

                    <div class="row" style="margin-bottom: 0px">
                        <div class="col-sm-4" style="width: auto">
                            <div class="image-wrap">
                            {{ HTML::image('images/Placeholder.png', 'a placeholder', array('class' => 'img-responsive manager_img')) }}

                            </div>
                        </div>
                        <div class="col-sm-8 manager_text" style="padding-left:0">
                            <div class="us_title" style="font-size: 20px"></div>
                            <div class="us_name"></div>
                            <div class="us_license" style="font-size: 12px"></div>
                            <div class="us_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel hendrerit erat. Aenean posuere congue odio, ut fermentum ipsum tempor sed. Vivamus non leo molestie, congue arcu sed, fringilla tortor. Quisque volutpat aliquet tincidunt.</div>
                            <div class="notyfymetxt form_contact"><a data-toggle="modal" data-target="map-modal" style="cursor: pointer">CONTACT THIS OFFICE</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="notify-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                </div>
                <div class="modal-body send_message">
                    <form accept-charset="UTF-8" id="notify_form" data-remote="true" method="post">
                        <div style="margin: 0; padding: 0; display: inline">
                            <input name="utf8" type="hidden" value="✓"></div>
                        <div class="row">
                            <input id="notify_name" name="notify_name" placeholder="Name" type="text" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                            <input id="notify_email" name="notify_email" placeholder="Email" type="email" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                            <input id="notify_phone" name="notify_phone" placeholder="Phone" type="text" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">
                            <input id="notify_location" name="notify_location" placeholder="Location" type="text" value="" data-toggle="tooltip" title="Please Fill Out This Field" data-trigger="manual" class="gold-tooltip">

                            <p class="text-center">
                                <input class="btn modal-btn" name="sendmessage" type="submit" value="Send Message"></p>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="modal-email" style="color: #5c5c5c; font-size: 21px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!--button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button-->
            <h4 class="modal-title">Thank You!</h4>
          </div>
          <div class="modal-body">
            <p>We have now received your email and we will get back to you as soon as possible</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" style="background: #f7c55a; border: medium none; color: #fff; font-family: museo_sans300; font-size: 20px; padding: 12px 20px; text-transform: uppercase; border-radius: 5px;" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

@stop