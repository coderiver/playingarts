$.preloadImages = function(){
  for(var i = 0; i<arguments.length; i++){
    $('<img />').attr('src', arguments[i]);
  }
}

//document ready
$(document).ready(function() {

  // variables
  var header_go = $('.header__go-cards'),
      site = $('.site'),
      preloader = $('.preloader'),
      body = $('body'),
      go_top = $('.go-top'),
      window_height = $(window).height(),
      nav = $('.nav'),
      nav_list = nav.find('.nav__list'),
      wrapper = $('.wrapper'),
      link_page = $('.load-page'),
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
      interview = $('.interview'),
      interview_card = $('.interview__card'),
      people = $('.people'),
      people_name = people.find('.people__name'),
      people_photo = people.find('.people__photo'),
      people_about = people.find('.people__about-in'),
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
    var scroll_top = $(window).scrollTop();
    if(scroll_top  > window_height) {
      body.addClass('is-bottom');
    }
    else{
      body.removeClass('is-bottom');
    }
  });

  //tabs
  $(document).on('click', 'a.load-page', function(){
    nav.addClass('is-visible');
    back.addClass('ajax is-back');
    back.attr('href', '/');
    page.hide();
    wrapper.hide();
    page.empty().append("<div id='loading'>Load...</div>");
    link_page.removeClass('is-active');
    $(this).addClass('is-active');
    var page_item = $(this).attr('data-page');
    if ($(this).hasClass('people__interview')) {
      back.removeClass('is-close-dark');
      back.addClass('is-close');
    };
    $.ajax({ 
      url: page_item, 
      success: function(html) {
        page.empty().append(html);
        page.fadeIn();
      }
    });
  });

  // back
  back.on('click', function(){
    if ($(this).hasClass('is-back')) {
      nav.removeClass('is-visible');
      link_page.removeClass('is-active');
      back.removeClass('is-back');
      wrapper.fadeIn();
      page.hide();
    };
    if ($(this).hasClass('is-close')) {
      slider.hide();
      back.removeClass('ajax is-close');
      back.removeAttr('href');
      wrapper.fadeIn();
      nav_list.show();
    };
    if ($(this).hasClass('is-close-dark')) {
      $(this).addClass('ajax is-close');
      back.removeClass('is-close-dark');
      back.attr('href', '/');
      slider.removeClass('is-dark');
      people.hide();
      view.fadeIn();
    };
  });

  // card list
  card.on('click', function(){
    var card_pic = $(this).attr('data-img'),
        card_author = $(this).find('.card__author').html(),
        author_name = $(this).find('.author__name').html(),
        author_photo = $(this).find('.author__photo').html(),
        author_about = $(this).find('.author__about').html(),
        author_interview_link = $(this).find('.author__interview-link').html(),
        author_interview_page = $(this).find('.author__interview-page').html(),
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
    people_interview.attr('href', author_interview_link);
    people_interview.attr('data-page', author_interview_page);
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
      back.removeClass('ajax');
      back.removeAttr('href');
    }
    else{
      back.addClass('ajax is-close');
      back.attr('href', '/');
      people.hide();
      view.show();
    }
    slider.fadeIn(); 
  });

  // people
  view_card.on('click', function(){
    slider.addClass('is-dark');
    view.hide();
    back.removeClass('ajax is-close');
    back.removeAttr('href');
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
  slider_prev.on('click', function(){
    var card_act = cards.find('.card.is-active'),
        card_prev = card_act.prev();
    card_act.removeClass('is-active');
    card_prev.addClass('is-active');
    if (card_prev.length) {
      card_prev.trigger('click');
    }
    else{
      card.last().trigger('click');
    };
  });

  // lazy load cards
  if (lazy_load_pic.length) {
    lazy_load_pic.lazyload({
      effect : "fadeIn"
    });
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

  //preloader
  site.hide();
  $.preloadImages('../img/1.jpg', '../img/2.jpg', '../img/3.jpg', function(){
    preloader.hide();
    site.show();
  });

  // history
  console.log(location);
  console.log(history.state);
  // ищем все ссылки и вешаем события на все ссылки в нашем документе
  $(document).on('click', 'a.ajax', function() {
      // заносим ссылку в историю
      history.pushState(null, null, this.href);


      // тут можете вызвать подгрузку данных и т.п.


      // не даем выполнить действие по умолчанию
      return false;
  });

  // вешаем событие на popstate которое срабатывает при нажатии back/forward в браузере
  $(window).on('popstate', function(e) {

      // получаем нормальный объект Location

      /*
      * заметьте, это единственная разница при работе с данной библиотекой,
      * так как объект document.location нельзя перезагрузить, поэтому
      * библиотека history возвращает сформированный "location" объект внутри
      * объекта window.history, поэтому получаем его из "history.location".
      * Для браузеров поддерживающих "history.pushState" получаем
      * сформированный объект "location" с обычного "document.location".
      */
      var returnLocation = history.location || document.location;

      // тут можете вызвать подгрузку данных и т.п.


      // просто сообщение
      //alert("Мы вернулись на страницу со ссылкой: " + returnLocation.href);
  });

});