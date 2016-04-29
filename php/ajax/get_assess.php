<?php
require_once'../include.php';
  $test=$_POST;
$i=select('v_assess','DD_Cexplain_name,Cexplain_time,Cexplain_proportion,Cexplain_explain,Cexplain_no,Sconstitue_properties',"assess_Course_no='{$test['Course_no']}'&&Tclass_no='{$test['Tclass_no']}'",$D);
  $arr=json_encode($i);
	//print_r($i);
  echo $arr;
	
?>