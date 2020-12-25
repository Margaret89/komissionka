import { each } from 'jquery';
import {$, Inputmask, PerfectScrollbar, noUiSlider} from './common';

var $windowWidth = $(window).width();

$(window).on('resize', function(){
	$windowWidth = $(window).width();
});

// Стрелка наверх
$(window).on('scroll', function(){
	if($(this).scrollTop()>300){
		$('.js-move-up').addClass('visible');
	}else{
		$('.js-move-up').removeClass('visible');
	}
});
$('.js-move-up').on('click', function(){$('body,html').animate({scrollTop:0},500);return false;});

// Верхний слайдер
if($('.js-top-slider').length){
	$('.js-top-slider').slick({
		vertical: true,
		infinite: true,
		arrows: false,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false,
					vertical: false,
				}
			},
		]
	});
}

// Слайдер предложений
if($('.js-slider-offer').length){
	$('.js-slider-offer').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<svg class="icon ic-slider-prev" width="51" height="16"><use xlink:href="assets/sprites/sprite.svg#ic-slider-prev"></use></svg>',
		nextArrow: '<svg class="icon ic-slider-next" width="51" height="16"><use xlink:href="assets/sprites/sprite.svg#ic-slider-next"></use></svg>',
		responsive: [
			{
				breakpoint: 1220,
				settings: {
					slidesToShow: 3,
				}
			},
		]
	});
}

// Маска для телефона
Inputmask('+7 (999) 999-99-99').mask('.js-phone');

// Передача данных формы авторизации
if($('.js-auth-form').length){
	$('.js-auth-form form').on('submit',function(e){
		var $inputPhone = $(this).find('.js-phone');
		var valPhone = $inputPhone.val();

		if(valPhone.indexOf('_') > 0 ){
			$inputPhone.addClass('error');
		} else {
			$inputPhone.removeClass('error');
			$('.js-auth-form').css('display', 'none');
			$('.js-auth-confirm').find('.js-phone').val(valPhone);
			$('.js-auth-confirm').css('display', 'block');
		}

		e.preventDefault();
	});
}

$(".js-btn-auth-popup").fancybox({
	'afterClose'  : function() {
		$('.js-auth-confirm form')[0].reset();
		$('.js-auth-form form')[0].reset();
		$('.js-auth-confirm').css('display', 'none');
		$('.js-auth-form').css('display', 'block');
	}
});

// Стилизация скролбара
if($('.js-scroll-content').length){
	$('.js-scroll-content').each(function(indx, element){
		const ps = new PerfectScrollbar(element);
	});
}

// Открыть/Закрыть пункты фильтра
$('.js-filter-head').on('click', function(){
	$(this).siblings('.js-filter-info').slideToggle('300');
	$(this).parents('.js-filter-sect').toggleClass('open')
});

// range-slider
if($('.js-slider-range').length){
	var slider = document.getElementById('slider-range');
	var minRange = Number(slider.getAttribute('data-min'));
	var maxRange = Number(slider.getAttribute('data-max'));
	
	noUiSlider.create(slider, {
		start: [minRange, maxRange],
		step: 5,
		connect: true,
		range: {
			'min': minRange,
			'max': maxRange
		},
		tooltips: true,
		format: {
			from: Number,
			to: function(value) {
				return (parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+" руб.");
			}
		}
	});


	var snapValues = [
		document.getElementById('slider-range-min'),
		document.getElementById('slider-range-max')
	];

	slider.noUiSlider.on('update', function (values, handle) {
		snapValues[handle].value = values[handle];
	});

	snapValues.forEach(function (input, handle) {
		input.addEventListener('change', function () {
			var valItem = Number(this.value.replace(/\D+/g,""));;
			var minValItem = Number(snapValues[0].value.replace(/\D+/g,""));
			var maxValItem = Number(snapValues[1].value.replace(/\D+/g,""));
			// var valItem = this.value;
			// var minValItem = Number(snapValues[0].value);
			// var maxValItem = Number(snapValues[1].value);

			if(handle == 0){
				if((valItem < minRange) || (valItem > maxRange) || (valItem >= maxValItem)){
					valItem = minRange;
				}
			}else{
				if((valItem < minRange) || (valItem > maxRange) || (valItem <= minValItem)){
					valItem = maxRange;
				}
			}
			slider.noUiSlider.setHandle(handle, valItem);
		});
	});
}

// Стилизация выпадающего списка
if ($('.js-select').length) {
	$('.js-select').select2({
		width: '100%',
		minimumResultsForSearch: Infinity,
		placeholder: function(){
			$(this).attr('data-placeholder');
		},
	});
}

// Слайдер для продукции
$('.js-product-slider-thumb').slick({
	autoplay: false,
	vertical: true,
	infinite: false,
	verticalSwiping: true,
	slidesPerRow: 1,
	slidesToShow: 4,
	asNavFor: '.js-product-slider-preview',
	focusOnSelect: true,
	prevArrow: '<button type="button" class="slick-prev"><svg class="icon ic-arrow-fill-up" width="34" height="19"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-fill-up"></use></svg></button>',
	nextArrow: '<button type="button" class="slick-next"><svg class="icon ic-arrow-fill-down" width="34" height="19"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-fill-down"></use></svg></button>',
	responsive: [
		{
			breakpoint: 767,
			settings: {
				vertical: false,
			}
		},
		{
			breakpoint: 479,
			settings: {
				vertical: false,
				slidesPerRow: 3,
				slidesToShow: 3,
			}
		},
	]
});
$('.js-product-slider-preview').slick({
	autoplay: false,
	vertical: true,
	infinite: false,
	slidesPerRow: 1,
	slidesToShow: 1,
	asNavFor: '.js-product-slider-thumb',
	arrows: false,
	draggable: false,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				vertical: false,
				fade: true,
			}
		},
	]
});


// Слайдер новостей
if($('.js-news-list').length){
	newsSlider();

	$(window).on('resize', function(){
		newsSlider();
	});

	function newsSlider(){
		if ($windowWidth < 992) {
			$('.js-news-list:not(.slick-initialized)').slick({
				infinite: false,
				prevArrow: '<svg class="icon ic-slider-prev" width="51" height="16"><use xlink:href="assets/sprites/sprite.svg#ic-slider-prev"></use></svg>',
				nextArrow: '<svg class="icon ic-slider-next" width="51" height="16"><use xlink:href="assets/sprites/sprite.svg#ic-slider-next"></use></svg>',
			});
		} else {
			$(".js-news-list.slick-initialized").slick("unslick");
		}
	}
}

// Слайдер услуг
if($('.js-services').length){
	servicesSlider();

	$(window).on('resize', function(){
		servicesSlider();
	});

	function servicesSlider(){
		if ($windowWidth < 768) {
			$('.js-services:not(.slick-initialized)').slick({
				infinite: false,
				prevArrow: '<svg class="icon ic-slider-prev" width="51" height="16"><use xlink:href="assets/sprites/sprite.svg#ic-slider-prev"></use></svg>',
				nextArrow: '<svg class="icon ic-slider-next" width="51" height="16"><use xlink:href="assets/sprites/sprite.svg#ic-slider-next"></use></svg>',
			});
		} else {
			$(".js-services.slick-initialized").slick("unslick");
		}
	}
}

// Создание мобильного меню
var arrMobileMenu = [];
$('.js-add-mm').each(function(){
	var indexItem = $(this).attr('data-order');
	arrMobileMenu[indexItem] = $(this);
});

for (var i = 0; i < arrMobileMenu.length; i++) {
	$(arrMobileMenu[i]).clone().appendTo('.js-mobile-menu-content');
}


// Открыть/Закрыть мобильное меню
$('.js-open-menu').on('click', function(){
	$('.js-shadow').addClass('is-visible');
	$('.js-mobile-menu').addClass('open');
	$('.js-body').addClass('no-scroll');
});

$('.js-close-menu').on('click', function(){
	 closeMobileMenu();
});

$('.js-shadow').on('click', function(){
	closeMobileMenu();
});

function closeMobileMenu() {
	$('.js-shadow').removeClass('is-visible');
	$('.js-mobile-menu').removeClass('open');
	$('.js-body').removeClass('no-scroll');
}

// Обрезание текста по количеству символов (включено только на мобильном разрешении)
if($('.js-slice-text').length){
	$('.js-slice-text').readmore({
		speed: 75,
		moreLink: '<a href="#" class="slice-text__link">Читать подробнее</a>',
		lessLink: '<a href="#" class="slice-text__link">Скрыть</a>',
	});
}

// Открыть/Закрыть каталожное меню
if($('.js-btn-category').length){
	$('.js-btn-category').on('click', function(){
		$('.js-catalog-menu').slideToggle(300);
	});
}

// Открыть/Закрыть фильтер
$('.js-open-filter').on('click', function(){
	$('.js-shadow').addClass('is-visible');
	$('.js-filter').addClass('open');
	$('.js-body').addClass('no-scroll');
});

$('.js-close-filter').on('click', function(){
	 closeFilterMenu();
});

$('.js-shadow').on('click', function(){
	closeFilterMenu();
});

function closeFilterMenu() {
	$('.js-shadow').removeClass('is-visible');
	$('.js-filter').removeClass('open');
	$('.js-body').removeClass('no-scroll');
}
