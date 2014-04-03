'use strict';

window.mobile = 'ontouchend' in document;

requirejs.config({
    paths: {
        'jquery': 'jquery'
    },
    
    shim: {
        'jquery': {
            exports: '$'
        },
        
        'underscore': {
            exports: '_'
        },
        
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
    }
});

requirejs(['backbone'], function (Page) {
    
//    if (!window.location.hash) window.location.hash = '#!/';
    
    //Slides.init();

    
    var Router = Backbone.Router.extend({
        'routes': {
            'about/': 'render',
            'cards/': 'render',
            'cards/:slug/': 'render',
            'cards/:slug/info/': 'render',
            'support/': 'render',
            'news/': 'page',
            'thanks/': 'thanks',
            'partners/': 'page',
            'press-info/': 'page',
            'contact/': 'page',
            'yeah/': 'page',
            'submit/': 'page',
            
            '*actions': 'home'
        },
        
        'hide': function () {
            Page.hide();
            Card.hide();
            Card.onArtistClose();
            Thanks.hide();
        },
        
        'render': function (slug, page) {
            if (!page) page = window.location.pathname.split('/')[1].split('/')[0];
            var index = $('#' + page).index();
            Slides.animate(index);
            this.hide();
            
            if (page == 'home') {
                $('header').removeClass('scrolled');
                $('#prev').attr('href', false);
                $('#next').add('#arrow').attr('href', '/about/');
                $('#arrow').removeClass('last');
                $('#nav').children().removeClass('active').filter('[href="/"]').addClass('active');
                $('.brand').addClass('hidden');
            }
            
            if (page == 'about') {
                $('header').removeClass('scrolled');
                $('#prev').attr('href', '/');
                $('#next').add('#arrow').attr('href', '/cards/');
                $('#arrow').removeClass('last');
                $('#nav').children().removeClass('active').filter('[href="/about/"]').addClass('active');
                $('.brand').removeClass('hidden');
            }
            
            if (page == 'cards') {
                $('#cards').find('.scroller').trigger('scroll');
                $('#prev').attr('href', '/about/');
                $('#next').add('#arrow').attr('href', '/support/');
                $('#arrow').removeClass('last');
                $('#nav').children().removeClass('active').filter('[href="/cards/"]').addClass('active');
                if (slug) Card.show(slug + '/');
                if (window.location.pathname.split('/')[3] == 'info') Card.onArtist(slug + '/');
                $('.brand').removeClass('hidden');
            }
            
            if (page == 'support') {
                $('header').removeClass('scrolled');
                $('#prev').attr('href', '/cards/');
                $('#next').attr('href', false);
                $('#arrow').addClass('last').attr('href', '/');
                $('#nav').children().removeClass('active').filter('[href="/support/"]').addClass('active');
                $('.brand').removeClass('hidden');
            }
            
            this.referrer = window.location.pathname;
        },
        
        'home': function () {
            this.render(false, 'home');
        },
        
        'page': function () {
            $('header').removeClass('scrolled');
            this.hide();
            var page = window.location.pathname.split('/')[1].split('/')[0];
            console.log(page);
            Page.open(page);
            this.referrer = window.location.pathname;
        }
    });
    
    require.router = new Router();
    Backbone.history.start({pushState: true});
    
    $(function () {
        $('#loader').animate({opacity: 0}, function () {
            $(this).hide();
        });
    });
    
    $(document).on(window.mobile ? 'touchend' : 'click', 'a:not([data-bypass])', function (e) {
        var href = $(this).attr("href"),
            protocol = this.protocol + "//";
    
        if (href && href.slice(0, protocol.length) !== protocol && href.indexOf("javascript:") !== 0) {
            e.preventDefault();
            Backbone.history.navigate(href, true);
        }
    });
});