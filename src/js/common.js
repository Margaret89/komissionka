import $ from 'jquery';
(function (global) {
	global.$ = $;
	global.jQuery = $;
}(typeof window !== 'undefined' ? window : this));

import '@fancyapps/fancybox'
// import 'bootstrap/js/dist/modal';
import 'slick-slider/slick/slick.min.js';
import PerfectScrollbar from 'perfect-scrollbar';
import noUiSlider from 'nouislider';
import 'select2';
import Inputmask from "inputmask";
import 'readmore-js/readmore.min.js';

export {$, Inputmask, PerfectScrollbar, noUiSlider};