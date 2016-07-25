<template>
	<div class="content">
		<template v-for = "item in cpsEntity">
			<component  :is = "item.componentId" :cdata = "item" :sel = "selectPlan">
			</component>
		</template>
	</div>
	<footer>
		<div class = "money">
			<p>保费： </p>
			<span >￥</span><span class = "rmb" >1000</span>
		</div>
		<div class = "pay">
			<a href="javascript:void(0); " @click = "sure">确认购买</a>
		</div>
	</footer>
	<div class = "sure j_sure">
		<div class = "sure-opacity">
			<div class="sure-close" @click = "close">
				X
			</div>
		</div>
	</div>
	<div class = "sure-opacity1 j_sure">
		<div class=" sure-content">
			
			<h3>健康告知</h3>
			<ul v-for = "item in healthData" :itemId = "item.itemId">
				<li >{{ item.content }}</li>
				<select>
					<option value="否">否</option>
					<option value="是">是</option>
				</select>
			</ul>
		</div>
		<div class="sure-pay">
				<a @click = "sub"> 确认无异常  支付</a>
		</div>
	</div>
</template>
<style scoped="scoped">
	.content{
		width:100%;
		overflow-x: hidden;
		height: 95%;
	}
	.banner{
		width: 100%;
		height: 2rem;
	}
	.banner img{
		display: block;
		border: none;
		width:100%;
		height: 100%;
	}
	.kong{
		width: 100%;
		height: 0.1rem;
		background: #E7E7E9;
	}
	footer{width:100%;overflow: hidden;height: 0.65rem;border-bottom: 1px solid #E4E4E6;box-sizing: border-box;padding-left: 0.32rem;position: fixed;bottom: 0;background: #fff;}
	.money{width: 45%;height: 100%;float: left;}
	.money p,.money span{display: inline-block;height: 100%;line-height: 0.65rem;font-size:0.24rem;}
	.money span{color: #EC6C00;}
	.money .rmb{font-size: 0.28rem;color: #EC6C00;font-weight: bold;}
	
	.pay{width: 55%;float: left;}
	.pay a{display: block;width: 100%;height: 100%;color: #fff;background: #01B786;text-align: center;line-height: 0.65rem;font-size: 0.26rem;}
	.sure{display: none;width: 100%;height: 100%;background: #000;position: absolute;left: 0;top: 0;
		filter:alpha(opacity=50);   
      	-moz-opacity:0.5;   
      	opacity: 0.5; 
     	 z-index: 10;
     	 overflow: hidden;
	}
	.sure-close{
		position: absolute;
		width: 0.5rem;height: 0.5rem;border: 1px solid #FFFFFF;border-radius: 50%;color: #fff;text-align: center;line-height: 0.5rem;
		left: 5.6rem;top:20%;
		margin-top: -0.5rem;
	}
	.sure-opacity1{
		position: absolute;
		top: 20%;
		z-index: 50;
		opacity: 1;
		display: none;
		width: 100%;
		height:80%;
		background: #fff;
	}
	.sure-content{
		background: #FFFFFF;
		max-height: 8rem;
		overflow: auto;
		width: 100%;
	}
	.sure-content h3{color: #01B786;font-size: 0.32rem;text-align:center;line-height: 1.16rem;}
	.sure-content ul{
		width: 80%;
		margin: 0.1rem auto;
		overflow: hidden;
		display:box;
		display: -webkit-box;
	}
	.sure-content li{color: #000;
		font-size: 0.2rem;
		line-height: 0.34rem;
		width:80%;
	}
	.sure-content select{
		box-flex:1;
		font-size: 0.2rem;
		line-height: 0.34rem;
		vertical-align: center;
		margin: 0.2rem;
		color: #000
	}
	.sure-pay{
		background: #01B786;
		color: #fff;
		font-size: 0.26rem;
		text-align: center;
		line-height: 0.9rem;
		width: 100%;
		position:fixed;
		bottom:0;
	}
	

</style>
<script>

	import data from "../data/data.json";
	import $ from "../src/jquery.min.js";
	//获取地址栏productId,channelId,seedId,openId;
	var productId =getParameter("productId");
	var channelId =getParameter("channelId")||"60185";
	var seedId =getParameter("seedId")||"";
	var openId =getParameter("openid")||"omCIGjy-SdKzRp6LEvjS0_0OayH0";
	// 获取元数据
	// var data = {};
	// $.ajax({
	// 	type:"get",
	// 	url:"http://insure.test.hera.tk.cn/hera_insure/api/insure/v1/productMetadata/"+productId+"/cps/entity",
	// 	async:false,
	// 	dataType:"json",
	// 	success:function(msg){
	// 		if(msg.data){
	// 			data = msg.data;
	// 		}
	// 		else{
	// 			alert("套餐id不对")
	// 		}
			
	// 	},
	// 	error:function(msg){
	// 		location.href = "../html/lose.html"
	// 	}
	// });
	//生成客户表单id号
	var applicationId = "";
	var applicationToken = "";
	$.ajax({
		type:"post",
		url:"http://insure.test.hera.tk.cn/hera_insure/api/insure/v1/application/",
		async:false,
		success:function (msg){
			applicationId = msg.data.applicationId;
			applicationToken = msg.data.applicationToken;
		},
		error:function (msg){
			alert("生成客户表单失败"+msg)
		}
	});
	var components = data.cpsEntity;
	//动态模板的创建
	window.realComponents = {};
	window.applicantInfo = {};
	window.suredInfo = {};
	window.insuredPerson = {}
	//判断是否存在投保人/被保人信息填写子组件
	var info_arr = ["tkApplicantEmail","tkApplicantId","tkApplicantIdType","tkApplicantName","tkApplicantPhone","tkInsuredId","tkInsuredName","tkApplicantArea","tkApplicantProfession","tkApplicantGender"];
	//判断是否有健康告知
	var healthinfoStatus = "" ;
	components.forEach(function (item,index){
		//	投保人inputs模板的动态创建
		if(item.componentId == "tkApplicantInfo"){
			var applicantInputs = item.applicantInfo;
			applicantInputs.forEach(function (item,index){
				//过滤投保人信息模板
				if(info_arr.indexOf(item.componentId) != -1){
					window.applicantInfo[item.componentId] = require("./"+item.componentId);
				}
				//判断健康告知有无
				if(item.componentId == "tkApplicantHealth"){
					healthinfoStatus = item.tkDefaultValue;
				}
				
			});
		}
		//	被保人inputs模板的动态创建
		if(item.componentId == "tkInsuredInfo"){
			var suredInputs = item.insuredInfo;
			suredInputs.forEach(function (item,index){
				//过滤被保人信息模板
				if(info_arr.indexOf(item.componentId) != -1){
					window.suredInfo[item.componentId] = require("./"+item.componentId);
				}
				//存储被保人与投保人关系
				if(item.componentId == "tkInsuredRelationship"){
					window.insuredPerson = item.tkOptions;
				}
			});
		}	
		//	基础模块的模板创建
		var realComponent = require("./"+item.componentId);
		realComponents[item.componentId] = realComponent;
		
	});
	data.selectPlan = {};
	data.healthData = [];
	//回传报文的初始定义
	var tradeCost = $(".rmb").text();
	var sendObj = {
				    "platform": "cps",
					"channelId": channelId,
					"seedId": seedId,
					"productId": productId,
					"applicationId": applicationId,
					"applicationToken": applicationToken,
					"processHandler":"property",
					"successUrl":"http://insure.test.hera.tk.cn/cps/html/pay_success.html",
					"failUrl":"http://insure.test.hera.tk.cn/cps/html/pay_error.html",
				    "details":{
				        "planId":"",
				        "planPrice":"",
				        "planLiabilityList":[
				            
				        ]
				    },
				    "inputs":{
				        "applicantInfo":{
				            "applicantIdType":"01",
				            "applicantProvince": "",
							"applicantCity": "",
            				"applicantProfession": "2201001"
				        },
				        "insuredInfo":[
				            {
				                "insuredRelationship":"40",
				                "insuredName":"",
				                "insuredIdType":"01",
				                "beneficiaryLegal":true,
				                "beneficiaryInfo":[
				                ]
				            }
				        ]
				    }
				}
	export default{
		data (){
			return data
		},
		computed:{
		},
		ready (){
			//初始化的时候默认显示白银款的价钱
			$(".rmb").html($(".plan-list").eq(0).attr("planPrice"))
			//	初始化的时候让回传信息默认选择白银款的责任信息
			this.selectPlan.planId = $(".plan-list").eq(0).attr("planId");
			this.selectPlan.planPrice = $(".plan-list").eq(0).attr("planPrice");
			this.selectPlan.planLiabilityList = [];
			var that = this;
			$(".plan-list").eq(0).children().each(function (index,item){
				if($(item).attr("liabilityId")){
					var obj = {};
					obj["liabilityId"] = $(item).attr("liabilityId");
					that.selectPlan.planLiabilityList.push(obj);
				}
				
			})
			// 判断是否显示为子女投保的选项
			if($(".input-list").length == 1){
				$(".person-choose").addClass("hidden")
			}
		
		},
		methods:{
			sure (){
				var a = false;
				var b = false;
				var ind = $(".person-con").children(".active").index();
				//确认购买时所有信息的再一次验证
				$(".input-list").eq(0).find("input").each(function (index,item){
					if(item.value && $(this).parent().next().css("display") == "none"){
						a = true;
					}
					else{
						$(this).parent().next().show();
						if(!item.value){
							$(this).parent().next().text($(this).prev().text()+"不能为空");
						}
						a = false;
						return false;
					}
				});
				if($(".input-list").eq(1).css("display") == "block"){
					$(".input-list").eq(1).find("input").each(function (index,item){
						if(item.value && $(this).parent().next().css("display") == "none"){
							a = true;
						}
						else{
							$(this).parent().next().show();
							if(!item.value){
								$(this).parent().next().text($(this).prev().text()+"不能为空")
							}
							a = false;
							return false;
						}
					});
				}
				//是否同意健康告知的勾选验证
				if($("input:last")[0].checked){
					b = true;
				}
				else{
					$(".error-health").show();
					b= false;
				}
				//验证通过之后的后续操作
				if(a&&b){
					//回传信息随着套餐的选择变更
					sendObj.details.planId = this.selectPlan.planId;
					sendObj.details.planPrice = this.selectPlan.planPrice;
					sendObj.details.planLiabilityList = this.selectPlan.planLiabilityList;
					$(".input-list").eq(0).find("input").each(function (index,item){
						if(item.getAttribute("tkId")){
							if(item.getAttribute("tkId") == "applicantArea"){
								var area_code = item.getAttribute("areacode").split(",")
								sendObj.inputs.applicantInfo.applicantProvince = area_code[0];
								sendObj.inputs.applicantInfo.applicantCity = area_code[1];
							}
							sendObj.inputs.applicantInfo[item.getAttribute("tkId")] = item.value;
							var insuredStr = item.getAttribute("tkId").substring(9);
							sendObj.inputs.insuredInfo[0]["insured"+insuredStr] = item.value;
							sendObj.inputs.insuredInfo[0].insuredRelationship = "01";
						}
						
					});
					//职业和性别的回传变更
					$(".profession,.gender").each(function(index,item){
						if(item.getAttribute("tkId")){
							sendObj.inputs.applicantInfo[item.getAttribute("tkId")] = item.value;
						}
					})
					// sendObj.inputs.applicantInfo.applicantProfession = $(".input-list").eq(0).find(".profession").val()||"2201001";
					// //性别的回传
					// sendObj.inputs.applicantInfo.applicantProfession = $(".input-list").eq(0).find(".profession").val()||"2201001";
					$(".input-list").eq(1).find("input").each(function (index,item){
						if(item.getAttribute("tkId")&&item.value){
							sendObj.inputs.insuredInfo[0][item.getAttribute("tkId")] = item.value;
							sendObj.inputs.insuredInfo[0].insuredRelationship = $(".person-con p").eq(1).attr("code")||"40";
						}
						
					});
					sessionStorage.setItem("data",JSON.stringify(sendObj))
					sessionStorage.setItem("productId",productId)
					//保存客户操作的接口
					$.ajax({
						type:"post",
						url:"http://insure.test.hera.tk.cn/hera_insure/api/insure/v1/application/"+applicationId+"/details_inputs",
						async:false,
						data:JSON.stringify(sendObj),
						dataType:"json",
						success:function(msg){
							if(msg.error_code == "0"){
								if(healthinfoStatus){}
								else{
									location.href = "payment.html";
								}
								
							}
							else{
								alert(msg.error_message);
								return false;
							}
						},
						error:function(msg){
							alert(msg);
						}
					});
					//根据健告有无判断是否显示
					if(healthinfoStatus){
						
						//获取健康告知
						var sendObj_health = {
							"applicationId": applicationId,
							"applicationToken": applicationToken
						};
						var vue_this = this;
						$.ajax({
							type:"post",
							url:"http://insure.test.hera.tk.cn/hera_insure/api/insure/v1/productMetadata/"+productId+"/cps/healthinfo",
							async:false,
							data:JSON.stringify(sendObj_health),
							success:function(msg){
								if(msg.error_code == "0"){
									vue_this.healthData = msg.data.valueList;
								}
								else{
									alert(msg.error_message)
								}
								
							},
							error:function(msg){
								alert("健康告知接口失败"+msg)
							}
						});
						//健康告知的弹框
						$(".j_sure").show();
						$("html").css({"overflow":"hidden","height":"100%"});
						$("body").css({"overflow":"hidden","height":"100%"});
					}
				}
				
				
			},
			close (){
				$(".j_sure").hide()
				$(".detail").hide()
				$(".desc").hide()
				$(".profession-desc").hide();
				$(".profession-close").hide();
				$(".iterm").hide()
				$(".notice").hide()
				$(".productinfo-know").hide()
				$(".productinfo-desc").hide();
				$("html").css({"overflow":"auto","height":"100%"})
				$("body").css({"overflow":"auto","height":"100%"})
			},
			sub (){
					//健康告知内容的变更
					var healthObj = {
							"applicationToken": applicationToken,
							"processHandler":"property",
							"healthinfo":{
								"informList":[]
							}
						};
					var health_stadius = false;
					$(".sure-content").find("ul").each(function (index,item){
						var obj = {};
						if($(item).find("select").val() == "是"){
							alert("您已经不符合投保要求。您不能购买此款保险");
							health_stadius = true;
							return false;
						}
						obj["informID"] = $(item).attr("itemID");
						obj["informAnswer"] = $(item).find("select").val();
						healthObj.healthinfo.informList.push(obj);
					})	
					if(health_stadius){
						return false;
					}
				//保存健康告知的操作
				$.ajax({
					type:"post",
					url:"http://insure.test.hera.tk.cn/hera_insure/api/insure/v1/application/"+applicationId+"/healthinfo",
					async:false,
					data:JSON.stringify(healthObj),
					dataType:"json",
					success:function(msg){
						if(msg.error_code == "0"){
							location.href = "payment.html";
						}
						else{
							alert(msg.error_message)
						}
					},
					error:function(msg){
						alert(msg);
					}
				});
				

			}
		},
		components:realComponents
	}
	
	//获取地址栏里的参数
function getParameter(param){
	var query = window.location.search;//获取URL地址中？后的所有字符
	var iLen = param.length;//获取你的参数名称长度
	var iStart = query.indexOf(param);//获取你该参数名称的其实索引
	if (iStart == -1){//-1为没有该参数
		return "";
	}
	iStart += iLen + 1;
	var iEnd = query.indexOf("&", iStart);//获取第二个参数的其实索引
	if (iEnd == -1){//只有一个参数
		return query.substring(iStart);//获取单个参数的参数值
	}
	return query.substring(iStart, iEnd);//获取第二个参数的值
}	
	
	
	
	
	
</script>






































