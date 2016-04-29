<?php
// require_once'../include.php';
// $test=$_POST;
// print_r($test);
// echo $test['Tclass_no'];
$i=select('v_finalgrades','*',"Tclass_class_no='{$inf['Tclass_no']}'",$D);
$arr=json_encode($i);
//print_r($i);
echo $arr;