/*  定义变量*/
var createTab = '<form id="b-1" class="form-control fc"><table class="tab tab-built jbzc"><tr><td>组成项</td><td>性质</td><td>比例</td><td>次数</td><td>操作</td></tr><tr><td><select class="set" name="zucheng"><option value="0">请选择</option><option value="kaoqin">考勤</option><option value="dabian">答辩</option><option value="zuoye">作业</option><option value="qizhong">期中考试</option><option value="qimo">期末考试</option></select></td><td><select name="xingzhi" class="xz"><option value="0">请选择</option><option value="pingshen">评审</option><option value="pingding">评定</option></select></td><td><input type="text" name="bili"/>%</td><td><input type="text" name="cishu" />次</td><td><button type="button" class="btn btn-default jbzcdet">删除</button></td></tr><tr><td rowspan="2" colspan="4"><textarea placeholder="请填写" name="b-shuoming"></textarea></td><td><button type="button" class="btn btn-default">修改</button></td></tr><tr><td><button type="button" class="btn btn-default jljbzc_bc">保存</button></td></tr></table></form>';
 var test = 0;
 var json_test = 0;
 var teacher_id = 0;
 var tclass_no = 0;
 var json_assess = 0;
 var Course_no = 0; //存储课程编号
 //var form_data = '';//表单序列化数据变量
/*   */
var classNumber = new Array();
var classID = 0;
var teacher = '';
var courseName = '';
var dengluname = $(".username");
var dengluid = $(".userid");
	dengluname.html('');
	dengluid.html('');
	
$(function(){
	//页面加载时请求数据
	$.ajax({
		url:"./php/ajax/get_user_id.php",
		type:"GET",
		dataType:"json",
		cache:false,
		//timeout:150,
		error:function(){
			// alert("....error.....");
			window.location.href="login.html";
			},
		success:function(data){
			var data = eval(data);
			var userid = data.id;
			var username = data.name;
			var role = data.role;
			//teacher_id = parseInt($('.userid').html());
			//alert(userid);
			dengluname.html(username);
			dengluid.html(userid);
			//alert(userid);
			if(userid){	
				$.ajax({
					url:"./php/ajax/get_class.php",
					type:"GET",
					dataType:"json",
					cache:false,
					beforeSend:loadFunction,
					error:errorFunction,
					success:successFunction
				})
			}else{
				window.location.href="login.html";
			}
		}
	})
		function loadFunction(){
			$("#c_list").html('.. *^_^* 加载中 *^_^* .');
		}
		function errorFunction(){
			alert("error..... >_ < ? ....出错啦.");
		}
		function successFunction(data){ //数组 类型	
		// var user = userID;
		// alert(user);
		var clist = $("#c_list")
			clist.html('');
			var json = eval(data);  //转换为json类型
			var coursenumber = 0;  //点击左边课表传给后台的课程编号
			$.each(json,function(index,item){			
				var list = json[index].Cname;
				var listNum = json[index].Tclass_class_no;
				var list_specialty = json[index].Tclass_specialty;//课程编号添加  Tclass_specialty变量来自？
				var val = index+1;
				Course_no = json[index].tclass_course_no;//读取课程编号
				classNumber[index] = Course_no;
				clist.html(clist.html()+'<li value='+val+'> <b><p>'+ list + '</p></b>'+ '<span>'+list_specialty +'</span><span>'+listNum +'</span>'+ '</li>' );
				
				var html = $('#c_list li:eq(0)>b').html()+'<p>'+json[0].tclass_course_no+'</p>';
						   $("#c_name").html(html);    
			});
			/**********************************************************************/
			//左侧课表点击 改变对应属性
				var cnumindec = 0;
				var c_list = $('#c_list li');
				var createForm = '<div class="t homepagemes"></div>';
				var createTab = '<form class="form-control"><table class="tab tab-built jbzc"><tr><td>组成项</td><td>性质</td><td>比例</td><td>次数</td><td>操作</td></tr><tr><td><select class="set" name="zucheng"><option value="0">请选择</option><option value="kaoqin">考勤</option><option value="dabian">答辩</option><option value="zuoye">作业</option><option value="qizhong">期中考试</option><option value="qimo">期末考试</option></select></td><td><select name="xingzhi" class="xz"><option value="0">请选择</option><option value="pingshen">评审</option><option value="pingding">评定</option></select></td><td><input type="text" name="bili"/>%</td><td><input type="text" name="cishu" />次</td><td><button type="button" class="btn btn-default jbzcdet">删除</button></td></tr><tr><td rowspan="2" colspan="4"><textarea placeholder="请填写" name="b-shuoming"></textarea></td><td><button type="button" class="btn btn-default formChange">修改</button></td></tr><tr><td><button type="button" class="btn btn-default jljbzc_bc">保存</button></td></tr></table></form>';
					c_list.each(function(i){
						var $this = $(this);
						var val = parseInt($this.val());
						$this.click(function(){
							//改变课表显示
							test = '<p>'+json[val-1].Cname+'</p>'+'<p>'+json[val-1].tclass_course_no+'</p>';
							tclass_no = json[val-1].Tclass_no; //tclass_no变量来自？
							$("#c_name").html(test);
							//添加容器放数据 添加之前清空上一次添加的
							$(".shouye .homepagemes").remove();
							$(".shouye").append(createForm);
							changFormId(val);
							change_1(val);
							change_2(val);
							change_3(val); 
							c_list.css('background','#E9E9E9');
							$this.css('background','#FFF');
							cnumindec = classNumber[val-1];
							// alert(cnumindec);
							/*==================================================================
								点击左侧		请求每一门课已经建立的信息显示在首页
							=====================================================================*/
			//每点击一次请求一次
			var get_right='Course_no='+cnumindec+'&Tclass_no='+tclass_no;
			//alert(get_right);
			$.ajax({
				url:"./php/ajax/get_assess.php",
				type:"POST",
				dataType:"json",
				cache:false,
				data:get_right,
				error:function(){
					// alert('xxx');--------------------------------------------------------------------
					},
				success:successFunctionF0
			});
			var zuchengxiang = '';
			var shuoming = '';
			var cishu = 0;
			var bili = 0;
			var xinghzi = '';
			var datalen= 0;//数据长度
			var dataread = 0;
			var inputbili = '';
			var inputcishu = '';
			var formChangebtn = '';
			var formtextarea = '';
			var formselect = '';
			var formjljbzc_bc = '';
			var formjbzcdet = '';
			var CexplainNum = new Array();  //表单对应序号
			function successFunctionF0(data){//请求首页部分数据
				//alert(data);
				 dataread = eval(data);
				 datalen = dataread.length;
				if(datalen){//动态创建边个加载进去
					var homepagemes = $(".homepagemes");
					var zuchengxArr = new Array('考勤','答辩','作业','期中考试','期末考试');
					var xinghziArr = new Array('评审','评定');
					$.each(dataread,function(i){//遍历读取信息
						zuchengxiang = dataread[i].DD_Cexplain_name;//读取组成项下拉框的值
						//alert(zuchengxiang);
						xinghzi = dataread[i].Sconstitue_properties;  //读取性质下拉框的值
						bili = dataread[i].Cexplain_proportion;     //读取比例
						cishu = dataread[i].Cexplain_time;		//读取次数
						shuoming = dataread[i].Cexplain_explain;	//读取说明
						CexplainNum[i] = dataread[i].Cexplain_no;
						//alert(CexplainNum[i]);
						//urse_no = dataread[i].tclass_course_no;
						homepagemes.append(createTab);	//创建表单
						var $thisTab = $(".jbzc").eq(0); 
						//alert(zuchengxiang);
						switch(zuchengxiang){    //设置组成项选中
							case zuchengxArr[0]:
							$(".jbzc:eq("+i+") .set").find("option:eq(1)").attr("selected",true); 
							break;              
							case zuchengxArr[1]:
							$(".jbzc:eq("+i+") .set").find("option:eq(2)").attr("selected",true); 
							break;
							case zuchengxArr[2]:
							$(".jbzc:eq("+i+") .set").find("option:eq(3)").attr("selected",true); 
							break;
							case zuchengxArr[3]:
							$(".jbzc:eq("+i+") .set").find("option:eq(4)").attr("selected",true); 
							break;
							case zuchengxArr[4]:
							$(".jbzc:eq("+i+") .set").find("option:eq(5)").attr("selected",true); 
							break;
							case zuchengxArr[5]:
							$(".jbzc:eq("+i+") .set").find("option:eq(6)").attr("selected",true); 
							break;
						}
						switch(xinghzi){//设置性质选中
							case xinghziArr[0]:
							$(".jbzc:eq("+i+") .xz").find("option:eq(1)").attr("selected",true);
							case xinghziArr[1]:
							$(".jbzc:eq("+i+") .xz").find("option:eq(2)").attr("selected",true);
						} 
						inputbili = $(".jbzc:eq("+i+") input[name=bili]");
						inputbili.val(bili);   		//设置比例
						inputcishu = $(".jbzc:eq("+i+") input[name=cishu]");		//设置次数
						inputcishu.val(cishu);
						formChangebtn = $(".homepagemes form:eq("+i+") .formChange");
						$(".jbzc:eq("+i+") textarea[name=b-shuoming]").val(shuoming);
						//选中*******
						formtextarea = $(".homepagemes form:eq("+i+")").find("input,textarea");//
						formselect = $(".homepagemes form:eq("+i+")").find('select');
						formjljbzc_bc = $(".homepagemes form:eq("+i+") .jljbzc_bc");
						//全部读取到首页后 设置保存按钮和 表单数据不可操作
						formtextarea.attr('disabled',true);
						formselect.prop('disabled',true);
						formjljbzc_bc.attr('disabled',"disabled");
						//$(".homepagemes form:eq("+i+") .jljbzc_bc").click(function(){alert('xx');});
						//成功后 点击修改按钮 使得表单数据可以更改 保存按钮可以使用
						formChangebtn.click(function(){
							$(this).parents('form').find('input,textarea').attr('disabled',false);
							$(this).parents('form').find('select').prop('disabled',false);
							$(this).parents('form').find('.jljbzc_bc').attr('disabled',false);
							//$(".homepagemes form:eq("+i+") .jljbzc_bc").click(function(){alert('xx');});
						});
						//修改数据后 保存按钮可用 并且请求服务器传送数据
						formjljbzc_bc.click(function(){
							var $thisform = $(this).parents('form');
							var changedata = $thisform.serialize()+'&act=xiugai'+'&Cexplain_no='+CexplainNum[i]+'&obj=1';
							// alert(cnumindec);
							// alert(changedata);
							$.ajax({
								url:'./php/creat_Action.php',
								type:'POST',
								datatype:'json',
								data:changedata,
								cache:false,
								error:function(){alert('修改不成功')},
								success:function(){
									//成功后设置表单只读  保存按钮不可用
									//选中*******
						formtextarea = $(".homepagemes form:eq("+i+")").find("input,textarea");//
						formselect = $(".homepagemes form:eq("+i+")").find('select');
						formjljbzc_bc = $(".homepagemes form:eq("+i+") .jljbzc_bc");
									formtextarea.attr('disabled',true);
									formselect.prop('disabled',true);
									formjljbzc_bc.attr('disabled',"disabled");
									
								}
							})
						});
						//删除信息时 提交请求删除数据，成功后移除表单
						formjbzcdet = $(".homepagemes form:eq("+i+") .jbzcdet");
						formjbzcdet.click(function(){
							var $this = $(this);
							var delete_data='Cexplain_no='+CexplainNum[i]+'&act=shanchu'+'&obj=1'+'&Tclass_no='+tclass_no+'&Course_no='+Course_no;
							//var shuju = parseInt(CexplainNum[i]);
							$.ajax({
								url:'./php/creat_Action.php',
								type:'POST',
								dataType:'json',
								cache:false,
								data:delete_data,
								error:function(){alert('...数据删除失败....')},
								success:function(){
								$this.parents('form').remove();
								//alert(delete_data);
								}
							})
						})
					});
				}else{
					//数据库有没提交数据进去
					// alert('数据库有没提交数据进去');
				}
			}	
			/*请求结果部分数据 姓名  学号 成绩------*///============================================================
			$("#header ul li").eq(3).unbind("click").bind("click",function(){
				$(".box").css('display','none').eq(3).css('display','block');
				
				$.ajax({
				url:"./php/ajax/getFinalGrades.php",
				type:"POST",
				dataType:"json",
				cache:false,
				data:get_right,
				error:function(){
					alert('xxx');
					},
				success:successFunctionF1
			});
			var stuName = '';//姓名
			var stuNumber = 0;//学号
			var stuResult = 0;//成绩
			var createTr = '';
			function successFunctionF1(data){
				var evaData = eval(data);
				var datalen = evaData.length;
				var tabTbody = $('.result_tab > tbody');
				var hasData = evaData[datalen-1].havedata;
				tabTbody.html('');
				if(datalen){
					$.each(evaData,function(i){//遍历读取信息
						stuName =  evaData[i].student_name;   //读取姓名
						if(!hasData){
						stuNumber = evaData[i].ref_T_S_student_ID;  //读取学号 
						stuResult = 0;//读取成绩
						}else{
						stuNumber = evaData[i].student_ID;  //读取学号 
						stuResult = parseFloat(evaData[i].finalGrades);//读取成绩
						}
						createTr = '<tr><td><p class = "stuName">'+stuName+'</p></td><td><p class = "stuNumber">'+stuNumber+'</p></td><td><p class = "stuResult">'+stuResult+'</p></td></tr>';
						tabTbody.append(createTr); 
						
					});
					$(".result_tab tbody tr").last().remove();
				}
			};
			});
			
			//读取作业  考勤 答辩 考试 的比例和次数
			$.ajax({
				url:"./php/ajax/getExecuteno1.php",
				type:"POST",
				dataType:"json",
				cache:false,
				data:get_right,
				error:requestError, 
				success:successFunctionF2
			}); 
				var constitute = '';
				var type1 = '';
				var persent = 0;
				var count = 0;
				var contentType = '';
				$('.run_x').remove();//先清除所有块
				$('.run_p').remove();
				var run_div = $('.run_div');
				var arrCishu = new Array('第一次','第二次','第三次','第四次','第五次','第六次','第七次','第八次');
				function requestError(){
					alert("xxxxx");
				}
			
			function successFunctionF2(data){
				var evaData = eval(data);
				var len = evaData.length;
				var deleteWork = $(".run_work");
					deleteWork.remove();
					//清空对象内容
					var maxScore = $(".workScore");
					var scorePersent = $(".workPersent");
					var textArea = $(".work_explain");
					var launchTime = $(".launch_time");
					var endTime = $(".end_time");
					var submitType = $(".submit_type");
						maxScore.val("");
						scorePersent.val("");	
						textArea.val("");	
						launchTime.val("");	
						endTime.val("");	
						submitType.val("");	
				if(len){
					$.each(evaData,function(i){
						constitute = evaData[i].DD_Cexplain_name+"";;
						type1 = evaData[i].Sconstitue_properties+"";
						persent = evaData[i].Cexplain_proportion;
						count = evaData[i].Cexplain_time;
						if(constitute == "作业"){
							contentType = '<ul class="run-l run-al run_x run_work"><li><span>'+constitute+'</span></li><li><span>'+type1+'</span></li><li><span class="workPersent">'+persent+'</span>%</li><li><span class="workNum">'+count+'</span>次</li></ul>';
							run_div.append(contentType);
						}else if(constitute == "考勤"){
							contentType = '<ul class="run-l run-al run_x run_kaoqin"><li><span>'+constitute+'</span></li><li><span>'+type1+'</span></li><li><span class="workPersent">'+persent+'</span>%</li><li><span class="workNum">'+count+'</span>次</li></ul>';
							run_div.append(contentType);
						}else if(constitute == "答辩"){
							contentType = '<ul class="run-l run-al run_x run_dabian"><li><span>'+constitute+'</span></li><li><span>'+type1+'</span></li><li><span class="workPersent">'+persent+'</span>%</li><li><span class="workNum">'+count+'</span>次</li></ul>';
							run_div.append(contentType);
						}else if(constitute == "期中考试"){
							contentType = '<ul class="run-l run-al run_x run_bqks"><li><span>'+constitute+'</span></li><li><span>'+type1+'</span></li><li><span class="midTestPersent">'+persent+'</span>%</li><li><span class="midTestTime">'+count+'</span>次</li></ul>';
							run_div.append(contentType);
						}else {
							contentType = '<ul class="run-l run-al run_x run_qmks"><li><span>'+constitute+'</span></li><li><span>'+type1+'</span></li><li><span class="workPersent">'+persent+'</span>%</li><li><span class="workNum">'+count+'</span>次</li></ul>';
							run_div.append(contentType);
						}
					});
					
					//判断有几次作业 以及每一作业的比例 动态添加
					/*
						1,获取组成项次数
						2,每次点击读取组次数和比例
						3,点击每次作业读取相应的 详细信息
					*/
//----------------*****************************---------------------------
	//声明变量
					var constituteNum = $(".run_x");
					var cishuBlock = $('.cishuBlock');
					var workNum = 0;
					var workPersent = 0;
					var hh = '';
					var constituteType = '';
					var midTestTime = 0;
//----------------*****************************---------------------------					
					$.each(constituteNum,function(i){
						var $this = $(this);
						constituteType = $this.find("li").first().find("span").html();
							//alert(constituteType);
						if(constituteType == "作业"){	
							$this.bind("click",function(){	
							//切换模块
							$('.run-box').css('display','none');	
							$('.work_box').css('display','block');
							cishuBlock.find(".run_p").remove();//先清空次数块
							//获取作业次数 > 添加进去
							workNum = parseInt($this.find('.workNum').html());
							workPersent = parseInt($this.find('.workPersent').html());
							if(workNum){//有次数就添加进去
							for(var i = 1;i<=workNum;i++){
								//alert(arrCishu[i-1]);
								hh = '<p class="run_p"><span>'+arrCishu[i-1]+'</span><span class="">'+workPersent+'%</span></p>';//注意横杠
								cishuBlock.append(hh);
									}
						/////////////////////////////////////////////////								
				//点击每次作业出现 每次作业的详细信息
				var worklCount = $('.run_p');
				var maxScore = $(".max_score");//满分
				var scorePersent = $(".score_persent");
				var parament = 0;//设置每次作业参数
				var topic_no_number = 0;//每次的编号
				
				$.each(worklCount,function(i){
					var $this = $(this);
					var homeTime = get_right+"&homeTime="+(i+1);
					$this.unbind("click").bind("click",function(){//给每次作业添加事件
						//请求数据，判断是否已有数据，有 返回填入，没有填写提交
						
						//请求前先清空所有 已经填写好的数据
						$(".workScore").attr("value","");
						$(".workPersent").attr("value","");
						$(".work_explain").attr("value","");
						$(".launch_time").attr("value","");
						$(".end_time").attr("value","");
						$(".submit_type").attr("value","");
						//
						$(".work_btn_bar").css('display','none');
						$.ajax({
							url:"./php/ajax/getExecuteno2.php",
							type:"POST",
							data:homeTime, //传入教学班号
							cache:false,
							dataType:"json",
							error:workRequestError,
							success:workRequestSuccess,
						});
					});
					function workRequestError(){
						alert("请求错误");
					}
					function workRequestSuccess(data){
						if(data.length){
							//1,获取信息
							var evaDataMy = eval(data);
							var maxScoreMy = parseInt(evaDataMy[0].topic_fullmark);
							var scorePersentMy = parseInt(evaDataMy[0].topic_proportion);
							var textAreaMy = evaDataMy[0].topic_content;
							var launchTimeMy = evaDataMy[0].topic_releasetime;
							var endTimeMy = evaDataMy[0].topic_deadline;
							var submitTypeMy = evaDataMy[0].topic_submission_method;
							
							//?????????????????????????????/
							topic_no_number = parseInt(evaDataMy[0].topic_no);
							
							//2，获取对象
							var maxScore = $(".workScore");
							var scorePersent = $(".workPersent");
							var textArea = $(".work_explain");
							var launchTime = $(".launch_time");
							var endTime = $(".end_time");
							var submitType = $(".submit_type");
							//3，填入信息
							maxScore.val(maxScoreMy);
							scorePersent.val(scorePersentMy);
							textArea.val(textAreaMy);
							launchTime.val(launchTimeMy);
							endTime.val(endTimeMy);
							submitType.val(submitTypeMy);
							//$(".slist_1 tr span")
							/* 
								1，给成绩录入按钮添加事件
								2，请求每次作业成绩的录入
									参数 教学班 作业次数
									写展开与收起事件（成功后）
								3，录入完毕成绩保存（可修改?）
								4，保存完后可 直接 发布或者不保存直接发布
							*/
							if(maxScoreMy){//需要改
								var postdata = get_right+"&topic_no="+topic_no_number;
								$(".result_sub tbody tr").remove();
								//tdresult.remove();//先清空
								var submitbtn = $(".work_result_submit");
								var mestitle = $(".result_sub thead");
								mestitle.find('tr').remove();//
									var mestr = '<tr><td>姓名</td><td>学号</td><td>未提交</td><td>成绩</td><td>其他说明</td></tr>';
									//mestitle.append(mestr);
								submitbtn.unbind("click").click(function(){
									if(mestitle.find('tr').length){
										//有表头 不用添加
									}
									else{
										//无表头需要添加
										mestitle.append(mestr);
										}
									$(".work_btn_bar").css('display','block');
									//去掉头部
									$.ajax({
										url:"./php/ajax/getStuGrade.php",
										type:"POST",
										datatype:"json",
										cache:false,
										data:postdata,
										error:subError,
										success:subSuccess
									});
									function subError(){
										alert("请求错误");
									}
									function subSuccess(data){
										//分割数据
										//alert('c成功');
										var evaData = eval(data);
										var stuNumber = 0;
										var stuName = '';
										var checkboxs = false;
										var stu_score = 0;
										var stu_txt = '';
										var kk = '';
										var subtbody = $(".result_sub tbody");
										var inp_stuName ='';
										var inp_stuNumber = '';
										var inp_checkboxs = '';
										var inp_score = '';
										var inp_stu_txt = '';
										$(".result_sub tbody tr").remove();
										//alert(evaData.length);
										$.each(evaData,function(i){
											//获取数据对应位置
											if(i<evaData.length-1){
											kk = '<tr><td><input type="text" class="stu_name input_border" name = "stuName" /></td><td><input type = "text" class="stu_number input_border" name="stuNumber"/></td><td><input type="checkbox"class="stu_ifsubmit" name="ifsubmit"/></td><td><input type="text" name="stuResult" class="stu_score"/></td><td><input type="text" name="workexplain" class="txt-shuoming stu_txt"/></td></tr>';
											subtbody.append(kk);
											inp_stuName = $(".result_sub tbody tr").eq(i).find(".stu_name");
											inp_stuNumber = $(".result_sub tr").eq(i+1).find(".stu_number");
											inp_checkboxs = $(".result_sub tr").eq(i+1).find("checkbox");
											inp_score = $(".result_sub tr").eq(i+1).find(".stu_score");
											inp_stu_txt = $(".result_sub tr").eq(i+1).find(".stu_txt");
											stuName = evaData[i].student_name;
											//获取标识----有无作业
											if(evaData[evaData.length-1].havedata){
												stuNumber = evaData[i].student_ID;
											}
											else{
												stuNumber = evaData[i].ref_T_S_student_ID;
											}						
											checkboxs = evaData[i].judge_submit;
											stu_score = evaData[i].judge_grades;
											//stu_txt = evaData[i].;
											inp_stuName.val(stuName);
											inp_stuNumber.val(stuNumber);
											if(checkboxs){
												inp_checkboxs.attr("checked",true);//复选框选定
												}else{inp_checkboxs.attr("checked",false);}
											inp_score.val(stu_score);
											}
										});
									}
								});
							//给保存按钮添加事件
							//表单数据序列化
							//POST提交数据 给出对应参数
							var worksubmit = $(".work_submit");
							var thisform = $(".slist_1");
							var mydata = '';
							worksubmit.unbind("click").click(function(){
								var listRow = $(".slist_1 table tbody tr").length;
								var dataObject = new Array();
								if(listRow){
									var Tclass = {};
									Tclass.workTime = topic_no_number;
									Tclass.Course_no = cnumindec;
									Tclass.Tclass_no = tclass_no;
									dataObject.push(Tclass);
									for(var i=0;i<listRow;i++)
									{
									var stuName = $(".slist_1 table tbody tr:eq("+i+")").find(".stu_name").val();
									var stuNumber = $(".slist_1 table tbody tr:eq("+i+")").find(".stu_number").val();
									var ifchecked = $(".slist_1 table tbody tr:eq("+i+")").find("input[type='checkbox']").is(':checked');
									var stuScore = $(".slist_1 table tbody tr:eq("+i+")").find(".stu_score").val();
									var stuExplain = $(".slist_1 table tbody tr:eq("+i+")").find(".stu_txt").val();
									var stuNamex = {};
									stuNamex.name = stuName;
									stuNamex.number = stuNumber;
									stuNamex.ifsubmit = ifchecked+'';
									stuNamex.score = stuScore;
									stuNamex.explain = stuExplain;
									dataObject.push(stuNamex);
									}
								}
									fields = "data=" + JSON.stringify(dataObject);
								 
								 $.ajax({
									url:"./php/ajax/saveStuGrade.php",
									type:"POST",
									data:fields, //传入教学班号
									cache:false,
									dataType:"json",
									error:workBaocunError,
									success:workBaocunSuccess,
								});
								function workBaocunError(){
									alert('保存错误');
								}
								function workBaocunSuccess(){
									alert('保存成功');
								} 
								//window.console.log(mydata);
							});
							} 
						}else{
							alert("请填写作业的详细信息");
						
					//如果没有填写作业的详细信息，填写并提交
					var sub_workmessage_btn = $('.sub_workmessage_btn');
					var wokr_1 = $(".zypd");
					//alert(topic_no);
					sub_workmessage_btn.unbind("click").click(function(){
					var submitData = wokr_1.serialize()+'&'+homeTime;//加上对应的参数
					console.log(submitData);
						$.ajax({
							url: "./php/ajax/saveExcuteDeta.php" ,
							type:"POST",
							dataType:"json",
							data:submitData,
							error:workSubmitError1,
							success:workSubmitSuccess,
							cache:false,
						}) 
					});
					function workSubmitError1(){
						alert("作业提交不成功，请重试")
					}
					function workSubmitSuccess(){
						return 0;
					}
						}
					}
				});				
				}else{
						alert("还没有添加次数");
					}
					
								});
							}else if(constituteType == "考勤"){
								
							}else if(constituteType == "答辩"){
								
							}else if(constituteType == "期中考试"){
							$this.unbind("click").bind("click",function(){	
							workPersent = parseInt($(".midTestPersent").html());
							//切换模块
							$('.run-box').css('display','none');	
							$('.qizhong_box').css('display','block');		
							cishuBlock.find(".run_p").remove();//先清空次数块
							//获取作业次数 > 添加进去
							midTestTime = parseInt($this.find('.midTestTime').html());
							midTestPersent = parseInt($this.find('.midTestPersent').html());
							if(midTestTime){//有次数就添加进去
							for(var i = 1;i<=midTestTime;i++){
								//alert(arrCishu[i-1]);
								hh = '<p class="run_p qizhong_run_p"><span>'+arrCishu[i-1]+'</span><span class="">'+workPersent+'%</span></p>';//注意横杠
								cishuBlock.append(hh);
									}
							var qizhongCount = $(".qizhong_run_p");
							//alert(qizhongCount.length);
							$.each(qizhongCount,function(j){
								var $this = $(this);
								//传入参数
								var qzTime = get_right+"&qzTime="+(j+1);
								var myqzTime = j+1;
								$this.bind("click",function(){
								var qzFullScore = 0;//满分
								var whatRank = 0; //考核制度
								////请求前先清空所有 已经填写好的数据
								var qzTab = $(".qzTab tbody"); 
								$(".qzscore").attr("value","");
								$(".qizhong radio").attr("checked",false);
									$.ajax({
										url:"./php/ajax/getExecuteqz.php",
										type:"POST",
										dataType:"json",
										data:qzTime,
										error:qzTestError,
										success:qzTestSubmitSuccess,
										cache:false,
									});
									function qzTestError(){
										alert("error");
									}
									function qzTestSubmitSuccess(data){
										$(".qzTab tbody tr").remove();
										var evalData =  eval(data);
										var evalDataLen = evalData.length;
										var stuName = '';
										var stuNumber = '';
										var stuScore = 0;
										var stuType = 0;
										var add = '';
										var qzfullscorex = 0;
										var themark = $(".qzscore");
										var haveData = evalData[evalDataLen-1].havedata;
										$.each(evalData,function(i){
										//qzFullScore = evalData[0].;//满分
										//whatRank = evalData[1].;//考核制度
										if(!haveData){
											 qzfullscorex = evalData[evalDataLen-1].fullmark;
											 themark.val(qzfullscorex);	 
										}
										if(i<evalDataLen-1){
											add = '<tr><td><input type="text" class="qzStuName"/></td><td><input type="text" class="qzStuNumber"/></td><td><input type="radio" name="ifgood_1" value="1"/></td><td><input type="radio" name="ifgood_1" value="2"/></td><td><input type="radio" name="ifgood_1" value="3"/></td><td><input type="text" class="qz_core" /></td></tr>';
											qzTab.append(add);
											stuName = $(".qzStuName").eq(i).val(evalData[i].student_name);//姓名
											if(haveData){
											stuNumber = $(".qzStuNumber").eq(i).val(evalData[i].ref_T_S_student_ID);//学号s
											//满分
											
											}else{
												stuNumber = $(".qzStuNumber").eq(i).val(evalData[i].student_ID);//学号
												stuScore = $(".qz_core").eq(i).val(parseInt(evalData[i].judge_grades));//分数
											}
										}
										});
										
										//给期中考试保存按钮添加事件
										 var objArr = new Array();
										$(".qzbc_btn").unbind("click").bind("click",function(j){
											var stuName = '';
											var stuNumber = '';
											var stuScore = 0;
											var stuType = 0;
											var object = $(".qzTab tbody tr");
											var objlen = object.length;
											var objName = $("qzStuName");
											var qzfullscore = parseInt($(".qzscore").val());
											var objStu = new Array();
											//alert(objlen);
											//----------课程标识-------------
											var Tclasso = {};
											Tclasso.workTime = myqzTime;
											Tclasso.Course_no = cnumindec;
											Tclasso.Tclass_no = tclass_no;
											Tclasso.fullmark = qzfullscore;
											objStu.push(Tclasso);
											//-------------------
											
											for(var k = 0;k<objlen;k++){
											var stuObj = {};
											stuName = object.eq(k).find(".qzStuName").val();
											stuNumber = object.eq(k).find(".qzStuNumber").val();
											stuScore = object.eq(k).find(".qz_core").val();
											if(stuScore=="")
											{
												stuScore = 0;
											}
											stuObj.name = stuName;
											stuObj.number = stuNumber;
											stuObj.score = stuScore;
											objStu.push(stuObj);
											}
											
										var postdata1 = objStu;
										var fields1 = "data=" + JSON.stringify(postdata1);
										$.ajax({
										url:"./php/ajax/saveExcuteqz.php",
										type:"POST",
										dataType:"json",
										data:fields1,
										error:qzScoreError,
										success:qzScoreSuccess,
										cache:false,
										});
										function qzScoreError(){
											alert("错误");
										}
										function qzScoreSuccess(){
											alert("成功");
										}
										});
									}
								}
								)
							});
							}else{
								alert("还么有添加次数哦，请添加");
							}
							});
							}else if(constituteType == "期末考试"){
								$this.unbind("click").bind("click",function(){	
								$(".qmTab tbody tr").remove();
							var qmTime = get_right+"&qmTime="+1;
							var myqmTime = 1;
							$('.run-box').css('display','none');	
							$('.qimo_box').css('display','block');	
								$.ajax({
										url:"./php/ajax/getExecuteqm.php",
										type:"POST",
										dataType:"json",
										data:qmTime,
										error:qmTestError,
										success:qmTestSubmitSuccess,
										cache:false,
									});
									function qmTestError(){
										alert("错误");
									}
									function qmTestSubmitSuccess(data){
										var qmTab = $(".qmTab");
										var addx = '';
										var evalDD = eval(data);
										var datalen  = evalDD.length;
										var hasData = evalDD[datalen-1].havedata;
										var stuName = '';
										var stuNumber = 0;
										var stuScore = 0;
										var themark1 = $(".qm_score");
										$.each(evalDD,function(i){
											//第一次请求 没数据
										if(!hasData){
											//有数据 请求满分
											 qmfullscorex = evalDD[datalen-1].fullmark;
											 themark1.val(qmfullscorex);	 
										}
										if(i<datalen-1){
												addx = '<tr><td><input type="text" class="qmStuName"/></td><td><input type="text" class="qmStuNumber"/></td><td><input type="radio" name="ifgood_1" value="1"/></td><td><input type="radio" name="ifgood_1" value="2"/></td><td><input type="radio" name="ifgood_1" value="3"/></td><td><input type="text" class="qm_core" /></td></tr>';
												qmTab.append(addx);
												stuName = $(".qmStuName").eq(i).val(evalDD[i].student_name);//姓名
												if(hasData){
													
												stuNumber = $(".qmStuNumber").eq(i).val(evalDD[i].ref_T_S_student_ID);//学号s								
												}else{
													stuNumber = $(".qmStuNumber").eq(i).val(evalDD[i].student_ID);//学号
													stuScore = $(".qm_core").eq(i).val(parseInt(evalDD[i].judge_grades));//分数
												}
										}
										});
			//---------------------------------------
					//给期末考试保存按钮添加事件
										 var objArr1 = new Array();
										$(".qmbc_btn").unbind("click").bind("click",function(j){
											var stuName = '';
											var stuNumber = '';
											var stuScore = 0;
											var stuType = 0;
											var object = $(".qmTab tbody tr");
											var objlen = object.length;
											var objName = $("qmStuName");
											var qmfullscore = parseInt($(".qm_score").val());
											var objStu1 = new Array();
											//alert(qmfullscore);
											//alert(objlen);
											//----------课程标识-------------
											var Tclasso = {};
											Tclasso.workTime = myqmTime;
											Tclasso.Course_no = cnumindec;
											Tclasso.Tclass_no = tclass_no;
											Tclasso.fullmark = qmfullscore;
											objStu1.push(Tclasso);
											//-------------------
											
											for(var k = 0;k<objlen;k++){
											var stuObj = {};
											stuName = object.eq(k).find(".qmStuName").val();
											stuNumber = object.eq(k).find(".qmStuNumber").val();
											stuScore = object.eq(k).find(".qm_core").val();
											if(stuScore=="")
											{
												stuScore = 0;
											}
											stuObj.name = stuName;
											stuObj.number = stuNumber;
											stuObj.score = stuScore;
											objStu1.push(stuObj);
											}
											
										var postdata2 = objStu1;
										var fields2 = "data=" + JSON.stringify(postdata2);
										$.ajax({
										url:"./php/ajax/saveExcuteqm.php",
										type:"POST",
										dataType:"json",
										data:fields2,
										error:qmScoreError,
										success:qmScoreSuccess,
										cache:false,
										});
										function qmScoreError(){
											alert("错误");
										}
										function qmScoreSuccess(){
											alert("成功");
										}
										});
			//---------------------------------------
									}
							});
							}
						});
				}
			} 
						});//删掉一个括号
					});//删掉一个括号
		}
});
/*==============     注销    ==================*/
$(".zhuxiaobtn").click(function(){
	var uesrid = parseInt($(".userid").html()); // 获取userid发送给后台
	var message = confirm("亲，真的要退出了吗？ ..(((m -_-)m  ...");
	if(message){
			$.ajax({
			url:"./php/ajax/log_out.php",
			type:'POST',
			dataType:"json",
			data:uesrid,
			cache:false,
			error:function(){alert("..(╯-╰)/...亲，你没有成功退出哦.. (╯-╰)/ ....");},
			success:function(){
				alert("请重新登录");
				window.location.href = "login.html"
			}
		});
	}else{};
});
/*=============================================================*/
function get_jbzcbaocunBtn(){  //获取基本组成所有保存按钮数量
	var btn = $(".jljbzc_bc");
	return btn;
}
function changeCourse(){
	return $("#c_name p:eq(0)").text();
}
var form_ser = '';
var	form_data;
function jbzcBaocun(){
	var baocunBtn = get_jbzcbaocunBtn();
	  $.each(baocunBtn,function(i){
		 var $this = $(this);
		 $this.unbind("click").click(function(){
			var ff = $this.parents("form");/////////????????????????????????
			/********************************************************
			有问题  序列化表单有问题
			*****************************************************/
			var thisId = ff.attr('id'); //获取表单的id
			var course = changeCourse();
				classID = $("#c_name > span:eq(1)").text();
				teacher_id = parseInt($('.userid').html());
				form_ser = ff.serialize();
				
				form_data = form_ser+"&id="+thisId+"&act=baocun"+"&classname="+course+"&obj=1"+"&classID="+classID+"&teacher_id="+teacher_id;
			// alert(form_data);
			 $.ajax({
				url:"./php/creat_Action.php",
				type:"POST",
				dataType:"json",
				cache:false,
				data:form_data,
				success:function(flag){  //要修改************/
					if(flag){
						$this.parents("form").prop('readonly',true);
						$this.attr("disabled",true);
					}
				}
			});
		 })	
	})
}
jbzcBaocun();
/*===============================================
			执行加载数据  比例 和 次数
==================================================*/
$("#header ul li:eq(2)").bind("click",function(){
	var $thisID = '';
	$.ajax({
		url:"?id=$thisID",
		type:"GET",
		dataType:"json",
		cache:false,
		error:function(){
			;}
	})
	function successBilicishu(data){
		var data = eval(data);
		var len = data.length;
		var arr = new Array('一','二','三','四','五','六','七');
		for(var i=0;i<len;i++){
			var num = data[i].xxxxxxxx;
			var content = '<p class="run-p"><span>第'+arr[i]+'次</span><span class="">'+num+'</span>%</p>';
		}
	}
})


