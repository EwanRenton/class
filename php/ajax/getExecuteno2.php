<?php
/**
 * Created by PhpStorm.
 * User: Ewan
 * Date: 2015/10/8
 * Time: 21:26
 */
require_once'../include.php';
$jxbnum=$_POST;
 // print_r($jxbnum);
//$time="1";
switch ($jxbnum["homeTime"]){
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
 // echo $time;
$inf=select('v_homework1','*',"Tclass_no='{$jxbnum['Tclass_no']}' and topic_times='{$time}'",$D);
$arr=json_encode($inf);
echo $arr;

?>