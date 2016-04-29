//js切换Tab 建立 执行 结果
var zbzctab = '<form id="b-1" class="form-control fc"><table class="tab tab-built jbzc"><tr><td>组成项</td><td>性质</td><td>比例</td><td>次数</td><td>操作</td></tr><tr><td><select id="cet-1" class="set" name="zucheng"><option value="0">请选择</option><option value="kaoqin">考勤</option><option value="dabian">答辩</option><option value="zuoye">作业</option><option value="qizhong">期中考试</option><option value="qimo">期末考试</option></select></td><td><select name="xingzhi" class="xz"><option value="0">请选择</option><option value="pingshen">评审</option><option value="pingding">评定</option></select></td><td><input type="text" name="bili"/>%</td><td><input type="text" name="cishu" />次</td><td><button type="button" class="btn btn-default jbzcdet">删除</button></td></tr><tr><td rowspan="2" colspan="4"><textarea placeholder="请填写" name="b-shuoming"></textarea></td><td><button type="button" class="btn btn-default">修改</button></td></tr><tr><td><button type="button" class="btn btn-default jljbzc_bc">保存</button></td></tr></table></form>';
var userID=0;
$(function(){
	//h=获取 首页 建立 执行 结果
	var home = $('#header ul li').eq(0);
	var built = $('#header ul li').eq(1);
	var run = $('#header ul li').eq(2);
	var ret = $('#header ul li').eq(3);
	
	var box = $('.box');
	home.click(function(){
		box.css({'display':'none','background':"#E9E9E9"});
		box.eq(0).css({'display':'block','background':'#FFF'});
	});
	built.click(function(){
		box.css({'display':'none','background':"#E9E9E9"});
		box.eq(1).css({'display':'block','background':'#FFF'});
	});
	run.click(function(){
		box.css('display','none');
		box.eq(2).css('display','block');
	});
	ret.click(function(){
		box.css('display','none');
		box.eq(3).css('display','block');
	});
	box.eq(0).css('display','block');//显示首页
})
/***************************************************************
改变对应的属性
*****************************************************************/
 var box = $('.box');
function change_0(i){
	//box.eq(1).attr('id','built_'+i);
}
function change_1(i){
	box.eq(1).attr('id','built_'+i);
}
function change_2(i){
	box.eq(2).attr('id','run_'+i);
}
function change_3(i){
	box.eq(3).attr('id','ret_'+i);
} 
/*********************
切换 作业 考勤 答辩 期中 期末
****************************/
$(function(){
	var runlist = $(".run_x");
	var rundiv = $(".run-box");
	rundiv.eq(0).css('display','block');
	
	runlist.eq(0).click(function(){
		rundiv.css('display','none');
		rundiv.eq(0).css('display','block');
	});
	runlist.eq(1).click(function(){
		rundiv.css('display','none');
		rundiv.eq(1).css('display','block');
	});
	runlist.eq(2).click(function(){
		rundiv.css('display','none');
		rundiv.eq(2).css('display','block');
	});
	runlist.eq(3).click(function(){
		rundiv.css('display','none');
		rundiv.eq(3).css('display','block');
	});
	runlist.eq(4).click(function(){
		rundiv.css('display','none');
		rundiv.eq(4).css('display','block');
	});
})
/***************************
点击左侧课表 所有表单的id
**************************************/
function changFormId(i){
	//var retID = $('.result').attr('id','ret'+i);
	var bx =$(".fc").attr('id','b-'+i);
	var addFen = $(".jiafen").attr('id','add-fen-'+i);
	var sayNo = $(".foujue").attr('id','syano-'+i);
	var zypd = $(".zypd").attr('id','work-'+i);
	var slist_1 = $(".slist_1").attr('id','work-s-'+i);
	var db = $(".db").attr('id','dabian-'+i);
	var ryfz = $(".ryfz").attr('id','person-group-'+i);
	var tmfz = $(".tmfz").attr('id','timu-group-'+i);
	var pst = $(".pst").attr('id','pingshentuan-'+i);
	var dbxx = $(".dbxx").attr('id','db-xinxi-'+i);
	var dbgz = $(".dbgz").attr('id','db-guize-'+i);
	var dbps = $(".dbps").attr('id','db-ps-'+i);
	var kaoqin = $(".kaoqin").attr('id','kaoqin-pd-'+i);
	var jlxg = $(".jlxg").attr('id','jilv-xg-'+i);
	var qizhong = $(".qizhong").attr('id','qz-cs-'+i);
	var qzkszg = $(".qzkszg").attr('id','qz-kszg-'+i);
	var qimocj = $(".qimocj").attr('id','qmcj-'+i);
	var qmkszg = $(".qmkszg").attr('id','qm-kszg-'+i);
	//结果还未修改 对的form id 	
}
/*======================  添加基本组成  ===================================*/
function change_jbzcTabLen(){	//获取所有的基本组成表格的删除按钮
	var jbzcdet =$(".jbzcdet");
	//alert(jbzcdet.length);
	return jbzcdet;
}
/*=================添加==================*/
$("#add-1").on('click',function(){
	var divjbzc = $(".divjbzc ");
	divjbzc.append(zbzctab);
	change_jbzcTabLen(); //获取所有的基本组成表格的删除按钮
	delete_jbzcTab(); 
	jbzcBaocun();// index_data 里判斷保存按鈕數量并且添加事件  jbzcBaocun 
});
/*======================  删除基本组成  ===================================*/
function delete_jbzcTab(){
	 var jbzcDetBtn = change_jbzcTabLen(); 
	$.each(jbzcDetBtn,function(i){
		var $this = $(this);
		if(i){
				$this.unbind("click").click(function(){
				$this.parents('table').remove();
			})
		}
	})
}
delete_jbzcTab();
/*================================================
		基本组成展开与收起
===========================================*/
$("#toggle_jbzc").click(function(){
	var $this = $(this);
	var zbzcForm = $(".fc");
	if(zbzcForm.is(":hidden")){
		zbzcForm.slideDown("slow",function(){
			$this.html('+');
		});
	}else{
		zbzcForm.slideUp("slow",function(){
			$this.html('-');
		});
	}
});
/*======================  添加加分项  ===================================*/
var jfxtab = '<form class="jfx" id="add-fen-1"><table class="tab-built"><tr><td>组成项</td><td>每次加分</td><td>上限</td><td>说明</td><td>总上限</td><td><button type="button" class="btn btn-default">修改</button></td></tr><tr><td><input type="text" name="zuchengxiang" /></td><td><input type="text" maxlength="jiafen" /></td><td><input type="text" name="shangxian" /></td><td><input type="text" name="b-s" /></td><td><input type="text" name="all-shangxian" /></td><td><button type="button" class="btn btn-default jfxdet">删除</button></td></tr></table></form>';
function change_jfxTabLen(){	//获取所有的加分项表格的删除按钮
	var jfxcdet =$(".jfxdet");
	//alert(jfxcdet.length);
	return jfxcdet;
}
/*=================添加==================*/
$("#add-2").on('click',function(){
	 var divjfx = $(".jiafenxdiv form:last");
	divjfx.append(jfxtab);
	change_jfxTabLen(); //获取所有的基本组成表格的删除按钮
	delete_jfxTab(); 
	//jbzcBaocun();// index_data 里判斷保存按鈕數量并且添加事件  jbzcBaocun 
});
/*======================  删除加分项  ===================================*/
function delete_jfxTab(){
	 var jfxDetBtn = change_jfxTabLen(); 
	$.each(jfxDetBtn,function(i){
		var $this = $(this);
		if(i){
				$this.unbind("click").click(function(){
				$this.parents('table').remove();
			})
		}
	})
}
delete_jfxTab();
/*================================================
		加分项展开与收起
===========================================*/
$("#toggle_jfx").click(function(){
	var $this = $(this);
	var jfxForm = $(".jfx");
	if(jfxForm.is(":hidden")){
		jfxForm.slideDown("slow",function(){
			$this.html('+');
		});
	}else{
		jfxForm.slideUp("slow",function(){
			$this.html('-');
		});
	}
})
/*======================  添加一票否决  ===================================*/
var ypfjtab = '<form class=" foujue" id="sayno-1"><table class="tab-built tt"><tr><td><input type="checkbox" name="a" value="1" /></td><td><input type="text" class="txt-shuoming" name="b" /></td><td><button type="button" class="btn btn-default">修改</button></td><td><button type="button" class="btn btn-default ypfjdet">删除</button></td></tr></table></form>';
function change_ypfjTabLen(){	//获取所有的一票否决表格的删除按钮
	var ypfjdet =$(".ypfjdet");
	//alert(jfxcdet.length);
	return ypfjdet;
}
/*=================添加==================*/
$("#add-3").on('click',function(){
	 var divypfj = $(".ypfjdiv form:last");
	divypfj.append(ypfjtab);
	change_ypfjTabLen(); //获取所有的基本组成表格的删除按钮
	delete_ypfjTab(); 
	//jbzcBaocun();// index_data 里判斷保存按鈕數量并且添加事件  jbzcBaocun 
});
/*======================  删除加分项  ===================================*/
function delete_ypfjTab(){
	 var ypfjDetBtn = change_ypfjTabLen(); 
	$.each(ypfjDetBtn,function(i){
		var $this = $(this);
		if(i){
				$this.unbind("click").click(function(){
				$this.parents('table').remove();
			})
		}
	})
}
delete_ypfjTab();
/*================================================
		加分项展开与收起
===========================================*/
$("#toggle_ypfj").click(function(){
	var $this = $(this);
	var ypfjForm = $(".foujue");
	if(ypfjForm.is(":hidden")){
		ypfjForm.slideDown("slow",function(){
			$this.html('+');
		});
	}else{
		ypfjForm.slideUp("slow",function(){
			$this.html('-');
		});
	}
})

