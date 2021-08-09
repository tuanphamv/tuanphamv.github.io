$(document).ready(function () {
    var menuHeight = $("#section-menu").height()
    $(".navigation__link").bind("click", function (e) {
        e.preventDefault(); // prevent hard jump, the default behavior

        var target = $(this).attr("dataScroll"); // Set the target as variable
        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        if ($("#" + target).offset()) {
            console.log($("#" + target).offset().top);
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $("#" + target).offset().top,
                    },
                    500,
                    function () {
                        location.hash = target; //attach the hash (#jumptarget) to the pageurl
                    }
                );
        }

        return false;
    });
    function equaliseIt() {
        $(".swiper-wrapper").each(function () {
            var highestBox = 0;
            $(".fpt__event--item", this).each(function () {
                if ($(this).height() > highestBox)
                    highestBox = $(this).height();
            });

            $(".fpt__event--item", this).height(highestBox);
        });
    }

    //call the function at page load
    equaliseIt();
    $("#slider1").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });
    var swiper = new Swiper("#slider2", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            767: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });

    var normalNavTop = $("#section-menu").offset().top;
    var normalNav = function () {
        var scrollTop = $(window).scrollTop();
        // Kondisi jika discroll maka .nav ditambahkan class normal dan sebaliknya
        if (scrollTop > normalNavTop) {
            $("#section-menu").css({
                position: "fixed",
                top: 0,
                left: 0,
                "z-index": 9999,
                width: "100%",
                "background-color": "#0F1E23",
            });
        } else {
            $("#section-menu").css({
                position: "relative",
                "background-color": "transparent",
            });
        }
    };

    $(window)
        .scroll(function () {
            var scrollDistance = $(window).scrollTop();
            // Show/hide menu on scroll
            //if (scrollDistance >= 850) {
            //		$('nav').fadeIn("fast");
            //} else {
            //		$('nav').fadeOut("fast");
            //}

            // Assign active class to nav links while scolling
            $(".page-section").each(function (i) {
                if ($(this).position().top <= scrollDistance + 10) {
                    $(".navigation .navigation__link.active").removeClass("active");
                    $(".navigation .navigation__link[dataScroll='" + $(this).attr("id") +"']").addClass("active");
                }
                if (scrollDistance < menuHeight) {
                    $(".navigation .navigation__link.active").removeClass("active");
                    $(".navigation .navigation__link[dataScroll='menu1']").addClass("active"); 
                }
            });
            normalNav();
        })
        .scroll();

    $(".menu-mobile").on("click", function (e) {
        $(".mobile__menu--wrapper").toggleClass("active");
    });
});

var wow = new WOW({
    animateClass: "animated",
    offset: 0,
});
wow.init();
