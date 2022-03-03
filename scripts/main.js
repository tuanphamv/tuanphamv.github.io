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
                "background-color": "#13183E",
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

            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                $(".navigation .navigation__link.active").removeClass("active");
                $(".navigation .navigation__link[dataScroll='menu6']").addClass("active");
            }

            normalNav();
        })
        .scroll();

    $(".menu-mobile").on("click", function (e) {
        $(".mobile__menu--wrapper").toggleClass("active");
    });

    $("#goToEvent").click(function() {
        $("html, body")
            .stop()
            .animate(
            {
                scrollTop: $("#menu3").offset().top,
            },
            500,
            function () {
                location.hash = target; //attach the hash (#jumptarget) to the pageurl
            }
        );
    });

    $(".slide-index").click(function () {
        $(".slide-index").removeClass('active');
        $(this).addClass('active');
        swiperIntro.slideTo($(this).index() + 1, 300, false);
    });
});

var wow = new WOW({
    animateClass: "animated",
    offset: 0,
});
wow.init();

var swiperIntro = new Swiper(".swiper-intro", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 30,
    autoplay: false,
});

swiperIntro.on('slideChange', function (e) {
    let index = swiperIntro.realIndex;
    $(".slide-index").removeClass("active");
    $(".slide-index").eq(index).addClass("active");
});

var swiperPeople = new Swiper(".swiper-people", {
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 0,
    navigation: {
        nextEl: "#peopleNext",
        prevEl: "#peoplePrev",
      },
});

var swiperCampus = new Swiper(".swiper-campus", {
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 30,
    navigation: {
        nextEl: "#campusNext",
        prevEl: "#campusPrev",
      },
});

var swiperProject = new Swiper(".swiper-project", {
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 30,
    navigation: {
        nextEl: "#projectNext",
        prevEl: "#projectPrev",
      },
});

function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function(e) {
            $('.name-file').text(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    }
}
