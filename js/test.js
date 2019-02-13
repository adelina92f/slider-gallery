let number = 123;
let str = '123';
let array = [number, str];

let cat = {
    init: function(name, color){
        this.name = name;
        this.color = color;
        this.sleep = cat.sleep;
    },
    name: null,
    color: null,

    sleep: function(){
        console.log(this.name + ': ZzZZZzzzzz');
    },
    eat: null
}

// $('.cssSelector').addClass();

let cat_1 = new cat.init("tiger", "brownblack");
let cat_2 = new cat.init("litle", "white");

cat_2.sleep()





