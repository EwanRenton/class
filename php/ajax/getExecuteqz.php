<?php
/**
 * Created by PhpStorm.
 * User: Ewan
 * Date: 2015/11/24
 * Time: 16:50
 */
require_once'../include.php';
$jxbnum=$_POST;
// print_r($jxbnum);
//$time="1";
switch ($jxbnum["qzTime"]){
    case 1:$time="第一次";break;
    case 2:$time="第二次";break;
    case 3:$time="第三次";break;
    case 4:$time="第四次";break;
    case 5:$time="第五次";break;
    case 6:$time="第六次";break;
    case 7:$time="第七次";break;
    case 8:$time="第八次";break;
    default:
        echo "No number between 1 and 3";
}
//echo $time;
$inf=select('v_homework1','*',"Tclass_no='{$jxbnum['Tclass_no']}' and topic_times='{$time}' and topic_type='期中考试'",$D);
// echo '1';
foreach ($inf as $a){
	$topic_no=$a['topic_no'];
	$fullmark=$a['topic_fullmark'];
	// echo '1';
	// print_r($a);
}
if($inf){
    $back=select('v_result','*',"ref_T_S_Tclass_no='{$jxbnum['Tclass_no']}' and topic_no='{$topic_no}'",$D);
    $lenght=count($back);
    $back[$lenght]['fullmark']=$fullmark;
	 $back[$lenght]['havedata']=0;
    $arr1=json_encode($back);
    echo $arr1;
}else{
    $back=select('v_tclass_student','ref_T_S_student_ID,student_name',"Tclass_no='{$jxbnum['Tclass_no']}'",$D);
	 $lenght=count($back);
	 $back[$lenght]['havedata']=1;
    $arr1=json_encode($back);
    echo $arr1;
}
