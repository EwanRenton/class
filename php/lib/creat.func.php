<?php

function creat_jbzc($infor,$D){
	// echo $infor['bili'];
	// echo"保存成功";
switch ($infor['zucheng']){
		case "zuoye";$zucheng="作业";break;
		case "qizhong";$zucheng="期中考试";break;
		case "dabian";$zucheng="答辩";break;
		case "kaoqin";$zucheng="考勤";break;
		case "qimo";$zucheng="期末考试";break;
		
	}
	switch ($infor['xingzhi']){
		case 'pingshen';$xingzhi="评审";break;
		case 'pingding';$xingzhi="评定";break;
		
	}
	// $zucheng="作业";
	// if ($infor['zucheng']=="zuoye")
	// {$zucheng="作业";}
	// if($infor['xingzhi']=="pingshen")
	// {$xingzhi="评审";}
	// $sql="select DD_no from dd where DD_Cexplain_name=$zucheng";
$back=select('dd','DD_no',"DD_Cexplain_name='$zucheng'",$D);
// print_r($back);
// echo $infor['classname'];
$back3=select('course','Cno',"Cname='{$infor['classname']}'",$D);

// print_r($back3);
	$back1=select('assess','assess_no',"assess_Course_no={$back3[0]['Cno']}",$D);
	foreach ($back1 as $a){
		$assess_no=$a['assess_no'];
	}
	// error_reporting(0);
$sql="insert into cexplain values('','{$back[0]['DD_no']}','{$assess_no}','{$infor['bili']}','{$infor['cishu']}','{$infor['b-shuoming']}')";

 $D->exec($sql) or die ("存数据库失败");
  $back4=select('cexplain','max(Cexplain_no)','',$D);
 // print_r($back4);
 $sql2="insert into sconstitue values('','$xingzhi','100','336','{$back4[0]['max(Cexplain_no)']}')";
 $D->exec($sql2) or die ("存数据库失败");
}
function updata_jbzc($infor,$D){
	// echo"更新基本组成";
	$sql="update cexplain set Cexplain_proportion='{$infor['bili']}',Cexplain_time='{$infor['cishu']}',Cexplain_explain='{$infor['b-shuoming']}' where Cexplain_no='{$infor['Cexplain_no']}' ";
	$i=$D->exec($sql);
}
function delete_jbzc($infor,$D){
	// echo"删除基本组成";
	// print_r($infor);
	$back=select('v_execute','DD_Cexplain_name',"Cexplain_no='{$infor['Cexplain_no']}' and Tclass_no='{$infor['Tclass_no']}'",$D);
	foreach ($back as $a){
		$type=$a['DD_Cexplain_name'];
	}
	// $type=$back[0]['DD_Cexplain_name'];
	$sql="delete from cexplain where Cexplain_no='{$infor['Cexplain_no']}'";
	$D->exec($sql);
	// echo $type;
	$sql="delete from topic where topic_type='{$type}' and topic_tclass_no='{$infor['Tclass_no']}'";
	// echo $sql;
	$D->exec($sql);
	// echo $i;
}
function creat_jfx($infor,$D){
	echo"创建加分项";
}
function updata_jfx($infor,$D){
	echo"修改加分项";
}
function delet_jfx($infor,$D){
	echo"删除加分项";
}

?>