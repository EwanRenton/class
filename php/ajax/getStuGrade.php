<?php
/**
 * Created by PhpStorm.
 * User: Ewan
 * Date: 2015/10/10
 * Time: 18:03
 */
require_once'../include.php';
$Inf=$_POST;
//print_r($Inf);
$back=select('v_result','*',"ref_T_S_Tclass_no='{$Inf['Tclass_no']}' and topic_no='{$Inf['topic_no']}'",$D);
//print_r($back);
$lenht=count($back);
if($back){
//    echo $lenht;
    $back[$lenht]['havedata']=1;
    $arr=json_encode($back);
}else{
    $back=select('v_tclass_student','ref_T_S_student_ID,student_name',"Tclass_no='{$Inf['Tclass_no']}'",$D);
    $lenht=count($back);
//    echo $lenht;
    $back[$lenht]['havedata']=0;
    $arr=json_encode($back);
}
echo $arr;