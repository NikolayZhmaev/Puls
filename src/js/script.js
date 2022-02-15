$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,      
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 880,
                settings: {                    
                    dots: true,
                    infinite: true,
                    arrows: false,                  
                    touchMove: true              
                }
            }           
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });  

    function toggleSlide (item) {
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__reverse').eq(i).toggleClass('catalog-item__reverse_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').on('click', function(){
        $('.overlay, #order').fadeIn('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // Валидация формы для отправки данных
    function valideForm (form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите не менее {0} символов") 
                },
                phone: "Пожалуйста введите свой телефон",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Введен некорректный адрес почты"
                }
            }
        });
    };

    valideForm('#consultation-form');
    valideForm('#consultation form');
    valideForm('#order form');

    // настройка маски для ввода номера телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");

   
    $('form').submit(function(e) {
        e.preventDefault(); //отменяем стандартное поведение браузера (отменяем перезагрузку страницы)
        // настраиваем отправку данных на сервер        
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });


    // $('form').submit(function(e) {
    //     e.preventDefault();
    //     let data = $(this).serialize();

    //     let valid_name = data.name.length > 1;
    //     let valid_phone = data.phone.length > 9; //&& (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
    //     let valid_email = data.email.length > 6; //&& (/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i);
    //     if (valid_name && valid_phone && valid_email) {
    //         $.ajax({
    //             type: "POST",
    //             url: "mailer/smart.php",
    //             data,
    //         }).done(function() {
    //             $(this).find("input").val("");
    //             $('#consultation, #order').fadeOut();
    //             $('.overlay, #thanks').fadeIn('slow');
    //             $('form').trigger('reset');
    //         });
    //         return false;
    //     } else {
    //         return false;
    //     }        
    // });

    //Smooth scroll and pageup

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();


});