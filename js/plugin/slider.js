let adiSlider = {
   settings:{ 
    $slider : null,
    $items : null,
    current: null,
    $current :null,
    $control :null,
    $paging :null,
    $pagingPoints : null,
    activePoint : null,
},
initSlider:function (){
    this.init();
   
    this.bindEvents(); 
},
init:function(image_index){
    this.$slider = $('.slider');
    this.settings.$items = $slider.find('.slider__item');
    this.image_index = checkImageIndex(image_index);
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
createPoints:function (){
    let itemsLength =this.settings.$items.length;
    this.settings.$paging = $slider.find('.slider__paging');
    let list = "";
    for (let i = 0; i < itemsLength; i++) {
       list += '<span data-image="'+i+'"></span>';
       let image =  this.settings.$items.get(i);
       let $image = $(image);
       $image.attr('data-image', i);
    }
    
    this.$('.slider__paging').append(list);  
    $pagingPoints = this.settings.$paging.find('span[data-image]');
}, 
bindEvents:function  (){
    this.settings.$control =  $slider.find('.slider__control'); 
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
        current = this.settings.$slider.find('.slider__item.current')
        let $next = this.settings.$current.next();
        if(!isExist($next)){
            $next =  this.settings.$items.first(); 
        }
        return setCurrent($next);
    },

    prev:function (){
        let $prev = this.settings.$current.prev();
        if(!isExist($prev)){ //!!!
            $prev =  this.settings.$items.last(); 
        }

        return setCurrent($prev);
    },
   
} 
adiSlider.initSlider()
