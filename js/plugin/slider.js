function adiSlider(){
    let $slider = $('.slider');
    let $items = $slider.find('.slider__item');
    let current;
    let $current = $slider.find('.slider__item.current');
    let $control = $slider.find('.slider__control');
    let $paging = $slider.find('.slider__paging');
    let $pagingPoints;
    let activePoint;
    // [1] 2 3 4 5 {6}
    // https://api.jquery.com/first/
    // https://api.jquery.com/next/
    // https://api.jquery.com/prev/
    // https://api.jquery.com/last/

    // $(element).data('action');
    // https://api.jquery.com/data/

    // -15  [1 2 3 4 5 6] 15

    function initSlider(){
        init();
       
        bindEvents(); 
    }

    
    function init(image_index){

        image_index = (typeof(image_index) === 'undefined' || image_index < 0) ? 0 : image_index;
        image_index = (image_index > $items.length - 1) ? $items.length - 1 : image_index;

        let image = $items.get(image_index);
        let $image = $(image); 
        
        createPoints()
        return setCurrent ($image);
    }

    function createPoints(){
        let itemsLength = $items.length;
        let list = "";
        for (let i = 0; i < itemsLength; i++) {
            list += '<span data-image="'+i+'"></span>';
           let image =  $items.get(i);
           let $image = $(image);
           $image.attr('data-image', i);
        }
        
        $('.slider__paging').append(list);  
        $pagingPoints = $paging.find('span[data-image]');
    }

    function  bindEvents(){
        $control.on('click', function(e){
            let action = $(this).data('action');
            sliderAction(action);
        })
    }

    function sliderAction(action){
        switch(action) {
            case 'next':
                next();
                break;

            case 'prev':
                prev();
                break;

            default:
                console.log('Unknow action, pleace be careful');
                break;
        }
    }
 let i = 1;
    function next(){
        let $next = $current.next();
        if(!isExist($next)){ //!!!
            $next =  $items.first(); 
        }
        return setCurrent($next);
    }

    function prev(){
        let $prev = $current.prev();
        if(!isExist($prev)){ //!!!
            $prev =  $items.last(); 
        }

        return setCurrent($prev);
    }
 

    function setCurrent($newCurrent){
        reset();

        $current = $newCurrent;
        let current_index = $current.data('image');

        let $prev = getPrev($current);
        let $next = getNext($current);

        $prev.addClass('prev');
        $next.addClass('next');
        $current.addClass('current');

        setCurrentPoint(current_index)

        return $current;
    }

    function setCurrentPoint(index){
       activePoint = $('span[data-image='+ index +']').addClass('active');
    }
      
    function getPrev($element){
        let $prev = $element.prev();
        if(!isExist($prev)){
            $prev = $items.last(); 
        }
        return $prev;
    }

    function getNext($element){
        let $next = $element.next();
        if(!isExist($next)){
            $next = $items.first(); 
        }
        return $next;
    }

    function reset(){
        $pagingPoints.removeClass('active');
        $items.removeClass('prev current next');
        
    }
   
    /*
        @true for existing 
        @false for not existing
    */
    function isExist($element){
        return $element.length !== 0;
    }

    setInterval (next, 5000);
    // function notExist($element){
    //     return $element.length === 0;
    // }

    //initial slider;
    initSlider();
}
    