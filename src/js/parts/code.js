(function($, undefined) {
	$(function() {
		// code write
		var $closeStaticMap = $('.discuss--map'); 
		var $openJsMap = $('.discuss--map-js'); 

		$closeStaticMap.addClass('discuss--map-jsInvisibleMap');
		$openJsMap.addClass('discuss--map-jsShowMap');

		$('form.discuss--message').submit(function() {
			if (
				$(this).find('input[name=name]').val() == '' ||
				$(this).find('input[name=email]').val() == '' ||
				$(this).find('textarea[name=message]').val() == '' ) {
					alert('Вы не заполнили все поля формы, пожалуйста заполните все поля!');
				return false;
			}
		});

	})
})(jQuery);