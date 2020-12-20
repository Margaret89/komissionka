import {$} from './common';

// $(window).scroll(function(){
// 	if($(this).scrollTop()>300){
// 		$('.js-move-up').addClass('visible');
// 	}else{
// 		$('.js-move-up').removeClass('visible');
// 	}
// });
// $('.js-move-up').click(function(){$('body,html').animate({scrollTop:0},800);return false;});

// top slider
if($('.js-top-slider').length){
	$('.js-top-slider').slick({
		vertical: true,
		infinite: true,
		arrows: false,
		dots: true,
	});
}