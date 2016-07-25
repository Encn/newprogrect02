//定义类
//
class Point{
	constructor(x,y){//ES5的构造函数Point，对应ES6的Point类的构造方法。类=构造函数；
		this.x=x;
		this.y=y;
	}
	toString(){
		return "("+this.x+","+this.y+")";
	}
}

var point=new Point(2,3);
point.toString();
point.hasOwnProperty('x');//true  x和y都是实例对象point自身的属性（因为定义在this变量上）
point.hasOwnProperty('toString') // false  实例的属性定义在原型上（即定义在class上)
point.__proto__.hasOwnProperty('toString') // true

//类的数据类型就是函数，类本身就指向构造函数。new命令;类的构造函数，不使用new是没法调用的
typeof Point // "function"
Point === Point.prototype.constructor // true
//b是B类的实例，b的constructor方法就是B类原型的constructor方法
///B类的新方法de添加:
///Object.assign(B.prototype,{//在prototype对象上面
///				toValue(){},
///				toString(){}
///})方法
///
///
///类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
// 
// 
// //类的属性名，可以采用表达式
let methodName = "getArea";
class Square{
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}


//不存在变量提升 必须保证子类在父类之后定义
//new Foo(); // ReferenceError
//class Foo {}



//继承extends，super来新建父类的this对象
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  	super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
}

let cp = new ColorPoint(); //实例对象cp同时是ColorPoint和Point两个类的实例

//ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。