$(document).ready(function($) {
    var windowEl = $(window);
    var windowW = windowEl.width();
    var beforeWidth = $(this).width();
    var maxWidth_1199 = window.matchMedia("(max-width: 1199px)");
    var maxWidth_1050 = window.matchMedia("(max-width: 1050px)");
    var maxWidth_991 = window.matchMedia("(max-width: 991px)");

    $('.about-item').on('click', function() {
        $(this).siblings().removeClass('active').children().next().stop().slideUp(500);
        $(this).children().next().stop().slideToggle(500).parents('.about-item').toggleClass('active');
    });

    // slider

    $('.reviews-slider').not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false,
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
        ]
    });

    function sliderOne() {
        $('.advantages-items').not('.slick-initialized').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            responsive: [{
                    breakpoint: 1050,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    }
                },

            ]
        });
    };

    function sliderTwo() {
        $('.works-items').not('.slick-initialized').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    }
                },

            ]
        });
    };

    if (windowW < 1191) {
        sliderOne();
        sliderTwo();
    };

    // resize slider
    var counter = 0;
    var i = 0;

    $(window).on('resize orientationchange', function(event) {
        var windowEl = $('body');
        var windowW = windowEl.width();

        if (windowW < 1191) {
            counter++
            if (counter == 1) {
                sliderOne();
                sliderTwo();
                i = 1;
                counter = 0;
            }
        } else if (windowW >= 1191 && i == 1) {
            $('.advantages-item, .works-item').removeAttr('id aria-describedby tabindex role'); //на это не обращай внимания
            setTimeout(function() {
                $('.advantages-items, .works-items').slick('unslick');

            }, 500);
            counter = 0;
            i = 0;
        };
    });


    //smooth anchor

    $(".header-menu, .logo, .footer-logo").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 500);
        $('.header-menu-wrapp').removeClass('open-menu');
        $('.hamburger').removeClass('close-menu');
        return false;

    });

    //fix menu

    var lastScrollTop = 0;
    $(window).scroll(function() {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            $('#header').addClass('header-fix');
        } else {
            $('#header').removeClass('header-fix');
        }
    });

    //open and close menu

    $('.hamburger').on('click', function() {
        $('.header-menu-wrapp').toggleClass('open-menu');
        return false;
    });

    $('.header-cross').on('click', function() {
        $('.header-menu-wrapp').removeClass('open-menu');
        return false;
    });

    $('.home-button').on('click', function() {
        $('.popup-wrapp').addClass('open-popup');
        return false;
    });

    $('.popup-cross').on('click', function() {
        $('.popup-wrapp').removeClass('open-popup');
        return false;
    });

    $('.popup-succes-cross').on('click', function() {
        $('.popup-succes-wrapp').removeClass('open-popup');
        return false;
    });



    /*Динамическая подсветка пунктов меню*/

    $(window).scroll(function() {
        $('.magic').each(function() {
            var window_top = $(window).scrollTop();
            var div_top = $(this).offset().top;
            var div_1 = $(this).attr('id');
            if (window_top > div_top - 120) {
                $('.header-menu').find('li').removeClass('menu-active');
                $('.header-menu').find('li[class="' + div_1 + '"]').addClass('menu-active');
            } else {
                $('.header-menu').find('li[class="' + div_1 + '"]').removeClass('menu-active');
            };
        });
    });

    // spincrement

    $(document).ready(function() {
        var show = true;
        var countbox = "#spincrement";
        $(window).on("scroll load resize", function() {
            if (!show) return false;
            var w_top = $(window).scrollTop();
            var e_top = $(countbox).offset().top;
            var w_height = $(window).height();
            var d_height = $(document).height();
            var e_height = $(countbox).outerHeight();
            if (w_top + 1000 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
                $(".spincrement").spincrement({
                    thousandSeparator: "",
                    duration: 5000
                });
                show = false;
            }
        });
    });

    /*календарь*/

    $(document).ready(function($) {
        var currentDate = new Date();
        $('.contact-send-data').datepicker({
            dateFormat: 'mm-dd-yy',
            minDate: currentDate,
            onSelect: function(dateText) {
                $('.contact-send-data').val(dateText);
            }
        });
    });

    //form

    $('form').submit(function(e) {
        var thisForm = $(this);
        var form = $('form');
        var submitBtn = thisForm.find('input[type="submit"]');
        var data = new FormData(thisForm[0]);
        submitBtn.prop("disabled", true);
        $.ajax({
            url: 'mail.php',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            type: 'POST',
            success: function(data) {
                thisForm[0].reset();
                form[0].reset();
                submitBtn.prop("disabled", false);
                $('.popup-succes-wrapp').addClass('open-popup');
                $(dataLayer.push({ 'event': 'event_lendos' }));
            },
            error: function() {
                alert('Something went wrong!');
                submitBtn.prop("disabled", false);
            }
        });
        e.preventDefault();
    });

    /*передает данные о локации, услугах и дате в форму*/
    $(document).ready(function($) {

        $('.home-button').on("click", function(event) {
            var home_from = $(".home-from").val();
            var home_to = $(".home-to").val();
            var pop_up_moving_from = $(".pop-up-moving-from");
            var pop_up_moving_to = $(".pop-up-moving-to");
            pop_up_moving_from.val(home_from);
            pop_up_moving_to.val(home_to);
        });
    });
});