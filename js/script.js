// when document (webpage)is ready -> the code below will be activated
$(window).on("load", function() {

    $(".loader .inner").fadeOut(1000, function () {
      $(".loader").fadeOut(750);
    });
});


$(document).ready(function() {
  // call superslides
  $('#slides').superslides({
      animation : 'fade',
      // fade the img every 4000 miliseconds (4 seconds)
      play: 4000,
      pagination: false,
  });

  // call typed.js
  var typed = new Typed(".typed", {
    strings: ["Software Engineer", "Mobile Application Developer", "Fullstack Web Developer", "Junior College Student"],
    typeSpeed: 70,
    loop: true,
    startDelay: 1000,
    showCursor: false
  });

  //call owlCarousel - skills slides
  $('.owl-carousel').owlCarousel({
      loop:true,
      // margin:10,
      // nav:true,
      items: 4,
      responsive:{
        // from 0px - 480px: show 2 items
          0:{
              items:1
          },
          // half screen
          480:{
              items:2
          },
          768:{
              items:3
          },
          // >= 2/3 screen
          938:{
              items:4
          }
      }
  });


    // offset function get the position of a section vertically or horizontally
    // get the position of the top part only
    var skillsTopOffset = $(".skillsSection").offset().top;
    var statsTopOffset = $(".statsSection").offset().top;
    var countUpFinished = false;
    $(window).scroll(function(){

        if (window.pageYOffset > skillsTopOffset - $(window).height() + 250){
          // call easypiechart

            $('.chart').easyPieChart({
                  //your options goes here
                  easing: 'easeInOut',
                  barColor: 'white',
                  trackColor: false,
                  scaleColor: false,
                  lineWidth: 4,
                  size: 152,
                  onStep: function(from, to, percent) {
                    // this.el = this current element
                    $(this.el).find('.percent').text(Math.round(percent));
                  }
            });
        }
          // countUp
          if ( !countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 250) {
              $(".counter").each(function () {

                var element = $(this);
                var endVal = parseInt (element.text());

                element.countup(endVal);
              })
            countUpFinished = true;

        }
    });

    // isotope
    $(".items").isotope({
        filter: "*",
        animatiomOptions: {
          duration: 1500,
          easing: 'linear',
          queue: false
        }
    });

    $("#filters a").click(function(){

        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animatiomOptions: {
              duration: 1500,
              easing: 'linear',
              queue: false
            }
        });

        return false;

    });
    // $("[data-fancybox]").fancybox();
    $('[data-fancybox="images"]').fancybox({
          buttons : [
            'slideShow',
            'share',
            'zoom',
            'fullScreen',
            'close'
          ],
          thumbs : {
            autoStart : true
          },
          animationEffect: "zoom",
          transitionEffect:"circular",

    });



    const nav = $("#narvigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation () {

        var body = $("body");

        if ($(window).scrollTop() >= navTop ){
          body.css("padding-top",nav.outerHeight() + "px");
          body.addClass("fixedNav");

        } else {
          body.css("padding-top", 0);
          body.removeClass("fixedNav");
        }
    };

    // smooth transition between links in navbar
    $("#narvigation li a").click(function(e) {
        e.preventDefault();

        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({ scrollTop: targetPosition  - 50}, "slow");

    });



});
