
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

jQuery(function ($) {
  "use strict";

  jQuery(document).ready(function ($) {
    $(".counter").counterUp({
      delay: 20,
      time: 5000,
    });

    mainSlider();
    blogGridSlider();
    parallaxEffect();

    $(window).on("scroll", function () {
      progress_bars();

      var theta = ($(window).scrollTop() / 200) % Math.PI;
      $(
        ".hexagon-gradient-left, .triangle-light-blue, .virus-box-1, .virus-box-2"
      ).css({ transform: "rotate(" + theta + "rad)" });
    });

    function progress_bars() {
      $(".progress .progress-bar:in-viewport").each(function () {
        if (!$(this).hasClass("animated")) {
          $(this).addClass("animated");
          $(this).width($(this).attr("data-width") + "%");
        }
      });
    }

    function mainSlider() {
      $(".default-slider").slick({
        dots: true,
        infinite: true,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "0",
        arrows: false,
        pauseOnHover: false,
      });
    }

    function blogGridSlider() {
      $(".blog-grid-slider").slick({
        dots: false,
        infinite: true,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "0",
      });
    }

    $("a.page-scroll").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 50,
          },
          1000,
          "easeInOutExpo"
        );
      event.preventDefault();
    });

    function parallaxEffect() {
      $(".parallax-effect").parallax();
    }

    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };

    jQuery(window).stellar({
      horizontalScrolling: false,
      hideDistantElements: true,
      verticalScrolling: !isMobile.any(),
      scrollProperty: "scroll",
      responsive: true,
    });

    $(window).on("load", function () {
      var wow = new WOW({
        offset: 100,
        mobile: false,
      });
      wow.init();

      $("#chaos-gallery").cubeportfolio({
        filters: "#chaos-gallery-filter",
        layoutMode: "grid",
        defaultFilter: "*",
        animationType: "frontRow",
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: "",
        mediaQueries: [
          {
            width: 1500,
            cols: 5,
          },
          {
            width: 1100,
            cols: 4,
          },
          {
            width: 800,
            cols: 3,
          },
          {
            width: 480,
            cols: 2,
          },
          {
            width: 320,
            cols: 1,
          },
        ],
        caption: "overlayBottomAlong",
        displayType: "bottomToTop",
        displayTypeSpeed: 300,
      });
    });

    $(".image-lightbox").magnificPopup({
      type: "image",
      mainClass: "mfp-fade",
      removalDelay: 160,
      fixedContentPos: false,
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  });

  $(window).on("load", function () {
    $("#loader-overlay").delay(500).fadeOut();
    $(".loader").delay(500).fadeOut("slow");

    $(window).trigger("scroll");
    $(window).trigger("resize");

    if (window.location.hash) {
      var hash_offset = $(window.location.hash).offset().top;
      $("html, body").animate({
        scrollTop: hash_offset,
      });
    }
    
  });
});
