$(document).ready(function() {

  // variables
  var header_go = $('.header__go-cards'),
      body = $('body'),
      go_top = $('.go-top'),
      window_height = $(window).height(),
      nav = $('.nav'),
      nav_list = nav.find('.nav__list'),
      wrapper = $('.wrapper'),
      nav_link = nav_list.find('a'),
      back = nav.find('.nav__icon'),
      page = $('.page'),
      card = $('.card'),
      cards = $('.cards'),
      slider = $('.slider'),
      slider_prev = $('.slider__prev'),
      slider_next = $('.slider__next'),
      slider_title = slider.find('.title'),
      view_card = slider.find('.view__card'),
      view = slider.find('.view'),
      lazy_load_pic = $('img.lazy-load'),
      author = $('.author'),
      people = $('.people'),
      people_name = people.find('.people__name'),
      people_photo = people.find('.people__photo'),
      people_about = people.find('.people__about'),
      people_interview = people.find('.people__interview'),
      people_site = people.find('.people__site'),
      people_twitter = people.find('.socials__twitter'),
      people_facebook = people.find('.socials__facebook'),
      people_pinterest = people.find('.socials__pinterest'),
      people_instagram = people.find('.socials__instagram');

  // header button go to cards
	header_go.on('click', function(event) {
		var pos = cards.offset();
		body.animate({ scrollTop: pos.top },800);
		event.preventDefault();
	});

  // go top button
	go_top.on('click', function(event) {
		body.animate({ scrollTop: 0 },800);
		event.preventDefault();
	});

  // show & hide go top arrow
	$(window).scroll(function() {
    var height = $(window).scrollTop();
    if(height  > window_height) {
      body.addClass('is-bottom');
    }
    else{
      body.removeClass('is-bottom');
    }
  });

  //tabs
  nav_link.on('click', function() {
    nav.addClass('is-visible');
    back.addClass('is-back');
    page.hide();
    wrapper.hide();
    page.empty().append("<div id='loading'>Load...</div>");
    nav_link.removeClass('is-active');
    $(this).addClass('is-active');
    $.ajax({ 
      url: this.href, 
      success: function(html) {
        page.empty().append(html);
        page.fadeIn();
      }
    });
    return false;
  });

  // back
  back.on('click', function(){
    if ($(this).hasClass('is-back')) {
      nav.removeClass('is-visible');
      nav_link.removeClass('is-active');
      back.removeClass('is-back');
      wrapper.fadeIn();
      page.hide();
    };
    if ($(this).hasClass('is-close')) {
      slider.hide();
      back.removeClass('is-close');
      wrapper.fadeIn();
      nav_list.show();
    };
    if ($(this).hasClass('is-close-dark')) {
      $(this).addClass('is-close');
      back.removeClass('is-close-dark');
      slider.removeClass('is-dark');
      people.hide();
      view.fadeIn();
    };
  });

  // card list
  card.on('click', function(){
    var card_pic = $(this).attr('href'),
        card_author = $(this).find('.card__author').html(),
        author_name = $(this).find('.author__name').html(),
        author_photo = $(this).find('.author__photo').html(),
        author_about = $(this).find('.author__about').html(),
        author_interview = $(this).find('.author__interview').html(),
        author_site_link = $(this).find('.author__site-link').html(),
        author_site_title = $(this).find('.author__site-title').html(),
        author_twitter = $(this).find('.author__twitter').html(),
        author_facebook = $(this).find('.author__facebook').html(),
        author_pinterest = $(this).find('.author__pinterest').html(),
        author_instagram = $(this).find('.author__instagram').html();

    slider_title.html(card_author);
    view_card.html('<img src='+card_pic+' />');

    people_name.html(author_name);
    people_photo.html('<img src='+author_photo+' />');
    people_about.html(author_about);
    people_interview.attr('href', author_interview);
    people_site.attr('href', author_site_link);
    people_site.html(author_site_title);
    people_twitter.attr('href', author_twitter);
    people_facebook.attr('href', author_facebook);
    people_pinterest.attr('href', author_pinterest);
    people_instagram.attr('href', author_instagram);

    $(this).addClass('is-active');
    wrapper.hide();
    nav_list.hide();
    if (slider.hasClass('is-dark')) {
      people.show();
      view.hide();
    }
    else{
      back.addClass('is-close');
      people.hide();
      view.show();
    }
    slider.fadeIn(); 
    return false;
  });

  // people
  view_card.on('click', function(){
    slider.addClass('is-dark');
    view.hide();
    back.removeClass('is-close');
    back.addClass('is-close-dark');
    people.fadeIn();
  });

  // slider prev & next
  slider_next.on('click', function(){
    var card_act = cards.find('.card.is-active'),
        card_next = card_act.next();
    card_act.removeClass('is-active');
    card_next.addClass('is-active');
    if (card_next.length) {
      card_next.trigger('click');
    }
    else{
      card.first().trigger('click');
    };
  });

  // lazy load cards
  if (lazy_load_pic.length) {
    lazy_load_pic.lazyload({effect : "fadeIn"});
  };
  
  // main slider paralax effect
  $('div[data-type="background"]').each(function(){
    var $bgobj = $(this); // создаем объект
    $(window).scroll(function() {
      var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
      var coords = 'center '+ yPos + 'px';
      $bgobj.css({ backgroundPosition: coords });
    });
  });


});