import { each } from 'jquery';
import {$, Inputmask, PerfectScrollbar, noUiSlider} from './common';

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