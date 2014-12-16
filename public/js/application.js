String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



$(document).ready(function () {

    // This entire section makes Bootstrap Modals work with iOS
    if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {

      $('.modal').on('show.bs.modal', function() {
        setTimeout(function () {
          scrollLocation = $(window).scrollTop();
          $('.modal')
              .addClass('modal-ios')
              .height($(window).height())
              .css({'margin-top': scrollLocation + 'px'});
        }, 0);
      });

      $('input').on('blur', function(){
        setTimeout(function() {
          // This causes iOS to refresh, fixes problems when virtual keyboard closes
          $(window).scrollLeft(0);

          var $focused = $(':focus');
          // Needed in case user clicks directly from one input to another
          if(!$focused.is('input')) {
            // Otherwise reset the scoll to the top of the modal
            $(window).scrollTop(scrollLocation);
          }
        }, 0);
      })

    }

    if ($(window).width() < 500) {

/*
         $("#notify-modal input, #notify-modal textarea").on("focus", function () {
            var height = $(window).height() - 300;
            $("#notify-modal .modal-body").css("height", height + "px");
            $("#notify-modal .modal-body").scrollTop(0);
        });
        $("#notify-modal").on("blur", "input, textarea", function () {
            $("#notify-modal .modal-body").css("height", "auto");
        });
        */
    }
    $("#navSocialLinks a").on("click", function() {
        window.open($(this).data("target"), "_blank");
    });
    $(".vertical.menu a, #navLinks a").on("click", function (e) {
        var $anchor = $(this);
        var divId = $anchor.attr("href");
        var offset = 60;
        $(window).width() > 770
        {
            offset = 80;
        }
        if (divId == "#Locations" && $(window).width() <= 770) {
            offset = 90;
        }
        $('html, body').stop().animate({
            scrollTop: $(divId).offset().top - offset
        }, 1500);
        e.preventDefault();
    });

    $('.bxslider').bxSlider({
        mode: 'horizontal',
        slideMargin: 3,
        auto: true
    });

    jQuery('.menu li').click(function () {
        jQuery('.menu').hide();
        jQuery('.options li').removeClass("active");
    });


    $('#notifyMe').bind('click', function(event) {
        $("#notify-modal").modal("show");
    });


    $("#flexiselDemo1").flexisel({
        visibleItems: 3,
        animationSpeed: 5500,
        autoPlay: true,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
            portrait: {
                changePoint: 480,
                visibleItems: 1
            },
            landscape: {
                changePoint: 640,
                visibleItems: 2
            },
            tablet: {
                changePoint: 768,
                visibleItems: 3
            }
        }
    });

    $('.search-box,.menu').hide();
    $('.options li:first-child').click(function () {
        $(this).toggleClass('active');
        $('.search-box').toggle();
        $('.menu').hide();
        $('.options li:last-child').removeClass('active');
    });
    $('.options li:last-child').click(function () {
        $(this).toggleClass('active');
        $('.menu').toggle();
        $('.search-box').hide();
        $('.options li:first-child').removeClass('active');
    });
    $('.content').click(function () {
        $('.search-box,.menu').hide();
        $('.options li:last-child, .options li:first-child').removeClass('active');
    });

    $(".selectbox select").change(function () {
        if ($(".selectbox select")[0].value.length > 0 && $(".selectbox select")[1].value.length > 0) {
            $(".submit_btn").removeAttr("disabled");
        } else {
            $(".submit_btn").attr("disabled", "true");
        };
    });


    $(".form_contact a").click(function () {
        $("#map-modal .modal-body").hide("medium");
        $("#map-modal .modal-form").show("medium");
        setTimeout(function () { $("#notify-modal").hide(); }, 100);
        $("#notify-modal").hide();
        $("#notify-modal span").click();
    });

    $('#map-modal').on('hide.bs.modal', function (event) {
        $("#map-modal .modal-body").show();
        $("#map-modal .modal-form").hide();
    });

    $window = $(window);
	var xCart = 1;



        var offset = 0;
	    var offset2 = 0;
        if ($(window).width() <= 768) {
            offset = -400;
            //offset2 = -600;
        }

    var oldPageYOffset = 0;

	    $(window).scroll(function() {

            if (window.pageYOffset != oldPageYOffset)
            {
                oldPageYOffset = window.pageYOffset;
            }else{
                return
            }

				var s = $(window).scrollTop(),
                d = $(document).height(),
                c = $(window).height();

	            var p = 0;

                if (s <= 1400) {
                    p = (s / 1400) * 24;
                }
                else if (s <= 2400) {
                    p = (((s - 1400) / 1000) * 18) + 24;
                }
                else if (s <= 3400) {
                    p = (((s - 2400) / 1000) * 18) + 42;
	            }
                else if (s <= 9400) {
                    p = (((s - 3400) / 6000) * 25) + 60;
                }
                else if (s <= (d - c)) {
                    p = (((s - 9400) / ((d - c)- 9400)) * 15) + 85;                    
                }

                $("#navScrollMiddle").css("width", p + "%");

                var offSetContentLogos = 800;
	        
            if ($(window).width() <= 770) {
                offSetContentLogos = 220;
                offset = -1500;
            }

            if (s <= offSetContentLogos) {
	            TweenMax.to($('#Data .content'), .1, { css: { opacity: 0 }, onComplete: function () {
	                            $('.content').removeClass('running').addClass('reverse');
	                        } });
	        }

            if (s > offSetContentLogos) {
                TweenMax.to($('#Data .content'), .1, {
                    css: { opacity: 1 }, onComplete: function () {
                        $('.content').removeClass('reverse').addClass('running');
                    }
                });
            }


            var isMobileX = false;
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                isMobileX = true;
            }

            if($(window).width() > 770 && !isMobileX)
	        {
            
            if (s <= 3000 + offset) {

                addTweens(['.box1 .txtlefttop span', '.box1 .txtlefttop'], 0);
            }
            if (s <= 3200 + offset) {
	            addTweens(['.box1 .arc', '.box1 .txtrightwithoutbg span', '.box1 .txtleftwithoutbg span'], 0);
	        }

            

            

            if (s <= 3600 + offset) {
                addTweens(['.box2 .arc2', '.box2 .txtleft', '.box2 .txtleft span'], 0);
            }

            if (s <= 3500 + offset) {
                addTweens(['.box2 .dottedcircle', '.box2 .boxheading'], 0);
            }

            if (s <= 3400 + offset) {
                addTweensHeight(['.box1 .corclecontainerbtm'], "0px", 0, 0.2);
            }


            if (s <= 3700 + offset) {
                addTweens(['.box2 .txtrightwithoutbg span'], 0);
            }

            if (s <= 3800 + offset) {
                addTweens(['.box2 .txtleftbtm', '.box2 .txtleftbtm span'], 0);

            }

            if (s <= 4200 + offset) {
                addTweens(['.box3 .boxheading', '.box3 .arc3', '.box3 .dottedcircle'], 0);
            }

            if (s <= 4400 + offset) {
                addTweens(['.box3 .txtrighttop', '.box3 .txtrighttop span'], 0);
            }

            if (s <= 4500 + offset) {                
                addTweens(['.box3 .txtleftwithoutbg span'], 0);
            }

            if (s <= 4700 + offset) {
	                addTweens(['.box3 .txtrightbtm', '.box3 .txtrightbtm span'], 0);
            }

            if (s <= 4800 + offset) {
                addTweens(['.box4 .boxheading', '.box4 .arc3', '.box4 .dottedcircle'], 0);
            }

            if (s <= 5000 + offset) {
                addTweens(['.box4 .txtleftwithoutbg span'], 0);
            }

            if (s <= 5100 + offset) {
	                addTweens(['.box4 .txtleftbtm', '.box4 .txtleftbtm span', '.box4 .txtrightbtm', '.box4 .txtrightbtm span'], 0);
            }

            if (s <= 5500 + offset + offset2) {
                addTweens(['.box5 .arc4', '.box5 .txtrighttop', '.box5 .txtrighttop span'], 0);
	                addTweens(['.box5 .dottedcircle'], 0);
			
		addTweens(['.box5 .boxheading'], 0);
            }

            if (s <= 5600 + offset + offset2) {
	                addTweens(['.box5 .txtrightbtm', '.box5 .txtrightbtm span', '.box5 .txtrightwithoutbg span'], 0);
            }

            if (s <= 6300 + offset + offset2) {
                addTweens(['.box6 .dottedcircle', '.box6 .boxheading', '.box6 .arc4'], 0);
            }
            if (s <= 6500 + offset + offset2) {
                addTweens(['.box6 .txtleftwithoutbg span'], 0);
            }

            if (s <= 6600 + offset + offset2) {
                addTweens(['.box6 .txtleftbtm', '.box6 .txtleftbtm span', '.box6 .txtrightwithoutbg span'], 0);
            }

            if (s <= 6700 + offset + offset2) {
                addTweens(['.box6 .corclecontainerbtm'], 1);
            }

            if (s <= 6900 + offset + offset2) {
                addTweens(['.box7 .boxheading', '.box7 .dottedcircle', '.box7 .arc2'], 0);
            }

            if (s <= 7200 + offset + offset2) {
                addTweens(['.box7 .txtrightwithoutbg span'], 0);
            }


            if (s <= 7300 + offset + offset2) {
	            }
	            if (s > 8000 + offset + offset2) {
	                addTweensHeight(['.box7 .corclecontainerbtm'], "384px", 0.2);
            }
	            else if (s > 7800 + offset + offset2) {
	                addTweensHeight(['.box7 .corclecontainerbtm'], "256px", 0.2);
	            }
	            else if (s > 7600 + offset + offset2) {
	                addTweensHeight(['.box7 .corclecontainerbtm'], "128px", 0.2);
	            }
	            else if (s > 7500 + offset + offset2) {
	                addTweensHeight(['.box7 .arc2'], "230px", 0.2);
	                addTweens(['.box7 .txtrightwithoutbg span'], 1, 1.2);
	        }
	            else if (s > 7400 + offset + offset2) {
	                addTweensHeight(['.box7 .corclecontainerbtm'], "0px", 0.2);
	                addTweensHeight(['.box7 .arc2'], "150px", 0.2);
	                addTweens(['.box7 .txtrightwithoutbg span'], 0, 0.5);
	            }
	            else if (s > 7300 + offset + offset2) {
	                addTweensHeight(['.box7 .arc2'], "75px", 0.2);
	            }
	            else if (s > 7200 + offset + offset2) {
	                addTweensHeight(['.box6 .corclecontainerbtm'], "311px", 0.2);
	                addTweens(['.box7 .txtrightwithoutbg span'], 1, 1.2);
	                addTweens(['.box7 .corclecontainerbtm'], 1);
	                addTweens(['.box7 .boxheading', '.box7 .dottedcircle', '.box7 .arc2'], 1);
	                addTweensHeight(['.box7 .arc2'], "0px", 0.2);
	        }
	            else if (s > 7100 + offset + offset2) {
	                addTweensHeight(['.box6 .corclecontainerbtm'], "211px", 0.2);
	            }
	            else if (s > 7000 + offset + offset2) {
	                addTweensHeight(['.box6 .corclecontainerbtm'], "100px", 0.2);
	        }
	            else if (s > 6900 + offset + offset2) {
	                addTweensHeight(['.box6 .arc4'], "230px", 0.2);
	                addTweensHeight(['.box6 .corclecontainerbtm'], "0px", 0.2);
	                addTweens(['.box6 .txtrightwithoutbg span'], 1, 1.2);
	        }
	            else if (s > 6800 + offset + offset2) {
	                addTweensHeight(['.box6 .arc4'], "150px", 0.2);
	                addTweens(['.box6 .txtleftbtm', '.box6 .txtleftbtm span'], 1, 1.2);
	                addTweens(['.box6 .txtrightwithoutbg span'], 0, 0.5);
	                //addTweens(['.box6 .corclecontainerbtm'], 1, 1.5);
	        }
	            else if (s > 6700 + offset + offset2) {
	                addTweensHeight(['.box6 .arc4'], "75px", 0.2);
	                addTweens(['.box6 .txtleftbtm', '.box6 .txtleftbtm span'], 0, 0.5);
	                addTweens(['.box6 .txtleftwithoutbg span'], 1, 1.2);
	                //addTweens(['.box6 .corclecontainerbtm'], 1, 1.5);
	        }
	            else if (s > 6600 + offset + offset2) {
	                addTweensHeight(['.box6 .corclecontainerbtm'], "0px", 0.2);
	                addTweensHeight(['.box5 .corclecontainerbtm'], "331px", 0.2);
	                addTweensHeight(['.box6 .arc4'], "0px", 0.2);
	                addTweens(['.box6 .txtleftwithoutbg span'], 0, 0.5);
	                addTweens(['.box6 .dottedcircle', '.box6 .boxheading', '.box6 .boxheading span', '.box6 .arc4'], 1);
	        }
	            else if (s > 6500 + offset + offset2) {
	                addTweensHeight(['.box5 .corclecontainerbtm'], "256px", 0.2);
	        }
	            else if (s > 6300 + offset + offset2) {
	                addTweensHeight(['.box5 .corclecontainerbtm'], "128px", 0.2);
	        }
	            else if (s > 6200 + offset + offset2) {
	                addTweens(['.box5 .txtrightwithoutbg span'], 1, 1.2);
	                addTweensHeight(['.box5 .arc4'], "230px", 0.2);
	                addTweensHeight(['.box5 .corclecontainerbtm'], "0px", 0.2);
	        }
	            else if (s > 6100 + offset + offset2) {
	                addTweensHeight(['.box5 .arc4'], "150px", 0.2);
	                addTweens(['.box5 .txtrightwithoutbg span'], 0, 0.5);
	                addTweens(['.box5 .txtrightbtm', '.box5 .txtrightbtm span', '.box5 .txtrighttop', '.box5 .txtrighttop span'], 1, 1.2);
	        }
	            else if (s > 6000 + offset + offset2) {
	                addTweensHeight(['.box5 .arc4'], "75px", 0.2);
	                addTweens(['.box5 .txtrightbtm', '.box5 .txtrightbtm span', '.box5 .txtrighttop', '.box5 .txtrighttop span'], 0, 0.5);
	        }
	            else if (s > 5900 + offset + offset2) {
	                addTweensHeight(['.box5 .arc4'], "0px", 0.2);
	                addTweens(['.box5 .corclecontainerbtm'], 1, 1.2);
	                addTweens(['.box5 .arc4'], 1, 1.2);
	                addTweens(['.box5 .dottedcircle', '.box5 .boxheading'], 1);
	        }
	            else if (s > 5800 + offset + offset2) {
		    		addTweens(['.box5 .boxheading'], 1);
	                addTweensHeight(['.box4 .corclecontainerbtm'], "354px", 0.2);
	                addTweensHeight(['.box5 .corclecontainerbtm'], "0px", 0.2);
	            }
	            else if (s > 5700 + offset + offset2) {
	                addTweensHeight(['.box4 .corclecontainerbtm'], "256px", 0.2);
	            }
	            else if (s > 5600 + offset + offset2) {
	                addTweensHeight(['.box4 .corclecontainerbtm'], "128px", 0.2);
	            }
	            else if (s > 5500 + offset + offset2) {
	                addTweens(['.box4 .txtleftbtm', '.box4 .txtleftbtm span', '.box4 .txtrightbtm', '.box4 .txtrightbtm span'], 1, 1.2);
	            }
	            else if (s > 5400 + offset + offset2) {
	                addTweensHeight(['.box4 .arc3'], "230px", 0.2);
	                addTweensHeight(['.box4 .corclecontainerbtm'], "0px", 0.2);
                addTweens(['.box4 .txtleftwithoutbg span'], 1, 1.2);
	                addTweens(['.box4 .txtleftbtm', '.box4 .txtleftbtm span', '.box4 .txtrightbtm', '.box4 .txtrightbtm span'], 0, 0.5);
	        }
	            else if (s > 5300 + offset + offset2) {
	                addTweensHeight(['.box4 .arc3'], "150px", 0.2);
	                addTweens(['.box4 .txtleftwithoutbg span'], 0, 0.5);
	        }
	            else if (s > 5200 + offset + offset2) {
	                addTweensHeight(['.box4 .arc3'], "75px", 0.2);
	                addTweensHeight(['.box4 .corclecontainerbtm'], "0px", 0.2);
	        }

	            else if (s > 5100 + offset) {
	                addTweensHeight(['.box4 .arc3'], "0x", 0.2);
	                addTweensHeight(['.box3 .corclecontainerbtm'], "349px", 0.2);
	                addTweens(['.box4 .corclecontainerbtm'], 1, 1.2);
	                addTweens(['.box4 .boxheading', '.box4 .arc3', '.box4 .dottedcircle'], 1);
            }
	            else if (s > 5000 + offset) {
	                addTweensHeight(['.box3 .corclecontainerbtm'], "256px", 0.2);
	            }
	            else if (s > 4900 + offset) {
	                addTweens(['.box3 .txtrightbtm', '.box3 .txtrightbtm span'], 1, 1.2);
            }
	            else if (s > 4800 + offset) {
	                addTweensHeight(['.box3 .corclecontainerbtm'], "128px", 0.2);
	                addTweensHeight(['.box3 .arc3'], "230px", 0.2);
	                addTweens(['.box3 .txtrighttop', '.box3 .txtrighttop span'], 1, 1.2);
	                addTweens(['.box3 .txtleftwithoutbg span'], 1, 1.2);
	                addTweens(['.box3 .corclecontainerbtm'], 1, 1.2);
	                addTweens(['.box3 .txtrightbtm', '.box3 .txtrightbtm span'], 0, 0.5);
	            }
	            else if (s > 4700 + offset) {
	                addTweensHeight(['.box3 .arc3'], "150px", 0.2);
	                addTweensHeight(['.box3 .corclecontainerbtm'], "0px", 0.2);
	                addTweens(['.box3 .txtrighttop', '.box3 .txtrighttop span'], 0, 0.5);
	                addTweens(['.box3 .txtleftwithoutbg span'], 0, 1.2);
	                addTweens(['.box3 .corclecontainerbtm'], 0, 1.2);
	            }
	            else if (s > 4600 + offset) {
	                addTweensHeight(['.box3 .arc3'], "75px", 0.2);
	            }
	            else if (s > 4500 + offset) {
	                addTweensHeight(['.box2 .corclecontainerbtm'], "349px", 0.2);
	                addTweensHeight(['.box3 .corclecontainerbtm'], "0px", 0.2);
	                addTweens(['.box3 .boxheading', '.box3 .arc3', '.box3 .dottedcircle'], 1);
	        }
	            else if (s > 4400 + offset) {
	                addTweensHeight(['.box2 .corclecontainerbtm'], "200px", 0.2);
	                addTweensHeight(['.box3 .arc3'], "0px", 0.2);
	            }
	            else if (s > 4200 + offset) {
	                addTweensHeight(['.box2 .corclecontainerbtm'], "100px", 0.2);
	                addTweens(['.box2 .txtleftbtm', '.box2 .txtleftbtm span'], 1, 1.2);
	        }
	            else if (s > 4000 + offset) {
	                addTweensHeight(['.box2 .arc2'], "230px", 0.2);
	                addTweens(['.box2 .txtleft', '.box2 .txtleft span'], 1);
	                addTweens(['.box2 .txtrightwithoutbg span'], 1);
	            }
	            else if (s > 3900 + offset) {
	                addTweensHeight(['.box2 .arc2'], "150px", 0.2);
	                addTweensHeight(['.box2 .corclecontainerbtm'], "0px", 0.2);
	                addTweens(['.box2 .txtleft', '.box2 .txtleft span'], 0);
	                addTweens(['.box2 .txtrightwithoutbg span'], 0);
	        }
	            else if (s > 3800 + offset) {
	                addTweensHeight(['.box2 .corclecontainerbtm'], "0px", 0.2);
	                addTweensHeight(['.box2 .arc2'], "75px", 0.2);
	            }
	            else if (s > 3700 + offset) {
	                addTweensHeight(['.box1 .corclecontainerbtm'], "320px", 0.2);
	                addTweens(['.box2 .arc2'], 1);
	        }
	            else if (s > 3600 + offset) {
	                addTweensHeight(['.box1 .corclecontainerbtm'], "214px", 0.2);
	                addTweensHeight(['.box2 .arc2'], "0px", 0.2);
	            }
	            else if (s > 3500 + offset) {
	                addTweensHeight(['.box1 .corclecontainerbtm'], "106px", 0.2);
	                addTweens(['.box2 .dottedcircle', '.box2 .boxheading'], 1);
            }

	            else if (s > 3400 + offset) {
	                //addTweens(['.box1 .corclecontainerbtm'], 1, 1.5);
	                addTweensHeight(['.box1 .arc'], "230px", 0.2);
	                addTweens(['.box1 .txtleftwithoutbg span'], 1);
            }
	            else if (s > 3300 + offset) {
	                addTweensHeight(['.box1 .arc'], "170px", 0.2);
	                addTweens(['.box1 .txtleftwithoutbg span'], 0);
	            }
	            else if (s > 3200 + offset) {
	                addTweens(['.box1 .txtrightwithoutbg span'], 1);
	                addTweensHeight(['.box1 .arc'], "100px", 0.2);
            }
	            else if (s > 3000 + offset) {
	                addTweens(['.box1 .arc', '.box1 .txtlefttop', '.box1 .txtlefttop span'], 1);
	                addTweensHeight(['.box1 .arc'], "21px", 0.2);
	            }
	        
	        } else {
			$(".corclecontainertopc").css("opacity", "1");
		}
	    }); // window scroll
			    

    $(".corclecontainer").height(0);

	function addTweens(elems, opacity, delay) {        
        if (!delay) {
            delay = 1;
        }
        $.each(elems, function(k, v) {
            TweenMax.to($(v), delay, { css: { opacity: opacity, }, ease: Quad.easeInOut });
        });
    }

	function addTweensHeight(elems, h, delay) {
	    if (!delay) {
	        delay = 1;
	    }
	    $.each(elems, function (k, v) {
	        TweenMax.to($(v), delay, { css: { height: h, }, ease: Quad.easeInOut });
	    });
	}


	$('#Campaign .box').appear(function () {
	    $('.timer').countTo({
	        speed: 4000,
	        refreshInterval: 60,
	        formatter: function (value, options) {
	            return value.toFixed(options.decimals);
	        }
	    });
	});
	$('.content').appear(function () {
	    setTimeout(function () {
	        $('#trigger').trigger('click');
	    }, 100);
	});

	var controller = $.superscrollorama({
	    triggerAtCenter: false,
	    playoutAnimations: true
	});

    if(!navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {
        if ($(window).width() > 768) {
            var tl = new TimelineLite();
            tl.add(TweenMax.from($('.box.culture'), .5, { css : { left : '-200%' }, ease : Quad.easeInOut }));
            tl.add(TweenMax.from($('.box.coaching'), .5, { css : { left : '-200%' }, ease : Quad.easeInOut }));
            tl.add(TweenMax.from($('.box.commission'), .5, { css : { left : '-200%' }, ease : Quad.easeInOut }));

            controller.addTween('.homemain h1', tl);
        }
    }
    $('#layerBall10, #layerSocialControl10').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description9').addClass('current');
            $('#layerBall10').css("background-color", "#f8c55a");
            $("#layerSocialControl10").addClass("current-control");
        }
    });
    $('#layerBall10, #layerSocialControl10').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description9').removeClass('current');
            $('#layerBall10').css("background-color", "#fff");
            $("#layerSocialControl10").removeClass("current-control");
        }
    });

    $('#layerBall9, #layerSocialControl9').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description8').addClass('current');
            $('#layerBall9').css("background-color", "#f8c55a");
            $("#layerSocialControl9").addClass("current-control");
        }
    });
    $('#layerBall9, #layerSocialControl9').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description8').removeClass('current');
            $('#layerBall9').css("background-color", "#fff");
            $("#layerSocialControl9").removeClass("current-control");
        }
    });

    $('#layerBall8, #layerSocialControl8').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description7').addClass('current');
            $('#layerBall8').css("background-color", "#f8c55a");
            $("#layerSocialControl8").addClass("current-control");
        }
    });
    $('#layerBall8, #layerSocialControl8').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description7').removeClass('current');
            $('#layerBall8').css("background-color", "#fff");
            $("#layerSocialControl8").removeClass("current-control");
        }
    });

    $('#layerBall7, #layerSocialControl7').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description6').addClass('current');
            $('#layerBall7').css("background-color", "#f8c55a");
            $("#layerSocialControl7").addClass("current-control");
        }
    });
    $('#layerBall7, #layerSocialControl7').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description6').removeClass('current');
            $('#layerBall7').css("background-color", "#fff");
            $("#layerSocialControl7").removeClass("current-control");
        }
    });

    $('#layerBall6, #layerSocialControl6').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description1').addClass('current');
            $('#layerBall6').css("background-color", "#f8c55a");
            $("#layerSocialControl6").addClass("current-control");
        }
    });
    $('#layerBall6, #layerSocialControl6').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description1').removeClass('current');
            $('#layerBall6').css("background-color", "#fff");
            $("#layerSocialControl6").removeClass("current-control");
        }
    });

    $('#layerBall5, #layerSocialControl5').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description2').addClass('current');
            $('#layerBall5').css("background-color", "#f8c55a");
            $("#layerSocialControl5").addClass("current-control");
        }
    });
    $('#layerBall5, #layerSocialControl5').mouseout(function () {
        $('.description2').removeClass('current');
        $('#layerBall5').css("background-color", "#fff");
        $("#layerSocialControl5").removeClass("current-control");
    });

    $('#layerBall4, #layerSocialControl4').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description3').addClass('current');
            $('#layerBall4').css("background-color", "#f8c55a");
            $("#layerSocialControl4").addClass("current-control");
        }
    });
    $('#layerBall4, #layerSocialControl4').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description3').removeClass('current');
            $('#layerBall4').css("background-color", "#fff");
            $("#layerSocialControl4").removeClass("current-control");
        }
    });

    $('#layerBall3, #layerSocialControl3').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description4').addClass('current');
            $('#layerBall3').css("background-color", "#f8c55a");
            $("#layerSocialControl3").addClass("current-control");
        }
    });
    $('#layerBall3, #layerSocialControl3').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description4').removeClass('current');
            $('#layerBall3').css("background-color", "#fff");
            $("#layerSocialControl3").removeClass("current-control");
        }
    });

    $('#layerBall2, #layerSocialControl2').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description5').addClass('current');
            $('#layerBall2').css("background-color", "#f8c55a");
            $("#layerSocialControl2").addClass("current-control");
        }
    });
    $('#layerBall2, #layerSocialControl2').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description5').removeClass('current');
            $('#layerBall2').css("background-color", "#fff");
            $("#layerSocialControl2").removeClass("current-control");
        }
    });

    $('#layerBall1, #layerSocialControl1').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description11').addClass('current');
            $('#layerBall1').css("background-color", "#f8c55a");
            $("#layerSocialControl1").addClass("current-control");
        }
    });
    $('#layerBall1, #layerSocialControl1').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description11').removeClass('current');
            $('#layerBall1').css("background-color", "#fff");
            $("#layerSocialControl1").removeClass("current-control");
        }
    });


    $('#layerBall, #layerSocialControl').mouseover(function () {
        if ($(window).width() > 768 && $('.content').is(':visible')) {
            $('.description10').addClass('current');
            $('#layerBall').css("background-color", "#f8c55a");
            $("#layerSocialControl").addClass("current-control");
        }
    });
    $('#layerBall, #layerSocialControl').mouseout(function () {
        if ($(window).width() > 768) {
            $('.description10').removeClass('current');
            $('#layerBall').css("background-color", "#fff");
            $("#layerSocialControl").removeClass("current-control");
        }
    });
    

    $('#social > li span').bind('click', function () {
        if ($(window).width() <= 768) {
            $($(this).data('target')).addClass('current').siblings().removeClass('current');

            $($(this).data('target')).bind('click', function () {
                if ($(this).hasClass('current')) {
                    $(this).removeClass('current');
                }
            });
        }
    });


    $(document).on('click', '.video', function (e) {
            $('#videoModal').modal('show');
            var url = $(this).data("video");
            $('#frame-video').attr('src', url + "?autoplay=1");
        
        return false;
    });

    $('#videoModal').on('hidden.bs.modal', function(e) {
        $('#frame-video').removeAttr('src');
    });

    $("form input[type=text], form textarea, form input[type=tel], form input[type=email]").on("focus", function () {
        $(this).tooltip("hide");
        $(this).css("background-color", "white");
    });

    $("#feedback_form").on("submit", function (e) {
       
        e.preventDefault();
        var isValid = true;
        var name = $("#feedback_name");
        var email = $("#feedback_email");
        var phone = $("#feedback_phone");
        var message = $("#feedback_message");

        if (name.val().length == 0) {            
            name.tooltip('show');
            isValid = false;
        }

        if (email.val().length == 0) {
            email.tooltip('show');
            isValid = false;
        }

        if (phone.val().length == 0) {
            phone.tooltip('show');
            isValid = false;
        }

        if (message.val().length == 0) {
            message.tooltip('show');
            isValid = false;
        }

        if (!isValid) {
            return false;
        }

        var atpos = email.val().indexOf("@");
        var dotpos = email.val().lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.val().length) {
            alert("Not a valid e-mail address");
            return false;
        }

        if (!phonenumber(phone.val())) {
            alert("Not a valid phone number");
            return false;
        }

        $("#feedback_form .modal-btn").prop('disabled', true);
        $("#feedback_form .modal-btn").val("Sending...");
        $.post(baseUrl + "/feedback", {
            name: name.val(),
            email: email.val(),
            phone: phone.val(),
            message: message.val()
        }, function(result) {
            $("#modal-email").modal("show");
            $("#feedback_form .modal-btn").prop('disabled', false);
            $("#feedback_form .modal-btn").val("Send Message");
            $('#feedback_form')[0].reset();
            name.css("background-color", "white");
            email.css("background-color", "white");
            phone.css("background-color", "white");
            message.css("background-color", "white");
            name.tooltip('hide');
            email.tooltip('hide');
            phone.tooltip('hide');
            message.tooltip('hide');
        });
    });

    $("#notify_form").on("submit", function (e) {
        e.preventDefault();
        var isValid = true;
        var name = $("#notify_name");
        var email = $("#notify_email");
        var phone = $("#notify_phone");
        var location = $("#notify_location");       

        if (name.val().length == 0) {
            isValid = false;
            name.tooltip('show');
        }

        if (email.val().length == 0) {
            isValid = false;
            email.tooltip('show');
        }

        if (phone.val().length == 0) {
            isValid = false;
            phone.tooltip('show');
        }

        if (location.val().length == 0) {
            isValid = false;
            location.tooltip('show');
        }

        if (!isValid) {
            return false;
        }

        var atpos = email.val().indexOf("@");
        var dotpos = email.val().lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.val().length) {
            alert("Not a valid e-mail address");
            return false;
        }

        if (!phonenumber(phone.val())) {
            alert("Not a valid phone number");
            return false;
        }

        $("#notify_form .modal-btn").prop('disabled', true);
        $("#notify_form .modal-btn").val("Sending...");
        $.post(baseUrl + "/notify", {
            name: name.val(),
            email: email.val(),
            phone: phone.val(),
            location: location.val()
        }, function (result) {
            $("#notify-modal").modal('hide');
            $("#modal-email").modal("show");
            $("#notify_form .modal-btn").prop('disabled', false);
            $("#notify_form .modal-btn").val("Send Message");
            $('#notify_form')[0].reset();
            name.css("background-color", "white");
            email.css("background-color", "white");
            phone.css("background-color", "white");
            location.css("background-color", "white");
            name.tooltip('hide');
            email.tooltip('hide');
            phone.tooltip('hide');
            location.tooltip('hide');
        });
    });

    $("#conversation_form").on("submit", function (e) {
        
        e.preventDefault();

        var isValid = true;        
        var name = $("#conversation_name");
        var email = $("#conversation_email");
        var phone = $("#conversation_phone");
        var message = $("#conversation_message");

        if (name.val().length == 0) {
            isValid = false;
            name.tooltip('show');
        }

        if (email.val().length == 0) {
            isValid = false;
            email.tooltip('show');
        }

        if (phone.val().length == 0) {
            isValid = false;
            phone.tooltip('show');
        }

        if (message.val().length == 0) {
            isValid = false;
            message.tooltip('show');
        }

        if (!isValid) {
            return false;
        }

        var atpos = email.val().indexOf("@");
        var dotpos = email.val().lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.val().length) {
            alert("Not a valid e-mail address");
            return false;
        }

        if (!phonenumber(phone.val())) {
            alert("Not a valid phone number");
            return false;
        }


        $("#conversation_form .modal-btn").prop('disabled', true);
        $("#conversation_form .modal-btn").val("Sending...");
        $.post(baseUrl + "/conversation", {
            name: name.val(),
            email: email.val(),
            phone: phone.val(),
            message: message.val(),
            emailTo: $("#man_email").val()
        }, function (result) {
            $("#map-modal").modal('hide');
            $("#modal-email").modal("show");
            $("#conversation_form .modal-btn").prop('disabled', false);
            $("#conversation_form .modal-btn").val("Send Message");
            $('#conversation_form')[0].reset();
            name.css("background-color", "white");
            email.css("background-color", "white");
            phone.css("background-color", "white");
            message.css("background-color", "white");
            name.tooltip('hide');
            email.tooltip('hide');
            phone.tooltip('hide');
            message.tooltip('hide');
        });
    });

    $(".ID-Mobile .description").on("click", function() {
        $(".ID-Mobile .description").removeClass("opened");
        $(this).addClass("opened");
    });

});

function phonenumber(phone)  
{  
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;  
    if(phone.match(phoneno))  
    {  
        return true;  
    }  
    else  
    {          
        return false;  
    }  
}

