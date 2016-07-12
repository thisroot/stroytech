/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * FULL PAGE SLIDER
 */

$(document).ready(function () {
    
$(".nano").nanoScroller({ alwaysVisible: true });
$("#lightgallery").lightGallery({
    selector: '.add-tooltip'
}); 

$("#lightgallery-2").lightGallery({
        thumbnail:true
});

$('#fullpage').fullpage({
        anchors:[
            'calc',
            'gallery',
            'contact'],
        menu: 'menu',
        scrollOverflow: true
    });

/*
 * PARALAX SLIDER
 */
$('#da-slider').cslider({
    autoplay: true,
    bgincrement: 450
});



    $('.work-button').click(function () {
        attr = $(this).attr('data-work');
        //console.log('#about-work-' + attr);
        $('*[id^="about-work"').addClass('hidden');
        $('#about-work-'+ attr).removeClass('hidden');
        $(".nano").nanoScroller();
    });
    
    $('.nano-button').click(function () {
        setTimeout(function () {
            $(".nano").nanoScroller();
        }, 500);

    });
    
    //CALCULATOR
    
    $(".calc-button").click(function(){
        //styazhka
        if($(this).attr('data-bind') === 'styazhka') {
           var square = $('.styazhka-square').val();
             var baseprice = (square<100?750:700);
             var thin = $('.styazhka-thin').val();
             var price = (thin < 5?baseprice*square:(((thin-5)*50+baseprice))*square);               
             $('.styazhka-result').text(price + ' руб.');
        }
        //shtukaturka
        if($(this).attr('data-bind') === 'shtukaturka') {
            var base = $('.shtukaturka-type-rabot').val();
            var baseprice = (base == 2?350:450);       
            var square = $('.shtukaturka-square').val();          
            var thin = $('.shtukaturka-thin').val();          
            var price = (thin == 1?((baseprice + 200)*square):((baseprice + 250)*square)); 
           $('.shtukaturka-result').text(price + ' руб.'); }
       
       //fundament
        if($(this).attr('data-bind') === 'fundament') {
            var perimetr = $('.fundament-perimert').val();
            var height = $('.fundament-height').val();
            var wide = $('.fundament-wide').val();
            var value = (perimetr * height * wide) / 1000000000;
            console.log(value);
            var material = $('.fundament-material').val();
            console.log(material);
            var price = (material == 1?(12600*value):(13200*value));
            console.log(price);
            $('.fundament-result').text(price + ' руб.'); 
            
        }
        
        //beton
        if($(this).attr('data-bind') === 'beton') {
            var value = $('.beton-value').val();
            var price = value * 4500;
            $('.beton-result').text(price + ' руб.');
        }
        //insideworks
         if($(this).attr('data-bind') === 'insideworks') {
             
             var value = $('.inside-value').val();
             var price = value * 4000;
             $('.inside-result').text(price + ' руб.');
         }
    });
    
    
    
     randomNum();
    
    function randomNum() {
        
        var n1 = Math.round(Math.random() * 10 + 1);
        var n2 = Math.round(Math.random() * 10 + 1);   
        $("#a").text(n1 + " + " + n2);      
    }
    
    $("#a").on('click', function(){
        randomNum();
    });
    
            $('#send-message').on('click', function() {
                 if (eval($("#a").text()) == $("#b").val()) {
                sendMessage();
                randomNum();                         
                $('#b').val('');
                          
            } else {
                randomNum();            
                $('#b').val('Вы ошиблись');
                setTimeout(function(){               
                $('#b').fadeOut(1000).val('').fadeIn(1000);
                },1000);
            }
                
            // Отпрака сообщения //
            
              function sendMessage() {

            function isValidEmail(emailAddress) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(emailAddress);
            };

            function isValidPhone(phoneNumber) {
                var pattern = new RegExp(/^[0-9\s(-)]*$/i);
                return pattern.test(phoneNumber);
            };
    
 
        var get = new FormData();
        get.append('form', 'sendMessage');
        get.append('name', $('#message-name').val());
        get.append('email', $('#message-email').val());
        get.append('phone',$('#message-phone').val());
        get.append('subject', $('#message-subject').val());
        get.append('body', $('#message-body').val());
        
         if (isValidEmail(get.get('email')) && (get.get('body').length > 1) && (get.get('name').length > 1)) {
        
         $.ajax({
                url: './ctr/route.php',
                type: 'POST',
                data: get,
                cache: false,
                dataType: 'json',
                processData: false, // Не обрабатываем файлы (Don't process the files)
                contentType: false, // Так jQuery скажет серверу что это строковой запрос
                success: function (respond, textStatus, jqXHR) {
                    
                    console.log(respond);
                    
                    if(respond.respond == 0) {
                        
                            $('#send-message').text('Отправлено');
                            
                         $('#message-name').val('');
                         $('#message-email').val('');
                         $('#message-phone').val('');
                         $('#message-subject').val('');
                         $('#message-body').val('');
                            
                                                   
                            setTimeout(function () {
                                $('#send-message').text('Отправить');
                            }, 5000);
                        
                    }
                    
                    else {
                                            
                    }

                    if (typeof respond.error === 'undefined') {
                    }
                    else {
                        console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('ОШИБКИ AJAX запроса: ' + textStatus);
                }
            });
    }
    
    else {
        
        $('#send-message').text('не все поля заполнены правильно');
            setTimeout(function(){               
                 $('#send-message').text('Попробуйте снова');
                },1000);
        
        
        
        
        //  $('.error').fadeIn(1000);
      //  $('.success').fadeOut(500);
      console.log(get.get('email'));
    }

    return false;
    
              }
    
      });
     
    
    
    
    
    
    
    
});



