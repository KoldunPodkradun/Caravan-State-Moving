$(document).ready(function($) {
    var windowEl = $(window);
    var windowW = windowEl.width();
    var beforeWidth = $(this).width();

    // обновление страницы при масштабировании
    $(window).resize(function() {
        var afterWidth = $(this).width();
        if (afterWidth != beforeWidth) {
            location.reload()
        }
    })

    if (windowW < 991) {
        $('.about-item').on('click', function() {
            $(this).children().next().stop().slideToggle(500).parents('.about-item').toggleClass('active');
        });
    } else {
        var servItems = $('.about-item');
        servItems.on('mouseout', function() {
            $(this).find('.about-item-descr').stop().slideUp(500);
        });
        servItems.on('mouseover', function() {
            $(this).find('.about-item-descr').stop().slideDown(500);

        });
    }

    if (windowW < 767) {
        $('.advantages-items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
        $('.reviews-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
        $('.works-items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
    } else if (windowW < 991) {
        $('.reviews-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
        $('.works-items').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
        $('.advantages-items').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
    } else if (windowW < 1050) {
        $('.advantages-items').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
        $('.reviews-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 2,
        });
        $('.works-items').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
    } else if (windowW < 1199) {
        $('.advantages-items').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
        $('.reviews-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
        });
    } else {
        $('.reviews-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
        });
    }

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