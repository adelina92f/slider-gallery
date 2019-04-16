let adiSlider = {
    settings: {
        $slider: $('.slider'),
        $items: null,
        current: null,
        $current: null,
        $control: null,
        $paging: null,
        $pagingPoints: null,
        activePoint: null,
        image_index: null,
        features:{
            autoPlay:{
                settings:{
                    interval : 7
                },
                fn : null
            }
        }
    },

    // Извиква функциите - init, loadFeatures и bindEvents.
    initSlider: function () {
        this.init();
        this.loadFeatures();
        this.bindEvents();
    },

    // Инициализира картинката.
    init: function (number) {
        this.settings.$items = this.settings.$slider.find('.slider__item')
        this.checkImageIndex(number);
        let image = this.settings.$items.get(this.settings.image_index);
        let $image = $(image);
        this.createPoints()
        return this.setCurrent($image);
    },

    // Проверява дали съществува числото. 
        checkImageIndex: function (number) {
        number = (typeof (number) === 'undefined' || number < 0) ? 0 : number;
        this.settings.image_index = (number > this.settings.$items.lenght - 1) ? this.settings.$items.lenght - 1 : number;
    },

    // Създава точките под картинките
    createPoints: function () {
        this.settings.$paging = this.settings.$slider.find('.slider__paging');
        let itemsLength = this.settings.$items.length;
        let list = "";
        for (let i = 0; i < itemsLength; i++) {
            list += '<span data-image="' + i + '"></span>';
            let image = this.settings.$items.get(i);
            let $image = $(image);
            $image.attr('data-image', i);
        }

        this.settings.$paging.append(list);
        this.settings.$pagingPoints = this.settings.$paging.find('span[data-image]');
        this.settings.$pagingPoints.find('span')
        this.settings.$pagingPoints.addClass('control');

        //let autoPlay = setInterval(() => { this.next() }, this.settings.interval) ;
    },

    // Намира съответния клик.
    bindEvents: function () {
        this.settings.$control = this.settings.$slider.find('.slider__control');         
        $('.control').on('click', (event) => {
            this.resetAutoPlay(); 
            let action = event.target;
            let $action = $(action).data('image');
            this.sliderAction($action);
            console.log($action);

    //    this.settings.$control = this.settings.$slider.find('.slider__control');
    //this.settings.$control.on('click', (event) => {
     //       $('.slider__holder').find('.slider__item').removeClass('imageItems');
     //       this.resetAutoPlay();
     //       let button = event.target;
     //       let action = $(button).data('action');
      //      this.sliderAction(action);
     //   });

     //   this.settings.$pagingPoints.on('click', (event) => {
    //        this.resetAutoPlay();
    //        $('.slider__holder').find('.slider__item').addClass('imageItems');
    //       let point = event.target;
    //        let $point = $(point);
    //        let indexImage = $point.data('image');
     //       let $current = $('div[data-image=' + indexImage + ']');
    //        this.setCurrent($current);

      })
    },

    // След като са натиснат контролен бутон, намира кой бутон е натиснат.
    sliderAction: function (action) {
        switch (action) {
            case 'next':
            $('.slider__holder').find('.slider__item').removeClass('pointImage');
                this.next();
                console.log("next is action");
                break;

            case 'prev':
            $('.slider__holder').find('.slider__item').removeClass('pointImage');
                this.prev();
                console.log("prev is action")
                break;

            default:
            $('.slider__holder').find('.slider__item').addClass('pointImage');
                this.controlPoint(action);

                //console.log('Unknow action, pleace be careful');
                break;
        }
    },

    // Хваща следващата картинка.
    next: function () {
        this.settings.$current = $('.slider').find('.slider__item.current');
        let $next = this.settings.$current.next();
        if (!this.isExist($next)) {
            $next = this.settings.$items.first();
        }
        return this.setCurrent($next);
    },

    // Хваща предишната картинка
    prev: function () {
        let $prev = this.settings.$current.prev();
        if (!this.isExist($prev)) {
            $prev = this.settings.$items.last();
        }

        return this.setCurrent($prev);
    },
    controlPoint:function(indexImage){
        let $current = $('div[data-image=' + indexImage + ']');
        this.setCurrent($current);
    },

    // Инициализира новият текущ елемент
    setCurrent: function ($newCurrent) {
        this.reset();
        this.settings.$current = $newCurrent;
        let current_index = this.settings.$current.data('image');
        let $prev = this.getPrev();
        let $next = this.getNext();

        $prev.addClass('prev');
        $next.addClass('next');

        this.settings.$current.addClass('current');
        this.setCurrentPoint(current_index)
        return this.settings.$current;

    },

    // Инициализира текущата точка
    setCurrentPoint: function (index) {
        this.settings.activePoint = $('span[data-image=' + index + ']').addClass('active');
    },

    // Определяне на  предишния елемент от текушия.
    getPrev: function () {
        $prev = this.settings.$current.prev();

        if (!this.isExist($prev)) {
            $prev = this.settings.$items.last();
        }
        return $prev;
    },

    // Определяне на  следващия елемент от текущия
    getNext: function () {
        let $next = this.settings.$current.next();
        if (!this.isExist($next)) {
            $next = this.settings.$items.first();
        }
        return $next;
    },

    // Изтрива създадените класове active, prev, current, next.
    reset: function () {
        this.settings.$pagingPoints.removeClass('active');
        this.settings.$items.removeClass('prev current next');

    },

    // Проверява дали съществува даденият елемент.
    isExist: function ($element) {
        return $element.length !== 0;
    },

    // Извиква функцията за стартиране на плейлист.
    loadFeatures: function () {
        this.startAutoPlay();
    },

    // Стартира плейлиста.
    startAutoPlay: function () {
      let interval = this.settings.features.autoPlay.settings.interval;
    this.settings.features.autoPlay.fn = setInterval(() => { this.next() }, interval*1000);
    },

    // Рестартира плейлиста.
    resetAutoPlay: function () {
        clearInterval(this.settings.features.autoPlay.fn);
        this.startAutoPlay();
    },


}

adiSlider.initSlider()
