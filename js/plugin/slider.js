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
    interval : 7000,
    image_index:null,
},
initSlider:function(){
    this.init(); 
    this.bindEvents(); 
    this.bindEventPoint();
},
init:function(number){
    this.settings.$items = this.settings.$slider.find('.slider__item')
    this.checkImageIndex(number);
    let image = this.settings.$items.get(this.settings.image_index);
    //console.log(image);
    let $image = $(image);
    this.createPoints()
    return this.setCurrent($image);
},
checkImageIndex:function (number){
    //console.log(number);
    number = (typeof(number)=== 'undefined' || number < 0)? 0: number;
    this.settings.image_index = (number > this.settings.$items.lenght-1)? this.settings.$items.lenght-1:number;
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
    
    //this.autoPlay();
}, 
bindEventPoint:function(){
    (this.settings.$pagingPoints).on('click', (e) => {
        let button = e.target;
        let $button = $(button).data('image');
        this.newCurrent($button);
    })
},

bindEvents:function(){
    this.settings.$control = this.settings.$slider.find('.slider__control');
    this.settings.$control.on('click',(event) =>{
        this.settings.$items.removeClass('imageItems');
        let button = event.target;
        let $button = $(button).data('action'); 
        //console.log($button);
        this.sliderAction($button);
       
        //console.log(event.target);
        //console.log(this);
    })

//    this.settings.$control.on('click',function(event){
//      let button = this;
//       let $button = $(button); 
//        console.log(this);
//        console.log(adiSlider);
//     })

},

sliderAction: function($button){
    switch($button) {   
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
        this.settings.$current = $('.slider').find('.slider__item.current');
        let $next = this.settings.$current.next();
        if(!this.isExist($next)){
            $next = this.settings.$items.first(); 
        }
        return this.setCurrent($next);
    },
    prev:function (){
        let $prev = this.settings.$current.prev();
        if(!this.isExist($prev)){ 
             $prev = this.settings.$items.last(); 
        }

        return this.setCurrent($prev);
    },
    newCurrent:function($button){
        this.reset();
        this.settings.$current = $('div[data-image='+ $button +']').addClass('current');
        this.settings.$items.addClass('imageItems');
        this.setCurrent(this.settings.$current);
    },
    setCurrent:function ($newCurrent){
        this.reset();
        this.settings.$current = $newCurrent;
        let current_index =  this.settings.$current.data('image');

        //console.log('current index e '+current_index);
        let $prev = this.getPrev();
        let $next = this.getNext();
        //console.log($next);
        
        $prev.addClass('prev');
        //console.log(this.settings.$current);
        $next.addClass('next');
       // console.log($newCurrent);
    
        this.settings.$current.addClass('current');
        //console.log($prev);
        this.setCurrentPoint(current_index)
        return this.settings.$current;
        
    }, 
    autoPlay:function(){
    setInterval(() => { this.next() }, this.settings.interval) 
    },

    setCurrentPoint:function (index){
        this.settings.activePoint = $('span[data-image='+ index +']').addClass('active');
     },
     getPrev:function(){
       // let $prev = $element.prev();
        //if(!this.isExist($prev)){
        //    $prev = this.settings.$items.last(); 
       // }
        //return this.$prev;
       
        $prev = this.settings.$current.prev();

         if(!this.isExist($prev)){
              $prev = this.settings.$items.last(); 
           }
           return $prev;
    }, 
    getNext:function (){
        let $next = this.settings.$current.next();
        if(!this.isExist($next)){
            $next = this.settings.$items.first(); 
        }
        return $next;
    },
    
    reset:function (){
        this.settings.$pagingPoints.removeClass('active');
        this.settings.$items.removeClass('prev current next');
        
    },
    isExist:function($element){
        return $element.length !== 0;
    },
    
} 

adiSlider.initSlider()
