$(document).ready(function () {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: {
        },
        thumbs: {
          swiper: swiper,
        },
      });
});

var wow = new WOW({
    animateClass: "animated",
    offset: 0,
});
wow.init();
