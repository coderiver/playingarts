$(document).ready(function() {
	$('.header__gotocards').click(function(event) {
		var pos = $('.cards').offset();
		$('body').animate({ scrollTop: pos.top },800);
		e.preventDefault();
	});
	$('.scrolltotop').click(function(event) {
		$('body').animate({ scrollTop: 0 },800);
		e.preventDefault();
	});
	var windowheight = $(window).height();
	$(window).scroll(function() {

    var height = $(window).scrollTop();

    if(height  > windowheight) {
        $('body').addClass('is-bottom');
    }
    else{
    	$('body').removeClass('is-bottom');
    }
});
});