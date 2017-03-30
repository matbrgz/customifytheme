/**
 * @version    1.0
 * @package    Ninja
 * @author     WooRockets Team <support@woorockets.com>
 * @copyright  Copyright (C) 2014 WooRockets.com. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Websites: http://www.woorockets.com
 */

(function($) {
	"use strict";
	$(document).ready(function() {

		/*  [ Detecting Mobile Devices ]
		- - - - - - - - - - - - - - - - - - - - */
		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
			},
			Desktop: function() {
				return window.innerWidth <= 960;
			},
			any: function() {
				return ( isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.Desktop() );
			}
		};

		/*  [ prettyPhoto ]
		- - - - - - - - - - - - - - - - - - - - */
		$("a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed:'normal',
			theme:'light_square',
			slideshow:3000,
			social_tools: false,
		});

		/*  [ Tabs ]
		- - - - - - - - - - - - - - - - - - - - */
		$('.tabs li a').click(function(e){
			e.preventDefault();
			var selector = $(this).attr('href');
			$(this).parent().parent().find('a').not(this).removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs-container').find('.tab-content').not(selector).fadeOut(300);
			$(this).parents('.tabs-container').find(selector).fadeIn(300);
		});

		/*  [ Accordion ]
		- - - - - - - - - - - - - - - - - - - - */
		$('#accordion .panel-header').click(function(){
			$(this).parents('#accordion').find('.panel-body').slideUp(300);
			$(this).parent().find('.panel-body').slideToggle(300);
		});

		/*  [ Sidebar scroll ]
		- - - - - - - - - - - - - - - - - - - - */
		$('.site-content').scroll(function(){
			var pos = $(this).scrollTop();
			$('.sidebar').css('top', pos);
		});

		/*  [ add animation main menu ]
		- - - - - - - - - - - - - - - - - - - - */
		$('#menu-main > li').each(function(index){
			$(this).addClass('animation-element fast');
		});
		$('.cd-contact-info').addClass('animation-element fast');

		$('.cd-navigation-wrapper .animation-element').each(function(index){
			$(this).attr('data-delay', index*200 + 300);
		});

		/*  [ Click show/hide sub menu ]
		- - - - - - - - - - - - - - - - - - - - */
		$('#menu-main > li.has-children > a').click(function(event){
			event.preventDefault();
			$(this).parent().find('> .sub-menu').slideToggle();
		});

		/*  [ Tabs right footer ]
		- - - - - - - - - - - - - - - - - - - - */
		$(document).on( 'click', '.more-inner-footer .tab li', function(event){
			event.preventDefault();
			var selector = $(this).find('a').attr('href');
			$(this).parent().find('a').not(this).removeClass('active');
			$(this).find('a').addClass('active');
			setTimeout(function(){
				$(selector).find('form input[type="text"]').focus();
			}, 700);

			if($('.has-children-show').length){		
				$(this).parents('.more-inner-footer').find('.tab-content').not(selector).fadeOut(100).removeClass('in-right');
				$(this).parents('.more-inner-footer').find(selector).fadeIn().addClass('in-right');
			}else{
				$(this).parents('.more-inner-footer').css('top', "-"+$(selector).outerHeight()+"px");
				$(this).parents('.more-inner-footer').addClass('has-children-show');
				$(this).parents('.more-inner-footer').find('.tab-content').not(selector).fadeOut(100);
				$(this).parents('.more-inner-footer').find(selector).addClass('in-right').fadeIn(100);
			};
			
			$('#mask-blur').fadeIn(100);
		});
		$('#mask-blur').click(function(){
			$('.more-inner-footer').css('top', 0).removeClass('has-children-show');
			$('.more-inner-footer .tab-content').hide().removeClass('out-left in-right');
			$(this).fadeOut(100);
			$('.more-inner-footer .tab li a').removeClass('active');
		});

		if($('#search-box form input[type="text"]').val() != ''){
			$('#search-box form label').hide();
		}
		$('#search-box form input[type="text"]').keydown(function(){
			$(this).parent().find('label').hide();
		});
		$('#search-box form input[type="text"]').blur(function(){
			if($(this).val() == ''){
				$(this).parent().find('label').show();
			}			
		});

		/*  [ Set height main content ]
		- - - - - - - - - - - - - - - - - - - - */
		$('.site-content, .shop-sidebar, .sidebar').css('height', $(window).height() - $('.site-footer').outerHeight() + 'px');
		$(window).resize(function(){
			$('.site-content, .shop-sidebar, .sidebar').css('height', $(window).height() - $('.site-footer').outerHeight() + 'px');
		});

		/*  [ Set height childrent post item ]
		- - - - - - - - - - - - - - - - - - - - */
		function height_child_of_post(){
			var img_max_height = 0;
			$('.site-main .post').each(function(){
				var img_height = $(this).find('.entry-thumb > a > img').outerHeight();
				if(img_height > img_max_height){
					img_max_height = img_height;
				}
			});
			$('.site-main .post .entry-thumb iframe, .site-main .post .entry-thumb').css('height', img_max_height);
		}
		height_child_of_post();
		$(window).resize(function(){
			height_child_of_post();
		});

		/*  [ Advance filter shop page ]
		- - - - - - - - - - - - - - - - - - - - */
		$(document).on( 'click', '.filter-title', function(){
			$(this).parents('.site-content').find('.shop-sidebar').addClass('show').parent().addClass('margin');
			$(this).parents('.site-content').find('.mask-shop-sidebar').fadeIn(700);
		});
		$(document).on( 'click', '.filter-close', function(){
			$(this).parents('.site-content').find('.shop-sidebar').removeClass('show').parent().removeClass('margin');
			$(this).parents('.site-content').find('.mask-shop-sidebar').fadeOut(700);
		});
		$(document).on( 'click', '.mask-shop-sidebar', function(){
			$(this).parents('.site-content').css('margin-left', 0);
			$(this).parents('.site-content').find('.shop-sidebar').removeClass('show').parent().removeClass('margin');
			$(this).fadeOut(700);
		});

		/*  [ put featured product up the first ]
		- - - - - - - - - - - - - - - - - - - - */
		$('.products .product.featured').each(function(){
			$(this).prependTo($(this).parent());
		});

		function featured_product(){
			var featured_fist = $('.products .product.featured').first();
			var product_next = $(featured_fist).next().height();
			var featured_info_w = $(featured_fist).find('.product-info').outerHeight();
			if(product_next > 0){
				$(featured_fist).find('.product-image').css({
					height: (product_next*2 - featured_info_w + 20),
				});
			}
		};

		featured_product();	

		$(window).resize(function(){
			featured_product();
		});

		/*  [ Pagination slider ]
		- - - - - - - - - - - - - - - - - - - - */
		$('.post-wrap').parent().owlCarousel({
			navigation : false,
			pagination: true,
			items : 4,
			itemsDesktop : [1170,3],
			itemsTablet: [768,2],
			itemsMobile: [540,1],
			autoPlay:false,
			afterAction: function() {
				height_child_of_post();
			} 
		});

		$('.inner-shop').owlCarousel({
			navigation : false,
			pagination: true,
			itemsCustom : [
	            [0, 1]
	        ],
	        autoHeight: true,
			autoPlay:false,
			afterAction: function() {
				height_child_of_post();
				featured_product();
			} 
		});

		/*  [ product related responsive ]
		- - - - - - - - - - - - - - - - - - - - */
		if($(window).width() <= 1024){
			$('.shop-single-content .product-related').appendTo('.shop-single-content');
		}
		$(window).resize(function(){
			if($(window).width() <= 1024){
				$('.shop-single-content .product-related').appendTo('.shop-single-content');
			}else{
				$('.shop-single-content .product-related').appendTo('.shop-single-content .summary');
			}
		});

		/*  [ Login and register popup ]
		- - - - - - - - - - - - - - - - - - - - */
		$('.login-register a').on('click', function(e){
			e.preventDefault();
			var tag = $(this).attr('href');
			$('.acc-mask').addClass('show');
			$('.acc-mask').find( 'form' ).hide();
			$('.acc-mask').find( $(tag) ).show();
		});

		$('.acc-close').on('click', function(e){
			e.preventDefault();
			$('.acc-mask').removeClass('show');
		});
	});
	
	/*  [ Product slider vertical ]
		- - - - - - - - - - - - - - - - - - - - */
	$(function() {
		Slider.init();					
	});

	$(window).load(function() {
		/*  [ Page loader]
		- - - - - - - - - - - - - - - - - - - - */
		setTimeout(function() {
			$( 'body' ).addClass( 'loaded' );
			setTimeout(function () {
				$('#pageloader').remove();
			}, 1500);
		}, 1500);
	});
})(jQuery);