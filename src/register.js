//window.onload = function(){}	

function change(){
	$(".tel").blur(telp);
	function telp(){
		var tel = $(".tel").val();
		var rel = /^[1][34578][0-9]{9}$/g
		if(rel.test(tel)){
			$(".tishi").eq(0).text("");
			return true;
			
		}
		else{
			$(".tishi").eq(0).text("请填写正确的电话号");
			return false;
		}
		
	}
	$(".password").blur(pawd);
	function pawd(){
		var password = $(".password").val();
		var rel = /.{6,16}/g;
		var rel2 = /^[0-9]+$/g;
		var rel3 = /^[0-9_a-zA-Z]{6,18}$/g;
		var a =0,b = 0,c=0;

		if(rel.test(password)){
			a = 1;
		}
		else{
			$(".tishi").eq(2).text("密码必须为6到16位");
			return false;
		}
		if(rel2.test(password)){
			$(".tishi").eq(2).text("密码不能为纯数字");
			return false;
		}
		else{
			b = 1;
		}
		if(rel3.test(password)){
			c = 1;
			$(".tishi").eq(2).text("");
		}
		else{
			$(".tishi").eq(2).text("密码只能为数字字母下划线组成");
			return false;
		}
		if(a&b&c){
			return true;
		}
		
	}
	$(".nickname").blur(nknm);
	function nknm(){
		
		var  nickname = $(".nickname").val();
		var rel = /.{6,16}/g;
		var rel2 = /^[0-9]+$/g;
		var rel3 = /^[0-9_a-zA-Z]{6,18}$/g;
		var a =0,b = 0,c=0;
		
		if(rel.test(nickname)){
			a = 1;
		}
		else{
			$(".tishi").eq(2).text("用户名必须为6到16位");
			return false;
		}
		if(rel2.test(nickname)){
			$(".tishi").eq(2).text("用户名不能为纯数字");
			return false;
		}
		else{
			b = 1;
		}
		if(rel3.test(nickname)){
			c = 1;
			$(".tishi").eq(2).text("");
		}
		else{
			$(".tishi").eq(2).text("用户只能为数字字母下划线组成");
			return false;
		}
		if(a&b&c){
			return true;
		}
	}	
	$(".tel0").blur(telp0);
	function telp0(){
		var tel = $(".tel0").val();
		var rel = /^[1][34578][0-9]{9}$/g
		if(rel.test(tel)){
			$(".tishi0").eq(2).text("");
			return true;
			
		}
		else{
			$(".tishi0").eq(2).text("请填写正确的电话号");
			return false;
		}
		
	}
	$(".password0").blur(pawd0);
	function pawd0(){
		var password = $(".password0").val();
		var rel = /.{6,16}/g;
		var rel2 = /^[0-9]+$/g;
		var rel3 = /^[0-9_a-zA-Z]{6,18}$/g;
		var a =0,b = 0,c=0;

		if(rel.test(password)){
			a = 1;
		}
		else{
			$(".tishi0").eq(4).text("密码必须为6到16位");
			return false;
		}
		if(rel2.test(password)){
			$(".tishi0").eq(4).text("密码不能为纯数字");
			return false;
		}
		else{
			b = 1;
		}
		if(rel3.test(password)){
			c = 1;
			$(".tishi0").eq(4).text("");
		}
		else{
			$(".tishi0").eq(4).text("密码只能为数字字母下划线组成");
			return false;
		}
		if(a&b&c){
			return true;
		}
		
	}
	// $("#form").submit(function(){
	// 	function ajax(){
	// 		var tel = $(".tel").val();
	// 		var pawd = $(".password").val();
	// 		var nknm = $(".nickname").val();
			
	// 		$.ajax({
	// 		url:"http://localhost:8080/Proxy/FootBall/user/json/reg.do",
	// 		data:{"loginname":tel,"password":pawd,"nickname":nknm},
	// 		async:false,
	// 		success:function(str){
	// 			var obj = JSON.parse(str);
				
	// 			ecode = obj.ecode;
				
	// 			if(obj.ecode ==200){
	// 				$(".tishi").eq(3).attr("id","200");
	// 				console.log("ajax成功没重复")
	// 				$(".tishi").eq(3).text("");
	// 			}
	// 			else{
	// 				console.log("ajax没成功")
	// 				$(".tishi").eq(3).text("用户名已经注册");
	// 				$(".tishi").eq(3).attr("id","500");
	// 			}
			
	// 		}
	// 		})
			
	// 	}
	// 	ajax();
	// 	var num =$(".tishi").eq(3).attr("id");
	
	// 	if(telp()&&pawd()&&nknm()&&num==200){
	// 			console.log("已经成功")		
	// 			return true;
	// 			// window.open("login.html","_self");
	// 	}
	// 	else{
	// 		console.log(num)
	// 			return false;
			
	// 	}
	// })
	function ajax(){

			var tel = $(".tel").val();
			var pawd = $(".password").val();
			//var nknm = $(".nickname").val();
			var ecode;
			$.ajax({
			url:"http://localhost:8080/Proxy/FootBall/user/json/reg.do",
			data:{"loginname":tel,"password":pawd,"nickname":nknm},
			async:false,
			success:function(str){
				var obj = JSON.parse(str);
				
				if(obj.ecode ==200){
					ecode =200;
				}
				else{
					ecode =500;
				}
			
			}
			})
			if(ecode == 200){
				return true;
			}else {
				return false;
			}
			
	}
	
	$("#form").submit(function(){
		// console.log(telp())
		// console.log(pawd())
		// console.log(nknm())
		
		// console.log(ajax())  &&nknm()
		if(telp()&&pawd()){
			    var a  = ajax();
			    if (!a) {
			    	$(".tishi").eq(3).text("用户名已经注册");
			    	return false;
			    }
				
				// window.open("login.html","_self");
		}
		else{
				
			       return false;
		}
		
	})
}

change();
module.exports=change;