import Vue from "./vue";
import MyTemplate from "../components/index.vue";
require("./rem.js")
require("../css/style.css")
require("../css/jquery.fancyspinbox.css");
require("../css/dialog.min.css");
require("../css/mobile-select-area.css");
new Vue({
	el:"body",
	components:{
		MyTemplate
	}
})
