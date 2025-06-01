$(document).ready(function(){
    var texH1 = $('#main_h1').text('текст измененный с помощью jquery');
    
    // Первый способ (как в примере)
    var myLogo1 = $('img[src*=logo.jpg]').hide();
    
    // Второй способ (по атрибуту src)
    var myLogo2 = $('img[src="path/to/logo.jpg"]').hide();
    
    // Третий способ (по классу, если у изображения есть класс)
    var myLogo3 = $('img.logo').hide(); // Предполагается, что у изображения есть класс "logo"
    
    myLogo1.hide(3000);
    myLogo1.show(3000);
});