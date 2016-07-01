(function ($, _) {
  var curVideoEl = null;

  $('.nav-tab').on('click', function(ev) {
    $(this).addClass('selected').siblings().removeClass('selected');
  });

  $('.view.videos').on('click', '.item .bgvid', function(ev) {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  });

  $('.view.videos .videos-container').on('click', '.btnLike', function(ev) {
    $(this).toggleClass('liked');
  });

  $.ajax({
    dataType: 'json',
    url: 'js/videos.json',
    data: {},
    success: function(data) {
      var template = $('#tmplt_item').html();

      var list = '';
      for (i = 0; i < data.length; i++) {
        list += _.template(template)(data[i]);
      }
      $('.view.videos .videos-container').append(list);
      curVideoEl = $('.view.videos .videos-container .bgvid')[0];

      $.scrollify({
        target: ".view.videos",
        section : ".videos-container .item",
        sectionName : false,
        interstitialSection : "",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        before:function(index, sections) {
          // $('.view.videos .videos-container .item').eq(index).addClass('selected').siblings().removeClass('selected');
          curVideoEl.pause();
          curVideoEl = $('.view.videos .videos-container .bgvid')[index];
          curVideoEl.play();
        },
        after:function(index, sections) {
          // curVideoEl = $('.view.videos .videos-container .bgvid')[index];
          // curVideoEl.play();
        },
        afterResize:function() {},
        afterRender:function() {}
      });

      // $(".videos-container").onepage_scroll({
      //    sectionContainer: ".item",     // sectionContainer accepts any kind of selector in case you don't want to use section
      //    easing: "linear",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
      //                                     // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
      //    animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
      //    pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
      //    updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
      //    beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
      //    afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
      //    loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
      //    keyboard: true,                  // You can activate the keyboard controls
      //    responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
      //                                     // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
      //                                     // the browser's width is less than 600, the fallback will kick in.
      //    direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
      // });

      // $('.view.videos').slick({
      //   vertical: true,
      //   verticalSwiping: true,
      //   arrows: false,
      //   mobileFirst: true
      // });

      //TODO: carousel
    }
  });
})(jQuery, _);