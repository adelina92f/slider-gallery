let adiSlider = {
   settings:{ 
    $slider : $('.slider'),
    $items : null,
    current: null,
    $current : null,
    $control : null,
    $paging : null,
    $pagingPoints : null,
    activePoint : null,
    
},
initSlider:function(){
    this.init();
   
    this.bindEvents(); 
},
init:function(image_index){
    this.settings.$items = this.settings.$slider.find('.slider__item')
    this.image_index = this.checkImageIndex(image_index);
    let image = this.settings.$items.get(image_index);
    let $image = $(image);
    this.createPoints()
    return this.setCurrent($image);
},
checkImageIndex:function (image_index){
    this.image_index = (typeof(image_index)=== 'undefined' || image_index < 0)? 0:image_index;
    this.image_index = (image_index > this.settings.$items.lenght-1)?this.settings.$items.lenght-1: this.image_index;
    return this.image_index;
}, 
createPoints:function(){
    this.settings.$paging = this.settings.$slider.find('.slider__paging');
    let itemsLength = this.settings.$items.length;
    let list = "";
    for (let i = 0; i < itemsLength; i++) {
       list += '<span data-image="'+i+'"></span>';
       let image =  this.settings.$items.get(i);
       let $image = $(image);
       $image.attr('data-image', i);
    }
    
    this.settings.$paging.append(list);  
    this.settings.$pagingPoints = this.settings.$paging.find('span[data-image]');
}, 
bindEvents:function(){
    this.settings.$control = this.$slider.find('.slider__control');
    this.$control.on('click', function(e){
        let action =$(this).data('action');
        this.sliderAction(action);
    })
}, 
sliderAction:function(action){
    switch(action) {
        case 'next':
            this.next();
            console.log("next is action");
            break;

        case 'prev':
            this.prev();
            console.log("prev is action")
            break;

        default:
            console.log('Unknow action, pleace be careful');
            break;
    }
},
    next:function (){
        this.settings.$current = this.$slider.find('.slider__item.current');
        let $next = this.settings.$current.next();
        if(!isExist($next)){
            $next =  this.settings.$items.first(); 
        }
        return this.setCurrent($next);
    },

    prev:function (){
        let $prev = $current.prev();
        if(!isExist($prev)){ //!!!
            $prev =  this.settings.$items.last(); 
        }

        return this.setCurrent($prev);
    },
    setCurrent:function ($newCurrent){
        this.reset();
        this.settings.$current = $newCurrent;
        let current_index = this.settings.$current.data('image');

        let $prev = this.getPrev(this.settings.$current);
        let $next = this.getNext(this.settings.$current);

        $prev.addClass('prev');
        $next.addClass('next');
        this.settings.$current.addClass('current');

        this.setCurrentPoint(current_index)

        return this.settings.$current;
    }, 
    setCurrentPoint:function (index){
        this.settings.activePoint = $('span[data-image='+ index +']').addClass('active');
     },
     getPrev:function($element){
        let $prev = $element.prev();
        if(!this.isExist($prev)){
            $prev = this.settings.$items.last(); 
        }
        return this.$prev;
    }, 
    getNext:function ($element){
        let $next = this.settings.$element.next();
        if(!isExist($next)){
            $next = this.settings.$items.first(); 
        }
        return this.$next;
    },
    reset:function (){
        this.settings.$pagingPoints.removeClass('active');
        this.settings.$items.removeClass('prev current next');
        
    },
    isExist:function($element){
        return $element.length !== 0;
    }
} 
adiSlider.initSlider()
