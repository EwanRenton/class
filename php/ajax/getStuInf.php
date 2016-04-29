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
$back=select('v_tclass_student','ref_T_S_student_ID,student_name',"Tclass_no='{$Inf['Tclass_no']}'",$D);
$arr=json_encode($back);
echo $arr;