// js/es6-module.js   bebel-loader  babel-polyfill
class People{
  constructor(name){
    this.name = name;
  }
  sayhi(){
  	return  `hi, ${this.name} !`
  }
}
module.exports= People;
