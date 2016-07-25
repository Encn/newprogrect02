//require("babel-polyfill") ;
//import Vue from "./vue";
//import MyTemplate from "../components/index.vue";
import "babel-polyfill";
import "./c";
import world from './world';
document.write(`Hello ${world}!`);

require("../css/index.less");
//babel-loader
var People=require("./c");
let p = new People("Yika");

document.getElementById("test").innerHTML=p.sayhi();


