/**
 * @description Основные скрипты
 * version: 0.0.6
 */

$(function(){

	/* MINI КОРЗИНА */
	$('body').standart_load({ force:1, url:'/cart.php?dont_show=1' });
	
	$('.mini-cart-show-button').click(function(){
		$(this).closest('.mini-cart').toggleClass('show');
	});
	/* /MINI КОРЗИНА */

    /* ЭЛЕМЕНТЫ КАТАЛОГА */
    if ($('.catalog .catalog-container').size() > 0) {

        var curPositionTop = $('.catalog .catalog-container > .item').eq(0).position().top, //берем позицию первого эл-та
            elementsInRow = []; //массив, в кот-й помещаем элементы, находящиеся на одной строке

        $('.catalog .catalog-container').each(function () {

            var catalog = $(this),
                catalog_item_height = 0;

            catalog.find('.item').each(function () {

                /* Картинка по дефолту */
                var cur_img = $(this).find('.img-container img').attr('src');
                if (cur_img == "")
                    $(this).find('.img-container img').attr({'src': '/img/empty_icon.jpg'});
                /* /Картинка по дефолту */


                /* Выравнивание высоты*/
                //если эл-ты находятся на одной строке
                if ($(this).position().top != curPositionTop) {

                    curPositionTop = $(this).position().top;

                    for (var k in elementsInRow) {
                        elementsInRow[k].height(catalog_item_height);
                    }

                    catalog_item_height = $(this).height();

                    elementsInRow = [];

                }

                elementsInRow.push($(this));

                var cur_height = $(this).height();
                if (cur_height > catalog_item_height)
                    catalog_item_height = cur_height;

                /* Выравнивание высоты*/
            });

            //для последней строки элементов, если она не полная, повторяем
            for (var k in elementsInRow) {
                elementsInRow[k].height(catalog_item_height);
            }
            elementsInRow = [];
        });

    }
    /* /ЭЛЕМЕНТЫ КАТАЛОГА */


    /* Переносим правый блок вправо */
    $('.floatblock.center-min, .floatblock.center-middle').before($('.floatblock.right').show());
    $('.padding-right').hide();
    /* /Переносим правый блок вправо */


    /* Стартуем стандартную ajax обработку */
    $('form.standart_load,a.standart_load').standart_load();
    /* /Стартуем стандартную ajax обработку */


    /* Адаптивное верхнее меню */
    try {
        $('.menu-top').eq(0).slicknav({
            label: 'МЕНЮ',
            prependTo:'.menu-top-container'
        });
    } catch(err) {

    }
    /* /Адаптивное верхнее меню */


    // Отменить перетаскивание картинок и ссылок
    $("img, a").on("dragstart", function(event) { event.preventDefault(); });


    /* Стартуем слайдеры */
    if ($(".standart_slider").is(".index_slider2")) {
        $.getScript('/js/lib/jquery.standart.slider.js', function () {

            $('.index_slider2').standart_slider({
                timeout: 12000,
                time: 400,
                timer: 1, /* Включение-выключение перелистывания */
                size: 1, /* Количество отображаемых обьектов в окне показов */
                type: 'scroll_horiz'
            });

        });
    }
    if ($(".standart_slider").is(".tovar_slider2")) {
        $.getScript('/js/lib/jquery.standart.slider.js', function () {

            $('.tovar_slider2').standart_slider({
                timeout: 12000,
                time: 400,
                timer: 1, /* Включение-выключение перелистывания */
                size: 1, /* Количество отображаемых обьектов в окне показов */
                type: 'scroll_horiz'
            });

        });
    }
    /* /Стартуем слайдеры */


    /* Owl Index Slider */
    $(function() {
        if( $(".index_slider .owl-carousel").is("div") ){

            var owl =  $('.index_slider .owl-carousel');

            owl.owlCarousel({
                singleItem : true,
                autoPlay : 12000,
                stopOnHover : true,
                navigation: true,
                responsiveBaseWidth: '.index_slider .owl-carousel',
                transitionStyle : "backSlide"
            });

            // Custom Navigation Events
//                    owl.parent().find(".to_right").click(function(){
//                        owl.trigger('owl.next');
//                    });
//
//                    owl.parent().find(".to_left").click(function(){
//                        owl.trigger('owl.prev');
//                    })

        }
    });
    /* /Owl Index Slider */


    /* SYNCED Owl Slider */
    if( $(".synced_slider1 .owl-carousel").is("div") ) {

        var sync1 = $(".synced_slider1 .owl-carousel");
        var sync2 = $(".synced_slider2 .owl-carousel");

        sync1.owlCarousel({
            singleItem: true,
            autoPlay : 12000,
            stopOnHover : true,
            slideSpeed: 1000,
            navigation: false,
            pagination: false,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
            touchDrag: false,
            mouseDrag : false

        });

        sync2.owlCarousel({
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsMobile: [479, 2],
            navigation: true,
            pagination: false,
            navigationText: [
                "",
                ""
            ],
            responsiveRefreshRate: 100,
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        $(".synced_slider2 .owl-carousel").on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

    }

    function syncPosition(el) {
        var current = this.currentItem;
        $(".synced_slider2 .owl-carousel")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if ($(".synced_slider2 .owl-carousel").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }

    }
    /* /SYNCED Owl Slider */

    /* placeholder */
    if ($('input').attr('placeholder') || $('textarea').attr('placeholder')) {
        $.getScript('/js/lib/jquery.placeholder.min.js', function () {

            $('input[placeholder], textarea[placeholder]').placeholder();

        });
    }
    /* /placeholder */


    ///* Динамическое подключение fancybox */
    //if ($("a").is(".fancybox-thumb")) {
    //    $('head').append("<link rel='stylesheet' type='text/css'  href='/css/fancybox/jquery.fancybox.css'/>"); /* Подключим стили */
    //    $('head').append("<link rel='stylesheet' type='text/css'  href='/css/fancybox/helpers/jquery.fancybox-thumbs.css?v=1.0.7'/>");
    //    $.getScript('/js/lib/fancybox/jquery.fancybox.js?v=2.1.5', function () {/* Подключим скрипт */
    //        $.getScript('/js/lib/fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.7', function () {
    //
    //            /* Подрубаем галерею */
    //            $(".fancybox-thumb").fancybox({
    //                prevEffect: 'none',
    //                nextEffect: 'none',
    //                helpers: {
    //                    title: {
    //                        type: 'outside'
    //                    },
    //                    thumbs: {
    //                        width: 50,
    //                        height: 50
    //                    },
    //                    //overlay: {
    //                    //    locked: false
    //                    //}
    //                }
    //            });
    //
    //            /* Открываем автоматом по id через класс */
    //            var start_id = window.location.href.indexOf("#");
    //            if (start_id > 0) {
    //                var id = window.location.href.substring(start_id + 1);
    //                $('a.fancybox-thumb.id' + id).click();
    //            }
    //
    //        });
    //    });
    //}
    ///* /Динамическое подключение fancybox */


    /* /fancybox3 beta1 */
    try {
        if ($("a").is(".fancybox-thumb")) {

            /* Подрубаем галерею */
            $(".fancybox-thumb").fancybox({
                openEffect  : 'none',
                closeEffect : 'elastic',
                prevEffect: 'fade',
                nextEffect: 'fade',
                //theme : 'dark',
                //locked : false,
                padding : 0,
                caption : {
                    type : 'outside'
                },
                arrows : '!isTouch',
                helpers: {
                    thumbs: {
                        width: 50,
                        height: 50
                    }
                },
                locale  : 'ru',
                locales : {
                    'ru' : {
                        CLOSE      : 'Закрыть',
                        NEXT       : 'Следующий',
                        PREV       : 'Предыдущий',
                        ERROR      : 'Запрашиваемый слайд не может быть загружен.<br/> Пожалуйста, повторите попытку позже.',
                        EXPAND     : 'Показать оригинальный размер',
                        SHRINK     : 'Вписать в экран',
                        PLAY_START : 'Просмотр слайдшоу',
                        PLAY_STOP  : 'Поставить показ слайдов на паузу'
                    }
                }
            });

            /* Открываем автоматом по id через класс */
            var start_id = window.location.href.indexOf("#");
            if (start_id > 0) {
                var id = window.location.href.substring(start_id + 1);
                $('a.fancybox-thumb.id' + id).click();
            }

            /* обновляем при ресайзе */
            $( window ).resize(function() {
                $.fancybox.update();
            });
        }
    } catch(err) {

    }
    /* /fancybox3 beta1 */


    /* Табы */
    $('.tabs-controls > .item').on('click', function (e) {
        e.preventDefault();

        var item = $(this),
            contentItem = $(this).parent().parent().find('.tabs-list > .item'),
            itemPosition = item.index();

        contentItem.eq(itemPosition)
            .add(item)
            .addClass('active')
            .siblings()
            .removeClass('active');
    });
    /* /Табы */


    /* uniform */
    if ($('input[type=checkbox]')) { //checkbox
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.checkbox.css'/>"); //стили checkbox
        $.getScript('/js/lib/jquery.uniform.min.js', function () {

            $('input[type=checkbox]').uniform();

        });
    }
    if ($('input[type=radio]')) { //radio
//        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.radio.css'/>"); //стили radio
        $.getScript('/js/lib/jquery.uniform.min.js', function () {

            $('input[type=radio]').uniform();

        });
    }
    if ($('select').is('.uniform')) { //select
//        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.default.min.css'/>");
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/uniform.select.css'/>"); //стили select
        $.getScript('/js/lib/jquery.uniform.min.js', function () {

            $('select.uniform').uniform();

        });
    }
    /* /uniform */


    /* selectik */
    if ($('select').is('.selectik')) {
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/selectik.css'/>");
        $.getScript('/js/lib/jquery.mousewheel.js', function () {
            $.getScript('/js/lib/jquery.selectik.min.js', function () {

                $('select.selectik').selectik({maxItems: 8, minScrollHeight: 20});

            });

        });
    }
    /* /selectik */


    /* Slider-range с возможностью вводить значения */
    /* НЕ ЗАБЫТЬ:
    подставить перед document.ready условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения
    ( они здесь находятся внизу файла) */
    if ($('div').is('.slider-range')) {
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/jquery-ui.css'/>");
        $.getScript('/js/lib/jquery-ui.min.js', function () {
            var slider_range, input_value_1, input_value_2;

            // параметры, задаваемые пользователем в инпутах
            input_value_1 = $(".slider_range_input_values.input_value1");
            input_value_2 = $(".slider_range_input_values.input_value2");
            if (input_value_1.val() != "")
                slider_range_val1 = input_value_1.val();
            if (input_value_2.val() != "")
                input_value_2 = input_value_2.val();

            slider_range = $(".slider-range").slider({
                range: true,
                min: slider_range_min,
                max: slider_range_max,
                values: [slider_range_val1, slider_range_val2],
                step: slider_range_step,
                slide: function (event, ui) { //cобытие происходит на каждое движении мыши, при перетаскивании рукоятки ползунка

                    stepRange(parseInt(ui.values[0]), parseInt(ui.values[1]), slider_range_max);
                },
                stop: function (event, ui) { //событие происходит в момент завершения перетаскивания рукоятки ползунка.

                    stepRange(parseInt(ui.values[0]), parseInt(ui.values[1]), slider_range_max);

                }
            });

            //дефолтные значения цены у input-ов
            input_value_1.val(slider_range_val1);
            input_value_2.val(slider_range_val2);

            inputRestriction(input_value_1);
            inputRestriction(input_value_2);

            // при вводе значения в инпут 1 проверять, боьше, либо равно оно значению в инпуте 2
            input_value_1.change(function () {

                var val1 = parseInt($(this).val());
                var val2 = parseInt(input_value_2.val());
                var stepRangeVal = Math.max(Math.round(slider_range_max * 0.05), 1); //вычисление минимального расстояния, которое остается между бегунками
                if (val2 - val1 < stepRangeVal) {
                    val2 = Math.min(val1 + stepRangeVal, slider_range_max);
                    val1 = val2 - stepRangeVal;
                    input_value_1.val(val1);
                    input_value_2.val(val2);
                }
                slider_range.slider({values: [val1, val2]});

            });

            // при вводе значения в инпут 2 проверять, меньше, либо равно оно значению в инпуте 1
            input_value_2.change(function () {

                var val1 = parseInt(input_value_1.val());
                var val2 = parseInt($(this).val());
                var stepRangeVal = Math.max(Math.round(slider_range_max * 0.05), 1); //вычисление минимального расстояния, которое остается между бегунками
                if (val2 - val1 < stepRangeVal) {
                    val1 = Math.max(val2 - stepRangeVal, 0);
                    val2 = val1 + stepRangeVal;
                    input_value_1.val(val1);
                    input_value_2.val(val2);
                }
                slider_range.slider({values: [val1, val2]});

            });

            //ф-я позволяющая вводить в инпут только цифры
            function inputRestriction(item) {
                item.keypress(function (event) {
                    if ((event.which > 57 || event.which < 48) && event.which != 8)
                        event.preventDefault();
                })
                    .change(function () {
                        input_value_1.val(input_value_1.val());
                        input_value_2.val(input_value_2.val());
                    });
            }

            function stepRange(val1, val2, max) {

                var stepRangeVal = Math.max(Math.round(max * 0.05), 1); //вычисление минимального расстояния, которое остается между бегунками

                if (val2 - val1 < stepRangeVal) {
                    val2 = Math.min(val1 + stepRangeVal, max);
                    val1 = val2 - stepRangeVal;
                }

                // записываются значения бегунков в input-ы цены "от ... до"
                input_value_1.val(val1);
                input_value_2.val(val2);
                slider_range.slider({values: [val1, val2]});
            }
        });
    }
    /* /Slider-range с возможностью вводить значения */


    /* scrollbar */
    if ($('div').is('.content-with-scroll')) {
        $('head').append("<link rel='stylesheet' type='text/css'  href='/css/jquery.scrollbar.css'/>");
        $.getScript('/js/lib/jquery.scrollbar.min.js', function () {

            $('.content-with-scroll').scrollbar();

        });
    }
    /* /scrollbar */


    /* кнопка Наверх */
    toTop ();
    function toTop () {
        $('body').append('<div class="toTop" title="Наверх"></div>');

        var toTop = $('.toTop'),
            contentBlock = $('#overflow_div'), // блок с контентом сайта
            toTopOffset = 30, // отступ кнопки от контента в px
            documentWidth,
            contentBlockWidth,
            contentOfsetLeft,
            toTopWidth = toTop.width();

        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                toTop.stop().fadeIn();
            } else {
                toTop.stop().fadeOut();
            }
        });

        toTop.click(function () {
            $('body,html').animate({scrollTop: 0}, 500);

        })
            .hover(
            function () {
                $(this).stop().animate({
                    opacity: 1
                }, 250);
            }, function () {
                $(this).stop().animate({
                    opacity: 0.3
                }, 250);
            }
        );


        //определение позиции кнопки "Наверх"
        if ( contentBlock.size()> 0 ){ // если указанный блок с контентом существует
            toTopPosition();

            $(window).resize(function () {
                toTopPosition();
            });
        }
        function toTopPosition() {
            documentWidth = $(document).width();
            if ( contentBlock.css('minWidth') == '0px'){
                contentBlockWidth = parseInt(contentBlock.css('width'));
            } else {
                contentBlockWidth = parseInt(contentBlock.css('minWidth'));
            }
            contentOfsetLeft = (documentWidth - contentBlockWidth)/2;

            if ( documentWidth <= (contentBlockWidth + (toTopOffset + toTopWidth)*2 ) ){
                // когда ширина окна браузера меньше чем ширина контента + ширина кнопки Назад
                toTop.css('left', 15);
            } else {
                // когда ширина окна браузера больше чем ширина контента + ширина кнопки Назад
                toTop.css('left', contentOfsetLeft - toTopWidth - toTopOffset);
            }
        }
    }
    /* /кнопка Наверх */


    /* свернуть-развенуть */
    $('.parametr.block').find('.checkbox-container').removeClass('expand').hide();
    $('.see-all').html('Показать всё');
//    по умолчанию показываем только 4 пункта у каждой характеристики


    $('.parametr.block').each(function () {
        for (var i = 0; i <= 3; i++) {
            $(this).find('.checkbox-container').eq(i).show();
        }
    });

    $('.see-all').click(function () {  // при клике на "Показать всё"
        if ($(this).hasClass('expand')) {
            $(this).parent().find('.checkbox-container').hide();
            for (var i = 0; i <= 3; i++) {
                $(this).parent().find('.checkbox-container').eq(i).show();
            }
            $(this).removeClass('expand');
            $(this).html('Показать всё');
        } else {
            $(this).parent().find('.checkbox-container').show();
            $(this).addClass('expand');
            $(this).html('Свернуть');
        }
    });
    /* /свернуть-развенуть */


    /* развернуть список услуг */
    $('.uslugi .item .button.more').click(function (e) {
        e.preventDefault();

        var block = $(this).parent().find('.text-container'),
            heightBlockFull = block.find('.text').height(),
            btnTextOpened = 'Свернуть';

        if (typeof heightBlock == 'undefined') {
            heightBlock = block.height();
        }

        if (typeof btnTextClosed == 'undefined') {
            btnTextClosed = $(this).html();
        }

        if ($(this).hasClass('opened')) {

            block.animate({
                height: heightBlock
            }, 500);
            $(this).removeClass('opened');
            $(this).html(btnTextClosed);

        } else {

            block.animate({
                height: heightBlockFull
            }, 500);
            $(this).addClass('opened');
            $(this).html(btnTextOpened);
        }
    });
    /* развернуть список услуг/


    /* jquery.form*/
    if ($(".open-popup").is('div')) {
        $.getScript('/js/lib/jquery.form.min.js', function () {
        });
    }
    /* jquery.form*/


    /* WIDGET PHONE */
    if( $('.widget-phone').size()> 0){
        $('.widget-phone').standart_widgetPhone({
            // widgetTimer: 0, // таймер ,по истечении которого появится виджет
            //contentBlock: $('#overflow_div'), // блок с контентом сайта (для позиционирования виджета)
        });
    }
    /* /WIDGET PHONE */


    /* КАРТА YANDEX*/
    if($('#map').size()>0){
        var myMap;

        function init () {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map").
            myMap = new ymaps.Map('map', {
                // При инициализации карты обязательно нужно указать
                // её центр и коэффициент масштабирования.
                center:  [55.76, 37.64],
                zoom: 10
            });

            // Создаем геообъект с типом геометрии "Точка".
            myGeoObject = new ymaps.GeoObject({
                // Описание геометрии.
                geometry: {
                    type: "Point",
                    coordinates: [55.76, 37.64]
                },
                // Свойства.
                properties: {
                    // Контент метки.
                    iconContent: 'Москва златоглавая',
                    hintContent: 'Дополнительная инфа всплывает'
                }
            }, {
                // Опции.
                // Иконка метки будет растягиваться под размер ее содержимого.
                preset: 'islands#blackStretchyIcon',
                // Метку можно перемещать.
                draggable: false
            });

            myMap.behaviors.disable('scrollZoom');

            myMap.geoObjects
                .add(myGeoObject);

            // ховер на геообъект
            myGeoObject.events
                .add('mouseenter', function (e) {
                    // Ссылку на объект, вызвавший событие,
                    // можно получить из поля 'target'.
                    e.get('target').options.set('preset', 'islands#redStretchyIcon');
                })
                .add('mouseleave', function (e) {
                    e.get('target').options.set('preset', 'islands#blackStretchyIcon');
                });

        }

        // Дождёмся загрузки API и готовности DOM.
        ymaps.ready(init);
    }
    /* /КАРТА YANDEX*/


}); // END READY


/* условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения */
if (slider_range_val1 == null)
    var slider_range_val1 = 7500;

if (slider_range_val2 == null)
    var slider_range_val2 = 24000;

if (slider_range_min == null)
    var slider_range_min = 0;

if (slider_range_max == null)
    var slider_range_max = 32000;

if (slider_range_step == null)
    var slider_range_step = 50;
/* /условия, проверяющие, заданы ли параметры слайдера range через php, либо подставляющие дефолтные значения */


/* кастомный input file */
/**
 * Кастомный инпут - клик
 */
function customInputFile(obj) {
    obj.click();
}

/**
 * Вставляет название файла в кастомный инпут
 * @param obj
 */
function setInputFileName(obj) {
    if (obj.val() !== '') {
        obj.parent().find('.file-name').html('<img class="clear-input-file" src="img/close.png" onclick="clearInputFile($(this))" alt=""/>')
            .css('display', 'inline-block')
            .append(obj.val().replace(/.*[\\\/](.*)/, "$1"))
            .parent().parent().find('.validation-informer').hide();
    } else {
        obj.parent().find('.file-name').html('');
    }
}

/**
 * Очистка поля файл
 * @param obj
 */
function clearInputFile(obj) {
    obj.parent().html('').hide()
        .parent().parent().find('input[type=file]').val('')
}
/* /кастомный input file */


var Load = function (url, param) { // Функция для стандартизации общения с сервером
    $.post(
        url,
        param,
        function (data) {
            var sc_ = '';
            if (data['script']) {
                sc_ = data['script'];
                delete data['script'];
            }
            for (i in data) {
                $(i).html(data[i]);
            }
            eval(sc_);
        },
        'json'
    );
};


var Message = function (message) { // Всплывающее сообщение на базе наработки standart_window

    $('.window.message').remove(); /* Удалилил старое окно */
    /* Добавлеяем новое окно */
    $('body').append(
        '<div class="window message">' +
        '<div class="window-popup-overflower"></div>' +
        '    <div class="window_body">' +
        '        <div class="close">x</div>' +
        '        <div class="content">' +
        '            <div class="block">' +
        message +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>');

    $('.window.message').standart_window();
};


//Баг в ie с прыгающим рывками элементом с position: fixed
if(navigator.userAgent.match(/Trident.*rv[ :]*11\.| Edge\/12\./) || navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/MSIE 9/i)) {
    $('body').on("mousewheel", function (e) {
        e.preventDefault();

        var wheelDelta = event.wheelDelta;

        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
}

//preloader
$(window).on('load', function () {

    $(".page-preloader").fadeOut();
    $(".page-preloader .spinner").delay(400).fadeOut("slow");

});