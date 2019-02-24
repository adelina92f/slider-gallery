let adiSlider = {
    declaration: function() { 
    let $slider = this.$('.slider');
    let $items = this.$slider.find('.slider__item');
    let current;
    let $current = this.$slider.find('.slider__item.current');
    let $control = this.$slider.find('.slider__control');
    let $paging = this.$slider.find('.slider__paging');
    let $pagingPoints;
    let activePoint;
},
initSlider:function (){
    this.init();
   
    this.bindEvents(); 
},
init:function(image_index){
    this.image_index = checkImageIndex(image_index);
    let image = this.$items.get(image_index);
    let $image = $(image);
    this.createPoints()
    return this.setCurrent($image);
},
checkImageIndex:function (image_index){
    this.image_index = (typeof(image_index)=== 'undefined' || image_index < 0)? 0:image_index;
    this.image_index = (image_index > $items.lenght-1)? $items.lenght-1: image_index;
    return this.image_index;
}, 
createPoints:function (){
    let itemsLength =this.$items.length;
    let list = "";
    for (let i = 0; i < itemsLength; i++) {
       list += '<span data-image="'+i+'"></span>';
       let image =  this.$items.get(i);
       let $image = this.$(image);
       this.$image.attr('data-image', i);
    }
    
    this.$('.slider__paging').append(list);  
    $pagingPoints = this.$paging.find('span[data-image]');
}, 
bindEvents:function  (){
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
}
    