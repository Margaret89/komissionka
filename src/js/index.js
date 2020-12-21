import {$, Inputmask} from './common';

// Стрелка наверх
$(window).scroll(function(){
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
		console.log('22222');
		$('.js-auth-confirm form')[0].reset();
		$('.js-auth-form form')[0].reset();
		$('.js-auth-confirm').css('display', 'none');
		$('.js-auth-form').css('display', 'block');
	}
});