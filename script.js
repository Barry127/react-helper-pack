(function (window) {

  var $nav = $('nav');

  // menu scroll animation
  $('nav a').on('click', function (ev) {
    if (ev.which === 2) return; // no scroll animation on scroll btn

    var $this = $(this);
    var target = $this.attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 200);
  });

  // all menu items
  var items = $nav.find('a').map(function () {
    var $item = $($(this).attr('href'));
    if ($item.length) {
      return $item;
    }
  });

  var first = $nav.find('a').first().attr('href');

  function highlightActiveMenuItem (scrollTop) {
    var activeHref = first.substring(1);
    for (var i = 0; i < items.length; i++) {
      if ($(items[i]).offset().top < (scrollTop + 1)) {
        activeHref = items[i].attr('id');
      } else {
        break;
      }
    }

    $nav.find('a').removeClass('active').filter('[href="#' + activeHref + '"]').addClass('active');
  }

  highlightActiveMenuItem($(window).scrollTop());

  $(window).on('scroll', function (ev) {
    var $this = $(this);
    var scrollTop = $this.scrollTop();

    if (scrollTop > 100) {
      $nav.css('margin-top', scrollTop - 120);
    } else {
      $nav.css('margin-top', 0);
    }

    highlightActiveMenuItem(scrollTop + 20);
  });

})(window);
