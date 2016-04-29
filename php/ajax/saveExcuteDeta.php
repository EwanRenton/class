<?php
/**
 * Created by PhpStorm.
 * User: Ewan
 * Date: 2015/10/17
 * Time: 13:58
 */
require_once "../include.php";
$Inf=$_POST;
// print_r($Inf);
switch ($Inf["homeTime"]){
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
$sql="insert into topic VALUES ('{$Inf['work_explain']}','{$Inf['end_time']}','','{$Inf['launch_time']}','{$Inf['max_score']}','{$Inf['workPersent']}','{$Inf['submit_type']}','{$time}','{$Inf['Tclass_no']}','0','作业')";
$back=$D->exec($sql);
// if($back){
	// $a=1;
	// $arr=json_decode($a);
	// echo $arr;
// }else{
	// $a=0;
	// $arr=json_decode($a);
	// echo $arr;
// }