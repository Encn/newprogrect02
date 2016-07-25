$(".fgta").click(function(){
	
	var val1 = $(".phone1").val();
	$.getJSON("http://123.56.183.56:8080/GoldenNurse/rest/login/vc?jsoncallback=?",{phone:val1},function(json){
		alert(json.result.randomCode)
	})
	$.ajax({
		dataType:"jsonp",
		
		url:"http://123.56.183.56:8080/GoldenNurse/rest/login/vc?jsoncallback=?",
		data:{
			"phone":val1
		},
		success:function(data){
			alert(data)
//			alert(data.indexOf("{"))
//			var str=data.slice(25)
//			console.log(str);
//			var oData2=JSON.parse(str)
////			alert(data)
//			if(oData2.ecode==200){
//				console.log("已发送");
//				$(".fgta").html("已发送")
//				$(".fgta").css("background","#ccc")
//				return true
//			}
//			else{
//				$(".prompt").css("visibility","visible")
//				$(".prompt").css("color","red")
//				$(".prompt").html("发送失败")
//			}
		}
	});
})

//window.onload=function(){
//	var cor=$(".fgta").css("background-color");
//	
//	console.log(cor);
//
//if(cor== "rgb(15, 145, 197)"){
//	
//	$(".fgta")[0].addEventListener("click",function(){
//		console.log("123");
//		$(".fgta")[0].style.background="red"
//		var cor1=$(".fgta").css("background-color");
//		cor=cor1
//		console.log(cor);
//	})
//	
//}else{
//	
//	console.log("12345");
//}
//	
//	
//	
//	
//}


